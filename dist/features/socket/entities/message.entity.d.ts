import { AbstractEntity } from '../../../common/constants';
import { MessageDto } from '../dto/message.dto';
import { MessageStatusEnum, MessageTypeEnum } from '../enum';
export declare class MessageEntity extends AbstractEntity<MessageDto> {
    u_id: string;
    targetId: string;
    content: string;
    messageType: MessageTypeEnum;
    status: MessageStatusEnum;
    dtoClass: typeof MessageDto;
}
