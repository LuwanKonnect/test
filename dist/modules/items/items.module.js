"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModule = void 0;
const common_1 = require("@nestjs/common");
const items_controller_1 = require("./items.controller");
const items_service_1 = require("./items.service");
const items_entity_1 = require("./items.entity");
const typeorm_1 = require("@nestjs/typeorm");
const availability_module_1 = require("../availability/availability.module");
const liked_module_1 = require("../liked/liked.module");
let ItemsModule = class ItemsModule {
};
ItemsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([items_entity_1.Items]), availability_module_1.AvailabilityModule, liked_module_1.LikedModule],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService],
        exports: [items_service_1.ItemsService],
    })
], ItemsModule);
exports.ItemsModule = ItemsModule;
//# sourceMappingURL=items.module.js.map