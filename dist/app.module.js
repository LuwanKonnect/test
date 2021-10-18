"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./boilerplate.polyfill");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./core/user/user.module");
const auth_module_1 = require("./core/auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const shared_1 = require("./shared");
const config_1 = require("@nestjs/config");
const admin_module_1 = require("./core/admin/admin.module");
const mailer_1 = require("@nestjs-modules/mailer");
const stripe_module_1 = require("./features/stripe/stripe.module");
const availability_module_1 = require("./modules/availability/availability.module");
const booking_module_1 = require("./modules/booking/booking.module");
const borrower_rating_module_1 = require("./modules/borrower-rating/borrower-rating.module");
const comments_module_1 = require("./modules/comments/comments.module");
const items_module_1 = require("./modules/items/items.module");
const lender_rating_module_1 = require("./modules/lender-rating/lender-rating.module");
const liked_module_1 = require("./modules/liked/liked.module");
const file_upload_module_1 = require("./features/file-upload/file-upload.module");
const schedule_1 = require("@nestjs/schedule");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public')
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_1.SharedModule],
                inject: [shared_1.ApiConfigService],
                useFactory: (configService) => configService.typeOrmConfigForMysql,
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 10,
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [shared_1.SharedModule],
                inject: [shared_1.ApiConfigService],
                useFactory: (configService) => configService.emailConfig,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            shared_1.SharedModule,
            admin_module_1.AdminModule,
            stripe_module_1.StripeModule,
            file_upload_module_1.FileUploadModule,
            availability_module_1.AvailabilityModule,
            booking_module_1.BookingModule,
            borrower_rating_module_1.BorrowerRatingModule,
            comments_module_1.CommentsModule,
            items_module_1.ItemsModule,
            lender_rating_module_1.LenderRatingModule,
            liked_module_1.LikedModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map