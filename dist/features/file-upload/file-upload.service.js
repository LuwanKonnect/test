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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const mime = require("mime-types");
const shared_1 = require("../../shared");
const shared_2 = require("../../shared");
const providers_1 = require("../../common/providers");
let FileUploadService = class FileUploadService {
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
    async upload(file, type) {
        console.log(file);
        const fileName = this.generatorService.fileName(mime.extension(file.mimetype));
        const key = `${type}/${fileName}`;
        await this.s3
            .putObject({
            Bucket: this.configService.awsS3Config.bucketName,
            Body: file.buffer,
            Key: key,
        })
            .promise();
        return key;
    }
    async getFile(key) {
        const downloadParams = {
            Key: key,
            Bucket: process.env.AWS_BUCKET_NAME,
        };
        const exists = await this.s3
            .headObject(downloadParams)
            .promise()
            .then(() => true, (err) => {
            if (err.code === 'NotFound') {
                return false;
            }
            throw err;
        });
        if (exists) {
            return this.s3.getObject(downloadParams).createReadStream();
        }
        else {
            throw new common_1.BadRequestException('The key is not exist');
        }
    }
    async updateFileByDelete(deletedList, originalList) {
        return Promise.all(deletedList.map(async (key) => {
            if (originalList.includes(key)) {
                await this.deleteFile(key);
            }
        })).then(() => {
            return originalList.filter((e) => !deletedList.includes(e));
        });
    }
    async updateImageByAdd(AddList, originalList, type) {
        return Promise.all(AddList.map(async (key) => {
            if (providers_1.UtilsProvider.isImage(key.mimetype)) {
                return await this.upload(key, type);
            }
            else {
                throw new common_1.BadRequestException('not image');
            }
        })).then((res) => {
            res.forEach((key) => {
                originalList.push(key);
            });
            return originalList;
        });
    }
    async deleteFile(key) {
        const Params = {
            Key: key,
            Bucket: process.env.AWS_BUCKET_NAME,
        };
        const exists = await this.s3
            .headObject(Params)
            .promise()
            .then(() => true, (err) => {
            if (err.code === 'NotFound') {
                return false;
            }
            throw err;
        });
        if (exists) {
            await this.s3.deleteObject(Params);
        }
        else {
            throw new common_1.BadRequestException('The key is not exist');
        }
    }
};
FileUploadService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [shared_1.ApiConfigService,
        shared_2.GeneratorService])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map