import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignInDto, SignUpDto } from './dto';
import { AdminRoleEnum, UserRoleEnum } from '../../common/constants';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IFile } from '../../common/interfaces';
import { ApiFile } from '../../common/decorators/swagger.schema';
import { EmailService } from '../../shared';
import { UtilsProvider } from '../../common/providers';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOperation({ summary: 'for user sign up' })
  @ApiResponse({
    type: LoginPayloadDto,
    status: HttpStatus.CREATED,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'failed, system error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email already in use',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The data format is not right!',
  })
  @ApiFile({ name: 'avatar' })
  @ApiBody({
    description: '',
    type: SignUpDto,
  })
  @Post('signUp')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() file: IFile,
  ): Promise<LoginPayloadDto> {
    console.log(signUpDto);
    // return await this.userService.createUser(signUpDto, file);
    const userEntity = await this.userService.createUser(signUpDto, file);
    if (userEntity) {
      const token = await this.authService.createToken(
        userEntity,
        UserRoleEnum.USER,
      );
      return new LoginPayloadDto(userEntity.toDto(), token);
    }
  }
  @ApiOperation({ summary: 'for user sign in' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginPayloadDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data format error',
  })
  @ApiResponse({
    status: HttpStatus.SERVICE_UNAVAILABLE,
    description: 'User not active',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid username or password',
  })
  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(signInDto);
    const token = await this.authService.createToken(
      userEntity,
      UserRoleEnum.USER,
    );
    return new LoginPayloadDto(userEntity.toDto(), token);
  }
  @ApiOperation({ summary: 'for Admin sign in' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginPayloadDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data format error',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid username or password',
  })
  @Post('adminSignIn')
  async adminSignIn(@Body() signInDto: SignInDto): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateAdmin(signInDto);
    const token = await this.authService.createToken(
      userEntity,
      AdminRoleEnum.ADMIN,
    );
    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Failed, outlook cannot use anymore',
  })
  @Get('getVerificationCode')
  @ApiQuery({
    name: 'email',
    description: 'email',
  })
  async getVerificationCode(@Query('email') email: string): Promise<void> {
    const code = UtilsProvider.generateRandomString(6);
    const emailResult = await this.emailService.mailer(
      email,
      `This is your code: ${code}`,
    );
    if (emailResult === 200) {
      await this.authService.save({ email, code });
    } else {
      throw new InternalServerErrorException();
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: LoginPayloadDto,
    description: 'Success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid username or code',
  })
  @Post('verifyCode')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
  ): Promise<string> {
    return await this.authService.verifyEmailCode(email, code);
  }
}
