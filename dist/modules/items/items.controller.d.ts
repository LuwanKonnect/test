/// <reference types="multer" />
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { FileUploadService } from '../../features/file-upload/file-upload.service';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    private readonly fileUploadService;
    constructor(itemsService: ItemsService, fileUploadService: FileUploadService);
    save(items: Items, id: string, files: Array<Express.Multer.File>): void;
    update(items: UpdateItemDto, files: Array<Express.Multer.File>): Promise<void>;
}
