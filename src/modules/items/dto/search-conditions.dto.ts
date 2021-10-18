import { DeliveryOptionEnum } from '../enum/delivery-option.enum';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class SearchConditionsDto {
  @ApiPropertyOptional({
    name: 'keyword',
    description: 'search for title or description',
  })
  @IsOptional()
  @IsString()
  keyword: string;
  @ApiPropertyOptional({
    name: 'distance',
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  distance: number;
  @ApiProperty({
    required: false,
    description: 'lat',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    required: false,
    description: 'lng',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lng: number;
  @ApiPropertyOptional({
    name: 'category',
  })
  @IsOptional()
  @IsString()
  category: string;
  @ApiPropertyOptional({
    name: 'minPrice',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  minPrice: number;
  @ApiPropertyOptional({
    name: 'maxPrice',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  maxPrice: number;
  @ApiPropertyOptional({
    name: 'rating',
    description: 'max is 5',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating: number;
  @ApiPropertyOptional({
    name: 'delivery',
    // type: DeliveryOptionEnum,
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  delivery: number;
  @ApiPropertyOptional({
    name: 'start',
    description: 'start date',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  start: number;
  @ApiPropertyOptional({
    name: 'end',
    description: 'end date',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  end: number;
  @ApiPropertyOptional({
    name: 'offset',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  offset: number;
  @ApiPropertyOptional({
    name: 'limit',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;
}
