import { AbstractEntity } from '../../common/constants';
import { UserDto } from './dto';
export declare class UserEntity extends AbstractEntity<UserDto> {
    email: string;
    fullName: string;
    password: string;
    salt: string;
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
    dtoClass: typeof UserDto;
}
