import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/signedMessage.guard';
import { PublicKeyParam } from 'src/game/validators/publicKey.param';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
import { UserService } from './user.service';

@Controller('u')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthenticatedGuard)
    @Get('/associatedKeypair')
    async getAssociatedKeypair(@Req() req) {
        const { user } = req

        return await this.userService.getAssociatedKeypair(user)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/requestWithdraw')
    async requestWithdraw(@Req() req, @Body() createWithdrawDto: CreateWithdrawDto) {
        const { user } = req

        return await this.userService.requestWithdraw(user, createWithdrawDto)
    }

    @Get('/:publicKey')
    async getUserProfile(@Param() publicKeyParam: PublicKeyParam) {
        return await this.userService.findByPublicKey(publicKeyParam.publicKey)
    }
}
