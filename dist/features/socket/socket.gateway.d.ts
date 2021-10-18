import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { MessagePayloadDto } from './dto/message-payload.dto';
import { UserMapDto } from './dto/user-map.dto';
import { SocketEntity } from './entities/socket.entity';
export declare class SocketGateway {
    private readonly messageRepository;
    private readonly socketRepository;
    constructor(messageRepository: Repository<MessageEntity>, socketRepository: Repository<SocketEntity>);
    server: Server;
    handleConnection(client: Socket): Promise<string>;
    handleDisconnect(client: Socket): Promise<any>;
    message(client: Socket, data: MessagePayloadDto): Promise<any>;
    notification(u_id: string, message: string): Promise<any>;
    joinFriend(client: Socket, data: UserMapDto): Promise<any>;
    friendMessage(id: string, client: Socket, data: MessagePayloadDto): Promise<any>;
}
