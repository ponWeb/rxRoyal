import { Model, Types } from "mongoose";
import { UserDocument } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { CreateGameDto } from "./dto/createGame.dto";
import { GameGateway } from "./game.gateway";
import { Game, GameDocument } from "./game.schema";
export declare class GameService {
    private gameModel;
    private userService;
    private gameGateway;
    constructor(gameModel: Model<GameDocument>, userService: UserService, gameGateway: GameGateway);
    create(user: UserDocument, createGameDto: CreateGameDto): Promise<void>;
    join(gameId: Types.ObjectId, user: UserDocument): Promise<void>;
    pickWinner(game: GameDocument): Promise<void>;
    cancel(gameId: Types.ObjectId, user: UserDocument): Promise<void>;
    findById(userId: Types.ObjectId): Promise<GameDocument | null>;
    findByUserId(userId: Types.ObjectId): Promise<(Game & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    findByUserPublicKey(publicKey: string): Promise<(Game & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    getActive(): Promise<GameDocument[]>;
    getLastEnded(): Promise<GameDocument[]>;
}
