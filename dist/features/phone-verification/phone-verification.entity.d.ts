export default class PhoneVerificationEntity {
    id: string;
    phone_number: string;
    country_code: string;
    verification_code: string;
    status: string;
    user_id: string;
    allow_login: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
