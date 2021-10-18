/// <reference types="multer" />
import { FileUploadService } from './file-upload.service';
import { Response } from 'express';
import { IFile } from '../../common/interfaces';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    create(file: IFile): Promise<string>;
    uploadManyToS3(files: Array<Express.Multer.File>): Promise<string[]>;
    getFile(key: string, res: Response): Promise<void>;
    deleteFile(key: string): Promise<void>;
}
