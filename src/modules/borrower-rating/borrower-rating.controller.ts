import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BorrowerRatingService } from './borrower-rating.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowerRating } from './borrower-rating.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';
@ApiTags('borrowerRating')
@Controller('borrowerRating')
export class BorrowerRatingController {
  constructor(private readonly borrowerRatingService: BorrowerRatingService) {}

  /***
   * Save borrowerRating
   * @param borrowerRating
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'BorrowerRating details',
    type: BorrowerRating,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @Post('save')
  async save(
    @Body() borrowerRating: BorrowerRating,
    @AuthUser('id') id: string,
  ): Promise<any> {
    borrowerRating.l_id = id;
    try {
      await this.borrowerRatingService.save(borrowerRating);
      return this.borrowerRatingService.updateScore(borrowerRating.b_id);
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  /***
   * Get borrowerRatings by user id, user is borrower
   * @param u_id
   */
  @Get('findByUid')
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOperation({ summary: 'user is borrower, get all rating' })
  @ApiResponse({ status: 200, type: [BorrowerRating], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<BorrowerRating[]> {
    return this.borrowerRatingService.findByBid(u_id);
  }

  /***
   * Get borrowerRatings by booking id
   * @param b_id
   */
  @Get('findByBookingId')
  @ApiQuery({
    name: 'b_id',
    description: 'Booking ID',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOperation({ summary: 'find by booking id' })
  @ApiResponse({ status: 200, type: [BorrowerRating], description: 'success' })
  public findByBookingId(@Query('b_id') b_id: string): Promise<BorrowerRating> {
    return this.borrowerRatingService.findByBookingId(Number.parseInt(b_id));
  }

  /***
   * update borrowerRating
   * @param borrowerRating
   */
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'BorrowerRating details, must have r_id',
    type: BorrowerRating,
  })
  @Put('update')
  async update(
    @Body() borrowerRating: BorrowerRating,
  ): Promise<{ code: number; msg: string }> {
    return this.borrowerRatingService.update(borrowerRating);
  }

  /***
   * Delete borrowerRating
   * @param u_id
   * @param r_id
   */
  @ApiResponse({ status: 500, description: 'delete failed' })
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'r_id',
    description: 'BorrowerRating ID',
  })
  @ApiQuery({
    name: 'u_id',
    description: 'User ID',
  })
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOperation({ summary: 'lender delete comments' })
  @Delete('delete')
  async delete(
    @AuthUser('id') u_id: string,
    @Query('r_id') r_id: string,
  ): Promise<{ code: number; msg: string }> {
    return this.borrowerRatingService.remove(Number.parseInt(r_id), u_id);
  }
}
