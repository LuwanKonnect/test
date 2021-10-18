import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ApiConfigService, SharedModule } from './shared';
import { HttpExceptionFilter, QueryFailedFilter } from './common/filters';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as helmet from 'helmet';
import rawBodyMiddleware from './common/middlewares/raw-body.middleware';
export async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // app.enable('trust proxy');
  // app.use(helmet());
  // app.enableCors();
  // Middleware for stripe
  app.use(rawBodyMiddleware());
  // Filter
  const reflector = app.get(Reflector);
  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );
  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );
  // configuration
  const configService = app.select(SharedModule).get(ApiConfigService);
  // Swagger
  if (configService.documentationEnabled) {
    setupSwagger(app, configService.environment);
  }

  const port = configService.appConfig.port;
  await app.listen(port);

  console.info(`Server running on port ${port}`);

  return app;
}
void bootstrap();
