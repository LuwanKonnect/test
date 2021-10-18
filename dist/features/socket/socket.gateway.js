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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enum_1 = require("./enum");
const decorators_1 = require("../../common/decorators");
const message_entity_1 = require("./entities/message.entity");
const message_payload_dto_1 = require("./dto/message-payload.dto");
const user_map_dto_1 = require("./dto/user-map.dto");
const socket_entity_1 = require("./entities/socket.entity");
const options = {
    cors: {
        origin: ['http://10.13.203.18:3001'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
};
let SocketGateway = class SocketGateway {
    constructor(messageRepository, socketRepository) {
        this.messageRepository = messageRepository;
        this.socketRepository = socketRepository;
    }
    async handleConnection(client) {
        if (client.handshake.auth.userID) {
            await this.socketRepository.save({
                u_id: client.handshake.auth.userID,
                socketId: client.id,
            });
        }
        console.log(client.handshake.auth);
        console.log(client.id);
        return 'connect successful';
    }
    async handleDisconnect(client) {
        console.log('disconnect', client.id);
        await this.socketRepository.update({
            socketId: client.id,
        }, { socketId: '' });
    }
    async message(client, data) {
        const res = await this.messageRepository.save(data);
        const socket = await this.socketRepository.findOne({ u_id: res.targetId });
        if (socket && socket.socketId.length > 0) {
            this.server.to(socket.socketId).emit('message', {
                code: enum_1.MessageCodeEnum.OK,
                msg: 'success',
                data: res,
            });
        }
    }
    async notification(u_id, message) {
        const res = await this.socketRepository.findOne({ u_id });
        if (res && res.socketId.length > 0) {
            this.server.to(res.socketId).emit('message', {
                code: enum_1.MessageCodeEnum.OK,
                message,
            });
        }
    }
    async joinFriend(client, data) {
        if (data.targetId && data.u_id) {
            const roomId = data.u_id > data.targetId
                ? data.u_id + data.targetId
                : data.targetId + data.u_id;
            client.join(roomId);
            this.server.to(data.u_id).emit('joinFriendSocket', {
                code: enum_1.MessageCodeEnum.OK,
                msg: 'success',
                data,
            });
        }
    }
    async friendMessage(id, client, data) {
        if (id === data.u_id) {
            if (data.u_id && data.targetId) {
                const roomId = data.u_id > data.targetId
                    ? data.u_id + data.targetId
                    : data.targetId + data.u_id;
                if (data.messageType === enum_1.MessageTypeEnum.IMAGE) {
                }
                const res = await this.messageRepository.save(data);
                this.server.to(roomId).emit('friendMessage', {
                    code: enum_1.MessageCodeEnum.OK,
                    msg: '',
                    data: res,
                });
            }
        }
        else {
            this.server.to(data.u_id).emit('friendMessage', {
                code: enum_1.MessageCodeEnum.FAIL,
                msg: 'You cannot send message',
                data,
            });
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_payload_dto_1.MessagePayloadDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "message", null);
__decorate([
    websockets_1.SubscribeMessage('joinFriendSocket'),
    __param(0, websockets_1.ConnectedSocket()),
    __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        user_map_dto_1.UserMapDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "joinFriend", null);
__decorate([
    websockets_1.SubscribeMessage('friendMessage'),
    __param(0, decorators_1.AuthUser('id')),
    __param(1, websockets_1.ConnectedSocket()),
    __param(2, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket,
        message_payload_dto_1.MessagePayloadDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "friendMessage", null);
SocketGateway = __decorate([
    websockets_1.WebSocketGateway(options),
    __param(0, typeorm_1.InjectRepository(message_entity_1.MessageEntity)),
    __param(1, typeorm_1.InjectRepository(socket_entity_1.SocketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map