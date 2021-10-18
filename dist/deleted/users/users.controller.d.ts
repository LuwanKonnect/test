import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(user: User): Promise<{
        code: number;
        msg: string;
    }>;
    login(loginParmas: any): Promise<{
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
    update(user: User, u_id: string): Promise<any>;
    findAll(): Promise<User[]>;
    checkEmail(email: string): Promise<{
        code: number;
        msg: string;
    }>;
}
