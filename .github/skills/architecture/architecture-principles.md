# Architecture Principles Skill

## Purpose

This skill defines fundamental principles, decision criteria, quality considerations, and best practices for architecture.

Architecture provides the structural foundation for achieving required outcomes while balancing quality attributes, constraints, risks, cost, and change.

The objective of architecture is not to maximize technical sophistication.

The objective is to establish an appropriate structure that enables desired outcomes while managing complexity and trade-offs.

This skill is:

- Domain-neutral
- Technology-neutral
- Vendor-neutral
- Platform-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge rather than as a project workflow or implementation guide.

---

## Objectives

Good architecture should help:

- Align structural decisions with desired outcomes.
- Manage complexity.
- Support required quality attributes.
- Establish clear boundaries and responsibilities.
- Reduce unnecessary coupling.
- Promote appropriate cohesion.
- Enable change where change is expected.
- Protect critical concerns.
- Manage dependencies.
- Make significant decisions explicit.
- Identify architectural risks.
- Support sustainable evolution.
- Avoid unnecessary complexity.
- Balance benefits, costs, constraints, and trade-offs.

---

## Definitions

### Architecture

The fundamental concepts, structures, relationships, principles, and significant decisions that shape a system or capability.

### Architectural Decision

A decision with meaningful structural, quality, cost, risk, operational, or long-term consequences.

### Architecture Principle

A durable guideline used to guide architectural decisions.

### Component

A logical or physical unit with a defined responsibility and boundary.

### Boundary

A separation between responsibilities, capabilities, ownership, trust levels, or areas of change.

### Dependency

A relationship in which one element relies on another.

### Coupling

The degree of dependency between elements.

### Cohesion

The degree to which responsibilities within an element belong together.

### Quality Attribute

A characteristic describing how well a system or capability must behave.

Examples include:

- Performance
- Reliability
- Security
- Maintainability
- Scalability
- Availability
- Usability
- Interoperability

### Constraint

A restriction that limits architectural choices.

### Trade-off

A decision in which improving one characteristic may reduce another or introduce additional cost, risk, or complexity.

### Architecture View

A representation of architecture from a particular stakeholder or concern perspective.

### Architecture Pattern

A reusable structural approach to a recurring architectural problem.

### Technical Debt

The future cost or risk created by decisions that optimize for short-term needs at the expense of longer-term maintainability or quality.

---

# Fundamental Principles

## Architecture Must Support Outcomes

Architecture exists to support desired outcomes.

Architectural decisions should trace back to:

- Business objectives
- Stakeholder needs
- Requirements
- Quality attributes
- Constraints
- Risks

Technology should not drive architecture without a justified need.

Avoid selecting technologies simply because they are:

- Popular
- New
- Familiar
- Fashionable
- Preferred by an individual

---

## Simplicity First

Prefer the simplest architecture that satisfies known requirements and constraints.

Complexity should be introduced only when it provides measurable or necessary value.

Unnecessary complexity increases:

- Cost
- Cognitive load
- Operational burden
- Failure modes
- Security exposure
- Maintenance effort
- Dependency risk

Architecture should earn its complexity.

---

## Separation of Concerns

Separate responsibilities that:

- Change for different reasons.
- Have different ownership.
- Have different security requirements.
- Have different scaling characteristics.
- Represent different business capabilities.
- Require different lifecycle management.

Avoid arbitrary separation.

Every boundary introduces coordination cost.

---

## High Cohesion

Elements should group responsibilities that naturally belong together.

High cohesion improves:

- Understandability
- Maintainability
- Ownership
- Change isolation
- Testability

Avoid grouping unrelated responsibilities merely for convenience.

---

## Loose Coupling

Dependencies between elements should be minimized and explicit.

Loose coupling supports:

- Independent change
- Easier testing
- Failure isolation
- Replaceability
- Independent evolution

Loose coupling does not mean eliminating all dependencies.

Dependencies are necessary.

The goal is to make them intentional and manageable.

---

## Encapsulation

Internal implementation details should remain hidden behind well-defined boundaries.

Consumers should depend on stable contracts rather than internal details.

Encapsulation helps reduce the impact of change.

---

## Abstraction

Use abstraction to hide unnecessary complexity and establish stable contracts.

Good abstraction should:

- Represent meaningful concepts.
- Hide volatile details.
- Reduce unnecessary dependencies.

Avoid abstraction without a clear purpose.

Excessive abstraction can make architecture harder to understand.

---

## Dependency Direction

Dependencies should flow toward stable responsibilities and abstractions where practical.

Volatile implementation details should generally depend on more stable contracts rather than the reverse.

Dependency direction should help protect important logic from unnecessary external change.

---

## Explicit Boundaries

Important boundaries should be clearly identifiable.

Boundaries may represent:

- Responsibility
- Ownership
- Trust
- Deployment
- Data
- Process
- Lifecycle
- Capability

Ambiguous boundaries increase coupling and misunderstanding.

---

# Quality Attributes

Architecture should be driven by relevant quality attributes.

Not every quality attribute has equal importance.

Relevant attributes may include:

- Availability
- Reliability
- Scalability
- Performance
- Security
- Privacy
- Maintainability
- Modifiability
- Testability
- Interoperability
- Portability
- Recoverability
- Observability
- Accessibility
- Usability
- Auditability
- Resilience
- Deployability

Architecture should prioritize attributes according to actual requirements and risk.

---

## Quality Attribute Scenarios

Important quality attributes should be expressed in observable terms where practical.

A useful structure is:

```text
Source
↓
Stimulus
↓
Environment
↓
Affected Element
↓
Expected Response
↓
Measure
```

For example, performance requirements should ideally identify:

- Workload
- Operating condition
- Expected response
- Measurement criteria

Avoid architectural decisions based solely on vague statements such as:

> The system must be highly scalable.

---

# Trade-off Management

Architecture almost always involves trade-offs.

Examples include:

```text
Performance
vs.
Cost

Availability
vs.
Complexity

Security
vs.
Convenience

Consistency
vs.
Availability

Flexibility
vs.
Simplicity

Isolation
vs.
Resource Efficiency

Standardization
vs.
Specialization

Speed of Delivery
vs.
Long-Term Maintainability
```

Trade-offs should be explicit.

Significant architectural decisions should explain:

- Benefits
- Costs
- Risks
- Alternatives
- Consequences

---

# Architecture Decision Principles

## Make Significant Decisions Explicit

Not every technical choice requires formal documentation.

Document decisions that materially affect:

- Structure
- Security
- Data
- Integration
- Cost
- Scalability
- Reliability
- Operations
- Long-term evolution

---

## Preserve Decision Rationale

Knowing what was selected is often insufficient.

Important decisions should preserve:

- Context
- Decision
- Alternatives considered
- Rationale
- Consequences
- Known risks

This prevents future teams from repeating already-resolved analysis.

---

## Prefer Reversible Decisions

Where reasonable, prefer choices that can be changed without excessive cost.

Distinguish between:

### Reversible Decisions

Can be changed relatively easily.

### Irreversible or Expensive Decisions

Create significant migration, contractual, operational, or structural consequences.

Irreversible decisions require stronger evidence and deeper analysis.

---

## Delay Irreversible Decisions When Appropriate

Do not make irreversible decisions earlier than necessary when important information is still unavailable.

However, do not delay decisions when delay itself creates meaningful risk or cost.

---

# Evolutionary Architecture

Architecture should support expected change.

Do not attempt to predict every future requirement.

Instead:

- Protect likely areas of change.
- Maintain clear boundaries.
- Minimize unnecessary dependencies.
- Preserve reasonable extension points.
- Avoid speculative functionality.

Architecture should evolve deliberately as evidence changes.

---

# Modularity

Modularity divides responsibilities into meaningful units.

Good modules should:

- Have clear responsibilities.
- Have explicit boundaries.
- Minimize external dependencies.
- Hide internal implementation details.
- Change for coherent reasons.

Avoid both extremes:

### Too Little Modularity

Creates large tightly coupled structures.

### Excessive Modularity

Creates unnecessary communication, coordination, deployment, and operational complexity.

---

# Standardization

Use established organizational standards where they satisfy requirements.

Standardization can improve:

- Maintainability
- Interoperability
- Security
- Supportability
- Knowledge sharing
- Operational efficiency

Deviation may be appropriate when standards cannot reasonably satisfy important requirements.

Significant deviations should have documented rationale.

---

# Reuse

Reuse can reduce duplicated effort but should not be pursued blindly.

Prefer reuse when:

- Responsibilities genuinely overlap.
- The abstraction is stable.
- Ownership is clear.
- Consumers have compatible needs.

Avoid creating shared components solely because two implementations currently look similar.

Incorrect reuse can create unnecessary coupling.

---

# Technology Selection

Technology selection should consider:

- Requirement fit
- Quality attributes
- Maturity
- Supportability
- Skills
- Ecosystem
- Security
- Interoperability
- Operational complexity
- Cost
- Portability
- Vendor dependency
- Lifecycle
- Organizational standards

Technology selection should be evidence-based.

---

# Build vs. Buy vs. Reuse

Architectural decisions may involve:

### Build

Create a capability internally.

### Buy

Acquire an external capability.

### Reuse

Use an existing organizational capability.

Evaluate:

- Strategic importance
- Differentiation
- Cost
- Time
- Risk
- Control
- Integration
- Support
- Lifecycle
- Vendor dependency

Do not automatically build capabilities that are not strategically differentiating.

---

# Security by Design

Security should be considered as an architectural concern rather than added after design completion.

Architecture should consider:

- Trust boundaries
- Identity
- Access
- Data sensitivity
- Exposure
- Threats
- Least privilege
- Defense in depth
- Secure defaults
- Auditability

Security controls should be proportional to risk.

---

# Privacy by Design

Where relevant, architecture should consider:

- Data minimization
- Purpose limitation
- Access boundaries
- Retention
- Disclosure
- Traceability
- Data lifecycle

Collect or retain only information that serves a legitimate purpose.

---

# Reliability

Architecture should consider how expected outcomes are maintained when failures occur.

Relevant concepts may include:

- Fault isolation
- Redundancy
- Recovery
- Graceful degradation
- Retry
- Timeout
- Idempotency
- Failover

The appropriate mechanisms depend on requirements and failure consequences.

---

# Resilience

Resilience is the ability to withstand, adapt to, and recover from disruption.

Architecture should consider:

- What can fail?
- How will failure be detected?
- What is affected?
- Can failure propagate?
- How will recovery occur?
- What level of degradation is acceptable?

Avoid assuming infrastructure or dependencies will always be available.

---

# Scalability

Scalability concerns the ability to accommodate changing demand.

Architecture should consider:

- Workload characteristics
- Growth expectations
- Bottlenecks
- State management
- Resource constraints
- Scaling boundaries

Do not design for hypothetical extreme scale without evidence.

Over-scaling architecture can introduce unnecessary cost and complexity.

---

# Performance

Performance should be considered against defined requirements.

Relevant characteristics may include:

- Latency
- Throughput
- Concurrency
- Resource utilization
- Processing time

Performance decisions should be evidence-based.

Avoid premature optimization.

---

# Data as an Architectural Concern

Architecture should consider:

- Ownership
- Classification
- Integrity
- Consistency
- Lifecycle
- Retention
- Accessibility
- Availability
- Movement
- Governance

Data boundaries should be explicit.

Avoid unnecessary duplication of authoritative data.

---

# Integration Principles

Interactions across boundaries should use explicit contracts.

Integration should consider:

- Coupling
- Reliability
- Compatibility
- Versioning
- Failure handling
- Ownership
- Security
- Observability

Prefer contracts that allow participants to evolve independently where appropriate.

---

# Interoperability

Architecture should support required interaction across organizational, logical, or technical boundaries.

Prefer:

- Clear contracts
- Stable interfaces
- Open standards where appropriate
- Explicit ownership
- Compatibility management

Avoid unnecessary dependence on proprietary behavior where portability or interoperability is important.

---

# Observability

Important behavior should be observable.

Architecture should make it possible to understand:

- What happened?
- When did it happen?
- Where did it happen?
- Why did it happen?
- What was affected?

Observability supports:

- Operations
- Reliability
- Security
- Performance
- Troubleshooting
- Capacity management

---

# Operability

Architecture should consider how the resulting capability will be operated throughout its lifecycle.

Consider:

- Configuration
- Monitoring
- Recovery
- Maintenance
- Change
- Support
- Troubleshooting
- Capacity
- Governance

A design that is easy to build but difficult to operate may not be a good architecture.

---

# Maintainability

Architecture should support understandable and controlled change.

Maintainability is improved by:

- Clear boundaries
- Low coupling
- High cohesion
- Consistent conventions
- Limited complexity
- Explicit dependencies
- Appropriate documentation

---

# Testability

Architecture should allow important behavior and boundaries to be validated independently where practical.

Highly coupled architecture often reduces testability.

Testability should be considered during design rather than added later.

---

# Cost Awareness

Architecture decisions should consider total cost rather than only initial acquisition or implementation cost.

Consider:

- Build cost
- Operating cost
- Support cost
- Licensing
- Infrastructure
- Training
- Maintenance
- Migration
- Exit cost
- Failure cost

Lowest initial cost does not necessarily mean lowest total cost.

---

# Sustainability

Where relevant, architecture should consider efficient resource usage.

Avoid unnecessary:

- Processing
- Storage
- Data movement
- Idle capacity
- Duplication

Efficiency may improve both cost and environmental sustainability.

---

# Architecture Views

Architecture should be communicated using views appropriate to stakeholder concerns.

Possible views include:

- Context
- Logical
- Component
- Integration
- Data
- Deployment
- Security
- Operational
- Infrastructure

Do not create diagrams solely because a framework lists them.

Every architecture view should answer a meaningful question.

---

# Architecture Documentation

Architecture documentation should emphasize significant information.

Document:

- Important structures
- Boundaries
- Responsibilities
- Interfaces
- Dependencies
- Decisions
- Constraints
- Risks
- Trade-offs

Avoid documentation that merely reproduces implementation details without architectural value.

---

# Architecture Validation

Architecture should be evaluated against:

- Requirements
- Quality attributes
- Constraints
- Risks
- Operational needs
- Organizational standards
- Cost expectations

Validation should focus on whether the architecture can reasonably achieve required outcomes.

---

# Architecture Fitness

An architecture is appropriate when it satisfies relevant requirements with acceptable:

- Complexity
- Cost
- Risk
- Operational burden
- Change impact

There is rarely one universally "best" architecture.

Architecture quality depends on context.

---

## Decision Guidelines

When evaluating an architectural decision, ask:

1. What requirement or objective does this decision support?
2. What problem is being solved?
3. Is the decision necessary now?
4. What is the simplest viable option?
5. What alternatives exist?
6. What quality attributes are affected?
7. What dependencies are introduced?
8. What complexity is introduced?
9. What security implications exist?
10. What operational implications exist?
11. What cost implications exist?
12. How difficult is the decision to reverse?
13. What risks remain?
14. How will the decision be validated?

Significant decisions should have defensible answers to these questions.

---

## Best Practices

- Start from outcomes and requirements.
- Prefer simplicity.
- Make boundaries explicit.
- Minimize unnecessary coupling.
- Maximize meaningful cohesion.
- Hide volatile implementation details.
- Use abstraction intentionally.
- Make significant decisions explicit.
- Preserve decision rationale.
- Consider quality attributes early.
- Make trade-offs visible.
- Prefer reversible decisions where practical.
- Design for expected change rather than hypothetical change.
- Use organizational standards where appropriate.
- Consider security and privacy from the beginning.
- Design for failure where failure matters.
- Consider operational needs.
- Consider total lifecycle cost.
- Validate architecture against measurable requirements.
- Keep documentation proportional to complexity and risk.

---

## Quality Considerations

Good architecture should demonstrate:

### Fitness for Purpose

It supports required outcomes.

### Simplicity

It avoids unnecessary complexity.

### Modularity

Responsibilities are appropriately separated.

### Cohesion

Related responsibilities are grouped meaningfully.

### Controlled Coupling

Dependencies are intentional and manageable.

### Evolvability

Expected changes can be accommodated reasonably.

### Resilience

Relevant failures can be tolerated or recovered from.

### Security

Trust and risk are addressed appropriately.

### Operability

The architecture can be managed throughout its lifecycle.

### Cost Effectiveness

Benefits justify lifecycle cost and complexity.

---

## Trade-offs

Common architectural trade-offs include:

| Dimension | Trade-off |
|---|---|
| Simplicity | Flexibility |
| Performance | Cost |
| Availability | Complexity |
| Consistency | Availability |
| Security | Convenience |
| Isolation | Resource Efficiency |
| Standardization | Specialization |
| Abstraction | Understandability |
| Reuse | Coupling |
| Modularity | Coordination Overhead |
| Optimization | Maintainability |
| Portability | Platform Optimization |
| Delivery Speed | Long-Term Sustainability |

Trade-offs should be evaluated in context.

Avoid optimizing one quality attribute without understanding its effect on others.

---

## Common Mistakes

Avoid:

- Architecture driven by technology trends.
- Selecting patterns before understanding requirements.
- Designing for hypothetical extreme scale.
- Introducing unnecessary distributed complexity.
- Creating abstractions without clear value.
- Excessive layering.
- Excessive modularization.
- Treating all quality attributes as equally important.
- Ignoring operational complexity.
- Ignoring lifecycle cost.
- Ignoring failure scenarios.
- Assuming dependencies are always available.
- Creating hidden coupling.
- Sharing data without clear ownership.
- Making irreversible decisions without sufficient evidence.
- Optimizing prematurely.
- Treating architecture diagrams as architecture itself.
- Documenting decisions without rationale.
- Copying reference architectures without validating context.
- Treating organizational standards as substitutes for architectural reasoning.

---

## Validation Checklist

Before considering an architecture sufficiently sound, verify:

- [ ] Architecture supports defined objectives.
- [ ] Significant requirements are understood.
- [ ] Relevant quality attributes are identified.
- [ ] Important constraints are understood.
- [ ] Architecture complexity is justified.
- [ ] Major responsibilities have clear boundaries.
- [ ] Cohesion is appropriate.
- [ ] Coupling is intentional and manageable.
- [ ] Important dependencies are explicit.
- [ ] Significant architectural decisions are documented.
- [ ] Important alternatives have been considered.
- [ ] Significant trade-offs are understood.
- [ ] Security concerns have been considered.
- [ ] Privacy concerns have been considered where relevant.
- [ ] Failure scenarios have been considered.
- [ ] Resilience expectations are understood.
- [ ] Scalability decisions reflect realistic requirements.
- [ ] Performance decisions reflect measurable needs.
- [ ] Data ownership and boundaries are sufficiently clear.
- [ ] Integration boundaries use clear contracts.
- [ ] Observability requirements have been considered.
- [ ] Operational needs have been considered.
- [ ] Lifecycle cost has been considered.
- [ ] Expected areas of change can evolve reasonably.
- [ ] Significant risks are understood.
- [ ] Architecture documentation addresses meaningful stakeholder concerns.
- [ ] Architecture can be validated against relevant requirements.

---

## References

Architecture principles may align, where applicable, with recognized guidance such as:

- ISO/IEC/IEEE 42010 — Architecture Description
- ISO/IEC 25010 — Systems and Software Quality Models
- ISO/IEC/IEEE 15288 — System Life Cycle Processes
- TOGAF architecture principles and practices
- Software Engineering Institute architecture guidance
- Domain-Driven Design principles
- SOLID design principles
- Twelve-Factor principles where contextually relevant
- Well-Architected frameworks as contextual guidance
- Relevant organizational architecture standards

Frameworks, patterns, and reference architectures should support architectural reasoning rather than replace it.

The appropriate architecture should ultimately be determined by requirements, quality attributes, constraints, risks, evidence, and context.