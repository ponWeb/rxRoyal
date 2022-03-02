
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, optimisticConcurrency: true })
export class User {
    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ default: Date.now() - 3000 })
    lastMessageAt: number

    @Prop({ default: 0, min: 0 })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);