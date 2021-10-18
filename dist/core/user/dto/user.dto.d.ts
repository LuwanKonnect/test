import { AbstractDto } from '../../../common/constants';
import type { UserEntity } from '../user.entity';
export declare class UserDto extends AbstractDto {
    fullName: string;
    email: string;
    avatar: string;
    mobile: string;
    address: string;
    lat: number;
    lng: number;
    suburb: string;
    bsb: string;
    account_number: string;
    lender_rating: number;
    borrower_rating: number;
    available: string;
    constructor(user: UserEntity, options?: Partial<{
        isActive: boolean;
    }>);
}
