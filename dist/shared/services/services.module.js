"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("./api-config.service");
const aws_s3_service_1 = require("./aws-s3.service");
const generator_service_1 = require("./generator.service");
const validator_service_1 = require("./validator.service");
const email_service_1 = require("./email.service");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        providers: [
            api_config_service_1.ApiConfigService,
            aws_s3_service_1.AwsS3Service,
            email_service_1.EmailService,
            generator_service_1.GeneratorService,
            validator_service_1.ValidatorService,
        ],
        exports: [
            api_config_service_1.ApiConfigService,
            aws_s3_service_1.AwsS3Service,
            email_service_1.EmailService,
            generator_service_1.GeneratorService,
            validator_service_1.ValidatorService,
        ],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map