import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDTO, User, userResponseDTO } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from './user.decorator';

@ApiTags('User')
@Controller('user')
export class UsersController {
  //if want use inject,users module also need be change
  // @Inject('usersService')
  // private readonly usersService;
  // @Inject('authService')
  // private readonly authService;
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // /***
  //  * For Test
  //  */
  // @ApiOperation({ summary: 'this is just test, ignore it.' })
  // @Get('test')
  // @ApiParam({
  //   name: 'id',
  //   description: 'this is id',
  // })
  // @ApiQuery({
  //   name: 'role',
  //   description: 'parameter in query',
  // })
  // @ApiHeader({
  //   name: 'authorization',
  //   required: true,
  //   description: 'need token',
  // })
  // test(): string {
  //   return this.usersService.test();
  // }

  /***
   * User Register
   * @param user
   */
  @ApiResponse({ type: userResponseDTO, status: 201, description: 'success' })
  @Post('register')
  @ApiBody({
    description: 'the u_id is not required',
    type: User,
  })
  async register(@Body() user: User): Promise<{ code: number; msg: string }> {
    const registerResult = await this.usersService.register(user);
    if (registerResult.code === 200) {
      return this.authService.certificate(user);
    }
    return registerResult;
  }

  /***
   * User login
   * @param loginParmas
   */
  @ApiResponse({ status: 201, type: userResponseDTO, description: 'success' })
  @Post('login')
  @ApiBody({
    description: 'User login',
    type: LoginDTO,
  })
  async login(@Body() loginParmas: any) {
    console.log('JWT identity - Step 1: apply login');
    const authResult = await this.authService.validateUser(
      loginParmas.email,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `Invalid email or password!`,
        };
      default:
        return {
          code: 600,
          msg: `The user is not exist!`,
        };
    }
  }

  /***
   * update user information, include password
   * @param user
   */
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'please check res.data.code, 200 is successful',
  })
  @ApiBody({
    description: 'all user detail that need update',
    type: User,
  })
  @Put('update')
  async update(@Body() user: User, @AuthUser('u_id') u_id: string) {
    return this.usersService.update(user, u_id);
  }

  /***
   * find all user for trainer side
   */
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('findAll')
  public findAll() {
    return this.usersService.findAll();
  }

  /***
   * check email whether exist
   * @param email
   */
  @ApiResponse({ status: 203, description: 'email exist' })
  @ApiResponse({ status: 200, description: 'Not exist' })
  @Get('checkEmail')
  @ApiQuery({
    name: 'email',
    description: 'email',
  })
  async checkEmail(
    @Query('email') email: string,
  ): Promise<{ code: number; msg: string }> {
    const result = await this.usersService.findOne(email);
    if (result) {
      return {
        code: 203,
        msg: 'Exist',
      };
    }
    return {
      code: 200,
      msg: 'Not Exist',
    };
  }
}
