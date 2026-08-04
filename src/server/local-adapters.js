export class LocalPaymentAdapter {
  async charge({ token, idempotencyKey }) {
    if (token === "local-decline") return { outcome: "Declined", reference: `local-declined-${idempotencyKey}` };
    if (token !== "local-success") return { outcome: "Unknown", reference: `local-unknown-${idempotencyKey}` };
    return { outcome: "Paid", reference: `local-paid-${idempotencyKey}` };
  }
}

export class LocalNotificationAdapter {
  async sendConfirmation(order) { return { status: "RecordedLocally", reference: `local-notification-${order.reference}` }; }
}

export const LOCAL_ADAPTER_WARNING = "Development adapters only: no real payment, identity, notification, tax, or fulfillment integration is active.";
