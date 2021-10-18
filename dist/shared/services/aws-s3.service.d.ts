import type { IFile } from '../../common/interfaces';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';
export declare class AwsS3Service {
    configService: ApiConfigService;
    generatorService: GeneratorService;
    private readonly s3;
    constructor(configService: ApiConfigService, generatorService: GeneratorService);
    uploadImage(file: IFile): Promise<string>;
}
