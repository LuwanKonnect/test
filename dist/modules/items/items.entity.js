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
exports.Options = exports.Items = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Items = class Items {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'item ID',
    }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Items.prototype, "i_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Items.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'title',
    }),
    class_validator_1.IsNotEmpty({ message: 'title cannot be empty' }),
    class_validator_1.IsString({ message: 'the value must be a string' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Items.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'category',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Items.prototype, "category", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'pictures, maximum is 9',
    }),
    class_validator_1.IsOptional(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Items.prototype, "pictures", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Description' }),
    swagger_1.ApiProperty({
        description: 'Description',
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Items.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Price' }),
    swagger_1.ApiProperty({
        required: true,
        description: 'Price',
    }),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Items.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'delivery Price' }),
    swagger_1.ApiProperty({
        required: false,
        description: 'delivery Price',
    }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Items.prototype, "deliveryPrice", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'rating score',
    }),
    class_validator_1.IsOptional(),
    typeorm_1.Column({ default: 5 }),
    __metadata("design:type", Number)
], Items.prototype, "rating", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'discount for off peak',
    }),
    class_validator_1.IsOptional(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Items.prototype, "discount", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '11010111001100',
        required: false,
        description: 'will set default to all 1',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ length: 14, default: '11111111111111' }),
    __metadata("design:type", String)
], Items.prototype, "available", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'lat',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], Items.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'lng',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], Items.prototype, "lng", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'address',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Items.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'suburb',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column({ default: null }),
    __metadata("design:type", String)
], Items.prototype, "suburb", void 0);
__decorate([
    class_validator_1.IsOptional(),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Items.prototype, "is_deleted", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Items.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    class_validator_1.IsOptional(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Items.prototype, "updated", void 0);
Items = __decorate([
    typeorm_1.Entity()
], Items);
exports.Items = Items;
let Options = class Options {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'Options ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Options.prototype, "o_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'title',
    }),
    class_validator_1.IsNotEmpty({ message: 'title cannot be empty' }),
    class_validator_1.IsString({ message: 'the value must be a string' }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Options.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Price' }),
    swagger_1.ApiProperty({
        required: true,
        description: 'Price',
    }),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Options.prototype, "price", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Description' }),
    swagger_1.ApiProperty({
        description: 'Description',
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Options.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Options.prototype, "is_deleted", void 0);
Options = __decorate([
    typeorm_1.Entity()
], Options);
exports.Options = Options;
//# sourceMappingURL=items.entity.js.map