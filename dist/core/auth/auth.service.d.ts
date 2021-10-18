import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { ApiConfigService } from '../../shared';
import { AdminRoleEnum, UserRoleEnum } from '../../common/constants';
import { TokenPayloadDto } from './dto';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto';
import { AdminService } from '../admin/admin.service';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { AuthDto } from '../user/dto/auth.dto';
export declare class AuthService {
    private authRepository;
    private readonly configService;
    private readonly userService;
    private readonly jwtService;
    private readonly adminService;
    constructor(authRepository: Repository<AuthEntity>, configService: ApiConfigService, userService: UserService, jwtService: JwtService, adminService: AdminService);
    save(auth: AuthDto): Promise<AuthEntity>;
    verifyEmailCode(email: string, code: string): Promise<string>;
    validateUser(signInDto: SignInDto): Promise<UserEntity>;
    validateAdmin(signInDto: SignInDto): Promise<any>;
    createToken(user: UserEntity | UserDto, role: UserRoleEnum | AdminRoleEnum): Promise<TokenPayloadDto>;
}
