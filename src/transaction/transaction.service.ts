import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Keypair, ParsedConfirmedTransaction, clusterApiUrl, ConfirmedSignatureInfo, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Cluster, NONCE_ACCOUNT_LENGTH, Signer, NonceAccount } from "@solana/web3.js";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { ConfigService } from "@nestjs/config";
import { UserDocument } from "src/user/user.schema";

@Injectable()
export class TransactionService {
    network: Cluster
    serviceKeypair: Keypair
    connection: Connection

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, @Inject(forwardRef(() => UserService)) private userService: UserService, private configService: ConfigService) {
        this.network = this.configService.get('SOLANA_NETWORK') as Cluster
        this.connection = new Connection(
            'https://ssc-dao.genesysgo.net/',
            'confirmed'
        );
        this.serviceKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.configService.get('KEYPAIR_SECRET_KEY'))))
        console.log('serviceKP:', this.serviceKeypair)
    }

    async sendAndConfirmTx(tx: SolanaTransaction, signers: Signer[] = []) {
        const txhash = await this.connection.sendTransaction(tx, signers)
        await this.connection.confirmTransaction(txhash, 'confirmed')
        return txhash
    }


    async sendLamportsFromServer(receiverPublicKey: string, amount: number) {
        try {
            const tx = new SolanaTransaction().add(
                SystemProgram.transfer({
                    fromPubkey: this.serviceKeypair.publicKey,
                    toPubkey: new PublicKey(receiverPublicKey),
                    lamports: amount
                })
            )

            await this.connection.sendTransaction(tx, [this.serviceKeypair])
        } catch (e) {
            Logger.log(e)
            throw new HttpException('Server Withdraw Error. Try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createWithdrawTx(receiverPublicKey: string, amount: number) {
        const nonceAccount = Keypair.generate()

        let createAndInitNonceTx = new SolanaTransaction().add(
            // create nonce account
            SystemProgram.createAccount({
                fromPubkey: this.serviceKeypair.publicKey,
                newAccountPubkey: nonceAccount.publicKey,
                lamports: await this.connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH),
                space: NONCE_ACCOUNT_LENGTH,
                programId: SystemProgram.programId,

            }),
            // init nonce account
            SystemProgram.nonceInitialize({
                noncePubkey: nonceAccount.publicKey,
                authorizedPubkey: this.serviceKeypair.publicKey,
            })
        )

        await this.sendAndConfirmTx(createAndInitNonceTx, [this.serviceKeypair, nonceAccount])

        let nonceAccountInfo = await this.connection.getAccountInfo(nonceAccount.publicKey);
        await new Promise(resolve => setTimeout(() => resolve(1), 1000))
        let nonceData = NonceAccount.fromAccountData(nonceAccountInfo.data);

        const tx = new SolanaTransaction().add(
            // nonce advance must be the first insturction
            SystemProgram.nonceAdvance({
                noncePubkey: nonceAccount.publicKey,
                authorizedPubkey: nonceData.authorizedPubkey,
            }),
            // after that, you do what you really want to do, here we append a transfer instruction as an example.
            SystemProgram.transfer({
                fromPubkey: this.serviceKeypair.publicKey,
                toPubkey: new PublicKey(receiverPublicKey),
                lamports: amount,
            })
        )

        tx.recentBlockhash = nonceData.nonce;
        tx.feePayer = new PublicKey(receiverPublicKey)
        tx.partialSign(this.serviceKeypair)

        const signatures = tx.signatures
        const serviceSignature = signatures.find(signature => signature.publicKey.equals(this.serviceKeypair.publicKey))

        const compiledMessage = tx.compileMessage()
        const serializedMessage = compiledMessage.serialize()

        const receiver = await this.userService.findByPublicKey(receiverPublicKey)
        const newWithdrawTransaction = new this.transactionModel({ owner: receiver, type: 'withdraw', status: 'pending', amount, instructions: Array.from(serializedMessage), serviceSignature: Array.from(serviceSignature.signature) })
        await newWithdrawTransaction.save()

        return { instructions: Array.from(serializedMessage), serviceSignature: Array.from(serviceSignature.signature), amount }
    }

    async getBySignatureFromBlockchain(signature: string): Promise<ParsedConfirmedTransaction> {
        return await this.connection.getParsedConfirmedTransaction(signature)
    }

    async getBySignature(signature: string) {
        return await this.transactionModel.findOne({ signature })
    }

    getType(transaction: ParsedConfirmedTransaction): string {
        const instructionN = transaction.transaction.message.instructions.length
        //@ts-ignore
        const { destination, source } = transaction.transaction.message.instructions[instructionN - 1].parsed.info
        if (!destination || !source) {
            return
        }
        else if (destination === this.serviceKeypair.publicKey.toString()) {
            return 'deposit'
        } else if (source === this.serviceKeypair.publicKey.toString()) {
            return 'withdraw'
        }
    }
    getSender(transaction: ParsedConfirmedTransaction): PublicKey {
        //@ts-ignore
        const { source } = transaction.transaction.message.instructions[0].parsed.info
        return new PublicKey(source)
    }
    getReceiver(transaction: ParsedConfirmedTransaction): PublicKey {
        const instructionN = transaction.transaction.message.instructions.length
        //@ts-ignore
        const { destination } = transaction.transaction.message.instructions[instructionN - 1].parsed.info
        return new PublicKey(destination)
    }
    getAmount(transaction: ParsedConfirmedTransaction): number {
        //@ts-ignore
        const { lamports } = transaction.transaction.message.instructions[0].parsed.info
        return lamports
    }

    async getLastFromBlockchain(): Promise<ConfirmedSignatureInfo[]> {
        const transactions = await this.connection.getSignaturesForAddress(this.serviceKeypair.publicKey, { limit: 25 })

        return transactions
    }

    async processTransactions() {
        try {
            Logger.log('started processing transactions')
            const blockchainTransactions = await this.getLastFromBlockchain()

            await Promise.all(blockchainTransactions.map(transaction => this.processTransaction(transaction)))
        } catch (e) {
            Logger.error('failed to process transactions!')
        }
    }

    async processTransaction(tx: ConfirmedSignatureInfo) {
        try {
            const savedTransaction = await this.getBySignature(tx.signature)
            if (savedTransaction && savedTransaction.status !== 'pending') return

            const txInfo = await this.getBySignatureFromBlockchain(tx.signature)
            const txType = this.getType(txInfo)

            if (txType === 'deposit') {
                await this.confirmPendingDeposit(tx.signature, txInfo)
            } else if (txType === 'withdraw') {
                await this.confirmPendingWithdraw(tx.signature, txInfo)
            }
        } catch {

        }
    }

    async getPendingWithdraw(owner: UserDocument) {
        return await this.transactionModel.findOne({ owner, type: 'withdraw', status: 'pending' })
    }
    async confirmPendingWithdraw(signature: string, txInfo: ParsedConfirmedTransaction) {
        const receiver = this.getReceiver(txInfo)
        const owner = await this.userService.findByPublicKey(receiver.toBase58())
        return await this.transactionModel.findOneAndUpdate({ owner, type: 'withdraw', status: 'pending' }, { signature, status: 'confirmed' })
    }

    async confirmPendingDeposit(signature: string, txInfo: ParsedConfirmedTransaction) {
        const sender = this.getSender(txInfo)
        const amount = this.getAmount(txInfo)

        const user = await this.userService.findByPublicKey(sender.toString())
        if (!user) return

        const deposit = new this.transactionModel({ owner: user, signature, type: 'deposit', status: 'confirmed', amount })
        await deposit.save()
        this.userService.changeBalance(user, amount, { fromDeposit: true })
    }

}