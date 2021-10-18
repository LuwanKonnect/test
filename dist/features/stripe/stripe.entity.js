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
exports.StripeEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let StripeEntity = class StripeEntity {
};
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    typeorm_1.PrimaryColumn({ unique: true }),
    __metadata("design:type", String)
], StripeEntity.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'Customer ID',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], StripeEntity.prototype, "customerId", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'Account ID',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], StripeEntity.prototype, "accountId", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'Subscription ID',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], StripeEntity.prototype, "subscriptionId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], StripeEntity.prototype, "monthlySubscriptionStatus", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], StripeEntity.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], StripeEntity.prototype, "updated", void 0);
StripeEntity = __decorate([
    typeorm_1.Entity('stripe')
], StripeEntity);
exports.StripeEntity = StripeEntity;
//# sourceMappingURL=stripe.entity.js.map