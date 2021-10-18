import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ApiConfigService, SharedModule } from '../../shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthEntity]),
    UserModule,
    AdminModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({
        secretOrPrivateKey: configService.authConfig.jwtSecret,
        signOptions: {
          // token expire date
          expiresIn: configService.authConfig.jwtExpirationTime,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
