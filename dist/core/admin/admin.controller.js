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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const decorators_1 = require("../../common/decorators");
const constants_1 = require("../../common/constants");
const swagger_1 = require("@nestjs/swagger");
const http_decorators_1 = require("../../common/decorators/http.decorators");
const dto_1 = require("../user/dto");
let AdminController = class AdminController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOneUserById(id) {
        const user = await this.userService.findOneById(id);
        if (user) {
            return user;
        }
        else {
            throw new common_1.NotFoundException('Invalid user id');
        }
    }
    async deleteOneUserById(id) {
        const res = await this.userService.deleteById(id);
        if (res.affected === 0) {
            throw new common_1.NotFoundException('Invalid user id');
        }
    }
    getUsers(pageOptionsDto) {
        return this.userService.getUsers(pageOptionsDto);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Find one user, admin only' }),
    swagger_1.ApiResponse({ status: 200, description: 'user exist' }),
    swagger_1.ApiResponse({ status: 404, description: 'Invalid user id' }),
    swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
    swagger_1.ApiResponse({ status: 403, description: 'Forbidden resource - no access' }),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    http_decorators_1.Auth(constants_1.AdminRoleEnum.ADMIN),
    common_1.Get('findOne'),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOneUserById", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'delete one user' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'success' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'user id not exist',
    }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Forbidden resource - no access',
    }),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    http_decorators_1.Auth(constants_1.AdminRoleEnum.ADMIN),
    common_1.Delete('delete'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOneUserById", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Find all users' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'success' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.NOT_FOUND, description: 'failed' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.FORBIDDEN,
        description: 'Forbidden resource - no access',
    }),
    common_1.Get('findAll'),
    __param(0, common_1.Query(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UsersPageOptionsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
AdminController = __decorate([
    swagger_1.ApiTags('Admin'),
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map