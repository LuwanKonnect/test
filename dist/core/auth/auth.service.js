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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const shared_1 = require("../../shared");
const dto_1 = require("./dto");
const admin_service_1 = require("../admin/admin.service");
const providers_1 = require("../../common/providers");
const typeorm_1 = require("typeorm");
const auth_entity_1 = require("./auth.entity");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    constructor(authRepository, configService, userService, jwtService, adminService) {
        this.authRepository = authRepository;
        this.configService = configService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.adminService = adminService;
    }
    async save(auth) {
        return await this.authRepository.save(auth);
    }
    async verifyEmailCode(email, code) {
        const res = await this.authRepository.findOne({ email, code });
        if (res && Date.now() - res.updatedAt.getTime() < 9000000) {
            return 'Success';
        }
        else {
            throw new common_1.NotFoundException('Invalid email or code');
        }
    }
    async validateUser(signInDto) {
        const user = await this.userService.findOneByEmail(signInDto.email);
        if (!user) {
            throw new common_1.NotFoundException('Invalid email or password');
        }
        const { password, salt } = user;
        const hashedPassword = providers_1.UtilsProvider.encryptPassword(signInDto.password, salt);
        if (hashedPassword === password) {
            return user;
        }
        else {
            throw new common_1.NotFoundException('Invalid email or password');
        }
    }
    async validateAdmin(signInDto) {
        const user = await this.adminService.findOneByEmail(signInDto.email);
        if (!user) {
            throw new common_1.NotFoundException('Invalid email or password');
        }
        const { password, salt } = user, rest = __rest(user, ["password", "salt"]);
        const hashedPassword = providers_1.UtilsProvider.encryptPassword(signInDto.password, salt);
        if (hashedPassword === password) {
            return rest;
        }
        else {
            throw new common_1.NotFoundException('Invalid email or password');
        }
    }
    async createToken(user, role) {
        const payload = {
            email: user.email,
            id: user.id,
            role,
        };
        return new dto_1.TokenPayloadDto({
            expiresIn: this.configService.authConfig.jwtExpirationTime +
                Math.floor(Date.now() / 1000),
            accessToken: await this.jwtService.signAsync(payload),
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(auth_entity_1.AuthEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        shared_1.ApiConfigService,
        user_service_1.UserService,
        jwt_1.JwtService,
        admin_service_1.AdminService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map