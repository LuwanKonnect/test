import { ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDto {
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  code: string;
}
