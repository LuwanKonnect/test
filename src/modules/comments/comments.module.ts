import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ItemsModule } from '../items/items.module';
import { UserEntity } from '../../core/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments, UserEntity]), ItemsModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
