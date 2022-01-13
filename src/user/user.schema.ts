import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';
import { AssociatedKeypairDocument } from 'src/associatedKeypair/associatedKeypair.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
    associatedKeypair: AssociatedKeypairDocument

    @Prop({ type: Date, default: Date.now() - 1000 })
    lastMessageAt: Date

    @Prop({ default: 0 })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
