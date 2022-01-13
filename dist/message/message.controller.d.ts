/// <reference types="mongoose" />
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    getLast(): Promise<(import("./message.schema").Message & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    createMessage(req: any, crateMessageDto: CreateMessageDto): Promise<void>;
}
