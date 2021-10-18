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
exports.AuthEntity = void 0;
const typeorm_1 = require("typeorm");
let AuthEntity = class AuthEntity {
};
__decorate([
    typeorm_1.PrimaryColumn({ unique: true }),
    __metadata("design:type", String)
], AuthEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AuthEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], AuthEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], AuthEntity.prototype, "updatedAt", void 0);
AuthEntity = __decorate([
    typeorm_1.Entity('auth')
], AuthEntity);
exports.AuthEntity = AuthEntity;
//# sourceMappingURL=auth.entity.js.map