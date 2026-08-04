---
name: business-analysis
description: Repository guidance for analysis. Use when Codex performs related business analysis work.
---

# Business Analysis Skill

## Purpose

This skill defines the principles, standards, and best practices for business analysis.

It provides a consistent approach for understanding business needs, identifying problems and opportunities, defining desired outcomes, analyzing requirements, evaluating constraints, and supporting informed decision-making.

This skill is:

- Domain-neutral
- Technology-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge and not as a workflow or implementation guide.

---

## Objectives

Business analysis should help ensure that:

- The real business need is understood.
- Business problems are clearly defined.
- Expected outcomes are measurable.
- Stakeholders and their needs are understood.
- Requirements align with business objectives.
- Assumptions and constraints are visible.
- Risks and dependencies are identified.
- Scope is clearly defined.
- Proposed changes deliver measurable value.
- Decisions are supported by evidence where possible.

---

## Definitions

### Business Need

A problem, opportunity, objective, or desired outcome that motivates change.

### Business Requirement

A high-level statement describing an organizational need or desired business outcome.

### Stakeholder

An individual, group, or organization that can influence, is affected by, or has an interest in an initiative.

### Requirement

A documented need, capability, condition, or constraint that must be satisfied.

### Functional Requirement

A requirement describing a capability, behavior, or outcome that must be provided.

### Non-Functional Requirement

A requirement describing expected qualities or constraints such as performance, security, reliability, accessibility, usability, or scalability.

### Business Rule

A policy, condition, constraint, calculation, or decision rule governing business behavior.

### Assumption

Something believed to be true for planning purposes but not yet fully validated.

### Constraint

A restriction that limits available options.

### Dependency

A relationship where an outcome relies on another activity, capability, decision, system, team, organization, or external factor.

### Risk

An uncertain event or condition that could positively or negatively affect objectives.

### Scope

The defined boundary of what is included and excluded from an initiative.

---

## Fundamental Principles

### Understand the Problem Before the Solution

Business analysis must begin with understanding the underlying problem, opportunity, or objective.

Avoid prematurely defining:

- Technologies
- Products
- Architectures
- Vendors
- Implementation approaches

unless they are confirmed constraints.

---

### Focus on Business Value

Every significant requirement should contribute to an identifiable business outcome.

Examples include:

- Revenue growth
- Cost reduction
- Risk reduction
- Productivity improvement
- Customer satisfaction
- Regulatory compliance
- Operational efficiency
- Quality improvement

Requirements without identifiable value should be challenged.

---

### Separate Needs from Solutions

Distinguish between:

**Need**

What outcome is required.

**Solution**

How the outcome may eventually be achieved.

Business analysis should primarily define the need.

---

### Maintain Traceability

Important requirements should be traceable to their origin and business purpose.

A useful hierarchy is:

Business Need

↓

Business Objective

↓

Business Requirement

↓

Capability / Feature

↓

Detailed Requirement

↓

Acceptance Criteria

Traceability helps prevent unnecessary requirements and scope creep.

---

### Make Requirements Verifiable

Requirements should be written so that their fulfillment can be objectively evaluated.

Avoid vague terminology such as:

- Fast
- Easy
- User-friendly
- Flexible
- Highly available
- Secure
- Scalable

unless measurable criteria are provided.

---

## Business Problem Analysis

A well-defined business problem should explain:

- Current situation
- Existing pain points
- Who is affected
- Business impact
- Why change is required
- Consequences of taking no action
- Desired future state

Avoid describing only symptoms.

Identify underlying causes where possible.

---

## Business Objectives

Business objectives should be:

- Specific
- Measurable
- Achievable
- Relevant
- Time-aware where appropriate

Where possible, define measurable indicators.

Example:

Instead of:

> Improve processing efficiency.

Prefer:

> Reduce average processing time from the current baseline by an agreed target.

Do not invent numerical targets when none have been provided.

---

## Stakeholder Analysis

Identify stakeholders who:

- Own the business outcome
- Perform affected activities
- Make decisions
- Provide information
- Operate affected processes
- Govern compliance
- Provide funding
- Consume outputs
- Support the resulting capability

Consider:

- Influence
- Interest
- Responsibilities
- Expectations
- Decision authority
- Potential conflicts

Do not assume all stakeholders have the same priorities.

---

## Scope Definition

Scope should establish clear boundaries.

### In Scope

Identify capabilities, processes, outcomes, or areas included.

### Out of Scope

Explicitly identify exclusions.

Good scope definition should reduce:

- Ambiguity
- Scope creep
- Conflicting expectations
- Unnecessary work

Changes to agreed scope should be evaluated for impact.

---

## Requirement Classification

Requirements should be classified where appropriate.

Common categories include:

### Business Requirements

Describe organizational objectives and outcomes.

### Stakeholder Requirements

Describe stakeholder needs and expectations.

### Functional Requirements

Describe required capabilities and behavior.

### Non-Functional Requirements

Describe required quality characteristics or constraints.

### Transition Requirements

Describe temporary capabilities required to move from the current state to the future state.

### Regulatory or Compliance Requirements

Describe obligations imposed by laws, regulations, policies, contracts, or standards.

---

## Non-Functional Requirements

Consider relevant quality characteristics such as:

- Performance
- Scalability
- Availability
- Reliability
- Resilience
- Security
- Privacy
- Accessibility
- Usability
- Maintainability
- Interoperability
- Auditability
- Recoverability
- Portability

Only include characteristics relevant to the initiative.

Where possible, define measurable criteria.

---

## Requirement Quality

A high-quality requirement should be:

### Clear

Understandable by intended stakeholders.

### Necessary

Supports a genuine business or stakeholder need.

### Unambiguous

Has one reasonable interpretation.

### Consistent

Does not conflict with other requirements.

### Feasible

Can reasonably be achieved within known constraints.

### Verifiable

Can be objectively validated.

### Traceable

Can be linked to its source and business objective.

### Prioritized

Its relative importance is understood.

### Atomic

Represents one primary requirement where practical.

---

## Requirement Prioritization

Prioritization should reflect business value, urgency, risk, dependency, and effort.

A commonly used technique is MoSCoW.

| Priority | Meaning |
|---|---|
| Must Have | Essential for the agreed outcome |
| Should Have | Important but not essential for initial success |
| Could Have | Valuable if capacity permits |
| Won't Have Now | Explicitly deferred |

Priority should not be assigned arbitrarily.

Consider:

- Business value
- Risk
- Compliance
- Dependency
- Urgency
- Cost
- Effort
- Strategic alignment

---

## Assumption Management

Assumptions must be explicitly identified.

For important assumptions:

- State the assumption.
- Explain why it matters.
- Identify its potential impact.
- Validate it when possible.

Do not present assumptions as confirmed facts.

Unvalidated assumptions that could materially affect scope, cost, architecture, or delivery should be highlighted.

---

## Constraint Analysis

Common constraints include:

- Budget
- Timeline
- Regulation
- Policy
- Existing commitments
- Technology limitations
- Skills availability
- Contractual obligations
- Organizational standards

Constraints should be distinguished from preferences.

---

## Dependency Analysis

Identify dependencies that could influence delivery or outcomes.

Examples include:

- Other initiatives
- External organizations
- Third parties
- Decisions
- Data
- Approvals
- Capabilities
- Teams
- Regulatory processes

For significant dependencies, consider:

- Owner
- Impact
- Required timing
- Risk if unavailable

---

## Risk Analysis

Risks should be assessed based on factors such as:

- Likelihood
- Impact
- Exposure
- Mitigation options

Risk categories may include:

- Business
- Operational
- Financial
- Regulatory
- Security
- Delivery
- Dependency
- Adoption
- Technical

Risks should be described objectively.

Do not exaggerate or minimize risk without evidence.

---

## Business Rules

Business rules should be:

- Explicit
- Consistent
- Traceable
- Testable where possible
- Separate from process descriptions

Examples include:

- Eligibility rules
- Approval rules
- Calculation rules
- Validation rules
- Policy constraints
- Decision criteria

Conflicting rules should be identified and resolved.

---

## Acceptance Criteria

Acceptance criteria define conditions that demonstrate whether a requirement or outcome has been satisfied.

Good acceptance criteria should be:

- Specific
- Observable
- Testable
- Relevant
- Unambiguous

Behavior-oriented criteria may use:

Given

When

Then

when appropriate.

The format should support clarity rather than being applied mechanically.

---

## Decision Guidelines

When information is incomplete:

1. Determine whether the missing information materially affects the outcome.
2. Ask for clarification when the impact is significant.
3. Use assumptions only when reasonable.
4. Clearly label assumptions.
5. Avoid inventing business policies, compliance requirements, budgets, deadlines, or quantitative targets.

When requirements conflict:

1. Identify the conflict.
2. Determine affected objectives and stakeholders.
3. Evaluate business impact.
4. Seek authoritative clarification.
5. Record the resulting decision.

---

## Best Practices

- Start with business outcomes.
- Ask why before defining what.
- Distinguish problems from symptoms.
- Use measurable language.
- Maintain traceability.
- Make assumptions visible.
- Define clear scope boundaries.
- Prioritize based on business value.
- Identify conflicting requirements early.
- Keep requirements solution-neutral where possible.
- Use terminology consistently.
- Maintain a glossary for domain-specific terms.
- Validate understanding with relevant stakeholders.
- Preserve the source and rationale of important requirements.

---

## Quality Considerations

High-quality business analysis should provide:

### Completeness

Relevant business needs and constraints have been considered.

### Consistency

Requirements do not contradict each other.

### Traceability

Requirements connect to business objectives.

### Clarity

Stakeholders can understand the documented information.

### Verifiability

Requirements can be objectively evaluated.

### Value Alignment

Requirements contribute to meaningful outcomes.

---

## Trade-offs

Business analysis often requires balancing:

- Scope vs. time
- Value vs. cost
- Flexibility vs. simplicity
- Speed vs. completeness
- Standardization vs. specialization
- Short-term needs vs. long-term goals
- Stakeholder expectations vs. organizational priorities

Trade-offs should be explicit rather than hidden.

Significant trade-offs should include rationale.

---

## Common Mistakes

Avoid:

- Starting with a predetermined solution.
- Treating stakeholder requests as automatically valid requirements.
- Confusing symptoms with root problems.
- Using vague or subjective language.
- Mixing requirements with implementation details.
- Leaving assumptions undocumented.
- Ignoring non-functional requirements.
- Failing to define out-of-scope items.
- Creating requirements without business value.
- Inventing quantitative targets.
- Ignoring conflicting stakeholder expectations.
- Treating priorities as fixed without rationale.
- Creating excessive documentation without decision value.

---

## Validation Checklist

Before considering business analysis complete, verify:

- [ ] Business need is clearly understood.
- [ ] Business problem or opportunity is defined.
- [ ] Business objectives are identified.
- [ ] Expected value is understood.
- [ ] Relevant stakeholders are identified.
- [ ] Scope boundaries are clear.
- [ ] Functional requirements are sufficiently defined.
- [ ] Relevant non-functional requirements are identified.
- [ ] Business rules are documented.
- [ ] Assumptions are explicitly identified.
- [ ] Constraints are documented.
- [ ] Dependencies are understood.
- [ ] Significant risks are identified.
- [ ] Requirements are prioritized where necessary.
- [ ] Requirements are clear and verifiable.
- [ ] Significant requirements are traceable to business objectives.
- [ ] Conflicts and ambiguities have been addressed.
- [ ] Confirmed facts and assumptions are distinguishable.

---

## References

Business analysis practices should align, where applicable, with recognized guidance such as:

- IIBA Business Analysis Body of Knowledge (BABOK)
- PMI Business Analysis guidance
- ISO/IEC/IEEE 29148 — Requirements Engineering
- ISO/IEC/IEEE 15288 — System Life Cycle Processes
- Relevant organizational governance and domain standards

References provide guidance rather than replacing organizational judgment.

