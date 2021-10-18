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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let PhoneVerificationEntity = class PhoneVerificationEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    class_validator_1.IsUUID('4'),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "country_code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "verification_code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneVerificationEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], PhoneVerificationEntity.prototype, "allow_login", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], PhoneVerificationEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], PhoneVerificationEntity.prototype, "updatedAt", void 0);
PhoneVerificationEntity = __decorate([
    typeorm_1.Entity('phone_verification')
], PhoneVerificationEntity);
exports.default = PhoneVerificationEntity;
//# sourceMappingURL=phone-verification.entity.js.map