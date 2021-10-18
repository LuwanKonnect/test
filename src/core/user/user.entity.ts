import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/constants';
import { UserDto } from './dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ unique: true })
  email: string;

  @Column({ length: 80 })
  fullName: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({ default: null })
  avatar: string;

  // @Column({ default: true })
  // isActive: boolean;

  // @Column({ default: UserRoleEnum.USER })
  // role: UserRoleEnum;

  @Column({ comment: 'Mobile', length: 30, unique: true })
  mobile: string;

  @ApiProperty({
    description: 'address',
  })
  @Column({ default: null })
  address: string;

  @ApiProperty({
    description: 'lat',
  })
  @Column({ type: 'float', default: 0.00 })
  lat: number;

  @ApiProperty({
    description: 'lng',
  })
  @Column({ type: 'float', default: 0.00 })
  lng: number;

  @ApiProperty({
    description: 'suburb',
  })
  @Column({ default: null })
  suburb: string;

  @ApiProperty({
    description: 'bsb',
  })
  @Column({ default: null})
  bsb: string;

  @ApiProperty({
    description: 'account_number',
  })
  @Column({ default: null})
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

  @Column({ length: 14, default: '11111111111111' })
  available: string;

  dtoClass = UserDto;
}
