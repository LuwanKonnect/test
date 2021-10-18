import { AbstractEntity, AdminRoleEnum } from '../../common/constants';
import { AdminDto } from './dto';
export declare class AdminEntity extends AbstractEntity<AdminDto> {
    email: string;
    fullName: string;
    customerId: string;
    password: string;
    salt: string;
    avatar: string;
    role: AdminRoleEnum;
    dtoClass: typeof AdminDto;
}
