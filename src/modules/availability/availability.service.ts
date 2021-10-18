import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    private readonly connection: Connection,
  ) {}

  async save(
    i_id: number,
    availability: string,
    year: number,
  ): Promise<Availability> {
    return await this.availabilityRepository.save({ i_id, availability, year });
  }
  checkAvailabilityByRegex(
    availability: string,
    start: number,
    end: number,
  ): boolean {
    if (/^[1]+$/.test(availability.slice(start, end + 1))) {
      return true;
    } else {
      return false;
    }
  }
  async checkAvailability(
    i_id: number,
    year: number,
    start: number,
    end: number,
  ): Promise<boolean> {
    const { availability } = await this.availabilityRepository.findOne({
      i_id,
      year,
    });
    if (/^[1]+$/.test(availability.slice(start, end + 1))) {
      return true;
    } else {
      return false;
    }
  }
  replaceAvailability(
    availability: string,
    start: number,
    end: number,
  ): string {
    console.log('original length', availability.length);
    const res =
      availability.substring(0, start) +
      '0'.repeat(end + 1 - start) +
      availability.substring(end + 1);
    console.log('final length', res.length);
    return res;
  }
  async update(
    i_id: number,
    start: number,
    end: number,
    year: number,
  ): Promise<Availability> {
    return await this.connection.transaction(async (manager) => {
      const result = await manager.findOne(Availability, { i_id, year });
      let { availability } = result;
      if (this.checkAvailabilityByRegex(availability, start, end)) {
        availability = this.replaceAvailability(availability, start, end);
        const res = await manager.update(
          Availability,
          { i_id, year },
          { availability },
        );
        if (res.affected === 1) {
          result.availability = availability;
          return result;
        } else {
          throw new NotFoundException('Not available');
        }
      } else {
        throw new BadRequestException('Not available');
      }
    });
  }
  async findOneByIdAndYear(i_id: number, year: number): Promise<Availability> {
    const res = await this.availabilityRepository.findOne({
      where: {
        i_id,
        year,
      },
    });
    if (res) {
      console.log('123123', res);
      return res;
    } else {
      const availability = '1'.repeat(366 * 2);
      return await this.save(i_id, availability, year);
    }
  }
}
