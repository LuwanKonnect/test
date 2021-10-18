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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comments_entity_1 = require("./comments.entity");
const user_entity_1 = require("../../core/user/user.entity");
const items_service_1 = require("../items/items.service");
let CommentsService = class CommentsService {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    findOne(c_id) {
        return this.commentsRepository.findOne({ where: { c_id } });
    }
    async findAll(t_id, type) {
        return this.commentsRepository
            .createQueryBuilder('comments')
            .leftJoinAndSelect(user_entity_1.UserEntity, 'user', 'user.u_id=comments.u_id')
            .select(`comments.*, user.fullName as fullName, user.avatar as avatar`)
            .where({ t_id, type })
            .getRawMany();
    }
    findByUid(u_id) {
        return this.commentsRepository.find({ where: { u_id } });
    }
    async update(comments) {
        try {
            const res = await this.commentsRepository.update({ c_id: comments.c_id }, comments);
            if (res.affected === 1) {
                return {
                    code: 200,
                    msg: 'Success',
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
    async remove(c_id, u_id) {
        return await this.commentsRepository.update({ c_id, u_id });
    }
    async save(comments) {
        try {
            await this.commentsRepository.save(comments);
            const score = this.commentsRepository
                .find({ i_id: comments.i_id })
                .avg('rating');
            await this.itemsService.update({ i_id: comments.i_id, rating: score });
            return {
                code: 200,
                msg: 'Success',
            };
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
    typeorm_1.InjectRepository(comments_entity_1.Comments),
    __metadata("design:type", Object)
], CommentsService.prototype, "commentsRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.UserEntity),
    __metadata("design:type", Object)
], CommentsService.prototype, "userRepository", void 0);
CommentsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map