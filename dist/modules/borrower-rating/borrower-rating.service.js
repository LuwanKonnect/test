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
exports.BorrowerRatingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const borrower_rating_entity_1 = require("./borrower-rating.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../core/user/user.entity");
let BorrowerRatingService = class BorrowerRatingService {
    constructor(connection) {
        this.connection = connection;
    }
    findOne(r_id) {
        return this.borrowerRatingRepository.findOne({ where: { r_id } });
    }
    findByBid(b_id) {
        return this.borrowerRatingRepository.find({ where: { b_id } });
    }
    findByBookingId(booking_id) {
        return this.borrowerRatingRepository.find({ where: { booking_id } });
    }
    async update(ratingAsBorrower) {
        try {
            const res = await this.borrowerRatingRepository.update({ r_id: ratingAsBorrower.r_id }, ratingAsBorrower);
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
        return await this.borrowerRatingRepository.delete({ r_id, u_id });
    }
    async save(ratingAsBorrower) {
        try {
            return await this.borrowerRatingRepository.save(ratingAsBorrower);
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
    async updateScore(b_id) {
        try {
            const score = this.borrowerRatingRepository.find({ b_id }).avg('rating');
            return await this.userRepository.update({ u_id: b_id }, { borrower_rating: score });
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
    typeorm_1.InjectRepository(borrower_rating_entity_1.BorrowerRating),
    __metadata("design:type", Object)
], BorrowerRatingService.prototype, "borrowerRatingRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.UserEntity),
    __metadata("design:type", Object)
], BorrowerRatingService.prototype, "userRepository", void 0);
BorrowerRatingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], BorrowerRatingService);
exports.BorrowerRatingService = BorrowerRatingService;
//# sourceMappingURL=borrower-rating.service.js.map