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
exports.Availability = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Availability = class Availability {
};
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Availability.prototype, "a_id", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'Item ID',
    }),
    class_validator_1.IsNumber(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Availability.prototype, "i_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Must has availability, 1 is available.' }),
    swagger_1.ApiProperty({
        description: 'whole year availability',
    }),
    typeorm_1.Column({ length: 800 }),
    __metadata("design:type", String)
], Availability.prototype, "availability", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Year' }),
    swagger_1.ApiProperty({
        description: 'The year of the availability',
    }),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Availability.prototype, "year", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Availability.prototype, "created", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
    }),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Availability.prototype, "updated", void 0);
Availability = __decorate([
    typeorm_1.Entity()
], Availability);
exports.Availability = Availability;
//# sourceMappingURL=availability.entity.js.map