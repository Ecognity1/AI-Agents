# Folio Scenario Inventory

Each scenario is implementation-backed. Categories without implemented behavior (customer authentication, uploads/downloads, pagination, production payment and fulfillment) are inapplicable to this local MVP and are not manufactured.

| ID | Feature | Category | Scenario | Expected outcome |
|---|---|---|---|---|
| SCN-001 | FEAT-001 | Positive/UI | Open storefront with available catalog | Eight baseline books and result count render |
| SCN-002 | FEAT-001 | Error/empty | Catalog has no matching/available results or load fails | Distinct recoverable empty/error state appears |
| SCN-003 | FEAT-002 | Positive | Search by title, author or ISBN | Only matching books render without source mutation |
| SCN-004 | FEAT-002 | Validation/edge | Combine category, format, price, availability and sort; then clear | Controls compose predictably and reset restores catalog |
| SCN-005 | FEAT-003 | Positive/UI | Open product details | Complete selected metadata and current stock appear |
| SCN-006 | FEAT-003 | Accessibility | Close product dialog with Escape | Dialog closes and focus returns to trigger |
| SCN-007 | FEAT-004 | Positive | Add, increment, decrement and remove a book | Bag count, line quantity and totals update |
| SCN-008 | FEAT-004 | Boundary/regression | Set zero, invalid, over-stock or stale item quantity | Zero/invalid removes, excess clamps, stale ID does not affect totals |
| SCN-009 | FEAT-004 | Persistence | Reload after adding a book | Cart survives normal navigation/reload |
| SCN-010 | FEAT-005 | Positive | Open checkout with valid cart | Required form and complete payable review render |
| SCN-011 | FEAT-005 | Validation/negative | Submit missing/invalid name, email or address | Field-specific validation prevents order |
| SCN-012 | FEAT-005 | Business rule | Server quotes unavailable quantity or low/free-shipping totals | Unavailable cart rejected; totals remain server-authoritative |
| SCN-013 | FEAT-006 | Positive | Submit valid checkout with simulated success | Exactly one paid order is created |
| SCN-014 | FEAT-006 | Negative/recovery | Select decline, submit, then switch to success and retry | Clear decline preserves data; retry succeeds without duplicate |
| SCN-015 | FEAT-007 | Integration/E2E | Complete an order | Durable unique reference, snapshot and confirmation appear; cart clears |
| SCN-016 | FEAT-007 | Data/security | Inspect saved order snapshot | Required order data exists; reusable payment credentials do not |
| SCN-017 | FEAT-008 | Positive/role | Authorized staff updates stock and sale flag | Audited change persists and storefront reflects it |
| SCN-018 | FEAT-008 | Validation/boundary | Submit invalid stock or disable a book | Invalid values rejected; disabled book cannot be newly purchased |
| SCN-019 | FEAT-009 | Positive/role | Open staff console after checkout and select order | Placed order and authorized details are visible |
| SCN-020 | FEAT-009 | Negative | Find missing order reference | Safe not-found/recovery result appears |
| SCN-021 | FEAT-010 | Authorization | Missing or wrong role calls an admin operation | Request is denied; matching role succeeds |
| SCN-022 | FEAT-011 | Recovery | API/catalog/order operation fails temporarily | Safe actionable error appears and user context is preserved |
| SCN-023 | FEAT-012 | Responsive | Use storefront at desktop, tablet and mobile viewports | Primary browsing/search/bag controls remain usable without horizontal scroll |
| SCN-024 | FEAT-012 | Keyboard/accessibility | Navigate from skip link through critical dialog workflow | Semantic controls are reachable and focus behavior is deterministic |
