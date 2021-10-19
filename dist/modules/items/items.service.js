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