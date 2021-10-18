import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowerRating } from './borrower-rating.entity';
import { Connection } from 'typeorm';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class BorrowerRatingService {
  @InjectRepository(BorrowerRating)
  private borrowerRatingRepository;

  @InjectRepository(UserEntity)
  private userRepository;

  constructor(private connection: Connection) {}

  findOne(r_id: number): Promise<BorrowerRating> {
    return this.borrowerRatingRepository.findOne({ where: { r_id } });
  }
  findByBid(b_id: string): Promise<BorrowerRating[]> {
    return this.borrowerRatingRepository.find({ where: { b_id } });
  }
  findByBookingId(booking_id: number): Promise<BorrowerRating> {
    return this.borrowerRatingRepository.find({ where: { booking_id } });
  }

  async update(ratingAsBorrower: any): Promise<{ code: number; msg: string }> {
    try {
      const res = await this.borrowerRatingRepository.update(
        { r_id: ratingAsBorrower.r_id },
        ratingAsBorrower,
      );
      if (res.affected === 1) {
        return {
          code: 200,
          msg: 'Success',
        };
      } else {
        return {
          code: 403,
          msg: 'failed',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async remove(
    r_id: number,
    u_id: string,
  ): Promise<{ code: number; msg: string }> {
    return await this.borrowerRatingRepository.delete({ r_id, u_id });
  }
  async save(ratingAsBorrower: BorrowerRating): Promise<any> {
    try {
      return await this.borrowerRatingRepository.save(ratingAsBorrower);
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async updateScore(b_id: string): Promise<any> {
    try {
      const score = this.borrowerRatingRepository.find({ b_id }).avg('rating');
      return await this.userRepository.update(
        { u_id: b_id },
        { borrower_rating: score },
      );
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
