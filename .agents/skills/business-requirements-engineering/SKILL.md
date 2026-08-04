---
name: business-requirements-engineering
description: Repository guidance for requirements engineering. Use when Codex performs related business analysis work.
---

# Requirements Engineering Skill

## Purpose

This skill defines principles, standards, and best practices for requirements engineering.

It provides consistent guidance for discovering, analyzing, specifying, validating, prioritizing, tracing, and managing requirements throughout their lifecycle.

This skill is:

- Domain-neutral
- Technology-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge rather than as a project workflow or implementation guide.

---

## Objectives

Requirements engineering should ensure that requirements are:

- Necessary
- Clear
- Complete
- Consistent
- Feasible
- Verifiable
- Traceable
- Prioritized
- Maintainable
- Aligned with stakeholder needs
- Aligned with business objectives

The objective is not to maximize the number of requirements.

The objective is to establish sufficient shared understanding of what must be achieved and the conditions under which success can be demonstrated.

---

## Definitions

### Requirement

A documented need, capability, behavior, quality, condition, or constraint that must be satisfied.

### Requirement Source

The origin of a requirement.

Sources may include:

- Stakeholders
- Business objectives
- Regulations
- Policies
- Contracts
- Existing processes
- Operational needs
- Standards
- Research
- Existing capabilities

### Requirement Elicitation

The process of discovering requirements and relevant information from stakeholders and other sources.

### Requirement Analysis

The examination of requirements to identify meaning, relationships, conflicts, gaps, dependencies, feasibility, and priority.

### Requirement Specification

The structured documentation of requirements in a clear and usable form.

### Requirement Validation

Confirmation that documented requirements represent the actual stakeholder and business needs.

### Requirement Verification

Confirmation that requirements satisfy defined quality standards.

### Requirement Traceability

The ability to connect a requirement to its origin, related requirements, decisions, outcomes, and verification evidence.

### Baseline

An agreed set of requirements used as a controlled reference point.

---

## Fundamental Principles

### Understand Before Specifying

Do not immediately convert an initial request into a formal requirement.

First understand:

- Why it is needed
- Who needs it
- What outcome is expected
- What problem it addresses
- What constraints apply

---

### Requirements Describe Needs

Requirements should primarily describe required outcomes, capabilities, qualities, or constraints.

Avoid embedding implementation decisions unless they are genuine constraints.

For example:

Prefer:

> Authorized users must be able to access required information securely.

Over:

> The solution must use Technology X for authentication.

The second statement is appropriate only when Technology X is a confirmed constraint.

---

### Every Requirement Should Have Purpose

A requirement should have a clear reason for existing.

Important requirements should be traceable to:

- Business objectives
- Stakeholder needs
- Policies
- Regulations
- Risks
- Other authoritative sources

Requirements without clear value or justification should be challenged.

---

### Requirements Must Be Verifiable

A requirement should be expressed so that its fulfillment can eventually be demonstrated objectively.

Avoid subjective terms unless they are defined.

Examples include:

- Fast
- Easy
- Modern
- Flexible
- User-friendly
- Robust
- Secure
- Scalable
- Efficient

Replace them with measurable or observable criteria where practical.

---

## Requirement Types

Requirements may be classified into several categories.

### Business Requirements

Describe high-level organizational objectives or desired outcomes.

### Stakeholder Requirements

Describe needs of specific stakeholder groups.

### Functional Requirements

Describe required behavior or capability.

### Non-Functional Requirements

Describe required quality characteristics or operating conditions.

### Transition Requirements

Describe temporary needs required to move from a current state to a desired future state.

### Constraint Requirements

Describe restrictions that limit available options.

### Regulatory Requirements

Describe obligations arising from laws, regulations, policies, contracts, or standards.

### Interface Requirements

Describe interactions or information exchanges between boundaries.

The classification scheme should support clarity rather than create unnecessary administrative complexity.

---

## Requirement Elicitation

Requirements may be discovered using techniques such as:

- Interviews
- Workshops
- Observation
- Surveys
- Document analysis
- Process analysis
- Existing capability analysis
- Prototyping
- Brainstorming
- Interface analysis
- Data analysis
- Root cause analysis

No single elicitation technique is appropriate for every situation.

Select techniques based on:

- Complexity
- Stakeholder availability
- Uncertainty
- Risk
- Time constraints
- Existing knowledge

---

## Elicitation Quality

Effective elicitation should uncover:

- Explicit needs
- Implicit needs
- Business rules
- Constraints
- Assumptions
- Exceptions
- Dependencies
- Risks
- Quality expectations
- Conflicting expectations

Do not assume that the initial request represents the complete requirement.

---

## Requirement Specification

Requirements should use clear and consistent language.

Where practical, use:

> The [subject] shall/must [required capability or behavior] [under defined conditions].

The exact wording style may vary according to organizational standards.

Avoid unnecessary technical jargon.

---

## Atomic Requirements

Where practical, each requirement should express one primary need.

Avoid:

> The capability must validate input, send notifications, create reports, and archive records.

Prefer separate requirements when these behaviors need independent:

- Prioritization
- Traceability
- Verification
- Change management

---

## Requirement Identifiers

Important requirements should have stable identifiers.

Example:

```text
BR-001
FR-001
NFR-001
SEC-001
INT-001
```

Identifiers should remain stable even if requirement wording changes.

Do not reuse identifiers for unrelated requirements.

---

## Functional Requirements

Functional requirements describe required behavior or capabilities.

They should identify:

- Trigger or condition
- Required behavior
- Expected outcome
- Relevant business rules
- Exceptions where necessary

Avoid unnecessary implementation details.

---

## Non-Functional Requirements

Non-functional requirements should define measurable quality expectations where possible.

Relevant characteristics may include:

- Performance
- Scalability
- Reliability
- Availability
- Resilience
- Security
- Privacy
- Accessibility
- Usability
- Maintainability
- Recoverability
- Interoperability
- Portability
- Auditability

Not every characteristic applies to every initiative.

Select those that materially affect success.

---

## Measurability

Where measurement is meaningful, define:

- Metric
- Target
- Operating condition
- Measurement method

For example:

Instead of:

> Responses must be fast.

Prefer:

> Response performance must satisfy an agreed threshold under the defined workload conditions.

Do not invent numerical thresholds when they have not been established.

Mark them as:

- TBD
- Requires validation
- Assumption

where appropriate.

---

## Requirement Quality Criteria

A requirement should be evaluated for the following characteristics.

### Necessary

The requirement supports a legitimate need.

### Correct

It accurately represents the intended need.

### Clear

It can be understood by relevant stakeholders.

### Unambiguous

It has one reasonable interpretation.

### Complete

It contains enough information to understand the requirement.

### Consistent

It does not conflict with other requirements.

### Feasible

It can reasonably be satisfied within known constraints.

### Verifiable

Compliance can be objectively demonstrated.

### Traceable

Its origin and relationships are identifiable.

### Prioritized

Its relative importance is understood where necessary.

### Maintainable

It can be changed without creating unnecessary ambiguity.

---

## Requirement Relationships

Requirements may have relationships such as:

- Parent / Child
- Depends On
- Enables
- Conflicts With
- Refines
- Derives From
- Replaces
- Related To

Important relationships should be documented when they affect decisions or delivery.

---

## Traceability

Traceability should connect requirements across relevant levels.

Example:

```text
Business Objective
        ↓
Business Requirement
        ↓
Stakeholder Requirement
        ↓
Functional / Non-Functional Requirement
        ↓
Acceptance Criteria
        ↓
Verification Evidence
```

Traceability should answer:

- Why does this requirement exist?
- Who requested or owns it?
- What does it support?
- What depends on it?
- How will satisfaction be demonstrated?

Avoid creating traceability purely for documentation volume.

---

## Requirement Prioritization

Prioritization should consider:

- Business Value
- Risk
- Urgency
- Compliance
- Dependency
- Cost
- Effort
- Strategic Importance
- Consequence of Delay

Possible techniques include:

- MoSCoW
- Value vs. Effort
- Weighted Scoring
- Ranking
- Cost of Delay

The prioritization technique should match the decision being made.

---

## Acceptance Criteria

Acceptance criteria define observable conditions demonstrating satisfaction of a requirement.

Good acceptance criteria should be:

- Specific
- Relevant
- Observable
- Testable
- Unambiguous

Acceptance criteria should cover relevant:

- Normal conditions
- Boundary conditions
- Exception conditions
- Failure conditions

Do not duplicate the requirement unnecessarily.

---

## Assumptions and Unknowns

Do not silently convert missing information into requirements.

When information is unknown:

- Identify the gap.
- Determine whether it materially affects decisions.
- Ask for clarification where necessary.
- Record an assumption when proceeding is reasonable.
- Mark unresolved items appropriately.

Possible labels include:

```text
TBD
TBC
Assumption
Open Question
Decision Required
```

---

## Requirement Conflict Management

Conflicting requirements should not be silently reconciled.

When conflicts exist:

1. Identify the conflicting requirements.
2. Identify affected stakeholders.
3. Understand the rationale behind each.
4. Evaluate business impact.
5. Determine decision authority.
6. Record the resolution.
7. Update affected traceability.

---

## Requirement Dependency Management

Dependencies should be identified when one requirement cannot be satisfied independently of another condition or capability.

Consider dependencies involving:

- Other requirements
- Decisions
- External organizations
- Regulations
- Data
- Interfaces
- Processes
- Capabilities

Significant dependencies should be visible during prioritization and change analysis.

---

## Requirement Change Management

Requirements naturally evolve.

Changes should be evaluated rather than automatically accepted or rejected.

Assess potential impact on:

- Business objectives
- Scope
- Dependencies
- Risk
- Cost
- Schedule
- Quality
- Related requirements
- Existing decisions

Significant changes should maintain an auditable rationale.

---

## Requirement Baselines

A baseline represents an agreed reference point.

Baselines help distinguish:

- Approved requirements
- Proposed changes
- Deferred requirements
- Rejected requirements

Baseline management should be proportional to project complexity and governance needs.

---

## Requirement Validation

Validation asks:

> Are these the right requirements?

Validate whether requirements:

- Represent actual stakeholder needs
- Support business objectives
- Deliver expected value
- Reflect agreed scope
- Address relevant risks
- Represent the desired outcome

---

## Requirement Verification

Verification asks:

> Are the requirements written correctly?

Verify:

- Clarity
- Completeness
- Consistency
- Feasibility
- Testability
- Traceability
- Correct classification

Validation and verification are related but different activities.

---

## Decision Guidelines

When deciding whether additional detail is necessary, consider:

- Risk
- Complexity
- Ambiguity
- Cost of misunderstanding
- Number of stakeholders
- Regulatory impact
- Dependency impact

Higher-risk requirements generally require greater precision.

Do not create documentation detail that provides no decision, implementation, validation, or governance value.

---

## Best Practices

- Use consistent terminology.
- Assign stable identifiers to important requirements.
- Separate needs from implementation decisions.
- Make quality requirements measurable where possible.
- Maintain traceability for significant requirements.
- Identify assumptions explicitly.
- Record unresolved questions.
- Resolve conflicts through appropriate decision authority.
- Keep requirements current.
- Remove obsolete requirements.
- Prioritize requirements intentionally.
- Validate requirements with appropriate stakeholders.
- Preserve rationale for significant decisions.
- Keep documentation proportional to complexity and risk.

---

## Quality Considerations

Good requirements engineering balances:

### Precision

Enough detail to prevent material misunderstanding.

### Simplicity

No unnecessary complexity.

### Completeness

Important needs and constraints are captured.

### Adaptability

Requirements can evolve without losing integrity.

### Traceability

Important relationships and rationale remain visible.

### Verifiability

Satisfaction can eventually be demonstrated.

---

## Trade-offs

Requirements engineering may require balancing:

- Detail vs. speed
- Precision vs. flexibility
- Documentation vs. collaboration
- Stability vs. adaptability
- Stakeholder preference vs. organizational value
- Short-term needs vs. long-term outcomes

There is no universal optimal level of documentation.

The appropriate level depends on:

- Risk
- Complexity
- Governance
- Regulatory requirements
- Team structure
- Consequence of failure

---

## Common Mistakes

Avoid:

- Treating initial requests as complete requirements.
- Writing requirements before understanding the underlying need.
- Mixing requirements with implementation design.
- Combining multiple unrelated requirements.
- Using ambiguous language.
- Inventing numerical targets.
- Ignoring non-functional requirements.
- Ignoring exception scenarios.
- Failing to identify dependencies.
- Leaving assumptions hidden.
- Allowing requirement conflicts to remain unresolved.
- Losing traceability during changes.
- Creating excessive documentation without practical value.
- Treating every requirement as equally important.
- Changing baselined requirements without impact analysis.

---

## Validation Checklist

Before considering requirements sufficiently engineered, verify:

- [ ] Requirements have identifiable sources.
- [ ] Requirements support defined needs or objectives.
- [ ] Important requirements have stable identifiers.
- [ ] Requirements are appropriately classified.
- [ ] Requirements are clear.
- [ ] Requirements are sufficiently complete.
- [ ] Requirements are unambiguous.
- [ ] Requirements are feasible within known constraints.
- [ ] Requirements are verifiable.
- [ ] Relevant non-functional requirements are defined.
- [ ] Assumptions are visible.
- [ ] Unknowns are identified.
- [ ] Dependencies are documented where significant.
- [ ] Conflicts have been resolved or explicitly recorded.
- [ ] Priorities are established where necessary.
- [ ] Acceptance criteria exist where appropriate.
- [ ] Significant requirements are traceable.
- [ ] Changes can be evaluated for impact.
- [ ] Confirmed requirements and proposed requirements are distinguishable.

---

## References

Requirements engineering practices should align, where applicable, with recognized guidance such as:

- ISO/IEC/IEEE 29148 — Requirements Engineering
- ISO/IEC/IEEE 15288 — System Life Cycle Processes
- IIBA Business Analysis Body of Knowledge (BABOK)
- PMI Business Analysis guidance
- IEEE software and systems engineering practices
- Relevant organizational governance standards

References provide guidance and terminology.

Organizational context, risk, and professional judgment should determine how the principles are applied.

