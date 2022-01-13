import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDocument } from './user.schema';
import { UserGateway } from './user.gateway';
import { AssociatedKeypairService } from 'src/associatedKeypair/associatedKeypair.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';
export declare class UserService {
    private userModel;
    private userGateway;
    private associatedKeypairService;
    private transactionService;
    constructor(userModel: Model<UserDocument>, userGateway: UserGateway, associatedKeypairService: AssociatedKeypairService, transactionService: TransactionService);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findById(userId: ObjectId): Promise<UserDocument | null>;
    findByPublicKey(publicKey: string): Promise<UserDocument | null>;
    verifySignature(publicKey: string, signedMessage: Uint8Array): Promise<boolean>;
    changeBalance(userId: ObjectId, amount: number, notify?: boolean, fromDeposit?: boolean): Promise<void>;
    getAssociatedKeypair(user: UserDocument): Promise<import("../associatedKeypair/associatedkeypair.schema").AssociatedKeypairDocument>;
    requestWithdraw(user: UserDocument, createWithdrawDto: CreateWithdrawDto): Promise<void>;
}
