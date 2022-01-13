import { Document } from "mongoose";
import { UserDocument } from "src/user/user.schema";
export declare type MessageDocument = Message & Document;
export declare class Message {
    creator: UserDocument;
    content: string;
}
export declare const MessageSchema: import("mongoose").Schema<Document<Message, any, any>, import("mongoose").Model<Document<Message, any, any>, any, any, any>, any>;
