import { Document } from "mongoose";
import { UserDocument } from "src/user/user.schema";
export declare type GameDocument = Game & Document;
export declare class Game {
    status: string;
    amount: number;
    creator: UserDocument;
    creatorChoice: number;
    opponent: UserDocument;
    privateSeed: string;
    privateSeedHash: string;
    blockhash: string;
    result: number;
    winner: UserDocument;
}
export declare const GameSchema: import("mongoose").Schema<Document<Game, any, any>, import("mongoose").Model<Document<Game, any, any>, any, any, any>, any>;
