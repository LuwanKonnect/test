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
const user_decorator_1 = require("../../deleted/users/user.decorator");
const search_conditions_dto_1 = require("./dto/search-conditions.dto");
const availability_service_1 = require("../availability/availability.service");
const liked_service_1 = require("../liked/liked.service");
const dto_1 = require("./dto");
const platform_express_1 = require("@nestjs/platform-express");
const file_upload_service_1 = require("../../features/file-upload/file-upload.service");
const update_item_dto_1 = require("./dto/update-item.dto");
let ItemsController = class ItemsController {
    constructor(itemsService, availabilityService, likedService, fileUploadService) {
        this.itemsService = itemsService;
        this.availabilityService = availabilityService;
        this.likedService = likedService;
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
    findByUid(u_id) {
        return this.itemsService.findByUid(u_id);
    }
    async findSameOwnerItem(sameOwnerDto) {
        const res = await this.itemsService.findByUidNotIid(sameOwnerDto.u_id, sameOwnerDto.i_id);
        return res.filter(async (item) => await this.availabilityService.checkAvailability(sameOwnerDto.i_id, sameOwnerDto.year, sameOwnerDto.start, sameOwnerDto.end));
    }
    async findByIid(i_id, u_id) {
        const year = new Date().getFullYear();
        const availability = await this.availabilityService.findOneByIdAndYear(Number.parseInt(i_id), year);
        let liked = false;
        if (u_id) {
            const LikedResult = await this.likedService.findByUidAndIid(u_id, i_id);
            if (LikedResult.length === 1) {
                liked = true;
            }
        }
        const item = await this.itemsService.findOne(Number.parseInt(i_id));
        return { item, yearAvailability: availability === null || availability === void 0 ? void 0 : availability.availability, liked };
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
    async delete(u_id, i_id) {
        return this.itemsService.remove(Number.parseInt(i_id), u_id);
    }
    search(searchConditionsDto) {
        return this.itemsService.search(searchConditionsDto);
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
    __param(1, user_decorator_1.AuthUser('id')),
    __param(2, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [items_entity_1.Items, String, Array]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: [items_entity_1.Items], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findByUid", null);
__decorate([
    common_1.Get('findSameOwnerItem'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get same owner available items created by user',
    }),
    swagger_1.ApiResponse({ status: 200, type: [items_entity_1.Items], description: 'success' }),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SameOwnerDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findSameOwnerItem", null);
__decorate([
    common_1.Get('findByIid'),
    swagger_1.ApiQuery({
        name: 'i_id',
        description: 'Items ID',
    }),
    swagger_1.ApiQuery({
        name: 'u_id',
        description: 'User ID',
    }),
    swagger_1.ApiResponse({ status: 200, description: 'success' }),
    __param(0, common_1.Query('i_id')),
    __param(1, common_1.Query('u_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findByIid", null);
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
__decorate([
    swagger_1.ApiResponse({ status: 203, description: 'Items not exist' }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiQuery({
        name: 'i_id',
        description: 'Items ID',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.Delete('delete'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('i_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "delete", null);
__decorate([
    swagger_1.ApiQuery({
        name: 'keyword',
        description: 'User input search keyword',
        type: search_conditions_dto_1.SearchConditionsDto,
    }),
    swagger_1.ApiResponse({ status: 200, type: [items_entity_1.Items], description: 'success' }),
    swagger_1.ApiOperation({ summary: 'if no search value, return all' }),
    common_1.Get('search'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_conditions_dto_1.SearchConditionsDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "search", null);
ItemsController = __decorate([
    swagger_1.ApiTags('Items'),
    common_1.Controller('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService,
        availability_service_1.AvailabilityService,
        liked_service_1.LikedService,
        file_upload_service_1.FileUploadService])
], ItemsController);
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controller.js.map