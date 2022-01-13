import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AssociatedKeypairDocument = AssociatedKeypair & Document

@Schema({ versionKey: false })
export class AssociatedKeypair {
    @Prop({ required: true })
    publicKey: string

    @Prop({ required: true, select: false })
    secretKey: number[]
}

export const AssociatedKeypairSchema = SchemaFactory.createForClass(AssociatedKeypair)