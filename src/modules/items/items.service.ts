import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from './items.entity';
import { Brackets, Connection, Like, Not } from 'typeorm';
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
  async save(items: CreateItemDto): Promise<any> {
    return await this.itemsRepository.save(items);
  }
}
