"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./entities/message.entity");
const socket_gateway_1 = require("./socket.gateway");
const socket_entity_1 = require("./entities/socket.entity");
let SocketModule = class SocketModule {
};
SocketModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([message_entity_1.MessageEntity, socket_entity_1.SocketEntity])],
        providers: [socket_gateway_1.SocketGateway],
    })
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socket.module.js.map