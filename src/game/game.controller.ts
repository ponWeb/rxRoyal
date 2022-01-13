import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AuthenticatedGuard } from 'src/auth/signedMessage.guard';
import { UserService } from 'src/user/user.service';
import { GameIdBody } from './validators/gameId.body';
import { CreateGameDto } from './dto/createGame.dto';
import { GameDocument } from './game.schema';
import { GameService } from './game.serivce';
import { PublicKeyParam } from './validators/publicKey.param';

@Controller('game')
export class GameController {
    constructor(private gameService: GameService, private userService: UserService) { }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(201)
    @Post()
    async createGame(@Req() req, @Body() createGameDto: CreateGameDto) {
        await this.gameService.create(req.user, createGameDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/join')
    async joinGame(@Req() req, @Body() gameIdBody: GameIdBody) {
        await this.gameService.join(gameIdBody.gameId, req.user)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/cancel')
    async cancelGame(@Req() req, @Body() gameIdBody: GameIdBody) {
        await this.gameService.cancel(gameIdBody.gameId, req.user)
    }

    @Get('/allActive')
    async getActiveGames(): Promise<GameDocument[]> {
        return await this.gameService.getActive()
    }

    @Get('/lastEnded')
    async getLastEnded(): Promise<GameDocument[]> {
        return await this.gameService.getLastEnded()
    }

    @Get('/u/:publicKey')
    async getUserGames(@Param() publicKeyParam: PublicKeyParam): Promise<GameDocument[]> {
        return await this.gameService.findByUserPublicKey(publicKeyParam.publicKey)
    }
}
