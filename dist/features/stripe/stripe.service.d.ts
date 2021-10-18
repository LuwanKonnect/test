/// <reference types="node" />
import { NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeEntity } from './stripe.entity';
import { Repository } from 'typeorm';
import StripeEventEntity from './stripe-event.entity';
import { ApiConfigService } from '../../shared';
import { CreateAccountDto } from './dto';
export declare class StripeService {
    private apiConfigService;
    private stripeRepository;
    private eventsRepository;
    private stripe;
    private stripeConfig;
    constructor(apiConfigService: ApiConfigService, stripeRepository: Repository<StripeEntity>, eventsRepository: Repository<StripeEventEntity>);
    createCustomer(email: string, name: string): Promise<Stripe.Response<Stripe.Customer>>;
    createAccount(createAccountDto: CreateAccountDto, ipAddress: string): Promise<Stripe.Response<Stripe.Account>>;
    transfer(amount: number, destination: string): Promise<void>;
    save(stripeEntity: Partial<StripeEntity>): Promise<StripeEntity>;
    cancelSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    findOne(u_id: string): Promise<StripeEntity>;
    createEvent(id: string): Promise<import("typeorm").InsertResult>;
    updateMonthlySubscriptionStatus(customerId: string, monthlySubscriptionStatus: string): Promise<import("typeorm").UpdateResult>;
    oneOffPayment(paymentMethodId: string, amount: number): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    charge(amount: number, paymentMethodId: string, u_id: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    addCreditCard(paymentMethodId: string, u_id: string): Promise<Stripe.Response<Stripe.SetupIntent>>;
    attachCreditCard(paymentMethodId: string, u_id: string): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    listCreditCards(u_id: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.PaymentMethod>>>;
    deleteCreditCard(paymentMethodId: string): Promise<Stripe.Response<Stripe.PaymentMethod>>;
    setDefaultCreditCard(paymentMethodId: string, u_id: string): Promise<Stripe.Response<Stripe.Customer>>;
    createSubscription(priceId: string, customerId: string): Promise<Stripe.Response<Stripe.Subscription>>;
    listSubscriptions(priceId: string, customerId: string): Promise<Stripe.Response<Stripe.ApiList<Stripe.Subscription>>>;
    createMonthlySubscription(u_id: string): Promise<Stripe.Response<Stripe.Subscription>>;
    getMonthlySubscription(u_id: string): Promise<NotFoundException | Stripe.Subscription>;
    constructEventFromPayload(signature: string, payload: Buffer): Promise<Stripe.Event>;
    processSubscriptionUpdate(event: Stripe.Event): Promise<void>;
}
