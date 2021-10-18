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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("./booking.entity");
const typeorm_2 = require("typeorm");
const items_entity_1 = require("../items/items.entity");
const schedule_1 = require("@nestjs/schedule");
const providers_1 = require("../../common/providers");
let BookingService = class BookingService {
    constructor(connection, schedulerRegistry) {
        this.connection = connection;
        this.schedulerRegistry = schedulerRegistry;
    }
    findOne(b_id) {
        return this.bookingRepository.findOne({ where: { b_id } });
    }
    findAll() {
        return this.bookingRepository.find();
    }
    findByUid(u_id) {
        const date = new Date();
        const index = providers_1.UtilsProvider.getDays(date.getFullYear(), date.getMonth() + 1, 1);
        return this.bookingRepository
            .createQueryBuilder('booking')
            .leftJoinAndSelect(items_entity_1.Items, 'items', 'items.i_id = booking.i_id')
            .select(['booking.*', 'items.title', 'items.pictures'])
            .where('booking.u_id = :u_id and booking.end_date >= :index and year >= :year', { u_id, index, year: date.getFullYear() })
            .orderBy('created', 'ASC')
            .getRawMany();
    }
    async findByIOid(io_id) {
        const date = new Date();
        const index = providers_1.UtilsProvider.getDays(date.getFullYear(), date.getMonth() + 1, 1);
        return await this.bookingRepository
            .createQueryBuilder('booking')
            .leftJoinAndSelect(items_entity_1.Items, 'items', 'items.i_id = booking.i_id')
            .select(['booking.*', 'items.title', 'items.pictures'])
            .where('booking.io_id = :io_id and booking.end_date >= :index and year >= :year', { io_id, index, year: date.getFullYear() })
            .orderBy('created', 'ASC')
            .getRawMany();
    }
    findByIid(i_id) {
        return this.bookingRepository.find({ where: { i_id } });
    }
    findByRes(booking) {
        return this.bookingRepository.find({
            where: [
                {
                    b_id: typeorm_2.Not(booking.b_id),
                    i_id: booking.i_id,
                    status: 1,
                    year: booking.year,
                    error: 0,
                    startDate: typeorm_2.Between(booking.startDate, booking.endDate),
                },
                {
                    b_id: typeorm_2.Not(booking.b_id),
                    i_id: booking.i_id,
                    status: 1,
                    year: booking.year,
                    error: 0,
                    endDate: typeorm_2.Between(booking.startDate, booking.endDate),
                },
            ],
        });
    }
    findByUidUnsanctioned(u_id) {
        return this.bookingRepository.find({ where: { u_id, status: 1 } });
    }
    findByUidSanctioned(u_id) {
        return this.bookingRepository.find({ where: { u_id, status: 3 } });
    }
    findByUidFrom(u_id, date) {
        return this.bookingRepository.find({
            where: { u_id, startDate: typeorm_2.MoreThan(date) },
        });
    }
    findByUidUnsanctionedFrom(u_id, date) {
        return this.bookingRepository.find({
            where: { u_id, status: 1, startDate: typeorm_2.MoreThan(date) },
        });
    }
    findByUidSanctionedFrom(u_id, date) {
        return this.bookingRepository.find({
            where: { u_id, status: 3, startDate: typeorm_2.MoreThan(date) },
        });
    }
    async update(booking) {
        try {
            const res = await this.bookingRepository.update({ b_id: booking.b_id }, booking);
            if (res.affected === 1) {
                return {
                    code: 200,
                    msg: 'Success',
                };
            }
            else {
                return {
                    code: 403,
                    msg: 'failed',
                };
            }
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
    async remove(b_id, u_id) {
        return await this.bookingRepository.delete({ b_id, u_id });
    }
    async save(booking, timestamp) {
        const res = await this.bookingRepository.save(booking);
        const time = Date.now() + 86400000 > timestamp ? timestamp - Date.now() : 86400000;
        this.addTimeout(res.b_id, time);
        return res;
    }
    addTimeout(id, milliseconds) {
        const callback = async () => {
            console.log('123');
            const booking = await this.findOne(id);
            if (booking.status === 1) {
                booking.status = 0;
                this.bookingRepository.save(booking);
            }
        };
        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(id + '', timeout);
    }
    async search(keyword) {
        if (!keyword) {
            return await this.bookingRepository.find();
        }
        keyword = '%' + keyword + '%';
        return await this.bookingRepository.find({
            title: typeorm_2.Like(keyword),
        });
    }
};
__decorate([
    typeorm_1.InjectRepository(booking_entity_1.Booking),
    __metadata("design:type", Object)
], BookingService.prototype, "bookingRepository", void 0);
BookingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        schedule_1.SchedulerRegistry])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map