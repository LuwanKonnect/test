import { CreateItemDto } from './create-item.dto';
import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IFile } from '../../../common/interfaces';
import { ItemDto } from './item.dto';

export class UpdateItemDto extends PartialType(
  OmitType(ItemDto, ['i_id', 'created', 'updated'] as const),
) {
  @ApiPropertyOptional({
    description: 'images be deleted, separate by comma, image1,image2',
  })
  @IsString()
  @IsOptional()
  deletedImages: string;

  @ApiPropertyOptional({
    description: 'new file',
  })
  @IsOptional()
  newImages: [IFile];

  @ApiProperty({
    description: 'item ID, must provide',
  })
  @IsNumber()
  i_id: number;
}
