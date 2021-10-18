import { Module } from '@nestjs/common';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaypalEntity } from './paypal.entity';
import { FeaturesModule } from '../../shared';

@Module({
  imports: [TypeOrmModule.forFeature([PaypalEntity]), FeaturesModule],
  controllers: [PaypalController],
  providers: [PaypalService],
})
export class PaypalModule {}
