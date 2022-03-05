import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PublicKey } from '@solana/web3.js';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';
import { sign } from 'tweetnacl'
import { UserGateway } from './user.gateway';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';

const messageToSign = Uint8Array.from(Buffer.from('Login to the Degen Games'))

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private userGateway: UserGateway, @Inject(forwardRef(() => TransactionService)) private transactionService: TransactionService) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const createdUser = new this.userModel(createUserDto)

        return createdUser.save()
    }

    async findById(userId: ObjectId): Promise<UserDocument | null> {
        return this.userModel.findById(userId).exec()
    }

    async findByPublicKey(publicKey: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ publicKey }).exec()
    }

    async verifySignature(publicKey: string, signedMessage: Uint8Array): Promise<boolean> {
        const pK = new PublicKey(publicKey)

        const isVerified = sign.detached.verify(messageToSign, signedMessage, Uint8Array.from(pK.toBuffer()))
        return isVerified
    }

    async changeBalance(user: UserDocument, amount: number, options?: { disableNotification?: boolean, fromDeposit?: boolean }) {
        user.balance += amount
        await user.save()
        options?.disableNotification ? null : this.userGateway.balanceChangeNotify(user._id, amount, { fromDeposit: options?.fromDeposit })
    }

    async updateLastMessage(userId: ObjectId) {
        await this.userModel.updateOne({ _id: userId }, { lastMessageAt: Date.now() })
    }

    async requestWithdraw(user: UserDocument, createWithdrawDto: CreateWithdrawDto) {
        const { amount } = createWithdrawDto

        if (user.balance < amount) throw new HttpException('Balance needs to be higher than the withdraw amount', HttpStatus.FORBIDDEN)
        const pendingWithdraw = await this.transactionService.getPendingWithdraw(user)

        if (pendingWithdraw) throw new HttpException('You already have pending withdraw', HttpStatus.FORBIDDEN)

        const [withdraw] = await Promise.all([
            this.transactionService.createWithdrawTx(user.publicKey, amount),
            this.changeBalance(user, -amount)
        ])

        return withdraw
    }

    async getPendingWithdraw(user: UserDocument) {
        return this.transactionService.getPendingWithdraw(user)
    }
}