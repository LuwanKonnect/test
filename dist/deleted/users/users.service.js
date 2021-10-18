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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const cryptogram_1 = require("../utils/cryptogram");
const salt_entity_1 = require("./salt.entity");
let UsersService = class UsersService {
    constructor(connection) {
        this.connection = connection;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findOne(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    findOneByUsername(username) {
        return this.usersRepository.find({ where: { username } });
    }
    findAllByUsername(username) {
        username = '%' + username + '%';
        return this.usersRepository.find({
            where: { username: typeorm_2.Like(username) },
        });
    }
    findOneSalt(u_id) {
        return this.saltRepository.findOne({ where: { u_id } });
    }
    async update(user, u_id) {
        if (user.password) {
            const salt = cryptogram_1.makeSalt();
            user.password = cryptogram_1.encryptPassword(user.password, salt);
            try {
                await this.connection.transaction(async (manager) => {
                    await manager.update(user_entity_1.User, u_id, user);
                    await manager.update(salt_entity_1.Salt, u_id, { salt: salt });
                });
                return {
                    code: 200,
                    msg: 'Success',
                };
            }
            catch (error) {
                return {
                    code: 503,
                    msg: `Service error: ${error}`,
                };
            }
        }
        else {
            const res = await this.usersRepository.update({ u_id }, user);
            if (res.affected === 1) {
                return {
                    code: 200,
                    msg: 'Success',
                };
            }
            else {
                return {
                    code: 403,
                    msg: 'failed',
                };
            }
        }
    }
    async remove(u_id) {
        await this.usersRepository.update(u_id, { is_deleted: true });
    }
    async register(user) {
        const result = await this.usersRepository.find({
            where: { email: user.email },
        });
        if (result.length > 0) {
            return {
                code: 400,
                msg: 'User already exist',
            };
        }
        const salt = cryptogram_1.makeSalt();
        user.password = cryptogram_1.encryptPassword(user.password, salt);
        try {
            try {
                await this.connection.transaction(async (manager) => {
                    const res = await manager.save(user_entity_1.User, user);
                    await manager.insert(salt_entity_1.Salt, {
                        u_id: res.u_id,
                        salt: salt,
                    });
                });
                return {
                    code: 200,
                    msg: 'Success',
                };
            }
            catch (error) {
                return {
                    code: 503,
                    msg: `Service error: ${error}`,
                };
            }
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
};
__decorate([
    typeorm_1.InjectRepository(user_entity_1.User),
    __metadata("design:type", Object)
], UsersService.prototype, "usersRepository", void 0);
__decorate([
    typeorm_1.InjectRepository(salt_entity_1.Salt),
    __metadata("design:type", Object)
], UsersService.prototype, "saltRepository", void 0);
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map