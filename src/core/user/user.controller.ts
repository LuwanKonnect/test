import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Put,
  Query, UploadedFile,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from '../auth/dto';
import { AuthUser } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';
import {
  ApiBearerAuth, ApiBody, ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UpdateDto } from './dto/update.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiFile } from '../../common/decorators/swagger.schema';
import { IFile } from '../../common/interfaces';
import { UtilsProvider } from '../../common/providers';
import { FileUploadService } from '../../features/file-upload/file-upload.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  @ApiOperation({ summary: 'update one user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'failed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden resource - no access',
  })
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateDto,
  })
  // @UseGuards(JwtAuthGuard)
  @ApiFile({ name: 'avatar' })
  // @UseInterceptors(FileInterceptor('avatar'))
  @Put('update')
  async update(
    @UploadedFile() file: IFile,
    @Body() user: UpdateDto,
    @AuthUser('id') id: string,
  ): Promise<any> {
    console.log(user);
    if (file) {
      if (!UtilsProvider.isImage(file.mimetype)) {
        throw new BadRequestException('Only accept image');
      }
      user.avatar = await this.fileUploadService.upload(file, 'user');
    }
    const res = await this.userService.update({ id }, user);
    if (res.affected === 0) {
      throw new NotFoundException('Invalid user id');
    }
  }

  constructor(
    private readonly userService: UserService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  @Get('me')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'success',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseDto, description: 'Current user info' })
  async getCurrentUser(@AuthUser('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOneById(id);
  }

  @Get('getOneUser')
  @ApiOperation({ summary: 'Get user info by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
    description: 'success',
  })
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Get user info by id' })
  async getOneUser(@Query('id') id: string): Promise<any> {
    return await this.userService.findNormalDetailById(id);
  }

  @ApiOperation({ summary: 'Check email, username, mobile whether exist.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Exist' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Not Exist' })
  @Get('checkExist')
  @ApiQuery({
    required: false,
    name: 'email',
    description: 'email',
  })
  @ApiQuery({
    required: false,
    name: 'username',
    description: 'username',
  })
  @ApiQuery({
    required: false,
    name: 'mobile',
    description: 'mobile',
  })
  async checkExist(
    @Query()
    options: Partial<{ username: string; email: string; mobile: string }>,
  ): Promise<string> {
    const result = await this.userService.findByUsernameOrEmailOrMobile(
      options,
    );
    if (result) {
      return 'Exist';
    } else {
      throw new HttpException('Not Exist', HttpStatus.NO_CONTENT);
    }
  }
}
