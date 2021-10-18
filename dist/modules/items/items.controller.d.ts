/// <reference types="multer" />
import { ItemsService } from './items.service';
import { Items } from './items.entity';
import { SearchConditionsDto } from './dto/search-conditions.dto';
import { AvailabilityService } from '../availability/availability.service';
import { LikedService } from '../liked/liked.service';
import { SameOwnerDto } from './dto';
import { FileUploadService } from '../../features/file-upload/file-upload.service';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    private readonly availabilityService;
    private readonly likedService;
    private readonly fileUploadService;
    constructor(itemsService: ItemsService, availabilityService: AvailabilityService, likedService: LikedService, fileUploadService: FileUploadService);
    save(items: Items, id: string, files: Array<Express.Multer.File>): Promise<any>;
    findByUid(u_id: string): Promise<Items[]>;
    findSameOwnerItem(sameOwnerDto: SameOwnerDto): Promise<Items[]>;
    findByIid(i_id: string, u_id: string): Promise<{
        item: Items;
        yearAvailability: string;
        liked: boolean;
    }>;
    update(items: UpdateItemDto, files: Array<Express.Multer.File>): Promise<any>;
    delete(u_id: string, i_id: string): Promise<any>;
    search(searchConditionsDto: SearchConditionsDto): Promise<Items[]>;
}
