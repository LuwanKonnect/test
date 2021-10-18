import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liked } from './liked.entity';
import { LikedService } from './liked.service';
import { LikedController } from './liked.controller';
import { Items } from '../items/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Liked, Items])],
  providers: [LikedService],
  controllers: [LikedController],
  exports: [LikedService],
})
export class LikedModule {}
