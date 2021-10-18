import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LenderRating } from './lender-rating.entity';
import { Connection } from 'typeorm';
import { UserEntity } from '../../core/user/user.entity';

@Injectable()
export class LenderRatingService {
  @InjectRepository(LenderRating)
  private lenderRatingRepository;

  @InjectRepository(UserEntity)
  private userRepository;

  constructor(private connection: Connection) {}

  findOne(r_id: number): Promise<LenderRating> {
    return this.lenderRatingRepository.findOne({ where: { r_id } });
  }
  findByBid(l_id: string): Promise<LenderRating[]> {
    return this.lenderRatingRepository.find({ where: { l_id } });
  }
  findByBookingId(booking_id: number): Promise<LenderRating> {
    return this.lenderRatingRepository.find({ where: { booking_id } });
  }

  async update(ratingAsLender: any): Promise<{ code: number; msg: string }> {
    try {
      const res = await this.lenderRatingRepository.update(
        { r_id: ratingAsLender.r_id },
        ratingAsLender,
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
  async remove(r_id: number, u_id: string): Promise<any> {
    return await this.lenderRatingRepository.delete({ r_id, u_id });
  }
  async save(ratingAsLender: LenderRating): Promise<any> {
    return await this.lenderRatingRepository.save(ratingAsLender);
  }
  async updateScore(l_id: string): Promise<any> {
    try {
      const score = this.lenderRatingRepository.find({ l_id }).avg('rating');
      return await this.userRepository.update(
        { u_id: l_id },
        { lender_rating: score },
      );
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
