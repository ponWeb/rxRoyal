import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { UserDocument } from "src/user/user.schema";

export type MessageDocument = Message & Document

@Schema({ timestamps: true, versionKey: false })
export class Message {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    creator: UserDocument

    @Prop()
    content: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)