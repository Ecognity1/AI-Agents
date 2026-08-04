import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { books } from "../src/catalog.js";
import { CommerceError, createOrder, quote, requireRole, validateCheckout } from "../src/server/commerce.js";
import { JsonRepository } from "../src/server/repository.js";

const availableBooks = books.map((book) => ({ ...book, forSale: true }));

test("FR-004/006 server-authoritative quote rejects unavailable quantity and exposes the complete total", () => {
  const result = quote({ "after-rain": 1 }, availableBooks);
  assert.deepEqual({ subtotal: result.subtotal, shipping: result.shipping, tax: result.tax, total: result.total }, { subtotal: 18, shipping: 5, tax: 0, total: 23 });
  assert.throws(() => quote({ "after-rain": 99 }, availableBooks), (error) => error instanceof CommerceError && error.code === "CART_CHANGED");
});

test("FR-005 checkout validation returns field-specific recovery guidance", () => {
  assert.throws(() => validateCheckout({ name: "", email: "bad", address: "" }), (error) => error.status === 422 && Object.keys(error.fieldErrors).length === 3);
});

test("FR-008 durable order snapshots do not retain reusable payment credentials", () => {
  const orderQuote = quote({ "after-rain": 1 }, availableBooks);
  const order = createOrder({ quote: orderQuote, customer: { name: "Ada Reader", email: "ada@example.test", address: "1 Book Lane" }, paymentOutcome: "Paid", providerReference: "local-paid-1", idempotencyKey: "checkout-1" });
  assert.match(order.reference, /^FOL-/); assert.equal(order.items[0].unitPrice, 18); assert.equal(JSON.stringify(order).includes("paymentToken"), false);
});

test("FR-009/010 local staff authorization defaults to deny and separates roles", () => {
  assert.throws(() => requireRole({}, "CatalogAdmin"), (error) => error.status === 403);
  assert.doesNotThrow(() => requireRole({ "x-local-admin-token": "folio-local-admin", "x-local-role": "CatalogAdmin" }, "CatalogAdmin"));
  assert.throws(() => requireRole({ "x-local-admin-token": "folio-local-admin", "x-local-role": "OrderOperator" }, "CatalogAdmin"));
});

test("FR-008 local repository persists an order durably with serialized concurrent updates", async () => {
  const directory = await mkdtemp(join(tmpdir(), "folio-repository-")); const file = join(directory, "folio.json"); const repository = new JsonRepository(file);
  try {
    await Promise.all([repository.update((data) => { data.orders.push({ reference: "FOL-ONE" }); }), repository.update((data) => { data.orders.push({ reference: "FOL-TWO" }); })]);
    assert.deepEqual((await repository.read()).orders.map((order) => order.reference), ["FOL-ONE", "FOL-TWO"]);
    await assert.doesNotReject(async () => JSON.parse(await readFile(file, "utf8")));
  } finally { await rm(directory, { recursive: true, force: true }); }
});
