import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Stripe from 'stripe';
import StripeErrorEnum from './enum/stripe-error.enum';
import { StripeEntity } from './stripe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import StripeEventEntity from './stripe-event.entity';
import { ApiConfigService } from '../../shared';
import { StripeConfigInterface } from './interfaces/stripe-config.interface';
import { CreateAccountDto } from './dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private stripeConfig: StripeConfigInterface;
  constructor(
    private apiConfigService: ApiConfigService,
    @InjectRepository(StripeEntity)
    private stripeRepository: Repository<StripeEntity>,
    @InjectRepository(StripeEventEntity)
    private eventsRepository: Repository<StripeEventEntity>,
  ) {
    this.stripeConfig = apiConfigService.stripeConfig;
    this.stripe = new Stripe(this.stripeConfig.secretKey, {
      apiVersion: '2020-08-27',
    });
  }
  public async createCustomer(email: string, name: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }
  async createAccount(createAccountDto: CreateAccountDto, ipAddress: string) {
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
        // phone: '',
        address: {
          city: createAccountDto.city,
          country: createAccountDto.country,
          line1: createAccountDto.line1,
          postal_code: createAccountDto.postal_code,
          state: createAccountDto.state,
        },
        // verification: {
        //   document: {
        //     front: '',
        //     back: '',
        //   },
        //   additional_document: {
        //     front: '',
        //     back: '',
        //   },
        // },
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
        ip: ipAddress, // Assumes you're not using a proxy
      },
      // payouts_enabled: 'false'
    });
  }
  async transfer(amount: number, destination: string) {
    const transfer = await this.stripe.transfers.create({
      amount,
      currency: this.stripeConfig.currency,
      destination,
      // transfer_group: 'ORDER_95',
    });
  }
  async save(stripeEntity: Partial<StripeEntity>): Promise<StripeEntity> {
    return await this.stripeRepository.save(stripeEntity);
  }
  async cancelSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.del(subscriptionId);
  }
  async findOne(u_id: string): Promise<StripeEntity> {
    return this.stripeRepository.findOne({ u_id });
  }
  createEvent(id: string) {
    return this.eventsRepository.insert({ id });
  }
  async updateMonthlySubscriptionStatus(
    customerId: string,
    monthlySubscriptionStatus: string,
  ) {
    return this.stripeRepository.update(
      { customerId },
      { monthlySubscriptionStatus },
    );
  }
  public async oneOffPayment(paymentMethodId: string, amount: number) {
    return this.stripe.paymentIntents.create({
      amount,
      payment_method: paymentMethodId,
      currency: this.stripeConfig.currency,
      off_session: true,
      confirm: true,
    });
  }
  public async charge(amount: number, paymentMethodId: string, u_id: string) {
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
  // confirmed directly, but actually need frontend confirm
  public async addCreditCard(paymentMethodId: string, u_id: string) {
    const res = await this.stripeRepository.findOne({ u_id });
    return await this.stripe.setupIntents.create({
      customer: res.customerId,
      payment_method: paymentMethodId,
      confirm: true,
    });
  }
  public async attachCreditCard(paymentMethodId: string, u_id: string) {
    const res = await this.stripeRepository.findOne({ u_id });
    return await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: res.customerId,
    });
  }
  public async listCreditCards(u_id: string) {
    const res = await this.stripeRepository.findOne({ u_id });
    return this.stripe.paymentMethods.list({
      customer: res.customerId,
      type: 'card',
    });
  }
  public async deleteCreditCard(paymentMethodId: string) {
    // const res = await this.stripeRepository.findOne({ u_id });
    try {
      return await this.stripe.paymentMethods.detach(paymentMethodId);
    } catch (error) {
      throw new BadRequestException(error.toString());
    }
  }
  public async setDefaultCreditCard(paymentMethodId: string, u_id: string) {
    try {
      const res = await this.stripeRepository.findOne({ u_id });
      return await this.stripe.customers.update(res.customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
    } catch (error) {
      if (error?.type === StripeErrorEnum.InvalidRequest) {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }
  public async createSubscription(priceId: string, customerId: string) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        // Free trial
        // trial_period_days: 30,
      });
    } catch (error) {
      if (error?.code === StripeErrorEnum.ResourceMissing) {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listSubscriptions(priceId: string, customerId: string) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId,
      // expand: ['data.latest_invoice', 'data.latest_invoice.payment_intent'],
    });
  }
  public async createMonthlySubscription(u_id: string) {
    const res = await this.stripeRepository.findOne({ u_id });
    const priceId = this.stripeConfig.monthlySubscriptionPriceID;

    const subscriptions = await this.listSubscriptions(priceId, res.customerId);
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.createSubscription(priceId, res.customerId);
  }

  public async getMonthlySubscription(u_id: string) {
    const res = await this.stripeRepository.findOne({ u_id });
    const priceId = this.stripeConfig.monthlySubscriptionPriceID;
    const subscriptions = await this.listSubscriptions(priceId, res.customerId);

    if (!subscriptions.data.length) {
      return new NotFoundException('Customer not subscribed');
    }
    return subscriptions.data[0];
  }
  public async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.stripeConfig.webhookSecret;

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }
  async processSubscriptionUpdate(event: Stripe.Event) {
    const res = await this.eventsRepository.find({ id: event.id });
    if (res.length > 0) {
      throw new BadRequestException('This event was already processed');
    } else {
      await this.createEvent(event.id);
    }

    const data = event.data.object as Stripe.Subscription;

    const customerId: string = data.customer as string;
    const subscriptionStatus = data.status;

    await this.updateMonthlySubscriptionStatus(customerId, subscriptionStatus);
  }
}
