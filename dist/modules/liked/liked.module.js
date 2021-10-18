"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const liked_entity_1 = require("./liked.entity");
const liked_service_1 = require("./liked.service");
const liked_controller_1 = require("./liked.controller");
const items_entity_1 = require("../items/items.entity");
let LikedModule = class LikedModule {
};
LikedModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([liked_entity_1.Liked, items_entity_1.Items])],
        providers: [liked_service_1.LikedService],
        controllers: [liked_controller_1.LikedController],
        exports: [liked_service_1.LikedService],
    })
], LikedModule);
exports.LikedModule = LikedModule;
//# sourceMappingURL=liked.module.js.map