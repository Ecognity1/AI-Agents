---
name: engineering-coding-standards
description: Repository guidance for coding standards. Use when Codex performs related software engineering work.
---

# Coding Standards Skill

## Purpose

This skill defines generic engineering principles, standards, and best practices for producing consistent, understandable, maintainable, secure, and reliable source code.

Coding standards establish common expectations for how engineers and AI development agents should create and modify code.

The objective is not to prescribe syntax for a specific programming language.

The objective is to establish engineering behaviors that apply across:

- Programming languages
- Frameworks
- Platforms
- Application types
- Services
- Libraries
- Automation
- Infrastructure-related software

This skill is:

- Domain-neutral
- Language-neutral
- Framework-neutral
- Vendor-neutral
- Platform-neutral
- Application-neutral
- Industry-neutral

Language-specific conventions should supplement these standards rather than replace them.

---

# Objectives

Good coding standards should help produce code that is:

- Correct
- Readable
- Understandable
- Consistent
- Maintainable
- Testable
- Secure
- Reliable
- Reviewable
- Evolvable

The primary goal is not to minimize the number of lines of code.

The goal is to make software behavior clear and sustainable.

---

# Fundamental Principle

## Code Is Read More Than It Is Written

Source code should optimize for understanding.

Prefer:

```text
Clear
+
Explicit
+
Predictable
```

over:

```text
Clever
+
Compressed
+
Difficult to Understand
```

Code should communicate intent to:

- Current developers
- Future developers
- Reviewers
- Maintainers
- Automated engineering agents

---

# Correctness First

Code must satisfy the intended behavior before optimization or abstraction.

The priority should generally be:

```text
Correctness
    ↓
Clarity
    ↓
Maintainability
    ↓
Performance Optimization
```

Performance or abstraction should not compromise correctness without explicit justification.

---

# Consistency

Code within the same codebase should follow consistent conventions.

Consistency should apply to:

- Naming
- Formatting
- File organization
- Error handling
- Logging
- Testing
- Dependency usage
- Configuration
- Documentation

When an established project convention exists and is reasonable, follow it.

Do not introduce a new convention without meaningful benefit.

---

# Follow Existing Standards

Before modifying an existing codebase:

1. Inspect repository structure.
2. Identify existing conventions.
3. Identify formatting configuration.
4. Identify static-analysis rules.
5. Identify testing conventions.
6. Identify dependency-management conventions.
7. Identify repository-specific instructions.

Prefer established repository standards unless they conflict with explicit organizational requirements.

---

# Naming

Names should communicate intent.

Good names should explain:

- What something represents.
- What something does.
- Why something exists.

Avoid names that require readers to infer meaning unnecessarily.

---

# Naming Characteristics

Prefer names that are:

- Descriptive
- Consistent
- Searchable
- Pronounceable where practical
- Appropriate to scope

Avoid:

```text
x
tmp
obj
data1
thing
stuff
misc
manager2
helperNew
```

unless the meaning is genuinely obvious from very small local scope.

---

# Domain Terminology

Use terminology consistently.

If the system uses a concept called:

```text
Customer
```

avoid arbitrarily calling the same concept:

```text
Client
AccountHolder
UserRecord
```

in different parts of the codebase unless they represent genuinely different concepts.

---

# Avoid Misleading Names

Names must accurately describe behavior.

Do not name a function:

```text
getSomething()
```

if it also:

- Modifies state
- Deletes information
- Sends notifications
- Performs unrelated side effects

Names should reflect important behavior.

---

# Functions and Methods

Functions should have clear responsibilities.

A function should ideally answer:

> What single meaningful operation does this perform?

Avoid functions that perform many unrelated operations.

---

# Function Size

There is no universal correct number of lines for a function.

A function should be small enough that its purpose and control flow remain understandable.

Refactor when a function contains:

- Multiple unrelated responsibilities
- Deep nesting
- Repeated logic
- Difficult-to-understand branches
- Multiple abstraction levels

Do not split functions merely to satisfy arbitrary line-count rules.

---

# Function Parameters

Functions should accept only information required to perform their responsibility.

Large parameter lists may indicate:

- Too many responsibilities
- Missing abstraction
- Poor data grouping

Do not create parameter objects solely to hide poor design.

---

# Return Values

Return values should have clear meaning.

Avoid returning ambiguous values whose interpretation requires undocumented knowledge.

Prefer explicit results where failure or multiple outcomes need to be represented.

---

# Side Effects

Side effects should be deliberate and understandable.

Examples include:

- Modifying state
- Writing data
- Sending messages
- Changing files
- Calling external systems

Avoid hiding significant side effects inside operations that appear to be simple queries.

---

# Pure Logic

Where practical, separate deterministic logic from external side effects.

Conceptually:

```text
Input
  ↓
Business / Computational Logic
  ↓
Output
```

can often be easier to:

- Understand
- Test
- Reuse

than logic tightly coupled to external systems.

---

# Control Flow

Control flow should remain easy to follow.

Avoid unnecessary:

- Deep nesting
- Complex branching
- Hidden state transitions
- Multiple exit conditions that obscure behavior

Prefer structures that make the main execution path visible.

---

# Guard Clauses

Guard clauses may simplify control flow.

Instead of:

```text
if valid
    if authorized
        if available
            process
```

prefer conceptually:

```text
if invalid
    stop

if unauthorized
    stop

if unavailable
    stop

process
```

Use this where it improves readability.

---

# Nesting

Deep nesting increases cognitive complexity.

When nesting becomes difficult to follow, consider:

- Guard clauses
- Extracting meaningful operations
- Simplifying conditions
- Redesigning responsibilities

Do not mechanically eliminate all nesting.

---

# Conditions

Conditions should communicate intent.

If a condition becomes difficult to understand, extract it into a meaningful concept.

Prefer:

```text
if requestIsEligible
```

over repeatedly embedding complex boolean logic.

---

# Boolean Logic

Avoid unnecessarily complex boolean expressions.

When logic becomes difficult to reason about:

- Break it into meaningful conditions.
- Name those conditions.
- Test edge cases.

Correctness is more important than compactness.

---

# Duplication

Avoid unnecessary duplication.

Repeated business rules can create inconsistent behavior when one copy changes and another does not.

However:

> Similar-looking code is not always the same abstraction.

Do not create premature abstractions merely to remove a few repeated lines.

---

# DRY Principle

DRY means:

> Do not maintain the same knowledge in multiple places unnecessarily.

It does not mean:

> Every repeated line must become a shared function.

Apply DRY to duplicated knowledge and behavior, not superficial textual similarity.

---

# Abstraction

Create abstractions when they represent stable, meaningful concepts.

Good abstractions:

- Hide irrelevant complexity.
- Represent clear responsibilities.
- Reduce coupling.
- Improve understanding.

Avoid abstractions created only because they might theoretically be reused later.

---

# Premature Abstraction

Do not generalize code before the variation is understood.

Prefer:

```text
Concrete Need
     ↓
Repeated Pattern
     ↓
Understood Variation
     ↓
Abstraction
```

rather than:

```text
Possible Future Requirement
          ↓
Complex Generic Framework
```

---

# Separation of Concerns

Different responsibilities should remain appropriately separated.

Examples include:

```text
Business Logic

Data Access

Presentation

Integration

Configuration

Security

Observability
```

Exact boundaries depend on architecture.

Avoid mixing unrelated concerns into the same component without justification.

---

# Coupling

Minimize unnecessary coupling.

Components should depend only on what they genuinely require.

High coupling makes changes more difficult because modifications propagate across many areas.

---

# Cohesion

Related behavior should remain together.

A highly cohesive component has a clear purpose.

Prefer:

```text
Component
    ↓
Related Responsibilities
```

over:

```text
Component
 ├── Business Logic
 ├── Database Utility
 ├── Email Utility
 ├── Formatting
 └── Unrelated Helpers
```

---

# Dependencies

Dependencies should be explicit.

Avoid hidden dependencies through:

- Global mutable state
- Undocumented environment assumptions
- Implicit initialization
- Unexpected static state

Explicit dependencies improve:

- Testability
- Understandability
- Maintainability

---

# Global State

Minimize mutable global state.

Global state can create:

- Hidden coupling
- Concurrency issues
- Test interference
- Difficult debugging

Use shared state only where its lifecycle and ownership are clear.

---

# Immutability

Prefer immutable values where mutation is unnecessary.

Immutability can improve:

- Predictability
- Concurrency safety
- Debugging
- Reasoning

Do not force immutability where it creates disproportionate complexity.

---

# Data Mutation

When state changes, ownership should be clear.

Avoid situations where many unrelated components can modify the same state without coordination.

---

# Constants

Values with stable meaning should be represented clearly.

Avoid unexplained literals when their meaning is not obvious.

Instead of:

```text
if retries > 7
```

use a meaningful concept where appropriate:

```text
if retries > maximumRetryAttempts
```

---

# Magic Values

Avoid unexplained:

- Numbers
- Strings
- Codes
- Flags

when their meaning is not self-evident.

Not every literal requires a constant.

Use judgment.

---

# Comments

Comments should explain information that code cannot express clearly.

Useful comments may explain:

- Why a decision exists
- Non-obvious constraints
- Important trade-offs
- External requirements
- Compatibility behavior

Avoid comments that merely restate code.

---

# Bad Comments

Avoid:

```text
Increment counter by one
```

when the code already clearly increments the counter.

Comments that become outdated are worse than no comments.

---

# TODO Comments

TODO items should not become permanent undocumented technical debt.

Where organizational processes support it, significant TODOs should reference:

- Work item
- Issue
- Reason
- Ownership

Avoid vague comments such as:

```text
TODO fix later
```

---

# Documentation

Public or reusable components should have sufficient documentation for intended consumers.

Documentation should focus on:

- Purpose
- Contract
- Important assumptions
- Usage constraints
- Non-obvious behavior

Do not document every obvious implementation detail.

---

# Error Handling

Errors should be handled deliberately.

Avoid:

- Silently ignoring errors
- Catching errors without action
- Returning misleading success
- Hiding root causes

Refer to `error-handling.md` for detailed standards.

---

# Exceptions

Where a language supports exceptions, use them according to language and organizational conventions.

Do not use exceptions as normal control flow when simpler mechanisms are appropriate.

Do not catch broad exceptions unless there is a clear reason.

---

# Resource Management

Resources should be acquired and released safely.

Examples include:

- Files
- Connections
- Locks
- Streams
- Network resources

Prefer language-supported lifecycle mechanisms where available.

---

# Input Validation

Validate information at appropriate trust boundaries.

Do not assume external input is valid.

Validation may include:

- Type
- Format
- Range
- Length
- Required values
- Business constraints

Refer to `secure-coding.md` for security-sensitive validation.

---

# Defensive Programming

Use defensive programming where realistic failure or misuse is possible.

Avoid excessive defensive code for impossible states when stronger type or design constraints can prevent those states.

---

# Null Handling

Null or absent values should have explicit semantics.

Avoid unexpected null propagation.

Where supported, use language features that make absence explicit.

---

# Collections

Collection behavior should be predictable.

Consider:

- Empty collection
- Null collection
- Ordering
- Duplicates
- Mutability

Prefer consistent semantics across the codebase.

---

# Concurrency

Shared mutable state requires careful coordination.

Concurrency design should explicitly consider:

- Race conditions
- Deadlocks
- Ordering
- Atomicity
- Resource contention

Refer to `concurrency.md` for deeper guidance.

---

# Asynchronous Code

Asynchronous behavior should remain understandable.

Avoid:

- Unobserved failures
- Unbounded concurrency
- Blocking asynchronous flows unnecessarily
- Fire-and-forget operations without lifecycle ownership

---

# Security

Code should follow secure-by-default practices.

Never intentionally:

- Hard-code secrets.
- Bypass authorization.
- Disable validation for convenience.
- Trust external input automatically.
- Log credentials.
- Expose sensitive internal errors.

Refer to `secure-coding.md`.

---

# Configuration

Environment-specific values should generally be externalized.

Examples include:

- Endpoints
- Timeouts
- Feature configuration
- Environment identifiers

Do not hard-code environment-specific configuration unnecessarily.

Refer to `configuration-management.md`.

---

# Secrets Are Not Configuration

Secrets require stronger handling than ordinary configuration.

Do not treat:

```text
Password

Private Key

Access Token
```

the same as:

```text
Page Size

Feature Setting

Timeout
```

---

# Logging

Logging should provide useful operational information.

Avoid:

- Excessive logging
- Sensitive information
- Unstructured messages where structure is useful
- Logging and then silently ignoring failure

Refer to `observability.md` for architectural observability principles.

---

# Testability

Code should be designed so important behavior can be tested.

Testability often improves when:

- Dependencies are explicit.
- Responsibilities are clear.
- Side effects are isolated.
- Global mutable state is minimized.

Do not distort architecture solely to make every internal implementation detail directly testable.

---

# Testing Expectations

Changes should include appropriate testing according to risk.

Testing may include:

- Unit tests
- Integration tests
- Contract tests
- End-to-end tests

Refer to `testing-strategy.md`.

---

# Static Analysis

Use available static-analysis capabilities where they provide meaningful quality improvement.

Examples include detection of:

- Type errors
- Unsafe patterns
- Dead code
- Security issues
- Style violations

Do not suppress warnings without understanding them.

---

# Warning Suppression

If a warning must be suppressed:

1. Understand why it occurs.
2. Confirm the code is safe.
3. Use the narrowest suppression possible.
4. Document non-obvious reasoning where necessary.

Avoid broad suppression of analysis rules.

---

# Formatting

Formatting should be automated where possible.

Use repository-standard formatters.

Avoid spending code-review effort debating formatting that tooling can enforce consistently.

---

# Dead Code

Remove unused code when it is no longer required.

Do not keep large blocks of commented-out code.

Version control should preserve historical implementations.

---

# Feature Flags

Feature flags can support controlled rollout but introduce additional states.

Flags should have:

- Clear purpose
- Ownership
- Lifecycle
- Removal plan

Avoid permanent obsolete feature flags.

---

# Compatibility

Code changes should consider compatibility where consumers depend on existing behavior.

Compatibility may include:

- APIs
- Data formats
- Configuration
- Events
- Public interfaces

Breaking changes should be deliberate.

---

# Performance

Do not optimize without understanding the performance requirement.

Prefer:

```text
Measure
   ↓
Identify Bottleneck
   ↓
Optimize
   ↓
Measure Again
```

Avoid premature micro-optimization that reduces readability.

Refer to `performance-engineering.md`.

---

# Complexity

Complexity should be justified by requirements.

Before adding complexity ask:

- What problem does this solve?
- Does that problem exist now?
- Is there a simpler solution?
- What maintenance burden does this introduce?

---

# YAGNI

YAGNI means:

> You Aren't Gonna Need It.

Do not implement speculative capabilities without a concrete requirement.

This does not mean architecture should ignore known future requirements.

---

# KISS

Prefer the simplest solution that correctly satisfies requirements.

Simple does not mean simplistic.

A simple solution should still satisfy:

- Correctness
- Security
- Reliability
- Maintainability

---

# SOLID Principles

Where object-oriented design is relevant, SOLID may provide useful guidance.

It should not be applied mechanically.

## Single Responsibility

A component should have a coherent responsibility.

## Open/Closed

Design should support necessary evolution without unnecessary modification.

## Liskov Substitution

Substitutable implementations should preserve expected behavior.

## Interface Segregation

Consumers should not depend on capabilities they do not require.

## Dependency Inversion

Higher-level policy should avoid unnecessary dependence on lower-level implementation details.

Use these as reasoning principles rather than rigid rules.

---

# Code Organization

Source files and directories should reflect meaningful responsibilities.

Prefer organization around:

- Capabilities
- Modules
- Components
- Architectural boundaries

Avoid arbitrary organization that makes navigation difficult.

---

# File Size

There is no universal correct maximum file size.

A file should remain focused and understandable.

Split files when they contain unrelated responsibilities or become difficult to navigate.

---

# Public Interfaces

Keep public interfaces as small as practical.

Every public capability creates:

- Compatibility responsibility
- Testing responsibility
- Documentation responsibility

Do not expose implementation details unnecessarily.

---

# Dependency Direction

Dependencies should follow intended architectural boundaries.

Lower-level implementation details should not unnecessarily control higher-level business policy.

Refer to `clean-architecture.md`.

---

# External Libraries

Before introducing a new dependency, evaluate:

- Need
- Maintenance
- Security
- License
- Compatibility
- Existing alternatives
- Long-term ownership

Do not add dependencies for trivial functionality without justification.

---

# Dependency Updates

Dependencies should be maintained deliberately.

Avoid:

- Permanently outdated dependencies
- Unreviewed automatic major upgrades
- Ignoring known security vulnerabilities

Refer to `dependency-management.md`.

---

# Generated Code

Generated code should be clearly distinguishable from manually maintained code where practical.

Do not manually modify generated files when regeneration will overwrite changes.

Modify the source definition or generator instead.

---

# Code Review Readiness

Before considering code complete:

- Build should succeed.
- Relevant tests should pass.
- Static analysis should pass.
- Formatting should be correct.
- Debugging artifacts should be removed.
- Secrets should not be present.
- Unrelated changes should be removed.

---

# Change Scope

Keep changes focused.

Avoid combining:

```text
Feature
+
Large Refactoring
+
Dependency Upgrade
+
Formatting Entire Repository
```

without necessity.

Focused changes are easier to:

- Review
- Test
- Diagnose
- Roll back

---

# Refactoring

Refactoring changes internal structure without intentionally changing externally observable behavior.

Refactoring should:

- Improve clarity.
- Reduce complexity.
- Preserve behavior.
- Be supported by appropriate tests.

Avoid mixing unnecessary large refactors with unrelated functional changes.

---

# Technical Debt

Technical debt should be understood rather than used as a label for any imperfect code.

Document significant debt where it affects:

- Maintainability
- Reliability
- Security
- Delivery speed

Prioritize based on impact.

---

# AI-Generated Code

Code generated by AI agents must meet the same engineering standards as human-written code.

AI-generated code must not be accepted merely because it:

- Compiles
- Looks plausible
- Uses common patterns

It must be validated for:

- Correctness
- Security
- Architecture alignment
- Tests
- Dependencies
- Error handling
- Maintainability

---

# AI Engineering Agent Rules

When creating or modifying code, an engineering agent should:

1. Understand the requested behavior.
2. Inspect existing repository conventions.
3. Identify relevant architecture decisions.
4. Identify affected components.
5. Make the smallest coherent change.
6. Follow existing coding conventions.
7. Avoid unnecessary dependencies.
8. Add or update appropriate tests.
9. Run available validation.
10. Review its own changes before completion.

---

# Do Not Rewrite Working Code Without Reason

AI agents should not replace existing implementations solely because another implementation appears cleaner.

Before significant refactoring, determine:

- Is the current code incorrect?
- Is there a maintainability problem?
- Is architecture being violated?
- Is the change required for the requested work?

Avoid unnecessary churn.

---

# Preserve Intent

When modifying existing code:

- Preserve unrelated behavior.
- Preserve established contracts.
- Avoid unrelated formatting.
- Avoid unnecessary renaming.
- Avoid deleting functionality without evidence it is obsolete.

---

# Code Review Principles

Review code for:

```text
Correctness
    ↓
Security
    ↓
Architecture
    ↓
Reliability
    ↓
Maintainability
    ↓
Performance
    ↓
Style
```

Style should not overshadow functional or architectural problems.

---

# Best Practices

- Optimize code for understanding.
- Prefer correctness over cleverness.
- Follow existing repository conventions.
- Use meaningful names.
- Keep responsibilities cohesive.
- Minimize unnecessary coupling.
- Make dependencies explicit.
- Minimize global mutable state.
- Prefer simple control flow.
- Avoid unnecessary nesting.
- Avoid duplicated knowledge.
- Avoid premature abstractions.
- Separate concerns appropriately.
- Make side effects visible.
- Validate external input.
- Handle failures deliberately.
- Protect sensitive information.
- Externalize environment-specific configuration.
- Keep changes focused.
- Write appropriate tests.
- Use automated formatting.
- Respect static-analysis rules.
- Remove dead code.
- Avoid speculative functionality.
- Measure before optimizing.
- Document non-obvious reasoning.
- Review generated code carefully.

---

# Common Mistakes

Avoid:

- Clever code that is difficult to understand.
- Inconsistent naming.
- Meaningless names.
- Large functions with unrelated responsibilities.
- Deeply nested control flow.
- Excessive parameters.
- Hidden side effects.
- Global mutable state.
- Premature abstraction.
- Excessive generic frameworks.
- Duplicated business rules.
- Hard-coded configuration.
- Hard-coded secrets.
- Silent error handling.
- Catching every exception without reason.
- Logging sensitive information.
- Large blocks of commented-out code.
- Unnecessary dependencies.
- Ignoring compiler warnings.
- Broad warning suppression.
- Refactoring unrelated code during small changes.
- Optimizing without measurement.
- Writing code for hypothetical future requirements.
- Assuming AI-generated code is automatically correct.
- Replacing working code without justification.
- Ignoring existing repository conventions.

---

# Validation Checklist

Before considering an engineering change complete, verify:

- [ ] Requested behavior is understood.
- [ ] Existing repository conventions were inspected.
- [ ] Code follows established naming conventions.
- [ ] Responsibilities are clear.
- [ ] Functions remain understandable.
- [ ] Control flow is readable.
- [ ] Unnecessary nesting is avoided.
- [ ] Dependencies are explicit.
- [ ] Global mutable state is minimized.
- [ ] Duplication of important knowledge is avoided.
- [ ] Abstractions are justified.
- [ ] External input is validated where required.
- [ ] Errors are handled appropriately.
- [ ] Sensitive information is protected.
- [ ] Environment-specific configuration is externalized where appropriate.
- [ ] No secrets are embedded.
- [ ] Logging is appropriate.
- [ ] Relevant tests exist.
- [ ] Existing tests continue to pass.
- [ ] Static analysis passes where configured.
- [ ] Formatting follows repository standards.
- [ ] No unnecessary dependencies were introduced.
- [ ] Dead or commented-out code was not introduced.
- [ ] Public contracts remain compatible unless intentionally changed.
- [ ] Performance optimization is justified where introduced.
- [ ] Change scope remains focused.
- [ ] Generated code has been reviewed for correctness.
- [ ] Architecture boundaries remain respected.
- [ ] Code is understandable to another engineer.

---

# Relationship With Other Engineering Skills

`coding-standards.md` establishes the baseline engineering behavior.

More specialized skills provide deeper guidance.

### `clean-architecture.md`

Defines dependency direction, architectural boundaries, separation of policy from implementation, and maintainable structural organization.

### `clean-code.md`

Provides deeper guidance for readability, functions, naming, complexity, and code structure.

### `code-quality.md`

Defines maintainability, complexity, static analysis, duplication, and quality controls.

### `error-handling.md`

Defines failure representation, propagation, recovery, and error boundaries.

### `testing-strategy.md`

Defines testing levels, coverage strategy, test quality, and validation.

### `dependency-management.md`

Defines dependency selection, updates, vulnerabilities, compatibility, and lifecycle.

### `configuration-management.md`

Defines configuration ownership, environments, validation, and lifecycle.

### `secure-coding.md`

Defines secure implementation practices.

### `performance-engineering.md`

Defines measurement, profiling, optimization, resource efficiency, and performance validation.

### `concurrency.md`

Defines safe concurrent and asynchronous execution.

### `code-review.md`

Defines engineering review standards and change-quality expectations.

Conceptually:

```text
                Engineering Standards
                         │
                         ↓
                 Coding Standards
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   Clean Code      Clean Architecture   Code Quality
        │                │                │
        └────────────────┼────────────────┘
                         ↓
              Implementation Practices
                         │
       ┌─────────────────┼──────────────────┐
       ↓                 ↓                  ↓
    Testing         Secure Coding     Error Handling
       │                 │                  │
       └─────────────────┼──────────────────┘
                         ↓
                    Validation
                         ↓
                   Code Review
```

---

# References

Coding standards may draw, where applicable, from recognized software engineering principles such as:

- Clean Code principles
- SOLID principles
- DRY
- KISS
- YAGNI
- Separation of Concerns
- Information Hiding
- Encapsulation
- Defensive Programming
- Secure Coding principles
- Static Analysis practices
- Refactoring principles
- Software maintainability principles
- Relevant language-specific standards
- Relevant organizational engineering standards

These principles should be treated as guidance rather than mechanically enforced rules.

The appropriate coding approach should ultimately be determined by correctness, readability, maintainability, security, reliability, architecture, performance requirements, repository conventions, team standards, and context.

