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
exports.AssociatedKeypairService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const web3_js_1 = require("@solana/web3.js");
const mongoose_2 = require("mongoose");
const associatedKeypair_schema_1 = require("./associatedKeypair.schema");
let AssociatedKeypairService = class AssociatedKeypairService {
    constructor(associatedKeypairModel) {
        this.associatedKeypairModel = associatedKeypairModel;
    }
    async create() {
        const keypair = web3_js_1.Keypair.generate();
        const newKeypair = new this.associatedKeypairModel({
            publicKey: keypair.publicKey.toString(),
            secretKey: Array.from(keypair.secretKey)
        });
        await newKeypair.save();
        return newKeypair._id;
    }
    async findById(_id, selectSecretKey = false) {
        return this.associatedKeypairModel.findById(_id).select(selectSecretKey ? '+secretKey' : '');
    }
};
AssociatedKeypairService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(associatedKeypair_schema_1.AssociatedKeypair.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssociatedKeypairService);
exports.AssociatedKeypairService = AssociatedKeypairService;
//# sourceMappingURL=associatedKeypair.service.js.map