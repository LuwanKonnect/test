import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DeliveryOptionEnum } from './enum/delivery-option.enum';
import { Type } from 'class-transformer';

@Entity()
export class Items {
  @ApiProperty({
    required: false,
    description: 'item ID',
  })
  @PrimaryGeneratedColumn()
  i_id: number;

  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @IsString()
  @IsOptional()
  @Column()
  u_id: string;

  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty({ message: 'title cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Column()
  title: string;

  @ApiProperty({
    required: true,
    description: 'category',
  })
  @IsString()
  @Column()
  category: string;

  // @IsNotEmpty({ message: 'pictures' })
  @ApiProperty({
    required: false,
    description: 'pictures, maximum is 9',
  })
  @IsOptional()
  @Column({ default: null })
  pictures: string;

  @IsNotEmpty({ message: 'Description' })
  @ApiProperty({
    description: 'Description',
  })
  @Column()
  description: string;

  @IsNotEmpty({ message: 'Price' })
  @ApiProperty({
    required: true,
    description: 'Price',
  })
  @Column()
  price: number;

  @IsNotEmpty({ message: 'delivery Price' })
  @ApiProperty({
    required: false,
    description: 'delivery Price',
  })
  @Column({ default: 0 })
  deliveryPrice: number;

  @ApiProperty({
    required: false,
    description: 'rating score',
  })
  @IsOptional()
  @Column({ default: 5 })
  rating: number;

  @ApiProperty({
    required: false,
    description: 'discount for off peak',
  })
  @IsOptional()
  @Column({ default: 0 })
  discount: number;

  @ApiProperty({
    example: '11010111001100',
    required: false,
    description: 'will set default to all 1',
  })
  @IsString()
  @Column({ length: 14, default: '11111111111111' })
  available: string;

  @ApiProperty({
    required: true,
    description: 'lat',
  })
  @IsNumber()
  @Type(() => Number)
  @Column({ type: 'float' })
  lat: number;

  @ApiProperty({
    required: true,
    description: 'lng',
  })
  @IsNumber()
  @Type(() => Number)
  @Column({ type: 'float' })
  lng: number;

  @ApiProperty({
    required: false,
    description: 'address',
  })
  @IsString()
  @Column({ default: null })
  address: string;

  @ApiProperty({
    required: false,
    description: 'suburb',
  })
  @IsString()
  @Column({ default: null })
  suburb: string;

  @IsOptional()
  @Column({ default: false })
  is_deleted: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @CreateDateColumn()
  created?: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @UpdateDateColumn()
  updated?: Date;
}

@Entity()
export class Options {
  @ApiProperty({
    required: false,
    description: 'Options ID',
  })
  @IsNumber()
  @PrimaryGeneratedColumn()
  o_id: number;

  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty({ message: 'title cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  @Column()
  title: string;

  @IsNotEmpty({ message: 'Price' })
  @ApiProperty({
    required: true,
    description: 'Price',
  })
  @Column()
  price: number;

  @IsNotEmpty({ message: 'Description' })
  @ApiProperty({
    description: 'Description',
  })
  @Column()
  description: string;

  @Column({ default: false })
  is_deleted: boolean;
}
