import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PaymentResponseDto {
  @ApiProperty({
    example: '23457897dg495-457sd',
  })
  id: string;

  @ApiProperty({
    example: 'order-123',
  })
  orderId: string;

  @ApiProperty({
    example: 99.99,
  })
  amount: number;

  @ApiProperty({
    example: 'user-348',
  })
  userId: string;

  @ApiProperty({
    example: 'mad',
  })
  currency: string;

  @ApiProperty({
    example: 'COMPLETED',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
  })
  status: string;

  @ApiProperty({
    example: 'STRIPE',
    nullable: true,
  })
  paymentMethod: string | null;

  @ApiProperty({
    example: 'pi_934570912745',
    nullable: true,
  })
  transactionId: string | null;

  @ApiProperty({})
  createdAt: Date;

  @ApiProperty({})
  updatedAt: Date;
}

export class CreatePaymentIntentResponse {
  @ApiProperty({
    example: 'pi_934570912745',
    description: 'Stripe client secret for payment confirmation',
  })
  clientSecret: string;

  @ApiProperty({
    example: '234974-465-25348567sf1257',
    description: 'Payment ID in database',
  })
  paymentId: string;
}

export class PaymentApiResponseDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    type: PaymentResponseDto,
  })
  data: PaymentResponseDto;

  @ApiProperty({
    example: 'Payment intent created successfully',
    required: false,
  })
  message?: string;
}

export class CreatePaymentIntentApiResponseDto {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    type: CreatePaymentIntentResponse,
  })
  data: CreatePaymentIntentResponse;

  @ApiProperty({
    example: 'Payment intent created successfully',
    required: false,
  })
  message?: string;
}
