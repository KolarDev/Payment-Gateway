import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsIn,
  ValidateNested,
  Length,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

// No need to do all validations in the main logic,
// we can use class-validator to validate the input data before processing it.

// Validation DTO for card details.
class CardDto {
  @IsString()
  @Matches(/^\d{13,19}$/, { message: 'Card number must be 13-19 digits' })
  number: string;

  @IsString()
  @Length(3, 4, { message: 'CVV must be 3 or 4 digits' })
  cvv: string;

  @IsInt()
  @Min(1)
  @Max(12, { message: 'Expiry month must be between 1 and 12' })
  expiryMonth: number;

  @IsInt()
  @Min(new Date().getFullYear(), {
    message: 'Expiry year cannot be in the past',
  })
  expiryYear: number;
}

// Validation DTO for creating a payment.
export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsInt({ message: 'amount must be an integer number of cents' })
  @Min(1, { message: 'amount must be greater than zero' })
  amount: number;

  @IsOptional()
  @IsString()
  @IsIn(['USD'], { message: 'Only USD is supported' })
  currency?: string;

  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;
}
