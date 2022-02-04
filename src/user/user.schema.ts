import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaType, SchemaTypes } from 'mongoose';
import { AssociatedKeypairDocument } from 'src/associatedKeypair/associatedKeypair.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ unique: true })
    username: string;

    @Prop({ type: SchemaTypes.ObjectId, required: true, unique: true })
    associatedKeypair: AssociatedKeypairDocument

    @Prop({ default: Date.now() - 3000 })
    lastMessageAt: number

    @Prop({ default: 0 })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
