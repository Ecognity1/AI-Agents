import test from "node:test";
import assert from "node:assert/strict";
import { books } from "../src/catalog.js";
import { addCartItem, cartSummary, filterBooks, setCartQuantity } from "../src/store.js";

test("FR-002 searches title, author, and ISBN without mutating catalog", () => {
  assert.equal(filterBooks(books, { query: "Priya" })[0].id, "clear-decisions");
  assert.equal(filterBooks(books, { query: "1004-8" })[0].id, "small-universe");
  assert.equal(books.length, 8);
});

test("FR-001 category filter and FR-002 price sort compose", () => {
  const result = filterBooks(books, { category: "Fiction", sort: "price-low" });
  assert.deepEqual(result.map(({ id }) => id), ["after-rain", "quiet-geometry"]);
});

test("FR-004 cart quantities never exceed stock and zero removes a line", () => {
  let cart = addCartItem({}, "quiet-geometry", 1);
  cart = addCartItem(cart, "quiet-geometry", 1);
  assert.equal(cart["quiet-geometry"], 1);
  assert.deepEqual(setCartQuantity(cart, "quiet-geometry", 0, 1), {});
});

test("FR-006 summary exposes subtotal, shipping, and final total", () => {
  const lowValue = cartSummary({ "after-rain": 1 }, books);
  assert.deepEqual({ subtotal: lowValue.subtotal, shipping: lowValue.shipping, total: lowValue.total }, { subtotal: 18, shipping: 5, total: 23 });
  const freeShipping = cartSummary({ "making-space": 1 }, books);
  assert.equal(freeShipping.shipping, 0);
  assert.equal(freeShipping.total, 42);
});

test("FR-004 direct quantity updates clamp to stock and invalid values remove the line", () => {
  const cart = { "quiet-geometry": 2 };
  assert.deepEqual(setCartQuantity(cart, "quiet-geometry", 99, 8), { "quiet-geometry": 8 });
  assert.deepEqual(setCartQuantity(cart, "quiet-geometry", -1, 8), {});
  assert.deepEqual(setCartQuantity(cart, "quiet-geometry", "not-a-number", 8), {});
  assert.deepEqual(cart, { "quiet-geometry": 2 });
});

test("FR-004 stale cart identifiers do not affect displayed totals", () => {
  const summary = cartSummary({ "missing-book": 4, "after-rain": 1 }, books);
  assert.equal(summary.itemCount, 1);
  assert.equal(summary.subtotal, 18);
  assert.equal(summary.total, 23);
  assert.deepEqual(summary.items.map(({ id }) => id), ["after-rain"]);
});
