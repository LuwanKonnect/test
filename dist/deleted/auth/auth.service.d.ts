import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    certificate(user: any): Promise<{
        code: number;
        data: {
            token: string;
            user: any;
        };
        msg: string;
    } | {
        code: number;
        msg: string;
        data?: undefined;
    }>;
}
