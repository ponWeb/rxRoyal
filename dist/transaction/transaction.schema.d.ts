import { Document } from 'mongoose';
export declare type TransactionDocument = Transaction & Document;
export declare class Transaction {
    signature: string;
}
export declare const TransactionSchema: import("mongoose").Schema<Document<Transaction, any, any>, import("mongoose").Model<Document<Transaction, any, any>, any, any, any>, any>;
