---
name: engineering-clean-code
description: Repository guidance for clean code. Use when Codex performs related software engineering work.
---

# Clean Code Skill

## Purpose

This skill defines generic principles and best practices for writing source code that is clear, understandable, maintainable, predictable, and easy to change safely.

Clean code should communicate its intent without requiring unnecessary interpretation.

The objective is not to enforce a particular programming style, language, framework, or design methodology.

The objective is to help engineers and AI development agents create code that can be:

- Understood quickly
- Modified safely
- Reviewed effectively
- Tested reliably
- Debugged efficiently
- Maintained over time

This skill is:

- Domain-neutral
- Language-neutral
- Framework-neutral
- Vendor-neutral
- Platform-neutral
- Application-neutral
- Industry-neutral

Language-specific conventions should supplement these principles.

---

# Objectives

Clean code should help achieve:

- Readability
- Simplicity
- Clarity
- Consistency
- Maintainability
- Testability
- Predictability
- Low cognitive complexity
- Clear intent
- Safe modification

The primary objective is not fewer lines of code.

The objective is:

> Make the intended behavior easy to understand.

---

# Fundamental Principle

## Code Should Communicate Intent

A reader should be able to understand:

```text
What does this code do?

Why does it exist?

What assumptions does it make?

What happens when something fails?
```

Prefer:

```text
Clear Intent
    +
Simple Structure
    +
Predictable Behavior
```

over:

```text
Cleverness
    +
Compression
    +
Hidden Behavior
```

---

# Optimize for Readers

Code is typically read many more times than it is written.

Write code for:

- Future maintainers
- Reviewers
- Debuggers
- New team members
- Automated engineering agents

Avoid optimizing primarily for typing convenience.

---

# Simplicity

Prefer the simplest implementation that correctly satisfies the requirement.

Simple code should:

- Have understandable control flow.
- Avoid unnecessary abstraction.
- Avoid unnecessary indirection.
- Avoid speculative functionality.
- Make important behavior explicit.

Simple does not mean simplistic.

Security, reliability, correctness, and maintainability must still be preserved.

---

# Naming

Names are one of the strongest tools for communicating intent.

Names should explain what something represents or does.

Prefer:

```text
calculateTotalAmount
```

over:

```text
calc
```

Prefer:

```text
maximumRetryAttempts
```

over:

```text
max
```

when the additional context improves understanding.

---

# Naming Should Reveal Intent

A reader should not need to inspect implementation details to understand a name.

Avoid names such as:

```text
data

value

obj

thing

stuff

tmp

item2

processData

doWork
```

when a more meaningful name is available.

---

# Scope and Naming

Name length should generally reflect scope.

A very small local scope may justify a short name.

A broadly visible variable, function, class, or module should usually have a more descriptive name.

Conceptually:

```text
Small Scope
   ↓
Shorter Name May Be Clear

Large Scope
   ↓
More Context Usually Required
```

---

# Consistent Terminology

Use the same term for the same concept.

Avoid:

```text
Customer

Client

Consumer

AccountHolder
```

for the same concept unless they genuinely represent different things.

Terminology should align with the domain and architecture.

---

# Avoid Misleading Names

Names should accurately represent behavior.

A function named:

```text
getSomething()
```

should not unexpectedly:

- Modify data
- Delete records
- Send messages
- Trigger workflows

Important side effects should not be hidden behind misleading names.

---

# Avoid Encoding Implementation Details in Names

Do not unnecessarily encode technologies into names when the concept is independent of that technology.

For example, a component representing persistence behavior should not necessarily expose the current storage technology in every consumer-facing name.

This reduces unnecessary coupling between terminology and implementation.

---

# Avoid Noise Words

Names should not contain words that add no useful meaning.

Examples may include:

```text
Data

Info

Object

Manager

Processor

Helper

Utility
```

These words are not inherently wrong.

Use them only when they communicate a meaningful responsibility.

---

# Boolean Names

Boolean names should communicate a true/false condition.

Prefer conceptually:

```text
isValid

hasPermission

canRetry

shouldProcess
```

over ambiguous names such as:

```text
valid

permission

retry
```

where language conventions make the distinction useful.

---

# Function Names

Function names should describe the operation performed.

Prefer:

```text
validateRequest()

calculatePrice()

findAvailableCapacity()

sendNotification()
```

over generic names such as:

```text
handle()

process()

execute()

doIt()
```

unless the broader context already makes their meaning explicit.

---

# Functions

Functions should represent meaningful operations.

A good function should have:

- Clear purpose
- Understandable inputs
- Predictable outputs
- Limited responsibility

Avoid functions that become collections of unrelated steps.

---

# Single Responsibility at Function Level

A function should generally operate at one coherent level of responsibility.

Avoid:

```text
validateRequest
+
calculateBusinessRules
+
writeDatabase
+
sendNotification
+
formatResponse
```

inside one large function when those responsibilities are meaningfully separate.

---

# Function Size

There is no universal maximum function size.

Do not use arbitrary rules such as:

```text
Every function must be less than 10 lines.
```

Instead ask:

- Is the purpose obvious?
- Is the control flow understandable?
- Are responsibilities cohesive?
- Are abstraction levels consistent?
- Can the function be tested and changed safely?

If not, refactoring may be appropriate.

---

# Function Parameters

Functions should receive only the information they require.

Large parameter lists may indicate:

- Too many responsibilities
- Missing concepts
- Poor grouping
- Excessive coupling

However, do not introduce unnecessary wrapper objects solely to reduce parameter count.

---

# Flag Arguments

Boolean parameters can sometimes hide multiple behaviors.

Example:

```text
generateReport(data, true)
```

The meaning of `true` may be unclear.

Where appropriate, prefer:

```text
generateDetailedReport(data)
```

or an explicit option whose meaning is clear.

Do not mechanically eliminate all boolean parameters.

---

# Function Side Effects

Functions should make important side effects understandable.

Examples of side effects include:

- Changing persistent state
- Modifying shared state
- Sending messages
- Writing files
- Calling external systems

Avoid hiding significant side effects inside apparently harmless operations.

---

# Command and Query Separation

Where useful, distinguish:

```text
Query
   ↓
Returns Information

Command
   ↓
Changes State
```

A function that appears to retrieve information should not unexpectedly perform major state changes.

This is guidance rather than an absolute rule.

---

# Return Values

Return values should have clear semantics.

Avoid ambiguous return values such as:

```text
-1

null

false
```

when multiple meanings are possible.

Use explicit result representations where complexity justifies them.

---

# Null

Null or absent values should have deliberate meaning.

Avoid returning null unexpectedly.

Where supported, use constructs that make optional values explicit.

Consumers should understand whether absence means:

- Not found
- Not applicable
- Not calculated
- Failure

---

# Control Flow

Control flow should make the primary behavior easy to follow.

Prefer:

```text
Validate
   ↓
Process
   ↓
Return
```

over deeply nested structures where the main operation is difficult to identify.

---

# Guard Clauses

Guard clauses can simplify functions by handling exceptional or invalid conditions early.

Instead of:

```text
if valid
    if authorized
        if available
            process
```

consider:

```text
if invalid
    return

if unauthorized
    return

if unavailable
    return

process
```

Use guard clauses where they improve readability.

---

# Early Returns

Early returns can reduce nesting.

However, excessive scattered returns can also make complex control flow difficult to understand.

Use them deliberately.

---

# Nesting

Deep nesting increases cognitive complexity.

Common causes include:

```text
if
  if
    loop
      if
        try
          if
```

When nesting becomes difficult to follow, consider:

- Guard clauses
- Extracting functions
- Simplifying conditions
- Redesigning responsibilities

---

# Conditions

Conditions should express meaningful concepts.

Instead of repeatedly using:

```text
age >= minimumAge &&
status == active &&
permission != denied
```

consider naming the concept when appropriate:

```text
isEligible
```

Named conditions can improve understanding.

---

# Complex Boolean Logic

Complex boolean expressions are difficult to verify.

When logic contains many:

```text
AND

OR

NOT
```

operations, consider:

- Breaking the expression into named conditions.
- Extracting a decision function.
- Using a decision table where appropriate.
- Adding tests for combinations.

---

# Positive Conditions

Where practical, prefer conditions that are easy to reason about.

For example:

```text
if isEnabled
```

may be easier to understand than:

```text
if !isDisabled
```

Do not rewrite established terminology solely to satisfy this preference.

---

# Switches and Decision Structures

Large decision structures may indicate:

- Multiple responsibilities
- Missing polymorphism
- Missing strategy
- Legitimate complex business rules

Do not automatically replace every switch with a design pattern.

First understand the reason for the branching.

---

# Loops

Loops should have a clear purpose.

Avoid loops that simultaneously:

- Filter
- Transform
- Mutate external state
- Perform remote calls
- Manage complex branching

when separating those concerns would improve clarity.

---

# Collection Operations

Collection operations should remain understandable.

A long chain of transformations may be concise but difficult to debug.

Prefer readable transformation pipelines over compressed expressions.

---

# Variables

Variables should represent meaningful concepts.

Avoid unnecessary temporary variables when they add no clarity.

But do not eliminate useful intermediate variables merely to reduce lines.

For example:

```text
baseAmount
discount
finalAmount
```

may communicate intent better than one large expression.

---

# Variable Lifetime

Keep variable lifetime as small as practical.

Declare variables close to where they are used where language conventions support it.

This reduces the amount of state readers must track.

---

# Mutable State

Minimize unnecessary mutable state.

State changes increase reasoning complexity.

Prefer:

```text
Input
 ↓
Transformation
 ↓
Output
```

where practical.

---

# Hidden State

Avoid behavior that depends on hidden mutable state when explicit state would be clearer.

Hidden state can create:

- Unexpected behavior
- Test interference
- Concurrency problems
- Difficult debugging

---

# Constants

Use meaningful constants for values whose meaning is not obvious.

Instead of:

```text
retryCount > 5
```

consider:

```text
retryCount > maximumRetryAttempts
```

when the value represents a meaningful policy.

---

# Magic Numbers

A literal number is not automatically a magic number.

For example:

```text
count + 1
```

does not normally require:

```text
ONE = 1
```

Extract constants when the value has domain, policy, or configuration meaning.

---

# Magic Strings

Repeated or meaningful string values may deserve named representations.

This can reduce:

- Typographical errors
- Inconsistent meaning
- Difficult updates

Do not extract every string literal mechanically.

---

# Expressions

Expressions should remain understandable.

Avoid compressing multiple concepts into one large expression solely to reduce code length.

Prefer clarity over cleverness.

---

# Abstraction Levels

A function should generally operate at a consistent level of abstraction.

Avoid mixing:

```text
High-Level Business Decision

with

Low-Level Byte Manipulation
```

inside the same function unless necessary.

---

# Extract Function

Extract a function when doing so:

- Gives a meaningful name to behavior.
- Reduces cognitive complexity.
- Isolates reusable logic.
- Improves testing.
- Clarifies abstraction levels.

Do not extract trivial functions that make navigation harder without improving understanding.

---

# Inline Function

An abstraction may become unnecessary.

Consider inlining when a function:

- Adds no meaningful name.
- Is used only once.
- Merely forwards parameters.
- Creates unnecessary navigation.

Clean code may involve removing abstractions as well as creating them.

---

# Duplication

Duplicated knowledge can create maintenance problems.

If the same business rule exists in several places:

```text
Rule Changes
    ↓
Implementation A Updated
Implementation B Forgotten
    ↓
Inconsistent Behavior
```

Centralize genuinely shared knowledge where appropriate.

---

# DRY

DRY means:

> Don't Repeat Yourself.

Its deeper purpose is avoiding multiple authoritative representations of the same knowledge.

Do not interpret DRY as:

> No two lines of code may look similar.

Premature deduplication can create incorrect abstractions.

---

# WET

Sometimes temporary duplication is better than the wrong abstraction.

A useful principle is:

```text
Duplication
   ↓
Observe Pattern
   ↓
Understand Variation
   ↓
Extract Correct Abstraction
```

rather than abstracting too early.

---

# Abstraction

Good abstractions should represent meaningful concepts.

An abstraction should answer:

> What concept does this represent?

Avoid abstractions whose only purpose is:

> We might need this someday.

---

# Wrong Abstraction

A wrong abstraction can be more damaging than duplication.

Warning signs include:

- Many conditional parameters.
- Consumers require special cases.
- Shared logic behaves differently for unrelated callers.
- Changes for one consumer repeatedly affect others.

When this occurs, reconsider whether the abstraction represents a genuinely shared concept.

---

# Classes and Components

Where classes or similar constructs are used, they should have clear responsibilities.

A class should not become a container for unrelated methods merely because those methods need somewhere to live.

---

# Class Size

There is no universal correct number of methods or lines for a class.

Evaluate:

- Cohesion
- Responsibility
- Dependencies
- Change patterns
- Understandability

Large cohesive components may be better than many tiny meaningless classes.

---

# Single Responsibility Principle

A component should have a coherent reason to change.

This does not mean:

> Every class should contain one method.

It means responsibilities that change for unrelated reasons should not be combined unnecessarily.

---

# Cohesion

Methods and data that operate on the same concept generally belong together.

Low cohesion may indicate that a component has accumulated unrelated responsibilities.

---

# Coupling

Clean code minimizes unnecessary knowledge about other components.

Avoid reaching deeply into another object's internal structure.

Prefer interacting through meaningful contracts.

---

# Law of Demeter

A useful guideline is:

> Components should know only about collaborators they directly need.

Avoid chains conceptually like:

```text
a.getB().getC().getD().perform()
```

when they expose unnecessary internal structure.

This is guidance, not an absolute rule.

---

# Encapsulation

Hide implementation details that consumers do not need.

Expose behavior through clear interfaces.

Encapsulation helps reduce change propagation.

---

# Data Structures vs. Behavior

Not every structure requires rich behavior.

Simple data structures are appropriate when their primary purpose is transferring or representing data.

Avoid adding methods merely to satisfy an object-oriented ideal.

---

# Comments

Comments should explain what code cannot clearly communicate itself.

Useful comments may explain:

- Why a decision exists.
- Non-obvious constraints.
- Workarounds.
- Compatibility requirements.
- Algorithmic reasoning.
- External requirements.

---

# Comments Should Explain Why

Prefer:

```text
Why this unusual approach is required
```

over:

```text
What the next line of code does
```

when the code already communicates the action.

---

# Do Not Comment Bad Code Instead of Improving It

If code requires a large comment simply to explain confusing implementation, first consider whether the code can be clarified.

Prefer:

```text
Clear Code
+
Necessary Context
```

over:

```text
Confusing Code
+
Large Explanation
```

---

# Outdated Comments

Incorrect comments are dangerous.

When modifying behavior, verify related comments.

Remove comments that no longer reflect implementation.

---

# Commented-Out Code

Do not keep unused implementations as commented-out blocks.

Version control preserves history.

Remove obsolete code.

---

# TODOs

TODO comments should represent intentional, trackable work.

Avoid:

```text
TODO: fix this later
```

without enough context.

Where organizational processes support it, link significant TODOs to tracked work.

---

# Documentation Comments

Public APIs and reusable components may require documentation describing:

- Purpose
- Parameters
- Return values
- Failure behavior
- Important constraints

Do not document obvious implementation details unnecessarily.

---

# Error Handling

Failure paths should be as understandable as success paths.

Avoid:

```text
try
    everything
catch
    ignore
```

Errors should have clear ownership.

Refer to `error-handling.md`.

---

# Exceptions

Where exceptions are used:

- Throw meaningful exceptions.
- Preserve useful diagnostic context.
- Catch exceptions where meaningful handling can occur.
- Avoid swallowing failures.

Do not use exceptions for ordinary branching where simpler mechanisms are appropriate.

---

# Error Messages

Error messages should provide useful context without exposing sensitive information.

Prefer meaningful messages over:

```text
Error occurred
```

when more actionable context can safely be provided.

---

# Boundary Validation

Validate external or untrusted information at appropriate boundaries.

This keeps invalid states from spreading unnecessarily through the system.

---

# Defensive Checks

Defensive checks should protect realistic invariants and failure conditions.

Avoid excessive checks for states that are impossible by construction.

Better design is often preferable to repeated defensive checks.

---

# Data Transformation

Transformation code should make source and target meaning clear.

Avoid large mapping functions containing unrelated business rules.

Transformation and business behavior should remain appropriately separated.

---

# Formatting

Use automated formatting where available.

Formatting should remain consistent across the codebase.

Code review should focus primarily on behavior and design rather than whitespace preferences.

---

# Line Length

Do not optimize solely for arbitrary line-length rules.

Break expressions when doing so improves readability.

Follow repository formatting standards.

---

# Whitespace

Whitespace can communicate structure.

Use consistent spacing and grouping to distinguish logical sections.

Avoid excessive decorative formatting.

---

# File Organization

Files should have clear responsibilities.

Related concepts should be easy to locate.

Avoid placing unrelated functionality into large generic files.

---

# Directory Organization

Directory structures should help engineers understand the system.

Prefer organization around meaningful:

- Modules
- Capabilities
- Components
- Architectural boundaries

Follow existing repository conventions where reasonable.

---

# Utility Code

Generic utility areas should remain small and focused.

Avoid:

```text
helpers/
utils/
common/
misc/
```

becoming dumping grounds for unrelated behavior.

Before adding a utility ask:

> Which concept actually owns this behavior?

---

# Dead Code

Remove code that is no longer used.

Dead code creates:

- Confusion
- Maintenance burden
- False dependencies
- Security risk

Do not keep obsolete code "just in case."

---

# Feature Flags

Feature flags introduce conditional behavior.

Keep flag-related logic:

- Understandable
- Localized where practical
- Temporary when intended
- Tested

Remove obsolete flags after rollout is complete.

---

# Dependencies

Do not introduce external dependencies for trivial behavior without justification.

Every dependency adds:

- Maintenance
- Security exposure
- Compatibility concerns
- Upgrade responsibility

Refer to `dependency-management.md`.

---

# Testability

Clean code should make important behavior testable.

Characteristics that improve testability include:

- Explicit dependencies
- Clear inputs and outputs
- Limited hidden state
- Isolated side effects
- Cohesive responsibilities

---

# Test Code Is Production Code

Test code should also be:

- Readable
- Maintainable
- Consistent
- Focused

Poorly structured tests reduce confidence and increase maintenance cost.

---

# Performance

Readable code should generally be preferred until measurement demonstrates a performance problem.

Avoid obscure micro-optimizations without evidence.

When optimization is required:

```text
Measure
   ↓
Optimize
   ↓
Document Non-Obvious Reason
   ↓
Measure Again
```

Refer to `performance-engineering.md`.

---

# Security

Clean code should make security-sensitive behavior explicit.

Avoid hiding:

- Authorization decisions
- Credential handling
- Sensitive data processing
- Security bypasses

Security controls should be understandable during code review.

Refer to `secure-coding.md`.

---

# Concurrency

Concurrent code should make ownership and synchronization clear.

Avoid clever concurrency constructs whose correctness is difficult to reason about.

Refer to `concurrency.md`.

---

# Configuration

Configuration should have meaningful names and validated semantics.

Avoid scattering direct configuration lookups throughout unrelated code.

Refer to `configuration-management.md`.

---

# Refactoring

Refactoring improves internal structure without intentionally changing externally observable behavior.

A useful refactoring workflow is:

```text
Understand Existing Behavior
        ↓
Establish Test Confidence
        ↓
Make Small Structural Change
        ↓
Validate
        ↓
Continue
```

Prefer incremental refactoring.

---

# Refactoring Triggers

Potential triggers include:

- Difficult-to-understand functions
- Excessive duplication
- Deep nesting
- High coupling
- Low cohesion
- Misleading names
- Large conditional structures
- Repeated change across unrelated locations

These are signals, not automatic rules.

---

# Code Smells

A code smell is an indicator that code may deserve further investigation.

Examples include:

```text
Long Function

Large Component

Long Parameter List

Duplicated Logic

Deep Nesting

Feature Envy

Shotgun Surgery

Primitive Obsession

Global State

Dead Code
```

A smell does not automatically mean the code is wrong.

Understand context before refactoring.

---

# Long Function

Investigate whether the function contains:

- Multiple responsibilities
- Multiple abstraction levels
- Repeated logic
- Difficult branching

Do not split a long but cohesive algorithm merely to reduce line count.

---

# Large Component

Investigate whether responsibilities are cohesive.

A large cohesive component may be acceptable.

A smaller component with unrelated responsibilities may still be poorly designed.

---

# Long Parameter List

Investigate whether parameters represent:

- Multiple responsibilities
- A missing concept
- Excessive coupling

Do not introduce meaningless parameter containers simply to satisfy a metric.

---

# Feature Envy

If code repeatedly accesses another component's internal data to perform behavior related to that component, responsibility may be misplaced.

Consider moving behavior toward the concept that owns the information.

---

# Shotgun Surgery

If one conceptual change requires modifying many unrelated locations, architecture or responsibility boundaries may be weak.

Investigate whether knowledge is unnecessarily duplicated.

---

# Primitive Obsession

Important concepts represented only through generic primitives may lose useful semantics.

For example, conceptually:

```text
String
```

might actually represent:

```text
Email Address

Currency Code

Resource Identifier
```

Introduce richer concepts only when they improve correctness or clarity.

---

# Over-Engineering

Clean code does not mean maximizing:

- Patterns
- Interfaces
- Generic types
- Abstractions
- Layers
- Frameworks

The cleanest solution is often the simplest solution that clearly represents the requirement.

---

# Design Patterns

Use design patterns when they solve an actual recurring design problem.

Do not begin with:

> Which pattern can I use?

Begin with:

> What problem needs to be solved?

Then determine whether a known pattern provides value.

---

# Clever Code

Avoid code whose primary value is demonstrating language sophistication.

A straightforward implementation is usually preferable to an elegant but obscure trick.

---

# Premature Optimization

Do not reduce clarity for performance improvements that have not been demonstrated to matter.

Performance decisions should be evidence-based.

---

# Premature Generalization

Do not design generic frameworks for hypothetical future requirements.

Prefer:

```text
Current Requirement
      ↓
Simple Implementation
      ↓
Observe Variation
      ↓
Generalize When Needed
```

---

# Change Locality

Code should ideally allow a conceptual change to be implemented in a small number of relevant locations.

If simple changes consistently affect many unrelated files, investigate:

- Responsibility boundaries
- Duplication
- Coupling
- Architecture

---

# Principle of Least Surprise

Code should behave in ways another engineer would reasonably expect.

Avoid:

- Hidden side effects
- Unexpected mutation
- Misleading names
- Silent failure
- Implicit global behavior

Predictability improves maintainability.

---

# AI-Generated Code

AI-generated code must follow the same clean-code expectations as human-written code.

Do not accept AI-generated code simply because it:

- Compiles
- Passes one test
- Looks sophisticated

AI-generated code should be reviewed for:

- Naming
- Duplication
- Complexity
- Hidden assumptions
- Unnecessary abstraction
- Error handling
- Security
- Maintainability

---

# AI Development Agent Workflow

When creating or modifying code:

## 1. Understand

Determine:

- Required behavior
- Existing behavior
- Acceptance criteria
- Constraints

## 2. Inspect

Review:

- Nearby code
- Naming conventions
- Similar implementations
- Existing abstractions
- Repository standards

## 3. Design

Choose the simplest implementation that:

- Satisfies the requirement.
- Preserves architecture.
- Matches repository conventions.

## 4. Implement

Write code with:

- Clear names
- Cohesive functions
- Simple control flow
- Explicit dependencies
- Appropriate error handling

## 5. Simplify

Review the implementation for:

- Unnecessary abstractions
- Duplication
- Excessive nesting
- Dead code
- Unnecessary comments
- Hidden behavior

## 6. Validate

Run available:

- Build
- Tests
- Formatting
- Static analysis

## 7. Review

Read the change as if reviewing another engineer's work.

---

# AI Development Agent Rules

When using this skill, the agent should:

- ALWAYS inspect surrounding code before creating new patterns.
- ALWAYS follow reasonable repository conventions.
- ALWAYS prefer meaningful names.
- ALWAYS preserve unrelated behavior.
- ALWAYS keep changes focused.
- ALWAYS make important side effects understandable.
- ALWAYS validate generated code.

The agent should:

- NEVER introduce abstraction solely for hypothetical reuse.
- NEVER create interfaces mechanically.
- NEVER compress code solely to reduce line count.
- NEVER keep dead code for possible future use.
- NEVER hide errors without justification.
- NEVER use comments to compensate for unnecessarily confusing code.
- NEVER rewrite unrelated working code simply for stylistic preference.
- NEVER introduce a design pattern without a problem it solves.
- NEVER sacrifice correctness for elegance.

---

# Clean Code Decision Framework

When evaluating code ask:

## 1. Intent

Can another engineer understand what this code does?

## 2. Naming

Do names communicate meaning?

## 3. Responsibility

Does each component have a coherent responsibility?

## 4. Complexity

Is control flow unnecessarily difficult?

## 5. Duplication

Is important knowledge duplicated?

## 6. Abstraction

Does each abstraction represent a meaningful concept?

## 7. Coupling

Does the code know more about other components than necessary?

## 8. State

Is mutation controlled and understandable?

## 9. Failure

Are failure paths explicit and understandable?

## 10. Testability

Can important behavior be validated?

## 11. Consistency

Does the implementation follow repository conventions?

## 12. Necessity

Is every significant abstraction or complexity justified?

---

# Best Practices

- Write code for readers.
- Communicate intent clearly.
- Prefer meaningful names.
- Use consistent terminology.
- Keep functions cohesive.
- Keep control flow simple.
- Reduce unnecessary nesting.
- Use guard clauses where they improve clarity.
- Keep variables close to their use.
- Minimize unnecessary mutable state.
- Make side effects clear.
- Avoid duplicated knowledge.
- Abstract only meaningful concepts.
- Prefer correct abstractions over premature abstractions.
- Keep comments focused on why.
- Remove obsolete comments.
- Remove dead code.
- Keep public surfaces small.
- Keep dependencies explicit.
- Prefer predictable behavior.
- Follow repository formatting.
- Keep changes focused.
- Refactor incrementally.
- Optimize only with evidence.
- Keep security-sensitive behavior visible.
- Treat test code as maintainable code.
- Review AI-generated code critically.

---

# Common Mistakes

Avoid:

- Optimizing for fewer lines instead of readability.
- Using meaningless names.
- Using inconsistent terminology.
- Creating functions with many unrelated responsibilities.
- Deeply nested control flow.
- Complex boolean expressions without explanation.
- Hidden side effects.
- Excessive mutable state.
- Global state without clear ownership.
- Returning ambiguous values.
- Using null with unclear semantics.
- Extracting every few lines into functions.
- Creating abstractions too early.
- Deduplicating unrelated concepts.
- Creating generic helper classes.
- Keeping commented-out code.
- Writing comments that repeat code.
- Leaving outdated comments.
- Catching and ignoring errors.
- Introducing patterns without need.
- Introducing dependencies for trivial behavior.
- Performing premature optimization.
- Creating generic frameworks for hypothetical future requirements.
- Rewriting working code for personal stylistic preference.
- Treating every code smell as an automatic refactoring requirement.
- Assuming code generated by AI is automatically clean.

---

# Validation Checklist

Before considering code sufficiently clean, verify:

- [ ] Intent is understandable.
- [ ] Names communicate meaning.
- [ ] Terminology is consistent.
- [ ] Functions have cohesive responsibilities.
- [ ] Function parameters are reasonable.
- [ ] Important side effects are clear.
- [ ] Return-value semantics are clear.
- [ ] Null or absence semantics are understood.
- [ ] Control flow is easy to follow.
- [ ] Excessive nesting is avoided.
- [ ] Complex conditions are understandable.
- [ ] Variables have meaningful names.
- [ ] Variable scope is appropriately limited.
- [ ] Mutable state is controlled.
- [ ] Magic values are avoided where meaning requires a named concept.
- [ ] Abstraction levels are reasonably consistent.
- [ ] Duplication of important knowledge is avoided.
- [ ] Abstractions represent meaningful concepts.
- [ ] Components remain cohesive.
- [ ] Coupling is controlled.
- [ ] Comments explain useful context rather than obvious code.
- [ ] Comments remain accurate.
- [ ] No unnecessary commented-out code exists.
- [ ] Error handling is understandable.
- [ ] External input is appropriately validated.
- [ ] Utility areas have clear responsibility.
- [ ] Dead code was removed.
- [ ] Dependencies are justified.
- [ ] Important behavior is testable.
- [ ] Performance complexity is justified.
- [ ] Security-sensitive behavior is understandable.
- [ ] Repository conventions are followed.
- [ ] No unnecessary design pattern was introduced.
- [ ] No speculative functionality was introduced.
- [ ] Change scope remains focused.
- [ ] Another engineer can reasonably maintain the code.

---

# Relationship With Other Engineering Skills

`clean-code.md` focuses on implementation-level readability and maintainability.

Use it together with:

### `coding-standards.md`

Defines the baseline rules and conventions for engineering implementation.

### `clean-architecture.md`

Defines higher-level responsibilities, architectural boundaries, dependency direction, and structural organization.

### `code-quality.md`

Defines measurable quality controls, complexity management, static analysis, duplication, and quality gates.

### `error-handling.md`

Defines consistent failure representation, propagation, recovery, and error boundaries.

### `testing-strategy.md`

Defines how important behavior should be verified.

### `dependency-management.md`

Defines how external dependencies should be selected and maintained.

### `configuration-management.md`

Defines configuration structure, validation, ownership, and lifecycle.

### `secure-coding.md`

Defines implementation-level security requirements.

### `performance-engineering.md`

Defines performance measurement, profiling, and optimization.

### `concurrency.md`

Defines safe concurrent and asynchronous implementation.

### `code-review.md`

Defines review expectations for readability, maintainability, correctness, and engineering quality.

Conceptually:

```text
                 Clean Architecture
                        │
                        ↓
                Code Responsibilities
                        │
                        ↓
                   Clean Code
                        │
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
      Naming         Functions       Control Flow
        │               │               │
        └───────────────┼───────────────┘
                        ↓
                   Simplicity
                        ↓
                  Maintainability
                        ↓
                    Testing
                        ↓
                   Code Review
```

---

# References

Clean-code practices may draw, where applicable, from recognized software-engineering concepts such as:

- Clean Code principles
- SOLID principles
- DRY
- KISS
- YAGNI
- Separation of Concerns
- Principle of Least Surprise
- Information Hiding
- Encapsulation
- High Cohesion
- Low Coupling
- Command-Query Separation
- Refactoring principles
- Code-smell analysis
- Cognitive complexity principles
- Defensive programming
- Relevant language-specific coding conventions
- Relevant organizational engineering standards

These principles should be treated as guidance rather than mechanically enforced rules.

The appropriate implementation should ultimately be determined by correctness, clarity, maintainability, architecture, security, reliability, performance requirements, repository conventions, domain complexity, and engineering context.
