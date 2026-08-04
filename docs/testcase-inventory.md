# Folio Test-Case Inventory

| Test case | Scenario | Feature | Name | Type | Priority | Automation | Playwright | Application area |
|---|---|---|---|---|---|---|---|---|
| TC-001 | SCN-001 | FEAT-001 | Browse baseline catalog | UI/E2E | High | Yes | Yes—existing | Catalog |
| TC-002 | SCN-002 | FEAT-001 | Recover from no-result catalog | UI/E2E | High | Yes | Yes—existing | Catalog states |
| TC-003 | SCN-003 | FEAT-002 | Search title, author and ISBN | Unit/UI | High | Yes | Yes—existing combined | Search |
| TC-004 | SCN-004 | FEAT-002 | Compose and clear refinements/sort | Unit/UI | High | Yes | Yes—existing | Filters/sort |
| TC-005 | SCN-005 | FEAT-003 | Inspect complete product details | UI/E2E | Medium | Yes | Yes—existing | Details dialog |
| TC-006 | SCN-007 | FEAT-004 | Edit and remove bag lines | Unit/UI | Critical | Yes | Yes—existing | Cart |
| TC-007 | SCN-009 | FEAT-004 | Persist bag across reload | UI/E2E | High | Yes | Yes—existing combined | Cart storage |
| TC-008 | SCN-008 | FEAT-004 | Enforce quantity/stale-item boundaries | Unit | High | Yes | No—lower level | Store logic |
| TC-009 | SCN-010 | FEAT-005 | Review checkout form and totals | UI/E2E | Critical | Yes | Yes—existing | Checkout |
| TC-010 | SCN-017 | FEAT-008 | Persist catalog availability update | Integration/E2E | Critical | Yes | Yes—existing combined | Staff/catalog API |
| TC-011 | SCN-015 | FEAT-007 | Place and inspect durable order | Integration/E2E | Critical | Yes | Yes—existing combined | Checkout/orders |
| TC-012 | SCN-014 | FEAT-006 | Recover decline to successful order | E2E/regression | Critical | Yes | Yes—existing | Payment recovery |
| TC-013 | SCN-011 | FEAT-005 | Reject invalid checkout fields | Unit/UI | High | Yes | No—unit covered; UI candidate | Validation |
| TC-014 | SCN-012 | FEAT-005 | Reject unavailable quote and calculate totals | Unit | Critical | Yes | No—lower level | Commerce |
| TC-015 | SCN-016 | FEAT-007 | Persist safe order snapshot | Unit/integration | High | Yes | No—lower level | Repository |
| TC-016 | SCN-021 | FEAT-010 | Enforce admin role separation | Unit/API | Critical | Yes | No—server boundary | Authorization |
| TC-017 | SCN-006 | FEAT-012 | Restore focus after Escape close | Accessibility/E2E | High | Yes | Yes—existing | Dialog focus |
| TC-018 | SCN-023 | FEAT-012 | Keep responsive storefront usable | Responsive/E2E | High | Yes | Yes—existing | Responsive UI |
| TC-019 | SCN-013 | FEAT-006 | Create exactly one successful order | Integration | Critical | Yes | Covered by TC-011/012 | Commerce API |
| TC-020 | SCN-018 | FEAT-008 | Validate stock and sale boundaries | API/manual | High | Partial | Candidate; no duplicate added | Catalog admin |
| TC-021 | SCN-019 | FEAT-009 | List and select placed order | E2E | High | Yes | Covered by TC-010/011 | Order operations |
| TC-022 | SCN-020 | FEAT-009 | Handle missing order reference | API/UI | Medium | Partial | Candidate | Order operations |
| TC-023 | SCN-022 | FEAT-011 | Preserve context on dependency failure | Integration/UI | High | Partial | Candidate | Recovery states |
| TC-024 | SCN-024 | FEAT-012 | Keyboard critical navigation | Accessibility/E2E | High | Yes | Covered by TC-017 | Accessibility |
