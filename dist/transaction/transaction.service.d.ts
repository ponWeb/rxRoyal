import { ParsedConfirmedTransaction, ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { TransactionDocument } from "./transaction.schema";
export declare class TransactionService {
    private transactionModel;
    private userService;
    constructor(transactionModel: Model<TransactionDocument>, userService: UserService);
    sendLamportsFromServer(receiverPublicKey: string, amount: number): Promise<void>;
    getBySignatureFromBlockchain(signature: string): Promise<ParsedConfirmedTransaction>;
    getType(transaction: ParsedConfirmedTransaction): string;
    getSender(transaction: ParsedConfirmedTransaction): PublicKey;
    getAmount(transaction: ParsedConfirmedTransaction): number;
    getManyFromBlockchain(): Promise<ConfirmedSignatureInfo[]>;
    getManyFromDb(): Promise<TransactionDocument[]>;
    getUnconfirmed(): Promise<ConfirmedSignatureInfo[]>;
    saveTransactionToDb(transaction: ParsedConfirmedTransaction): Promise<void>;
    confirmMany(transactions: ConfirmedSignatureInfo[]): Promise<void>;
}
