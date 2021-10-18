import { MessageDto } from './message.dto';
import { OmitType } from '@nestjs/swagger';

export class MessagePayloadDto extends OmitType(MessageDto, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
