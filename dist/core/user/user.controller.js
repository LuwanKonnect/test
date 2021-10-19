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
const user_service_1 = require("./user.service");
const dto_1 = require("../auth/dto");
const decorators_1 = require("../../common/decorators");
const guards_1 = require("../../common/guards");
const swagger_1 = require("@nestjs/swagger");
const update_dto_1 = require("./dto/update.dto");
const swagger_schema_1 = require("../../common/decorators/swagger.schema");
const providers_1 = require("../../common/providers");
const file_upload_service_1 = require("../../features/file-upload/file-upload.service");
let UserController = class UserController {
    constructor(userService, fileUploadService) {
        this.userService = userService;
        this.fileUploadService = fileUploadService;
    }
    async update(file, user, id) {
        console.log(user);
        if (file) {
            if (!providers_1.UtilsProvider.isImage(file.mimetype)) {
                throw new common_1.BadRequestException('Only accept image');
            }
            user.avatar = await this.fileUploadService.upload(file, 'user');
        }
        const res = await this.userService.update({ id }, user);
        if (res.affected === 0) {
            throw new common_1.NotFoundException('Invalid user id');
        }
    }
    async getCurrentUser(id) {
        return await this.userService.findOneById(id);
    }
    async getOneUser(id) {
        return await this.userService.findNormalDetailById(id);
    }
    async checkExist(options) {
        const result = await this.userService.findByUsernameOrEmailOrMobile(options);
        if (result) {
            return 'Exist';
        }
        else {
            throw new common_1.HttpException('Not Exist', common_1.HttpStatus.NO_CONTENT);
        }
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
    common_1.Put('update'),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __param(2, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Get('me'),
    swagger_1.ApiOperation({ summary: 'Get current user info' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: dto_1.UserResponseDto,
        description: 'success',
    }),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ type: dto_1.UserResponseDto, description: 'Current user info' }),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCurrentUser", null);
__decorate([
    common_1.Get('getOneUser'),
    swagger_1.ApiOperation({ summary: 'Get user info by id' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: dto_1.UserResponseDto,
        description: 'success',
    }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ description: 'Get user info by id' }),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Check email, username, mobile whether exist.' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'Exist' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT, description: 'Not Exist' }),
    common_1.Get('checkExist'),
    swagger_1.ApiQuery({
        required: false,
        name: 'email',
        description: 'email',
    }),
    swagger_1.ApiQuery({
        required: false,
        name: 'username',
        description: 'username',
    }),
    swagger_1.ApiQuery({
        required: false,
        name: 'mobile',
        description: 'mobile',
    }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkExist", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        file_upload_service_1.FileUploadService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map