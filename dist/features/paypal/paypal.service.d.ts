import { PaypalEntity } from './paypal.entity';
import { Repository } from 'typeorm';
export declare class PaypalService {
    private paypalRepository;
    constructor(paypalRepository: Repository<PaypalEntity>);
    save(paypal: PaypalEntity): Promise<PaypalEntity>;
    getPayerIdByUid(u_id: string): Promise<string>;
}
