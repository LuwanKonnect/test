import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { SignUpDto } from '../auth/dto';
import { UserResponseDto } from '../auth/dto';
import { ValidatorService } from '../../shared/services/validator.service';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import type { FindConditions } from 'typeorm';
import { IFile } from '../../common/interfaces';
import { UserDto, UsersPageOptionsDto } from './dto';
import { PageDto } from '../../common/constants/dto';
import { UpdateDto } from './dto/update.dto';
export declare class UserService {
    private userRepository;
    readonly validatorService: ValidatorService;
    readonly awsS3Service: AwsS3Service;
    constructor(userRepository: Repository<UserEntity>, validatorService: ValidatorService, awsS3Service: AwsS3Service);
    create(user: SignUpDto): Promise<UserEntity>;
    findAllUser(): Promise<UserEntity[]>;
    findOneById(id: string): Promise<UserResponseDto>;
    findNormalDetailById(id: string): Promise<any>;
    findEmailById(id: string): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity>;
    save(user: UserEntity): Promise<UserResponseDto>;
    deleteById(id: string): Promise<any>;
    update(options: Partial<{
        username: string;
        email: string;
        id: string;
    }>, user: Partial<UpdateDto>): Promise<any>;
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity>;
    findByUsernameOrEmailOrMobile(options: Partial<{
        username: string;
        email: string;
        mobile: string;
    }>): Promise<UserEntity | undefined>;
    createUser(SignUpDto: SignUpDto, file: IFile): Promise<UserEntity>;
    getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<PageDto<UserResponseDto>>;
    getUser(userId: string): Promise<UserDto>;
}
