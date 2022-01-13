import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop({ required: true, unique: true })
    signature: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
