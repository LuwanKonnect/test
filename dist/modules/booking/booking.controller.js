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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const booking_entity_1 = require("./booking.entity");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../../deleted/users/user.decorator");
const availability_service_1 = require("../availability/availability.service");
const typeorm_1 = require("typeorm");
const availability_entity_1 = require("../availability/availability.entity");
let BookingController = class BookingController {
    constructor(bookingService, availabilityService) {
        this.bookingService = bookingService;
        this.availabilityService = availabilityService;
    }
    save(booking, timestamp, id) {
        booking.u_id = id;
        console.log(timestamp);
        return this.bookingService.save(booking, timestamp);
    }
    findByUid(u_id) {
        return this.bookingService.findByUid(u_id);
    }
    findByOwnerId(io_id) {
        return this.bookingService.findByIOid(io_id);
    }
    findUnsanctionedByOwnerId(io_id) {
        return this.bookingService.findByUidUnsanctioned(io_id);
    }
    findSanctionedByOwnerId(io_id) {
        return this.bookingService.findByUidSanctioned(io_id);
    }
    findUnsanctionedByOwnerIdFrom(io_id, date) {
        return this.bookingService.findByUidUnsanctionedFrom(io_id, date);
    }
    findSanctionedByOwnerIdFrom(io_id, date) {
        return this.bookingService.findByUidSanctionedFrom(io_id, date);
    }
    findByEid(b_id) {
        return this.bookingService.findOne(Number.parseInt(b_id));
    }
    async update(io_id, booking) {
        const res = await this.bookingService.findOne(booking.b_id);
        if (!(res.io_id === io_id || res.u_id === io_id)) {
            throw new common_1.ForbiddenException('No access');
        }
        return this.bookingService.update(booking);
    }
    async reject(b_id, u_id) {
        const res = await this.bookingService.findOne(Number.parseInt(b_id));
        if (res.io_id === u_id) {
            return this.bookingService.update({
                b_id: Number.parseInt(b_id),
                status: 2,
                io_id: u_id,
            });
        }
        else {
            return {
                code: 403,
                msg: 'failed',
            };
        }
    }
    async approve(b_id, u_id, manager) {
        console.log(b_id);
        const res = await this.bookingService.findOne(Number.parseInt(b_id));
        if (res.io_id === u_id) {
            try {
                const availabilityRes = await manager.findOne(availability_entity_1.Availability, {
                    i_id: res.i_id,
                    year: res.year,
                });
                if (!/^[1]+$/.test(availabilityRes.availability.slice(res.startDate, res.endDate + 1))) {
                    throw new common_1.BadRequestException('Item is not available already');
                }
                const newAvailability = availabilityRes.availability.substring(0, res.startDate) +
                    '0'.repeat(res.endDate + 1 - res.startDate) +
                    availabilityRes.availability.substring(res.endDate + 1);
                await manager.update(availability_entity_1.Availability, {
                    i_id: res.i_id,
                    year: res.year,
                }, { availability: newAvailability });
                await manager.update(booking_entity_1.Booking, {
                    b_id: Number.parseInt(b_id),
                    io_id: u_id,
                }, { status: 3 });
                const results = await this.bookingService.findByRes(res);
                return Promise.all(results.map(async (i) => {
                    await manager.update(booking_entity_1.Booking, {
                        b_id: i.b_id,
                        io_id: u_id,
                    }, { status: 0 });
                }))
                    .then(() => {
                    return {
                        code: 200,
                        msg: 'success',
                    };
                })
                    .catch((e) => {
                    throw new common_1.InternalServerErrorException(e);
                });
            }
            catch (e) {
                throw new common_1.InternalServerErrorException(e);
            }
        }
        else {
            throw new common_1.ForbiddenException('You have no access');
        }
    }
    async delete(u_id, b_id) {
        return this.bookingService.remove(Number.parseInt(b_id), u_id);
    }
    search(keyword) {
        return this.bookingService.search(keyword);
    }
};
__decorate([
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Booking details',
        type: booking_entity_1.Booking,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    common_1.Post('save/:timestamp'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('timestamp')),
    __param(2, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_entity_1.Booking, Number, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "save", null);
__decorate([
    common_1.Get('findByUid'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findByUid", null);
__decorate([
    common_1.Get('findByOwnerId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'Get all bookings applied for creator' }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findByOwnerId", null);
__decorate([
    common_1.Get('findUnsanctionedByOwnerId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get all bookings applied for creator which are unsanctioned',
    }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findUnsanctionedByOwnerId", null);
__decorate([
    common_1.Get('findSanctionedByOwnerId'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get all bookings applied for creator which are sanctioned',
    }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findSanctionedByOwnerId", null);
__decorate([
    common_1.Get('findUnsanctionedByOwnerIdFrom'),
    swagger_1.ApiQuery({
        name: 'date',
        description: 'specific date',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get all bookings applied for creator which are unsanctioned from date value',
    }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('date', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findUnsanctionedByOwnerIdFrom", null);
__decorate([
    common_1.Get('findByOwnerIdSanctioned'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiQuery({
        name: 'date',
        description: 'specific date',
    }),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get all bookings applied for creator which are sanctioned from date value',
    }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('date', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findSanctionedByOwnerIdFrom", null);
__decorate([
    common_1.Get('findByBid'),
    swagger_1.ApiQuery({
        name: 'b_id',
        description: 'Booking ID',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({
        summary: 'Get bookings by specific Booking ID',
    }),
    swagger_1.ApiResponse({ status: 200, type: booking_entity_1.Booking, description: 'success' }),
    __param(0, common_1.Query('b_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findByEid", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiBody({
        description: 'Booking details, must have b_id',
        type: booking_entity_1.Booking,
    }),
    common_1.Put('update'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "update", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiQuery({
        name: 'b_id',
        description: 'Booking ID',
    }),
    swagger_1.ApiOperation({
        summary: 'reject bookings by specific Booking ID',
    }),
    common_1.Get('reject'),
    __param(0, common_1.Query('b_id')),
    __param(1, user_decorator_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "reject", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({ status: 201, description: 'success' }),
    swagger_1.ApiQuery({
        name: 'b_id',
        description: 'Booking ID',
    }),
    swagger_1.ApiOperation({
        summary: 'approve bookings by specific Booking ID',
    }),
    common_1.Get('approve'),
    typeorm_1.Transaction(),
    __param(0, common_1.Query('b_id')),
    __param(1, user_decorator_1.AuthUser('id')),
    __param(2, typeorm_1.TransactionManager()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeorm_1.EntityManager]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "approve", null);
__decorate([
    swagger_1.ApiResponse({ status: 200, description: 'Delete Success' }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiQuery({
        name: 'b_id',
        description: 'Booking ID',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.Delete('delete'),
    __param(0, user_decorator_1.AuthUser('id')),
    __param(1, common_1.Query('b_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "delete", null);
__decorate([
    swagger_1.ApiQuery({
        name: 'keyword',
        description: 'User input search keyword',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOperation({ summary: 'if no search value, return all' }),
    swagger_1.ApiResponse({ status: 200, type: [booking_entity_1.Booking], description: 'success' }),
    common_1.Get('search'),
    __param(0, common_1.Query('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "search", null);
BookingController = __decorate([
    swagger_1.ApiTags('Booking'),
    common_1.Controller('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        availability_service_1.AvailabilityService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map