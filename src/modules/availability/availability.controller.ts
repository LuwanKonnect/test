import {
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Availability } from './availability.entity';
import { Items } from '../items/items.entity';
@ApiTags('Availability')
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}
  /***
   * Get items' availability
   * @param i_id
   * @param year
   */
  @Get('findOneByIdAndYear')
  // @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Items], description: 'success' })
  public findOneByIdAndYear(
    @Query(
      'i_id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    i_id: number,
    @Query(
      'year',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    year: number,
  ): Promise<Availability> {
    return this.availabilityService.findOneByIdAndYear(i_id, year);
  }

  @Patch('temperaUpdate')
  async temperaUpdate(
    @Body('i_id', ParseIntPipe) i_id: number,
    @Body('year', ParseIntPipe) year: number,
    @Body('start', ParseIntPipe) start: number,
    @Body('end', ParseIntPipe) end: number,
  ) {
    return this.availabilityService.update(i_id, start, end, year);
  }
}
