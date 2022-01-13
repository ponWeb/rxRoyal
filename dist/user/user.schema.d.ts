import { Document } from 'mongoose';
import { AssociatedKeypairDocument } from 'src/associatedKeypair/associatedkeypair.schema';
export declare type UserDocument = User & Document;
export declare class User {
    publicKey: string;
    associatedKeypair: AssociatedKeypairDocument;
    lastMessageAt: Date;
    balance: number;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any>;
