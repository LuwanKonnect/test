import PhoneVerificationService from './phone-verification.service';
export default class PhoneVerificationController {
    private readonly phoneVerificationService;
    constructor(phoneVerificationService: PhoneVerificationService);
    create(params: {
        allowLogin: boolean;
        countryCode: string;
        id: string;
        phoneNumber: string;
        userId: string;
    }): Promise<any>;
    resend(params: {
        id: string;
    }): Promise<any>;
    verifyCode(params: {
        id: string;
        verificationCode: string;
    }): Promise<any>;
}
