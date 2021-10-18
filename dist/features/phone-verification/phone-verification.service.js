"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = require("twilio");
const phone_verification_entity_1 = require("./phone-verification.entity");
const user_entity_1 = require("../../core/user/user.entity");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const publicFields = (phoneVerificationEntity) => ({
    allowLogin: phoneVerificationEntity.allow_login,
    countryCode: phoneVerificationEntity.country_code,
    id: phoneVerificationEntity.id,
    phoneNumber: phoneVerificationEntity.phone_number,
    status: phoneVerificationEntity.status,
    userId: phoneVerificationEntity.user_id,
});
let PhoneVerificationService = class PhoneVerificationService {
    constructor(configService) {
        this.configService = configService;
        const accountSid = configService.get('TWILIO_ACCOUNT_SID');
        const authToken = configService.get('TWILIO_AUTH_TOKEN');
        this.twilioClient = new twilio_1.Twilio(accountSid, authToken);
    }
    async create(allowLogin, countryCode, id, phoneNumber, userId) {
        phoneNumber = phoneNumber.replace(/[\s-()]/g, '');
        phoneNumber = phoneNumber.replace(/^0/, '');
        phoneNumber = phoneNumber.replace(new RegExp('^\\' + countryCode), '');
        const fullPhoneNumber = `${countryCode || ''}${phoneNumber}`;
        const verificationData = {
            id,
            allow_login: allowLogin,
            country_code: countryCode,
            phone_number: fullPhoneNumber,
            status: undefined,
            user_id: userId,
            verification_code: Math.random().toString().slice(-6),
        };
        const userWithNumber = await this.usersRepository.findOne({
            phone_number: verificationData.phone_number,
        });
        if (userWithNumber) {
            if (allowLogin ||
                verificationData.user_id.toString() === userWithNumber.u_id.toString()) {
                verificationData.status = 'login-request';
                verificationData.user_id = userWithNumber.u_id;
            }
            else {
                verificationData.status = 'duplicate-number-error';
                const record = await this.phoneVerificationRepository.save(verificationData);
                return publicFields(record);
            }
        }
        else {
            verificationData.status = 'awaiting-verification';
        }
        try {
            const twilioResponse = await this.twilioClient.messages.create({
                body: `Your verification code for Steppen is ${verificationData.verification_code}`,
                from: `+${process.env.TWILIO_FROM_NUMBER}`,
                to: verificationData.phone_number,
            });
            console.log(`Twilio response: ${JSON.stringify(twilioResponse)}`);
        }
        catch (e) {
            console.warn(`Twilio error: ${JSON.stringify(e)}`);
            verificationData.status = 'verification-start-error';
        }
        const record = await this.phoneVerificationRepository.save(verificationData);
        return publicFields(record);
    }
    async resend(id) {
        const record = await this.phoneVerificationRepository.findOne(id);
        return this.create(record.allow_login, record.country_code, record.id, record.phone_number, record.user_id);
    }
    async verifyCode(id, verificationCode) {
        const record = await this.phoneVerificationRepository.findOne(id);
        if (record.verification_code !== verificationCode) {
            record.status = 'code-match-error';
        }
        else {
            if (!!record.user_id) {
                if (record.allow_login) {
                    record.status = 'login-verified';
                }
                else {
                    record.status = 'transition-verified';
                    await this.usersRepository.save({
                        u_id: record.user_id,
                        phone_number: record.phone_number,
                        phone_number_country_code: record.country_code,
                    });
                }
            }
            else {
                const userWithNumber = await this.usersRepository.findOne({
                    phone_number: record.phone_number,
                });
                if (userWithNumber) {
                    record.status = 'weird-login-verified';
                    record.user_id = userWithNumber.u_id;
                }
                else {
                    record.status = 'signup-requested';
                }
            }
        }
        await this.phoneVerificationRepository.save(record);
        return publicFields(record);
    }
};
__decorate([
    typeorm_1.InjectRepository(phone_verification_entity_1.default),
    __metadata("design:type", Object)
], PhoneVerificationService.prototype, "phoneVerificationRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(user_entity_1.UserEntity),
    __metadata("design:type", Object)
], PhoneVerificationService.prototype, "usersRepository", void 0);
PhoneVerificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PhoneVerificationService);
exports.default = PhoneVerificationService;
//# sourceMappingURL=phone-verification.service.js.map