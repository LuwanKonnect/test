import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethodIdDto {
  @ApiProperty({
    name: 'paymentMethodId',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;
}

export default PaymentMethodIdDto;
