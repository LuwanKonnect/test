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
exports.AdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../common/constants");
const constants_2 = require("../../../common/constants");
class AdminDto extends constants_2.AbstractDto {
    constructor(admin) {
        super(admin);
        this.fullName = admin.fullName;
        this.role = admin.role;
        this.email = admin.email;
        this.customerId = admin.customerId;
        this.avatar = admin.avatar;
    }
}
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], AdminDto.prototype, "fullName", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], AdminDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], AdminDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], AdminDto.prototype, "salt", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ enum: constants_1.AdminRoleEnum }),
    __metadata("design:type", String)
], AdminDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        description: 'For stripe',
    }),
    __metadata("design:type", String)
], AdminDto.prototype, "customerId", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], AdminDto.prototype, "avatar", void 0);
exports.AdminDto = AdminDto;
//# sourceMappingURL=admin.dto.js.map