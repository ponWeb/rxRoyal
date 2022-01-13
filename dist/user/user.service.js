"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web3_js_1 = require("@solana/web3.js");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const tweetnacl_1 = require("tweetnacl");
const user_gateway_1 = require("./user.gateway");
const associatedKeypair_service_1 = require("../associatedKeypair/associatedKeypair.service");
const transaction_service_1 = require("../transaction/transaction.service");
const messageToSign = Uint8Array.from(Buffer.from('I agree with Terms & Services of CookiMania.'));
let UserService = class UserService {
    constructor(userModel, userGateway, associatedKeypairService, transactionService) {
        this.userModel = userModel;
        this.userGateway = userGateway;
        this.associatedKeypairService = associatedKeypairService;
        this.transactionService = transactionService;
    }
    async create(createUserDto) {
        const associatedKeypairId = await this.associatedKeypairService.create();
        const createdUser = new this.userModel(Object.assign(Object.assign({}, createUserDto), { associatedKeypair: associatedKeypairId }));
        return createdUser.save();
    }
    async findById(userId) {
        return this.userModel.findById(userId).exec();
    }
    async findByPublicKey(publicKey) {
        return this.userModel.findOne({ publicKey }).exec();
    }
    async verifySignature(publicKey, signedMessage) {
        const pK = new web3_js_1.PublicKey(publicKey);
        const isVerified = tweetnacl_1.sign.detached.verify(messageToSign, signedMessage, Uint8Array.from(pK.toBuffer()));
        return isVerified;
    }
    async changeBalance(userId, amount, notify = true, fromDeposit = false) {
        await this.userModel.updateOne({ _id: userId }, { $inc: { balance: amount } }).exec();
        notify ? this.userGateway.balanceChangeNotify(userId, amount, fromDeposit) : null;
    }
    async getAssociatedKeypair(user) {
        return this.associatedKeypairService.findById(user.associatedKeypair._id, true);
    }
    async requestWithdraw(user, createWithdrawDto) {
        const { amount } = createWithdrawDto;
        if (user.balance < amount)
            throw new common_1.HttpException('Balance needs to be higher than the withdraw amount', common_1.HttpStatus.FORBIDDEN);
        const [associatedKeypair] = await Promise.all([
            this.associatedKeypairService.findById(user.associatedKeypair._id),
            this.changeBalance(user._id, -amount, false)
        ]);
        await this.transactionService.sendLamportsFromServer(associatedKeypair.publicKey, amount);
        this.userGateway.balanceChangeNotify(user._id, -amount);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    __metadata("design:paramtypes", [mongoose_2.Model, user_gateway_1.UserGateway, associatedKeypair_service_1.AssociatedKeypairService, transaction_service_1.TransactionService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map