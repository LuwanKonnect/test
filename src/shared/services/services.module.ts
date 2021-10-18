import { Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { AwsS3Service } from './aws-s3.service';
import { GeneratorService } from './generator.service';
import { ValidatorService } from './validator.service';
import { EmailService } from './email.service';

@Module({
  providers: [
    ApiConfigService,
    AwsS3Service,
    EmailService,
    GeneratorService,
    ValidatorService,
  ],
  exports: [
    ApiConfigService,
    AwsS3Service,
    EmailService,
    GeneratorService,
    ValidatorService,
  ],
})
export class ServicesModule {}
