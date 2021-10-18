import { UserDto } from './user.dto';
declare const UpdateDto_base: import("@nestjs/common").Type<Partial<Omit<UserDto, "id" | "createdAt" | "updatedAt">>>;
export declare class UpdateDto extends UpdateDto_base {
    password: string;
}
export {};
