import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignInDto, SignUpDto } from './dto';
import { IFile } from '../../common/interfaces';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    signUp(signUpDto: SignUpDto, file: IFile): Promise<LoginPayloadDto>;
    signIn(signInDto: SignInDto): Promise<LoginPayloadDto>;
    adminSignIn(signInDto: SignInDto): Promise<LoginPayloadDto>;
    verifyCode(email: string, code: string): Promise<string>;
}
