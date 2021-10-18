import { AbstractDto } from '../../../common/constants';
import { MessageStatusEnum, MessageTypeEnum } from '../enum';
import { MessageEntity } from '../entities/message.entity';
export declare class MessageDto extends AbstractDto {
    u_id: string;
    targetId: string;
    content: string;
    messageType: MessageTypeEnum;
    status: MessageStatusEnum;
    constructor(socket: MessageEntity);
}
