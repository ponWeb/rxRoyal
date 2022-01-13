import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UserDocument } from 'src/user/user.schema';
import { ObjectId } from 'mongoose';
import { MessageDocument } from './message.schema';

@WebSocketGateway({ namespace: 'message', cors: true })
export class MessageGateway implements OnGatewayConnection {
    @WebSocketServer() server: Server;

    handleConnection(client: any, ...args: any[]) {
    }

    newMessageNotify(message: MessageDocument): void {
        this.server.emit('newMessage', message)
    }
}