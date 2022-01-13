import { PublicKey } from '@solana/web3.js';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(publicKey: PublicKey, signedMessage: Uint8Array): Promise<User | null>;
}
