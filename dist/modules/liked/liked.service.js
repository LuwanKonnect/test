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
exports.LikedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const liked_entity_1 = require("./liked.entity");
const items_entity_1 = require("../items/items.entity");
let LikedService = class LikedService {
    findOne(l_id) {
        return this.likedRepository.findOne({ where: { l_id } });
    }
    findAll() {
        return this.likedRepository.find();
    }
    findByUid(u_id) {
        return this.likedRepository
            .createQueryBuilder('liked')
            .leftJoinAndSelect(items_entity_1.Items, 'items', 'items.i_id=liked.i_id')
            .select(`items.*`)
            .where({ u_id })
            .getRawMany();
    }
    findByUidAndIid(u_id, i_id) {
        return this.likedRepository.find({ u_id, i_id });
    }
    async update(liked) {
        try {
            const res = await this.likedRepository.update({ l_id: liked.l_id }, liked);
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
    async removeByIid(i_id, u_id) {
        return await this.likedRepository.delete({ i_id, u_id });
    }
    async save(liked) {
        return await this.likedRepository.save(liked);
    }
};
__decorate([
    typeorm_1.InjectRepository(liked_entity_1.Liked),
    __metadata("design:type", Object)
], LikedService.prototype, "likedRepository", void 0);
LikedService = __decorate([
    common_1.Injectable()
], LikedService);
exports.LikedService = LikedService;
//# sourceMappingURL=liked.service.js.map