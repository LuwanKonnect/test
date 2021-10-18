import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { UserEntity } from '../../core/user/user.entity';
import { ItemsService } from '../items/items.service';
@Injectable()
export class CommentsService {
  @InjectRepository(Comments)
  private commentsRepository;
  @InjectRepository(UserEntity)
  private userRepository;

  constructor(private readonly itemsService: ItemsService) {}

  findOne(c_id: string): Promise<Comments> {
    return this.commentsRepository.findOne({ where: { c_id } });
  }
  async findAll(t_id: string, type: string): Promise<any> {
    // const commentList = await
    return this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect(UserEntity, 'user', 'user.u_id=comments.u_id')
      .select(`comments.*, user.fullName as fullName, user.avatar as avatar`)
      .where({ t_id, type })
      .getRawMany();
  }
  findByUid(u_id: string): Promise<Comments[]> {
    return this.commentsRepository.find({ where: { u_id } });
  }
  async update(comments: Comments): Promise<{ code: number; msg: string }> {
    try {
      const res = await this.commentsRepository.update(
        { c_id: comments.c_id },
        comments,
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
  async remove(c_id: string, u_id: string): Promise<any> {
    return await this.commentsRepository.update({ c_id, u_id });
  }
  async save(comments: Comments): Promise<{ code: number; msg: string }> {
    try {
      await this.commentsRepository.save(comments);
      const score = this.commentsRepository
        .find({ i_id: comments.i_id })
        .avg('rating');
      await this.itemsService.update({ i_id: comments.i_id, rating: score });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
