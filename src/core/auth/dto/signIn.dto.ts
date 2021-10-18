import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty({ message: 'password cannot be empty' })
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'abcd1234@',
    description: 'Password, length: 8-20',
  })
  password: string;

  @ApiProperty({
    example: 'tester1@gmail.com',
    description: 'Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'the value must be a string' })
  email: string;
}
