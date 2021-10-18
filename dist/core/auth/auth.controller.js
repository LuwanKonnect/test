"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const constants_1 = require("../../common/constants");
const swagger_1 = require("@nestjs/swagger");
const swagger_schema_1 = require("../../common/decorators/swagger.schema");
const shared_1 = require("../../shared");
const providers_1 = require("../../common/providers");
let AuthController = class AuthController {
    constructor(userService, authService, emailService) {
        this.userService = userService;
        this.authService = authService;
        this.emailService = emailService;
    }
    async signUp(signUpDto, file) {
        console.log(signUpDto);
        const userEntity = await this.userService.createUser(signUpDto, file);
        if (userEntity) {
            const token = await this.authService.createToken(userEntity, constants_1.UserRoleEnum.USER);
            return new dto_1.LoginPayloadDto(userEntity.toDto(), token);
        }
    }
    async signIn(signInDto) {
        const userEntity = await this.authService.validateUser(signInDto);
        const token = await this.authService.createToken(userEntity, constants_1.UserRoleEnum.USER);
        return new dto_1.LoginPayloadDto(userEntity.toDto(), token);
    }
    async adminSignIn(signInDto) {
        const userEntity = await this.authService.validateAdmin(signInDto);
        const token = await this.authService.createToken(userEntity, constants_1.AdminRoleEnum.ADMIN);
        return new dto_1.LoginPayloadDto(userEntity.toDto(), token);
    }
    async getVerificationCode(email) {
        const code = providers_1.UtilsProvider.generateRandomString(6);
        const emailResult = await this.emailService.mailer(email, `This is your code: ${code}`);
        if (emailResult === 200) {
            await this.authService.save({ email, code });
        }
        else {
            throw new common_1.InternalServerErrorException();
        }
    }
    async verifyCode(email, code) {
        return await this.authService.verifyEmailCode(email, code);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: 'for user sign up' }),
    swagger_1.ApiResponse({
        type: dto_1.LoginPayloadDto,
        status: common_1.HttpStatus.CREATED,
        description: 'success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'failed, system error',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Email already in use',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        description: 'The data format is not right!',
    }),
    swagger_schema_1.ApiFile({ name: 'avatar' }),
    swagger_1.ApiBody({
        description: '',
        type: dto_1.SignUpDto,
    }),
    common_1.Post('signUp'),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'for user sign in' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: dto_1.LoginPayloadDto,
        description: 'Success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Data format error',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.SERVICE_UNAVAILABLE,
        description: 'User not active',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invalid username or password',
    }),
    common_1.Post('signIn'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    swagger_1.ApiOperation({ summary: 'for Admin sign in' }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: dto_1.LoginPayloadDto,
        description: 'Success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Data format error',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invalid username or password',
    }),
    common_1.Post('adminSignIn'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSignIn", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.OK,
        description: 'Success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Failed, outlook cannot use anymore',
    }),
    common_1.Get('getVerificationCode'),
    swagger_1.ApiQuery({
        name: 'email',
        description: 'email',
    }),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getVerificationCode", null);
__decorate([
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        type: dto_1.LoginPayloadDto,
        description: 'Success',
    }),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Invalid username or code',
    }),
    common_1.Post('verifyCode'),
    __param(0, common_1.Body('email')),
    __param(1, common_1.Body('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyCode", null);
AuthController = __decorate([
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        shared_1.EmailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map