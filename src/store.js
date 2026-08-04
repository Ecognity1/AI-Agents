export function filterBooks(books, { query = "", category = "All books", format = "All formats", maxPrice = Infinity, availability = "all", sort = "featured" } = {}) {
  const term = query.trim().toLocaleLowerCase();
  const filtered = books.filter((book) => {
    const categoryMatches = category === "All books" || book.category === category;
    const searchable = `${book.title} ${book.author} ${book.isbn}`.toLocaleLowerCase();
    const formatMatches = format === "All formats" || book.format === format;
    const priceMatches = book.price <= maxPrice;
    const availabilityMatches = availability !== "available" || (book.forSale !== false && book.stock > 0);
    return categoryMatches && formatMatches && priceMatches && availabilityMatches && (!term || searchable.includes(term));
  });

  return [...filtered].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });
}

export function addCartItem(cart, bookId, availableStock) {
  const current = cart[bookId] ?? 0;
  return { ...cart, [bookId]: Math.min(current + 1, availableStock) };
}

export function setCartQuantity(cart, bookId, quantity, availableStock) {
  const safeQuantity = Math.max(0, Math.min(Number(quantity) || 0, availableStock));
  const next = { ...cart };
  if (safeQuantity === 0) delete next[bookId];
  else next[bookId] = safeQuantity;
  return next;
}

export function cartSummary(cart, books) {
  const items = Object.entries(cart).flatMap(([id, quantity]) => {
    const book = books.find((candidate) => candidate.id === id);
    return book ? [{ ...book, quantity, lineTotal: book.price * quantity }] : [];
  });
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal === 0 || subtotal >= 40 ? 0 : 5;
  return { items, itemCount, subtotal, shipping, total: subtotal + shipping };
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
