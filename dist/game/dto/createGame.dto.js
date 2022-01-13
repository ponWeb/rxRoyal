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
exports.CreateGameDto = void 0;
const web3_js_1 = require("@solana/web3.js");
const class_validator_1 = require("class-validator");
class CreateGameDto {
}
__decorate([
    (0, class_validator_1.IsInt)({ message: 'Amount should be integer' }),
    (0, class_validator_1.Min)(.05 * web3_js_1.LAMPORTS_PER_SOL, { message: 'Minimum bet is 0.05 SOLs' }),
    __metadata("design:type", Number)
], CreateGameDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)([0, 1], { message: 'Choice should be 0 or 1' }),
    __metadata("design:type", Number)
], CreateGameDto.prototype, "creatorChoice", void 0);
exports.CreateGameDto = CreateGameDto;
//# sourceMappingURL=createGame.dto.js.map