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
exports.SignedMessageStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const web3_js_1 = require("@solana/web3.js");
const passport_custom_1 = require("passport-custom");
const auth_service_1 = require("./auth.service");
let SignedMessageStrategy = class SignedMessageStrategy extends (0, passport_1.PassportStrategy)(passport_custom_1.Strategy, "signedMessage") {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(req) {
        const { publicKey, signedMessage } = req.body;
        const publicKeyParsed = new web3_js_1.PublicKey(Buffer.from(publicKey));
        return await this.authService.validateUser(publicKeyParsed, Uint8Array.from(signedMessage));
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignedMessageStrategy.prototype, "validate", null);
SignedMessageStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], SignedMessageStrategy);
exports.SignedMessageStrategy = SignedMessageStrategy;
//# sourceMappingURL=signedMessage.strategy.js.map