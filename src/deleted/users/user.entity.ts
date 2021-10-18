import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class User {
  @ApiProperty({
    required: false,
    description: 'User ID',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  u_id: number;

  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Column({ comment: 'Email', length: 130, unique: true })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  @ApiProperty({
    description: 'Password',
  })
  @Column()
  password: string;

  @ApiProperty({
    required: false,
    description: 'Mobile Phone',
  })
  @Column({ comment: 'Mobile', length: 30, unique: true })
  mobile: string;

  @ApiProperty({
    required: false,
    description: 'Avatar',
  })
  @Column({ default: null })
  avatar: string;

  @ApiProperty({
    required: false,
    description: 'FullName',
  })
  @Column({ comment: 'fullName', length: 130, default: null })
  fullName: string;

  // @Column({ default: null })
  // salt: string;
  @Column({ default: false })
  is_deleted: boolean;

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
  //-------------------------------------------
  @ApiProperty({
    description: 'address',
    required: false,
  })
  @Column({ default: null })
  address: string;

  @ApiProperty({
    description: 'city',
    required: false,
  })
  @Column({ default: null })
  city: string;

  @ApiProperty({
    description: 'country',
    required: false,
  })
  @Column({ default: null })
  country: string;

  @ApiProperty({
    description: 'state',
    required: false,
  })
  @Column({ default: null })
  state: string;

  @ApiProperty({
    description:
      'the availability of Monday morning, format should be 7:00_11:00',
    required: false,
  })
  @Column({ default: null })
  monday_am: string;

  @ApiProperty({
    description: 'the availability of Monday afternoon',
    required: false,
  })
  @Column({ default: null })
  monday_pm: string;

  @ApiProperty({
    description: 'the availability of tuesday morning',
    required: false,
  })
  @Column({ default: null })
  tuesday_am: string;

  @ApiProperty({
    description: 'the availability of tuesday afternoon',
    required: false,
  })
  @Column({ default: null })
  tuesday_pm: string;

  @ApiProperty({
    description: 'the availability of Wednesday morning',
    required: false,
  })
  @Column({ default: null })
  wednesday_am: string;

  @ApiProperty({
    description: 'the availability of Wednesday afternoon',
    required: false,
  })
  @Column({ default: null })
  wednesday_pm: string;

  @ApiProperty({
    description: 'the availability of Thursday morning',
    required: false,
  })
  @Column({ default: null })
  thursday_am: string;

  @ApiProperty({
    description: 'the availability of Thursday afternoon',
    required: false,
  })
  @Column({ default: null })
  thursday_pm: string;

  @ApiProperty({
    description: 'the availability of Friday morning',
    required: false,
  })
  @Column({ default: null })
  friday_am: string;

  @ApiProperty({
    description: 'the availability of Friday afternoon',
    required: false,
  })
  @Column({ default: null })
  friday_pm: string;

  @ApiProperty({
    description: 'the availability of Saturday morning',
    required: false,
  })
  @Column({ default: null })
  saturday_am: string;

  @ApiProperty({
    description: 'the availability of Saturday afternoon',
    required: false,
  })
  @Column({ default: null })
  saturday_pm: string;

  @ApiProperty({
    description: 'the availability of Sunday morning',
    required: false,
  })
  @Column({ default: null })
  sunday_am: string;

  @ApiProperty({
    description: 'the availability of Sunday afternoon',
    required: false,
  })
  @Column({ default: null })
  sunday_pm: string;

  @ApiProperty({
    description: 'bsb',
    required: false,
  })
  @Column({ default: null })
  bsb: string;

  @ApiProperty({
    description: 'account_number',
    required: false,
  })
  @Column({ default: null })
  account_number: string;

  @ApiProperty({
    required: false,
    description: 'rating score as a lender',
  })
  @Column({ default: 5 })
  lender_rating: number;

  @ApiProperty({
    required: false,
    description: 'rating score as a borrower',
  })
  @Column({ default: 5 })
  borrower_rating: number;
}
@Entity()
export class Cards {
  @ApiProperty({
    required: false,
    description: 'card ID',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  c_id: number;

  @ApiProperty({
    required: true,
    description: 'user ID',
  })
  @IsNumber()
  @Column()
  u_id: number;

  @ApiProperty({
    required: true,
    description: 'Card token ID',
  })
  @IsNumber()
  @Column()
  token_id: number;
}
export class LoginDTO {
  @ApiProperty({ description: 'Email', example: 'user1@gmail.com' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  readonly email: string;
  @ApiProperty({ description: 'Password', example: 'Aa123456' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string;
}

export class userResponseDTO {
  @ApiProperty()
  readonly user: User;
  @ApiProperty({ description: 'JWT token' })
  readonly token: string;
}
