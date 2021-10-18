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
import { Type } from 'class-transformer';

enum option {
  delivery = 'delivery',
  pickup = 'pickup',
  both = 'both',
  none = 'none',
}

@Entity()
export class Booking {
  @ApiProperty({
    required: false,
    description: 'Booking ID',
  })
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  b_id: number;

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
    required: true,
    description: 'item owner id - user id',
  })
  @IsString()
  @Column()
  io_id: string;

  @ApiProperty({
    required: true,
    description:
      '1 is apply, 0 is reject, 2 is reschedule, 3 is approve , 4 for borrow picked up' +
      ', 5 for lender confirms pickup, 6 for both confirm, 7 for return',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Column({ default: 1 })
  status: number;

  @IsOptional()
  @ApiProperty({
    description: 'whether error happens',
  })
  @Column({ default: false })
  error: boolean;

  @IsNotEmpty({ message: 'delivery Option' })
  @ApiProperty({
    required: true,
    enum: option,
    description: 'delivery Option',
  })
  @Column()
  deliveryOption: option;

  @ApiProperty({
    description: 'start time',
  })
  @IsNumber()
  @Column()
  startDate: number;

  @IsOptional()
  @ApiProperty({
    description: 'address for delivery/pickup',
  })
  @Column({ default: '' })
  address: string;

  @ApiProperty({
    description: 'end time',
  })
  @IsNumber()
  @Column()
  endDate: number;

  @ApiProperty({
    description: 'Year',
  })
  @IsNumber()
  @Column()
  year: number;

  @ApiProperty({
    description: 'Price',
  })
  @IsNumber()
  @Column()
  price: number;

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
