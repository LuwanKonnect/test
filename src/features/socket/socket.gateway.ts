import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageCodeEnum, MessageTypeEnum } from './enum';
import { AuthUser } from '../../common/decorators';
import { MessageEntity } from './entities/message.entity';
import { MessagePayloadDto } from './dto/message-payload.dto';
import { UserMapDto } from './dto/user-map.dto';
import { SocketEntity } from './entities/socket.entity';
const options = {
  cors: {
    origin: ['http://10.13.203.18:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
@WebSocketGateway(options)
export class SocketGateway {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SocketEntity)
    private readonly socketRepository: Repository<SocketEntity>,
  ) {}

  @WebSocketServer()
  server: Server;

  // socket initial connection
  async handleConnection(client: Socket): Promise<string> {
    // console.log('connect============>', client);
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

  // socket disconnect
  async handleDisconnect(client: Socket): Promise<any> {
    // console.log('disconnect============>', client);
    console.log('disconnect', client.id);
    await this.socketRepository.update(
      {
        socketId: client.id,
      },
      { socketId: '' },
    );
  }

  // @SubscribeMessage('connection')
  // async connection(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() data: UserMapDto,
  // ): Promise<any> {
  //   console.log('chufa');
  //   console.log(client.handshake.auth);
  // }

  // can send message to anyone, no need friends relations
  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessagePayloadDto,
  ): Promise<any> {
    const res = await this.messageRepository.save(data);
    const socket = await this.socketRepository.findOne({ u_id: res.targetId });
    if (socket && socket.socketId.length > 0) {
      this.server.to(socket.socketId).emit('message', {
        code: MessageCodeEnum.OK,
        msg: 'success',
        data: res,
      });
    }
  }

  async notification(u_id: string, message: string): Promise<any> {
    const res = await this.socketRepository.findOne({ u_id });
    if (res && res.socketId.length > 0) {
      this.server.to(res.socketId).emit('message', {
        code: MessageCodeEnum.OK,
        message,
      });
    }
  }

  // Join private chat socket connection
  @SubscribeMessage('joinFriendSocket')
  async joinFriend(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UserMapDto,
  ): Promise<any> {
    if (data.targetId && data.u_id) {
      // const relation = await this.friendRepository.findOne({ u_id: data.u_id, targetId: data.targetId });
      const roomId =
        data.u_id > data.targetId
          ? data.u_id + data.targetId
          : data.targetId + data.u_id;
      // if(relation) {
      //   client.join(roomId);
      //   this.server.to(data.u_id).emit('joinFriendSocket',{ code:MessageCodeEnum.OK, msg:'success', data });
      // }
      client.join(roomId);
      this.server.to(data.u_id).emit('joinFriendSocket', {
        code: MessageCodeEnum.OK,
        msg: 'success',
        data,
      });
    }
  }

  // Send Private Message
  @SubscribeMessage('friendMessage')
  async friendMessage(
    @AuthUser('id') id: string,
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessagePayloadDto,
  ): Promise<any> {
    if (id === data.u_id) {
      if (data.u_id && data.targetId) {
        const roomId =
          data.u_id > data.targetId
            ? data.u_id + data.targetId
            : data.targetId + data.u_id;
        if (data.messageType === MessageTypeEnum.IMAGE) {
          // const randomName = `${Date.now()}$${roomId}$${data.width}$${
          //   data.height
          // }`;
          // const stream = createWriteStream(join('public/static', randomName));
          // stream.write(data.content);
          // data.content = randomName;
        }
        const res = await this.messageRepository.save(data);
        this.server.to(roomId).emit('friendMessage', {
          code: MessageCodeEnum.OK,
          msg: '',
          data: res,
        });
      }
    } else {
      this.server.to(data.u_id).emit('friendMessage', {
        code: MessageCodeEnum.FAIL,
        msg: 'You cannot send message',
        data,
      });
    }
  }
}
