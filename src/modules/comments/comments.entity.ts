import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Entity()
export class Comments {
  @ApiProperty({
    required: false,
    description: 'Comment ID',
  })
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  c_id: number;

  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @IsOptional()
  @IsString()
  @Column()
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'items id',
  })
  @IsNumber()
  @Column()
  i_id: number;

  @IsNotEmpty({ message: 'Comment content' })
  @ApiProperty({
    required: true,
    description: 'Comment content',
  })
  @Column()
  content: string;

  @ApiProperty({
    required: true,
    description: 'Comment content',
  })
  @Max(5)
  @Min(0)
  @Column({ default: 5 })
  rating: number;

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
