import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core';

import PhoneVerificationService from './phone-verification.service';

@Controller('phone-verification')
export default class PhoneVerificationController {
  constructor(
    private readonly phoneVerificationService: PhoneVerificationService,
  ) {}

  @Post('create')
  async create(
    @Body()
    params: {
      allowLogin: boolean;
      countryCode: string;
      id: string;
      phoneNumber: string;
      userId: string;
    },
  ): Promise<any> {
    return this.phoneVerificationService.create(
      params.allowLogin,
      params.countryCode,
      params.id,
      params.phoneNumber,
      params.userId,
    );
  }

  @Post('resend')
  async resend(@Body() params: { id: string }): Promise<any> {
    return this.phoneVerificationService.resend(params.id);
  }

  @Post('verifyCode')
  async verifyCode(
    @Body() params: { id: string; verificationCode: string },
  ): Promise<any> {
    return this.phoneVerificationService.verifyCode(
      params.id,
      params.verificationCode,
    );
  }
}
