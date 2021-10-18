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
  ApiOperation,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Comments } from './comments.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  /***
   * Save comments
   * @param comments
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Comments details',
    type: Comments,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @Post('save')
  public save(
    @Body() comments: Comments,
    @AuthUser('id') id: string,
  ): Promise<{ code: number; msg: string }> {
    comments.u_id = id;
    return this.commentsService.save(comments);
  }

  /***
   * Get comments posted by user, for future use
   * @param u_id from token
   */
  @Get('findByUid')
  @ApiOperation({
    summary: 'Get comments posted by user, for future use.',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiResponse({ status: 200, type: [Comments], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<Comments[]> {
    return this.commentsService.findByUid(u_id);
  }

  /***
   * update comments, for future use
   * @param comments
   */
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOperation({
    summary: 'update comments, for future use.',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Comments details, c_id is required',
    type: Comments,
  })
  @Put('update')
  async update(
    @Body() comments: Comments,
  ): Promise<{ code: number; msg: string }> {
    return this.commentsService.update(comments);
  }

  /***
   * Delete comments by specific ID, only user can delete, exercise owner can't
   * @param u_id
   * @param c_id
   */
  @ApiOperation({
    summary:
      "Delete comments by specific ID, only user can delete, owner can't",
  })
  @ApiResponse({ status: 203, description: 'Comments not exist' })
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiQuery({
    name: 'c_id',
    description: 'Comment ID',
  })
  @Delete('delete')
  async delete(
    @AuthUser('id') u_id: string,
    @Query('c_id') c_id: string,
  ): Promise<any> {
    return this.commentsService.remove(c_id, u_id);
  }
}
