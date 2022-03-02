import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/signedMessage.guard';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
import { PublicKeyDto } from './dto/publicKey.dto';
import { UserService } from './user.service';

@Controller('u')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('/requestWithdraw')
    async requestWithdraw(@Req() req, @Body() createWithdrawDto: CreateWithdrawDto) {
        const { user } = req

        return await this.userService.requestWithdraw(user, createWithdrawDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/pendingWithdraw')
    async getPendingWithdraw(@Req() req) {
        const { user } = req

        return await this.userService.getPendingWithdraw(user)
    }

    @Get('/:publicKey')
    async getUserProfile(@Param() publicKeyParam: PublicKeyDto) {
        return await this.userService.findByPublicKey(publicKeyParam.publicKey)
    }
}
