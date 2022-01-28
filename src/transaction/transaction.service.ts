import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Keypair, ParsedConfirmedTransaction, clusterApiUrl, ConfirmedSignatureInfo, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Cluster } from "@solana/web3.js";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TransactionService {
    network: Cluster
    serviceKeypair: Keypair
    connection: Connection

    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, @Inject(forwardRef(() => UserService)) private userService: UserService, private configService: ConfigService) {
        this.network = 'testnet' as Cluster
        this.connection = new Connection(
            clusterApiUrl(this.network),
            'confirmed',
        );
        this.serviceKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.configService.get('KEYPAIR_SECRET_KEY'))))
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

    async getBySignatureFromBlockchain(signature: string): Promise<ParsedConfirmedTransaction> {
        const transaction = await this.connection.getParsedConfirmedTransaction(signature)

        return transaction
    }

    getType(transaction: ParsedConfirmedTransaction): string {
        //@ts-ignore
        const { destination, source } = transaction.transaction.message.instructions[0].parsed.info
        if (destination === this.serviceKeypair.publicKey.toString()) {
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
    getAmount(transaction: ParsedConfirmedTransaction): number {
        //@ts-ignore
        const { lamports } = transaction.transaction.message.instructions[0].parsed.info
        return lamports
    }

    async getManyFromBlockchain(): Promise<ConfirmedSignatureInfo[]> {
        const transactions = await this.connection.getSignaturesForAddress(this.serviceKeypair.publicKey)

        return transactions
    }

    async getManyFromDb(): Promise<TransactionDocument[]> {
        const transactions = await this.transactionModel.find()

        return transactions
    }

    async getUnconfirmed(): Promise<ConfirmedSignatureInfo[]> {
        const blockchainTransactions = await this.getManyFromBlockchain()
        const dbTransactions = await this.getManyFromDb()
        const dbTransactionsSignatures = dbTransactions.map(tr => tr.signature)

        const unconfirmedTransactions = blockchainTransactions.filter(tr => !dbTransactionsSignatures.includes(tr.signature))

        return unconfirmedTransactions
    }

    async saveTransactionToDb(transaction: ParsedConfirmedTransaction) {
        const newTransaction = new this.transactionModel({ signature: transaction.transaction.signatures[0] })

        await newTransaction.save()

    }

    async confirmMany(transactions: ConfirmedSignatureInfo[]) {
        for (let tr of transactions) {
            const transaction = await this.getBySignatureFromBlockchain(tr.signature)
            const transactionType = this.getType(transaction)

            if (transactionType === 'deposit') {
                const sender = this.getSender(transaction)
                const amount = this.getAmount(transaction)

                const user = await this.userService.findByPublicKey(sender.toString())
                if (!user) return

                await this.userService.changeBalance(user._id, amount, true, true)
            }

            await this.saveTransactionToDb(transaction)
        }
    }

}