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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const validator_service_1 = require("../../shared/services/validator.service");
const aws_s3_service_1 = require("../../shared/services/aws-s3.service");
const exceptions_1 = require("../../common/exceptions");
let UserService = class UserService {
    constructor(userRepository, validatorService, awsS3Service) {
        this.userRepository = userRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
    }
    async create(user) {
        return this.userRepository.create(user);
    }
    async findAllUser() {
        return await this.userRepository.find();
    }
    async findOneById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findNormalDetailById(id) {
        return await this.userRepository.findOne({
            where: { id },
            select: ['fullName', 'avatar', 'lender_rating', 'borrower_rating'],
        });
    }
    async findEmailById(id) {
        return await this.userRepository.findOne({
            where: { id },
            select: ['email'],
        });
    }
    async findOneByEmail(email) {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .addSelect('user.salt')
            .where('user.email = :email', { email })
            .getOne();
    }
    async save(user) {
        const _a = await this.userRepository.save(user), { password, salt } = _a, res = __rest(_a, ["password", "salt"]);
        return res;
    }
    async deleteById(id) {
        return await this.userRepository.delete(id);
    }
    async update(options, user) {
        return await this.userRepository.update(options, user);
    }
    findOne(findData) {
        return this.userRepository.findOne(findData);
    }
    async findByUsernameOrEmailOrMobile(options) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.username) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.username,
            });
        }
        if (options.mobile) {
            queryBuilder.orWhere('user.mobile = :mobile', {
                mobile: options.mobile,
            });
        }
        return queryBuilder.getOne();
    }
    async createUser(SignUpDto, file) {
        const tempResult = await this.findByUsernameOrEmailOrMobile({
            email: SignUpDto.email,
        });
        if (tempResult) {
            throw new common_1.BadRequestException('The email already in use.');
        }
        const user = this.userRepository.create(SignUpDto);
        if (file && !this.validatorService.isImage(file.mimetype)) {
            throw new exceptions_1.FileNotImageException();
        }
        if (file) {
            user.avatar = await this.awsS3Service.uploadImage(file);
        }
        return await this.userRepository.save(user);
    }
    async getUsers(pageOptionsDto) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const { items, pageMetaDto } = await queryBuilder
            .searchByString(pageOptionsDto.q, ['full_name'])
            .paginate(pageOptionsDto);
        return items.toPageDto(pageMetaDto);
    }
    async getUser(userId) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.where('user.id = :userId', { userId });
        const userEntity = await queryBuilder.getOne();
        return userEntity.toDto();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map