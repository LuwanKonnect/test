import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaypalEntity } from './paypal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaypalService {
  constructor(
    @InjectRepository(PaypalEntity)
    private paypalRepository: Repository<PaypalEntity>,
  ) {}
  async save(paypal: PaypalEntity): Promise<PaypalEntity> {
    return await this.paypalRepository.save(paypal);
  }
  async getPayerIdByUid(u_id: string): Promise<string> {
    const res = await this.paypalRepository.findOne({ u_id });
    return res.payerId;
  }
}
