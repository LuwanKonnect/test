import { Twilio } from 'twilio';

import PhoneVerificationEntity from './phone-verification.entity';
import { UserEntity } from '../../core/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

const publicFields = (phoneVerificationEntity) => ({
  allowLogin: phoneVerificationEntity.allow_login,
  countryCode: phoneVerificationEntity.country_code,
  id: phoneVerificationEntity.id,
  phoneNumber: phoneVerificationEntity.phone_number,
  status: phoneVerificationEntity.status,
  userId: phoneVerificationEntity.user_id,
});

@Injectable()
export default class PhoneVerificationService {
  private twilioClient: Twilio;
  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  @InjectRepository(PhoneVerificationEntity)
  private phoneVerificationRepository;

  @InjectRepository(UserEntity)
  private usersRepository;

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
      if (
        allowLogin ||
        verificationData.user_id.toString() === userWithNumber.u_id.toString()
      ) {
        verificationData.status = 'login-request';
        verificationData.user_id = userWithNumber.u_id;
      } else {
        verificationData.status = 'duplicate-number-error';

        const record = await this.phoneVerificationRepository.save(
          verificationData,
        );
        return publicFields(record);
      }
    } else {
      verificationData.status = 'awaiting-verification';
    }

    try {
      const twilioResponse = await this.twilioClient.messages.create({
        body: `Your verification code for Steppen is ${verificationData.verification_code}`,
        from: `+${process.env.TWILIO_FROM_NUMBER}`,
        to: verificationData.phone_number,
      });

      console.log(`Twilio response: ${JSON.stringify(twilioResponse)}`);
    } catch (e) {
      console.warn(`Twilio error: ${JSON.stringify(e)}`);

      verificationData.status = 'verification-start-error';
    }

    const record = await this.phoneVerificationRepository.save(
      verificationData,
    );
    return publicFields(record);
  }

  async resend(id) {
    const record = await this.phoneVerificationRepository.findOne(id);

    return this.create(
      record.allow_login,
      record.country_code,
      record.id,
      record.phone_number,
      record.user_id,
    );
  }

  async verifyCode(id, verificationCode) {
    const record = await this.phoneVerificationRepository.findOne(id);

    if (record.verification_code !== verificationCode) {
      record.status = 'code-match-error';
    } else {
      if (!!record.user_id) {
        if (record.allow_login) {
          record.status = 'login-verified';
        } else {
          record.status = 'transition-verified';

          await this.usersRepository.save({
            u_id: record.user_id,
            phone_number: record.phone_number,
            phone_number_country_code: record.country_code,
          });
        }
      } else {
        const userWithNumber = await this.usersRepository.findOne({
          phone_number: record.phone_number,
        });

        if (userWithNumber) {
          record.status = 'weird-login-verified';

          record.user_id = userWithNumber.u_id;
        } else {
          record.status = 'signup-requested';
        }
      }
    }

    await this.phoneVerificationRepository.save(record);
    return publicFields(record);
  }
}
