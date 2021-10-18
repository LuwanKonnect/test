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
exports.PaypalEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let PaypalEntity = class PaypalEntity {
};
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    typeorm_1.PrimaryColumn({ unique: true }),
    __metadata("design:type", String)
], PaypalEntity.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User paypal payer ID',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], PaypalEntity.prototype, "payerId", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], PaypalEntity.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], PaypalEntity.prototype, "updated", void 0);
PaypalEntity = __decorate([
    typeorm_1.Entity('paypal')
], PaypalEntity);
exports.PaypalEntity = PaypalEntity;
//# sourceMappingURL=paypal.entity.js.map