import { randomUUID } from "node:crypto";

export class CommerceError extends Error {
  constructor(status, code, detail, fieldErrors = {}) {
    super(detail); this.status = status; this.code = code; this.fieldErrors = fieldErrors;
  }
}

export function quote(cart, books) {
  const items = Object.entries(cart).map(([id, quantity]) => {
    const book = books.find((candidate) => candidate.id === id);
    if (!book || !book.forSale || quantity < 1 || quantity > book.stock) throw new CommerceError(409, "CART_CHANGED", "A book is no longer available in the requested quantity.");
    return { bookId: id, title: book.title, author: book.author, format: book.format, unitPrice: book.price, quantity, lineTotal: book.price * quantity };
  });
  if (!items.length) throw new CommerceError(400, "EMPTY_CART", "Add at least one book before checkout.");
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal >= 40 ? 0 : 5;
  const tax = 0;
  return { id: randomUUID(), currency: "USD", items, subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export function validateCheckout(customer) {
  const fields = {};
  if (!customer?.name?.trim()) fields.name = "Enter your full name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer?.email ?? "")) fields.email = "Enter a valid email address.";
  if (!customer?.address?.trim()) fields.address = "Enter a delivery address.";
  if (Object.keys(fields).length) throw new CommerceError(422, "VALIDATION_ERROR", "Correct the highlighted checkout fields.", fields);
}

export function createOrder({ quote: orderQuote, customer, paymentOutcome, providerReference, idempotencyKey }) {
  validateCheckout(customer);
  const createdAt = new Date().toISOString();
  return {
    reference: `FOL-${createdAt.slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 8).toUpperCase()}`,
    idempotencyKey, createdAt, status: paymentOutcome === "Paid" ? "Confirmed" : "Payment failed",
    payment: { outcome: paymentOutcome, providerReference }, customer: { name: customer.name.trim(), email: customer.email.trim(), address: customer.address.trim() },
    ...orderQuote
  };
}

export function requireRole(headers, role) {
  if (headers["x-local-admin-token"] !== "folio-local-admin" || headers["x-local-role"] !== role) throw new CommerceError(403, "FORBIDDEN", "This local staff role is not authorized for the action.");
}
