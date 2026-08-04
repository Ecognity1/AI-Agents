import "./styles.css";
import { books as seedBooks, categories } from "./catalog.js";
import { addCartItem, cartSummary, filterBooks, formatMoney, setCartQuantity } from "./store.js";

const STORAGE_KEY = "folio-cart-v1";
const app = document.querySelector("#app");
const state = {
  query: "", category: "All books", format: "All formats", maxPrice: 50, availability: "available", sort: "featured", selectedBook: null, cartOpen: false,
  checkoutOpen: false, checkoutPayment: "local-success", adminOpen: false, adminResult: null, adminOrders: [], order: null, returnFocus: null, cart: readCart(), notice: "", books: seedBooks
};

const adminHeaders = (role) => ({ "x-local-admin-token": "folio-local-admin", "x-local-role": role });

function readCart() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}; } catch { return {}; }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

function cover(book, large = false) {
  return `<div class="book-cover cover-${book.color} ${large ? "book-cover-large" : ""}" role="img" aria-label="Cover of ${book.title}">
    <span class="cover-mark">FOLIO</span><strong>${book.initials}</strong><small>${book.author}</small>
  </div>`;
}

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bag: '<path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>'
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths[name]}</svg>`;
}

function render() {
  const books = state.books;
  const visibleBooks = filterBooks(books, state);
  const summary = cartSummary(state.cart, books);
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="#" aria-label="Folio home"><span>F</span>Folio</a>
      <nav aria-label="Primary navigation"><a href="#catalog">Shop</a><a href="#story">Our story</a><button data-action="admin">Staff</button></nav>
      <button class="bag-button" data-action="cart" aria-label="Open shopping bag, ${summary.itemCount} items">${icon("bag")}<span>Bag</span><b>${summary.itemCount}</b></button>
    </header>
    <main>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy"><p class="eyebrow">Independent bookseller · Est. 2026</p><h1 id="hero-title">Books worth<br><em>keeping.</em></h1><p>Thoughtful stories and enduring ideas, selected for curious minds and beautiful shelves.</p><a class="primary-link" href="#catalog">Explore the collection ${icon("arrow")}</a></div>
        <div class="hero-art" aria-hidden="true"><div class="arch"></div><div class="hero-book hero-book-one">ESSAYS<br><small>ON FORM</small></div><div class="hero-book hero-book-two">THE<br>OPEN<br>SEA</div><span class="orbit">✦</span></div>
      </section>
      <section class="trust-bar" aria-label="Store benefits"><span>${icon("check")} Curated by real readers</span><span>${icon("check")} Free shipping over $40</span><span>${icon("check")} 30-day returns</span></section>
      <section class="catalog" id="catalog" aria-labelledby="catalog-title">
        <div class="section-heading"><div><p class="eyebrow">The collection</p><h2 id="catalog-title">Find your next read</h2></div><p>Discover ${books.length} titles chosen for substance, craft, and staying power.</p></div>
        <div class="catalog-tools">
          <div class="search-field">${icon("search")}<label class="sr-only" for="search">Search by title, author, or ISBN</label><input id="search" type="search" placeholder="Search title, author, or ISBN" value="${escapeHtml(state.query)}"></div>
          <div class="category-list" role="group" aria-label="Book categories">${categories.map((category) => `<button class="category ${state.category === category ? "active" : ""}" data-category="${category}">${category}</button>`).join("")}</div>
          <label class="sort-label">Sort <select id="sort"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label>
          <div class="refinements"><label>Format <select id="format"><option>All formats</option><option>Hardcover</option><option>Paperback</option></select></label><label>Maximum price <input id="max-price" type="range" min="15" max="50" value="${state.maxPrice}"><output>${formatMoney(state.maxPrice)}</output></label><label><input id="availability" type="checkbox" ${state.availability === "available" ? "checked" : ""}> In stock only</label><button data-action="clear-filters">Clear filters</button></div>
        </div>
        <div class="results-meta" aria-live="polite"><span>${visibleBooks.length} ${visibleBooks.length === 1 ? "book" : "books"}</span>${state.query ? `<button data-action="clear-search">Clear search</button>` : ""}</div>
        ${visibleBooks.length ? `<div class="book-grid">${visibleBooks.map(bookCard).join("")}</div>` : emptyState()}
      </section>
      <section class="story" id="story"><div><p class="eyebrow">Our point of view</p><h2>Less noise.<br>Better books.</h2></div><div><p>We believe a bookstore should feel like a trusted recommendation, not an endless warehouse. Every Folio title is selected for the idea, story, or perspective it brings into your life.</p><a href="#catalog">Browse all books ${icon("arrow")}</a></div></section>
      <section class="newsletter"><p class="eyebrow">The Folio letter</p><h2>One considered recommendation,<br>delivered every Sunday.</h2><form id="newsletter"><label class="sr-only" for="email">Email address</label><input id="email" type="email" required placeholder="Your email address"><button>Join the letter ${icon("arrow")}</button></form><small>No noise. Unsubscribe anytime.</small></section>
    </main>
    <footer><a class="brand brand-light" href="#"><span>F</span>Folio</a><p>Books for a well-read life.</p><div><a href="#catalog">Shop</a><a href="#story">About</a><a href="mailto:hello@folio.example">Contact</a></div><small>© 2026 Folio Books</small></footer>
    ${state.cartOpen ? cartDrawer(summary) : ""}
    ${state.selectedBook ? detailDialog(state.selectedBook) : ""}
    ${state.checkoutOpen ? checkoutDialog(summary) : ""}
    ${state.adminOpen ? adminDialog() : ""}
    ${state.order ? confirmationDialog(state.order) : ""}
    ${state.notice ? `<div class="toast" role="status">${icon("check")} ${state.notice}</div>` : ""}
  `;
  const sort = document.querySelector("#sort"); if (sort) sort.value = state.sort;
  const format = document.querySelector("#format"); if (format) format.value = state.format;
  attachEvents();
}

function bookCard(book) {
  return `<article class="book-card"><button class="cover-button" data-detail="${book.id}" aria-label="View ${book.title}">${book.badge ? `<span class="badge">${book.badge}</span>` : ""}${cover(book)}</button><div class="book-info"><p>${book.category} · ${book.format}</p><button class="title-button" data-detail="${book.id}"><h3>${book.title}</h3></button><span>by ${book.author}</span><div class="book-meta"><strong>${formatMoney(book.price)}</strong><span class="rating">${icon("star")} ${book.rating} <small>(${book.reviews})</small></span></div><button class="add-button" data-add="${book.id}">Add to bag</button></div></article>`;
}

function emptyState() {
  return `<div class="empty-state"><span>∅</span><h3>No books found</h3><p>Try another search or browse the full collection.</p><button class="primary-button" data-action="reset">View all books</button></div>`;
}

function detailDialog(book) {
  return `<div class="modal-backdrop" data-action="close-detail"><section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" tabindex="-1" data-modal><button class="icon-button close" data-action="close-detail" aria-label="Close book details">${icon("close")}</button>${cover(book, true)}<div class="detail-copy"><p class="eyebrow">${book.category} · ${book.format}</p><h2 id="detail-title">${book.title}</h2><p class="detail-author">by ${book.author}</p><div class="rating detail-rating">${icon("star")} ${book.rating} <span>${book.reviews} reader reviews</span></div><p class="description">${book.description}</p><dl><div><dt>Format</dt><dd>${book.format}</dd></div><div><dt>ISBN</dt><dd>${book.isbn}</dd></div><div><dt>Availability</dt><dd class="in-stock">In stock · ${book.stock} available</dd></div></dl><div class="detail-buy"><strong>${formatMoney(book.price)}</strong><button class="primary-button" data-add="${book.id}">Add to bag</button></div></div></section></div>`;
}

function cartDrawer(summary) {
  return `<div class="drawer-backdrop" data-action="close-cart"><aside class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1" data-modal><div class="drawer-header"><div><p class="eyebrow">Your selection</p><h2 id="cart-title">Shopping bag <span>${summary.itemCount}</span></h2></div><button class="icon-button" data-action="close-cart" aria-label="Close shopping bag">${icon("close")}</button></div>${summary.items.length ? `<div class="cart-items">${summary.items.map(cartItem).join("")}</div><div class="cart-summary"><div><span>Subtotal</span><strong>${formatMoney(summary.subtotal)}</strong></div><div><span>Shipping</span><strong>${summary.shipping ? formatMoney(summary.shipping) : "Free"}</strong></div><div class="total"><span>Total</span><strong>${formatMoney(summary.total)}</strong></div><p>Taxes calculated at checkout.</p><button class="checkout-button" data-action="checkout">Secure checkout ${icon("arrow")}</button></div>` : `<div class="empty-cart">${icon("bag")}<h3>Your bag is empty</h3><p>A good book is waiting for you.</p><button class="primary-button" data-action="close-cart">Browse books</button></div>`}</aside></div>`;
}

function cartItem(item) {
  return `<article class="cart-item">${cover(item)}<div><p>${item.format}</p><h3>${item.title}</h3><span>${item.author}</span><div class="quantity"><button data-quantity="${item.id}" data-value="${item.quantity - 1}" aria-label="Decrease ${item.title} quantity">−</button><span aria-label="Quantity">${item.quantity}</span><button data-quantity="${item.id}" data-value="${item.quantity + 1}" aria-label="Increase ${item.title} quantity">+</button></div></div><strong>${formatMoney(item.lineTotal)}</strong><button class="remove" data-quantity="${item.id}" data-value="0">Remove</button></article>`;
}

function checkoutDialog(summary) {
  return `<div class="modal-backdrop"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" tabindex="-1" data-modal><button class="icon-button close" data-action="close-checkout" aria-label="Close checkout">${icon("close")}</button><p class="eyebrow">Secure local checkout</p><h2 id="checkout-title">Complete your order</h2><div id="checkout-error" class="state-panel error" role="alert" hidden></div><form id="checkout-form" class="checkout-layout"><div class="form-card"><label>Full name<input name="name" required autocomplete="name"><small data-field="name"></small></label><label>Email<input name="email" type="email" required autocomplete="email"><small data-field="email"></small></label><label>Delivery address<textarea name="address" required autocomplete="street-address"></textarea><small data-field="address"></small></label><fieldset><legend>Payment (development adapter)</legend><label><input type="radio" name="paymentToken" value="local-success" checked> Simulate success</label><label><input type="radio" name="paymentToken" value="local-decline"> Simulate decline</label><p>No card details are collected.</p></fieldset></div><aside class="order-review"><h3>Order review</h3>${summary.items.map((item) => `<p><span>${item.title} × ${item.quantity}</span><strong>${formatMoney(item.lineTotal)}</strong></p>`).join("")}<p><span>Shipping</span><strong>${summary.shipping ? formatMoney(summary.shipping) : "Free"}</strong></p><p><span>Tax</span><strong>${formatMoney(0)}</strong></p><p class="total"><span>Total</span><strong>${formatMoney(summary.total)}</strong></p><button class="checkout-button" id="place-order">Place local order</button></aside></form><p class="dev-note"><strong>Development only:</strong> payment, notification and identity are local adapters, not production integrations.</p></section></div>`;
}

function confirmationDialog(order) {
  return `<div class="modal-backdrop"><section class="checkout-modal confirmation" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" tabindex="-1" data-modal><p class="eyebrow">Order confirmed</p><h2 id="confirmation-title">Thank you, ${escapeHtml(order.customer.name)}.</h2><p>Your durable order reference is <strong>${order.reference}</strong>.</p><div class="order-review">${order.items.map((item) => `<p><span>${item.title} × ${item.quantity}</span><strong>${formatMoney(item.lineTotal)}</strong></p>`).join("")}<p class="total"><span>Total</span><strong>${formatMoney(order.total)}</strong></p><p>Delivery to ${escapeHtml(order.customer.address)}</p></div><p>For support, email hello@folio.example with your order reference.</p><button class="primary-button" data-action="close-confirmation">Continue shopping</button></section></div>`;
}

function legacyAdminDialog() {
  const books = state.books;
  return `<div class="modal-backdrop"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="admin-title" tabindex="-1" data-modal><button class="icon-button close" data-action="close-admin" aria-label="Close staff console">${icon("close")}</button><p class="eyebrow">Local staff console</p><h2 id="admin-title">Catalog & order operations</h2><p class="dev-note">Development authorization uses explicit role-scoped local headers. Production requires an approved workforce identity provider.</p><div class="checkout-layout"><form id="catalog-admin" class="form-card"><h3>Update sale availability</h3><label>Book<select name="id">${books.map((book) => `<option value="${book.id}">${book.title}</option>`).join("")}</select></label><label>Stock<input name="stock" type="number" min="0" required></label><label><input name="forSale" type="checkbox" checked> Available for sale</label><button class="primary-button">Save audited change</button></form><form id="order-admin" class="form-card"><h3>Find an order</h3><label>Order reference<input name="reference" required placeholder="FOL-…"></label><button class="primary-button">Find authorized order</button></form></div>${state.adminResult ? `<pre class="state-panel">${escapeHtml(JSON.stringify(state.adminResult, null, 2))}</pre>` : ""}</section></div>`;
}

function adminDialog() {
  const books = state.books;
  const orders = state.adminOrders.length
    ? state.adminOrders.map((order) => `<button type="button" class="order-list-item" data-order-reference="${order.reference}"><strong>${order.reference}</strong><span>${escapeHtml(order.customer.name)} · ${formatMoney(order.total)}</span><small>${new Date(order.createdAt).toLocaleString()} · ${order.status}</small></button>`).join("")
    : "<p>No placed orders yet.</p>";
  return `<div class="modal-backdrop"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="admin-title" tabindex="-1" data-modal><button class="icon-button close" data-action="close-admin" aria-label="Close staff console">${icon("close")}</button><p class="eyebrow">Local staff console</p><h2 id="admin-title">Catalog & order operations</h2><p class="dev-note">Development authorization uses explicit role-scoped local headers. Production requires an approved workforce identity provider.</p><div class="checkout-layout"><form id="catalog-admin" class="form-card"><h3>Update sale availability</h3><label>Book<select name="id">${books.map((book) => `<option value="${book.id}">${book.title}</option>`).join("")}</select></label><label>Stock<input name="stock" type="number" min="0" required></label><label><input name="forSale" type="checkbox" checked> Available for sale</label><button class="primary-button">Save audited change</button></form><div class="form-card"><h3>Placed orders</h3><button type="button" class="primary-button" data-action="refresh-orders">Refresh placed orders</button><div class="admin-orders">${orders}</div></div></div>${state.adminResult ? `<pre class="state-panel">${escapeHtml(JSON.stringify(state.adminResult, null, 2))}</pre>` : ""}</section></div>`;
}

function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }

function closeOverlays() { const selector = state.returnFocus; state.selectedBook = null; state.cartOpen = false; state.checkoutOpen = false; state.adminOpen = false; render(); if (selector) requestAnimationFrame(() => document.querySelector(selector)?.focus()); }

function announce(message) { state.notice = message; render(); window.setTimeout(() => { state.notice = ""; render(); }, 2200); }

function attachEvents() {
  const books = state.books;
  const successPayment = document.querySelector('input[name="paymentToken"][value="local-success"]');
  const declinePayment = document.querySelector('input[name="paymentToken"][value="local-decline"]');
  if (successPayment) {
    successPayment.closest("fieldset")?.classList.add("payment-simulator");
    successPayment.closest("label")?.insertAdjacentHTML("beforeend", "<small>Places and persists this local test order.</small>");
    declinePayment?.closest("label")?.insertAdjacentHTML("beforeend", "<small>Exercises payment recovery; no order is created.</small>");
  }
  document.querySelector("#search")?.addEventListener("input", (event) => { state.query = event.target.value; render(); document.querySelector("#search")?.focus(); });
  document.querySelector("#sort")?.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
  document.querySelector("#format")?.addEventListener("change", (event) => { state.format = event.target.value; render(); });
  document.querySelector("#availability")?.addEventListener("change", (event) => { state.availability = event.target.checked ? "available" : "all"; render(); });
  document.querySelector("#max-price")?.addEventListener("change", (event) => { state.maxPrice = Number(event.target.value); render(); });
  document.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => { state.category = button.dataset.category; render(); }));
  document.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => { state.returnFocus = `[data-detail="${button.dataset.detail}"]`; state.selectedBook = books.find((book) => book.id === button.dataset.detail); render(); document.querySelector("[data-modal]")?.focus(); }));
  document.querySelectorAll("[data-add]").forEach((button) => button.addEventListener("click", () => { const book = books.find((item) => item.id === button.dataset.add); state.cart = addCartItem(state.cart, book.id, book.stock); state.selectedBook = null; saveCart(); announce(`${book.title} added to your bag`); }));
  document.querySelectorAll("[data-quantity]").forEach((button) => button.addEventListener("click", () => { const book = books.find((item) => item.id === button.dataset.quantity); state.cart = setCartQuantity(state.cart, book.id, button.dataset.value, book.stock); saveCart(); render(); }));
  document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", (event) => {
    if (event.target !== button && (button.dataset.action === "close-cart" || button.dataset.action === "close-detail")) return;
    const action = button.dataset.action;
    if (action === "cart") { state.returnFocus = "[data-action=cart]"; state.cartOpen = true; render(); document.querySelector("[data-modal]")?.focus(); }
    if (action === "close-cart" || action === "close-detail" || action === "close-checkout" || action === "close-admin") closeOverlays();
    if (action === "close-confirmation") { state.order = null; render(); }
    if (action === "clear-search") { state.query = ""; render(); }
    if (action === "reset" || action === "clear-filters") { state.query = ""; state.category = "All books"; state.format = "All formats"; state.maxPrice = 50; state.availability = "available"; render(); }
    if (action === "checkout") { state.cartOpen = false; state.checkoutPayment = "local-success"; sessionStorage.removeItem("folio-checkout-key"); state.checkoutOpen = true; render(); document.querySelector("[data-modal]")?.focus(); }
    if (action === "admin") { state.returnFocus = "[data-action=admin]"; state.adminOpen = true; render(); loadAdminOrders(); document.querySelector("[data-modal]")?.focus(); }
    if (action === "refresh-orders") loadAdminOrders();
  }));
  document.querySelector("#checkout-form")?.addEventListener("submit", submitOrder);
  document.querySelectorAll('input[name="paymentToken"]').forEach((radio) => radio.addEventListener("change", (event) => {
    state.checkoutPayment = event.target.value;
    sessionStorage.removeItem("folio-checkout-key");
    const panel = document.querySelector("#checkout-error");
    if (panel) panel.hidden = true;
  }));
  document.querySelector("#catalog-admin")?.addEventListener("submit", updateCatalog);
  document.querySelectorAll("[data-order-reference]").forEach((button) => button.addEventListener("click", () => findOrder(button.dataset.orderReference)));
  document.querySelector("#newsletter")?.addEventListener("submit", (event) => { event.preventDefault(); event.target.reset(); announce("Welcome to the Folio letter."); });
}

async function submitOrder(event) {
  event.preventDefault(); const form = new FormData(event.currentTarget); const button = document.querySelector("#place-order"); button.disabled = true; button.textContent = "Processing safely…";
  const payload = { cart: state.cart, customer: { name: form.get("name"), email: form.get("email"), address: form.get("address") }, paymentToken: form.get("paymentToken") };
  const key = sessionStorage.getItem("folio-checkout-key") ?? crypto.randomUUID(); sessionStorage.setItem("folio-checkout-key", key);
  try {
    const response = await fetch("/api/v1/orders", { method: "POST", headers: { "content-type": "application/json", "Idempotency-Key": key }, body: JSON.stringify(payload) });
    const contentType = response.headers.get("content-type") ?? "";
    const result = contentType.includes("application/json") ? await response.json() : { detail: `The local order API returned an unexpected response (${response.status}). Start Folio with npm run dev or npm run preview and retry.` };
    if (!response.ok) throw result; sessionStorage.removeItem("folio-checkout-key"); state.order = result; state.checkoutOpen = false; state.cart = {}; saveCart(); await loadBooks(); render(); document.querySelector("[data-modal]")?.focus();
  } catch (problem) {
    if (problem.code === "PAYMENT_DECLINED") sessionStorage.removeItem("folio-checkout-key");
    const panel = document.querySelector("#checkout-error"); panel.hidden = false; panel.textContent = problem.code === "PAYMENT_DECLINED" ? "Test payment declined as selected. Your details are preserved. Select ‘Simulate success’ and retry to place the order." : problem.detail ?? "The local order service could not be reached. Your details are preserved; verify the Folio server is running and retry.";
    for (const [field, message] of Object.entries(problem.fieldErrors ?? {})) document.querySelector(`[data-field="${field}"]`).textContent = message;
    button.disabled = false; button.textContent = "Retry local order";
  }
}

async function updateCatalog(event) {
  event.preventDefault(); const form = new FormData(event.currentTarget);
  try { const response = await fetch(`/api/v1/admin/books/${form.get("id")}`, { method: "PATCH", headers: { "content-type": "application/json", ...adminHeaders("CatalogAdmin") }, body: JSON.stringify({ stock: Number(form.get("stock")), forSale: form.get("forSale") === "on" }) }); const result = await response.json(); if (!response.ok) throw result; state.adminResult = { message: "Sale availability saved.", book: result }; await loadAdminOrders(); } catch (problem) { state.adminResult = { detail: problem.detail ?? "The local catalog service is unavailable. Retry safely." }; } render();
}

async function loadBooks() {
  try { const response = await fetch("/api/v1/books"); if (!response.ok) throw new Error(); state.books = await response.json(); } catch { state.books = seedBooks; }
}

async function loadAdminOrders() {
  try {
    const [ordersResponse, booksResponse] = await Promise.all([
      fetch("/api/v1/admin/orders", { headers: adminHeaders("OrderOperator") }),
      fetch("/api/v1/admin/books", { headers: adminHeaders("CatalogAdmin") })
    ]);
    const [orders, books] = await Promise.all([ordersResponse.json(), booksResponse.json()]);
    if (!ordersResponse.ok) throw orders;
    if (!booksResponse.ok) throw books;
    state.adminOrders = orders; state.books = books;
  } catch (problem) { state.adminResult = { detail: problem.detail ?? "The local staff service is unavailable. Retry safely." }; } render();
}

async function findOrder(reference) {
  try { const response = await fetch(`/api/v1/admin/orders/${encodeURIComponent(reference)}`, { headers: adminHeaders("OrderOperator") }); const result = await response.json(); if (!response.ok) throw result; state.adminResult = result; } catch (problem) { state.adminResult = { detail: problem.detail ?? "The local order service is unavailable. Retry safely." }; } render();
}

document.addEventListener("keydown", (event) => { if (event.key === "Escape" && (state.cartOpen || state.selectedBook || state.checkoutOpen || state.adminOpen)) closeOverlays(); });
loadBooks().finally(render);
