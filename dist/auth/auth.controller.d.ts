import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
declare type AuthMessage = {
    msg: string;
};
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(req: any): AuthMessage;
    state(req: any): {
        authenticated: boolean;
        user: User | {};
    };
    logout(req: any): AuthMessage;
}
export {};
