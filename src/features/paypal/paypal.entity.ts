import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity('paypal')
export class PaypalEntity {
  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @PrimaryColumn({ unique: true })
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'User paypal payer ID',
  })
  @IsString()
  @Column({ default: null })
  payerId: string;

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
