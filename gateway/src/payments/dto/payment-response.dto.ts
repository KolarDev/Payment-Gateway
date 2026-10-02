import { Payment, PaymentStatus } from '@prisma/client';

export class PaymentResponseDto {
  reference: string;
  orderId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;

  static fromPayment(payment: Payment): PaymentResponseDto {
    const dto = new PaymentResponseDto();
    dto.reference = payment.reference;
    dto.orderId = payment.orderId;
    dto.customerId = payment.customerId;
    dto.amount = payment.amount;
    dto.currency = payment.currency;
    dto.status = payment.status;
    dto.failureReason = payment.failureReason;
    dto.createdAt = payment.createdAt;
    dto.updatedAt = payment.updatedAt;
    return dto;
  }
}