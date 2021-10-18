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
  ApiOperation, ApiBearerAuth
} from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';
import { SearchConditionsDto } from './dto/search-conditions.dto';
import { AvailabilityService } from '../availability/availability.service';
import { LikedService } from '../liked/liked.service';
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
    private readonly availabilityService: AvailabilityService,
    private readonly likedService: LikedService,
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
  ): Promise<any> {
    items.u_id = id;
    return Promise.all(
      files.map(async (file) => {
        return this.fileUploadService.upload(file, 'items');
      }),
    )
      .then((res) => {
        items.pictures = res.toString();
        return items;
      })
      .then((res) => {
        return this.itemsService.save(items);
      });
  }

  /***
   * Get items created by user
   * @param u_id
   */
  @Get('findByUid')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Items], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<Items[]> {
    return this.itemsService.findByUid(u_id);
  }
  /***
   * Get same owner available items created by user
   * @param sameOwnerDto: SameOwnerDto
   */
  @Get('findSameOwnerItem')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get same owner available items created by user',
  })
  @ApiResponse({ status: 200, type: [Items], description: 'success' })
  async findSameOwnerItem(
    @Query() sameOwnerDto: SameOwnerDto,
  ): Promise<Items[]> {
    const res = await this.itemsService.findByUidNotIid(
      sameOwnerDto.u_id,
      sameOwnerDto.i_id,
    );
    return res.filter(
      async (item) =>
        await this.availabilityService.checkAvailability(
          sameOwnerDto.i_id,
          sameOwnerDto.year,
          sameOwnerDto.start,
          sameOwnerDto.end,
        ),
    );
  }

  /***
   * Get items by specific Items ID
   * @param i_id
   * @param u_id
   */
  @Get('findByIid')
  @ApiQuery({
    name: 'i_id',
    description: 'Items ID',
  })
  @ApiQuery({
    name: 'u_id',
    description: 'User ID',
  })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiHeader({
  //   name: 'authorization',
  //   required: true,
  //   description: 'need token',
  // })
  @ApiResponse({ status: 200, description: 'success' })
  async findByIid(
    @Query('i_id') i_id: string,
    @Query('u_id') u_id: string,
  ): Promise<{ item: Items; yearAvailability: string; liked: boolean }> {
    const year = new Date().getFullYear();
    const availability = await this.availabilityService.findOneByIdAndYear(
      Number.parseInt(i_id),
      year,
    );
    let liked = false;
    if (u_id) {
      const LikedResult = await this.likedService.findByUidAndIid(u_id, i_id);
      if (LikedResult.length === 1) {
        liked = true;
      }
    }
    const item = await this.itemsService.findOne(Number.parseInt(i_id));
    return { item, yearAvailability: availability?.availability, liked };
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
  ): Promise<any> {
    const { deletedImages, newImages, ...restDto } = items;
    const item = await this.itemsService.findOne(items.i_id);
    let originalList = item.pictures.split(',');
    if (deletedImages) {
      const deletedImageList = deletedImages.split(',');
      originalList = await this.fileUploadService.updateFileByDelete(
        deletedImageList,
        originalList,
      );
    }
    if (files && files.length > 0) {
      originalList = await this.fileUploadService.updateImageByAdd(
        files,
        originalList,
        'item',
      );
    }
    restDto.pictures = originalList.toString();
    return this.itemsService.update(restDto);
  }

  /***
   * Delete items
   * @param u_id
   * @param i_id
   */
  @ApiResponse({ status: 203, description: 'Items not exist' })
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'i_id',
    description: 'Items ID',
  })
  @ApiBearerAuth()
  @Delete('delete')
  async delete(
    @AuthUser('id') u_id: string,
    @Query('i_id') i_id: string,
  ): Promise<any> {
    return this.itemsService.remove(Number.parseInt(i_id), u_id);
  }

  /***
   * Search for specific items
   * @param searchConditionsDto
   */
  @ApiQuery({
    name: 'keyword',
    description: 'User input search keyword',
    type: SearchConditionsDto,
  })
  @ApiResponse({ status: 200, type: [Items], description: 'success' })
  @ApiOperation({ summary: 'if no search value, return all' })
  @Get('search')
  public search(
    @Query() searchConditionsDto: SearchConditionsDto,
  ): Promise<Items[]> {
    return this.itemsService.search(searchConditionsDto);
  }
}
