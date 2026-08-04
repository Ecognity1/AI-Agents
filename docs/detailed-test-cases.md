# Folio Detailed Test Cases

The test data below is synthetic. “Existing” mappings refer to `tests/e2e/bookstore.spec.js` or the Node tests in `test/`.

## TC-001 — Browse baseline catalog
- **Trace:** FEAT-001 / SCN-001; **Priority/Type:** High, UI/E2E; **Automation:** Existing Playwright TC-001/002/004.
- **Objective:** Verify the available catalog loads clearly.
- **Preconditions/Data:** Local API running with baseline data.
- **Steps:** 1. Open `/`; expect the main heading. 2. Observe the catalog; expect eight book cards and an accurate count.
- **Final expected:** Purchasable catalog is visible and usable.

## TC-002 — Recover from no-result catalog
- **Trace:** FEAT-001 / SCN-002; **Priority/Type:** High, UI/E2E; **Automation:** Existing Playwright TC-002.
- **Preconditions/Data:** Catalog loaded; query `definitely missing`.
- **Steps:** 1. Enter query; expect “No books found” and zero count. 2. Choose “View all books”; expect baseline catalog restored.
- **Final expected:** Empty state is distinct and recoverable.

## TC-003 — Search supported fields
- **Trace:** FEAT-002 / SCN-003; **Priority/Type:** High, unit/UI; **Automation:** Existing store unit test and combined Playwright browse test.
- **Preconditions/Data:** Queries for known title/author/ISBN.
- **Steps:** 1. Search each representative value. 2. Expect only matching title(s). 3. Clear; expect source catalog unchanged.
- **Final expected:** All supported search partitions work without mutation.

## TC-004 — Compose and clear refinements
- **Trace:** FEAT-002 / SCN-004; **Priority/Type:** High, unit/UI; **Automation:** Existing Playwright TC-001/002/004 and unit test.
- **Steps:** 1. Select category and sort; expect filtered ordered results and active control. 2. Apply supported refinements. 3. Clear; expect full result set.
- **Final expected:** Refinements compose and reset predictably.

## TC-005 — Inspect product details
- **Trace:** FEAT-003 / SCN-005; **Priority/Type:** Medium, UI/E2E; **Automation:** Existing Playwright TC-005.
- **Steps:** 1. Open “The Quiet Geometry.” 2. Expect title, author, ISBN, price and stock in a named dialog. 3. Close dialog.
- **Final expected:** Decision-critical metadata is complete and current.

## TC-006 — Edit bag contents
- **Trace:** FEAT-004 / SCN-007; **Priority/Type:** Critical, unit/UI; **Automation:** Existing Playwright TC-006/007 and store tests.
- **Steps:** 1. Add a book; expect count one. 2. Increase/decrease; expect quantity and totals update. 3. Remove; expect empty bag.
- **Final expected:** Cart actions and totals remain consistent.

## TC-007 — Persist bag
- **Trace:** FEAT-004 / SCN-009; **Priority/Type:** High, UI/E2E; **Automation:** Existing Playwright TC-006/007.
- **Steps:** 1. Add a book. 2. Reload. 3. Open bag and expect the same line, quantity and total.
- **Final expected:** Normal reload does not lose cart state.

## TC-008 — Enforce cart boundaries
- **Trace:** FEAT-004 / SCN-008; **Priority/Type:** High, unit; **Automation:** Existing `test/store.test.js`.
- **Data:** zero, negative, non-number, above-stock and stale ID.
- **Steps:** 1. Apply each value to isolated cart logic. 2. Expect invalid/zero removal, excess clamp, and stale ID exclusion from totals.
- **Final expected:** Invalid cart state cannot inflate quantity or totals.

## TC-009 — Review checkout
- **Trace:** FEAT-005 / SCN-010; **Priority/Type:** Critical, UI/E2E; **Automation:** Existing Playwright TC-009.
- **Steps:** 1. Add a book and open checkout. 2. Expect required fields, item review, shipping, tax, total, local-provider disclosure and place-order action.
- **Final expected:** Shopper sees complete payable context before submission.

## TC-010 — Update sale availability
- **Trace:** FEAT-008 / SCN-017; **Priority/Type:** Critical, integration/E2E; **Automation:** Existing Playwright TC-010/011.
- **Data:** `quiet-geometry`, stock 20, for-sale true.
- **Steps:** 1. Open Staff. 2. Select book and save values; expect audited success. 3. Close and reopen product; expect 20 available.
- **Final expected:** Authorized update persists and storefront refreshes.

## TC-011 — Place and inspect durable order
- **Trace:** FEAT-007 / SCN-015; **Priority/Type:** Critical, integration/E2E; **Automation:** Existing Playwright TC-010/011.
- **Data:** Regression Reader, `reader@example.test`, synthetic address.
- **Steps:** 1. Complete success checkout. 2. Expect `FOL-*` confirmation. 3. Continue, open Staff, select same reference. 4. Expect customer/address details.
- **Final expected:** One durable confirmed order is visible to staff.

## TC-012 — Recover payment decline
- **Trace:** FEAT-006 / SCN-014; **Priority/Type:** Critical, E2E/regression; **Automation:** Existing Playwright TC-012.
- **Steps:** 1. Enter valid checkout. 2. Select decline and submit; expect explicit decline and preserved fields. 3. Select success and retry. 4. Expect confirmation and staff visibility.
- **Final expected:** Recovery succeeds without losing context or duplicating order.

## TC-013 — Validate checkout fields
- **Trace:** FEAT-005 / SCN-011; **Priority/Type:** High, unit/UI; **Automation:** Existing commerce unit test; UI expansion optional.
- **Data:** blank name/address and malformed email.
- **Steps:** 1. Validate payload. 2. Expect 422-equivalent error with all three field keys and no order creation.
- **Final expected:** Invalid customer data is rejected with actionable field errors.

## TC-014 — Quote totals and unavailable quantity
- **Trace:** FEAT-005 / SCN-012; **Priority/Type:** Critical, unit; **Automation:** Existing commerce unit test.
- **Steps:** 1. Quote one low-value book; expect subtotal 18, shipping 5, total 23. 2. Quote quantity above stock; expect `CART_CHANGED`.
- **Final expected:** Server totals and availability are authoritative.

## TC-015 — Persist safe order snapshot
- **Trace:** FEAT-007 / SCN-016; **Priority/Type:** High, unit/integration; **Automation:** Existing commerce/repository tests.
- **Steps:** 1. Create paid order from quote. 2. Expect unique reference and item price snapshot. 3. Serialize; expect no payment token. 4. Perform concurrent repository writes; expect valid JSON and both orders.
- **Final expected:** Durable data is complete, serialized and credential-minimized.

## TC-016 — Enforce role separation
- **Trace:** FEAT-010 / SCN-021; **Priority/Type:** Critical, unit/API; **Automation:** Existing commerce unit test.
- **Steps:** 1. Request CatalogAdmin operation without headers; expect denial. 2. Use OrderOperator; expect denial. 3. Use valid local token plus CatalogAdmin; expect authorization.
- **Final expected:** Admin boundary defaults to deny and separates roles.

## TC-017 — Restore dialog focus
- **Trace:** FEAT-012 / SCN-006; **Priority/Type:** High, accessibility/E2E; **Automation:** Existing Playwright TC-017.
- **Steps:** 1. Activate skip link by keyboard. 2. Focus and open detail trigger. 3. Press Escape. 4. Expect dialog hidden and originating trigger focused.
- **Final expected:** Keyboard context is restored deterministically.

## TC-018 — Responsive storefront
- **Trace:** FEAT-012 / SCN-023; **Priority/Type:** High, responsive/E2E; **Automation:** Existing Playwright TC-018 in desktop/tablet/mobile projects.
- **Steps:** 1. Open each configured viewport. 2. Expect heading, search and bag control visible. 3. Expect no forced horizontal-scroll body style. 4. Capture screenshot evidence.
- **Final expected:** Critical storefront controls remain usable across configured viewports.

## TC-019 — Create exactly one successful order
- **Trace:** FEAT-006 / SCN-013; **Priority/Type:** Critical, integration; **Automation:** Covered by TC-011/012 workflow.
- **Steps:** 1. Submit valid success checkout with one idempotency key. 2. Retry equivalent submission. 3. Query orders.
- **Final expected:** A single paid order/reference exists; duplicate charge/order is not produced.

## TC-020 — Validate catalog boundaries
- **Trace:** FEAT-008 / SCN-018; **Priority/Type:** High, API/manual; **Automation:** Partial candidate.
- **Steps:** 1. Submit invalid stock; expect safe validation error and unchanged data. 2. Disable a valid book; expect it remains manageable by staff but unavailable for new purchase.
- **Final expected:** Invalid sale data cannot become purchasable and disablement preserves history.

## TC-021 — List and select placed order
- **Trace:** FEAT-009 / SCN-019; **Priority/Type:** High, E2E; **Automation:** Existing combined TC-010/011.
- **Steps:** 1. Create synthetic order. 2. Open Staff. 3. Expect reference/customer in list. 4. Select it and expect delivery/items/totals/status.
- **Final expected:** Authorized operations can locate and inspect a placed order.

## TC-022 — Missing order reference
- **Trace:** FEAT-009 / SCN-020; **Priority/Type:** Medium, API/UI; **Automation:** Candidate.
- **Steps:** 1. Query a well-formed absent `FOL-*` reference as OrderOperator. 2. Expect safe not-found response/message with no unrelated order data.
- **Final expected:** Missing order is handled safely and clearly.

## TC-023 — Dependency failure recovery
- **Trace:** FEAT-011 / SCN-022; **Priority/Type:** High, integration/UI; **Automation:** Candidate with controlled API failure.
- **Steps:** 1. Trigger controlled catalog/order API failure. 2. Expect actionable alert. 3. Verify checkout/customer context remains. 4. Restore dependency and retry.
- **Final expected:** Temporary failure is recoverable without silent loss or duplicate action.

## TC-024 — Keyboard critical navigation
- **Trace:** FEAT-012 / SCN-024; **Priority/Type:** High, accessibility/E2E; **Automation:** Partly covered by TC-017; manual review retained.
- **Steps:** 1. Navigate skip link, catalog actions and dialogs using keyboard only. 2. Expect visible logical focus, semantic names, operable close actions and no focus loss.
- **Final expected:** Critical flow remains keyboard operable; visual focus quality is manually confirmed.
