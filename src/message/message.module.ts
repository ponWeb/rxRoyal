import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MessageController } from "./message.controller";
import { MessageGateway } from "./message.gateway";
import { Message, MessageSchema } from "./message.schema";
import { MessageService } from "./message.service";

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers: [MessageService, MessageGateway],
    controllers: [MessageController]
})

export class MessageModule { }