import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity('stripe')
export class StripeEntity {
  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @PrimaryColumn({ unique: true })
  u_id: string;

  @ApiProperty({
    required: true,
    description: 'Customer ID',
  })
  @IsString()
  @Column({ default: null })
  customerId: string;

  @ApiProperty({
    required: true,
    description: 'Account ID',
  })
  @IsString()
  @Column({ default: null })
  accountId: string;

  @ApiProperty({
    required: true,
    description: 'Subscription ID',
  })
  @IsString()
  @Column({ default: null })
  subscriptionId: string;

  @Column({ nullable: true })
  monthlySubscriptionStatus?: string;

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
