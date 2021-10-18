import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/constants';
import { MessageDto } from '../dto/message.dto';
import { MessageStatusEnum, MessageTypeEnum } from '../enum';

@Entity('message')
export class MessageEntity extends AbstractEntity<MessageDto> {
  @Column()
  u_id: string;

  @Column()
  targetId: string;

  @Column()
  content: string;

  @Column()
  messageType: MessageTypeEnum;

  @Column()
  status: MessageStatusEnum;

  dtoClass = MessageDto;
}
