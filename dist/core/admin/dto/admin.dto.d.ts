import { AdminRoleEnum } from '../../../common/constants';
import { AbstractDto } from '../../../common/constants';
import { AdminEntity } from '../admin.entity';
export declare class AdminDto extends AbstractDto {
    fullName: string;
    email: string;
    password: string;
    salt: string;
    role: AdminRoleEnum;
    customerId: string;
    avatar: string;
    constructor(admin: AdminEntity);
}
