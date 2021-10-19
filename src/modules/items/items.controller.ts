import {
  Body,
  Query,
  Controller,
  Put,
  Post,
  Delete,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../common/decorators';
import { SearchConditionsDto } from './dto';
import { SameOwnerDto } from './dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileUploadService } from '../../features/file-upload/file-upload.service';
import { JoinTable } from 'typeorm';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  /***
   * Save items
   * @param items
   * @param id
   * @param files
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Items details',
    type: Items,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('save')
  @UseInterceptors(FilesInterceptor('files', 9))
  public save(
    @Body() items: Items,
    @AuthUser('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) { 
    console.log(items);
  }

  /***
   * update items
   * @param items
   * @param files
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Items details',
    type: UpdateItemDto,
  })
  @UseInterceptors(FilesInterceptor('newImages', 9))
  @Put('update')
  async update(
    @Body() items: UpdateItemDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(items);
  }
}
