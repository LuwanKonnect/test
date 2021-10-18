import {
  Body,
  Query,
  Controller,
  Put,
  Post,
  Delete,
  Get,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException, Param
} from '@nestjs/common';
import {
  ApiResponse,
  ApiQuery,
  ApiTags,
  ApiBody,
  ApiHeader,
  ApiOperation, ApiBearerAuth
} from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../deleted/users/user.decorator';
import { AvailabilityService } from '../availability/availability.service';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Availability } from '../availability/availability.entity';


@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly availabilityService: AvailabilityService,
  ) {}

  /***
   * Save booking
   * @param booking
   * @param timestamp
   * @param id
   */
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Booking details',
    type: Booking,
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('save/:timestamp')
  public save(
    @Body() booking: Booking,
    @Param('timestamp') timestamp: number,
    @AuthUser('id') id: string,
  ): Promise<any> {
    booking.u_id = id;
    console.log(timestamp);
    return this.bookingService.save(booking, timestamp);
  }

  /***
   * Get bookings applied by user
   * @param u_id from token
   */
  @Get('findByUid')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findByUid(@AuthUser('id') u_id: string): Promise<Booking[]> {
    return this.bookingService.findByUid(u_id);
  }

  /***
   * Get all bookings applied for creator
   * @param io_id from token
   */
  @Get('findByOwnerId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings applied for creator' })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findByOwnerId(@AuthUser('id') io_id: string): Promise<Booking[]> {
    return this.bookingService.findByIOid(io_id);
  }

  /***
   * Get all bookings applied for creator which are unsanctioned
   * @param io_id from token
   */
  @Get('findUnsanctionedByOwnerId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all bookings applied for creator which are unsanctioned',
  })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findUnsanctionedByOwnerId(
    @AuthUser('id') io_id: string,
  ): Promise<Booking[]> {
    return this.bookingService.findByUidUnsanctioned(io_id);
  }

  /***
   * Get all bookings applied for creator which are sanctioned
   * @param io_id from token
   */
  @Get('findSanctionedByOwnerId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all bookings applied for creator which are sanctioned',
  })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findSanctionedByOwnerId(
    @AuthUser('id') io_id: string,
  ): Promise<Booking[]> {
    return this.bookingService.findByUidSanctioned(io_id);
  }

  /***
   * Get all bookings applied for creator which are unsanctioned from date value
   * @param io_id from token
   * @param date
   */
  @Get('findUnsanctionedByOwnerIdFrom')
  @ApiQuery({
    name: 'date',
    description: 'specific date',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get all bookings applied for creator which are unsanctioned from date value',
  })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findUnsanctionedByOwnerIdFrom(
    @AuthUser('id') io_id: string,
    @Query('date', ParseIntPipe) date: number,
  ): Promise<Booking[]> {
    return this.bookingService.findByUidUnsanctionedFrom(io_id, date);
  }

  /***
   * Get all bookings applied for creator which are sanctioned from date value
   * @param io_id from token
   * @param date
   */
  @Get('findByOwnerIdSanctioned')
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'date',
    description: 'specific date',
  })
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Get all bookings applied for creator which are sanctioned from date value',
  })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  public findSanctionedByOwnerIdFrom(
    @AuthUser('id') io_id: string,
    @Query('date', ParseIntPipe) date: number,
  ): Promise<Booking[]> {
    return this.bookingService.findByUidSanctionedFrom(io_id, date);
  }
  /***
   * Get bookings by specific Booking ID
   * @param b_id
   */
  @Get('findByBid')
  @ApiQuery({
    name: 'b_id',
    description: 'Booking ID',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get bookings by specific Booking ID',
  })
  @ApiResponse({ status: 200, type: Booking, description: 'success' })
  public findByEid(@Query('b_id') b_id: string): Promise<Booking> {
    return this.bookingService.findOne(Number.parseInt(b_id));
  }

  /***
   * update booking
   * @param io_id
   * @param booking
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiBody({
    description: 'Booking details, must have b_id',
    type: Booking,
  })
  @Put('update')
  async update(
    @AuthUser('id') io_id: string,
    @Body() booking: Partial<Booking>,
  ): Promise<{ code: number; msg: string }> {
    const res = await this.bookingService.findOne(booking.b_id);
    if (!(res.io_id === io_id || res.u_id === io_id)) {
      throw new ForbiddenException('No access');
    }
    return this.bookingService.update(booking);
  }

  /***
   * reject booking
   * @param b_id booking id
   * @param u_id user id
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiQuery({
    name: 'b_id',
    description: 'Booking ID',
  })
  @ApiOperation({
    summary: 'reject bookings by specific Booking ID',
  })
  @Get('reject')
  async reject(
    @Query('b_id') b_id: string,
    @AuthUser('id') u_id: string,
  ): Promise<{ code: number; msg: string }> {
    const res = await this.bookingService.findOne(Number.parseInt(b_id));
    if (res.io_id === u_id) {
      return this.bookingService.update({
        b_id: Number.parseInt(b_id),
        status: 2,
        io_id: u_id,
      });
    } else {
      return {
        code: 403,
        msg: 'failed',
      };
    }
  }

  /***
   * approve booking
   * @param manager
   * @param b_id
   * @param u_id
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'success' })
  @ApiQuery({
    name: 'b_id',
    description: 'Booking ID',
  })
  @ApiOperation({
    summary: 'approve bookings by specific Booking ID',
  })
  @Get('approve')
  @Transaction()
  async approve(
    @Query('b_id') b_id: string,
    @AuthUser('id') u_id: string,
    @TransactionManager() manager: EntityManager,
  ): Promise<{ code: number; msg: string }> {
    console.log(b_id);
    const res = await this.bookingService.findOne(Number.parseInt(b_id));
    if (res.io_id === u_id) {
      // const availabilityResult =
      //   await this.availabilityService.checkAvailability(
      //     res.i_id,
      //     res.year,
      //     res.startDate,
      //     res.endDate,
      //   );
      // if (!availabilityResult) {
      //   throw new BadRequestException('Item is not available already');
      // }
      try {
        const availabilityRes = await manager.findOne(Availability, {
          i_id: res.i_id,
          year: res.year,
        });
        if (
          !/^[1]+$/.test(
            availabilityRes.availability.slice(res.startDate, res.endDate + 1),
          )
        ) {
          throw new BadRequestException('Item is not available already');
        }
        const newAvailability =
          availabilityRes.availability.substring(0, res.startDate) +
          '0'.repeat(res.endDate + 1 - res.startDate) +
          availabilityRes.availability.substring(res.endDate + 1);
        await manager.update(
          Availability,
          {
            i_id: res.i_id,
            year: res.year,
          },
          { availability: newAvailability },
        );
        await manager.update(
          Booking,
          {
            b_id: Number.parseInt(b_id),
            io_id: u_id,
          },
          { status: 3 },
        );
        const results = await this.bookingService.findByRes(res);
        return Promise.all(
          results.map(async (i) => {
            await manager.update(
              Booking,
              {
                b_id: i.b_id,
                io_id: u_id,
              },
              { status: 0 },
            );
          }),
        )
          .then(() => {
            return {
              code: 200,
              msg: 'success',
            };
          })
          .catch((e) => {
            throw new InternalServerErrorException(e);
          });
      } catch (e) {
        throw new InternalServerErrorException(e);
      }
    } else {
      throw new ForbiddenException('You have no access');
    }
  }
  /***
   * Delete booking
   * @param u_id from token
   * @param b_id
   */
  @ApiResponse({ status: 200, description: 'Delete Success' })
  @UseGuards(AuthGuard('jwt'))
  @ApiQuery({
    name: 'b_id',
    description: 'Booking ID',
  })
  @ApiBearerAuth()
  @Delete('delete')
  async delete(
    @AuthUser('id') u_id: string,
    @Query('b_id') b_id: string,
  ): Promise<{ code: number; msg: string }> {
    return this.bookingService.remove(Number.parseInt(b_id), u_id);
  }

  /***
   * Search for specific booking
   * @param keyword
   */
  @ApiQuery({
    name: 'keyword',
    description: 'User input search keyword',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'if no search value, return all' })
  @ApiResponse({ status: 200, type: [Booking], description: 'success' })
  @Get('search')
  public search(@Query('keyword') keyword: string): Promise<Booking[]> {
    return this.bookingService.search(keyword);
  }

  // @Get('test')
  // public test(@Query('keyword') keyword: string) {
  //   return this.bookingService.addTimeout('test', 10000);
  // }
}
