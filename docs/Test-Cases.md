# Folio Test Cases — Compatibility Index

The authoritative inventories are:

- `docs/feature-inventory.md` — 12 `FEAT-*` entries.
- `docs/scenario-inventory.md` — 24 `SCN-*` entries.
- `docs/testcase-inventory.md` — 24 `TC-*` entries.
- `docs/detailed-test-cases.md` — executable details for every case.

## Current automation result

| Coverage group | Test cases | Evidence | Result |
|---|---|---|---|
| Catalog/search/filter | TC-001–005 | Node tests plus Playwright | PASS |
| Cart/checkout | TC-006–009, TC-013–014 | Node tests plus Playwright | PASS |
| Catalog update/order/payment recovery | TC-010–012, TC-015–016, TC-019, TC-021 | Node/integration plus Playwright | PASS |
| Accessibility/responsive | TC-017–018 | Headed desktop/tablet/mobile Playwright | PASS |
| Candidate/partial/manual gaps | TC-020, TC-022–024 | Inventory risk assessment | NOT RUN / partial |

No test case or Playwright test was added or changed in this run because no relevant application change was detected and existing coverage remained valid.
