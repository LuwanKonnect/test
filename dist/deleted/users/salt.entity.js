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
exports.Salt = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Salt = class Salt {
};
__decorate([
    class_validator_1.IsNumber(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Salt.prototype, "s_id", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'u_id cannot be empty' }),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", Number)
], Salt.prototype, "u_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Salt.prototype, "salt", void 0);
Salt = __decorate([
    typeorm_1.Entity()
], Salt);
exports.Salt = Salt;
//# sourceMappingURL=salt.entity.js.map