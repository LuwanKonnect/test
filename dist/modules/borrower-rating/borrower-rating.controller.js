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
exports.BorrowerRatingController = void 0;
const common_1 = require("@nestjs/common");
const borrower_rating_service_1 = require("./borrower-rating.service");
const swagger_1 = require("@nestjs/swagger");
const borrower_rating_entity_1 = require("./borrower-rating.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../deleted/users/user.decorator");
let BorrowerRatingController = class BorrowerRatingController {
    constructor(borrowerRatingService) {
        this.borrowerRatingService = borrowerRatingService;
    }
    async save(borrowerRating, id) {
        borrowerRating.l_id = id;
        try {
            await this.borrowerRatingService.save(borrowerRating);
            return this.borrowerRatingService.updateScore(borrowerRating.b_id);
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
    findByUid(u_id) {
        return this.borrowerRatingService.findByBid(u_id);
    }
    findByBookingId(b_id) {
        return this.borrowerRatingService.findByBookingId(Number.parseInt(b_id));
    }
    async update(borrowerRating) {
        return this.borrowerRatingService.update(borrowerRating);
    }
    async delete(u_id, r_id) {
        return this.borrowerRatingService.remove(Number.parseInt(r_id), u_id);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'BorrowerRating details',
        type: borrower_rating_entity_1.BorrowerRating,
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
    __metadata("design:paramtypes", [borrower_rating_entity_1.BorrowerRating, String]),
    __metadata("design:returntype", Promise)
], BorrowerRatingController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    swagger_1.ApiOperation({ summary: 'user is borrower, get all rating' }),
    swagger_1.ApiResponse({ status: 200, type: [borrower_rating_entity_1.BorrowerRating], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowerRatingController.prototype, "findByUid", null);
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
    swagger_1.ApiResponse({ status: 200, type: [borrower_rating_entity_1.BorrowerRating], description: 'success' }),
    __param(0, common_1.Query('b_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BorrowerRatingController.prototype, "findByBookingId", null);
__decorate([
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'BorrowerRating details, must have r_id',
        type: borrower_rating_entity_1.BorrowerRating,
    }),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [borrower_rating_entity_1.BorrowerRating]),
    __metadata("design:returntype", Promise)
], BorrowerRatingController.prototype, "update", null);
__decorate([
    swagger_1.ApiResponse({ status: 500, description: 'delete failed' }),
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiQuery({
        name: 'r_id',
        description: 'BorrowerRating ID',
    }),
    swagger_1.ApiQuery({
        name: 'u_id',
        description: 'User ID',
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
], BorrowerRatingController.prototype, "delete", null);
BorrowerRatingController = __decorate([
    swagger_1.ApiTags('borrowerRating'),
    common_1.Controller('borrowerRating'),
    __metadata("design:paramtypes", [borrower_rating_service_1.BorrowerRatingService])
], BorrowerRatingController);
exports.BorrowerRatingController = BorrowerRatingController;
//# sourceMappingURL=borrower-rating.controller.js.map