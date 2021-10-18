import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
export declare class ApiConfigService {
    private configService;
    constructor(configService: ConfigService);
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    private getNumber;
    private getBoolean;
    private getString;
    get nodeEnv(): string;
    get fallbackLanguage(): string;
    get typeOrmConfigForMysql(): TypeOrmModuleOptions;
    get typeOrmConfigForPostgreSql(): TypeOrmModuleOptions;
    get awsS3Config(): {
        bucketRegion: string;
        bucketApiVersion: string;
        bucketName: string;
        secretAccessKey: string;
        accessKeyId: string;
    };
    get emailConfig(): {
        transport: {
            host: string;
            port: number;
            secure: boolean;
            auth: {
                user: string;
                pass: string;
            };
        };
        defaults: {
            from: string;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
    };
    get emailTransport(): {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    get documentationEnabled(): boolean;
    get natsEnabled(): boolean;
    get paypalConfig(): {
        client: string;
        secret: string;
        api: string;
        currency: string;
    };
    get stripeConfig(): {
        publishableKey: string;
        secretKey: string;
        currency: string;
        monthlySubscriptionPriceID: string;
        webhookSecret: string;
    };
    get natsConfig(): {
        host: string;
        port: number;
    };
    get authConfig(): {
        jwtSecret: string;
        jwtExpirationTime: number;
    };
    get appConfig(): {
        port: string;
    };
    get environment(): string;
}
