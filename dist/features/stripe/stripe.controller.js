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
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const stripe_service_1 = require("./stripe.service");
const decorators_1 = require("../../common/decorators");
const stripe_entity_1 = require("./stripe.entity");
const guards_1 = require("../../common/guards");
const dto_1 = require("./dto");
let StripeController = class StripeController {
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async findOne(id) {
        return await this.stripeService.findOne(id);
    }
    async createCustomer(payload) {
        const stripeCustomer = await this.stripeService.createCustomer(payload.email, payload.id);
        return await this.stripeService.save({
            u_id: payload.id,
            customerId: stripeCustomer.id,
        });
    }
    async createAccount(createAccount, req) {
        return this.stripeService.createAccount(createAccount, req.connection.remoteAddress);
    }
    async createCharge(charge, u_id) {
        return await this.stripeService.charge(charge.amount, charge.paymentMethodId, u_id);
    }
    async oneOffPayment(charge) {
        return await this.stripeService.oneOffPayment(charge.paymentMethodId, charge.amount);
    }
    async addCreditCard(paymentMethodIdDto, u_id) {
        return this.stripeService.addCreditCard(paymentMethodIdDto.paymentMethodId, u_id);
    }
    async getCreditCards(u_id) {
        return this.stripeService.listCreditCards(u_id);
    }
    async deleteCreditCard(paymentMethodId) {
        return await this.stripeService.deleteCreditCard(paymentMethodId);
    }
    async setDefaultCard(paymentMethodIdDto, u_id) {
        await this.stripeService.setDefaultCreditCard(paymentMethodIdDto.paymentMethodId, u_id);
    }
    async createMonthlySubscription(u_id) {
        return this.stripeService.createMonthlySubscription(u_id);
    }
    async getMonthlySubscription(u_id) {
        return this.stripeService.getMonthlySubscription(u_id);
    }
    async handleIncomingEvents(signature, request) {
        if (!signature) {
            throw new common_1.BadRequestException('Missing stripe-signature header');
        }
        const event = await this.stripeService.constructEventFromPayload(signature, request.rawBody);
        if (event.type === 'customer.subscription.updated' ||
            event.type === 'customer.subscription.created') {
            return this.stripeService.processSubscriptionUpdate(event);
        }
    }
    async cancelSubscription(u_id) {
        const user = await this.stripeService.findOne(u_id);
        return await this.stripeService.cancelSubscription(user.subscriptionId);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'Get current user stripe info' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: stripe_entity_1.StripeEntity,
        description: 'success',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Get('me'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "findOne", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        type: stripe_entity_1.StripeEntity,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Create stripe info for current user' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Get('createCustomer'),
    __param(0, decorators_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCustomer", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'Create account for lender' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: stripe_entity_1.StripeEntity,
        description: 'success',
    }),
    swagger_1.ApiBody({
        type: dto_1.CreateAccountDto,
    }),
    common_1.Post('createAccount'),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createAccount", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Make one off payment with registered user' }),
    swagger_1.ApiBody({
        type: dto_1.CreateChargeDto,
        description: '',
    }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('createCharge'),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateChargeDto, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCharge", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Make one off payment without registered user' }),
    swagger_1.ApiBody({
        type: dto_1.CreateChargeDto,
        description: '',
    }),
    common_1.Post('oneOffPayment'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateChargeDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "oneOffPayment", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Add credit card record to use in stripe' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('addCreditCard'),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaymentMethodIdDto, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "addCreditCard", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Get all credit cards details' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Get('getCreditCards'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getCreditCards", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        description: 'success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Failed, check error.response.data',
    }),
    swagger_1.ApiQuery({
        name: 'paymentMethodId',
        description: 'paymentMethodId of the card',
    }),
    swagger_1.ApiOperation({ summary: 'delete credit card by paymentMethodId' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Delete('deleteCreditCard'),
    __param(0, common_1.Query('paymentMethodId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "deleteCreditCard", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Set default card' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('setDefaultCard'),
    __param(0, common_1.Body()),
    __param(1, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaymentMethodIdDto, String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "setDefaultCard", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Create monthly subscription' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('createMonthlySubscription'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createMonthlySubscription", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Get monthly subscription' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Get('getMonthlySubscription'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "getMonthlySubscription", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Post('webhooks'),
    __param(0, common_1.Headers('stripe-signature')),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "handleIncomingEvents", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        description: 'success',
    }),
    swagger_1.ApiOperation({ summary: 'Cancel subscription.' }),
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(guards_1.JwtAuthGuard),
    common_1.Delete('cancelSubscription'),
    __param(0, decorators_1.AuthUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "cancelSubscription", null);
StripeController = __decorate([
    swagger_1.ApiTags('Stripe'),
    common_1.Controller('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
exports.StripeController = StripeController;
//# sourceMappingURL=stripe.controller.js.map