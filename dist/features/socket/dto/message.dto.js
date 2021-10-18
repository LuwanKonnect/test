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
exports.MessageDto = void 0;
const constants_1 = require("../../../common/constants");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../enum");
class MessageDto extends constants_1.AbstractDto {
    constructor(socket) {
        super(socket);
        this.u_id = socket.u_id;
        this.targetId = socket.targetId;
        this.content = socket.content;
        this.messageType = socket.messageType;
        this.status = socket.status;
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MessageDto.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MessageDto.prototype, "targetId", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Target ID',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], MessageDto.prototype, "content", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'MessageType',
        type: enum_1.MessageTypeEnum,
    }),
    class_validator_1.IsEnum(enum_1.MessageTypeEnum),
    __metadata("design:type", String)
], MessageDto.prototype, "messageType", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Message status',
        type: enum_1.MessageStatusEnum,
    }),
    class_validator_1.IsEnum(enum_1.MessageStatusEnum),
    __metadata("design:type", String)
], MessageDto.prototype, "status", void 0);
exports.MessageDto = MessageDto;
//# sourceMappingURL=message.dto.js.map