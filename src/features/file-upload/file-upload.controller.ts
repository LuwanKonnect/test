import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpStatus,
  UseGuards,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IFile } from '../../common/interfaces';
import { Express } from 'express';
import { JwtAuthGuard } from '../../common/guards';
@ApiTags('FileUpload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiOperation({ summary: 'The key name must be file' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'success' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'failed',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @UseGuards(JwtAuthGuard)
  @Post('uploadToS3')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: IFile) {
    return this.fileUploadService.upload(file, 'other');
  }

  @Post('uploadManyToS3')
  @UseInterceptors(FilesInterceptor('files', 9))
  async uploadManyToS3(@UploadedFiles() files: Array<Express.Multer.File>) {
    return Promise.all(
      files.map(async (file) => {
        return this.fileUploadService.upload(file, 'items');
      }),
    );
  }

  // @ApiOperation({ summary: 'The key name must be file' })
  // @ApiResponse({ status: HttpStatus.CREATED, description: 'success' })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: 'failed',
  // })
  // @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @Post('uploadOneToServer')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadToServer(@UploadedFile() file: Express.Multer.File) {
  //   if (file) {
  //     return file.path;
  //   } else {
  //     throw new BadRequestException('file name error or format error');
  //   }
  // }

  // @Post('uploadManyToServer')
  // @UseInterceptors(FileInterceptor('files'))
  // async uploadManyToServer(@UploadedFile() files: Array<Express.Multer.File>) {
  //   return files;
  // }

  @ApiOperation({ summary: 'Get file from s3' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'failed, the key not exist',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  // @UseGuards(JwtAuthGuard)
  @Get('getFile')
  async getFile(@Query('key') key: string, @Res() res: Response) {
    const file = await this.fileUploadService.getFile(key);
    file.pipe(res);
  }
  @ApiOperation({ summary: 'The key name must be file' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'failed, the key not exist',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async deleteFile(@Query('key') key: string) {
    return await this.fileUploadService.deleteFile(key);
  }
}
