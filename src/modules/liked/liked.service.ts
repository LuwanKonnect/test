import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liked } from './liked.entity';
import { Items } from '../items/items.entity';

@Injectable()
export class LikedService {
  @InjectRepository(Liked)
  private likedRepository;

  findOne(l_id: string): Promise<Liked> {
    return this.likedRepository.findOne({ where: { l_id } });
  }
  findAll(): Promise<Liked[]> {
    return this.likedRepository.find();
  }
  findByUid(u_id: string): Promise<Liked[]> {
    return this.likedRepository
      .createQueryBuilder('liked')
      .leftJoinAndSelect(Items, 'items', 'items.i_id=liked.i_id')
      .select(`items.*`)
      .where({ u_id })
      .getRawMany();
  }
  findByUidAndIid(u_id: string, i_id: string): Promise<Liked[]> {
    return this.likedRepository.find({ u_id, i_id });
  }
  async update(liked: Liked): Promise<{ code: number; msg: string }> {
    try {
      const res = await this.likedRepository.update(
        { l_id: liked.l_id },
        liked,
      );
      if (res.affected === 1) {
        return {
          code: 200,
          msg: 'Success',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  //delete one liked records
  async removeByIid(i_id: string, u_id: string): Promise<any> {
    return await this.likedRepository.delete({ i_id, u_id });
  }

  async save(liked: Liked): Promise<any> {
    return await this.likedRepository.save(liked);
  }
}
