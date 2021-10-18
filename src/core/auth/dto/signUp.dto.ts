import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Trim } from '../../../common/decorators/transforms.decorator';
import { IsPassword } from '../../../common/decorators/validators.decorator';
import { UserDto } from '../../user/dto';
export class SignUpDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {
  @IsNotEmpty({ message: 'password cannot be empty' })
  @MinLength(8)
  @MaxLength(20)
  @IsPassword()
  @ApiProperty({
    description:
      'Password, length: 8-20, can be symbol, number, character mixed, cannot be pure number or character, like ["abcd1234@", "abcd1234"]',
    example: 'abcd1234@',
  })
  password: string;
}
