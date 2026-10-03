export enum BankErrorCode {
  INVALID_CARD = 'invalid_card',
  INVALID_CVV = 'invalid_cvv',
  INVALID_AMOUNT = 'invalid_amount',
  CARD_EXPIRED = 'card_expired',
  INSUFFICIENT_FUNDS = 'insufficient_funds',
  MISSING_IDEMPOTENCY_KEY = 'missing_idempotency_key',
  AUTHORIZATION_NOT_FOUND = 'authorization_not_found',
  AUTHORIZATION_EXPIRED = 'authorization_expired',
  AUTHORIZATION_ALREADY_USED = 'authorization_already_used',
  ALREADY_CAPTURED = 'already_captured',
  ALREADY_VOIDED = 'already_voided',
  ALREADY_REFUNDED = 'already_refunded',
  AMOUNT_MISMATCH = 'amount_mismatch',
  CAPTURE_NOT_FOUND = 'capture_not_found',
  REFUND_NOT_FOUND = 'refund_not_found',
  NOT_FOUND = 'not_found',
  INTERNAL_ERROR = 'internal_error',
}

export interface BankDecline {
  outcome: 'declined';
  errorCode: BankErrorCode;
  message: string;
}

export interface BankCardDetails {
  cardNumber: string;
  cvv: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface BankAuthorizeRequest {
  card: BankCardDetails;
  amount: number;
}

export type BankAuthorizeResult =
  | {
      outcome: 'approved';
      authorizationId: string;
      amount: number;
      currency: string;
      expiresAt: Date;
      createdAt: Date;
    }
  | BankDecline;

export interface BankCaptureRequest {
  authorizationId: string;
  amount: number;
}

export type BankCaptureResult =
  | {
      outcome: 'captured';
      captureId: string;
      authorizationId: string;
      amount: number;
      currency: string;
      capturedAt: Date;
    }
  | BankDecline;

export interface BankVoidRequest {
  authorizationId: string;
}

export type BankVoidResult =
  | {
      outcome: 'voided';
      voidId: string;
      authorizationId: string;
      voidedAt: Date;
    }
  | BankDecline;

export interface BankRefundRequest {
  captureId: string;
  amount: number;
}

export type BankRefundResult =
  | {
      outcome: 'refunded';
      refundId: string;
      captureId: string;
      amount: number;
      currency: string;
      refundedAt: Date;
    }
  | BankDecline;
