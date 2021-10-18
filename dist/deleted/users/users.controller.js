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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const auth_service_1 = require("../auth/auth.service");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("./user.decorator");
let UsersController = class UsersController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(user) {
        const registerResult = await this.usersService.register(user);
        if (registerResult.code === 200) {
            return this.authService.certificate(user);
        }
        return registerResult;
    }
    async login(loginParmas) {
        console.log('JWT identity - Step 1: apply login');
        const authResult = await this.authService.validateUser(loginParmas.email, loginParmas.password);
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code: 600,
                    msg: `Invalid email or password!`,
                };
            default:
                return {
                    code: 600,
                    msg: `The user is not exist!`,
                };
        }
    }
    async update(user, u_id) {
        return this.usersService.update(user, u_id);
    }
    findAll() {
        return this.usersService.findAll();
    }
    async checkEmail(email) {
        const result = await this.usersService.findOne(email);
        if (result) {
            return {
                code: 203,
                msg: 'Exist',
            };
        }
        return {
            code: 200,
            msg: 'Not Exist',
        };
    }
};
__decorate([
    swagger_1.ApiResponse({ type: user_entity_1.userResponseDTO, status: 201, description: 'success' }),
    common_1.Post('register'),
    swagger_1.ApiBody({
        description: 'the u_id is not required',
        type: user_entity_1.User,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    swagger_1.ApiResponse({ status: 201, type: user_entity_1.userResponseDTO, description: 'success' }),
    common_1.Post('login'),
    swagger_1.ApiBody({
        description: 'User login',
        type: user_entity_1.LoginDTO,
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiResponse({
        status: 201,
        description: 'please check res.data.code, 200 is successful',
    }),
    swagger_1.ApiBody({
        description: 'all user detail that need update',
        type: user_entity_1.User,
    }),
    common_1.Put('update'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.AuthUser('u_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    swagger_1.ApiHeader({
        name: 'authorization',
        required: true,
        description: 'need token',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiResponse({ status: 203, description: 'email exist' }),
    swagger_1.ApiResponse({ status: 200, description: 'Not exist' }),
    common_1.Get('checkEmail'),
    swagger_1.ApiQuery({
        name: 'email',
        description: 'email',
    }),
    __param(0, common_1.Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkEmail", null);
UsersController = __decorate([
    swagger_1.ApiTags('User'),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map