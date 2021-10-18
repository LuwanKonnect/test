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
exports.UpdateItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const item_dto_1 = require("./item.dto");
class UpdateItemDto extends swagger_1.PartialType(swagger_1.OmitType(item_dto_1.ItemDto, ['i_id', 'created', 'updated'])) {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        description: 'images be deleted, separate by comma, image1,image2',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "deletedImages", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        description: 'new file',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], UpdateItemDto.prototype, "newImages", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'item ID, must provide',
    }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateItemDto.prototype, "i_id", void 0);
exports.UpdateItemDto = UpdateItemDto;
//# sourceMappingURL=update-item.dto.js.map