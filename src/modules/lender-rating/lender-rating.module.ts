import { Module } from '@nestjs/common';
import { LenderRatingService } from './lender-rating.service';
import { LenderRatingController } from './lender-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LenderRating } from './lender-rating.entity';
import { UserEntity } from '../../core/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LenderRating, UserEntity])],
  providers: [LenderRatingService],
  controllers: [LenderRatingController],
})
export class LenderRatingModule {}
