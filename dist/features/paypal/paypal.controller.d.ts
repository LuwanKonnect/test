import { ApiConfigService, HttpRequestService } from '../../shared';
import { PaypalService } from './paypal.service';
import { PaypalEntity } from './paypal.entity';
export declare class PaypalController {
    private readonly apiConfigService;
    private readonly httpRequestService;
    private readonly paypalService;
    private paypalConfig;
    constructor(apiConfigService: ApiConfigService, httpRequestService: HttpRequestService, paypalService: PaypalService);
    createPayment(amount: number): Promise<{
        id: string;
    }>;
    executePayment(amount: number, paymentId: string, id: string): Promise<string>;
    save(payerId: string, u_id: string): Promise<PaypalEntity>;
}
