import { IFile } from '../../../common/interfaces';
import { ItemDto } from './item.dto';
declare const UpdateItemDto_base: import("@nestjs/common").Type<Partial<Omit<ItemDto, "i_id" | "created" | "updated">>>;
export declare class UpdateItemDto extends UpdateItemDto_base {
    deletedImages: string;
    newImages: [IFile];
    i_id: number;
}
export {};
