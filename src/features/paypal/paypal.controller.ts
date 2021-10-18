import {
  Body,
  Controller,
  HttpStatus,
  ParseFloatPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiConfigService, HttpRequestService } from '../../shared';
import { PaypalService } from './paypal.service';
import { PaypayConfigInterface } from './interfaces/paypay-config.interface';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateChargeDto from './dto/create-charge.dto';
import { JwtAuthGuard } from '../../common/guards';
import ExecuteChargeDto from './dto/execute-charge.dto';
import { AuthUser } from '../../common/decorators';
import { PaypalEntity } from './paypal.entity';

@ApiTags('Paypal')
@Controller('paypal')
export class PaypalController {
  private paypalConfig: PaypayConfigInterface;
  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly httpRequestService: HttpRequestService,
    private readonly paypalService: PaypalService,
  ) {
    this.paypalConfig = apiConfigService.paypalConfig;
  }

  @ApiOperation({ summary: 'Create payment without registered user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: typeof { id: 'string' },
  })
  @ApiBody({
    type: CreateChargeDto,
  })
  @Post('createPayment')
  async createPayment(
    @Body('amount', ParseFloatPipe) amount: number,
  ): Promise<{ id: string }> {
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
    return { id: res.body?.id };
  }

  @ApiOperation({ summary: 'Execute payment with registered user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: typeof { id: 'string' },
  })
  @ApiBody({
    type: ExecuteChargeDto,
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'Need JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('executePayment')
  async executePayment(
    @Body('amount', ParseFloatPipe) amount: number,
    @Body('paymentId') paymentId: string,
    @AuthUser('id') id: string,
  ): Promise<string> {
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
    const url =
      this.paypalConfig.api + '/v1/payments/payment/' + paymentId + '/execute';
    const res = await this.httpRequestService.httpPostRequest(url, body);
    console.log(res);
    return 'success';
  }

  @ApiOperation({ summary: 'Save payer ID' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: PaypalEntity,
  })
  @ApiBody({
    description: 'payerId',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'Need JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async save(
    @Body('payerId') payerId: string,
    @AuthUser('id') u_id: string,
  ): Promise<PaypalEntity> {
    return await this.paypalService.save({ u_id, payerId });
  }
}
