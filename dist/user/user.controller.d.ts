import { PublicKeyParam } from 'src/game/validators/publicKey.param';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAssociatedKeypair(req: any): Promise<import("../associatedKeypair/associatedKeypair.schema").AssociatedKeypairDocument>;
    requestWithdraw(req: any, createWithdrawDto: CreateWithdrawDto): Promise<void>;
    getUserProfile(publicKeyParam: PublicKeyParam): Promise<import("./user.schema").UserDocument>;
}
