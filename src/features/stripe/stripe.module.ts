import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeEntity } from './stripe.entity';
import StripeEventEntity from './stripe-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeEntity, StripeEventEntity])],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
