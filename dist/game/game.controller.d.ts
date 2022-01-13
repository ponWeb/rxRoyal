import { UserService } from 'src/user/user.service';
import { GameIdBody } from './validators/gameId.body';
import { CreateGameDto } from './dto/createGame.dto';
import { GameDocument } from './game.schema';
import { GameService } from './game.serivce';
import { PublicKeyParam } from './validators/publicKey.param';
export declare class GameController {
    private gameService;
    private userService;
    constructor(gameService: GameService, userService: UserService);
    createGame(req: any, createGameDto: CreateGameDto): Promise<void>;
    joinGame(req: any, gameIdBody: GameIdBody): Promise<void>;
    cancelGame(req: any, gameIdBody: GameIdBody): Promise<void>;
    getActiveGames(): Promise<GameDocument[]>;
    getLastEnded(): Promise<GameDocument[]>;
    getUserGames(publicKeyParam: PublicKeyParam): Promise<GameDocument[]>;
}
