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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Chat = class Chat {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'Chat ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Chat.prototype, "c_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'receiver id',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "receiver_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Comment content' }),
    swagger_1.ApiProperty({
        required: true,
        description: 'Comment content',
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Chat.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'chat status, 0 is unread, 1 is read. For future use',
    }),
    class_validator_1.Max(3),
    class_validator_1.Min(0),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Chat.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "is_deleted", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Chat.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Chat.prototype, "updated", void 0);
Chat = __decorate([
    typeorm_1.Entity()
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.entity.js.map