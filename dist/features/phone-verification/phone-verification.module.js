"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const phone_verification_entity_1 = require("./phone-verification.entity");
const phone_verification_service_1 = require("./phone-verification.service");
const phone_verification_controller_1 = require("./phone-verification.controller");
const user_entity_1 = require("../../core/user/user.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let PhoneVerificationsModule = class PhoneVerificationsModule {
};
PhoneVerificationsModule = __decorate([
    common_1.Module({
        controllers: [phone_verification_controller_1.default],
        imports: [typeorm_1.TypeOrmModule.forFeature([phone_verification_entity_1.default, user_entity_1.UserEntity])],
        providers: [phone_verification_service_1.default],
    })
], PhoneVerificationsModule);
exports.default = PhoneVerificationsModule;
//# sourceMappingURL=phone-verification.module.js.map