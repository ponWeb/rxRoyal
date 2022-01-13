"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociatedKeypairModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const associatedKeypair_schema_1 = require("./associatedKeypair.schema");
const associatedKeypair_service_1 = require("./associatedKeypair.service");
let AssociatedKeypairModule = class AssociatedKeypairModule {
};
AssociatedKeypairModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: associatedKeypair_schema_1.AssociatedKeypair.name, schema: associatedKeypair_schema_1.AssociatedKeypairSchema }])],
        providers: [associatedKeypair_service_1.AssociatedKeypairService],
        exports: [associatedKeypair_service_1.AssociatedKeypairService]
    })
], AssociatedKeypairModule);
exports.AssociatedKeypairModule = AssociatedKeypairModule;
//# sourceMappingURL=associatedKeypair.module.js.map