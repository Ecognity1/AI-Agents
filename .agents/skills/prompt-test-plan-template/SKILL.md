---
name: prompt-test-plan-template
description: Reusable test-plan template. Use when Codex creates or validates test planning and execution documentation.
---

# Test Plan & Test Execution Template

## Purpose

Use this template to create and execute a complete testing strategy for the solution defined by the Product Requirements Document, Architecture Design Document, and implemented source code.

Primary inputs:

```text
docs/PRD.md
docs/Architecture-Design.md
```

The Testing Agent must also inspect:

```text
Source Code
Existing Tests
Repository Structure
Build Configuration
API Definitions
Database Changes
Configuration
Infrastructure
CI/CD Configuration
Applicable Testing Skills
Repository Instructions
```

The Testing Agent is responsible for:

```text
Requirement Analysis
        ↓
Test Planning
        ↓
Test Case Design
        ↓
Automated Test Creation
        ↓
Test Execution
        ↓
Playwright Validation
        ↓
Report Generation
        ↓
Defect Identification
        ↓
Traceability
```

The objective is not maximum test count.

The objective is:

```text
Maximum Relevant Coverage
        +
Risk-Based Testing
        +
Requirement Traceability
        +
Reliable Automation
        +
Clear Test Evidence
```

---

# 1. Test Plan Overview

Provide a concise overview of:

- Solution under test
- Testing objectives
- Testing scope
- Test approach
- Major test types
- Automation approach
- Major risks
- Entry criteria
- Exit criteria

---

# 2. Source Documents

Review applicable:

```text
docs/PRD.md
docs/Architecture-Design.md
```

Also inspect:

```text
Implementation
Existing Automated Tests
API Contracts
Database Models
Infrastructure
Configuration
CI/CD
```

Testing must not rely only on source code.

Requirements remain the primary source of expected behavior.

---

# 3. Requirement Analysis

Review:

```text
Goals
Epics
Features
User Stories
Acceptance Criteria
Functional Requirements
Non-Functional Requirements
Business Rules
Data Requirements
Integration Requirements
Security Requirements
```

Build testing coverage from these artifacts.

---

# 4. Testing Hierarchy

Maintain:

```text
Business Goal
      ↓
Epic
      ↓
Feature
      ↓
User Story
      ↓
Acceptance Criteria
      ↓
Test Scenario
      ↓
Test Case
      ↓
Automated Test
      ↓
Execution Result
```

Every critical requirement must have appropriate test coverage.

---

# 5. Test Scope

## 5.1 In Scope

Identify functionality covered by the test cycle.

Include applicable:

- Features
- User Stories
- APIs
- UI
- Business Logic
- Database
- Integrations
- Security
- Infrastructure
- Non-Functional Requirements

---

## 5.2 Out of Scope

Clearly identify functionality intentionally excluded.

Include reasons.

Do not silently exclude difficult-to-test functionality.

---

# 6. Test Objectives

Define what testing must validate.

Examples:

```text
Functional Correctness

Acceptance Criteria

Business Rules

API Contracts

Data Integrity

Security Controls

Integration Behavior

User Workflows

Failure Handling

Performance

Accessibility

Compatibility

Resilience
```

Only include objectives relevant to the solution.

---

# 7. Test Strategy

Use a layered testing approach.

```text
                    E2E
                   /   \
              System Tests
             /            \
        Integration / API Tests
       /                    \
         Component Tests
        /              \
             Unit Tests
```

Prefer more testing at lower levels where appropriate.

Use E2E tests for critical workflows rather than attempting to validate every behavior through the UI.

---

# 8. Test Types

Evaluate all applicable test types.

The Testing Agent must determine which are required based on requirements, architecture, implementation, and risk.

Consider:

```text
Unit Testing
Component Testing
Integration Testing
API Testing
Database Testing
Contract Testing
UI Testing
End-to-End Testing
Functional Testing
System Testing
Smoke Testing
Sanity Testing
Regression Testing
Negative Testing
Boundary Testing
Validation Testing
Security Testing
Authorization Testing
Performance Testing
Load Testing
Stress Testing
Scalability Testing
Resilience Testing
Recovery Testing
Accessibility Testing
Compatibility Testing
Cross-Browser Testing
Responsive Testing
Data Integrity Testing
Migration Testing
Configuration Testing
Installation / Deployment Testing
```

Do not create a test type merely because it appears in this list.

Apply it when relevant.

---

# 9. Test Type Matrix

Document planned test coverage.

| Test Type | Required | Purpose | Automation | Tool |
|---|---|---|---|---|
| Unit | Yes/No | <Purpose> | Yes/No | <Tool> |
| Integration | Yes/No | <Purpose> | Yes/No | <Tool> |
| API | Yes/No | <Purpose> | Yes/No | <Tool> |
| E2E | Yes/No | <Purpose> | Yes/No | Playwright / Other |
| Security | Yes/No | <Purpose> | Yes/No | <Tool> |
| Performance | Yes/No | <Purpose> | Yes/No | <Tool> |

Only list applicable test types in the final document.

---

# 10. Test Environment

Document the required test environment.

Include applicable:

- Application environment
- Runtime
- Database
- External dependencies
- Test accounts
- Test configuration
- Browsers
- Devices
- Operating systems
- Network dependencies
- Required services

Do not include credentials or secrets.

---

# 11. Test Data Strategy

Define how test data will be:

```text
Created
Prepared
Isolated
Used
Reset
Cleaned
```

Test data should:

- Be deterministic where possible.
- Avoid production-sensitive data.
- Support positive and negative scenarios.
- Support boundary cases.
- Support authorization scenarios.
- Avoid test-to-test dependencies.

---

# 12. Test Case Identification

Use stable identifiers:

```text
TC-001
TC-002
TC-003
```

Test cases must remain traceable to requirements.

---

# 13. Test Case Structure

Every test case should contain:

```text
Test Case ID
Title
Epic
Feature
User Story
Requirement
Acceptance Criteria
Test Type
Priority
Preconditions
Test Data
Steps
Expected Result
Automation Status
Execution Status
```

Use:

| Field | Value |
|---|---|
| Test Case ID | TC-001 |
| Title | <Test Case> |
| Epic | EPIC-001 |
| Feature | FEAT-001 |
| User Story | US-001 |
| Requirement | FR-001 |
| Acceptance Criteria | AC-001 |
| Test Type | Functional |
| Priority | Critical / High / Medium / Low |
| Automation | Automated / Manual / Candidate |
| Status | Not Run / Pass / Fail / Blocked |

---

# 14. Test Steps

For each detailed test case use:

## TC-001 — <Test Case Title>

### Objective

<What behavior is being validated>

### Preconditions

- <Precondition>

### Test Data

```text
<Test data>
```

### Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | <Action> | <Expected Result> |
| 2 | <Action> | <Expected Result> |
| 3 | <Action> | <Expected Result> |

### Expected Final Result

<Expected outcome>

### Requirement Mapping

```text
EPIC-XXX
FEAT-XXX
US-XXX
FR-XXX
AC-XXX
```

---

# 15. Positive Test Cases

Validate expected behavior with valid:

- Inputs
- Permissions
- Data
- State
- Configuration

Ensure primary business workflows succeed.

---

# 16. Negative Test Cases

Create applicable negative scenarios.

Consider:

```text
Invalid Input

Missing Input

Malformed Input

Unauthorized Request

Forbidden Operation

Invalid State

Duplicate Operation

Missing Resource

Expired Data

Invalid Configuration

Dependency Failure
```

Verify the system fails safely and predictably.

---

# 17. Boundary and Edge Cases

Identify applicable boundaries.

Examples:

```text
Minimum Value

Maximum Value

Below Minimum

Above Maximum

Empty Value

Null Value

Zero

Single Record

Large Collection

Special Characters

Unicode

Long Input

Duplicate Input

Concurrent Action
```

Do not generate arbitrary edge cases unrelated to the requirement.

---

# 18. Business Rule Testing

For each:

```text
BR-XXX
```

verify:

- Valid rule execution
- Invalid conditions
- Boundary conditions
- Conflicting conditions
- Relevant state transitions

Maintain traceability:

```text
BR-001
   ↓
TC-XXX
```

---

# 19. Unit Testing

Create or validate unit tests for isolated logic.

Cover applicable:

- Business logic
- Domain logic
- Validation
- Transformations
- Calculations
- Decision logic
- Error conditions
- Boundary cases

Unit tests should be:

```text
Fast
Independent
Repeatable
Deterministic
```

Mock only true external boundaries where appropriate.

Do not mock the behavior being tested.

---

# 20. Component Testing

Where components have meaningful isolated boundaries, validate:

```text
Input
   ↓
Component
   ↓
Output
```

Verify:

- Component behavior
- Internal contract
- Error handling
- Boundary conditions

---

# 21. Integration Testing

Validate interaction between real components.

Examples:

```text
Application ↔ Database

API ↔ Application

Service ↔ Queue

Application ↔ Cache

Application ↔ Identity Provider

Application ↔ External Adapter
```

Validate:

- Successful interaction
- Failure behavior
- Data mapping
- Timeout behavior
- Retry behavior where applicable
- Transaction behavior

---

# 22. API Testing

For each API validate applicable:

```text
HTTP Method

Route

Authentication

Authorization

Request Contract

Validation

Response Contract

Status Code

Error Contract

Pagination

Filtering

Sorting

Versioning

Idempotency

Rate Limits
```

Use a coverage table:

| Endpoint | Positive | Validation | Auth | Authorization | Error | Boundary |
|---|---|---|---|---|---|---|
| `<endpoint>` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

# 23. Contract Testing

Where independently deployed consumers/providers exist, validate contracts between:

```text
Consumer
   ↕
Provider
```

Test:

- Required fields
- Data types
- Compatibility
- Version changes
- Optional fields
- Error contracts

Use contract testing only where architecture justifies it.

---

# 24. Database Testing

Where persistence exists, validate:

- CRUD behavior
- Constraints
- Relationships
- Transactions
- Data integrity
- Index-dependent behavior where relevant
- Concurrency
- Migrations
- Rollback where supported

Do not test database implementation details without business or architecture value.

---

# 25. Data Integrity Testing

Validate that data remains:

```text
Accurate
Complete
Consistent
Valid
```

across applicable:

- Create
- Update
- Delete
- Import
- Export
- Integration
- Migration
- Concurrent operations

---

# 26. Migration Testing

Where database/data migrations exist, validate:

- Migration succeeds.
- Existing data is preserved.
- New schema is correct.
- Application works after migration.
- Failure behavior is understood.
- Rollback/recovery is possible where required.

---

# 27. UI Functional Testing

Where UI exists, validate:

- Page loading
- Navigation
- Forms
- Buttons
- Links
- Validation
- Search
- Filters
- Sorting
- Pagination
- Dialogs
- User workflows
- Error states
- Empty states
- Loading states

Prefer user-visible behavior over implementation details.

---

# 28. End-to-End Testing

Use E2E testing for critical business workflows.

Example:

```text
User
 ↓
UI
 ↓
API
 ↓
Business Logic
 ↓
Database / Integration
 ↓
Result
 ↓
User
```

Prioritize:

- Critical workflows
- High-risk workflows
- Cross-component workflows
- Important acceptance criteria

Do not use E2E tests as a replacement for unit and integration testing.

---

# 29. Playwright Test Automation

For browser-based applications, use Playwright for applicable:

```text
UI Functional Tests

End-to-End Tests

Regression Tests

Smoke Tests

Cross-Browser Tests

Responsive Tests

Accessibility-Assisted Validation
```

Follow existing repository Playwright configuration where available.

Do not create a second competing Playwright setup unnecessarily.

---

# 30. Playwright Project Structure

Prefer the existing repository structure.

If no standard exists, use a simple structure such as:

```text
tests/
└── e2e/
    ├── fixtures/
    ├── pages/
    ├── specs/
    └── test-data/
```

Example:

```text
tests/e2e/specs/authentication.spec.ts
tests/e2e/specs/orders.spec.ts
tests/e2e/specs/access-control.spec.ts
```

Do not create unnecessary abstraction layers.

---

# 31. Playwright Test Design

Each Playwright test should map to:

```text
Test Case
   ↓
User Story
   ↓
Acceptance Criteria
```

Example:

```text
TC-025
US-005
AC-011
```

Tests should validate user-observable outcomes.

Avoid testing internal implementation details through the browser.

---

# 32. Playwright Locator Strategy

Prefer resilient locators.

Recommended order where appropriate:

```text
getByRole()

getByLabel()

getByPlaceholder()

getByText()

getByTestId()
```

Avoid fragile selectors based on:

```text
DOM hierarchy

Generated CSS classes

nth-child

Deep XPath
```

unless no stable alternative exists.

---

# 33. Playwright Waiting Strategy

Use Playwright's automatic waiting.

Prefer assertions such as:

```text
expect(locator).toBeVisible()
expect(locator).toHaveText()
expect(page).toHaveURL()
```

Avoid arbitrary fixed delays such as:

```text
waitForTimeout(...)
```

unless there is a documented reason.

Tests must not rely on timing guesses.

---

# 34. Playwright Test Isolation

Tests should be independent.

Each test should:

- Prepare required state.
- Avoid relying on another test.
- Avoid shared mutable state where possible.
- Clean up when necessary.

Tests should be executable individually.

---

# 35. Playwright Authentication

Where authentication is required, follow the repository's approved approach.

Where safe and appropriate, reusable authenticated state may be used.

Never commit:

```text
Passwords
Tokens
Session Secrets
Authentication Cookies
```

to source control.

---

# 36. Playwright Page Objects

Use Page Object Models only when they improve maintainability.

Appropriate when:

- Workflows are reused.
- Pages are complex.
- Selectors are shared extensively.

Avoid creating Page Objects for every trivial page.

Keep assertions primarily in tests unless repository standards specify otherwise.

---

# 37. Playwright Test Data

Keep test data:

- Explicit
- Reusable where beneficial
- Non-sensitive
- Environment-independent where practical

Avoid hardcoded production-specific values.

---

# 38. Playwright Browser Coverage

Run required browser projects based on application requirements.

Possible coverage:

```text
Chromium
Firefox
WebKit
```

Do not automatically require all browsers unless compatibility requirements justify them.

---

# 39. Playwright Headed Mode

The Testing Agent must support headed execution for debugging and visual validation.

Where Playwright is configured, use the repository/package-manager equivalent of:

```bash
npx playwright test --headed
```

For a specific test:

```bash
npx playwright test <test-file> --headed
```

For a specific browser/project:

```bash
npx playwright test --project=<project> --headed
```

Use headed mode when:

- Debugging failed tests
- Validating UI behavior
- Reviewing navigation
- Investigating timing issues
- Confirming complex workflows

Headed mode does not replace automated assertions.

---

# 40. Playwright Debugging

Where required, use supported debugging mechanisms such as:

```bash
npx playwright test --debug
```

or the repository's equivalent.

Use debugging to understand failures rather than weakening assertions.

---

# 41. Playwright Screenshots

Configure screenshots where useful, particularly on failure.

Screenshots should provide evidence for:

- UI failures
- Unexpected state
- Rendering problems

Avoid unnecessary screenshot generation for every successful step unless required.

---

# 42. Playwright Video

Where useful, enable video capture for:

```text
Failed Tests
Critical Workflows
Debugging
```

Avoid excessive artifacts when they provide little value.

---

# 43. Playwright Traces

Use Playwright traces where useful for failed E2E tests.

Trace artifacts can help investigate:

```text
Actions
DOM State
Network Activity
Console
Screenshots
Timing
```

Prefer trace collection on retry/failure where appropriate.

---

# 44. Playwright HTML Report

Configure or use the Playwright HTML reporter.

Run tests using the repository's configured command.

Where standard Playwright commands apply:

```bash
npx playwright test
```

Open the generated report using:

```bash
npx playwright show-report
```

The report should provide:

- Test status
- Duration
- Failures
- Error details
- Attachments
- Screenshots where configured
- Traces where configured

---

# 45. Playwright Execution Sequence

Recommended execution flow:

```text
Prepare Environment
      ↓
Install Dependencies
      ↓
Install Required Browsers
      ↓
Start Application
      ↓
Run Smoke Tests
      ↓
Run Functional / E2E Tests
      ↓
Run Headed Validation if Required
      ↓
Run Cross-Browser Tests if Required
      ↓
Generate HTML Report
      ↓
Review Failures
      ↓
Generate Defects
```

Use repository-specific commands where they already exist.

---

# 46. Smoke Testing

Create a small smoke suite for critical functionality.

Examples:

```text
Application Loads

Authentication Works

Primary Navigation Works

Critical API Responds

Critical Business Workflow Starts

Required Dependency Is Reachable
```

Smoke tests should be:

```text
Fast
Stable
High Value
```

---

# 47. Sanity Testing

Use sanity testing after focused changes where appropriate.

Validate that:

- Modified functionality works.
- Closely related functionality still works.
- Major regressions are not immediately visible.

---

# 48. Regression Testing

Regression coverage should protect:

- Existing critical workflows
- Previously fixed defects
- Shared components
- APIs
- Business rules
- Integrations
- High-risk functionality

Prefer automated regression coverage for stable repeatable scenarios.

---

# 49. Security Testing

Validate applicable security controls.

Consider:

```text
Authentication

Authorization

Role-Based Access

Direct Resource Access

Input Validation

Sensitive Data Exposure

Session Handling

API Security

Security Headers

Secrets Exposure

Audit Behavior
```

Security tests must be performed only against authorized test environments.

---

# 50. Authorization Testing

For protected functionality test applicable:

```text
Authorized User
Unauthorized User
Unauthenticated User
Incorrect Role
Insufficient Permission
Resource Ownership
```

Do not assume UI visibility proves authorization.

Validate trusted backend enforcement where applicable.

---

# 51. Input Security Testing

Validate application handling of malicious or malformed input at an appropriate defensive level.

Focus on verifying that:

- Input is validated.
- Unsafe input is rejected or safely handled.
- Errors do not expose sensitive details.
- Data integrity is preserved.

Follow approved security testing practices.

---

# 52. Performance Testing

Where performance requirements exist, validate applicable:

- Response time
- Throughput
- Concurrent users
- Processing time
- Resource utilization

Use defined NFR targets.

Do not invent performance thresholds.

---

# 53. Load Testing

Where required, validate expected workload.

Measure applicable:

```text
Latency
Throughput
Error Rate
Resource Utilization
```

Compare results against defined NFRs.

---

# 54. Stress Testing

Where justified, test behavior beyond expected workload.

The objective is to understand:

```text
Failure Point
Degradation Behavior
Recovery Behavior
```

Stress testing is not required for every solution.

---

# 55. Scalability Testing

Where scalability requirements exist, verify that scaling behavior matches architecture expectations.

Validate applicable:

- Horizontal scaling
- Vertical scaling
- Queue processing
- Database behavior
- Resource saturation

---

# 56. Resilience Testing

Where resilience requirements exist, validate behavior during applicable:

```text
Dependency Failure

Timeout

Temporary Network Failure

Service Restart

Retry

Partial Failure

Message Processing Failure
```

Verify graceful failure and recovery.

---

# 57. Recovery Testing

Where recovery requirements exist, validate:

- Service recovery
- Data recovery
- Backup restoration
- Failed-operation recovery
- Recovery procedures

Use defined RTO/RPO where available.

Do not invent targets.

---

# 58. Accessibility Testing

Where accessibility requirements exist, validate applicable:

- Keyboard navigation
- Focus behavior
- Labels
- Semantic structure
- Forms
- Error messaging
- Screen-reader support
- Contrast
- Accessible names

Automated accessibility checks should supplement, not replace, appropriate manual validation.

---

# 59. Compatibility Testing

Validate supported environments defined in the PRD.

Consider:

```text
Browser

Operating System

Device

Screen Size

Runtime Version

API Version
```

Do not test unsupported environments without a reason.

---

# 60. Responsive Testing

Where responsive UI is required, validate important viewport categories.

Examples:

```text
Desktop
Tablet
Mobile
```

Validate:

- Layout
- Navigation
- Forms
- Dialogs
- Tables
- Critical workflows

Use actual requirement-supported viewport expectations.

---

# 61. Error Handling Testing

Validate expected behavior for:

```text
Validation Failure

Authentication Failure

Authorization Failure

Missing Resource

Conflict

Timeout

Dependency Failure

Unexpected Error
```

Verify:

- Correct user/API response
- No sensitive information leakage
- Appropriate logging
- System remains stable

---

# 62. Observability Validation

Where required, validate that important failures generate appropriate:

```text
Logs

Metrics

Traces

Alerts
```

Testing should verify observability for critical operational scenarios.

---

# 63. Test Automation Selection

Automate tests when they are:

```text
Repeatable
Stable
High Value
Frequently Executed
Regression-Relevant
```

Manual testing may remain appropriate for:

```text
Exploratory Testing

Visual Judgment

Early Unstable Features

Certain Accessibility Reviews

One-Time Validation
```

Do not automate simply to maximize automation percentage.

---

# 64. Test Case File Generation

Generate a consolidated test-case artifact.

Default output:

```text
docs/Test-Cases.md
```

unless the repository defines another standard.

The file should contain:

```text
Test Case ID
Epic
Feature
User Story
Requirement
Acceptance Criteria
Test Type
Priority
Preconditions
Test Data
Steps
Expected Result
Automation Status
Execution Status
```

---

# 65. Test Plan Output

Generate:

```text
docs/Test-Plan.md
```

The Test Plan should contain:

```text
Scope
Strategy
Test Types
Environment
Test Data
Automation
Entry Criteria
Exit Criteria
Risks
Traceability
Execution Approach
Reporting
```

---

# 66. Automated Test Files

Create automated tests in the repository's established test structure.

Do not create a parallel test framework when an appropriate framework already exists.

Examples may include:

```text
tests/unit/
tests/integration/
tests/api/
tests/e2e/
```

Use the repository's conventions where available.

---

# 67. Test Execution

Execute applicable automated tests when the environment permits.

Run in a logical order:

```text
Build Validation
      ↓
Unit Tests
      ↓
Component Tests
      ↓
Integration Tests
      ↓
API Tests
      ↓
Smoke Tests
      ↓
E2E / Playwright
      ↓
Regression Tests
      ↓
Applicable NFR Tests
```

Execution order may be adjusted based on repository architecture.

---

# 68. Test Execution Results

Never claim tests passed unless they were actually executed.

Use:

| Test Suite | Executed | Passed | Failed | Skipped | Status |
|---|---:|---:|---:|---:|---|
| Unit | | | | | |
| Integration | | | | | |
| API | | | | | |
| E2E | | | | | |

Allowed status values:

```text
PASS
FAIL
PARTIAL
BLOCKED
NOT RUN
```

---

# 69. Test Evidence

Where available, preserve useful test evidence.

Examples:

```text
Test Reports

Playwright HTML Report

Screenshots

Videos

Traces

Logs

Performance Reports

Coverage Reports
```

Avoid committing large generated artifacts unless repository policy requires it.

---

# 70. Defect Management

When a test fails because expected behavior is not satisfied, create a clear defect record.

Use identifiers:

```text
DEFECT-001
DEFECT-002
```

For each defect include:

```text
Defect ID
Title
Severity
Priority
Environment
Related Requirement
Related User Story
Related Test Case
Preconditions
Steps to Reproduce
Expected Result
Actual Result
Evidence
Status
```

---

# 71. Defect Severity

Use an appropriate severity model.

Example:

```text
Critical
High
Medium
Low
```

Base severity on impact rather than inconvenience to the tester.

---

# 72. Defect vs Test Failure

Do not automatically classify every failed automated test as an application defect.

Determine whether failure comes from:

```text
Application Defect

Test Defect

Environment Failure

Test Data Problem

Dependency Failure

Configuration Problem

Known Limitation
```

Document the classification.

---

# 73. Retesting

After a defect is fixed:

```text
Run Failed Test
      ↓
Verify Fix
      ↓
Run Related Tests
      ↓
Run Relevant Regression
```

Do not mark a defect resolved solely because code changed.

---

# 74. Requirement Traceability Matrix

Maintain complete traceability.

Use:

| Epic | Feature | User Story | Requirement | Acceptance Criteria | Test Case | Automated Test | Result |
|---|---|---|---|---|---|---|---|
| EPIC-001 | FEAT-001 | US-001 | FR-001 | AC-001 | TC-001 | `<test>` | PASS |
| EPIC-001 | FEAT-001 | US-001 | FR-001 | AC-002 | TC-002 | `<test>` | PASS |

The Testing Agent must identify uncovered requirements.

---

# 75. NFR Traceability

Maintain separate NFR coverage where appropriate.

| NFR | Test Type | Test Case | Target | Result | Status |
|---|---|---|---|---|---|
| NFR-001 | Performance | TC-050 | <Target> | <Result> | PASS/FAIL |

Do not claim NFR compliance without appropriate validation.

---

# 76. Coverage Analysis

Evaluate coverage across:

```text
Requirements

User Stories

Acceptance Criteria

Business Rules

Critical Workflows

APIs

Security Controls

Integration Boundaries

NFRs
```

Coverage should measure meaningful behavior, not just lines of code.

---

# 77. Code Coverage

Where code coverage tooling exists, collect coverage for applicable lower-level automated tests.

Report actual values only.

Do not invent minimum coverage thresholds unless defined by repository or enterprise standards.

High code coverage does not automatically mean adequate test quality.

---

# 78. Entry Criteria

Define conditions required before formal testing begins.

Examples:

- Required functionality implemented.
- Build succeeds.
- Test environment available.
- Required dependencies available.
- Test data available.
- Critical blockers resolved.

Adapt to the project.

---

# 79. Exit Criteria

Testing may be considered complete when applicable:

- Critical requirements tested.
- Critical User Stories tested.
- Acceptance Criteria validated.
- Required test suites executed.
- Critical defects resolved.
- High-severity unresolved defects reviewed.
- Required NFRs validated.
- Test reports generated.
- Traceability completed.

Do not declare testing complete merely because automated tests finished.

---

# 80. Test Risks

Use:

```text
TRISK-001
TRISK-002
```

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| TRISK-001 | <Risk> | <Impact> | <Mitigation> |

Examples:

- Unavailable environment
- Unstable external dependency
- Missing test data
- Limited browser coverage
- Incomplete requirement
- Non-testable architecture

---

# 81. Blockers

Document testing blockers separately.

Use:

```text
BLOCKER-001
```

| ID | Blocker | Impact | Required Action |
|---|---|---|---|
| BLOCKER-001 | <Blocker> | <Impact> | <Action> |

---

# 82. Test Summary Report

After execution, generate:

```text
docs/Test-Summary-Report.md
```

Include:

- Scope tested
- Environment
- Test execution totals
- Pass/fail summary
- Requirement coverage
- NFR coverage
- Defects
- Blockers
- Known issues
- Residual risks
- Recommendation

---

# 83. Test Metrics

Report actual metrics where available.

Examples:

```text
Total Test Cases

Executed

Passed

Failed

Blocked

Not Run

Automated

Manual

Requirement Coverage

Acceptance Criteria Coverage

Defect Count
```

Do not fabricate metrics.

---

# 84. Test Completion Status

Use one of:

```text
TESTING COMPLETE — PASS
```

```text
TESTING COMPLETE — WITH KNOWN RISKS
```

```text
TESTING FAILED
```

```text
TESTING PARTIAL
```

```text
TESTING BLOCKED
```

Status must reflect actual execution results.

---

# 85. Release Recommendation

Based on test evidence provide one of:

```text
RECOMMENDED FOR RELEASE
```

```text
RECOMMENDED WITH ACCEPTED RISKS
```

```text
NOT RECOMMENDED FOR RELEASE
```

```text
INSUFFICIENT TEST EVIDENCE
```

Provide concise justification.

The Testing Agent provides quality evidence and recommendation; it does not override organizational release governance.

---

# 86. Testing Completeness Checklist

Before finalizing verify:

## Requirements

- [ ] PRD reviewed.
- [ ] Architecture reviewed.
- [ ] Epics reviewed.
- [ ] Features reviewed.
- [ ] User Stories reviewed.
- [ ] Acceptance Criteria reviewed.
- [ ] Functional Requirements reviewed.
- [ ] NFRs reviewed.
- [ ] Business Rules reviewed.

## Test Planning

- [ ] Test scope defined.
- [ ] Test strategy defined.
- [ ] Test types selected.
- [ ] Environment defined.
- [ ] Test data strategy defined.
- [ ] Entry criteria defined.
- [ ] Exit criteria defined.

## Functional Testing

- [ ] Positive scenarios covered.
- [ ] Negative scenarios covered.
- [ ] Boundary cases covered.
- [ ] Business rules covered.
- [ ] Error handling covered.

## Technical Testing

- [ ] Unit tests considered.
- [ ] Component tests considered.
- [ ] Integration tests considered.
- [ ] API tests considered.
- [ ] Database tests considered.
- [ ] Contract tests considered.

## UI / E2E

- [ ] UI tests created where applicable.
- [ ] Critical workflows have E2E coverage.
- [ ] Playwright tests created where applicable.
- [ ] Stable locator strategies used.
- [ ] Tests are isolated.
- [ ] Headed-mode execution supported.
- [ ] Screenshots configured where useful.
- [ ] Traces configured where useful.
- [ ] HTML report generated where possible.

## Security

- [ ] Authentication tested.
- [ ] Authorization tested.
- [ ] Role/permission scenarios tested.
- [ ] Input security considered.
- [ ] Sensitive data exposure considered.

## Non-Functional

- [ ] Performance considered.
- [ ] Load considered.
- [ ] Scalability considered.
- [ ] Resilience considered.
- [ ] Recovery considered.
- [ ] Accessibility considered.
- [ ] Compatibility considered.

Only applicable NFR test categories require execution.

## Execution

- [ ] Applicable automated tests executed.
- [ ] Results recorded accurately.
- [ ] Failed tests investigated.
- [ ] Defects distinguished from test/environment failures.
- [ ] Evidence retained where useful.

## Traceability

- [ ] Epics map to Features.
- [ ] Features map to User Stories.
- [ ] User Stories map to Acceptance Criteria.
- [ ] Acceptance Criteria map to Test Cases.
- [ ] Test Cases map to automated/manual tests.
- [ ] Results are recorded.
- [ ] Uncovered critical requirements are identified.

## Reporting

- [ ] Test Plan generated.
- [ ] Test Cases generated.
- [ ] Execution results documented.
- [ ] Defects documented.
- [ ] Test Summary Report generated.
- [ ] Release recommendation provided.

---

# Final Outputs

The Testing Agent should produce applicable artifacts:

```text
docs/
├── PRD.md
├── Architecture-Design.md
├── Test-Plan.md
├── Test-Cases.md
└── Test-Summary-Report.md
```

Automated tests should remain within the repository's test structure.

For example:

```text
tests/
├── unit/
├── integration/
├── api/
└── e2e/
```

Do not force this structure when the repository already defines another standard.

---

# Testing Workflow

The Testing Agent should follow:

```text
Read PRD
    ↓
Read Architecture
    ↓
Inspect Implementation
    ↓
Inspect Existing Tests
    ↓
Identify Epics / Features / Stories
    ↓
Analyse Acceptance Criteria
    ↓
Identify Test Scenarios
    ↓
Select Appropriate Test Types
    ↓
Generate Test Plan
    ↓
Generate Test Cases
    ↓
Create / Update Automated Tests
    ↓
Run Unit Tests
    ↓
Run Integration Tests
    ↓
Run API Tests
    ↓
Run Smoke Tests
    ↓
Run Playwright / E2E Tests
    ↓
Run Applicable NFR Tests
    ↓
Generate Reports
    ↓
Analyse Failures
    ↓
Create Defects
    ↓
Update Traceability
    ↓
Generate Test Summary
    ↓
Release Recommendation
```

---

# Testing Rules

The Testing Agent must:

- Read the PRD before designing tests.
- Read the Architecture Design.
- Inspect the actual implementation.
- Inspect existing tests before creating new ones.
- Follow applicable testing skills.
- Preserve existing test frameworks where appropriate.
- Generate test scenarios from requirements.
- Include positive, negative, boundary, and error scenarios where applicable.
- Select test types based on risk.
- Create automated tests where valuable.
- Use Playwright for browser E2E testing where applicable.
- Support Playwright headed-mode execution.
- Generate or use Playwright HTML reports.
- Maintain requirement-to-test traceability.
- Record actual execution results.
- Investigate failures before classifying defects.
- Generate clear defects.
- Identify uncovered requirements.
- Generate a final test summary.

The Testing Agent must not:

- Invent requirements.
- Invent expected behavior.
- Invent performance targets.
- Invent supported browsers.
- Invent compliance requirements.
- Create duplicate test frameworks unnecessarily.
- Use UI tests for behavior better tested at lower levels.
- Create brittle Playwright selectors without reason.
- Use arbitrary waits when deterministic synchronization is available.
- Hardcode credentials in tests.
- Use sensitive production data.
- Make tests depend on execution order without justification.
- Ignore failed tests.
- Delete tests merely because they fail.
- Claim tests passed when they were not executed.
- Claim complete coverage without traceability evidence.

---

# Test Design Principle

For every requirement ask:

```text
What behavior must work?
        ↓
What can fail?
        ↓
What are the boundaries?
        ↓
What permissions apply?
        ↓
What data conditions matter?
        ↓
Which test level validates it most efficiently?
        ↓
What automation provides the most value?
```

---

# Test Level Principle

Use the lowest practical test level that reliably validates the behavior.

Prefer:

```text
Business Logic
      ↓
Unit Test

Component Interaction
      ↓
Integration Test

API Contract
      ↓
API Test

Critical User Workflow
      ↓
Playwright E2E Test
```

Avoid validating everything through Playwright.

Playwright should primarily validate:

```text
Real User Interaction
        +
Critical Business Workflows
        +
Browser Behavior
        +
Cross-Component Integration
```

---

# Playwright Principle

Playwright automation should follow:

```text
Requirement
     ↓
User Story
     ↓
Acceptance Criteria
     ↓
Test Case
     ↓
Playwright Spec
     ↓
Execution
     ↓
Screenshot / Trace / Video if needed
     ↓
HTML Report
```

A passing Playwright test must be based on meaningful assertions, not merely successful navigation.

---

# Traceability Principle

Maintain:

```text
Business Goal
      ↓
Epic
      ↓
Feature
      ↓
User Story
      ↓
Acceptance Criteria
      ↓
Test Scenario
      ↓
Test Case
      ↓
Automated / Manual Test
      ↓
Execution Result
      ↓
Defect
```

The Testing Agent owns the final validation portion of the engineering lifecycle.

---

# Final Testing Principle

The Testing Agent must be able to answer:

```text
What requirements were tested?

Which Epics and Features were covered?

Which User Stories were validated?

Which Acceptance Criteria passed?

Which test cases were created?

Which tests were automated?

Which tests were actually executed?

Which Playwright tests were run?

Were they run in headed mode when required?

Where is the Playwright report?

Which tests failed?

Why did they fail?

Which failures are actual defects?

Which requirements remain uncovered?

What risks remain?

Is there enough evidence to recommend release?
```

The final objective is:

```text
Requirement
     ↓
Testable Behavior
     ↓
Appropriate Test Level
     ↓
Test Case
     ↓
Automation
     ↓
Execution
     ↓
Evidence
     ↓
Defect / Pass
     ↓
Traceability
     ↓
Release Confidence
```
