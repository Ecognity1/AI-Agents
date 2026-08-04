---
name: architecture-patterns
description: Repository guidance for patterns. Use when Codex performs related architecture work.
---

# Architecture Patterns Skill

## Purpose

This skill defines common architecture patterns, their characteristics, decision criteria, benefits, limitations, and trade-offs.

Architecture patterns provide reusable approaches to recurring structural problems.

A pattern should be selected because it fits the requirements, quality attributes, constraints, risks, and expected evolution of a particular context.

No architecture pattern should be treated as the default for every situation.

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

Architecture pattern knowledge should help:

- Recognize recurring structural problems.
- Evaluate alternative architectural approaches.
- Select patterns based on context.
- Understand benefits and consequences.
- Avoid unnecessary architectural complexity.
- Combine compatible patterns where justified.
- Identify inappropriate pattern usage.
- Support consistent architectural reasoning.
- Make architectural trade-offs explicit.

---

## Definitions

### Architecture Pattern

A reusable structural approach to a recurring architectural problem within a particular context.

### Architecture Style

A broad family of architectural structures characterized by common principles and constraints.

### Pattern Context

The conditions under which a pattern may be appropriate.

### Pattern Consequence

The positive or negative effect introduced by applying a pattern.

### Architectural Driver

A requirement, quality attribute, constraint, risk, or objective that significantly influences architecture.

### Architectural Boundary

A defined separation between responsibilities, ownership, data, trust, lifecycle, or deployment concerns.

### Architectural Coupling

The degree to which architectural elements depend on each other.

### Architectural Cohesion

The degree to which responsibilities within an architectural element logically belong together.

---

# Fundamental Principles

## Patterns Are Tools, Not Goals

Architecture patterns should solve identified problems.

Do not introduce a pattern merely because it is:

- Popular
- Modern
- Familiar
- Recommended by a vendor
- Used by another organization
- Common in reference architectures

Pattern selection must be context-driven.

---

## Start With Architectural Drivers

Before evaluating patterns, understand relevant:

- Business objectives
- Functional requirements
- Quality attributes
- Constraints
- Risks
- Scale
- Change expectations
- Operational expectations
- Organizational capabilities

Patterns should follow requirements.

Requirements should not be forced into a preferred pattern.

---

## Prefer the Simplest Suitable Pattern

Use the simplest architecture capable of satisfying known requirements.

Additional architectural complexity should provide identifiable value.

Complex patterns typically introduce additional:

- Operational overhead
- Coordination
- Failure modes
- Testing complexity
- Governance
- Observability requirements
- Cost

Complexity must be justified.

---

## Patterns Can Be Combined

Architecture patterns are not always mutually exclusive.

For example, a structure may combine:

- Modular organization
- Ports and Adapters
- Event-driven interactions
- CQRS for selected responsibilities

Patterns should be combined only when each addresses a genuine concern.

Avoid creating a collection of patterns without coherent architectural reasoning.

---

# Layered Architecture

## Definition

Layered Architecture organizes responsibilities into logical layers.

A conceptual structure may resemble:

```text
Interaction
    ↓
Coordination
    ↓
Domain / Core Logic
    ↓
Technical Capabilities
```

Exact layers vary according to context.

---

## Appropriate When

Layered Architecture may be suitable when:

- Responsibilities can be separated clearly.
- Complexity is moderate.
- A straightforward structural model is desirable.
- Teams benefit from familiar boundaries.
- Independent deployment of responsibilities is not required.

---

## Benefits

- Easy to understand
- Familiar structure
- Clear separation of concerns
- Relatively low operational complexity
- Supports maintainability when boundaries remain disciplined

---

## Trade-offs

Potential disadvantages include:

- Excessive layer dependencies
- Unnecessary pass-through layers
- Reduced flexibility if layering becomes rigid
- Business concepts becoming fragmented across technical layers

---

## Common Mistakes

Avoid:

- Creating layers without meaningful responsibilities.
- Allowing every layer to access every other layer.
- Organizing exclusively by technical concerns when business cohesion matters more.
- Adding layers solely for architectural appearance.

---

# Modular Architecture

## Definition

Modular Architecture organizes responsibilities into cohesive modules with explicit boundaries.

Each module represents a meaningful capability or responsibility.

Conceptually:

```text
System
│
├── Module A
│
├── Module B
│
├── Module C
│
└── Shared Foundations
```

---

## Appropriate When

Useful when:

- Responsibilities can be grouped into meaningful capabilities.
- Independent ownership is valuable.
- Change isolation is important.
- Full distribution would introduce unnecessary complexity.
- Structural boundaries need to be stronger than simple layering.

---

## Benefits

- Strong cohesion
- Controlled coupling
- Clear ownership
- Easier change isolation
- Can support future decomposition
- Lower operational complexity than distributed architectures

---

## Trade-offs

Requires disciplined boundary management.

Poorly designed modules may become:

- Highly coupled
- Circularly dependent
- Shared-data dependent
- Difficult to evolve independently

---

## Common Mistakes

Avoid:

- Creating modules based only on technical layers.
- Allowing unrestricted cross-module access.
- Creating excessive shared modules.
- Treating modules as naming conventions rather than real boundaries.

---

# Monolithic Architecture

## Definition

A monolithic architecture packages a significant set of responsibilities into a single deployment or execution boundary.

A monolith does not necessarily imply poor architecture.

A monolith may still have strong internal modularity.

---

## Appropriate When

Potentially suitable when:

- Operational simplicity is important.
- Scale requirements are manageable.
- Responsibilities do not require independent deployment.
- Organizational size is limited.
- Distributed coordination would provide little value.

---

## Benefits

- Simple deployment model
- Lower operational overhead
- Easier local interactions
- Simpler consistency management
- Easier initial development and troubleshooting

---

## Trade-offs

As scope grows:

- Deployment coordination may increase.
- Independent scaling may become difficult.
- Poor internal boundaries may create high coupling.
- Changes may affect a larger deployment unit.

---

## Key Principle

Distinguish between:

```text
Well-Structured Modular Monolith
```

and:

```text
Unstructured Monolith
```

The deployment boundary alone does not determine architecture quality.

---

# Ports and Adapters Architecture

Also commonly associated with Hexagonal Architecture.

## Definition

Ports and Adapters separates core responsibilities from external mechanisms through explicit abstractions.

Conceptually:

```text
External Mechanism
       ↓
     Adapter
       ↓
      Port
       ↓
   Core Logic
       ↑
      Port
       ↑
     Adapter
       ↑
External Mechanism
```

---

## Appropriate When

Useful when:

- Core behavior should remain independent of external mechanisms.
- Multiple interaction mechanisms may exist.
- External dependencies may change.
- Testability is important.
- Clear boundaries are required.

---

## Benefits

- Strong separation
- Improved testability
- Reduced dependency on external mechanisms
- Easier replacement of adapters
- Protects core responsibilities from infrastructure changes

---

## Trade-offs

May introduce unnecessary abstractions for simple contexts.

Too many ports can increase:

- Indirection
- Cognitive load
- Maintenance effort

---

# Clean Architecture

## Definition

Clean Architecture organizes responsibilities so that important policies and domain concepts remain independent of external implementation details.

A central principle is dependency direction toward more stable core responsibilities.

Conceptually:

```text
External Mechanisms
        ↓
Interface Boundaries
        ↓
Application Policies
        ↓
Core Domain
```

---

## Appropriate When

Useful when:

- Core rules are complex or important.
- Long-term maintainability matters.
- External technologies may change.
- Testability and isolation are important.
- Strong dependency boundaries are valuable.

---

## Benefits

- Framework independence
- Strong separation of concerns
- Improved testability
- Reduced infrastructure coupling
- Supports long-term evolution

---

## Trade-offs

Can introduce unnecessary:

- Interfaces
- Mapping
- Layers
- Indirection

when applied mechanically to simple contexts.

---

# Domain-Oriented Architecture

## Definition

Domain-oriented architecture organizes boundaries around meaningful domain concepts and capabilities rather than primarily around technical concerns.

It may use concepts associated with Domain-Driven Design.

---

## Key Concepts

Potential concepts include:

- Domain
- Subdomain
- Bounded Context
- Entity
- Value Object
- Aggregate
- Domain Service
- Domain Event
- Ubiquitous Language

Not every concept is required in every context.

---

## Appropriate When

Useful when:

- Domain complexity is high.
- Business rules are significant.
- Different areas use different terminology or models.
- Business boundaries are important.
- Long-term evolution is expected.

---

## Benefits

- Aligns architecture with domain concepts
- Improves communication
- Encourages cohesive boundaries
- Supports complex business rules
- Helps separate distinct models

---

## Trade-offs

Requires strong domain understanding.

It can become unnecessarily complex when the underlying domain is simple.

---

# Service-Oriented Architecture

## Definition

Service-Oriented Architecture organizes capabilities as services exposed through defined contracts.

Services typically represent reusable organizational or domain capabilities.

---

## Appropriate When

Useful when:

- Multiple consumers need shared capabilities.
- Integration across organizational boundaries is important.
- Standardized service contracts provide value.
- Existing heterogeneous environments must interact.

---

## Benefits

- Reuse
- Interoperability
- Contract-based integration
- Separation of capabilities

---

## Trade-offs

Potential challenges include:

- Governance complexity
- Service dependency chains
- Contract evolution
- Centralized shared-service bottlenecks
- Integration overhead

---

# Microservices Architecture

## Definition

Microservices Architecture organizes capabilities into independently evolvable services aligned with meaningful boundaries.

Services typically own their:

- Responsibility
- Lifecycle
- Interfaces

and, where appropriate, their data.

---

## Appropriate When

Microservices may be suitable when there is a genuine need for:

- Independent deployment
- Independent scaling
- Strong team ownership
- Failure isolation
- Independent lifecycle evolution
- Different quality requirements across capabilities

---

## Benefits

Potential benefits include:

- Independent evolution
- Independent deployment
- Independent scaling
- Strong ownership boundaries
- Fault isolation
- Technology flexibility where justified

---

## Trade-offs

Microservices introduce distributed-system complexity.

This may include:

- Network failures
- Partial failures
- Distributed data consistency
- Service discovery
- Contract management
- Observability
- Deployment coordination
- Operational complexity
- Increased infrastructure cost
- Security across additional boundaries

---

## Decision Principle

Do not select microservices solely because:

- The initiative is considered "enterprise."
- Scalability is mentioned.
- Cloud deployment is expected.
- Microservices are considered modern.

Independent service boundaries should provide enough value to justify distributed complexity.

---

# Event-Driven Architecture

## Definition

Event-Driven Architecture uses events to communicate significant state changes or occurrences between loosely coupled participants.

Conceptually:

```text
Producer
   ↓
 Event
   ↓
Event Distribution
   ↓
Consumers
```

---

## Appropriate When

Useful when:

- Loose coupling is important.
- Multiple consumers react independently.
- Asynchronous processing is acceptable.
- Business events are meaningful.
- Temporal decoupling provides value.

---

## Benefits

- Loose coupling
- Extensibility
- Independent consumers
- Asynchronous processing
- Supports reactive behavior
- Can improve scalability

---

## Trade-offs

Potential challenges include:

- Eventual consistency
- Duplicate events
- Ordering
- Observability
- Schema evolution
- Error handling
- Replay
- Debugging
- Consumer coordination

---

## Key Principle

Events should describe meaningful occurrences.

Avoid using events merely to disguise tightly coupled command interactions.

---

# Publish-Subscribe Pattern

## Definition

Publish-Subscribe allows publishers to emit information without knowing individual subscribers.

Multiple subscribers may independently react.

---

## Appropriate When

Useful when:

- Multiple consumers need the same information.
- Publishers should remain independent of consumers.
- Consumers may evolve independently.

---

## Trade-offs

Requires careful handling of:

- Delivery guarantees
- Duplicate processing
- Ordering
- Subscription lifecycle
- Failure handling

---

# Message Queue Pattern

## Definition

A queue decouples a producer of work from a consumer.

Conceptually:

```text
Producer
   ↓
 Queue
   ↓
Consumer
```

---

## Appropriate When

Useful when:

- Work can be processed asynchronously.
- Load buffering is valuable.
- Producer and consumer rates differ.
- Temporary consumer unavailability must be tolerated.

---

## Benefits

- Temporal decoupling
- Load leveling
- Failure isolation
- Improved resilience

---

## Trade-offs

Requires consideration of:

- Duplicate delivery
- Poison messages
- Retry
- Ordering
- Backlog growth
- Idempotency

---

# Request-Response Pattern

## Definition

A participant sends a request and waits for a corresponding response.

---

## Appropriate When

Useful when:

- Immediate feedback is required.
- The caller depends on the result before continuing.
- The interaction is naturally synchronous.

---

## Benefits

- Simple interaction model
- Immediate result
- Easy conceptual reasoning

---

## Trade-offs

Creates temporal coupling.

Availability and performance of the dependency directly affect the caller.

Avoid long chains of synchronous dependencies.

---

# CQRS

Command Query Responsibility Segregation.

## Definition

CQRS separates operations that change state from operations that retrieve information.

Conceptually:

```text
Commands
   ↓
Write Model

Queries
   ↓
Read Model
```

The read and write models may be logically or physically separate depending on context.

---

## Appropriate When

Potentially useful when:

- Read and write concerns differ significantly.
- Models have substantially different requirements.
- Domain behavior is complex.
- Independent optimization provides meaningful value.

---

## Benefits

- Independent read/write models
- Clear separation of intent
- Independent optimization
- Can support complex domains

---

## Trade-offs

May introduce:

- Additional models
- Synchronization
- Eventual consistency
- Operational complexity
- More conceptual overhead

---

## Decision Principle

CQRS does not require:

- Separate databases
- Event sourcing
- Microservices

These are separate decisions.

---

# Event Sourcing

## Definition

Event Sourcing stores a sequence of state-changing events as the authoritative history from which current state can be derived.

Conceptually:

```text
Event 1
   ↓
Event 2
   ↓
Event 3
   ↓
Current State
```

---

## Appropriate When

Potentially useful when:

- Complete state history is important.
- Temporal analysis matters.
- Auditability is fundamental.
- State reconstruction provides meaningful value.

---

## Benefits

- Complete history
- Strong audit trail
- Temporal reconstruction
- Supports event-driven models

---

## Trade-offs

Introduces substantial complexity involving:

- Event evolution
- Replay
- Storage growth
- Projection management
- Eventual consistency
- Debugging
- Data correction

---

## Decision Principle

Do not select Event Sourcing merely because events are used.

Event-driven architecture and Event Sourcing are separate concepts.

---

# Serverless Architecture

## Definition

Serverless Architecture delegates significant execution infrastructure management to a platform while focusing on event-triggered or request-triggered capabilities.

The term describes an operational and execution model rather than the absence of servers.

---

## Appropriate When

Potentially useful for:

- Variable workloads
- Event-driven processing
- Intermittent workloads
- Independent functions or capabilities
- Rapid scaling requirements

---

## Benefits

Potential benefits include:

- Reduced infrastructure management
- Elastic execution
- Usage-oriented cost models
- Rapid provisioning

---

## Trade-offs

Potential concerns include:

- Platform dependency
- Execution limits
- Startup latency
- Observability
- Local testing complexity
- Cost at sustained workloads
- State management constraints

---

# Pipe-and-Filter Pattern

## Definition

Processing is divided into independent stages.

Each stage transforms or evaluates information before passing it onward.

Conceptually:

```text
Input
  ↓
Filter A
  ↓
Filter B
  ↓
Filter C
  ↓
Output
```

---

## Appropriate When

Useful when:

- Processing occurs through clear sequential stages.
- Stages can be independently composed.
- Processing responsibilities are naturally separable.

---

## Benefits

- Composability
- Reusability
- Clear processing boundaries
- Independent stage evolution

---

## Trade-offs

May introduce:

- Transformation overhead
- Error propagation complexity
- Difficult state management
- Latency across long pipelines

---

# Broker Pattern

## Definition

A broker mediates communication between participants so they do not require direct knowledge of one another.

---

## Appropriate When

Useful when:

- Participants are distributed.
- Location transparency is valuable.
- Interaction needs mediation.
- Producers and consumers should remain decoupled.

---

## Trade-offs

The broker may become:

- Operationally critical
- A throughput bottleneck
- A concentration point for failures or governance

Appropriate resilience should be considered.

---

# Gateway Pattern

## Definition

A gateway provides a controlled entry point to one or more capabilities.

It may centralize concerns such as:

- Routing
- Policy enforcement
- Authentication
- Traffic management
- Protocol adaptation

---

## Benefits

- Centralized boundary management
- Simplified consumer interaction
- Policy consistency

---

## Trade-offs

A gateway may become:

- A bottleneck
- A critical dependency
- Overloaded with responsibilities

Keep gateway responsibilities focused.

---

# Backend-for-Frontend Pattern

## Definition

A Backend-for-Frontend provides an interaction boundary tailored to the needs of a specific consumer type or experience.

---

## Appropriate When

Useful when different consumers have substantially different:

- Interaction patterns
- Data requirements
- Performance characteristics
- Release cycles

---

## Trade-offs

May introduce:

- Duplicate logic
- Additional maintenance
- Additional operational boundaries

Shared business rules should not be unnecessarily duplicated.

---

# Strangler Pattern

## Definition

The Strangler Pattern supports incremental replacement or modernization by gradually routing responsibilities from an existing capability to a new one.

Conceptually:

```text
Consumers
    ↓
Transition Boundary
   ↙   ↘
Existing  New
Capability Capability
```

---

## Appropriate When

Useful when:

- Full replacement is high risk.
- Incremental migration is preferred.
- Existing capabilities must remain operational during transition.

---

## Benefits

- Incremental change
- Reduced migration risk
- Supports gradual validation
- Allows staged replacement

---

## Trade-offs

During transition, organizations may temporarily operate:

- Multiple implementations
- Additional routing
- Data synchronization
- Increased complexity

Transition architecture should have an intended end state.

---

# Sidecar Pattern

## Definition

A Sidecar places supporting capabilities alongside a primary runtime or processing unit while keeping those concerns logically separate.

---

## Appropriate When

Useful for shared operational capabilities that should remain separate from core responsibilities.

---

## Trade-offs

Sidecars can increase:

- Resource usage
- Deployment complexity
- Operational dependencies

Use only where separation provides clear value.

---

# Space-Based Architecture

## Definition

Space-Based Architecture distributes processing and state to reduce centralized bottlenecks under very high or unpredictable workloads.

---

## Appropriate When

Potentially useful when:

- Extreme scalability is required.
- Centralized persistence becomes a limiting factor.
- High throughput and elasticity dominate architectural decisions.

---

## Trade-offs

This pattern introduces significant complexity involving:

- Distributed state
- Consistency
- Coordination
- Operational management

It should not be used without strong architectural drivers.

---

# Peer-to-Peer Architecture

## Definition

Participants interact as peers rather than relying exclusively on centralized coordination.

---

## Appropriate When

Useful when:

- Decentralization is important.
- Participants have similar responsibilities.
- Centralized dependency should be reduced.

---

## Trade-offs

Challenges may include:

- Coordination
- Discovery
- Consistency
- Security
- Governance

---

# Hybrid Architecture

## Definition

Hybrid Architecture combines multiple architectural patterns or styles where different parts have genuinely different requirements.

For example:

```text
Modular Core
+
Event-Driven Integration
+
Selected Independent Services
```

---

## Principle

Hybrid architecture should emerge from differing requirements.

It should not become an excuse for inconsistent architecture.

Each pattern should have a clear purpose.

---

# Pattern Selection Criteria

Architecture pattern selection should consider:

### Domain Complexity

How complex are the rules and relationships?

### Scale

What realistic workload and growth requirements exist?

### Independent Evolution

Do responsibilities need independent change or release cycles?

### Team Structure

How are ownership and responsibilities organized?

### Availability

What availability expectations exist?

### Consistency

How important is immediate consistency?

### Performance

What latency and throughput expectations exist?

### Integration

How many boundaries and external interactions exist?

### Security

What trust boundaries and isolation requirements exist?

### Operational Capability

Can the organization operate the selected pattern effectively?

### Cost

Does the value justify lifecycle cost?

### Change

Which areas are expected to evolve independently?

---

# Pattern Comparison

A high-level comparison may help initial reasoning.

| Pattern | Complexity | Independence | Operational Overhead | Typical Strength |
|---|---|---|---|---|
| Layered | Low | Low | Low | Simplicity |
| Modular | Low–Medium | Medium | Low | Maintainable boundaries |
| Monolithic | Low | Low | Low | Operational simplicity |
| Ports & Adapters | Medium | Medium | Low | Dependency isolation |
| Clean Architecture | Medium | Medium | Low | Core independence |
| Domain-Oriented | Medium | Medium | Medium | Complex domain modeling |
| Service-Oriented | Medium–High | High | Medium–High | Shared capabilities |
| Microservices | High | High | High | Independent evolution |
| Event-Driven | Medium–High | High | Medium–High | Loose coupling |
| CQRS | Medium–High | Medium–High | Medium | Read/write specialization |
| Event Sourcing | High | Medium–High | High | Historical state |
| Serverless | Medium | High | Platform-dependent | Elastic execution |

These classifications are relative and contextual.

They should not replace detailed analysis.

---

# Decision Guidelines

When evaluating an architecture pattern, ask:

1. What problem does the pattern solve?
2. Do we actually have that problem?
3. Which architectural drivers justify it?
4. What simpler alternatives exist?
5. What complexity does it introduce?
6. What operational capability does it require?
7. What failure modes does it introduce?
8. What dependencies does it create?
9. What quality attributes does it improve?
10. What quality attributes may it weaken?
11. What is its lifecycle cost?
12. Can the organization support it?
13. How difficult would it be to change later?
14. Can the pattern be applied selectively rather than globally?

If the benefits cannot clearly justify the consequences, prefer a simpler approach.

---

# Pattern Combination Guidelines

When combining patterns:

- Assign each pattern a clear purpose.
- Avoid overlapping responsibilities.
- Keep boundaries explicit.
- Understand interactions between patterns.
- Evaluate combined operational complexity.
- Ensure terminology remains consistent.

Do not combine patterns simply to appear architecturally sophisticated.

---

## Best Practices

- Start with architectural drivers.
- Prefer simplicity.
- Select patterns based on problems rather than trends.
- Evaluate alternatives.
- Document significant pattern decisions.
- Consider operational consequences.
- Consider organizational capabilities.
- Apply complex patterns selectively.
- Keep boundaries explicit.
- Preserve domain cohesion.
- Minimize unnecessary distributed interactions.
- Consider failure behavior.
- Consider data ownership.
- Consider lifecycle cost.
- Validate pattern assumptions.
- Reevaluate patterns when requirements materially change.

---

## Quality Considerations

Pattern selection should support relevant qualities such as:

### Maintainability

Can responsibilities evolve without widespread impact?

### Scalability

Can relevant bottlenecks be addressed appropriately?

### Reliability

Can failures be isolated and recovered?

### Security

Are trust boundaries understandable and manageable?

### Testability

Can responsibilities be validated independently?

### Operability

Can the architecture be monitored, supported, and changed effectively?

### Evolvability

Can expected change occur without excessive cost?

### Cost Effectiveness

Does the value justify complexity and lifecycle cost?

---

## Trade-offs

Architecture patterns commonly involve trade-offs such as:

| Benefit | Potential Cost |
|---|---|
| Independent deployment | Operational complexity |
| Loose coupling | Eventual consistency |
| Strong abstraction | Additional indirection |
| Modularity | Boundary coordination |
| Reuse | Shared coupling |
| Scalability | Infrastructure complexity |
| Flexibility | Cognitive complexity |
| Distribution | Network failure modes |
| Centralization | Bottlenecks |
| Decentralization | Governance complexity |
| Historical traceability | Storage and processing complexity |

There is no pattern without consequences.

---

## Common Mistakes

Avoid:

- Selecting architecture before understanding requirements.
- Treating microservices as the default enterprise architecture.
- Treating monoliths as inherently poor architecture.
- Using Event-Driven Architecture where synchronous interaction is simpler.
- Using CQRS for basic read/write separation without justification.
- Assuming CQRS requires Event Sourcing.
- Assuming events require Event Sourcing.
- Creating excessive services.
- Creating excessive layers.
- Creating excessive abstractions.
- Sharing data across boundaries without ownership rules.
- Ignoring distributed failure modes.
- Ignoring operational complexity.
- Ignoring organizational capabilities.
- Selecting patterns because of technology trends.
- Copying architecture from unrelated contexts.
- Combining patterns without clear reasons.
- Designing for hypothetical future scale.
- Treating architecture pattern names as substitutes for actual design.

---

## Validation Checklist

Before selecting or approving an architecture pattern, verify:

- [ ] Relevant architectural drivers are understood.
- [ ] The problem being addressed is clearly defined.
- [ ] The selected pattern directly addresses that problem.
- [ ] Simpler alternatives have been considered.
- [ ] Benefits are understood.
- [ ] Trade-offs are understood.
- [ ] Added complexity is justified.
- [ ] Relevant quality attributes are supported.
- [ ] Important boundaries are clear.
- [ ] Coupling implications are understood.
- [ ] Data ownership implications are understood where relevant.
- [ ] Failure modes are understood.
- [ ] Consistency implications are understood where relevant.
- [ ] Security implications are understood.
- [ ] Operational requirements are understood.
- [ ] Organizational capabilities are sufficient.
- [ ] Lifecycle cost has been considered.
- [ ] Pattern combinations have clear purposes.
- [ ] Significant decisions have documented rationale.
- [ ] The architecture is not designed for unsupported hypothetical requirements.
- [ ] The pattern can evolve if requirements change.

---

## References

Architecture pattern knowledge may draw, where applicable, from recognized sources such as:

- ISO/IEC/IEEE 42010 — Architecture Description
- Software Engineering Institute architecture guidance
- Pattern-Oriented Software Architecture
- Domain-Driven Design
- Enterprise Integration Patterns
- Clean Architecture
- Hexagonal Architecture / Ports and Adapters
- Microservices architecture literature
- Event-Driven Architecture literature
- CQRS and Event Sourcing literature
- Cloud architecture guidance
- Relevant organizational architecture standards

Patterns are reusable architectural knowledge.

They should support architectural reasoning rather than replace it.

The appropriate pattern should ultimately be determined by architectural drivers, requirements, quality attributes, constraints, risks, organizational capability, lifecycle cost, and context.

