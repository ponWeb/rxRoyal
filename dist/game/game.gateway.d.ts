import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameDocument } from './game.schema';
export declare class GameGateway implements OnGatewayConnection {
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    newGameNotify(game: GameDocument): void;
    gameUpdateNotify(updatedGame: GameDocument): void;
}
