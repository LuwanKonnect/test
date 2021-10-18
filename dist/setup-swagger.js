"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
function setupSwagger(app, environment) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Little Big Shed')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('User')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    if (environment === 'development') {
        fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
    }
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=setup-swagger.js.map