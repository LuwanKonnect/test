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


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor() {}
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
  @UseInterceptors(FileInterceptor('avatar'))
  @Put('update')
  async update(
    @UploadedFile() file: IFile,
    @Body() user: UpdateDto,
    @AuthUser('id') id: string,
  ) {
    console.log(user);
  }
}
