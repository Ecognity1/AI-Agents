# System Design Skill

## Purpose

This skill defines principles, concepts, decision criteria, and best practices for system design.

System design translates requirements and architectural drivers into coherent structures, boundaries, interactions, responsibilities, and operating characteristics.

The objective is not to create the most sophisticated design.

The objective is to create the simplest design that can reasonably satisfy required outcomes, quality attributes, constraints, risks, and expected change.

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

Good system design should help:

- Define clear system boundaries.
- Decompose complex responsibilities.
- Establish clear ownership.
- Manage dependencies.
- Define interactions between components.
- Manage state appropriately.
- Define data flows.
- Consider failure behavior.
- Support required scalability.
- Support required performance.
- Manage consistency requirements.
- Protect trust boundaries.
- Support observability.
- Enable expected change.
- Minimize unnecessary complexity.
- Make significant design trade-offs explicit.

---

## Definitions

### System

A collection of interacting elements organized to achieve defined objectives.

### Subsystem

A meaningful part of a larger system with defined responsibilities and boundaries.

### Component

A logical or physical element responsible for a coherent set of capabilities.

### Boundary

A defined separation between responsibilities, ownership, trust, lifecycle, data, or execution concerns.

### Interface

A defined contract through which elements interact.

### Dependency

A relationship where one element relies on another.

### State

Information representing the current condition of a system or component.

### Stateless

A characteristic where processing does not depend on locally retained conversational or operational state between independent interactions.

### Data Flow

The movement or transformation of information between elements.

### Control Flow

The sequence through which responsibility or execution moves between elements.

### Failure Domain

A boundary within which a failure can occur and potentially affect other elements.

### Bottleneck

A constrained element that limits overall system capacity or performance.

### Hotspot

A disproportionately utilized resource, partition, dependency, or processing path.

### Backpressure

A mechanism used to control incoming work when downstream processing capacity is insufficient.

---

# Fundamental Principles

## Design From Requirements

System design should begin from:

- Required outcomes
- Functional requirements
- Quality attributes
- Constraints
- Risks
- Expected usage
- Expected change

Do not begin with a preferred technology or architecture pattern unless it is a confirmed constraint.

---

## Simplicity First

Prefer the simplest design that satisfies known requirements.

Every additional:

- Component
- Boundary
- Dependency
- Communication path
- Data copy
- Processing stage

introduces additional complexity.

Complexity should provide identifiable value.

---

## Explicit Responsibilities

Each significant component should have a clear responsibility.

A component should answer:

> What responsibility does this element own?

Avoid components whose responsibilities are unclear or unrelated.

---

## Explicit Boundaries

Important boundaries should be visible.

Boundaries may represent:

- Capability
- Ownership
- Trust
- Data
- Failure
- Deployment
- Lifecycle
- Scaling

Boundaries should exist for meaningful reasons.

Do not create boundaries solely to increase modularity.

---

## High Cohesion

Responsibilities that naturally belong together should generally remain together.

High cohesion improves:

- Understandability
- Maintainability
- Ownership
- Change isolation

---

## Controlled Coupling

Dependencies between components should be intentional.

Prefer dependencies through stable contracts.

Avoid:

- Hidden dependencies
- Circular dependencies
- Unnecessary shared state
- Excessive dependency chains

---

# System Context

Before detailed decomposition, understand the system within its environment.

Identify:

- System boundary
- Relevant actors
- External systems
- External dependencies
- Information entering the system
- Information leaving the system
- Trust boundaries

A context view should answer:

> What is inside the system and what exists outside it?

---

# System Decomposition

Decomposition divides a system into manageable responsibilities.

Possible decomposition dimensions include:

- Business capability
- Domain responsibility
- Data ownership
- Security boundary
- Scaling characteristics
- Lifecycle
- Team ownership
- Operational responsibility

No single decomposition strategy is appropriate for every system.

---

## Decomposition Principles

Good decomposition should:

- Increase cohesion.
- Reduce unnecessary coupling.
- Clarify ownership.
- Isolate meaningful change.
- Support required quality attributes.
- Avoid excessive fragmentation.

---

## Avoid Premature Distribution

Logical separation does not automatically require physical distribution.

A responsibility can be:

```text
Logically Separate
```

without being:

```text
Separately Deployed
```

Distribution should be introduced only when justified by requirements such as:

- Independent scaling
- Independent lifecycle
- Failure isolation
- Organizational ownership
- Security isolation

---

# Component Design

A component should have:

- Clear responsibility
- Defined boundary
- Explicit dependencies
- Defined interfaces
- Clear ownership where relevant

Components should avoid exposing unnecessary internal details.

---

## Component Granularity

Components should not be arbitrarily:

- Large
- Small

Large components may create:

- High internal complexity
- Broad change impact

Excessively small components may create:

- Coordination overhead
- Communication complexity
- Increased operational burden

Choose granularity based on cohesion and meaningful boundaries.

---

# Interface Design

Interfaces define interaction contracts between boundaries.

A good interface should be:

- Clear
- Stable where practical
- Explicit
- Minimal
- Consistent
- Versionable where necessary

Interfaces should expose required capabilities without revealing unnecessary internal implementation details.

---

## Interface Ownership

Every significant interface should have clear ownership.

Ownership should include responsibility for:

- Contract definition
- Compatibility
- Change
- Lifecycle
- Consumer impact

---

## Interface Evolution

Interfaces should evolve deliberately.

Consider:

- Backward compatibility
- Forward compatibility
- Versioning
- Consumer migration
- Deprecation

Avoid breaking consumers unnecessarily.

---

# Interaction Models

System components may interact through different models.

Common models include:

### Request-Response

A participant sends a request and expects a response.

### Asynchronous Messaging

A participant submits work without waiting for immediate completion.

### Event Notification

A participant announces that something has occurred.

### Streaming

Information is continuously or incrementally exchanged.

### Batch Processing

Information is processed in groups according to defined conditions or schedules.

Select the model according to actual interaction requirements.

---

# Synchronous Interaction

Synchronous interaction is appropriate when:

- Immediate response is required.
- The caller cannot proceed without the result.
- The dependency relationship is acceptable.

Benefits include:

- Simplicity
- Immediate feedback
- Straightforward reasoning

Potential consequences include:

- Temporal coupling
- Dependency latency
- Failure propagation

---

## Synchronous Dependency Chains

Avoid unnecessarily long synchronous chains.

For example:

```text
A
↓
B
↓
C
↓
D
↓
E
```

Overall reliability and latency may become dependent on every participant.

Consider whether all interactions truly require synchronous completion.

---

# Asynchronous Interaction

Asynchronous interaction may be appropriate when:

- Immediate completion is unnecessary.
- Work can be deferred.
- Load buffering is useful.
- Producer and consumer lifecycles should be decoupled.
- Temporary consumer unavailability must be tolerated.

Potential benefits include:

- Temporal decoupling
- Load leveling
- Resilience
- Scalability

Potential challenges include:

- Delayed completion
- Duplicate processing
- Ordering
- Error handling
- Observability
- Eventual consistency

---

# State Management

State should be managed deliberately.

Determine:

- What state exists?
- Who owns it?
- Where is authoritative state maintained?
- How long must it exist?
- Who may modify it?
- What consistency is required?
- How is it recovered?

Avoid unclear state ownership.

---

## Stateless Processing

Stateless processing can improve:

- Scalability
- Replaceability
- Recovery
- Load distribution

However, not every responsibility can or should be stateless.

State should be placed where ownership and lifecycle are clear.

---

## Shared State

Shared mutable state can create strong coupling.

Potential consequences include:

- Coordination complexity
- Concurrency problems
- Reduced autonomy
- Scaling bottlenecks

Prefer clear ownership of mutable state where practical.

---

# Data Ownership

Important data should have identifiable ownership.

Ownership answers:

- Who defines the data?
- Who may change it?
- Which source is authoritative?
- Who governs its lifecycle?

Avoid multiple components independently modifying the same authoritative data without explicit coordination rules.

---

# Source of Truth

Where information exists in multiple locations, identify the authoritative source.

Copies may exist for:

- Performance
- Reporting
- Search
- Resilience
- Integration

But authoritative ownership should remain clear.

---

# Data Flow

Data flows should identify:

- Source
- Destination
- Transformation
- Storage
- Ownership
- Trust boundary
- Sensitivity where relevant

Unnecessary data movement should be minimized.

---

# Data Duplication

Data duplication may be justified for:

- Performance
- Availability
- Reporting
- Search
- Isolation
- Integration

Duplication introduces consistency responsibilities.

Ask:

> How will copies remain sufficiently consistent?

---

# Consistency

Consistency requirements should reflect business needs.

Not all information requires immediate consistency.

Possible approaches include:

### Strong Consistency

Participants observe the latest committed state according to defined guarantees.

### Eventual Consistency

Different representations may temporarily differ but converge over time.

---

## Consistency Decision

Ask:

- What happens if information is temporarily stale?
- What business rules require immediate consistency?
- What is the acceptable inconsistency window?
- Can conflicting changes occur?
- How will conflicts be resolved?

Do not choose stronger consistency than required without considering its consequences.

---

# Transactions

Transaction boundaries should align with meaningful consistency requirements.

Avoid unnecessarily broad transactions across unrelated responsibilities.

Distributed transactions can introduce significant complexity.

Where atomic coordination across boundaries is unnecessary, consider alternative consistency mechanisms.

---

# Idempotency

Operations that may be retried should be designed to tolerate repeated execution where practical.

An idempotent operation can be applied multiple times without producing unintended additional effects.

Idempotency is particularly valuable in:

- Retry scenarios
- Asynchronous processing
- Distributed communication

---

# Concurrency

Concurrent access should be considered where multiple participants may read or modify shared state.

Possible concerns include:

- Lost updates
- Duplicate processing
- Race conditions
- Conflicting modifications

Concurrency control should match actual consistency requirements.

---

# Capacity

Capacity represents the amount of workload a system can support under defined conditions.

Capacity planning should consider:

- Request volume
- Transaction volume
- Data volume
- Concurrent activity
- Processing intensity
- Growth
- Peak load
- Resource limits

Avoid designing capacity around unsupported assumptions.

---

# Scalability

Scalability concerns how the system responds to increased or changing demand.

Possible scaling dimensions include:

- Processing
- Storage
- Throughput
- Concurrency
- Geographic distribution
- Number of consumers

---

## Vertical Scaling

Increasing capacity of an existing resource.

Potential benefits:

- Simplicity
- Minimal architectural change

Potential limitations:

- Finite limits
- Cost
- Concentrated failure impact

---

## Horizontal Scaling

Adding additional processing or resource instances.

Potential benefits:

- Greater elasticity
- Increased capacity
- Improved failure tolerance

Potential challenges:

- State management
- Coordination
- Load distribution
- Consistency

---

## Scale Only Where Needed

Different components may have different scaling characteristics.

Avoid scaling an entire system because one responsibility requires additional capacity.

Clear boundaries can support targeted scaling.

---

# Load Distribution

Where multiple processing resources exist, workload should be distributed appropriately.

Consider:

- Fairness
- Capacity
- Availability
- Affinity
- Health
- Locality

Avoid concentrating work unintentionally.

---

# Backpressure

When incoming work exceeds processing capacity, the system should have a defined behavior.

Possible strategies include:

- Buffering
- Throttling
- Rejecting
- Delaying
- Prioritizing
- Shedding non-critical load

Unlimited buffering is rarely sustainable.

---

# Bottleneck Analysis

Identify potential bottlenecks involving:

- Processing
- Storage
- Network
- External dependencies
- Shared resources
- Serialization
- Coordination
- Contention

Optimize bottlenecks based on evidence rather than assumptions.

---

# Performance

Performance should be evaluated against defined expectations.

Relevant characteristics may include:

- Latency
- Throughput
- Processing time
- Concurrency
- Resource utilization

Avoid premature optimization.

Measure before optimizing where practical.

---

# Failure Design

Failure should be treated as an expected condition where dependencies or components can become unavailable.

Ask:

- What can fail?
- How will failure be detected?
- What depends on it?
- Can failure propagate?
- What should happen during failure?
- How will recovery occur?

---

# Failure Domains

Design boundaries should limit unnecessary failure propagation.

A failure in one responsibility should not automatically cause unrelated responsibilities to fail when isolation is practical and valuable.

---

# Timeouts

Interactions with dependencies should not wait indefinitely.

Timeout decisions should consider:

- Expected response characteristics
- User or process expectations
- Downstream behavior
- Recovery strategy

---

# Retry

Retries may help recover from temporary failures.

Retries are appropriate only when the operation is reasonably likely to succeed later.

Consider:

- Retry count
- Delay
- Backoff
- Idempotency
- Failure type

Avoid uncontrolled retries.

---

# Retry Storms

When many participants retry simultaneously, a degraded dependency may receive even more load.

This can amplify failure.

Possible controls include:

- Backoff
- Jitter
- Retry limits
- Load shedding

---

# Circuit Breaking

When a dependency is repeatedly failing, temporarily stopping requests may prevent additional pressure and allow recovery.

Circuit breaking may be useful when repeated calls provide little value during known failure conditions.

---

# Graceful Degradation

When a non-critical capability fails, the system may continue operating with reduced functionality.

Identify:

- Critical capabilities
- Optional capabilities
- Acceptable degraded behavior

Not every failure should result in complete system failure.

---

# Fault Isolation

Fault isolation limits the impact of failures.

Possible boundaries may exist around:

- Components
- Workloads
- Data
- Dependencies
- Resource pools
- Geographic locations

Isolation should be proportional to failure impact.

---

# Recovery

Recovery design should consider:

- Detection
- Restoration
- State recovery
- Data integrity
- Dependency restoration
- Validation

Recovery requirements should align with business expectations.

---

# Availability

Availability requirements should be based on actual needs.

Higher availability generally introduces greater:

- Cost
- Redundancy
- Operational complexity
- Testing requirements

Do not maximize availability without understanding business value.

---

# Resilience

Resilience includes the ability to:

- Resist failure
- Limit impact
- Adapt
- Recover

Resilience should focus on important failure scenarios rather than attempting to protect against every imaginable condition.

---

# Security Boundaries

System design should identify relevant trust boundaries.

Consider:

- Identity
- Authorization
- Data sensitivity
- External interactions
- Privilege
- Isolation
- Exposure

Do not assume internal interactions are automatically trusted.

---

# Least Privilege

Components and participants should receive only the access necessary for their responsibilities.

Avoid unnecessary:

- Permissions
- Data access
- Administrative access
- Cross-boundary privileges

---

# Observability

System design should support understanding of important behavior.

Relevant signals may include:

- Events
- Logs
- Metrics
- Traces
- Health indicators
- Audit information

Observability should help answer:

- What happened?
- Where?
- When?
- Why?
- What was affected?

---

# Health

System health should reflect meaningful ability to perform required responsibilities.

Avoid defining health solely as:

> The process is running.

A running component may still be unable to fulfill its purpose.

---

# Dependency Management

Dependencies should be:

- Necessary
- Explicit
- Owned
- Observable where important
- Replaceable where justified

For significant dependencies, understand:

- Availability
- Performance
- Failure behavior
- Compatibility
- Lifecycle
- Ownership

---

# External Dependencies

External dependencies deserve particular attention because they may be outside direct control.

Consider:

- Availability
- Rate limits
- Contract changes
- Performance
- Security
- Cost
- Support
- Exit strategy

Avoid assuming external dependencies will always behave as expected.

---

# Critical Dependency Analysis

Identify dependencies whose failure could prevent important outcomes.

For critical dependencies consider:

- Alternatives
- Redundancy
- Caching where appropriate
- Graceful degradation
- Recovery
- Contingency

---

# Configuration

Configuration should be separated from fixed implementation details where variability is required.

Configuration should be:

- Controlled
- Validated
- Traceable where important
- Protected when sensitive

Avoid uncontrolled configuration growth.

---

# Time and Ordering

Distributed or concurrent systems may not share perfectly synchronized time or execution order.

Where ordering matters, define:

- What must be ordered?
- Within what boundary?
- What happens when events arrive out of order?

Do not assume global ordering unless it is explicitly provided.

---

# Unique Identification

Where entities or events require unique identification, the identification strategy should consider:

- Scope
- Collision risk
- Distribution
- Ordering requirements
- Privacy implications

Avoid embedding unnecessary business or sensitive meaning into identifiers.

---

# Caching

Caching may improve:

- Performance
- Latency
- Dependency load
- Availability

Caching introduces:

- Staleness
- Invalidation
- Consistency complexity
- Additional state

Before introducing caching, ask:

> Is there an actual performance or dependency problem that caching solves?

---

# Partitioning

Partitioning divides workload or data across boundaries.

Potential reasons include:

- Scale
- Isolation
- Performance
- Ownership

A good partitioning strategy should:

- Distribute load reasonably.
- Avoid hotspots.
- Support required access patterns.
- Allow future growth.

Partitioning should not be introduced without need.

---

# Multi-Region or Multi-Location Design

Geographic distribution may be justified by:

- Availability
- Disaster recovery
- Latency
- Regulatory requirements
- Data residency

It introduces additional concerns such as:

- Replication
- Consistency
- Routing
- Failover
- Cost
- Operational complexity

Geographic distribution should have explicit drivers.

---

# Change and Evolution

Systems should be designed for expected change.

Consider which areas are likely to change:

- Business rules
- Interfaces
- Workload
- Data
- Dependencies
- Policies
- Operational requirements

Protect likely areas of change through appropriate boundaries.

Avoid speculative flexibility for changes with no reasonable evidence.

---

# Compatibility

Changes should consider compatibility with existing consumers and dependencies.

Possible strategies include:

- Backward-compatible changes
- Versioning
- Parallel support
- Migration windows
- Deprecation

Breaking changes should be deliberate.

---

# Design for Operability

System design should consider ongoing operation.

Ask:

- How will failures be detected?
- How will configuration be changed?
- How will capacity be understood?
- How will recovery occur?
- How will dependencies be diagnosed?
- How will significant changes be introduced?

Operational complexity is part of system complexity.

---

# Cost Awareness

System design should consider lifecycle cost.

Potential cost drivers include:

- Compute
- Storage
- Network
- Licensing
- Operations
- Support
- Data movement
- Redundancy
- Complexity
- Specialized skills

Architecture should not optimize cost at the expense of required outcomes.

Likewise, unnecessary over-engineering should be avoided.

---

# Design Documentation

System design documentation should communicate significant structures and decisions.

Useful representations may include:

### Context View

Shows the system and external relationships.

### Component View

Shows major responsibilities and dependencies.

### Interaction View

Shows significant interactions.

### Data Flow View

Shows important information movement.

### Deployment View

Shows relevant execution or placement boundaries.

### Failure View

Shows important failure and recovery relationships.

Only create views that answer meaningful questions.

---

# Mermaid Diagram Guidance

When textual documentation benefits from visual representation, Mermaid diagrams may be used.

Suitable diagram types include:

### Flowchart

For structural relationships and processing flows.

```mermaid
flowchart LR
    A[Source] --> B[Processing]
    B --> C[Destination]
```

### Sequence Diagram

For important interactions.

```mermaid
sequenceDiagram
    participant A
    participant B

    A->>B: Request
    B-->>A: Response
```

### State Diagram

For meaningful lifecycle or state transitions.

```mermaid
stateDiagram-v2
    [*] --> StateA
    StateA --> StateB
    StateB --> [*]
```

Diagrams should:

- Clarify design.
- Use meaningful labels.
- Show relevant boundaries.
- Remain consistent with accompanying text.

Do not create diagrams where text communicates the information more clearly.

---

# Design Validation

System design should be evaluated against relevant scenarios.

Examples include:

- Normal operation
- Peak workload
- Dependency failure
- Partial failure
- Delayed processing
- Duplicate processing
- Concurrent activity
- Recovery
- Scaling
- Change

Scenario-based validation often reveals weaknesses that static diagrams do not.

---

# Decision Guidelines

When making a system design decision, ask:

1. What requirement does this decision support?
2. What quality attribute does it affect?
3. What is the simplest suitable design?
4. What responsibilities exist?
5. Where should boundaries exist?
6. Who owns relevant state?
7. How will components interact?
8. What consistency is required?
9. What happens when dependencies fail?
10. What realistic scale is expected?
11. Where could bottlenecks occur?
12. What security boundaries exist?
13. How will important behavior be observed?
14. What operational burden is introduced?
15. What lifecycle cost is introduced?
16. How difficult is the decision to change later?

Significant decisions should have clear rationale.

---

# Best Practices

- Design from requirements.
- Prefer simplicity.
- Establish clear responsibilities.
- Establish meaningful boundaries.
- Maintain high cohesion.
- Control coupling.
- Keep state ownership clear.
- Keep authoritative data ownership clear.
- Use synchronous communication only when immediate dependency is required.
- Use asynchronous interaction where decoupling provides meaningful value.
- Design retries carefully.
- Design for idempotency where repeated processing is possible.
- Consider concurrency explicitly.
- Identify realistic capacity requirements.
- Scale only where necessary.
- Identify bottlenecks.
- Design for meaningful failure scenarios.
- Limit failure propagation.
- Consider graceful degradation.
- Identify trust boundaries.
- Apply least privilege.
- Make critical dependencies explicit.
- Support observability.
- Consider operability.
- Consider lifecycle cost.
- Design for expected change.
- Document significant trade-offs.

---

# Quality Considerations

Good system design should demonstrate:

### Correctness

The design supports required behavior.

### Simplicity

Unnecessary complexity is avoided.

### Cohesion

Responsibilities are grouped meaningfully.

### Controlled Coupling

Dependencies are intentional.

### Scalability

Expected workload can be supported.

### Performance

Relevant performance expectations can be achieved.

### Reliability

Important responsibilities can tolerate expected failures.

### Resilience

Disruption can be contained and recovered from.

### Security

Trust boundaries and access are appropriately controlled.

### Observability

Important behavior can be understood.

### Operability

The system can be managed throughout its lifecycle.

### Evolvability

Expected change can be accommodated reasonably.

---

# Trade-offs

System design commonly involves trade-offs such as:

| Concern | Trade-off |
|---|---|
| Simplicity | Flexibility |
| Strong Consistency | Availability |
| Synchronous Interaction | Decoupling |
| Centralization | Scalability |
| Distribution | Operational Simplicity |
| Caching | Freshness |
| Replication | Consistency |
| Isolation | Resource Efficiency |
| Redundancy | Cost |
| Performance | Resource Consumption |
| Modularity | Coordination |
| Security | Convenience |
| Flexibility | Understandability |

Trade-offs should be explicit and evaluated against requirements.

---

# Common Mistakes

Avoid:

- Designing around preferred technologies instead of requirements.
- Over-engineering for hypothetical future scale.
- Creating excessive components.
- Distributing responsibilities without justification.
- Creating unclear ownership.
- Sharing mutable state unnecessarily.
- Creating circular dependencies.
- Building long synchronous dependency chains.
- Assuming dependencies never fail.
- Retrying every failure.
- Retrying non-idempotent operations without safeguards.
- Using unlimited buffering.
- Ignoring backpressure.
- Ignoring duplicate processing.
- Assuming global ordering.
- Assuming immediate consistency is always necessary.
- Introducing caching without a demonstrated need.
- Ignoring cache invalidation.
- Scaling the entire system because of one bottleneck.
- Ignoring hotspots.
- Ignoring operational complexity.
- Ignoring external dependency limits.
- Designing geographic distribution without explicit drivers.
- Optimizing performance before understanding bottlenecks.
- Creating diagrams that do not explain meaningful design decisions.

---

# Validation Checklist

Before considering system design sufficiently sound, verify:

- [ ] System boundaries are clear.
- [ ] External actors and dependencies are identified.
- [ ] Significant responsibilities are identified.
- [ ] Responsibilities are appropriately decomposed.
- [ ] Component boundaries have meaningful reasons.
- [ ] Cohesion is appropriate.
- [ ] Coupling is controlled.
- [ ] Circular dependencies are avoided.
- [ ] Interfaces are explicit.
- [ ] Interface ownership is understood.
- [ ] State ownership is clear.
- [ ] Authoritative data sources are identifiable.
- [ ] Important data flows are understood.
- [ ] Consistency requirements are explicit.
- [ ] Transaction boundaries are appropriate.
- [ ] Concurrency concerns have been considered.
- [ ] Idempotency has been considered where relevant.
- [ ] Synchronous dependencies are justified.
- [ ] Asynchronous interactions address delivery and failure behavior.
- [ ] Capacity assumptions are documented.
- [ ] Scaling requirements reflect realistic needs.
- [ ] Potential bottlenecks are understood.
- [ ] Backpressure behavior is considered where relevant.
- [ ] Important failure scenarios are understood.
- [ ] Failure propagation is appropriately limited.
- [ ] Retry behavior is controlled.
- [ ] Recovery expectations are understood.
- [ ] Trust boundaries are identified.
- [ ] Least privilege is considered.
- [ ] Critical dependencies are identified.
- [ ] Observability requirements are considered.
- [ ] Operational requirements are considered.
- [ ] Lifecycle cost is considered.
- [ ] Expected areas of change can evolve reasonably.
- [ ] Significant trade-offs are documented.
- [ ] Diagrams are used where they materially improve understanding.
- [ ] Design has been evaluated against meaningful scenarios.

---

# References

System design practices may align, where applicable, with recognized guidance such as:

- ISO/IEC/IEEE 42010 — Architecture Description
- ISO/IEC/IEEE 15288 — System Life Cycle Processes
- ISO/IEC 25010 — Systems and Software Quality Models
- Software Engineering Institute architecture guidance
- Domain-Driven Design
- Enterprise Integration Patterns
- Distributed systems literature
- Reliability engineering principles
- Resilience engineering principles
- Well-Architected frameworks as contextual guidance
- Relevant organizational architecture standards

References and patterns provide reusable knowledge.

They should support engineering judgment rather than replace it.

The appropriate system design should ultimately be determined by requirements, quality attributes, constraints, risks, expected scale, organizational capability, lifecycle cost, and context.