import { Module } from '@nestjs/common';
import { BorrowerRatingService } from './borrower-rating.service';
import { BorrowerRatingController } from './borrower-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerRating } from './borrower-rating.entity';
import { UserEntity } from '../../core/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowerRating, UserEntity])],
  providers: [BorrowerRatingService],
  controllers: [BorrowerRatingController],
})
export class BorrowerRatingModule {}
