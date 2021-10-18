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
exports.SearchConditionsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class SearchConditionsDto {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'keyword',
        description: 'search for title or description',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SearchConditionsDto.prototype, "keyword", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'distance',
    }),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "distance", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'lat',
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "lat", void 0);
__decorate([
    swagger_1.ApiProperty({
        required: false,
        description: 'lng',
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "lng", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'category',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SearchConditionsDto.prototype, "category", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'minPrice',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "minPrice", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'maxPrice',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "maxPrice", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'rating',
        description: 'max is 5',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "rating", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'delivery',
    }),
    class_validator_1.IsNumber(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "delivery", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'start',
        description: 'start date',
    }),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "start", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'end',
        description: 'end date',
    }),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "end", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'offset',
    }),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "offset", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        name: 'limit',
    }),
    class_validator_1.IsInt(),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], SearchConditionsDto.prototype, "limit", void 0);
exports.SearchConditionsDto = SearchConditionsDto;
//# sourceMappingURL=search-conditions.dto.js.map