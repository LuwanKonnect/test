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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const stripe_error_enum_1 = require("./enum/stripe-error.enum");
const stripe_entity_1 = require("./stripe.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stripe_event_entity_1 = require("./stripe-event.entity");
const shared_1 = require("../../shared");
let StripeService = class StripeService {
    constructor(apiConfigService, stripeRepository, eventsRepository) {
        this.apiConfigService = apiConfigService;
        this.stripeRepository = stripeRepository;
        this.eventsRepository = eventsRepository;
        this.stripeConfig = apiConfigService.stripeConfig;
        this.stripe = new stripe_1.default(this.stripeConfig.secretKey, {
            apiVersion: '2020-08-27',
        });
    }
    async createCustomer(email, name) {
        return this.stripe.customers.create({
            name,
            email,
        });
    }
    async createAccount(createAccountDto, ipAddress) {
        return this.stripe.accounts.create({
            type: 'custom',
            country: createAccountDto.country,
            email: createAccountDto.email,
            capabilities: {
                transfers: {
                    requested: true,
                },
            },
            individual: {
                first_name: createAccountDto.firstName,
                last_name: createAccountDto.lastName,
                dob: {
                    day: createAccountDto.day,
                    month: createAccountDto.month,
                    year: createAccountDto.year,
                },
                email: createAccountDto.email,
                address: {
                    city: createAccountDto.city,
                    country: createAccountDto.country,
                    line1: createAccountDto.line1,
                    postal_code: createAccountDto.postal_code,
                    state: createAccountDto.state,
                },
            },
            business_type: 'individual',
            business_profile: {
                url: 'http://www.littlebigshed.click',
            },
            external_account: {
                object: 'bank_account',
                country: createAccountDto.country,
                currency: 'NZD',
                routing_number: createAccountDto.bsb,
                account_number: createAccountDto.accountNumber,
            },
            tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: ipAddress,
            },
        });
    }
    async transfer(amount, destination) {
        const transfer = await this.stripe.transfers.create({
            amount,
            currency: this.stripeConfig.currency,
            destination,
        });
    }
    async save(stripeEntity) {
        return await this.stripeRepository.save(stripeEntity);
    }
    async cancelSubscription(subscriptionId) {
        return await this.stripe.subscriptions.del(subscriptionId);
    }
    async findOne(u_id) {
        return this.stripeRepository.findOne({ u_id });
    }
    createEvent(id) {
        return this.eventsRepository.insert({ id });
    }
    async updateMonthlySubscriptionStatus(customerId, monthlySubscriptionStatus) {
        return this.stripeRepository.update({ customerId }, { monthlySubscriptionStatus });
    }
    async oneOffPayment(paymentMethodId, amount) {
        return this.stripe.paymentIntents.create({
            amount,
            payment_method: paymentMethodId,
            currency: this.stripeConfig.currency,
            off_session: true,
            confirm: true,
        });
    }
    async charge(amount, paymentMethodId, u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        return this.stripe.paymentIntents.create({
            amount,
            customer: res.customerId,
            payment_method: paymentMethodId,
            currency: this.stripeConfig.currency,
            off_session: true,
            confirm: true,
        });
    }
    async addCreditCard(paymentMethodId, u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        return await this.stripe.setupIntents.create({
            customer: res.customerId,
            payment_method: paymentMethodId,
            confirm: true,
        });
    }
    async attachCreditCard(paymentMethodId, u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        return await this.stripe.paymentMethods.attach(paymentMethodId, {
            customer: res.customerId,
        });
    }
    async listCreditCards(u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        return this.stripe.paymentMethods.list({
            customer: res.customerId,
            type: 'card',
        });
    }
    async deleteCreditCard(paymentMethodId) {
        try {
            return await this.stripe.paymentMethods.detach(paymentMethodId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.toString());
        }
    }
    async setDefaultCreditCard(paymentMethodId, u_id) {
        try {
            const res = await this.stripeRepository.findOne({ u_id });
            return await this.stripe.customers.update(res.customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId,
                },
            });
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.type) === stripe_error_enum_1.default.InvalidRequest) {
                throw new common_1.BadRequestException('Wrong credit card chosen');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async createSubscription(priceId, customerId) {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [
                    {
                        price: priceId,
                    },
                ],
            });
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === stripe_error_enum_1.default.ResourceMissing) {
                throw new common_1.BadRequestException('Credit card not set up');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async listSubscriptions(priceId, customerId) {
        return this.stripe.subscriptions.list({
            customer: customerId,
            price: priceId,
        });
    }
    async createMonthlySubscription(u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        const priceId = this.stripeConfig.monthlySubscriptionPriceID;
        const subscriptions = await this.listSubscriptions(priceId, res.customerId);
        if (subscriptions.data.length) {
            throw new common_1.BadRequestException('Customer already subscribed');
        }
        return this.createSubscription(priceId, res.customerId);
    }
    async getMonthlySubscription(u_id) {
        const res = await this.stripeRepository.findOne({ u_id });
        const priceId = this.stripeConfig.monthlySubscriptionPriceID;
        const subscriptions = await this.listSubscriptions(priceId, res.customerId);
        if (!subscriptions.data.length) {
            return new common_1.NotFoundException('Customer not subscribed');
        }
        return subscriptions.data[0];
    }
    async constructEventFromPayload(signature, payload) {
        const webhookSecret = this.stripeConfig.webhookSecret;
        return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
    async processSubscriptionUpdate(event) {
        const res = await this.eventsRepository.find({ id: event.id });
        if (res.length > 0) {
            throw new common_1.BadRequestException('This event was already processed');
        }
        else {
            await this.createEvent(event.id);
        }
        const data = event.data.object;
        const customerId = data.customer;
        const subscriptionStatus = data.status;
        await this.updateMonthlySubscriptionStatus(customerId, subscriptionStatus);
    }
};
StripeService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(stripe_entity_1.StripeEntity)),
    __param(2, typeorm_1.InjectRepository(stripe_event_entity_1.default)),
    __metadata("design:paramtypes", [shared_1.ApiConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StripeService);
exports.StripeService = StripeService;
//# sourceMappingURL=stripe.service.js.map