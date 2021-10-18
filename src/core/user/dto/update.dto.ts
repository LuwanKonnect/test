import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { IsPassword } from '../../../common/decorators/validators.decorator';
export class UpdateDto extends PartialType(
  OmitType(UserDto, ['id', 'createdAt', 'updatedAt'] as const),
) {
  @MinLength(8)
  @MaxLength(20)
  @IsPassword()
  @IsOptional()
  @ApiProperty({
    description:
      'Password, length: 8-20, can be symbol, number, character mixed, cannot be pure number or character, like ["abcd1234@", "abcd1234"]',
    example: 'abcd1234@',
  })
  password: string;
}
