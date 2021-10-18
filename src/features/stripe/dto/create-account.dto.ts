import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  bsb;
  @ApiProperty()
  @IsString()
  accountNumber;
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  day;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  month;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  year;
  @ApiProperty()
  @IsString()
  city;
  @ApiProperty()
  @IsString()
  country;
  @ApiProperty()
  @IsString()
  line1;
  @ApiProperty()
  @IsString()
  postal_code;
  @ApiProperty()
  @IsString()
  state;
}
