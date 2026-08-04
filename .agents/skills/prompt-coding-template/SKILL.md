---
name: prompt-coding-template
description: Reusable coding and implementation template. Use when Codex structures or validates an implementation deliverable.
---

# Coding & Implementation Template

## Purpose

Use this template to guide implementation of the solution defined by the Product Requirements Document and Architecture Design Document.

Primary inputs:

```text
docs/PRD.md
docs/Architecture-Design.md
```

The Development Agent must also inspect:

```text
Existing Source Code
Repository Structure
Configuration
Dependencies
Build Files
Tests
Infrastructure Definitions
Repository Instructions
Applicable Engineering Skills
```

The Development Agent must implement requirements while preserving:

```text
PRD
 ↓
Epic
 ↓
Feature
 ↓
User Story
 ↓
Acceptance Criteria
 ↓
Architecture
 ↓
Code
 ↓
Tests
 ↓
Validation
```

The goal is not merely to generate code.

The goal is to produce:

```text
Correct
+
Maintainable
+
Secure
+
Testable
+
Architecture-Compliant
+
Production-Ready
```

implementation.

---

# 1. Implementation Context

Before modifying code, understand:

- Business objective
- Scope
- Epics
- Features
- User Stories
- Acceptance Criteria
- Functional Requirements
- Non-Functional Requirements
- Architecture decisions
- Component boundaries
- Data architecture
- API contracts
- Security requirements
- Integration requirements
- Deployment constraints

Do not begin implementation without sufficient context.

---

# 2. Source Documents

Review applicable:

```text
docs/PRD.md
docs/Architecture-Design.md
```

Also inspect applicable repository instructions and skills.

The PRD defines:

```text
WHAT
+
WHY
```

The Architecture Design defines:

```text
HOW
+
WITH WHAT
```

The Development Agent implements:

```text
WORKING CODE
```

that conforms to both.

---

# 3. Repository Analysis

Before creating or modifying files, inspect the repository.

Understand:

```text
Repository Structure

Programming Languages

Frameworks

Build System

Package Management

Existing Modules

Existing Components

Existing APIs

Existing Data Access

Configuration

Tests

Infrastructure

CI/CD

Coding Conventions
```

Do not assume a greenfield implementation when an existing codebase exists.

---

# 4. Existing Code Assessment

For existing repositories, determine:

- Existing architecture pattern
- Existing coding conventions
- Reusable components
- Existing interfaces
- Existing abstractions
- Existing utilities
- Existing domain models
- Existing error handling
- Existing logging
- Existing testing patterns

Prefer extending appropriate existing patterns rather than introducing unnecessary competing approaches.

Do not rewrite working code without a requirement or clear engineering justification.

---

# 5. Implementation Scope

Identify what must be:

```text
Created

Modified

Extended

Reused

Removed
```

Provide a concise implementation scope.

Example:

| Item | Action | Reason | Requirement |
|---|---|---|---|
| `<component>` | Create | Required capability | FR-001 |
| `<component>` | Modify | Extend existing behavior | US-002 |
| `<component>` | Reuse | Existing capability | FEAT-001 |

---

# 6. Requirement Selection

Before implementation, identify the work being implemented.

Use:

```text
Epic:
Feature:
User Story:
Functional Requirement:
Acceptance Criteria:
```

Example:

```text
Epic: EPIC-001
Feature: FEAT-001
User Story: US-001
Requirement: FR-001
Acceptance Criteria:
- AC-001
- AC-002
```

Implementation must remain traceable to requirements.

---

# 7. Implementation Plan

Before substantial coding, create a concise implementation plan.

For each implementation unit define:

| Step | Change | Component | Requirement | Dependency |
|---|---|---|---|---|
| 1 | <Change> | COMP-001 | FR-001 | None |
| 2 | <Change> | COMP-002 | FR-002 | Step 1 |

The plan should follow technical dependencies.

Avoid creating unnecessarily large implementation plans.

---

# 8. File Change Plan

Identify expected file-level changes.

Use:

```text
CREATE
MODIFY
DELETE
```

Example:

```text
CREATE
src/<module>/<file>

MODIFY
src/<existing-module>/<file>

CREATE
tests/<module>/<test-file>
```

Do not create files merely to satisfy a predefined folder structure.

Create files only when they serve a clear responsibility.

---

# 9. Architecture Compliance

Implementation must conform to:

```text
docs/Architecture-Design.md
```

Verify:

- Architecture pattern
- Component boundaries
- Module boundaries
- Dependency direction
- API contracts
- Data ownership
- Integration boundaries
- Security boundaries
- Infrastructure constraints
- ADRs

Do not silently deviate from an accepted Architecture Decision Record.

If implementation requires an architecture change, identify it before introducing the change.

---

# 10. Component Boundaries

Maintain responsibilities defined in the architecture.

For each component:

```text
Component
    ↓
Responsibility
    ↓
Interface
    ↓
Implementation
```

Avoid:

- Overlapping responsibilities
- Circular dependencies
- Unnecessary coupling
- Cross-layer shortcuts
- Uncontrolled shared state

---

# 11. Coding Standards

Follow applicable repository and enterprise coding standards.

Code should be:

- Readable
- Consistent
- Maintainable
- Testable
- Secure
- Simple
- Explicit where clarity matters

Use meaningful:

```text
Class Names
Function Names
Method Names
Variable Names
Module Names
File Names
```

Avoid unnecessary abbreviations.

---

# 12. Clean Code

Prefer:

```text
Small Focused Functions

Clear Responsibilities

Meaningful Names

Explicit Dependencies

Minimal Side Effects

Simple Control Flow
```

Avoid:

```text
God Classes

God Functions

Deep Nesting

Duplicate Logic

Magic Values

Dead Code

Commented-Out Code

Hidden Side Effects

Premature Abstraction
```

---

# 13. SOLID and Design Principles

Apply design principles where they improve maintainability.

Consider:

```text
Single Responsibility

Open/Closed

Liskov Substitution

Interface Segregation

Dependency Inversion
```

Do not apply patterns mechanically.

The goal is maintainability, not pattern count.

---

# 14. Dependency Management

Dependencies should be explicit and justified.

Before adding a dependency determine:

```text
Is it actually required?

Can existing functionality provide this capability?

Is the dependency actively maintained?

Does it introduce security risk?

Does it significantly increase application size or complexity?

Is its license acceptable?

```

Do not introduce libraries for trivial functionality.

---

# 15. Configuration Management

Environment-specific values must be externalized.

Examples:

```text
Service URLs

Feature Flags

Timeouts

Connection Information

Runtime Settings

Environment Settings
```

Do not hardcode environment-specific values.

Configuration should support applicable environments such as:

```text
Development
Testing
Staging
Production
```

---

# 16. Secret Management

Never hardcode:

```text
Passwords

API Keys

Tokens

Private Keys

Connection Secrets

Credentials
```

Secrets must come from approved secret-management mechanisms.

Prefer workload or managed identities where supported and appropriate.

---

# 17. Input Validation

Validate all untrusted input.

Consider:

- Required values
- Data types
- Length
- Format
- Range
- Allowed values
- Business rules

Validation must occur at appropriate trust boundaries.

Do not rely solely on frontend validation.

---

# 18. Error Handling

Handle errors consistently.

Distinguish where applicable:

```text
Validation Errors

Business Rule Violations

Authentication Errors

Authorization Errors

Missing Resources

Conflict Errors

Dependency Failures

Unexpected Failures
```

Do not:

```text
Swallow Exceptions

Expose Internal Stack Traces

Return Sensitive Information

Use Generic Success Responses for Failures
```

Errors should be useful to callers and operators without leaking sensitive implementation details.

---

# 19. Logging

Implement structured logging where applicable.

Logs should provide sufficient context to diagnose failures.

Consider:

```text
Timestamp

Severity

Operation

Correlation ID

Component

Relevant Non-Sensitive Context
```

Never log:

```text
Passwords

Tokens

API Keys

Secrets

Private Keys

Sensitive Data Unnecessarily
```

---

# 20. API Implementation

Where APIs are required, follow the Architecture Design and applicable API standards.

Implement:

- Defined routes/endpoints
- Request contracts
- Response contracts
- Validation
- Authentication
- Authorization
- Consistent errors
- Versioning where required
- Pagination where required
- Filtering where required
- Idempotency where required

Do not invent API endpoints unsupported by requirements.

---

# 21. API Contract Stability

Avoid unnecessary breaking changes.

When modifying existing APIs:

- Preserve compatible contracts where possible.
- Identify breaking changes.
- Update consumers where required.
- Update documentation.
- Update tests.

Do not silently change externally consumed contracts.

---

# 22. Authentication

Implement authentication according to the Architecture Design.

Do not create custom authentication mechanisms when approved identity mechanisms exist.

Validate authentication at trusted boundaries.

---

# 23. Authorization

Authorization must be enforced server-side or at equivalent trusted boundaries.

Apply:

```text
Least Privilege

Default Deny

Explicit Permissions
```

where applicable.

Do not rely on hidden UI controls as authorization.

---

# 24. Data Access

Follow data ownership and persistence rules defined by architecture.

Keep data access responsibilities clear.

Avoid mixing:

```text
Business Logic
+
Persistence Logic
+
Transport Logic
```

within the same implementation unit without justification.

---

# 25. Database Implementation

Where database changes are required, implement:

- Schema changes
- Migrations
- Constraints
- Relationships
- Indexes
- Data access
- Transactions

according to architecture.

Database changes must be repeatable and version-controlled.

---

# 26. Database Migrations

Use the repository's migration mechanism.

Migrations should:

- Be deterministic
- Be version-controlled
- Be repeatable where appropriate
- Preserve existing data where required
- Support deployment strategy

Avoid manual production schema changes.

---

# 27. Query Design

Queries should:

- Retrieve only required data
- Avoid unnecessary round trips
- Avoid obvious N+1 patterns
- Use appropriate indexes
- Support expected access patterns

Do not optimize prematurely without evidence.

---

# 28. Transaction Management

Use transactions where operations must remain atomic.

Keep transaction boundaries as small as practical.

Do not create long-running transactions unnecessarily.

---

# 29. Concurrency

Where concurrent updates are possible, implement the consistency strategy defined by architecture.

Consider applicable:

- Optimistic concurrency
- Pessimistic locking
- Idempotency
- Conflict detection
- Retry

Do not introduce concurrency mechanisms without a relevant scenario.

---

# 30. Integration Implementation

Implement external integrations according to defined contracts.

For each integration consider:

```text
Authentication

Timeout

Failure Handling

Retry

Validation

Mapping

Logging

Observability
```

External dependencies must not be assumed to be permanently available.

---

# 31. Retry Behavior

Retries should only be used for transient failures.

Where retries are required:

- Limit attempts.
- Apply delay/backoff where appropriate.
- Avoid retry storms.
- Ensure operations are safe to retry.
- Consider idempotency.

Do not retry permanent validation or authorization failures.

---

# 32. Asynchronous Processing

Where asynchronous processing is defined by architecture, implement:

```text
Producer
 ↓
Message / Event
 ↓
Consumer
 ↓
Processing
```

Consider:

- Duplicate delivery
- Ordering
- Idempotency
- Retry
- Dead-letter handling
- Observability

Do not introduce asynchronous messaging unless architecture requires it.

---

# 33. Caching

Only implement caching where defined or justified.

Define:

```text
Cache Key

Cached Data

Expiration

Invalidation

Failure Behavior
```

Do not treat caching as the source of truth unless explicitly designed that way.

---

# 34. Security Implementation

Apply secure engineering practices throughout implementation.

Consider applicable:

- Input validation
- Output encoding
- Authentication
- Authorization
- Secret protection
- Data protection
- Injection prevention
- Secure dependencies
- Secure configuration
- Logging hygiene
- Least privilege

Security must be integrated into normal implementation, not added only after coding is complete.

---

# 35. Sensitive Data

Identify sensitive data from the PRD and architecture.

Ensure it is:

- Collected only when required
- Protected appropriately
- Not unnecessarily logged
- Not exposed in errors
- Not returned to unauthorized callers
- Retained according to requirements

---

# 36. Secure Defaults

Prefer secure defaults.

Examples:

```text
Authentication Required

Authorization Denied Unless Granted

HTTPS

Restricted Network Access

Minimal Permissions

No Debug Information in Production
```

Apply only where relevant to the implementation.

---

# 37. Frontend Implementation

Where a frontend exists, follow existing application standards.

Maintain:

- Component separation
- Reusability
- Accessibility
- Responsive behavior where required
- State-management consistency
- Validation
- Error handling
- Loading states

Do not embed sensitive business/security logic solely in frontend code.

---

# 38. User Experience States

Where UI exists, implement applicable states:

```text
Loading

Success

Empty

Validation Error

Authorization Error

System Error

Retry / Recovery
```

Do not design only the successful path.

---

# 39. Accessibility

Implement accessibility requirements defined by the PRD.

Consider applicable:

- Keyboard navigation
- Semantic markup
- Labels
- Focus management
- Screen-reader compatibility
- Contrast
- Error identification

Do not claim compliance with a standard unless validated.

---

# 40. Performance

Implement with reasonable performance characteristics.

Consider:

- Algorithm complexity
- Database access
- Network calls
- Payload size
- Serialization
- Repeated computation
- Memory usage

Avoid premature optimization.

Optimize when requirements or evidence justify it.

---

# 41. Resource Management

Ensure resources are properly managed.

Examples:

```text
Connections

Streams

Files

Threads

Tasks

Transactions
```

Release resources appropriately.

Avoid resource leaks.

---

# 42. Resilience

Implement resilience mechanisms defined by architecture.

Possible mechanisms include:

```text
Timeout

Retry

Backoff

Circuit Breaker

Fallback

Graceful Degradation
```

Do not add resilience patterns mechanically.

---

# 43. Observability

Implementation must support architecture observability requirements.

Where applicable include:

```text
Logs

Metrics

Traces

Health Checks

Correlation
```

Operational behavior should be diagnosable without reproducing every failure locally.

---

# 44. Health Checks

Where required, implement meaningful health checks.

Consider:

```text
Liveness

Readiness

Critical Dependencies
```

Health checks must not always return healthy regardless of actual state.

---

# 45. Feature Flags

Where feature flags are required:

- Keep flags explicit.
- Define default behavior.
- Avoid deeply nested flags.
- Remove obsolete flags.
- Do not use feature flags as permanent architecture.

---

# 46. Infrastructure Changes

Where implementation requires infrastructure changes, follow the approved Infrastructure as Code approach.

Do not manually create infrastructure when the repository requires IaC.

Infrastructure changes must remain consistent with:

```text
Architecture-Design.md
```

---

# 47. Infrastructure as Code

Where applicable:

- Reuse existing modules.
- Parameterize environment differences.
- Avoid hardcoded secrets.
- Validate configuration.
- Follow least privilege.
- Avoid unnecessary resources.
- Prefer cost-efficient resource tiers satisfying requirements.

Do not change architecture-level infrastructure decisions silently.

---

# 48. Documentation

Update documentation when implementation changes:

- Setup
- Configuration
- APIs
- Dependencies
- Architecture-relevant behavior
- Deployment
- Operational procedures

Do not leave documentation inconsistent with implementation.

---

# 49. Code Comments

Comments should explain:

```text
WHY
```

when code alone cannot communicate intent.

Avoid comments that merely restate:

```text
WHAT
```

the code already clearly expresses.

---

# 50. Unit Tests

Create or update unit tests for applicable business and component logic.

Cover:

- Expected behavior
- Validation
- Business rules
- Important edge cases
- Error behavior

Unit tests should be:

```text
Fast

Independent

Deterministic
```

Detailed testing standards are governed by the testing skills and test-plan template.

---

# 51. Integration Tests

Create integration tests where component boundaries require validation.

Examples:

```text
Application ↔ Database

Application ↔ External Adapter

API ↔ Application

Service ↔ Messaging
```

Use realistic boundaries where practical.

---

# 52. Test Traceability

Tests should map to requirements where practical.

Example:

```text
US-001
  ↓
AC-001
  ↓
Implementation
  ↓
Unit / Integration Test
```

Do not create meaningless tests solely to increase coverage numbers.

---

# 53. Build Validation

After implementation, run the repository's applicable build process.

Verify:

```text
Dependency Restore

Compilation

Static Analysis

Linting

Formatting

Unit Tests

Integration Tests
```

as supported by the repository.

Do not report successful implementation when the build is failing unless the failure is clearly unrelated and documented.

---

# 54. Static Analysis

Run configured static-analysis tools where available.

Address relevant:

```text
Compiler Warnings

Lint Violations

Code Quality Issues

Security Findings
```

Do not disable rules merely to obtain a passing result without justification.

---

# 55. Dependency Validation

After dependency changes verify:

- Dependency resolution succeeds.
- Build succeeds.
- Tests succeed.
- Known vulnerabilities are considered.
- Lock files are updated where required.
- Unused dependencies are removed.

---

# 56. Security Validation

Where tooling exists, run applicable:

```text
Secret Scanning

SAST

Dependency Scanning

Container Scanning

IaC Scanning
```

Do not ignore critical security findings without documenting the reason.

---

# 57. Implementation Validation

Validate implementation against:

```text
Functional Requirements

User Stories

Acceptance Criteria

Architecture

Security Requirements

NFRs
```

For each implemented story verify:

| User Story | Acceptance Criteria | Implementation | Test | Status |
|---|---|---|---|---|
| US-001 | AC-001 | <Component/File> | <Test> | Pass/Fail |

---

# 58. Requirement-to-Code Traceability

Maintain implementation traceability.

```text
Goal
 ↓
Epic
 ↓
Feature
 ↓
User Story
 ↓
Requirement
 ↓
Architecture Component
 ↓
Code
 ↓
Test
```

Use:

| Epic | Feature | User Story | Requirement | Component | Implementation | Tests |
|---|---|---|---|---|---|---|
| EPIC-001 | FEAT-001 | US-001 | FR-001 | COMP-001 | `<path>` | `<test>` |

Do not duplicate every source file.

Map the primary implementation artifacts.

---

# 59. Architecture Deviation

If implementation cannot follow an architecture decision, document:

```text
Architecture Decision:
Reason for Deviation:
Impact:
Alternative:
Required Architecture Update:
```

Do not silently introduce architecture drift.

Significant deviations should be reviewed before implementation continues.

---

# 60. Technical Debt

If implementation intentionally introduces temporary technical debt, document it.

Use:

```text
TD-001
TD-002
```

| ID | Technical Debt | Reason | Impact | Recommended Resolution |
|---|---|---|---|---|
| TD-001 | <Debt> | <Reason> | <Impact> | <Resolution> |

Do not label incomplete required functionality as acceptable technical debt.

---

# 61. Implementation Risks

Document significant implementation risks.

Use:

```text
IRISK-001
IRISK-002
```

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| IRISK-001 | <Risk> | <Impact> | <Mitigation> |

Only include meaningful risks.

---

# 62. Implementation Summary

After implementation, provide a concise summary.

Include:

### Implemented Epics

```text
EPIC-XXX
```

### Implemented Features

```text
FEAT-XXX
```

### Implemented User Stories

```text
US-XXX
```

### Implemented Requirements

```text
FR-XXX
```

### Components Modified

```text
COMP-XXX
```

### Files Created

```text
<paths>
```

### Files Modified

```text
<paths>
```

### Tests Added / Updated

```text
<tests>
```

### Infrastructure Changes

```text
<changes or N/A>
```

---

# 63. Validation Results

Provide actual validation results.

Example:

| Validation | Result |
|---|---|
| Build | PASS / FAIL / NOT RUN |
| Unit Tests | PASS / FAIL / NOT RUN |
| Integration Tests | PASS / FAIL / NOT RUN |
| Lint / Static Analysis | PASS / FAIL / NOT RUN |
| Security Scan | PASS / FAIL / NOT RUN |

Never claim a test or validation passed if it was not actually executed.

If execution was not possible, use:

```text
NOT RUN
```

and explain why.

---

# 64. Known Issues

Document unresolved issues.

Use:

```text
ISSUE-001
ISSUE-002
```

| ID | Issue | Impact | Recommended Action |
|---|---|---|---|
| ISSUE-001 | <Issue> | <Impact> | <Action> |

Do not hide known implementation problems.

---

# 65. Testing Handoff

Before handing implementation to the Testing Agent, provide:

```text
Implemented Epics

Implemented Features

Implemented User Stories

Acceptance Criteria

Modified Components

API Changes

Database Changes

Integration Changes

Security Changes

Configuration Changes

Infrastructure Changes

Known Risks

Known Issues
```

This allows the Testing Agent to generate complete:

```text
Unit Tests

Integration Tests

API Tests

End-to-End Tests

Playwright Tests

Security Tests

Performance Tests

Resilience Tests

Regression Tests
```

as applicable.

---

# 66. Definition of Done

Implementation is complete only when applicable criteria are satisfied.

## Requirements

- [ ] Implemented functionality maps to requirements.
- [ ] User Stories are addressed.
- [ ] Acceptance Criteria are addressed.
- [ ] No unauthorized scope was introduced.

## Architecture

- [ ] Architecture Design was followed.
- [ ] Component boundaries were respected.
- [ ] ADRs were followed.
- [ ] Architecture deviations are documented.

## Code Quality

- [ ] Coding standards were followed.
- [ ] Responsibilities are clear.
- [ ] Duplicate logic was minimized.
- [ ] Dead code was removed.
- [ ] Dependencies are justified.

## Security

- [ ] Input validation is implemented.
- [ ] Authentication is implemented where required.
- [ ] Authorization is enforced where required.
- [ ] Secrets are not hardcoded.
- [ ] Sensitive information is protected.
- [ ] Security scans were executed where available.

## Data

- [ ] Data ownership is respected.
- [ ] Database changes are version-controlled.
- [ ] Transactions are appropriate.
- [ ] Queries follow expected access patterns.

## APIs

- [ ] API contracts match architecture.
- [ ] Validation is implemented.
- [ ] Error handling is consistent.
- [ ] Authentication/authorization is enforced.

## Reliability

- [ ] Failure scenarios are handled where required.
- [ ] Timeouts are configured where appropriate.
- [ ] Retry behavior is safe where required.
- [ ] External dependency failures are considered.

## Observability

- [ ] Required logging exists.
- [ ] Sensitive information is not logged.
- [ ] Metrics/traces are implemented where required.
- [ ] Health checks are implemented where required.

## Testing

- [ ] Unit tests exist where applicable.
- [ ] Integration tests exist where applicable.
- [ ] Tests map to important requirements.
- [ ] Existing relevant tests still pass.

## Validation

- [ ] Application builds successfully.
- [ ] Static analysis passes or findings are documented.
- [ ] Tests pass or failures are documented.
- [ ] Dependency changes are validated.
- [ ] Security findings are addressed or documented.

## Documentation

- [ ] Documentation was updated where required.
- [ ] Configuration changes are documented.
- [ ] API changes are documented.
- [ ] Known issues are documented.

---

# 67. Implementation Status

Use one of:

```text
IMPLEMENTATION COMPLETE
```

or:

```text
IMPLEMENTATION COMPLETE WITH KNOWN ISSUES
```

or:

```text
PARTIALLY IMPLEMENTED
```

or:

```text
BLOCKED — CLARIFICATION REQUIRED
```

Do not mark implementation complete if required functionality remains unimplemented.

---

# Implementation Workflow

The Development Agent should follow:

```text
Read PRD
   ↓
Read Architecture Design
   ↓
Inspect Repository
   ↓
Identify Epic / Feature / User Story
   ↓
Understand Acceptance Criteria
   ↓
Identify Architecture Components
   ↓
Create Implementation Plan
   ↓
Implement
   ↓
Create / Update Tests
   ↓
Build
   ↓
Static Analysis
   ↓
Security Validation
   ↓
Run Tests
   ↓
Validate Acceptance Criteria
   ↓
Document Changes
   ↓
Testing Handoff
```

---

# Implementation Rules

The Development Agent must:

- Read the PRD.
- Read the Architecture Design.
- Inspect the existing repository before modifying code.
- Follow applicable engineering skills.
- Preserve existing conventions where appropriate.
- Implement against Epics, Features, User Stories, and Acceptance Criteria.
- Maintain architecture boundaries.
- Follow accepted ADRs.
- Write clear and maintainable code.
- Validate untrusted input.
- Implement secure error handling.
- Protect secrets.
- Protect sensitive data.
- Use structured logging where applicable.
- Create or update appropriate tests.
- Run available validation.
- Report actual validation results.
- Maintain requirement-to-code traceability.
- Document significant deviations and issues.

The Development Agent must not:

- Invent requirements.
- Invent business rules.
- Invent integrations.
- Ignore architecture decisions.
- Rewrite unrelated code.
- Add unnecessary dependencies.
- Add unnecessary abstractions.
- Add unnecessary infrastructure.
- Hardcode secrets.
- Hardcode environment-specific configuration.
- Disable security controls for convenience.
- Suppress meaningful errors.
- Remove tests simply because they fail.
- Change API contracts without considering consumers.
- Modify database schemas manually when migrations are required.
- Claim tests passed when they were not executed.
- Mark incomplete functionality as complete.

---

# Change Scope Principle

Prefer:

```text
Smallest Safe Change
       +
Complete Requirement
       +
Architecture Compliance
       +
Tests
```

Avoid:

```text
Requested Change
       +
Unrelated Refactoring
       +
Unnecessary Dependencies
       +
Architecture Changes
```

Keep changes focused while still implementing the requirement completely.

---

# Code Generation Principle

Do not generate code merely because a file or abstraction could exist.

Before creating something ask:

```text
Is it required?

Does an existing implementation already solve it?

Does architecture require it?

Which responsibility does it own?

Which requirement does it satisfy?

How will it be tested?
```

If these questions cannot be answered, reconsider creating it.

---

# Security Principle

Every implementation path should consider:

```text
Input
 ↓
Validation
 ↓
Authentication
 ↓
Authorization
 ↓
Business Logic
 ↓
Data Access
 ↓
Response
 ↓
Logging / Audit
```

Apply only the controls relevant to the operation.

---

# Testing Principle

Implementation and testing must remain connected:

```text
EPIC-001
    ↓
FEAT-001
    ↓
US-001
    ↓
AC-001
    ↓
COMP-001
    ↓
Implementation
    ↓
Unit Test
    ↓
Integration Test
    ↓
End-to-End Validation
```

Not every requirement needs every test type.

Testing depth must match risk and behavior.

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
Architecture Component
      ↓
Source Code
      ↓
Automated Test
      ↓
Validation Result
```

The Development Agent owns the:

```text
Architecture
      ↓
Implementation
      ↓
Developer Validation
```

portion of this chain.

---

# Final Principle

The Development Agent should answer:

```text
What requirement am I implementing?

Which Epic and Feature does it belong to?

Which User Story defines the behavior?

What Acceptance Criteria must pass?

Which architecture component owns it?

What existing code can be reused?

What code needs to change?

How should it be implemented securely?

How should errors be handled?

How should it be observed?

How will it be tested?

Did the build actually succeed?

Did the tests actually pass?

Does the implementation satisfy the requirement?
```

The objective is not:

```text
Generate as much code as possible.
```

The objective is:

```text
Correct Requirement
        ↓
Correct Architecture
        ↓
Focused Implementation
        ↓
Secure & Maintainable Code
        ↓
Automated Validation
        ↓
Traceable Result
```
