import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';

import type { IFile } from '../../common/interfaces';
import { ApiConfigService } from '../../shared';
import { GeneratorService } from '../../shared';
import { Express } from 'express';
import { UtilsProvider } from '../../common/providers';

@Injectable()
export class FileUploadService {
  private readonly s3: AWS.S3;

  constructor(
    public configService: ApiConfigService,
    public generatorService: GeneratorService,
  ) {
    const awsS3Config = configService.awsS3Config;

    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: awsS3Config.bucketApiVersion,
      region: awsS3Config.bucketRegion,
      accessKeyId: awsS3Config.accessKeyId,
      secretAccessKey: awsS3Config.secretAccessKey,
    };
    this.s3 = new AWS.S3(options);
  }

  async upload(file: IFile, type: string): Promise<string> {
    console.log(file);
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = `${type}/${fileName}`;
    await this.s3
      .putObject({
        Bucket: this.configService.awsS3Config.bucketName,
        Body: file.buffer,
        // ACL: 'public-read',
        Key: key,
      })
      .promise();

    return key;
  }

  async getFile(key: string): Promise<any> {
    const downloadParams = {
      Key: key,
      Bucket: process.env.AWS_BUCKET_NAME,
    };
    const exists = await this.s3
      .headObject(downloadParams)
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === 'NotFound') {
            return false;
          }
          throw err;
        },
      );
    if (exists) {
      return this.s3.getObject(downloadParams).createReadStream();
    } else {
      throw new BadRequestException('The key is not exist');
    }
  }
  async updateFileByDelete(deletedList: string[], originalList: string[]) {
    return Promise.all(
      deletedList.map(async (key: string) => {
        if (originalList.includes(key)) {
          await this.deleteFile(key);
        }
      }),
    ).then(() => {
      return originalList.filter((e) => !deletedList.includes(e));
    });
  }
  async updateImageByAdd(
    AddList: Array<Express.Multer.File>,
    originalList: string[],
    type: string,
  ) {
    return Promise.all(
      AddList.map(async (key: IFile) => {
        if (UtilsProvider.isImage(key.mimetype)) {
          return await this.upload(key, type);
        } else {
          throw new BadRequestException('not image');
        }
      }),
    ).then((res) => {
      res.forEach((key: string) => {
        originalList.push(key);
      });
      return originalList;
    });
  }
  async deleteFile(key: string) {
    const Params = {
      Key: key,
      Bucket: process.env.AWS_BUCKET_NAME,
    };
    const exists = await this.s3
      .headObject(Params)
      .promise()
      .then(
        () => true,
        (err) => {
          if (err.code === 'NotFound') {
            return false;
          }
          throw err;
        },
      );
    if (exists) {
      await this.s3.deleteObject(Params);
    } else {
      throw new BadRequestException('The key is not exist');
    }
  }
}
