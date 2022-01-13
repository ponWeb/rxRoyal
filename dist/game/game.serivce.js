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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web3_js_1 = require("@solana/web3.js");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const game_gateway_1 = require("./game.gateway");
const game_schema_1 = require("./game.schema");
const crypto_1 = require("crypto");
const csprng_1 = require("../utils/csprng");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'), 'confirmed');
const LAST_GAMES_TO_SHOW = 30;
let GameService = class GameService {
    constructor(gameModel, userService, gameGateway) {
        this.gameModel = gameModel;
        this.userService = userService;
        this.gameGateway = gameGateway;
    }
    async create(user, createGameDto) {
        if (user.balance < createGameDto.amount)
            throw new common_1.HttpException('Balance needs to be higher than the game bet', common_1.HttpStatus.FORBIDDEN);
        const newGame = new this.gameModel(createGameDto);
        newGame.creator = user;
        newGame.privateSeed = (0, csprng_1.default)(160, 36);
        newGame.privateSeedHash = (0, crypto_1.createHash)('sha256').update(newGame.privateSeed).digest('hex');
        await Promise.all([
            this.userService.changeBalance(user._id, -createGameDto.amount),
            newGame.save()
        ]);
        this.gameGateway.newGameNotify(newGame);
    }
    async join(gameId, user) {
        const game = await this.findById(gameId);
        if (!game)
            throw new common_1.HttpException('Game does not exists', common_1.HttpStatus.FORBIDDEN);
        if (game.status !== 'active')
            throw new common_1.HttpException('You can join only active games', common_1.HttpStatus.FORBIDDEN);
        if (user.balance < game.amount)
            throw new common_1.HttpException('Balance needs to be higher than the game bet', common_1.HttpStatus.FORBIDDEN);
        if (user._id.equals(game.creator._id))
            throw new common_1.HttpException('You can not join your own game', common_1.HttpStatus.FORBIDDEN);
        game.opponent = user;
        game.status = 'joined';
        await Promise.all([
            this.userService.changeBalance(user._id, -game.amount),
            game.save()
        ]);
        this.gameGateway.gameUpdateNotify(game);
        this.pickWinner(game);
    }
    async pickWinner(game) {
        const [{ blockhash }, privateSeed] = await Promise.all([
            connection.getRecentBlockhash(),
            this.gameModel.findById(game._id).select('privateSeed')
        ]);
        const seed = `${game.creator.publicKey}-${game.opponent.publicKey}-${privateSeed}-${blockhash}`;
        const resultHash = (0, crypto_1.createHash)('sha256').update(seed).digest('hex');
        const hashInt = parseInt(resultHash.slice(0, 8), 16);
        const result = hashInt % 2;
        const winner = game.creatorChoice === result ? game.creator : game.opponent;
        game.winner = winner;
        game.result = result;
        game.blockhash = blockhash;
        game.status = 'ended';
        await Promise.all([
            this.userService.changeBalance(winner._id, game.amount * 2, false),
            game.save()
        ]);
        this.gameGateway.gameUpdateNotify(game);
    }
    async cancel(gameId, user) {
        const game = await this.findById(gameId);
        if (!game)
            throw new common_1.HttpException('Game does not exists', common_1.HttpStatus.FORBIDDEN);
        if (!user._id.equals(game.creator._id))
            throw new common_1.HttpException('You can not cancel another person`s game', common_1.HttpStatus.FORBIDDEN);
        if (game.status !== 'active')
            throw new common_1.HttpException('You can cancel only active game', common_1.HttpStatus.FORBIDDEN);
        game.status = 'cancelled';
        await Promise.all([
            this.userService.changeBalance(game.creator._id, game.amount),
            game.save()
        ]);
        this.gameGateway.gameUpdateNotify(game);
    }
    async findById(userId) {
        return this.gameModel.findById(userId).populate('creator').populate('creator opponent winner').exec();
    }
    async findByUserId(userId) {
        const games = await this.gameModel.find({ $or: [{ creator: userId }, { opponent: userId }] }).populate('creator opponent winner').sort({ createdAt: -1 }).select('+privateSeed').exec();
        games.forEach(game => game.privateSeed = game.status === 'active' ? '-' : game.privateSeed);
        return games;
    }
    async findByUserPublicKey(publicKey) {
        const user = await this.userService.findByPublicKey(publicKey);
        if (!user)
            return null;
        return this.findByUserId(user._id);
    }
    async getActive() {
        return this.gameModel.find({ status: 'active' }).populate('creator opponent');
    }
    async getLastEnded() {
        return this.gameModel.find({ status: 'ended' }).populate('creator opponent winner').sort({ createdAt: -1 }).limit(LAST_GAMES_TO_SHOW);
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, user_service_1.UserService, game_gateway_1.GameGateway])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.serivce.js.map