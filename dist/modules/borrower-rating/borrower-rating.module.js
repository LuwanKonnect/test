"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowerRatingModule = void 0;
const common_1 = require("@nestjs/common");
const borrower_rating_service_1 = require("./borrower-rating.service");
const borrower_rating_controller_1 = require("./borrower-rating.controller");
const typeorm_1 = require("@nestjs/typeorm");
const borrower_rating_entity_1 = require("./borrower-rating.entity");
const user_entity_1 = require("../../core/user/user.entity");
let BorrowerRatingModule = class BorrowerRatingModule {
};
BorrowerRatingModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([borrower_rating_entity_1.BorrowerRating, user_entity_1.UserEntity])],
        providers: [borrower_rating_service_1.BorrowerRatingService],
        controllers: [borrower_rating_controller_1.BorrowerRatingController],
    })
], BorrowerRatingModule);
exports.BorrowerRatingModule = BorrowerRatingModule;
//# sourceMappingURL=borrower-rating.module.js.map