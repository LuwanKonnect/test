import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
  @ApiProperty({
    required: false,
    description: 'item ID',
  })
  @IsNumber()
  i_id: number;

  @ApiProperty({
    required: true,
    description: 'User ID',
  })
  @IsString()
  u_id: string;

  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty({ message: 'title cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  title: string;

  @ApiProperty({
    required: true,
    description: 'category',
  })
  @IsString()
  category: string;

  // @IsNotEmpty({ message: 'pictures' })
  @ApiProperty({
    required: false,
    description: 'pictures, maximum is 9',
  })
  @IsOptional()
  pictures: string;

  @IsNotEmpty({ message: 'Description' })
  @ApiProperty({
    description: 'Description',
  })
  description: string;

  @IsNotEmpty({ message: 'Price' })
  @ApiProperty({
    required: true,
    description: 'Price',
  })
  price: number;

  @IsNotEmpty({ message: 'delivery Price' })
  @ApiProperty({
    required: false,
    description: 'delivery Price',
  })
  deliveryPrice: number;

  @ApiProperty({
    required: false,
    description: 'rating score',
  })
  @IsOptional()
  rating: number;

  @ApiProperty({
    required: false,
    description: 'discount for off peak',
  })
  @IsOptional()
  discount: number;

  @ApiProperty({
    example: '11010111001100',
    required: false,
    description: 'will set default to all 1',
  })
  @IsString()
  available: string;

  @ApiProperty({
    required: true,
    description: 'lat',
  })
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    required: true,
    description: 'lng',
  })
  @IsNumber()
  @Type(() => Number)
  lng: number;

  @ApiProperty({
    required: false,
    description: 'address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: false,
    description: 'suburb',
  })
  @IsString()
  suburb: string;

  @IsOptional()
  is_deleted: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  created?: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  updated?: Date;
}
