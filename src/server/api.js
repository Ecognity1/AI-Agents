import { createHash, randomUUID } from "node:crypto";
import { CommerceError, createOrder, quote, requireRole, validateCheckout } from "./commerce.js";
import { LocalNotificationAdapter, LocalPaymentAdapter, LOCAL_ADAPTER_WARNING } from "./local-adapters.js";

const json = (res, status, body) => { res.statusCode = status; res.setHeader("content-type", "application/json"); res.end(JSON.stringify(body)); };
const body = async (req) => { const chunks = []; for await (const chunk of req) chunks.push(chunk); try { return JSON.parse(Buffer.concat(chunks).toString() || "{}"); } catch { throw new CommerceError(400, "INVALID_JSON", "The request body is not valid JSON."); } };
const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");

export function createApi(repository, { payment = new LocalPaymentAdapter(), notification = new LocalNotificationAdapter() } = {}) {
  return async (req, res, next) => {
    if (!req.url.startsWith("/api/v1/")) return next();
    const correlationId = randomUUID(); const url = new URL(req.url, "http://local"); const parts = url.pathname.split("/").filter(Boolean);
    try {
      if (req.method === "GET" && url.pathname === "/api/v1/status") return json(res, 200, { environment: "local-development", warning: LOCAL_ADAPTER_WARNING });
      if (req.method === "GET" && url.pathname === "/api/v1/books") {
        const data = await repository.read(); return json(res, 200, data.books.filter((book) => book.forSale));
      }
      if (req.method === "POST" && url.pathname === "/api/v1/checkouts/quotes") {
        const input = await body(req); const data = await repository.read(); return json(res, 200, quote(input.cart ?? {}, data.books));
      }
      if (req.method === "POST" && url.pathname === "/api/v1/orders") {
        const input = await body(req); const key = req.headers["idempotency-key"];
        if (!key || key.length < 8) throw new CommerceError(400, "IDEMPOTENCY_REQUIRED", "A valid idempotency key is required.");
        validateCheckout(input.customer); const requestHash = digest(input);
        const result = await repository.update(async (data) => {
          const previous = data.idempotency[key];
          if (previous) { if (previous.requestHash !== requestHash) throw new CommerceError(409, "IDEMPOTENCY_CONFLICT", "This checkout key was already used for different details."); return data.orders.find((order) => order.reference === previous.reference); }
          const authoritativeQuote = quote(input.cart ?? {}, data.books);
          const paymentResult = await payment.charge({ token: input.paymentToken, amount: authoritativeQuote.total, idempotencyKey: key });
          if (paymentResult.outcome !== "Paid") throw new CommerceError(402, paymentResult.outcome === "Declined" ? "PAYMENT_DECLINED" : "PAYMENT_UNKNOWN", paymentResult.outcome === "Declined" ? "The local payment was declined. Review the details and retry." : "The payment outcome is unknown. Do not resubmit with a new key.");
          const order = createOrder({ quote: authoritativeQuote, customer: input.customer, paymentOutcome: paymentResult.outcome, providerReference: paymentResult.reference, idempotencyKey: key });
          for (const item of order.items) data.books.find((book) => book.id === item.bookId).stock -= item.quantity;
          data.orders.push(order); data.idempotency[key] = { requestHash, reference: order.reference }; data.audit.push({ at: order.createdAt, action: "ORDER_CREATED", resource: order.reference, outcome: "success", correlationId }); return order;
        });
        await notification.sendConfirmation(result); return json(res, 201, result);
      }
      if (req.method === "GET" && parts[2] === "orders" && parts[4] === "confirmation") {
        const data = await repository.read(); const order = data.orders.find((candidate) => candidate.reference === parts[3]); if (!order) throw new CommerceError(404, "ORDER_NOT_FOUND", "Order not found."); return json(res, 200, order);
      }
      if (url.pathname.startsWith("/api/v1/admin/books")) {
        requireRole(req.headers, "CatalogAdmin");
        if (req.method === "GET" && parts.length === 4) { const data = await repository.read(); return json(res, 200, data.books); }
        const data = await body(req); const result = await repository.update((state) => {
          const bookId = parts[4] ?? data.id;
          const index = state.books.findIndex((book) => book.id === bookId);
          if (req.method === "POST" && index < 0) { if (!data.id || !data.title || !data.author || !data.format || !(data.price > 0)) throw new CommerceError(422, "VALIDATION_ERROR", "Complete the required book fields."); state.books.push({ ...data, stock: Number(data.stock) || 0, forSale: Boolean(data.forSale), version: 1 }); }
          else if (req.method === "PATCH" && index >= 0) state.books[index] = { ...state.books[index], ...data, version: state.books[index].version + 1 };
          else throw new CommerceError(404, "BOOK_NOT_FOUND", "Book not found.");
          state.audit.push({ at: new Date().toISOString(), action: "CATALOG_CHANGED", resource: bookId, outcome: "success", correlationId }); return state.books[index] ?? state.books.at(-1);
        }); return json(res, 200, result);
      }
      if (req.method === "GET" && parts[2] === "admin" && parts[3] === "orders") {
        requireRole(req.headers, "OrderOperator"); const data = await repository.read();
        if (!parts[4]) return json(res, 200, [...data.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
        const order = data.orders.find((candidate) => candidate.reference === parts[4]); if (!order) throw new CommerceError(404, "ORDER_NOT_FOUND", "Order not found."); return json(res, 200, order);
      }
      throw new CommerceError(404, "NOT_FOUND", "The requested local API resource was not found.");
    } catch (error) {
      const safe = error instanceof CommerceError ? error : new CommerceError(500, "INTERNAL_ERROR", "The local service could not complete the request.");
      return json(res, safe.status, { type: "about:blank", title: safe.code.replaceAll("_", " "), status: safe.status, code: safe.code, detail: safe.message, fieldErrors: safe.fieldErrors, correlationId });
    }
  };
}
