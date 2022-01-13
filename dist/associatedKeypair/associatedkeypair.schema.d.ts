import { Document } from "mongoose";
export declare type AssociatedKeypairDocument = AssociatedKeypair & Document;
export declare class AssociatedKeypair {
    publicKey: string;
    secretKey: number[];
}
export declare const AssociatedKeypairSchema: import("mongoose").Schema<Document<AssociatedKeypair, any, any>, import("mongoose").Model<Document<AssociatedKeypair, any, any>, any, any, any>, any, any>;
