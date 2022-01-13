import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayInit,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { sessionMiddleware } from 'src/main';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedGuard } from 'src/auth/signedMessage.guard';
import * as sharedSession from 'express-socket.io-session'

@WebSocketGateway({ namespace: 'user', cors: true })
export class UserGateway implements OnGatewayConnection, OnGatewayInit {
    server: Server;

    afterInit(server: Server) {
        server.use(sharedSession(sessionMiddleware))
        this.server = server
        return server
    }

    handleConnection(client: Socket, ...args: any[]) {
    }

    @SubscribeMessage('subscribeToProfile')
    handleSubscribeToProfile(client: Socket, _id: string) {
        client.join(_id)
    }

    balanceChangeNotify(_id: Object, balance: number, fromDeposit = false) {
        this.server.to(_id.toString()).emit('balanceChange', balance, fromDeposit)
    }
}