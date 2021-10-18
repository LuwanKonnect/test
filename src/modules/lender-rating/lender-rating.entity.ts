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
export class LenderRating {
  @ApiProperty({
    required: false,
    description: 'Rating ID',
  })
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  r_id: number;

  @ApiProperty({
    required: true,
    description: 'Borrower User ID',
  })
  @IsString()
  @IsOptional()
  @Column()
  b_id: string;

  @ApiProperty({
    required: true,
    description: 'Lender User ID',
  })
  @IsString()
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
    description: 'borrower comments lender',
  })
  @IsString()
  @IsOptional()
  @Column()
  borrower_comment: string;

  @ApiProperty({
    required: false,
    description: 'rating score as a lender',
  })
  @Max(5)
  @Min(0)
  @Column({ default: 5 })
  borrower_rating: number;

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
