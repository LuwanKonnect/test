import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsString, IsOptional } from 'class-validator';

@Entity()
export class BorrowerRating {
  @ApiProperty({
    required: false,
    description: 'Rating ID',
  })
  @IsOptional()
  @IsNumber()
  @PrimaryGeneratedColumn()
  r_id: number;

  @ApiProperty({
    required: true,
    description: 'Borrower User ID',
  })
  @IsString()
  @Column()
  b_id: string;

  @ApiProperty({
    required: true,
    description: 'Lender User ID',
  })
  @IsString()
  @IsOptional()
  @Column()
  l_id: string;

  @ApiProperty({
    required: true,
    description: 'Booking ID',
  })
  @IsNumber()
  @Column()
  booking_id: number;

  @ApiProperty({
    description: 'lender comments borrower',
  })
  @IsOptional()
  @IsString()
  @Column()
  lender_comment: string;

  @ApiProperty({
    required: false,
    description: 'rating score as borrower',
  })
  @Max(5)
  @Min(0)
  @Column({ default: 5 })
  lender_rating: number;

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
