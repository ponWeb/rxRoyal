import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthenticatedGuard } from 'src/auth/signedMessage.guard';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }

    @Get('/last')
    async getLast() {
        const messages = await this.messageService.getLast()

        return messages
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(201)
    @Post()
    async createMessage(@Req() req, @Body() crateMessageDto: CreateMessageDto) {
        const { user } = req

        return await this.messageService.create(user, crateMessageDto)
    }

}
