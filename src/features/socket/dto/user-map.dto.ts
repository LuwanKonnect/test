import { PickType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

export class UserMapDto extends PickType(MessageDto, [
  'u_id',
  'targetId',
] as const) {}
