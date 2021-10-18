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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const file_upload_service_1 = require("./file-upload.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const guards_1 = require("../../common/guards");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async create(file) {
        return this.fileUploadService.upload(file, 'other');
    }
    async uploadManyToS3(files) {
        return Promise.all(files.map(async (file) => {
            return this.fileUploadService.upload(file, 'items');
        }));
    }
    async getFile(key, res) {
        const file = await this.fileUploadService.getFile(key);
        file.pipe(res);
    }
    async deleteFile(key) {
        return await this.fileUploadService.deleteFile(key);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'The key name must be file' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, description: 'success' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'failed',
    }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    common_1.Post('uploadToS3'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "create", null);
__decorate([
    common_1.Post('uploadManyToS3'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 9)),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadManyToS3", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Get file from s3' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'success' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'failed, the key not exist',
    }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    common_1.Get('getFile'),
    __param(0, common_1.Query('key')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "getFile", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'The key name must be file' }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, description: 'success' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'failed, the key not exist',
    }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Delete('delete'),
    __param(0, common_1.Query('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "deleteFile", null);
FileUploadController = __decorate([
    swagger_1.ApiTags('FileUpload'),
    common_1.Controller('file-upload'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
exports.FileUploadController = FileUploadController;
//# sourceMappingURL=file-upload.controller.js.map