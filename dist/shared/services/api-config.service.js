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
exports.ApiConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const snake_naming_strategy_1 = require("../../snake-naming.strategy");
const user_subscriber_1 = require("../../common/entity-subscribers/user-subscriber");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let ApiConfigService = class ApiConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
    getNumber(key, defaultValue) {
        const value = this.configService.get(key, defaultValue);
        if (value === undefined) {
            throw new Error(key + ' env var not set');
        }
        try {
            return Number(value);
        }
        catch (_a) {
            throw new Error(key + ' env var is not a number');
        }
    }
    getBoolean(key, defaultValue) {
        const value = this.configService.get(key, defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.toString());
        if (value === undefined) {
            throw new Error(key + ' env var not set');
        }
        try {
            return Boolean(JSON.parse(value));
        }
        catch (_a) {
            throw new Error(key + ' env var is not a boolean');
        }
    }
    getString(key, defaultValue) {
        const value = this.configService.get(key, defaultValue);
        if (!value) {
            console.warn(`"${key}" environment variable is not set`);
            return;
        }
        return value.toString().replace(/\\n/g, '\n');
    }
    get nodeEnv() {
        return this.getString('NODE_ENV', 'development');
    }
    get fallbackLanguage() {
        return this.getString('FALLBACK_LANGUAGE').toLowerCase();
    }
    get typeOrmConfigForMysql() {
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
                subscribers: [user_subscriber_1.UserSubscriber],
                logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
                namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
                synchronize: true,
            };
        }
        else if (this.isProduction) {
            return {
                entities,
                type: 'mysql',
                host: this.getString('SERVER_MYSQL_DB_HOST'),
                port: this.getNumber('SERVER_MYSQL_DB_PORT'),
                username: this.getString('SERVER_MYSQL_DB_USERNAME'),
                password: this.getString('SERVER_MYSQL_DB_PASSWORD'),
                database: this.getString('SERVER_MYSQL_DB_DATABASE'),
                subscribers: [user_subscriber_1.UserSubscriber],
                logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
                namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
                synchronize: false,
            };
        }
    }
    get typeOrmConfigForPostgreSql() {
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
                subscribers: [user_subscriber_1.UserSubscriber],
                logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
                namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
                cli: { migrationsDir: __dirname + '/../../migrations' },
                synchronize: true,
            };
        }
        else if (this.isProduction) {
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
                subscribers: [user_subscriber_1.UserSubscriber],
                logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
                namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
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
                secure: false,
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
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
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
            secure: false,
            auth: {
                user: this.getString('EMAIL_USERNAME'),
                pass: this.getString('EMAIL_PASSWORD'),
            },
        };
    }
    get documentationEnabled() {
        return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
    }
    get natsEnabled() {
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
            monthlySubscriptionPriceID: this.getString('MONTHLY_SUBSCRIPTION_PRICE_ID'),
            webhookSecret: this.getString('STRIPE_WEBHOOK_SECRET'),
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
};
ApiConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiConfigService);
exports.ApiConfigService = ApiConfigService;
//# sourceMappingURL=api-config.service.js.map