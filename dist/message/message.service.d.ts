import { Model } from "mongoose";
import { UserDocument } from "src/user/user.schema";
import { CreateMessageDto } from "./dto/createMessage.dto";
import { MessageGateway } from "./message.gateway";
import { Message, MessageDocument } from "./message.schema";
export declare class MessageService {
    private messageModel;
    private messageGateway;
    constructor(messageModel: Model<MessageDocument>, messageGateway: MessageGateway);
    getLast(): Promise<(Message & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    create(user: UserDocument, crateMessageDto: CreateMessageDto): Promise<void>;
}
