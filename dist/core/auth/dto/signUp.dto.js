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
exports.SignUpDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_decorator_1 = require("../../../common/decorators/validators.decorator");
const dto_1 = require("../../user/dto");
class SignUpDto extends swagger_1.OmitType(dto_1.UserDto, [
    'id',
    'createdAt',
    'updatedAt',
]) {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'password cannot be empty' }),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(20),
    validators_decorator_1.IsPassword(),
    swagger_1.ApiProperty({
        description: 'Password, length: 8-20, can be symbol, number, character mixed, cannot be pure number or character, like ["abcd1234@", "abcd1234"]',
        example: 'abcd1234@',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
exports.SignUpDto = SignUpDto;
//# sourceMappingURL=signUp.dto.js.map