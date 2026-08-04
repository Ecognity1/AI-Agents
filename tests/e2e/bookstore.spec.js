import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.removeItem("folio-cart-v1"));
  await page.reload();
});

test("TC-001/002/004 - shopper can browse, search, filter, clear, and sort the catalog", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Find your next read" })).toBeVisible();
  await expect(page.locator(".book-card")).toHaveCount(8);

  await page.getByRole("button", { name: "Design", exact: true }).click();
  await expect(page.locator(".book-card")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Design", exact: true })).toHaveClass(/active/);

  await page.getByRole("button", { name: "All books", exact: true }).click();
  const search = page.getByRole("searchbox", { name: /search by title/i });
  await search.fill("Mara Ellison");
  await expect(page.getByRole("heading", { name: "The Quiet Geometry" })).toBeVisible();
  await expect(page.locator(".book-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.locator(".book-card")).toHaveCount(8);

  await page.getByLabel("Sort").selectOption("price-low");
  await expect(page.locator(".book-card h3").first()).toHaveText("After the Rain");
  await page.getByLabel("Sort").selectOption("price-high");
  await expect(page.locator(".book-card h3").first()).toHaveText("Making Space");
});

test("TC-002 - no-result search is clear and recoverable", async ({ page }) => {
  await page.getByRole("searchbox", { name: /search by title/i }).fill("definitely missing");
  await expect(page.getByRole("heading", { name: "No books found" })).toBeVisible();
  await expect(page.getByText("0 books", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "View all books" }).click();
  await expect(page.locator(".book-card")).toHaveCount(8);
});

test("TC-005 - shopper can inspect complete implemented product details", async ({ page }) => {
  await page.getByRole("button", { name: "View The Quiet Geometry" }).click();
  const dialog = page.getByRole("dialog", { name: "The Quiet Geometry" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Mara Ellison");
  await expect(dialog).toContainText("978-1-4920-1001-7");
  await expect(dialog).toContainText("8 available");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("TC-006/007 - cart quantity, totals, removal, and persistence behave correctly", async ({ page }) => {
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await expect(page.getByRole("button", { name: /open shopping bag, 1 items/i })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /open shopping bag, 1 items/i }).click();
  const cart = page.getByRole("dialog", { name: /shopping bag/i });
  await expect(cart).toContainText("The Quiet Geometry");
  await expect(cart).toContainText("$28.00");
  await page.getByRole("button", { name: "Increase The Quiet Geometry quantity" }).click();
  await expect(page.getByLabel("Quantity", { exact: true })).toHaveText("2");
  await expect(cart).toContainText("$56.00");
  await page.getByRole("button", { name: "Decrease The Quiet Geometry quantity" }).click();
  await expect(page.getByLabel("Quantity", { exact: true })).toHaveText("1");
  await page.getByRole("button", { name: "Remove" }).click();
  await expect(cart).toContainText("Your bag is empty");
});

test("TC-009 - checkout opens with full totals and an explicit local-provider boundary", async ({ page }) => {
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await page.getByRole("button", { name: /open shopping bag, 1 items/i }).click();
  await page.getByRole("button", { name: /secure checkout/i }).click();
  const checkout = page.getByRole("dialog", { name: "Complete your order" });
  await expect(checkout).toBeVisible();
  await expect(checkout).toContainText("Development only");
  await expect(checkout).toContainText("Tax");
  await expect(checkout.getByRole("button", { name: "Place local order" })).toBeVisible();
});

test("TC-010/011 - staff availability, checkout persistence, and placed-order visibility use the real local API", async ({ page }) => {
  test.setTimeout(30_000);
  await page.getByRole("button", { name: "Staff" }).click();
  const staff = page.getByRole("dialog", { name: "Catalog & order operations" });
  await expect(staff.getByRole("heading", { name: "Placed orders" })).toBeVisible();
  await staff.getByLabel("Book").selectOption("quiet-geometry");
  await staff.getByLabel("Stock").fill("20");
  await staff.getByLabel("Available for sale").check();
  await staff.getByRole("button", { name: "Save audited change" }).click();
  await expect(staff).toContainText("Sale availability saved.");
  await staff.getByRole("button", { name: "Close staff console" }).click();

  await page.getByRole("button", { name: "View The Quiet Geometry" }).click();
  await expect(page.getByRole("dialog", { name: "The Quiet Geometry" })).toContainText("20 available");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await page.getByRole("button", { name: /open shopping bag, 1 items/i }).click();
  await page.getByRole("button", { name: /secure checkout/i }).click();
  const checkout = page.getByRole("dialog", { name: "Complete your order" });
  await checkout.getByLabel("Full name").fill("Regression Reader");
  await checkout.getByLabel("Email").fill("reader@example.test");
  await checkout.getByLabel("Delivery address").fill("10 Durable Order Lane");
  await checkout.getByRole("button", { name: "Place local order" }).click();

  const confirmation = page.getByRole("dialog", { name: /Thank you, Regression Reader/ });
  await expect(confirmation).toContainText(/FOL-\d{8}-[A-F0-9]{8}/);
  const reference = (await confirmation.locator("strong").first().textContent()).trim();
  await confirmation.getByRole("button", { name: "Continue shopping" }).click();
  await page.getByRole("button", { name: "Staff" }).click();
  await expect(page.getByRole("button", { name: new RegExp(reference) })).toContainText("Regression Reader");
  await page.getByRole("button", { name: new RegExp(reference) }).click();
  await expect(page.getByRole("dialog", { name: "Catalog & order operations" })).toContainText("10 Durable Order Lane");
});

test("TC-012 - decline can recover to success and the durable order appears in staff", async ({ page }) => {
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  await page.getByRole("button", { name: /open shopping bag, 1 items/i }).click();
  await page.getByRole("button", { name: /secure checkout/i }).click();
  const checkout = page.getByRole("dialog", { name: "Complete your order" });
  await expect(checkout.getByLabel(/Simulate success/)).toBeChecked();
  await checkout.getByLabel("Full name").fill("Recovery Reader");
  await checkout.getByLabel("Email").fill("recovery@example.test");
  await checkout.getByLabel("Delivery address").fill("12 Retry Road");
  await checkout.getByLabel(/Simulate decline/).check();
  await checkout.getByRole("button", { name: "Place local order" }).click();
  await expect(checkout.getByRole("alert")).toContainText("Test payment declined as selected");
  await expect(checkout.getByLabel("Full name")).toHaveValue("Recovery Reader");
  await checkout.getByLabel(/Simulate success/).check();
  await checkout.getByRole("button", { name: "Retry local order" }).click();
  const confirmation = page.getByRole("dialog", { name: /Thank you, Recovery Reader/ });
  await expect(confirmation).toContainText(/FOL-\d{8}-[A-F0-9]{8}/);
  const reference = (await confirmation.locator("strong").first().textContent()).trim();
  await confirmation.getByRole("button", { name: "Continue shopping" }).click();
  await page.getByRole("button", { name: "Staff" }).click();
  await expect(page.getByRole("button", { name: new RegExp(reference) })).toContainText("Recovery Reader");
});

test("TC-017 - keyboard users can skip to content and close overlays", async ({ page }) => {
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to books" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page).toHaveURL(/#catalog$/);

  const detailTrigger = page.getByRole("button", { name: "View The Quiet Geometry" });
  await detailTrigger.focus();
  await detailTrigger.press("Enter");
  await expect(page.getByRole("dialog", { name: "The Quiet Geometry" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "The Quiet Geometry" })).toBeHidden();
  await expect(detailTrigger).toBeFocused();
});

test("TC-018 - responsive storefront remains usable and captures visual evidence", async ({ page }, testInfo) => {
  await expect(page.getByRole("heading", { name: "Books worth keeping." })).toBeVisible();
  await expect(page.getByRole("searchbox", { name: /search by title/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /open shopping bag/i })).toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
  const screenshot = testInfo.outputPath(`folio-${testInfo.project.name}.png`);
  await page.screenshot({ path: screenshot, fullPage: true });
  await testInfo.attach(`folio-${testInfo.project.name}`, { path: screenshot, contentType: "image/png" });
});
