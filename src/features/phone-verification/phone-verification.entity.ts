import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('phone_verification')
export default class PhoneVerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  phone_number: string;

  @Column()
  country_code: string;

  @Column()
  verification_code: string;

  @Column()
  status: string;

  @Column()
  user_id: string;

  @Column()
  allow_login: boolean;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
