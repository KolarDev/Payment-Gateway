import {
  BankAuthorizeRequest,
  BankAuthorizeResult,
  BankCaptureRequest,
  BankCaptureResult,
  BankVoidRequest,
  BankVoidResult,
  BankRefundRequest,
  BankRefundResult,
} from './bank.types';

export interface BankClient {
  authorize(
    request: BankAuthorizeRequest,
    idempotencyKey: string,
  ): Promise<BankAuthorizeResult>;
  capture(
    request: BankCaptureRequest,
    idempotencyKey: string,
  ): Promise<BankCaptureResult>;
  void(
    request: BankVoidRequest,
    idempotencyKey: string,
  ): Promise<BankVoidResult>;
  refund(
    request: BankRefundRequest,
    idempotencyKey: string,
  ): Promise<BankRefundResult>;
}
