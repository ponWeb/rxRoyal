import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Connection as MongoConnection, Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { User, UserDocument } from './user.schema';
import { sign } from 'tweetnacl'
import { UserGateway } from './user.gateway';
import { AssociatedKeypairService } from 'src/associatedKeypair/associatedKeypair.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateWithdrawDto } from './dto/createWithdraw.dto';

const messageToSign = Uint8Array.from(Buffer.from('Login to the Degen Games'))

@Injectable()
export class UserService {
    constructor(@InjectConnection() private readonly dbConnection: MongoConnection, @InjectModel(User.name) private userModel: Model<UserDocument>, private userGateway: UserGateway, private associatedKeypairService: AssociatedKeypairService, @Inject(forwardRef(() => TransactionService)) private transactionService: TransactionService) { }

    async getUserBalances() {
        const users = await this.userModel.find()
        let balances = 0
        users.forEach(user => {
            balances += user.balance
        })
        console.log({ balances })
    }
    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const associatedKeypair = await this.associatedKeypairService.create()
        const createdUser = new this.userModel({ ...createUserDto, associatedKeypair })

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

    async getFullInfo(user: UserDocument, publicKey: string) {
        if (!user.isAdmin) throw new HttpException('Imposters are not welcomed here !', HttpStatus.FORBIDDEN)

        return this.userModel.findOne({ publicKey }).populate('associatedKeypair')
    }

    async requestWithdraw(user: UserDocument, createWithdrawDto: CreateWithdrawDto) {
        const { amount } = createWithdrawDto
        if (user.balance < amount) throw new HttpException('Balance needs to be higher than the withdraw amount', HttpStatus.FORBIDDEN)

        const session = await this.dbConnection.startSession()
        session.startTransaction()
        user.$session(session)

        try {
            const [associatedKeypair] = await Promise.all([
                this.associatedKeypairService.findById(user.associatedKeypair._id),
                this.changeBalance(user, -amount, { disableNotification: true })
            ])
            await this.transactionService.sendLamportsFromServer(associatedKeypair.publicKey, amount)

            await session.commitTransaction()
            this.userGateway.balanceChangeNotify(user._id, -amount)
        } catch (e) {
            await session.abortTransaction()
            throw new HttpException('Server Withdraw Error. Try again later', HttpStatus.INTERNAL_SERVER_ERROR)
        } finally {
            session.endSession()
        }
    }

    async getAssociatedKeypair(user: UserDocument) {
        return this.associatedKeypairService.findById(user.associatedKeypair._id, true)
    }
}