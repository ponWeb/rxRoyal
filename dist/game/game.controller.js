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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const signedMessage_guard_1 = require("../auth/signedMessage.guard");
const user_service_1 = require("../user/user.service");
const gameId_body_1 = require("./validators/gameId.body");
const createGame_dto_1 = require("./dto/createGame.dto");
const game_serivce_1 = require("./game.serivce");
const publicKey_param_1 = require("./validators/publicKey.param");
let GameController = class GameController {
    constructor(gameService, userService) {
        this.gameService = gameService;
        this.userService = userService;
    }
    async createGame(req, createGameDto) {
        await this.gameService.create(req.user, createGameDto);
    }
    async joinGame(req, gameIdBody) {
        await this.gameService.join(gameIdBody.gameId, req.user);
    }
    async cancelGame(req, gameIdBody) {
        await this.gameService.cancel(gameIdBody.gameId, req.user);
    }
    async getActiveGames() {
        return await this.gameService.getActive();
    }
    async getLastEnded() {
        return await this.gameService.getLastEnded();
    }
    async getUserGames(publicKeyParam) {
        return await this.gameService.findByUserPublicKey(publicKeyParam.publicKey);
    }
};
__decorate([
    (0, common_1.UseGuards)(signedMessage_guard_1.AuthenticatedGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createGame_dto_1.CreateGameDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "createGame", null);
__decorate([
    (0, common_1.UseGuards)(signedMessage_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('/join'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gameId_body_1.GameIdBody]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "joinGame", null);
__decorate([
    (0, common_1.UseGuards)(signedMessage_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('/cancel'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gameId_body_1.GameIdBody]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "cancelGame", null);
__decorate([
    (0, common_1.Get)('/allActive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getActiveGames", null);
__decorate([
    (0, common_1.Get)('/lastEnded'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getLastEnded", null);
__decorate([
    (0, common_1.Get)('/u/:publicKey'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publicKey_param_1.PublicKeyParam]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getUserGames", null);
GameController = __decorate([
    (0, common_1.Controller)('game'),
    __metadata("design:paramtypes", [game_serivce_1.GameService, user_service_1.UserService])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map