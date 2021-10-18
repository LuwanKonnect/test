import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { AuthUser } from '../../common/decorators';
import { StripeEntity } from './stripe.entity';
import { JwtAuthGuard } from '../../common/guards';
import { CreateAccountDto, CreateChargeDto, PaymentMethodIdDto } from './dto';
import RequestWithRawBody from '../../common/interfaces/request-with-raw-body.interface';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @ApiOperation({ summary: 'Get current user stripe info' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: StripeEntity,
    description: 'success',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOne(@AuthUser('id') id: string): Promise<StripeEntity> {
    return await this.stripeService.findOne(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: StripeEntity,
    description: 'success',
  })
  @ApiOperation({ summary: 'Create stripe info for current user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('createCustomer')
  async createCustomer(@AuthUser() payload): Promise<StripeEntity> {
    const stripeCustomer = await this.stripeService.createCustomer(
      payload.email,
      payload.id,
    );
    return await this.stripeService.save({
      u_id: payload.id,
      customerId: stripeCustomer.id,
    });
  }
  @ApiOperation({ summary: 'Create account for lender' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: StripeEntity,
    description: 'success',
  })
  @ApiBody({
    type: CreateAccountDto,
  })
  @Post('createAccount')
  async createAccount(
    @Body() createAccount: CreateAccountDto,
    @Req() req: any,
  ) {
    return this.stripeService.createAccount(
      createAccount,
      req.connection.remoteAddress,
    );
  }
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiOperation({ summary: 'Make one off payment with registered user' })
  @ApiBody({
    type: CreateChargeDto,
    description: '',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('createCharge')
  async createCharge(
    @Body() charge: CreateChargeDto,
    @AuthUser('id') u_id: string,
  ) {
    return await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      u_id,
    );
  }
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiOperation({ summary: 'Make one off payment without registered user' })
  @ApiBody({
    type: CreateChargeDto,
    description: '',
  })
  @Post('oneOffPayment')
  async oneOffPayment(@Body() charge: CreateChargeDto) {
    return await this.stripeService.oneOffPayment(
      charge.paymentMethodId,
      charge.amount,
    );
  }
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiOperation({ summary: 'Add credit card record to use in stripe' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('addCreditCard')
  async addCreditCard(
    @Body() paymentMethodIdDto: PaymentMethodIdDto,
    @AuthUser('id') u_id: string,
  ) {
    return this.stripeService.addCreditCard(
      paymentMethodIdDto.paymentMethodId,
      u_id,
    );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiOperation({ summary: 'Get all credit cards details' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getCreditCards')
  async getCreditCards(@AuthUser('id') u_id: string) {
    return this.stripeService.listCreditCards(u_id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed, check error.response.data',
  })
  @ApiQuery({
    name: 'paymentMethodId',
    description: 'paymentMethodId of the card',
  })
  @ApiOperation({ summary: 'delete credit card by paymentMethodId' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('deleteCreditCard')
  async deleteCreditCard(@Query('paymentMethodId') paymentMethodId: string) {
    return await this.stripeService.deleteCreditCard(paymentMethodId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiOperation({ summary: 'Set default card' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('setDefaultCard')
  async setDefaultCard(
    @Body() paymentMethodIdDto: PaymentMethodIdDto,
    @AuthUser('id') u_id: string,
  ) {
    await this.stripeService.setDefaultCreditCard(
      paymentMethodIdDto.paymentMethodId,
      u_id,
    );
  }
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiOperation({ summary: 'Create monthly subscription' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('createMonthlySubscription')
  async createMonthlySubscription(@AuthUser('id') u_id: string) {
    return this.stripeService.createMonthlySubscription(u_id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiOperation({ summary: 'Get monthly subscription' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getMonthlySubscription')
  async getMonthlySubscription(@AuthUser('id') u_id: string) {
    return this.stripeService.getMonthlySubscription(u_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('webhooks')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.stripeService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.created'
    ) {
      return this.stripeService.processSubscriptionUpdate(event);
    }
  }
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiOperation({ summary: 'Cancel subscription.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('cancelSubscription')
  async cancelSubscription(@AuthUser('id') u_id: string): Promise<any> {
    const user = await this.stripeService.findOne(u_id);
    return await this.stripeService.cancelSubscription(user.subscriptionId);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @ApiQuery({
  //   name: 'priceId',
  //   description: 'priceId',
  // })
  // @Get('createSubscription')
  // async createSubscription(
  //   @AuthUser('u_id') u_id: string,
  //   @Query('priceId') priceId: string,
  // ) {
  //   const user = await this.stripeService.findOne(u_id);
  //   if (user) {
  //     return this.stripeService.createSubscription(priceId, user.customerId);
  //   } else {
  //     return {
  //       code: 403,
  //       msg: 'no this user',
  //     };
  //   }
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('webhook')
  // async webhook(@Req() req: Request, @Res() res: Response): Promise<any> {
  //   return await this.stripeService.webhook(req, res);
  // }

  // @ApiBody({
  //   description: 'subscription',
  // })
  // @UseGuards(AuthGuard('jwt'))
  // @Post('getStripeAmount')
  // async getStripeAmount(
  //   @Body('subscription') subscription: string,
  // ): Promise<any> {
  //   return await this.stripeService.getStripeAmount(subscription);
  // }
  //
}
