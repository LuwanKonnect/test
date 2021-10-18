import { UserDto } from '../../user/dto';
declare const SignUpDto_base: import("@nestjs/common").Type<Omit<UserDto, "id" | "createdAt" | "updatedAt">>;
export declare class SignUpDto extends SignUpDto_base {
    password: string;
}
export {};
