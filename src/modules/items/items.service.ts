import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './items.entity';
import { Brackets, Connection, Like, Not } from 'typeorm';
import { SearchConditionsDto } from './dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  @InjectRepository(Items)
  private itemsRepository;
  constructor(private connection: Connection) {}

  findOne(i_id: number): Promise<Items> {
    return this.itemsRepository.findOne({ where: { i_id } });
  }
  findAll(): Promise<Items[]> {
    return this.itemsRepository.find();
  }
  findByUid(u_id: string): Promise<Items[]> {
    return this.itemsRepository.find({ where: { u_id } });
  }
  findByUidNotIid(u_id: string, i_id: number): Promise<Items[]> {
    return this.itemsRepository.find({ where: { u_id, i_id: Not(i_id) } });
  }
  async update(items: Partial<Items>): Promise<{ code: number; msg: string }> {
    const item = await this.itemsRepository.preload({ ...items });
    return await this.itemsRepository.save(item);
  }
  async search(searchConditionsDto: SearchConditionsDto): Promise<Items[]> {
    const {
      keyword,
      distance,
      category,
      minPrice,
      maxPrice,
      rating,
      delivery,
      start,
      end,
      offset,
      limit,
      lat,
      lng,
    } = searchConditionsDto;
    const queryBuilder = this.itemsRepository.createQueryBuilder('item');
    if (keyword) {
      // queryBuilder.andWhere(
      //   `item.title like :keyword or item.description like :keyword`,
      //   { keyword: `%${keyword}%` },
      // );
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('item.title like :keyword', {
            keyword: `%${keyword}%`,
          }).orWhere('item.description like :keyword', {
            keyword: `%${keyword}%`,
          });
        }),
      );
    }
    if (category) {
      queryBuilder.andWhere(`item.category = :category`, { category });
    }
    if (rating) {
      queryBuilder.andWhere(`item.rating >= :rating`, { rating });
    }
    if (minPrice) {
      queryBuilder.andWhere(`item.price >= :minPrice`, { minPrice });
    }
    if (maxPrice) {
      queryBuilder.andWhere(`item.price <= :maxPrice`, { maxPrice });
    }
    if (delivery || delivery === 0) {
      if (delivery > 0) {
        queryBuilder.andWhere(`item.delivery_price > 0`);
      } else {
        queryBuilder.andWhere(`item.delivery_price = 0`);
      }
    }
    if (distance) {
      queryBuilder.select(`(3959 * acos(cos(radians(:lat)) * cos(radians(item.lat)) * 
   cos(radians(item.lng) - radians(:lng)) + 
   sin(radians(:lat)) * sin(radians(item.lat )))) as distance`);
      // queryBuilder.select(`(st_distance (point (lng, lat),point(:lng,:lat) ) *111195) AS distance`);
      queryBuilder.having(`distance < :distance`, { lat, lng, distance });
    }
    queryBuilder.skip(offset).take(limit);
    queryBuilder.orderBy({ created: 'DESC' });
    console.log(queryBuilder);
    return await queryBuilder.getManyAndCount();
    // return await queryBuilder.getRawMany();
    // console.log(res);
  }
  async remove(i_id: number, u_id: string): Promise<any> {
    return this.itemsRepository.delete({ i_id, u_id });
  }
  async save(items: CreateItemDto): Promise<any> {
    return await this.itemsRepository.save(items);
  }
}
