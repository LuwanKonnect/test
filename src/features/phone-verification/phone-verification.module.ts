import PhoneVerificationEntity from './phone-verification.entity';
import PhoneVerificationService from './phone-verification.service';
import PhoneVerificationController from './phone-verification.controller';

import { UserEntity } from '../../core/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PhoneVerificationController],
  imports: [TypeOrmModule.forFeature([PhoneVerificationEntity, UserEntity])],
  providers: [PhoneVerificationService],
})
export default class PhoneVerificationsModule {}
