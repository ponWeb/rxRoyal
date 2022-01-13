import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Model, Types } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { CreateGameDto } from "./dto/createGame.dto";
import { GameGateway } from "./game.gateway";
import { Game, GameDocument } from "./game.schema";
import { createHash } from "crypto";
import csprng from "src/utils/csprng";

const connection = new Connection(
    clusterApiUrl('mainnet-beta'),
    'confirmed',
);

const LAST_GAMES_TO_SHOW = 30

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>, private userService: UserService, private gameGateway: GameGateway) { }

    async create(user: UserDocument, createGameDto: CreateGameDto) {
        if (user.balance < createGameDto.amount) throw new HttpException('Balance needs to be higher than the game bet', HttpStatus.FORBIDDEN)

        const newGame = new this.gameModel(createGameDto)
        newGame.creator = user
        newGame.privateSeed = csprng(160, 36)
        newGame.privateSeedHash = createHash('sha256').update(newGame.privateSeed).digest('hex')

        await Promise.all([
            this.userService.changeBalance(user._id, -createGameDto.amount),
            newGame.save()
        ])
        this.gameGateway.newGameNotify(newGame)
    }

    async join(gameId: Types.ObjectId, user: UserDocument) {
        const game = await this.findById(gameId)

        if (!game) throw new HttpException('Game does not exists', HttpStatus.FORBIDDEN)
        if (game.status !== 'active') throw new HttpException('You can join only active games', HttpStatus.FORBIDDEN)

        if (user.balance < game.amount) throw new HttpException('Balance needs to be higher than the game bet', HttpStatus.FORBIDDEN)
        if (user._id.equals(game.creator._id)) throw new HttpException('You can not join your own game', HttpStatus.FORBIDDEN)

        game.opponent = user
        game.status = 'joined'

        await Promise.all([
            this.userService.changeBalance(user._id, -game.amount),
            game.save()
        ])
        this.gameGateway.gameUpdateNotify(game)
        this.pickWinner(game)
    }

    async pickWinner(game: GameDocument) {
        const [{ blockhash }, privateSeed] = await Promise.all([
            connection.getRecentBlockhash(),
            this.gameModel.findById(game._id).select('privateSeed')
        ])
        const seed = `${game.creator.publicKey}-${game.opponent.publicKey}-${privateSeed}-${blockhash}`
        const resultHash = createHash('sha256').update(seed).digest('hex')
        const hashInt = parseInt(resultHash.slice(0, 8), 16)
        const result = hashInt % 2
        const winner = game.creatorChoice === result ? game.creator : game.opponent

        game.winner = winner
        game.result = result
        game.blockhash = blockhash
        game.status = 'ended'

        await Promise.all([
            this.userService.changeBalance(winner._id, game.amount * 2, false),
            game.save()
        ])
        this.gameGateway.gameUpdateNotify(game)
    }

    async cancel(gameId: Types.ObjectId, user: UserDocument) {
        const game = await this.findById(gameId)
        if (!game) throw new HttpException('Game does not exists', HttpStatus.FORBIDDEN)

        if (!user._id.equals(game.creator._id)) throw new HttpException('You can not cancel another person`s game', HttpStatus.FORBIDDEN)
        if (game.status !== 'active') throw new HttpException('You can cancel only active game', HttpStatus.FORBIDDEN)

        game.status = 'cancelled'
        await Promise.all([
            this.userService.changeBalance(game.creator._id, game.amount),
            game.save()
        ])
        this.gameGateway.gameUpdateNotify(game)
    }

    async findById(userId: Types.ObjectId): Promise<GameDocument | null> {
        return this.gameModel.findById(userId).populate('creator').populate('creator opponent winner').exec()
    }

    async findByUserId(userId: Types.ObjectId) {
        const games = await this.gameModel.find({ $or: [{ creator: userId }, { opponent: userId }] }).populate('creator opponent winner').sort({ createdAt: -1 }).select('+privateSeed').exec()
        games.forEach(game => game.privateSeed = game.status === 'active' ? '-' : game.privateSeed)

        return games
    }

    async findByUserPublicKey(publicKey: string) {
        const user = await this.userService.findByPublicKey(publicKey)

        if (!user) return null

        return this.findByUserId(user._id)
    }

    async getActive(): Promise<GameDocument[]> {
        return this.gameModel.find({ status: 'active' }).populate('creator opponent')
    }

    async getLastEnded(): Promise<GameDocument[]> {
        return this.gameModel.find({ status: 'ended' }).populate('creator opponent winner').sort({ createdAt: -1 }).limit(LAST_GAMES_TO_SHOW)
    }
}