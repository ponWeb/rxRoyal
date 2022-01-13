import { Strategy } from "passport-custom";
import { User } from "src/user/user.schema";
import { AuthService } from "./auth.service";
declare const SignedMessageStrategy_base: new (...args: any[]) => Strategy;
export declare class SignedMessageStrategy extends SignedMessageStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: any): Promise<User>;
}
export {};
