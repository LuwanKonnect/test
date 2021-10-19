import { ItemDto } from './item.dto';
declare const CreateItemDto_base: import("@nestjs/common").Type<Omit<ItemDto, "i_id" | "created" | "updated">>;
export declare class CreateItemDto extends CreateItemDto_base {
}
export {};
