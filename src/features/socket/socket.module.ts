import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { SocketGateway } from './socket.gateway';
import { SocketEntity } from './entities/socket.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, SocketEntity])],
  providers: [SocketGateway],
})
export class SocketModule {}
