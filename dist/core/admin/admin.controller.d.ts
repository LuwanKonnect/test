import { UserService } from '../user/user.service';
import { UserResponseDto } from '../auth/dto';
import { PageDto } from '../../common/constants';
import { UsersPageOptionsDto } from '../user/dto';
export declare class AdminController {
    private readonly userService;
    constructor(userService: UserService);
    findOneUserById(id: string): Promise<UserResponseDto>;
    deleteOneUserById(id: string): Promise<void>;
    getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<UserResponseDto>>;
}
