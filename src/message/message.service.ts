import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Model, ObjectId } from "mongoose";
import { UserDocument } from "src/user/user.schema";
import { CreateMessageDto } from "./dto/createMessage.dto";
import { MessageGateway } from "./message.gateway";
import { Message, MessageDocument } from "./message.schema";

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>, private messageGateway: MessageGateway) { }

    async getLast() {
        const messages = this.messageModel.find().populate('creator').sort({ createdAt: -1 }).limit(30)

        return messages
    }

    async create(user: UserDocument, crateMessageDto: CreateMessageDto) {
        const { content } = crateMessageDto

        const newMessage = new this.messageModel({ content, creator: user })

        await newMessage.save()

        this.messageGateway.newMessageNotify(newMessage)
    }

}