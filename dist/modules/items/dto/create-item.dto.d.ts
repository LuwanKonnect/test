import { ItemDto } from './item.dto';
declare const CreateItemDto_base: import("@nestjs/common").Type<Omit<ItemDto, "created" | "updated" | "i_id">>;
export declare class CreateItemDto extends CreateItemDto_base {
}
export {};
