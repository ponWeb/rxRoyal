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
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const main_1 = require("../main");
const sharedSession = require("express-socket.io-session");
let UserGateway = class UserGateway {
    afterInit(server) {
        server.use(sharedSession(main_1.sessionMiddleware));
        this.server = server;
        return server;
    }
    handleConnection(client, ...args) {
    }
    handleSubscribeToProfile(client, _id) {
        client.join(_id);
    }
    balanceChangeNotify(_id, balance, fromDeposit = false) {
        this.server.to(_id.toString()).emit('balanceChange', balance, fromDeposit);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('subscribeToProfile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], UserGateway.prototype, "handleSubscribeToProfile", null);
UserGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'user', cors: true })
], UserGateway);
exports.UserGateway = UserGateway;
//# sourceMappingURL=user.gateway.js.map