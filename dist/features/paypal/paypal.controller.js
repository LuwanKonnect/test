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
exports.PaypalController = void 0;
const common_1 = require("@nestjs/common");
const shared_1 = require("../../shared");
const paypal_service_1 = require("./paypal.service");
const swagger_1 = require("@nestjs/swagger");
const create_charge_dto_1 = require("./dto/create-charge.dto");
const guards_1 = require("../../common/guards");
const execute_charge_dto_1 = require("./dto/execute-charge.dto");
const decorators_1 = require("../../common/decorators");
const paypal_entity_1 = require("./paypal.entity");
let PaypalController = class PaypalController {
    constructor(apiConfigService, httpRequestService, paypalService) {
        this.apiConfigService = apiConfigService;
        this.httpRequestService = httpRequestService;
        this.paypalService = paypalService;
        this.paypalConfig = apiConfigService.paypalConfig;
    }
    async createPayment(amount) {
        var _a;
        const body = {
            auth: {
                user: this.paypalConfig.client,
                pass: this.paypalConfig.secret,
            },
            body: {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                transactions: [
                    {
                        amount: {
                            total: amount,
                            currency: this.paypalConfig.currency,
                        },
                    },
                ],
                redirect_urls: {
                    return_url: 'https://example.com',
                    cancel_url: 'https://example.com',
                },
            },
            json: true,
        };
        const url = this.paypalConfig.api + '/v1/payments/payment';
        const res = await this.httpRequestService.httpPostRequest(url, body);
        return { id: (_a = res.body) === null || _a === void 0 ? void 0 : _a.id };
    }
    async executePayment(amount, paymentId, id) {
        const payerId = await this.paypalService.getPayerIdByUid(id);
        const body = {
            auth: {
                user: this.paypalConfig.client,
                pass: this.paypalConfig.secret,
            },
            body: {
                payer_id: payerId,
                transactions: [
                    {
                        amount: {
                            total: amount,
                            currency: this.paypalConfig.currency,
                        },
                    },
                ],
            },
            json: true,
        };
        const url = this.paypalConfig.api + '/v1/payments/payment/' + paymentId + '/execute';
        const res = await this.httpRequestService.httpPostRequest(url, body);
        console.log(res);
        return 'success';
    }
    async save(payerId, u_id) {
        return await this.paypalService.save({ u_id, payerId });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Create payment without registered user' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
        type: typeof { id: 'string' },
    }),
    swagger_1.ApiBody({
        type: create_charge_dto_1.default,
    }),
    common_1.Post('createPayment'),
    __param(0, common_1.Body('amount', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "createPayment", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Execute payment with registered user' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
        type: typeof { id: 'string' },
    }),
    swagger_1.ApiBody({
        type: execute_charge_dto_1.default,
    }),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'Need JWT token',
    }),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('executePayment'),
    __param(0, common_1.Body('amount', common_1.ParseFloatPipe)),
    __param(1, common_1.Body('paymentId')),
    __param(2, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "executePayment", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Save payer ID' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
        type: paypal_entity_1.PaypalEntity,
    }),
    swagger_1.ApiBody({
        description: 'payerId',
    }),
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'Need JWT token',
    }),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('save'),
    __param(0, common_1.Body('payerId')),
    __param(1, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "save", null);
PaypalController = __decorate([
    swagger_1.ApiTags('Paypal'),
    common_1.Controller('paypal'),
    __metadata("design:paramtypes", [shared_1.ApiConfigService,
        shared_1.HttpRequestService,
        paypal_service_1.PaypalService])
], PaypalController);
exports.PaypalController = PaypalController;
//# sourceMappingURL=paypal.controller.js.map