import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { Model, ObjectId } from "mongoose";
import { AssociatedKeypairDocument, AssociatedKeypair } from "./associatedKeypair.schema";

@Injectable()
export class AssociatedKeypairService {
    constructor(@InjectModel(AssociatedKeypair.name) private associatedKeypairModel: Model<AssociatedKeypairDocument>) { }

    async create(): Promise<AssociatedKeypairDocument> {
        const keypair = Keypair.generate()

        const newKeypair = new this.associatedKeypairModel({
            publicKey: keypair.publicKey.toString(),
            secretKey: Array.from(keypair.secretKey)
        })

        await newKeypair.save()

        return newKeypair
    }

    async findById(_id: ObjectId, selectSecretKey = false): Promise<AssociatedKeypairDocument> {
        return this.associatedKeypairModel.findById(_id).select(selectSecretKey ? '+secretKey' : '')
    }
}