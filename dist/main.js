"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const setup_swagger_1 = require("./setup-swagger");
const common_1 = require("@nestjs/common");
const shared_1 = require("./shared");
const filters_1 = require("./common/filters");
const platform_express_1 = require("@nestjs/platform-express");
const raw_body_middleware_1 = require("./common/middlewares/raw-body.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(), { cors: true });
    app.use(raw_body_middleware_1.default());
    const reflector = app.get(core_1.Reflector);
    app.useGlobalFilters(new filters_1.HttpExceptionFilter(reflector), new filters_1.QueryFailedFilter(reflector));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        dismissDefaultMessages: true,
        exceptionFactory: (errors) => new common_1.UnprocessableEntityException(errors),
    }));
    const configService = app.select(shared_1.SharedModule).get(shared_1.ApiConfigService);
    if (configService.documentationEnabled) {
        setup_swagger_1.setupSwagger(app, configService.environment);
    }
    const port = configService.appConfig.port;
    await app.listen(port);
    console.info(`Server running on port ${port}`);
    return app;
}
exports.bootstrap = bootstrap;
void bootstrap();
//# sourceMappingURL=main.js.map