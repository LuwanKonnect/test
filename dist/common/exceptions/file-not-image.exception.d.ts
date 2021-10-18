import { BadRequestException } from '@nestjs/common';
export declare class FileNotImageException extends BadRequestException {
    constructor(error?: string);
}
