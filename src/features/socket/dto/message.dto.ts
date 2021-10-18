import { AbstractDto } from '../../../common/constants';
import { Column } from 'typeorm';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MessageStatusEnum, MessageTypeEnum } from '../enum';
import { MessageEntity } from '../entities/message.entity';

export class MessageDto extends AbstractDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  u_id: string;

  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  targetId: string;

  @ApiProperty({
    description: 'Target ID',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'MessageType',
    type: MessageTypeEnum,
  })
  @IsEnum(MessageTypeEnum)
  messageType: MessageTypeEnum;

  @ApiProperty({
    description: 'Message status',
    type: MessageStatusEnum,
  })
  @IsEnum(MessageStatusEnum)
  status: MessageStatusEnum;

  constructor(socket: MessageEntity) {
    super(socket);
    this.u_id = socket.u_id;
    this.targetId = socket.targetId;
    this.content = socket.content;
    this.messageType = socket.messageType;
    this.status = socket.status;
  }
}
