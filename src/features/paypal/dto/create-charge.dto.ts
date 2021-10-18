import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChargeDto {
  // an id sent by our frontend app after saving the credit card details
  @ApiProperty({
    name: 'amount',
  })
  @IsNumber()
  amount: number;
}

export default CreateChargeDto;
