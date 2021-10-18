import {
  Body,
  Query,
  Controller,
  Put,
  Post,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';
import { LikedService } from './liked.service';
import { Liked } from './liked.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';

@ApiTags('Liked')
@Controller('liked')
export class LikedController {
  constructor(private readonly likedService: LikedService) {}

  /***
   * Save liked
   * @param liked
   * @param id
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Liked details',
    type: Liked,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @Post('save')
  public save(@Body() liked: Liked, @AuthUser('id') id: string): Promise<any> {
    liked.u_id = id;
    return this.likedService.save(liked);
  }

  /***
   * Get likeds created by user
   * @param u_id
   */
  @Get('findByUid')
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiResponse({ status: 200, type: [Liked], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<Liked[]> {
    return this.likedService.findByUid(u_id);
  }

  /***
   * Get likeds by specific Liked ID
   * @param l_id
   */
  @Get('findByLid')
  @ApiQuery({
    name: 'l_id',
    description: 'Liked ID',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiResponse({ status: 200, type: Liked, description: 'success' })
  public findByLid(@Query('l_id') l_id: string): Promise<Liked> {
    return this.likedService.findOne(l_id);
  }

  /***
   * Delete liked by specific liked ID
   * @param u_id from token
   * @param i_id
   */
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiQuery({
    name: 'i_id',
    description: 'Item ID',
  })
  @Delete('delete')
  async delete(
    @AuthUser('id') u_id: string,
    @Query('i_id') i_id: string,
  ): Promise<any> {
    return this.likedService.removeByIid(i_id, u_id);
  }
}
