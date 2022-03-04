import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Model, ObjectId, Types } from "mongoose";
import { User, UserDocument } from "src/user/user.schema";
import { UserService } from "src/user/user.service";
import { CreateGameDto } from "./dto/createGame.dto";
import { GameGateway } from "./game.gateway";
import { Game, GameDocument } from "./game.schema";
import { GameIdDto } from "./dto/gameId.dto";
import { JoinGameDto } from "./dto/joinGame.dto";

const GAME_FEE = 4

const LAST_GAMES_TO_SHOW = 30

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>, private userService: UserService, private gameGateway: GameGateway) { }

    async create(user: UserDocument, createGameDto: CreateGameDto) {
        const payAmount = createGameDto.amount * (1 + GAME_FEE / 100)
        if (user.balance < payAmount) throw new HttpException(`Balance needs to be higher than the game bet + fee (${payAmount / LAMPORTS_PER_SOL} SOL)`, HttpStatus.FORBIDDEN)
        const userActiveCount = await this.userActiveCount(user._id)

        if (!(userActiveCount < 5)) throw new HttpException("You can't have more than 5 active games", HttpStatus.FORBIDDEN)

        const newGame = new this.gameModel(createGameDto)
        newGame.creator = user
        newGame.creatorMove = createGameDto.creatorMove

        try {
            await this.userService.changeBalance(user, -payAmount)
        } catch (e) {
            throw new HttpException('Balance needs to be higher than the game bet', HttpStatus.FORBIDDEN)
        }
        await newGame.save()
        this.gameGateway.newGameNotify(newGame)
    }

    async join(joinGameDto: JoinGameDto, user: UserDocument) {
        const game = await this.findById(joinGameDto.gameId)

        if (!game) throw new HttpException('Game does not exists', HttpStatus.FORBIDDEN)
        if (game.status !== 'active') throw new HttpException('You can join only active games', HttpStatus.FORBIDDEN)

        const payAmount = game.amount * (1 + game.fee / 100)
        if (user.balance < payAmount) throw new HttpException(`Balance needs to be higher than the game bet + fee (${payAmount / LAMPORTS_PER_SOL} SOL)`, HttpStatus.FORBIDDEN)
        if (user._id.equals(game.creator._id)) throw new HttpException('You can not join your own game', HttpStatus.FORBIDDEN)

        game.opponent = user
        game.opponentMove = joinGameDto.move
        game.status = 'joined'

        await Promise.all([
            this.userService.changeBalance(user, -payAmount),
            game.save()
        ])
        this.gameGateway.gameUpdateNotify(game)
        this.pickWinner(game)
    }

    async pickWinner(game: GameDocument) {
        game.endedAt = Date.now()
        game.status = 'ended'

        if (game.creatorMove === game.opponentMove) {
            await Promise.all([
                this.userService.changeBalance(game.creator, game.amount),
                this.userService.changeBalance(game.opponent, game.amount),
                game.save()
            ])
        } else {
            const moves = [game.creatorMove, game.opponentMove].sort()
            let winningChoice;
            if (moves[0] === 0 && moves[1] === 2) {
                winningChoice = 0
            } else {
                winningChoice = moves[1]
            }

            const winner = game.creatorMove === winningChoice ? game.creator : game.opponent
            game.winner = winner

            await Promise.all([
                this.userService.changeBalance(winner, game.amount * 2, false),
                game.save()
            ])
        }

        this.gameGateway.gameUpdateNotify(game)
    }

    async cancel(gameIdDto: GameIdDto, user: UserDocument) {
        const game = await this.findById(gameIdDto.gameId)
        if (!game) throw new HttpException('Game does not exists', HttpStatus.FORBIDDEN)

        if (!user._id.equals(game.creator._id)) throw new HttpException('You can not cancel another person`s game', HttpStatus.FORBIDDEN)
        if (game.status !== 'active') throw new HttpException('You can cancel only active game', HttpStatus.FORBIDDEN)

        game.status = 'cancelled'
        await Promise.all([
            this.userService.changeBalance(game.creator, game.amount * (1 + game.fee / 100)),
            game.save()
        ])
        this.gameGateway.gameUpdateNotify(game)
    }

    async findById(userId: Types.ObjectId): Promise<GameDocument | null> {
        return this.gameModel.findById(userId).populate('creator opponent winner').exec()
    }

    async findByUserId(userId: Types.ObjectId) {
        const games = await this.gameModel.find({ $or: [{ creator: userId }, { opponent: userId }], status: 'ended' })
            .populate('creator opponent winner')
            .sort({ updatedAt: -1 })

        return games
    }

    async findByUserPublicKey(publicKey: string) {
        const user = await this.userService.findByPublicKey(publicKey)

        if (!user) return null

        return this.findByUserId(user._id)
    }

    async getActive(): Promise<GameDocument[]> {
        return this.gameModel.find({ status: 'active' }).populate('creator opponent').select('-creatorMove')
    }

    async getLastEnded(): Promise<GameDocument[]> {
        return this.gameModel.find({ status: 'ended' }).populate('creator opponent winner').sort({ updatedAt: -1 }).limit(LAST_GAMES_TO_SHOW)
    }

    async userActiveCount(userId: ObjectId): Promise<number> {
        return this.gameModel.count({ creator: userId, status: 'active' })
    }
}