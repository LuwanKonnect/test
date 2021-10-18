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
exports.LenderRatingController = void 0;
const common_1 = require("@nestjs/common");
const lender_rating_service_1 = require("./lender-rating.service");
const swagger_1 = require("@nestjs/swagger");
const lender_rating_entity_1 = require("./lender-rating.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../deleted/users/user.decorator");
let LenderRatingController = class LenderRatingController {
    constructor(lenderRatingService) {
        this.lenderRatingService = lenderRatingService;
    }
    async save(lenderRating, id) {
        lenderRating.b_id = id;
        try {
            await this.lenderRatingService.save(lenderRating);
            return this.lenderRatingService.updateScore(lenderRating.l_id);
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
    findByUid(u_id) {
        return this.lenderRatingService.findByBid(u_id);
    }
    findByBookingId(b_id) {
        return this.lenderRatingService.findByBookingId(Number.parseInt(b_id));
    }
    async update(lenderRating) {
        return this.lenderRatingService.update(lenderRating);
    }
    async delete(u_id, r_id) {
        return this.lenderRatingService.remove(Number.parseInt(r_id), u_id);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'LenderRating details',
        type: lender_rating_entity_1.LenderRating,
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
    __metadata("design:paramtypes", [lender_rating_entity_1.LenderRating, String]),
    __metadata("design:returntype", Promise)
], LenderRatingController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiOperation({ summary: 'user is lender, get all rating' }),
    swagger_1.ApiResponse({ status: 200, type: [lender_rating_entity_1.LenderRating], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LenderRatingController.prototype, "findByUid", null);
__decorate([
    common_1.Get('findByBookingId'),
    swagger_1.ApiQuery({
        name: 'b_id',
        description: 'Booking ID',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiOperation({ summary: 'find by booking id' }),
    swagger_1.ApiResponse({ status: 200, type: [lender_rating_entity_1.LenderRating], description: 'success' }),
    __param(0, common_1.Query('b_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LenderRatingController.prototype, "findByBookingId", null);
__decorate([
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'LenderRating details, must have r_id',
        type: lender_rating_entity_1.LenderRating,
    }),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lender_rating_entity_1.LenderRating]),
    __metadata("design:returntype", Promise)
], LenderRatingController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({ status: 203, description: 'LenderRating not exist' }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiQuery({
        name: 'r_id',
        description: 'LenderRating ID',
    }),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiOperation({ summary: 'lender delete comments' }),
    common_1.Delete('delete'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('r_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LenderRatingController.prototype, "delete", null);
LenderRatingController = __decorate([
    swagger_1.ApiTags('lenderRating'),
    common_1.Controller('lenderRating'),
    __metadata("design:paramtypes", [lender_rating_service_1.LenderRatingService])
], LenderRatingController);
exports.LenderRatingController = LenderRatingController;
//# sourceMappingURL=lender-rating.controller.js.map