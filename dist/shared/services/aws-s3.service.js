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
exports.AwsS3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const mime = require("mime-types");
const api_config_service_1 = require("./api-config.service");
const generator_service_1 = require("./generator.service");
let AwsS3Service = class AwsS3Service {
    constructor(configService, generatorService) {
        this.configService = configService;
        this.generatorService = generatorService;
        const awsS3Config = configService.awsS3Config;
        const options = {
            apiVersion: awsS3Config.bucketApiVersion,
            region: awsS3Config.bucketRegion,
            accessKeyId: awsS3Config.accessKeyId,
            secretAccessKey: awsS3Config.secretAccessKey,
        };
        this.s3 = new AWS.S3(options);
    }
    async uploadImage(file) {
        const fileName = this.generatorService.fileName(mime.extension(file.mimetype));
        const key = 'images/' + fileName;
        await this.s3
            .putObject({
            Bucket: this.configService.awsS3Config.bucketName,
            Body: file.buffer,
            Key: key,
        })
            .promise();
        return key;
    }
};
AwsS3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        generator_service_1.GeneratorService])
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws-s3.service.js.map