import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginPayloadDto, SignInDto, SignUpDto } from './dto';
import { IFile } from '../../common/interfaces';
import { EmailService } from '../../shared';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly emailService;
    constructor(userService: UserService, authService: AuthService, emailService: EmailService);
    signUp(signUpDto: SignUpDto, file: IFile): Promise<LoginPayloadDto>;
    signIn(signInDto: SignInDto): Promise<LoginPayloadDto>;
    adminSignIn(signInDto: SignInDto): Promise<LoginPayloadDto>;
    getVerificationCode(email: string): Promise<void>;
    verifyCode(email: string, code: string): Promise<string>;
}
