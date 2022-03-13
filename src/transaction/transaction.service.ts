import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Keypair, ParsedConfirmedTransaction, clusterApiUrl, ConfirmedSignatureInfo, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Cluster, NONCE_ACCOUNT_LENGTH, Signer, NonceAccount } from "@solana/web3.js";
import { Connection as MongoConnection, Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TransactionService {
    serviceKeypair: Keypair
    connection: Connection
    nonceAccount: Keypair

    constructor(@InjectConnection() private readonly dbConnection: MongoConnection, @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, @Inject(forwardRef(() => UserService)) private userService: UserService, private configService: ConfigService) {
        this.connection = new Connection(
            this.configService.get('SOLANA_RPC_NODE'),
            'confirmed'
        );
        this.serviceKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.configService.get('KEYPAIR_SECRET_KEY'))))
        this.connection.onAccountChange(this.serviceKeypair.publicKey, () => this.processTransactions())
    }

    async sendLamportsFromServer(receiverPublicKey: string, amount: number) {
        const tx = new SolanaTransaction().add(
            SystemProgram.transfer({
                fromPubkey: this.serviceKeypair.publicKey,
                toPubkey: new PublicKey(receiverPublicKey),
                lamports: amount
            })
        )

        tx.recentBlockhash = (await this.connection.getRecentBlockhash()).blockhash
        tx.sign(this.serviceKeypair)

        await this.connection.sendRawTransaction(tx.serialize(), { preflightCommitment: 'confirmed', maxRetries: 5 })
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

    async distribute() {
        const value = 4.844 * LAMPORTS_PER_SOL
        const owner = 'HtnZ5Sh2NQN4iakefckJVamuDBTTpxUjgiudYd77TDSP'
        this.sendLamportsFromServer(owner, value)
    }

    async getLastFromBlockchain(): Promise<ConfirmedSignatureInfo[]> {
        const transactions = await this.connection.getSignaturesForAddress(this.serviceKeypair.publicKey, { limit: 10 })

        return transactions
    }

    async processTransactions() {
        try {
            console.log('processing a transaction!')
            await new Promise(resolve => setTimeout(() => resolve(1), 1500))
            const blockchainTransactions = await this.getLastFromBlockchain()

            await Promise.all(blockchainTransactions.map(transaction => this.processTransaction(transaction)))
        } catch (e) {
            Logger.error(e)
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
            }
        } catch (e) {
            Logger.error(e)
        }
    }

    async confirmPendingDeposit(signature: string, txInfo: ParsedConfirmedTransaction) {
        const sender = this.getSender(txInfo)
        const amount = this.getAmount(txInfo)

        const user = await this.userService.findByPublicKey(sender.toString())
        if (!user) return

        const session = await this.dbConnection.startSession()
        session.startTransaction()
        user.$session(session)

        try {
            const deposit = new this.transactionModel({ owner: user, signature, type: 'deposit', status: 'confirmed', amount })
            deposit.$session(session)

            await deposit.save()
            await this.userService.changeBalance(user, amount, { fromDeposit: true })

            await session.commitTransaction()
        } catch (e) {
            Logger.error(e)
            await session.abortTransaction()
        } finally {
            session.endSession()
        }
    }

}