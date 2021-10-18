import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { ItemDto } from './item.dto';
import { IsOptional, IsString } from 'class-validator';
import { IFile } from '../../../common/interfaces';

export class CreateItemDto extends OmitType(ItemDto, [
  'i_id',
  'created',
  'updated',
] as const) {
}