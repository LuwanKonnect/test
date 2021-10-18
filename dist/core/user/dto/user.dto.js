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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../common/constants");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const transforms_decorator_1 = require("../../../common/decorators/transforms.decorator");
const class_transformer_1 = require("class-transformer");
class UserDto extends constants_1.AbstractDto {
    constructor(user, options) {
        super(user);
        this.fullName = user.fullName;
        this.email = user.email;
        this.avatar = user.avatar;
        this.bsb = user.bsb;
        this.account_number = user.account_number;
        this.address = user.address;
        this.lat = user.lat;
        this.lng = user.lng;
        this.suburb = user.suburb;
        this.borrower_rating = user.borrower_rating;
        this.lender_rating = user.lender_rating;
        this.mobile = user.mobile;
        this.available = user.available;
    }
}
__decorate([
    swagger_1.ApiProperty({
        description: 'fullName',
        example: 'Andrew Owen',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    transforms_decorator_1.Trim(),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'tester1@gmail.com',
    }),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty({ message: 'email cannot be empty' }),
    class_validator_1.IsString({ message: 'the value must be a string' }),
    transforms_decorator_1.Trim(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "avatar", void 0);
__decorate([
    class_validator_1.IsPhoneNumber('AU'),
    swagger_1.ApiProperty({
        example: '0450123456',
        required: true,
        description: 'Must be Australia mobile',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "mobile", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'address',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'lat',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], UserDto.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'lng',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], UserDto.prototype, "lng", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'suburb',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "suburb", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'bsb',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "bsb", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'account_number',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "account_number", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 5,
        required: false,
        description: 'rating score as a lender.',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], UserDto.prototype, "lender_rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 5,
        required: false,
        description: 'rating score as a borrower',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], UserDto.prototype, "borrower_rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '11010111001100',
        required: false,
        description: 'will set default to all 1',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserDto.prototype, "available", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map