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
import { LenderRatingService } from './lender-rating.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LenderRating } from './lender-rating.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';
@ApiTags('lenderRating')
@Controller('lenderRating')
export class LenderRatingController {
  constructor(private readonly lenderRatingService: LenderRatingService) {}

  /***
   * Save lenderRating
   * @param lenderRating
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'LenderRating details',
    type: LenderRating,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @Post('save')
  async save(
    @Body() lenderRating: LenderRating,
    @AuthUser('id') id: string,
  ): Promise<any> {
    lenderRating.b_id = id;
    try {
      await this.lenderRatingService.save(lenderRating);
      return this.lenderRatingService.updateScore(lenderRating.l_id);
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  /***
   * Get lenderRatings by user id, user is lender
   * @param u_id
   */
  @Get('findByUid')
  @UseGuards(AuthGuard('jwt'))
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @ApiOperation({ summary: 'user is lender, get all rating' })
  @ApiResponse({ status: 200, type: [LenderRating], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<LenderRating[]> {
    return this.lenderRatingService.findByBid(u_id);
  }

  /***
   * Get lenderRatings by booking id
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
  @ApiResponse({ status: 200, type: [LenderRating], description: 'success' })
  public findByBookingId(@Query('b_id') b_id: string): Promise<LenderRating> {
    return this.lenderRatingService.findByBookingId(Number.parseInt(b_id));
  }

  /***
   * update lenderRating
   * @param lenderRating
   */
  @ApiHeader({
    name: 'authorization',
    required: true,
    description: 'need token',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'LenderRating details, must have r_id',
    type: LenderRating,
  })
  @Put('update')
  async update(
    @Body() lenderRating: LenderRating,
  ): Promise<{ code: number; msg: string }> {
    return this.lenderRatingService.update(lenderRating);
  }

  /***
   * Delete lenderRating
   * @param u_id
   * @param r_id
   */
  @ApiResponse({ status: 203, description: 'LenderRating not exist' })
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'r_id',
    description: 'LenderRating ID',
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
  ): Promise<any> {
    return this.lenderRatingService.remove(Number.parseInt(r_id), u_id);
  }
}
