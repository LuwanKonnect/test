import { UserService } from './user.service';
import { UserResponseDto } from '../auth/dto';
import { UpdateDto } from './dto/update.dto';
import { IFile } from '../../common/interfaces';
import { FileUploadService } from '../../features/file-upload/file-upload.service';
export declare class UserController {
    private readonly userService;
    private readonly fileUploadService;
    update(file: IFile, user: UpdateDto, id: string): Promise<any>;
    constructor(userService: UserService, fileUploadService: FileUploadService);
    getCurrentUser(id: string): Promise<UserResponseDto>;
    getOneUser(id: string): Promise<any>;
    checkExist(options: Partial<{
        username: string;
        email: string;
        mobile: string;
    }>): Promise<string>;
}
