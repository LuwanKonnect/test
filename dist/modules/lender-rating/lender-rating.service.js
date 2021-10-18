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
exports.LenderRatingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lender_rating_entity_1 = require("./lender-rating.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../core/user/user.entity");
let LenderRatingService = class LenderRatingService {
    constructor(connection) {
        this.connection = connection;
    }
    findOne(r_id) {
        return this.lenderRatingRepository.findOne({ where: { r_id } });
    }
    findByBid(l_id) {
        return this.lenderRatingRepository.find({ where: { l_id } });
    }
    findByBookingId(booking_id) {
        return this.lenderRatingRepository.find({ where: { booking_id } });
    }
    async update(ratingAsLender) {
        try {
            const res = await this.lenderRatingRepository.update({ r_id: ratingAsLender.r_id }, ratingAsLender);
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
    async remove(r_id, u_id) {
        return await this.lenderRatingRepository.delete({ r_id, u_id });
    }
    async save(ratingAsLender) {
        return await this.lenderRatingRepository.save(ratingAsLender);
    }
    async updateScore(l_id) {
        try {
            const score = this.lenderRatingRepository.find({ l_id }).avg('rating');
            return await this.userRepository.update({ u_id: l_id }, { lender_rating: score });
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
};
__decorate([
    typeorm_1.InjectRepository(lender_rating_entity_1.LenderRating),
    __metadata("design:type", Object)
], LenderRatingService.prototype, "lenderRatingRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.UserEntity),
    __metadata("design:type", Object)
], LenderRatingService.prototype, "userRepository", void 0);
LenderRatingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], LenderRatingService);
exports.LenderRatingService = LenderRatingService;
//# sourceMappingURL=lender-rating.service.js.map