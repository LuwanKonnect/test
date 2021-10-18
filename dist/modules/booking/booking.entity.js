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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var option;
(function (option) {
    option["delivery"] = "delivery";
    option["pickup"] = "pickup";
    option["both"] = "both";
    option["none"] = "none";
})(option || (option = {}));
let Booking = class Booking {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'Booking ID',
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Booking.prototype, "b_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'User ID',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Booking.prototype, "u_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'item id',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "i_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: 'item owner id - user id',
    }),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Booking.prototype, "io_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: true,
        description: '1 is apply, 0 is reject, 2 is reschedule, 3 is approve , 4 for borrow picked up' +
            ', 5 for lender confirms pickup, 6 for both confirm, 7 for return',
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Booking.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty({
        description: 'whether error happens',
    }),
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Booking.prototype, "error", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'delivery Option' }),
    swagger_1.ApiProperty({
        required: true,
        enum: option,
        description: 'delivery Option',
    }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Booking.prototype, "deliveryOption", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'start time',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "startDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty({
        description: 'address for delivery/pickup',
    }),
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], Booking.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'end time',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Year',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "year", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Price',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Booking.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Booking.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Booking.prototype, "updated", void 0);
Booking = __decorate([
    typeorm_1.Entity()
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map