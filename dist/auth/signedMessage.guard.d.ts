import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const SignedMessageAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class SignedMessageAuthGuard extends SignedMessageAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class UnAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
