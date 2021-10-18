import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Entity()
export class Liked {
  @ApiProperty({
    required: false,
    description: 'Liked record ID',
  })
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  l_id: number;

  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @IsString()
  @IsOptional()
  @Column()
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'item id',
  })
  @IsNumber()
  @Column()
  i_id: number;

  @ApiProperty({
    required: false,
  })
  @CreateDateColumn()
  created?: Date;

  @ApiProperty({
    required: false,
  })
  @UpdateDateColumn()
  updated?: Date;
}
