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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../common/constants");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
let UserEntity = class UserEntity extends constants_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = dto_1.UserDto;
    }
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ length: 80 }),
    __metadata("design:type", String)
], UserEntity.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({ comment: 'Mobile', length: 30, unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'address',
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'lat',
    }),
    typeorm_1.Column({ type: 'float', default: 0.00 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'lng',
    }),
    typeorm_1.Column({ type: 'float', default: 0.00 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "lng", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'suburb',
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "suburb", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'bsb',
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "bsb", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'account_number',
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "account_number", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score as a lender',
    }),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "lender_rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score as a borrower',
    }),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "borrower_rating", void 0);
__decorate([
    typeorm_1.Column({ length: 14, default: '11111111111111' }),
    __metadata("design:type", String)
], UserEntity.prototype, "available", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('user')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map