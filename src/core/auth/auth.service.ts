import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor() {}

  // // JWT identity - Step 3: generate jwt token
  // async certificate(
  //   user: UserResponseDto,
  //   role: UserRoleEnum,
  // ): Promise<SignInResponseDto> {
  //   const payload = {
  //     email: user.email,
  //     id: user.id,
  //     role,
  //   };
  //   const token = await this.jwtService.sign(payload);
  //   return { token, user };
  // }
}
