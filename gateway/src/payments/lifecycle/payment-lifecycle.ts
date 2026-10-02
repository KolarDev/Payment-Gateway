/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PaymentStatus } from '@prisma/client';
import { PaymentEvent } from './payment-event.enum';

type TransitionTable = {
  [state in PaymentStatus]?: {
    [event in PaymentEvent]?: PaymentStatus;
  };
};

const TRANSITIONS: TransitionTable = {
  PENDING: {
    [PaymentEvent.AUTHORIZE_SUCCEEDED]: PaymentStatus.AUTHORIZED,
    [PaymentEvent.AUTHORIZE_FAILED]: PaymentStatus.FAILED,
  },
  AUTHORIZED: {
    [PaymentEvent.CAPTURE]: PaymentStatus.CAPTURED,
    [PaymentEvent.VOID]: PaymentStatus.VOIDED,
  },
  CAPTURED: {
    [PaymentEvent.REFUND]: PaymentStatus.REFUNDED,
  },
};

export class InvalidPaymentTransitionError extends Error {
  constructor(from: PaymentStatus, event: PaymentEvent) {
    super(`Cannot apply ${event} to payment in state ${from}`);
  }
}

export class PaymentLifecycle {
  applyEvent(currentStatus: PaymentStatus, event: PaymentEvent): PaymentStatus {
    const nextStatus = TRANSITIONS[currentStatus]?.[event];
    if (!nextStatus) {
      throw new InvalidPaymentTransitionError(currentStatus, event);
    }
    return nextStatus;
  }
}
