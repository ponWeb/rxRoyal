import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDocument } from './message.schema';
export declare class MessageGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    newMessageNotify(message: MessageDocument): void;
}
