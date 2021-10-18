import { Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../shared';
import { UserService } from '../user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly userService: UserService;
    readonly configService: ApiConfigService;
    constructor(userService: UserService, configService: ApiConfigService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        exp: any;
        role: any;
    }>;
}
export {};
