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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_gateway_1 = require("./message.gateway");
const message_schema_1 = require("./message.schema");
let MessageService = class MessageService {
    constructor(messageModel, messageGateway) {
        this.messageModel = messageModel;
        this.messageGateway = messageGateway;
    }
    async getLast() {
        const messages = this.messageModel.find().populate('creator').sort({ createdAt: -1 }).limit(30);
        return messages;
    }
    async create(user, crateMessageDto) {
        const { content } = crateMessageDto;
        const newMessage = new this.messageModel({ content, creator: user });
        await newMessage.save();
        this.messageGateway.newMessageNotify(newMessage);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, message_gateway_1.MessageGateway])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map