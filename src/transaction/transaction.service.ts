import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Keypair, ParsedConfirmedTransaction, clusterApiUrl, ConfirmedSignatureInfo, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { Transaction, TransactionDocument } from "./transaction.schema";
import { Transaction as SolanaTransaction } from '@solana/web3.js'
import * as serviceSecretKey from '../serviceSecretKey.json'

const connection = new Connection(
    clusterApiUrl('testnet'),
    'confirmed',
);
const serviceKeypair = Keypair.fromSecretKey(Uint8Array.from(serviceSecretKey))


@Injectable()
export class TransactionService {
    constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>, @Inject(forwardRef(() => UserService)) private userService: UserService) { }


    async sendLamportsFromServer(receiverPublicKey: string, amount: number) {
        try {
            const tx = new SolanaTransaction().add(
                SystemProgram.transfer({
                    fromPubkey: serviceKeypair.publicKey,
                    toPubkey: new PublicKey(receiverPublicKey),
                    lamports: amount
                })
            )

            await connection.sendTransaction(tx, [serviceKeypair])
        } catch (e) {
            Logger.log(e)
            throw new HttpException('Server Withdraw Error. Try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getBySignatureFromBlockchain(signature: string): Promise<ParsedConfirmedTransaction> {
        const transaction = await connection.getParsedConfirmedTransaction(signature)

        return transaction
    }

    getType(transaction: ParsedConfirmedTransaction): string {
        //@ts-ignore
        const { destination, source } = transaction.transaction.message.instructions[0].parsed.info
        if (destination === serviceKeypair.publicKey.toString()) {
            return 'deposit'
        } else if (source === serviceKeypair.publicKey.toString()) {
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
        const transactions = await connection.getSignaturesForAddress(serviceKeypair.publicKey)

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