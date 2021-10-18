import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExecuteChargeDto {
  @ApiProperty({
    name: 'paymentId',
  })
  @IsString()
  @IsNotEmpty()
  paymentId: string;
  // an id sent by our frontend app after saving the credit card details
  @ApiProperty({
    name: 'amount',
  })
  @IsNumber()
  amount: number;
}

export default ExecuteChargeDto;
