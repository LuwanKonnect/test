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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/common/decorators/core");
const phone_verification_service_1 = require("./phone-verification.service");
let PhoneVerificationController = class PhoneVerificationController {
    constructor(phoneVerificationService) {
        this.phoneVerificationService = phoneVerificationService;
    }
    async create(params) {
        return this.phoneVerificationService.create(params.allowLogin, params.countryCode, params.id, params.phoneNumber, params.userId);
    }
    async resend(params) {
        return this.phoneVerificationService.resend(params.id);
    }
    async verifyCode(params) {
        return this.phoneVerificationService.verifyCode(params.id, params.verificationCode);
    }
};
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhoneVerificationController.prototype, "create", null);
__decorate([
    common_1.Post('resend'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhoneVerificationController.prototype, "resend", null);
__decorate([
    common_1.Post('verifyCode'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PhoneVerificationController.prototype, "verifyCode", null);
PhoneVerificationController = __decorate([
    core_1.Controller('phone-verification'),
    __metadata("design:paramtypes", [phone_verification_service_1.default])
], PhoneVerificationController);
exports.default = PhoneVerificationController;
//# sourceMappingURL=phone-verification.controller.js.map