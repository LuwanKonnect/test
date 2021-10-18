import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { UserEntity } from '../../core/user/user.entity';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, UserEntity]),
    AvailabilityModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
