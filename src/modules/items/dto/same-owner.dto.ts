import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SameOwnerDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  i_id: number;
  @ApiProperty()
  @IsString()
  u_id: string;
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  start: number;
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  end: number;
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  year: number;
}
