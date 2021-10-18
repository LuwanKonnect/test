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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comments_service_1 = require("./comments.service");
const comments_entity_1 = require("./comments.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../deleted/users/user.decorator");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    save(comments, id) {
        comments.u_id = id;
        return this.commentsService.save(comments);
    }
    findByUid(u_id) {
        return this.commentsService.findByUid(u_id);
    }
    async update(comments) {
        return this.commentsService.update(comments);
    }
    async delete(u_id, c_id) {
        return this.commentsService.remove(c_id, u_id);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Comments details',
        type: comments_entity_1.Comments,
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
    __metadata("design:paramtypes", [comments_entity_1.Comments, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    swagger_1.ApiOperation({
        summary: 'Get comments posted by user, for future use.',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiResponse({ status: 200, type: [comments_entity_1.Comments], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findByUid", null);
__decorate([
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiOperation({
        summary: 'update comments, for future use.',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Comments details, c_id is required',
        type: comments_entity_1.Comments,
    }),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comments_entity_1.Comments]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    swagger_1.ApiOperation({
        summary: "Delete comments by specific ID, only user can delete, owner can't",
    }),
    swagger_1.ApiResponse({ status: 203, description: 'Comments not exist' }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiQuery({
        name: 'c_id',
        description: 'Comment ID',
    }),
    common_1.Delete('delete'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('c_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "delete", null);
CommentsController = __decorate([
    swagger_1.ApiTags('Comments'),
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map