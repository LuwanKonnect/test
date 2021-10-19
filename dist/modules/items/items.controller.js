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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const items_service_1 = require("./items.service");
const items_entity_1 = require("./items.entity");
const passport_1 = require("@nestjs/passport");
const decorators_1 = require("../../common/decorators");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../../features/file-upload/file-upload.service");
const update_item_dto_1 = require("./dto/update-item.dto");
let ItemsController = class ItemsController {
    constructor(itemsService, fileUploadService) {
        this.itemsService = itemsService;
        this.fileUploadService = fileUploadService;
    }
    save(items, id, files) {
        items.u_id = id;
        return Promise.all(files.map(async (file) => {
            return this.fileUploadService.upload(file, 'items');
        }))
            .then((res) => {
            items.pictures = res.toString();
            return items;
        })
            .then((res) => {
            return this.itemsService.save(items);
        });
    }
    async update(items, files) {
        const { deletedImages, newImages } = items, restDto = __rest(items, ["deletedImages", "newImages"]);
        const item = await this.itemsService.findOne(items.i_id);
        let originalList = item.pictures.split(',');
        if (deletedImages) {
            const deletedImageList = deletedImages.split(',');
            originalList = await this.fileUploadService.updateFileByDelete(deletedImageList, originalList);
        }
        if (files && files.length > 0) {
            originalList = await this.fileUploadService.updateImageByAdd(files, originalList, 'item');
        }
        restDto.pictures = originalList.toString();
        return this.itemsService.update(restDto);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Items details',
        type: items_entity_1.Items,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    common_1.Post('save'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 9)),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser('id')),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [items_entity_1.Items, String, Array]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "save", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Items details',
        type: update_item_dto_1.UpdateItemDto,
    }),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('newImages', 9)),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_item_dto_1.UpdateItemDto,
        Array]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "update", null);
ItemsController = __decorate([
    swagger_1.ApiTags('Items'),
    common_1.Controller('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService,
        file_upload_service_1.FileUploadService])
], ItemsController);
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controller.js.map