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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web3_js_1 = require("@solana/web3.js");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const transaction_schema_1 = require("./transaction.schema");
const web3_js_2 = require("@solana/web3.js");
const serviceSecretKey = require("../serviceSecretKey.json");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('devnet'), 'confirmed');
const serviceKeypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(serviceSecretKey));
let TransactionService = class TransactionService {
    constructor(transactionModel, userService) {
        this.transactionModel = transactionModel;
        this.userService = userService;
    }
    async sendLamportsFromServer(receiverPublicKey, amount) {
        try {
            const tx = new web3_js_2.Transaction().add(web3_js_1.SystemProgram.transfer({
                fromPubkey: serviceKeypair.publicKey,
                toPubkey: new web3_js_1.PublicKey(receiverPublicKey),
                lamports: amount
            }));
            await connection.sendTransaction(tx, [serviceKeypair]);
        }
        catch (e) {
            common_1.Logger.log(e);
            throw new common_1.HttpException('Server Withdraw Error. Try again later', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBySignatureFromBlockchain(signature) {
        const transaction = await connection.getParsedConfirmedTransaction(signature);
        return transaction;
    }
    getType(transaction) {
        const { destination, source } = transaction.transaction.message.instructions[0].parsed.info;
        if (destination === serviceKeypair.publicKey.toString()) {
            return 'deposit';
        }
        else if (source === serviceKeypair.publicKey.toString()) {
            return 'withdraw';
        }
    }
    getSender(transaction) {
        const { source } = transaction.transaction.message.instructions[0].parsed.info;
        return new web3_js_1.PublicKey(source);
    }
    getAmount(transaction) {
        const { lamports } = transaction.transaction.message.instructions[0].parsed.info;
        return lamports;
    }
    async getManyFromBlockchain() {
        const transactions = await connection.getSignaturesForAddress(serviceKeypair.publicKey);
        return transactions;
    }
    async getManyFromDb() {
        const transactions = await this.transactionModel.find();
        return transactions;
    }
    async getUnconfirmed() {
        const blockchainTransactions = await this.getManyFromBlockchain();
        const dbTransactions = await this.getManyFromDb();
        const dbTransactionsSignatures = dbTransactions.map(tr => tr.signature);
        const unconfirmedTransactions = blockchainTransactions.filter(tr => !dbTransactionsSignatures.includes(tr.signature));
        return unconfirmedTransactions;
    }
    async saveTransactionToDb(transaction) {
        const newTransaction = new this.transactionModel({ signature: transaction.transaction.signatures[0] });
        await newTransaction.save();
    }
    async confirmMany(transactions) {
        for (let tr of transactions) {
            const transaction = await this.getBySignatureFromBlockchain(tr.signature);
            const transactionType = this.getType(transaction);
            if (transactionType === 'deposit') {
                const sender = this.getSender(transaction);
                const amount = this.getAmount(transaction);
                const user = await this.userService.findByPublicKey(sender.toString());
                if (!user)
                    return;
                await this.userService.changeBalance(user._id, amount, true, true);
            }
            await this.saveTransactionToDb(transaction);
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model, user_service_1.UserService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map