import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";

export type GameDocument = Game & Document

@Schema({ timestamps: true, versionKey: false })
export class Game {
    @Prop({ default: 'active', enum: ['active', 'joined', 'cancelled', 'ended'] })
    status: string

    @Prop({ required: true })
    amount: number

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
    creator: UserDocument

    @Prop({ required: true, enum: [0, 1] })
    creatorChoice: number

    @Prop({ default: 3 })
    fee: number

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    opponent: UserDocument

    @Prop({ required: true, select: false })
    privateSeed: string

    @Prop({ required: true })
    privateSeedHash: string

    @Prop()
    blockhash: string

    @Prop()
    result: number

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    winner: UserDocument
}

export const GameSchema = SchemaFactory.createForClass(Game)