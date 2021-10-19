import './boilerplate.polyfill';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { ApiConfigService, SharedModule } from './shared';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './modules/items/items.module';
import { FileUploadModule } from './features/file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfigForMysql,
    }),
    UserModule,
    AuthModule,
    SharedModule,
    FileUploadModule,
    ItemsModule,
  ],
})
export class AppModule {}
