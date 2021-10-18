import { ConfigService } from '@nestjs/config';
export default class PhoneVerificationService {
    private readonly configService;
    private twilioClient;
    constructor(configService: ConfigService);
    private phoneVerificationRepository;
    private usersRepository;
    create(allowLogin: any, countryCode: any, id: any, phoneNumber: any, userId: any): Promise<{
        allowLogin: any;
        countryCode: any;
        id: any;
        phoneNumber: any;
        status: any;
        userId: any;
    }>;
    resend(id: any): Promise<{
        allowLogin: any;
        countryCode: any;
        id: any;
        phoneNumber: any;
        status: any;
        userId: any;
    }>;
    verifyCode(id: any, verificationCode: any): Promise<{
        allowLogin: any;
        countryCode: any;
        id: any;
        phoneNumber: any;
        status: any;
        userId: any;
    }>;
}
