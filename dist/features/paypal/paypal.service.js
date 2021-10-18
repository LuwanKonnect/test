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
exports.PaypalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const paypal_entity_1 = require("./paypal.entity");
const typeorm_2 = require("typeorm");
let PaypalService = class PaypalService {
    constructor(paypalRepository) {
        this.paypalRepository = paypalRepository;
    }
    async save(paypal) {
        return await this.paypalRepository.save(paypal);
    }
    async getPayerIdByUid(u_id) {
        const res = await this.paypalRepository.findOne({ u_id });
        return res.payerId;
    }
};
PaypalService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(paypal_entity_1.PaypalEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaypalService);
exports.PaypalService = PaypalService;
//# sourceMappingURL=paypal.service.js.map