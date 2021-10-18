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
exports.AvailabilityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const availability_entity_1 = require("./availability.entity");
const typeorm_2 = require("@nestjs/typeorm");
const typeorm_3 = require("typeorm");
let AvailabilityService = class AvailabilityService {
    constructor(availabilityRepository, connection) {
        this.availabilityRepository = availabilityRepository;
        this.connection = connection;
    }
    async save(i_id, availability, year) {
        return await this.availabilityRepository.save({ i_id, availability, year });
    }
    checkAvailabilityByRegex(availability, start, end) {
        if (/^[1]+$/.test(availability.slice(start, end + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkAvailability(i_id, year, start, end) {
        const { availability } = await this.availabilityRepository.findOne({
            i_id,
            year,
        });
        if (/^[1]+$/.test(availability.slice(start, end + 1))) {
            return true;
        }
        else {
            return false;
        }
    }
    replaceAvailability(availability, start, end) {
        console.log('original length', availability.length);
        const res = availability.substring(0, start) +
            '0'.repeat(end + 1 - start) +
            availability.substring(end + 1);
        console.log('final length', res.length);
        return res;
    }
    async update(i_id, start, end, year) {
        return await this.connection.transaction(async (manager) => {
            const result = await manager.findOne(availability_entity_1.Availability, { i_id, year });
            let { availability } = result;
            if (this.checkAvailabilityByRegex(availability, start, end)) {
                availability = this.replaceAvailability(availability, start, end);
                const res = await manager.update(availability_entity_1.Availability, { i_id, year }, { availability });
                if (res.affected === 1) {
                    result.availability = availability;
                    return result;
                }
                else {
                    throw new common_1.NotFoundException('Not available');
                }
            }
            else {
                throw new common_1.BadRequestException('Not available');
            }
        });
    }
    async findOneByIdAndYear(i_id, year) {
        const res = await this.availabilityRepository.findOne({
            where: {
                i_id,
                year,
            },
        });
        if (res) {
            console.log('123123', res);
            return res;
        }
        else {
            const availability = '1'.repeat(366 * 2);
            return await this.save(i_id, availability, year);
        }
    }
};
AvailabilityService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(availability_entity_1.Availability)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_3.Connection])
], AvailabilityService);
exports.AvailabilityService = AvailabilityService;
//# sourceMappingURL=availability.service.js.map