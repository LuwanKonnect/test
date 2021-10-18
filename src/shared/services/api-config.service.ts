import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { UserSubscriber } from '../../common/entity-subscribers/user-subscriber';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string, defaultValue?: number): number {
    const value = this.configService.get(key, defaultValue);
    if (value === undefined) {
      throw new Error(key + ' env var not set'); // probably we should call process.exit() too to avoid locking the service
    }
    try {
      return Number(value);
    } catch {
      throw new Error(key + ' env var is not a number');
    }
  }

  private getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.configService.get(key, defaultValue?.toString());
    if (value === undefined) {
      throw new Error(key + ' env var not set');
    }
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get typeOrmConfigForMysql(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../core/**/*.entity{.ts,.js}',
      __dirname + '/../../features/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../shared/**/*.entity{.ts,.js}',
    ];
    if (this.isDevelopment) {
      return {
        entities,
        type: 'mysql',
        host: this.getString('MYSQL_DB_HOST'),
        port: this.getNumber('MYSQL_DB_PORT'),
        username: this.getString('MYSQL_DB_USERNAME'),
        password: this.getString('MYSQL_DB_PASSWORD'),
        database: this.getString('MYSQL_DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
      };
    } else if (this.isProduction) {
      return {
        entities,
        type: 'mysql',
        host: this.getString('SERVER_MYSQL_DB_HOST'),
        port: this.getNumber('SERVER_MYSQL_DB_PORT'),
        username: this.getString('SERVER_MYSQL_DB_USERNAME'),
        password: this.getString('SERVER_MYSQL_DB_PASSWORD'),
        database: this.getString('SERVER_MYSQL_DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
      };
    }
  }

  get typeOrmConfigForPostgreSql(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../core/**/*.entity{.ts,.js}',
      __dirname + '/../../features/**/*.entity{.ts,.js}',
      __dirname + '/../../modules/**/*.entity{.ts,.js}',
      __dirname + '/../../shared/**/*.entity{.ts,.js}',
    ];
    const migrations = [__dirname + '/../src/migrations/*{.ts,.js}'];
    if (this.isDevelopment) {
      return {
        entities,
        migrations,
        migrationsRun: true,
        type: 'postgres',
        host: this.getString('POSTGRESQL_DB_HOST'),
        port: this.getNumber('POSTGRESQL_DB_PORT'),
        username: this.getString('POSTGRESQL_DB_USERNAME'),
        password: this.getString('POSTGRESQL_DB_PASSWORD'),
        database: this.getString('POSTGRESQL_DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        cli: { migrationsDir: __dirname + '/../../migrations' },
        synchronize: true,
      };
    } else if (this.isProduction) {
      return {
        entities,
        migrations,
        migrationsRun: true,
        type: 'postgres',
        host: this.getString('SERVER_POSTGRESQL_DB_HOST'),
        port: this.getNumber('SERVER_POSTGRESQL_DB_PORT'),
        username: this.getString('SERVER_POSTGRESQL_DB_USERNAME'),
        password: this.getString('SERVER_POSTGRESQL_DB_PASSWORD'),
        database: this.getString('SERVER_POSTGRESQL_DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
        cli: { migrationsDir: __dirname + '/../../migrations' },
      };
    }
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_BUCKET_NAME'),
      secretAccessKey: this.getString('AWS_SECRET_ACCESS_KEY'),
      accessKeyId: this.getString('AWS_ACCESS_KEY_ID'),
    };
  }
  get emailConfig() {
    return {
      transport: {
        host: this.getString('EMAIL_HOST'),
        port: this.getNumber('EMAIL_PORT'),
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: this.getString('EMAIL_USERNAME'),
          pass: this.getString('EMAIL_PASSWORD'),
        },
      },
      defaults: {
        from: this.getString('EMAIL_FROM'),
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    };
  }
  get emailTransport() {
    return {
      host: this.getString('EMAIL_HOST'),
      port: this.getNumber('EMAIL_PORT'),
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: this.getString('EMAIL_USERNAME'),
        pass: this.getString('EMAIL_PASSWORD'),
      },
    };
  }
  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
  }
  get natsEnabled(): boolean {
    return this.getBoolean('NATS_ENABLED');
  }

  get paypalConfig() {
    return {
      client: this.getString('CLIENT'),
      secret: this.getString('SECRET'),
      api: this.getString('PAYPAL_API'),
      currency: this.getString('PAYPAL_CURRENCY'),
    };
  }

  get stripeConfig() {
    return {
      publishableKey: this.getString('STRIPE_PUBLISHABLE_KEY'),
      secretKey: this.getString('STRIPE_SECRET_KEY'),
      currency: this.getString('STRIPE_CURRENCY'),
      monthlySubscriptionPriceID: this.getString(
        'MONTHLY_SUBSCRIPTION_PRICE_ID',
      ),
      webhookSecret: this.getString('STRIPE_WEBHOOK_SECRET'),
      // apiVersion: this.getString('API_VERSION'),
    };
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }

  get authConfig() {
    return {
      jwtSecret: this.getString('JWT_SECRET_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }
  get environment() {
    return this.getString('NODE_ENV');
  }
}
