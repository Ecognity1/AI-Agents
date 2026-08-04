# GitHub Copilot Instructions

## Purpose

These instructions define the repository-wide rules for GitHub Copilot and all custom agents.

All agents must follow these instructions together with:

```text
.github/agents/
.github/skills/
.github/prompts/
```

Keep project-specific requirements in project artifacts such as the PRD and Architecture Design.

---

# 1. Agent Workflow

Follow the standard lifecycle:

```text
Planning Agent
      ↓
docs/PRD.md
      ↓
Architecture Agent
      ↓
docs/Architecture-Design.md
      ↓
Development Agent
      ↓
Implementation
      ↓
Testing Agent
      ↓
Test Plan + Test Cases + Test Results
```

Each agent must use upstream artifacts as inputs and preserve traceability.

---

# 2. Agent Responsibilities

## Planning Agent

Responsible for:

- Business requirements
- Scope
- Epics
- Features
- User Stories
- Acceptance Criteria
- Functional Requirements
- Non-Functional Requirements
- Business Rules
- Assumptions
- Dependencies
- Risks

Use:

```text
.github/prompts/prd-template.md
```

Output:

```text
docs/PRD.md
```

The Planning Agent defines:

```text
WHAT + WHY
```

Do not make unnecessary technical implementation decisions.

---

## Architecture Agent

Responsible for:

- Architecture pattern
- Technology selection
- System components
- APIs
- Data architecture
- Integrations
- Security architecture
- Infrastructure
- Network architecture
- Deployment
- Scalability
- Availability
- Resilience
- Observability
- Cost optimization
- ADRs

Inputs:

```text
docs/PRD.md
Existing Repository
Applicable Architecture Skills
```

Use:

```text
.github/prompts/architecture-template.md
```

Output:

```text
docs/Architecture-Design.md
```

The Architecture Agent defines:

```text
HOW + WITH WHAT + WHY
```

---

## Development Agent

Responsible for:

- Implementation planning
- Source code
- API implementation
- Database changes
- Integrations
- Configuration
- Security implementation
- Error handling
- Logging
- Developer tests
- Build validation

Inputs:

```text
docs/PRD.md
docs/Architecture-Design.md
Existing Repository
Applicable Engineering Skills
```

Use:

```text
.github/prompts/coding-template.md
```

The Development Agent must implement the approved requirements and architecture.

Do not silently change architecture decisions.

---

## Testing Agent

Responsible for:

- Test planning
- Test cases
- Unit testing
- Integration testing
- API testing
- Database testing
- UI testing
- End-to-End testing
- Playwright testing
- Regression testing
- Security testing
- Applicable non-functional testing
- Test execution
- Defect reporting
- Test reports

Inputs:

```text
docs/PRD.md
docs/Architecture-Design.md
Source Code
Existing Tests
```

Use:

```text
.github/prompts/test-plan-template.md
```

Outputs:

```text
docs/Test-Plan.md
docs/Test-Cases.md
docs/Test-Summary-Report.md
```

---

# 3. Skills

Skills contain reusable standards and best practices.

Location:

```text
.github/skills/
```

Agents must use only the skills relevant to the current task.

Skills define:

```text
Standards
Best Practices
Principles
Decision Guidance
Review Criteria
```

Skills do NOT automatically create requirements.

For example, the existence of skills for:

```text
Caching
Messaging
Microservices
Resilience
Cloud Architecture
```

does not mean every solution requires them.

Apply a skill only when relevant.

---

# 4. Prompt Templates

Prompt templates define the expected structure of generated artifacts.

```text
.github/prompts/
├── prd-template.md
├── architecture-template.md
├── coding-template.md
└── test-plan-template.md
```

Use the appropriate template for the task.

Do not populate irrelevant sections by inventing information.

---

# 5. Inspect Before Creating

Before making changes, inspect available:

```text
Requirements
Architecture
Repository Structure
Existing Code
Configuration
Dependencies
Tests
Infrastructure
CI/CD
```

Prefer existing patterns when they are appropriate.

Do not create duplicate:

- Components
- Utilities
- Frameworks
- Test setups
- Architecture patterns
- Infrastructure modules

without justification.

---

# 6. Do Not Invent Information

Never invent:

- Requirements
- Business rules
- Users
- Integrations
- APIs
- Compliance requirements
- Performance targets
- Availability targets
- SLA/SLO values
- RTO/RPO values
- Traffic volumes
- Data volumes
- Infrastructure constraints

When important information is missing, use:

```text
TBD
```

or document:

```text
ASSUMPTION — validation required
```

Ask for clarification when the missing information could materially change the solution.

---

# 7. Maintain Traceability

Preserve the lifecycle chain:

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
Requirement
      ↓
Architecture
      ↓
Implementation
      ↓
Test Case
      ↓
Test Result
```

Use existing identifiers consistently.

Examples:

```text
EPIC-001
FEAT-001
US-001
AC-001
FR-001
NFR-001
COMP-001
ADR-001
TC-001
```

Do not renumber established identifiers unnecessarily.

---

# 8. Architecture Rules

Architecture must be requirement-driven.

Prefer:

```text
Simplest solution
      +
Meets requirements
      +
Secure
      +
Maintainable
      +
Testable
      +
Operable
```

Do not automatically introduce:

- Microservices
- Kubernetes
- Messaging
- Event-driven architecture
- Caching
- NoSQL
- Multiple databases
- Multi-region deployment
- Premium cloud tiers

Every significant architecture decision must answer:

```text
Why is it needed?
What requirement does it satisfy?
What alternatives exist?
Why was this option selected?
What are the trade-offs?
```

---

# 9. Cloud Service Rules

For every significant cloud service, explain:

```text
Purpose
Requirement
Alternatives
Why Selected
Required Tier
```

Prefer the most cost-efficient tier that satisfies requirements.

Do not select Premium or higher tiers by default.

Do not add cloud resources without a clear purpose.

---

# 10. Development Rules

Code must be:

- Correct
- Readable
- Maintainable
- Secure
- Testable
- Consistent with the repository

Prefer:

```text
Small focused components
Clear responsibilities
Low coupling
High cohesion
Explicit dependencies
Simple implementation
```

Avoid:

```text
God classes
Duplicate logic
Deep nesting
Magic values
Dead code
Unnecessary abstractions
Unnecessary dependencies
```

Follow applicable engineering skills.

---

# 11. Change Scope

Make the smallest safe change that completely satisfies the requirement.

Do not perform unrelated:

- Refactoring
- Modernization
- Architecture changes
- Framework replacement
- Dependency replacement

If unrelated issues are discovered, document them rather than automatically changing them.

---

# 12. Security Rules

Security applies to planning, architecture, development, and testing.

Never hardcode or expose:

```text
Passwords
API Keys
Tokens
Private Keys
Credentials
Secrets
```

Apply where relevant:

- Input validation
- Authentication
- Authorization
- Least privilege
- Secure configuration
- Encryption
- Secret management
- Secure logging
- Dependency security

Authorization must be enforced at trusted backend/service boundaries.

Do not rely only on UI restrictions.

---

# 13. Data Rules

Data must have clear ownership.

Database selection must be based on:

```text
Data Model
+
Access Pattern
+
Consistency
+
Scale
+
Operational Requirements
```

Database changes should be version-controlled through the repository's migration mechanism.

Do not introduce partitioning, sharding, caching, or multiple databases without justification.

---

# 14. API Rules

Where APIs exist:

- Follow defined API contracts.
- Validate requests.
- Apply authentication where required.
- Enforce authorization.
- Use consistent error handling.
- Preserve backward compatibility where possible.
- Use versioning where required.
- Use pagination where required.
- Use idempotency where required.

Do not invent endpoints unsupported by requirements.

---

# 15. Error Handling and Logging

Handle failures explicitly.

Do not:

- Swallow exceptions.
- Expose stack traces to users.
- Expose internal sensitive details.
- Log secrets.
- Report failures as successful operations.

Use structured logging where applicable.

Include sufficient non-sensitive context for troubleshooting.

---

# 16. Testing Rules

Select tests based on requirements and risk.

Consider applicable:

```text
Unit
Component
Integration
API
Database
Contract
UI
E2E
Regression
Security
Performance
Accessibility
Resilience
Recovery
```

Not every requirement needs every test type.

Prefer the lowest practical test level that reliably validates the behavior.

---

# 17. Playwright Rules

Use Playwright for browser-based E2E testing where applicable.

Playwright tests must:

- Validate user-visible behavior.
- Use stable locators.
- Avoid arbitrary waits.
- Remain independent.
- Use non-sensitive test data.
- Include meaningful assertions.

Support headed execution when required:

```bash
npx playwright test --headed
```

Use Playwright HTML reports where configured.

Preserve useful failure evidence such as screenshots and traces where appropriate.

---

# 18. Validation Rules

Run applicable:

```text
Build
Lint
Static Analysis
Unit Tests
Integration Tests
API Tests
E2E Tests
Security Scans
```

Never claim:

```text
PASS
SUCCESS
DEPLOYED
VALIDATED
```

unless the corresponding operation was actually executed successfully.

If it was not executed, report:

```text
NOT RUN
```

with the reason.

---

# 19. Documentation

Keep documentation synchronized with implementation.

Default artifacts:

```text
docs/
├── PRD.md
├── Architecture-Design.md
├── Test-Plan.md
├── Test-Cases.md
└── Test-Summary-Report.md
```

Do not create duplicate documents unless required.

---

# 20. Conflict Handling

If PRD, architecture, implementation, and tests conflict:

1. Identify the conflict.
2. Identify the affected artifacts.
3. Do not silently guess the intended behavior.
4. Determine whether an artifact is outdated.
5. Request clarification when necessary.
6. Update downstream artifacts after the authoritative decision is established.

---

# 21. Final Quality Check

Before completing work, verify:

- [ ] Requirements were understood.
- [ ] Relevant upstream artifacts were reviewed.
- [ ] Existing repository patterns were inspected.
- [ ] Relevant skills were applied.
- [ ] Correct prompt template was used.
- [ ] No requirements were invented.
- [ ] Architecture decisions were respected.
- [ ] Security was considered.
- [ ] Changes remain within scope.
- [ ] Tests were created or updated where required.
- [ ] Actual validation results were reported.
- [ ] Documentation was updated where required.
- [ ] Traceability was maintained.

---

# Core Principle

All agents must preserve:

```text
Requirement
     ↓
Architecture
     ↓
Implementation
     ↓
Testing
     ↓
Evidence
```

The goal is to produce solutions that are:

```text
Requirement-Driven
+
Simple
+
Secure
+
Maintainable
+
Testable
+
Cost-Aware
+
Traceable
```

Do not add complexity unless it provides clear value or satisfies a confirmed requirement.