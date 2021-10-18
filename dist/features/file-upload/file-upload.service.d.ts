/// <reference types="multer" />
import type { IFile } from '../../common/interfaces';
import { ApiConfigService } from '../../shared';
import { GeneratorService } from '../../shared';
export declare class FileUploadService {
    configService: ApiConfigService;
    generatorService: GeneratorService;
    private readonly s3;
    constructor(configService: ApiConfigService, generatorService: GeneratorService);
    upload(file: IFile, type: string): Promise<string>;
    getFile(key: string): Promise<any>;
    updateFileByDelete(deletedList: string[], originalList: string[]): Promise<string[]>;
    updateImageByAdd(AddList: Array<Express.Multer.File>, originalList: string[], type: string): Promise<string[]>;
    deleteFile(key: string): Promise<void>;
}
