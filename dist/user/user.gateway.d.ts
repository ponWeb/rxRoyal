import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class UserGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: Socket, ...args: any[]): void;
    handleSubscribeToProfile(client: Socket, _id: string): void;
    balanceChangeNotify(_id: Object, balance: number, fromDeposit?: boolean): void;
}
