import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/constants';
import type { UserEntity } from '../user.entity';
import { Column } from 'typeorm';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';
import { Type } from 'class-transformer';

export class UserDto extends AbstractDto {
  @ApiProperty({
    description: 'fullName',
    example: 'Andrew Owen',
  })
  @IsString()
  // @IsOptional()
  @IsNotEmpty()
  @Trim()
  fullName: string;

  @ApiProperty({
    example: 'tester1@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Trim()
  email: string;

  // @ApiPropertyOptional()
  // password: string;
  //
  // @ApiPropertyOptional()
  // salt: string;
  // @ApiPropertyOptional()
  // lastName: string;
  //
  // @ApiPropertyOptional()
  // username: string;

  // @ApiPropertyOptional({ enum: UserRoleEnum })
  // role: UserRoleEnum;
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  avatar: string;

  // @ApiPropertyOptional()
  // phone: string;
  //
  // @ApiPropertyOptional()
  // isActive: boolean;

  @IsPhoneNumber('AU')
  @ApiProperty({
    example: '0450123456',
    required: true,
    description: 'Must be Australia mobile',
  })
  @IsString()
  mobile: string;

  @ApiProperty({
    required: false,
    description: 'address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: false,
    description: 'lat',
  })
  @IsNumber()
  @Type(() => Number)
  @Column({ type: 'float' })
  lat: number;

  @ApiProperty({
    required: false,
    description: 'lng',
  })
  @IsNumber()
  @Type(() => Number)
  @Column({ type: 'float' })
  lng: number;

  @ApiProperty({
    required: false,
    description: 'suburb',
  })
  @IsString()
  suburb: string;

  @ApiProperty({
    required: false,
    description: 'bsb',
  })
  @IsString()
  bsb: string;

  @ApiProperty({
    required: false,
    description: 'account_number',
  })
  @IsString()
  account_number: string;

  @ApiProperty({
    example: 5,
    required: false,
    description: 'rating score as a lender.',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  lender_rating: number;

  @ApiProperty({
    example: 5,
    required: false,
    description: 'rating score as a borrower',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  borrower_rating: number;

  @ApiProperty({
    example: '11010111001100',
    required: false,
    description: 'will set default to all 1',
  })
  @IsString()
  available: string;

  constructor(user: UserEntity, options?: Partial<{ isActive: boolean }>) {
    super(user);
    this.fullName = user.fullName;
    // this.role = user.role;
    this.email = user.email;
    this.avatar = user.avatar;
    // this.isActive = options?.isActive;
    // this.salt = user.salt;
    this.bsb = user.bsb;
    this.account_number = user.account_number;
    this.address = user.address;
    this.lat = user.lat;
    this.lng = user.lng;
    this.suburb = user.suburb;
    this.borrower_rating = user.borrower_rating;
    this.lender_rating = user.lender_rating;
    this.mobile = user.mobile;
    this.available = user.available;
    // this.password = user.password;
  }
}
