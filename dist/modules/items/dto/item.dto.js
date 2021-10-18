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
exports.ItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ItemDto {
}
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'item ID',
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ItemDto.prototype, "i_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ItemDto.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'title',
    }),
    class_validator_1.IsNotEmpty({ message: 'title cannot be empty' }),
    class_validator_1.IsString({ message: 'the value must be a string' }),
    __metadata("design:type", String)
], ItemDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'category',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ItemDto.prototype, "category", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'pictures, maximum is 9',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ItemDto.prototype, "pictures", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Description' }),
    swagger_1.ApiProperty({
        description: 'Description',
    }),
    __metadata("design:type", String)
], ItemDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Price' }),
    swagger_1.ApiProperty({
        required: true,
        description: 'Price',
    }),
    __metadata("design:type", Number)
], ItemDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'delivery Price' }),
    swagger_1.ApiProperty({
        required: false,
        description: 'delivery Price',
    }),
    __metadata("design:type", Number)
], ItemDto.prototype, "deliveryPrice", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ItemDto.prototype, "rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'discount for off peak',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ItemDto.prototype, "discount", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '11010111001100',
        required: false,
        description: 'will set default to all 1',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ItemDto.prototype, "available", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'lat',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], ItemDto.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'lng',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], ItemDto.prototype, "lng", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'address',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ItemDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'suburb',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ItemDto.prototype, "suburb", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], ItemDto.prototype, "is_deleted", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], ItemDto.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], ItemDto.prototype, "updated", void 0);
exports.ItemDto = ItemDto;
//# sourceMappingURL=item.dto.js.map