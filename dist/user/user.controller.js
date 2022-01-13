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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const signedMessage_guard_1 = require("../auth/signedMessage.guard");
const publicKey_param_1 = require("../game/validators/publicKey.param");
const createWithdraw_dto_1 = require("./dto/createWithdraw.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAssociatedKeypair(req) {
        const { user } = req;
        return await this.userService.getAssociatedKeypair(user);
    }
    async requestWithdraw(req, createWithdrawDto) {
        const { user } = req;
        return await this.userService.requestWithdraw(user, createWithdrawDto);
    }
    async getUserProfile(publicKeyParam) {
        return await this.userService.findByPublicKey(publicKeyParam.publicKey);
    }
};
__decorate([
    (0, common_1.UseGuards)(signedMessage_guard_1.AuthenticatedGuard),
    (0, common_1.Get)('/associatedKeypair'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAssociatedKeypair", null);
__decorate([
    (0, common_1.UseGuards)(signedMessage_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('/requestWithdraw'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createWithdraw_dto_1.CreateWithdrawDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestWithdraw", null);
__decorate([
    (0, common_1.Get)('/:publicKey'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publicKey_param_1.PublicKeyParam]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
UserController = __decorate([
    (0, common_1.Controller)('u'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map