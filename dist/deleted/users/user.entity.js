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
exports.userResponseDTO = exports.LoginDTO = exports.Cards = exports.User = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let User = class User {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'User ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Email',
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty({ message: 'email cannot be empty' }),
    class_validator_1.IsString({ message: 'the value must be a string' }),
    typeorm_1.Column({ comment: 'Email', length: 130, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'password cannot be empty' }),
    swagger_1.ApiProperty({
        description: 'Password',
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'Mobile Phone',
    }),
    typeorm_1.Column({ comment: 'Mobile', length: 30, unique: true }),
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'Avatar',
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'FullName',
    }),
    typeorm_1.Column({ comment: 'fullName', length: 130, default: null }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_deleted", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updated", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'address',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'city',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'country',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'state',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Monday morning, format should be 7:00_11:00',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "monday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Monday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "monday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of tuesday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "tuesday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of tuesday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "tuesday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Wednesday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "wednesday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Wednesday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "wednesday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Thursday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "thursday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Thursday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "thursday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Friday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "friday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Friday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "friday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Saturday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "saturday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Saturday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "saturday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Sunday morning',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "sunday_am", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'the availability of Sunday afternoon',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "sunday_pm", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'bsb',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "bsb", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'account_number',
        required: false,
    }),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], User.prototype, "account_number", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score as a lender',
    }),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], User.prototype, "lender_rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score as a borrower',
    }),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], User.prototype, "borrower_rating", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
let Cards = class Cards {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'card ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cards.prototype, "c_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'user ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Cards.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'Card token ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Cards.prototype, "token_id", void 0);
Cards = __decorate([
    typeorm_1.Entity()
], Cards);
exports.Cards = Cards;
class LoginDTO {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Email', example: 'user1@gmail.com' }),
    class_validator_1.IsNotEmpty({ message: 'Email cannot be empty' }),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Password', example: 'Aa123456' }),
    class_validator_1.IsNotEmpty({ message: 'Password cannot be empty' }),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
exports.LoginDTO = LoginDTO;
class userResponseDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", User)
], userResponseDTO.prototype, "user", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'JWT token' }),
    __metadata("design:type", String)
], userResponseDTO.prototype, "token", void 0);
exports.userResponseDTO = userResponseDTO;
//# sourceMappingURL=user.entity.js.map