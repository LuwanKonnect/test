import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Connection, Between, Like, MoreThan, Not } from 'typeorm';
import { Items } from '../items/items.entity';
import { Cron, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { UtilsProvider } from '../../common/providers';

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private bookingRepository;

  constructor(
    private connection: Connection,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  findOne(b_id: number): Promise<Booking> {
    return this.bookingRepository.findOne({ where: { b_id } });
  }
  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }
  findByUid(u_id: string): Promise<Booking[]> {
    const date = new Date();
    const index = UtilsProvider.getDays(
      date.getFullYear(),
      date.getMonth() + 1,
      1,
    );
    return this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect(Items, 'items', 'items.i_id = booking.i_id')
      .select(['booking.*', 'items.title', 'items.pictures'])
      .where(
        'booking.u_id = :u_id and booking.end_date >= :index and year >= :year',
        { u_id, index, year: date.getFullYear() },
      )
      .orderBy('created', 'ASC')
      .getRawMany();
  }
  async findByIOid(io_id: string): Promise<Booking[]> {
    const date = new Date();
    const index = UtilsProvider.getDays(
      date.getFullYear(),
      date.getMonth() + 1,
      1,
    );
    return await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect(Items, 'items', 'items.i_id = booking.i_id')
      .select(['booking.*', 'items.title', 'items.pictures'])
      .where(
        'booking.io_id = :io_id and booking.end_date >= :index and year >= :year',
        { io_id, index, year: date.getFullYear() },
      )
      .orderBy('created', 'ASC')
      .getRawMany();
  }
  findByIid(i_id: number): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { i_id } });
  }
  findByRes(booking: Booking): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: [
        {
          b_id: Not(booking.b_id),
          i_id: booking.i_id,
          status: 1,
          year: booking.year,
          error: 0,
          startDate: Between(booking.startDate, booking.endDate),
        },
        {
          b_id: Not(booking.b_id),
          i_id: booking.i_id,
          status: 1,
          year: booking.year,
          error: 0,
          endDate: Between(booking.startDate, booking.endDate),
        },
      ],
    });
  }
  findByUidUnsanctioned(u_id: string): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { u_id, status: 1 } });
  }
  findByUidSanctioned(u_id: string): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { u_id, status: 3 } });
  }
  findByUidFrom(u_id: string, date: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { u_id, startDate: MoreThan(date) },
    });
  }
  findByUidUnsanctionedFrom(u_id: string, date: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { u_id, status: 1, startDate: MoreThan(date) },
    });
  }
  findByUidSanctionedFrom(u_id: string, date: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { u_id, status: 3, startDate: MoreThan(date) },
    });
  }
  async update(
    booking: Partial<Booking>,
  ): Promise<{ code: number; msg: string }> {
    try {
      const res = await this.bookingRepository.update(
        { b_id: booking.b_id },
        booking,
      );
      if (res.affected === 1) {
        return {
          code: 200,
          msg: 'Success',
        };
      } else {
        return {
          code: 403,
          msg: 'failed',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async remove(b_id: number, u_id: string): Promise<any> {
    return await this.bookingRepository.delete({ b_id, u_id });
  }
  async save(booking: Booking, timestamp: number): Promise<any> {
    const res = await this.bookingRepository.save(booking);
    const time =
      Date.now() + 86400000 > timestamp ? timestamp - Date.now() : 86400000;
    // this.handleCron(res.id);
    this.addTimeout(res.b_id, time);
    return res;
  }
  // @Cron('* * 1 * * *')
  // async handleCron(id) {
  //   const res = await this.findOne(id);
  //   if (res.status === 1) {
  //     this.bookingRepository.update({ b_id: res.b_id }, { status: 0 });
  //   }
  // }
  addTimeout(id: number, milliseconds: number) {
    const callback = async () => {
      console.log('123');
      const booking = await this.findOne(id);
      if (booking.status === 1) {
        booking.status = 0;
        this.bookingRepository.save(booking);
      }
    };

    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(id + '', timeout);
  }
  async search(keyword: string): Promise<Booking[]> {
    if (!keyword) {
      return await this.bookingRepository.find();
    }
    keyword = '%' + keyword + '%';
    return await this.bookingRepository.find({
      title: Like(keyword),
    });
  }
}
