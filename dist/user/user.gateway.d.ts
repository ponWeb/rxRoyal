import { OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class UserGateway implements OnGatewayConnection, OnGatewayInit {
    server: Server;
    afterInit(server: Server): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    handleConnection(client: Socket, ...args: any[]): void;
    handleSubscribeToProfile(client: Socket, _id: string): void;
    balanceChangeNotify(_id: Object, balance: number, fromDeposit?: boolean): void;
}
