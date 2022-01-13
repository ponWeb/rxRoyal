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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWithdrawDto = void 0;
const web3_js_1 = require("@solana/web3.js");
const class_validator_1 = require("class-validator");
class CreateWithdrawDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0.01 * web3_js_1.LAMPORTS_PER_SOL, { message: 'Minimum withdraw is 0.01 SOLs' }),
    __metadata("design:type", Number)
], CreateWithdrawDto.prototype, "amount", void 0);
exports.CreateWithdrawDto = CreateWithdrawDto;
//# sourceMappingURL=createWithdraw.dto.js.map