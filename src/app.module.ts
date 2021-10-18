import './boilerplate.polyfill';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiConfigService, SharedModule } from './shared';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './core/admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { StripeModule } from './features/stripe/stripe.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { BookingModule } from './modules/booking/booking.module';
import { BorrowerRatingModule } from './modules/borrower-rating/borrower-rating.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ItemsModule } from './modules/items/items.module';
import { LenderRatingModule } from './modules/lender-rating/lender-rating.module';
import { LikedModule } from './modules/liked/liked.module';
import { FileUploadModule } from './features/file-upload/file-upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfigForMysql,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailerModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.emailConfig,
    }),
    UserModule,
    AuthModule,
    SharedModule,
    AdminModule,
    StripeModule,
    FileUploadModule,
    // Features Modules
    AvailabilityModule,
    BookingModule,
    BorrowerRatingModule,
    CommentsModule,
    ItemsModule,
    LenderRatingModule,
    LikedModule,
  ],
})
export class AppModule {}
