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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const items_entity_1 = require("./items.entity");
const typeorm_2 = require("typeorm");
let ItemsService = class ItemsService {
    constructor(connection) {
        this.connection = connection;
    }
    findOne(i_id) {
        return this.itemsRepository.findOne({ where: { i_id } });
    }
    findAll() {
        return this.itemsRepository.find();
    }
    findByUid(u_id) {
        return this.itemsRepository.find({ where: { u_id } });
    }
    findByUidNotIid(u_id, i_id) {
        return this.itemsRepository.find({ where: { u_id, i_id: typeorm_2.Not(i_id) } });
    }
    async update(items) {
        const item = await this.itemsRepository.preload(Object.assign({}, items));
        return await this.itemsRepository.save(item);
    }
    async search(searchConditionsDto) {
        const { keyword, distance, category, minPrice, maxPrice, rating, delivery, start, end, offset, limit, lat, lng, } = searchConditionsDto;
        const queryBuilder = this.itemsRepository.createQueryBuilder('item');
        if (keyword) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('item.title like :keyword', {
                    keyword: `%${keyword}%`,
                }).orWhere('item.description like :keyword', {
                    keyword: `%${keyword}%`,
                });
            }));
        }
        if (category) {
            queryBuilder.andWhere(`item.category = :category`, { category });
        }
        if (rating) {
            queryBuilder.andWhere(`item.rating >= :rating`, { rating });
        }
        if (minPrice) {
            queryBuilder.andWhere(`item.price >= :minPrice`, { minPrice });
        }
        if (maxPrice) {
            queryBuilder.andWhere(`item.price <= :maxPrice`, { maxPrice });
        }
        if (delivery || delivery === 0) {
            if (delivery > 0) {
                queryBuilder.andWhere(`item.delivery_price > 0`);
            }
            else {
                queryBuilder.andWhere(`item.delivery_price = 0`);
            }
        }
        if (distance) {
            queryBuilder.select(`(3959 * acos(cos(radians(:lat)) * cos(radians(item.lat)) * 
   cos(radians(item.lng) - radians(:lng)) + 
   sin(radians(:lat)) * sin(radians(item.lat )))) as distance`);
            queryBuilder.having(`distance < :distance`, { lat, lng, distance });
        }
        queryBuilder.skip(offset).take(limit);
        queryBuilder.orderBy({ created: 'DESC' });
        console.log(queryBuilder);
        return await queryBuilder.getManyAndCount();
    }
    async remove(i_id, u_id) {
        return this.itemsRepository.delete({ i_id, u_id });
    }
    async save(items) {
        return await this.itemsRepository.save(items);
    }
};
__decorate([
    typeorm_1.InjectRepository(items_entity_1.Items),
    __metadata("design:type", Object)
], ItemsService.prototype, "itemsRepository", void 0);
ItemsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map