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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../common/decorators");
const swagger_1 = require("@nestjs/swagger");
const update_dto_1 = require("./dto/update.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_schema_1 = require("../../common/decorators/swagger.schema");
let UserController = class UserController {
    constructor() { }
    async update(file, user, id) {
        console.log(user);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'update one user' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, description: 'success' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.NOT_FOUND, description: 'failed' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Forbidden resource - no access',
    }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiBody({
        type: update_dto_1.UpdateDto,
    }),
    swagger_schema_1.ApiFile({ name: 'avatar' }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar')),
    common_1.Put('update'),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map