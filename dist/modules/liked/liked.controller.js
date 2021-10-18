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
exports.LikedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const liked_service_1 = require("./liked.service");
const liked_entity_1 = require("./liked.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../deleted/users/user.decorator");
let LikedController = class LikedController {
    constructor(likedService) {
        this.likedService = likedService;
    }
    save(liked, id) {
        liked.u_id = id;
        return this.likedService.save(liked);
    }
    findByUid(u_id) {
        return this.likedService.findByUid(u_id);
    }
    findByLid(l_id) {
        return this.likedService.findOne(l_id);
    }
    async delete(u_id, i_id) {
        return this.likedService.removeByIid(i_id, u_id);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Liked details',
        type: liked_entity_1.Liked,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    common_1.Post('save'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [liked_entity_1.Liked, String]),
    __metadata("design:returntype", Promise)
], LikedController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiResponse({ status: 200, type: [liked_entity_1.Liked], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikedController.prototype, "findByUid", null);
__decorate([
    common_1.Get('findByLid'),
    swagger_1.ApiQuery({
        name: 'l_id',
        description: 'Liked ID',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiResponse({ status: 200, type: liked_entity_1.Liked, description: 'success' }),
    __param(0, common_1.Query('l_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikedController.prototype, "findByLid", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiQuery({
        name: 'i_id',
        description: 'Item ID',
    }),
    common_1.Delete('delete'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('i_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LikedController.prototype, "delete", null);
LikedController = __decorate([
    swagger_1.ApiTags('Liked'),
    common_1.Controller('liked'),
    __metadata("design:paramtypes", [liked_service_1.LikedService])
], LikedController);
exports.LikedController = LikedController;
//# sourceMappingURL=liked.controller.js.map