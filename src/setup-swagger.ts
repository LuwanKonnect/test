import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { version } from '../package.json';
import * as fs from 'fs';

export function setupSwagger(app: INestApplication, environment: string): void {
  const options = new DocumentBuilder()
    .setTitle('Little Big Shed')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('User')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  if (environment === 'development') {
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  }
  SwaggerModule.setup('api', app, document);
}
