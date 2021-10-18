import { UserDto } from '../../user/dto/user.dto';
import { TokenPayloadDto } from './token-payload.dto';
export declare class LoginPayloadDto {
    user: UserDto;
    token: TokenPayloadDto;
    constructor(user: UserDto, token: TokenPayloadDto);
}
