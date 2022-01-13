import { Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthenticatedGuard, SignedMessageAuthGuard, UnAuthenticatedGuard } from './signedMessage.guard';

type AuthMessage = { msg: string }

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) { }

    @UseGuards(SignedMessageAuthGuard)
    @UseGuards(UnAuthenticatedGuard)
    @Post('login')
    login(@Req() req): AuthMessage {
        return req.user
    }

    @Get('state')
    state(@Req() req): { authenticated: boolean, user: User | {} } {
        const { user } = req

        return { authenticated: !!user, user }
    }

    @UseGuards(AuthenticatedGuard)
    @Get('logout')
    logout(@Req() req): AuthMessage {
        req.logout()

        return {
            msg: 'Logged out!'
        }
    }
}
