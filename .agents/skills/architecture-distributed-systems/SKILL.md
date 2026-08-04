---
name: architecture-distributed-systems
description: Repository guidance for distributed systems. Use when Codex performs related architecture work.
---

# Distributed Systems Skill

## Purpose

This skill defines principles, concepts, decision criteria, and best practices for reasoning about distributed systems.

A distributed system consists of independently executing elements that communicate across boundaries where communication, timing, availability, and state cannot be assumed to be perfectly reliable or synchronized.

Distribution can provide benefits such as:

- Independent scaling
- Fault isolation
- Geographic distribution
- Independent ownership
- Independent evolution

It also introduces significant complexity.

The objective is not to distribute systems by default.

The objective is to understand the consequences of distribution and apply distributed-system techniques only where requirements justify them.

This skill is:

- Domain-neutral
- Technology-neutral
- Vendor-neutral
- Platform-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge rather than as a project workflow or implementation guide.

---

# Objectives

Distributed-system design should help:

- Understand network uncertainty.
- Design for partial failure.
- Establish clear state ownership.
- Select appropriate consistency models.
- Handle duplicate communication safely.
- Understand ordering limitations.
- Manage concurrency.
- Support fault isolation.
- Design appropriate retry behavior.
- Understand replication trade-offs.
- Understand partitioning strategies.
- Avoid unnecessary distributed coordination.
- Manage distributed transactions carefully.
- Support resilience and recovery.
- Maintain observability across boundaries.
- Avoid unnecessary distribution.

---

# Definitions

## Distributed System

A collection of independently executing elements that coordinate through communication across boundaries.

## Node

An independently executing participant within a distributed system.

## Partial Failure

A condition where some parts of a distributed system fail while others continue operating.

## Network Partition

A communication failure that prevents some nodes from communicating with others.

## Replication

Maintaining multiple copies of information or capability across different locations or nodes.

## Partitioning

Dividing information or workload across multiple independent partitions.

## Consistency

The guarantees governing how participants observe and modify shared or replicated state.

## Consensus

A mechanism through which distributed participants agree on a value, state, or decision.

## Quorum

The minimum number or proportion of participants required for a distributed decision.

## Idempotency

The property that repeating an operation does not create unintended additional effects.

## Eventual Consistency

A consistency model in which different copies may temporarily differ but are expected to converge.

## Strong Consistency

A consistency model providing stronger guarantees about the visibility and ordering of state changes.

## Split Brain

A condition where multiple participants independently believe they have authority over the same responsibility.

## Distributed Transaction

A coordinated operation involving state changes across multiple independent boundaries.

---

# Fundamental Principles

## Distribution Is a Trade-off

Distribution can provide:

- Scalability
- Isolation
- Geographic reach
- Independent evolution
- Independent ownership

But it introduces:

- Network failure
- Partial failure
- Coordination complexity
- Data consistency challenges
- Operational complexity
- Security boundaries
- Observability challenges
- Increased cost

Do not distribute responsibilities without a meaningful architectural driver.

---

## The Network Is Not Perfect

Distributed-system design should assume that communication can:

- Fail
- Time out
- Be delayed
- Be duplicated
- Arrive out of order
- Become temporarily unavailable

Do not design distributed interactions as though they were local function calls.

---

## Partial Failure Is Normal

In a non-distributed structure, a failure may affect the entire execution boundary.

In distributed systems:

```text
Component A → Healthy

Component B → Healthy

Component C → Unavailable

Network A ↔ B → Healthy

Network B ↔ C → Failing
```

Different participants can have different views of system health.

Design must account for this uncertainty.

---

# Fallacies of Distributed Computing

Avoid assumptions such as:

- The network is reliable.
- Latency is zero.
- Bandwidth is unlimited.
- The network is secure.
- Topology does not change.
- There is one administrator.
- Transport cost is zero.
- The network is homogeneous.

These assumptions frequently lead to fragile distributed designs.

---

# Communication

Distributed communication should explicitly consider:

- Latency
- Timeout
- Retry
- Failure
- Duplication
- Ordering
- Authentication
- Authorization
- Compatibility

Every remote interaction introduces uncertainty.

---

# Synchronous Communication

Synchronous interaction creates a runtime dependency between participants.

Conceptually:

```text
A
│
│ Request
▼
B
│
│ Response
▼
A
```

It may be appropriate when an immediate result is genuinely required.

Potential consequences include:

- Temporal coupling
- Latency propagation
- Failure propagation
- Reduced availability

Avoid unnecessary chains of synchronous dependencies.

---

# Asynchronous Communication

Asynchronous communication separates the timing of producers and consumers.

Conceptually:

```text
Producer
   │
   ▼
Message / Event
   │
   ▼
Consumer
```

Potential benefits include:

- Temporal decoupling
- Load buffering
- Failure isolation
- Independent processing

Potential challenges include:

- Duplicate processing
- Delayed completion
- Ordering
- Error handling
- Eventual consistency
- Observability

---

# Timeouts

Remote calls should not wait indefinitely.

Timeout design should consider:

- Expected response time
- Workload
- User or process expectations
- Dependency characteristics
- Recovery strategy

A timeout means:

> The result was not received within the expected period.

It does not necessarily mean:

> The remote operation did not occur.

This distinction is important.

---

# Retry

Retries may help recover from transient failures.

Retry behavior should consider:

- Failure type
- Retry limit
- Delay
- Backoff
- Jitter
- Idempotency
- Overall timeout budget

Do not retry every failure.

Some failures are:

- Permanent
- Validation-related
- Authorization-related
- Capacity-related

and retries may provide no benefit.

---

# Exponential Backoff

Repeated retries should generally become less frequent.

Conceptually:

```text
Attempt 1

Wait

Attempt 2

Wait Longer

Attempt 3

Wait Longer
```

This reduces pressure on degraded dependencies.

---

# Jitter

If many participants retry at exactly the same intervals, they may create synchronized load spikes.

Jitter introduces variation into retry timing.

This helps reduce coordinated retry storms.

---

# Retry Storms

A degraded dependency may become overwhelmed when many callers retry simultaneously.

Conceptually:

```text
Dependency slows
      ↓
Requests timeout
      ↓
Clients retry
      ↓
Traffic increases
      ↓
Dependency degrades further
```

Retries must therefore be bounded and controlled.

---

# Idempotency

Distributed systems frequently repeat operations because of:

- Retries
- Duplicate messages
- Recovery
- Replay

Where repeated execution is possible, operations should be idempotent where practical.

For example:

```text
Same Operation
     ↓
Executed Multiple Times
     ↓
Same Intended Outcome
```

Idempotency reduces the consequences of uncertain delivery.

---

# Delivery Semantics

Communication mechanisms may provide different delivery guarantees.

## At-Most-Once

An operation or message is delivered zero or one time.

Possible consequence:

- Work may be lost.

## At-Least-Once

Delivery may occur multiple times until successful processing is confirmed.

Possible consequence:

- Duplicate processing must be handled.

## Effectively-Once Processing

The overall design produces the intended business effect once even when underlying communication may be repeated.

This commonly requires:

- Idempotency
- Deduplication
- Transactional boundaries
- State tracking

Avoid assuming perfect exactly-once behavior across arbitrary distributed boundaries.

---

# Duplicate Processing

Duplicates should be expected where at-least-once delivery or retries exist.

Possible strategies include:

- Idempotent operations
- Unique operation identifiers
- Deduplication records
- State-based validation

The appropriate approach depends on the consequence of duplication.

---

# Message Ordering

Messages may not always arrive in the order they were produced.

For example:

```text
Produced:

Event 1
Event 2
Event 3

Received:

Event 1
Event 3
Event 2
```

If ordering matters, explicitly define:

- What must be ordered?
- Within what scope?
- For how long?
- What happens when ordering is violated?

Avoid requiring global ordering unless absolutely necessary.

---

# Time

Distributed participants may have different clocks.

Clock differences can affect:

- Ordering
- Expiration
- Coordination
- Auditing
- Conflict resolution

Do not rely solely on wall-clock timestamps to establish global causal ordering.

---

# Logical Ordering

When causal ordering matters, designs may use:

- Sequence numbers
- Version numbers
- Logical clocks
- Domain-specific ordering identifiers

Use only where ordering requirements justify the complexity.

---

# State Ownership

Distributed state should have clear ownership.

For important information, determine:

- Who owns authoritative state?
- Who may modify it?
- Which copies are derived?
- How are copies synchronized?
- What happens during conflicts?

Avoid uncontrolled shared ownership.

---

# Replication

Replication maintains multiple copies of information or processing capability.

Potential reasons include:

- Availability
- Read scalability
- Geographic proximity
- Recovery
- Fault tolerance

Replication introduces consistency challenges.

---

# Replication Models

Common conceptual approaches include:

### Leader-Based Replication

One participant coordinates authoritative changes.

```text
        Leader
       /      \
Follower      Follower
```

### Multi-Leader Replication

Multiple participants accept changes and synchronize.

This increases availability but introduces conflict-management complexity.

### Leaderless Replication

Multiple participants may independently accept operations according to a coordination model.

This can improve availability but requires careful consistency reasoning.

No replication model is universally superior.

---

# Replication Lag

Replicated copies may not update immediately.

This can cause:

```text
Write
 ↓
Authoritative Copy Updated
 ↓
Replica Still Old
 ↓
Temporary Stale Read
```

Design should determine whether temporary staleness is acceptable.

---

# Consistency Models

Consistency determines what participants are allowed to observe.

Different responsibilities may require different consistency guarantees.

Avoid selecting the strongest consistency model automatically.

Stronger guarantees often increase:

- Coordination
- Latency
- Availability constraints
- Complexity

---

# Strong Consistency

Strong consistency provides stricter guarantees about the visibility of state changes.

It may be appropriate where temporary inconsistency could cause unacceptable outcomes.

Potential consequences include increased coordination.

---

# Eventual Consistency

Eventual consistency allows temporary differences between representations.

Conceptually:

```text
State A = New Value

State B = Old Value

        ↓

Synchronization

        ↓

State A = New Value
State B = New Value
```

It may be appropriate when temporary inconsistency is acceptable.

---

# Consistency Decision

Ask:

1. What happens if information is temporarily stale?
2. Can conflicting changes occur?
3. What is the acceptable inconsistency window?
4. Does the decision require immediate coordination?
5. How will conflicts be detected?
6. How will conflicts be resolved?

Consistency should reflect business requirements.

---

# CAP Principle

During a network partition, a distributed system cannot simultaneously guarantee both:

- Complete consistency
- Complete availability

for the affected operation.

The practical question is not:

> Is the system CP or AP?

Instead ask:

> During a specific partition, what behavior is acceptable for this specific responsibility?

Different parts of the same system may make different choices.

---

# Partitioning

Partitioning divides information or workload across independent boundaries.

Potential reasons include:

- Scale
- Isolation
- Performance
- Ownership

Conceptually:

```text
Data
 │
 ├── Partition A
 ├── Partition B
 └── Partition C
```

---

# Partition Key

A partition key determines where information or workload belongs.

A good partitioning strategy should:

- Distribute workload reasonably.
- Avoid hotspots.
- Support common access patterns.
- Support expected growth.
- Avoid excessive cross-partition coordination.

Poor partitioning can limit scalability.

---

# Hot Partitions

A partition becomes hot when disproportionate activity is directed to it.

Potential consequences include:

- Increased latency
- Resource exhaustion
- Uneven scaling
- Reduced throughput

Partition design should consider expected access distribution.

---

# Repartitioning

Growth may require partition boundaries to change.

Consider:

- Data movement
- Availability
- Routing
- Compatibility
- Operational impact

Partitioning strategies should not assume workload remains permanently unchanged.

---

# Consensus

Consensus allows distributed participants to agree on a shared decision despite failures.

Consensus may be needed for responsibilities such as:

- Leadership
- Membership
- Configuration
- Coordination
- Distributed state decisions

Consensus is expensive compared with local decision-making.

Avoid distributed consensus when clear ownership can solve the problem more simply.

---

# Quorum

Quorum-based systems require a sufficient number of participants to agree before an operation succeeds.

Quorum design involves trade-offs among:

- Availability
- Consistency
- Failure tolerance
- Latency

The appropriate quorum depends on required guarantees.

---

# Leader Election

Some distributed designs elect a participant to coordinate specific responsibilities.

Leader election must consider:

- Failure detection
- Election timing
- Leadership transfer
- Network partitions
- Split-brain prevention

Leadership should be scoped only to responsibilities that require it.

---

# Split Brain

Split brain occurs when multiple participants independently believe they have authority over the same responsibility.

Conceptually:

```text
Network Partition

Leader A          Leader B
"I am leader"     "I am leader"
```

This can create conflicting state.

Systems requiring exclusive authority should have mechanisms to prevent or resolve this condition.

---

# Distributed Transactions

Transactions spanning independent boundaries introduce substantial coordination complexity.

Traditional atomic transactions attempt to ensure all participants either:

- Commit

or:

- Roll back

Distributed coordination can reduce:

- Availability
- Performance
- Independence

Use distributed atomic transactions only when requirements genuinely demand them.

---

# Local Transactions

Prefer local transaction boundaries where possible.

Conceptually:

```text
Boundary A
   ↓
Local Transaction
   ↓
Publish Outcome
   ↓
Boundary B reacts independently
```

This often improves autonomy but may introduce eventual consistency.

---

# Saga Pattern

A Saga coordinates a sequence of local operations across multiple boundaries.

Conceptually:

```text
Operation A
    ↓
Operation B
    ↓
Operation C
```

If a later operation fails, compensating actions may be required.

```text
Operation C Fails
      ↓
Compensate B
      ↓
Compensate A
```

---

# Saga Coordination

Two broad approaches exist.

## Orchestration

A coordinator determines the sequence.

```text
Coordinator
 ├── A
 ├── B
 └── C
```

Potential benefit:

- Explicit flow.

Potential cost:

- Coordinator coupling.

## Choreography

Participants react to events.

```text
A → Event → B → Event → C
```

Potential benefit:

- Reduced central coordination.

Potential cost:

- Harder global reasoning and observability.

Neither approach is universally better.

---

# Compensation

Compensation attempts to logically reverse or offset a completed operation.

Compensation is not always equivalent to database rollback.

For some real-world actions, perfect reversal may be impossible.

Compensation rules should therefore reflect domain semantics.

---

# Distributed Locks

Distributed locks coordinate exclusive access across participants.

They can introduce:

- Availability dependencies
- Timeout complexity
- Deadlocks
- Performance bottlenecks
- Failure-recovery challenges

Prefer ownership, partitioning, optimistic coordination, or idempotency where these can avoid global locking.

---

# Optimistic Concurrency

Optimistic concurrency assumes conflicts are relatively uncommon.

Changes include a version or condition that is validated before completion.

Conceptually:

```text
Read Version 5

Modify

Write only if Version = 5
```

If another participant has changed the state, the operation can be rejected or retried.

---

# Pessimistic Coordination

Pessimistic approaches prevent conflicting activity before it occurs.

They may be appropriate when conflict consequences are high.

However, they can reduce:

- Concurrency
- Availability
- Scalability

Choose based on actual conflict characteristics.

---

# Conflict Resolution

When multiple participants can modify related state, conflicts may occur.

Possible strategies include:

- Reject conflicting updates
- Last accepted update
- Version-based resolution
- Domain-specific merge
- Manual resolution

Conflict resolution should reflect domain semantics.

Do not use arbitrary conflict rules for important data.

---

# Backpressure

Distributed systems should have defined behavior when producers generate work faster than consumers can process it.

Possible strategies include:

- Buffering
- Throttling
- Rejecting
- Delaying
- Prioritizing
- Load shedding

Unlimited queues simply move the failure from processing capacity to storage, latency, or recovery.

---

# Load Shedding

When capacity is exhausted, intentionally rejecting lower-value work may protect critical responsibilities.

Load shedding should be deliberate.

Identify:

- Critical workload
- Non-critical workload
- Acceptable degradation

---

# Bulkhead Isolation

Bulkhead isolation separates resources so that failure or overload in one area does not consume all available capacity.

Conceptually:

```text
Workload A → Resource Pool A

Workload B → Resource Pool B

Workload C → Resource Pool C
```

This can improve fault isolation at the cost of reduced resource sharing.

---

# Circuit Breaker

Circuit breaking temporarily stops calls to a dependency that is repeatedly failing.

Conceptually:

```text
Closed
  ↓ failures exceed threshold
Open
  ↓ recovery period
Half-Open
  ↓ successful validation
Closed
```

Circuit breakers should be used where repeated failed requests would worsen conditions or provide little value.

---

# Failure Detection

In distributed systems, distinguishing between:

```text
Failed
```

and:

```text
Slow or unreachable
```

may be difficult.

Failure detectors therefore operate using assumptions such as timeouts and heartbeats.

These signals indicate suspicion, not absolute certainty.

---

# Heartbeats

Participants may periodically signal that they are available.

Missing heartbeats may indicate:

- Failure
- Network delay
- Overload
- Partition

Do not treat every missed heartbeat as definitive proof of failure.

---

# Fault Tolerance

Fault tolerance is the ability to continue satisfying required outcomes despite certain failures.

Possible techniques include:

- Replication
- Redundancy
- Failover
- Retry
- Isolation
- Graceful degradation

Fault tolerance should be proportional to business requirements.

---

# Failover

Failover transfers responsibility from an unavailable participant to another participant.

Failover design should consider:

- Failure detection
- State availability
- Routing
- Recovery
- Split-brain prevention
- Return to normal operation

Failover mechanisms themselves must be tested.

---

# Graceful Degradation

Distributed systems may continue operating with reduced capability when dependencies are unavailable.

For example:

```text
Core Capability → Available

Optional Capability → Unavailable

Overall Service → Degraded but usable
```

Critical and optional responsibilities should be distinguishable where appropriate.

---

# Geographic Distribution

Geographic distribution may support:

- Lower latency
- Disaster recovery
- Availability
- Data residency
- Regional isolation

It introduces:

- Replication delay
- Network latency
- Consistency challenges
- Routing complexity
- Increased operational cost

Use geographic distribution only where requirements justify it.

---

# Data Locality

Processing information near where it is stored or consumed may reduce:

- Latency
- Network traffic
- Data movement cost

However, locality may conflict with:

- Centralized governance
- Consistency
- Operational simplicity

---

# Observability

Distributed systems require end-to-end visibility.

Observability should help connect activity across boundaries.

Relevant signals may include:

- Logs
- Metrics
- Traces
- Events
- Health indicators
- Correlation identifiers

---

# Correlation

A logical operation may cross many boundaries.

Conceptually:

```text
Request
   ↓
Component A
   ↓
Component B
   ↓
Message
   ↓
Component C
```

Correlation information helps identify that these activities belong to the same logical flow.

---

# Distributed Tracing

Distributed tracing can help understand:

- Dependency latency
- Failure location
- Processing sequence
- Cross-boundary behavior

Tracing should focus on useful operational information rather than uncontrolled data collection.

---

# Security

Every distributed boundary increases potential exposure.

Consider:

- Identity
- Authentication
- Authorization
- Trust
- Encryption
- Integrity
- Replay
- Data exposure

Do not assume communication is trusted merely because participants belong to the same broader system.

---

# Zero-Trust Principle

Trust should not be granted solely because of:

- Network location
- Deployment location
- Organizational ownership

Important interactions should verify appropriate identity and authorization according to risk.

---

# Schema and Contract Evolution

Distributed participants may evolve independently.

Contracts should therefore consider:

- Compatibility
- Versioning
- Optional fields
- Deprecation
- Consumer migration

Avoid changes requiring every participant to update simultaneously unless necessary.

---

# Backward Compatibility

Where possible, producers and consumers should tolerate compatible evolution.

This reduces deployment coordination.

Breaking changes should have explicit migration strategies.

---

# Availability Mathematics

A chain of runtime dependencies can reduce overall availability.

Conceptually:

```text
A depends on B depends on C
```

If every dependency is required for success, the overall outcome depends on all participants being available.

Avoid unnecessary critical dependency chains.

---

# Cascading Failure

A failure can propagate through dependent components.

Conceptually:

```text
Dependency Failure
       ↓
Caller Timeout
       ↓
Thread / Resource Exhaustion
       ↓
Caller Failure
       ↓
Upstream Failure
```

Controls may include:

- Timeouts
- Circuit breakers
- Bulkheads
- Load shedding
- Backpressure

---

# Recovery

Distributed recovery should consider:

- State reconciliation
- Duplicate processing
- Missed events
- Replay
- Ordering
- Reconnection
- Resynchronization

Recovery is not complete merely because individual processes restart.

---

# Reconciliation

When state diverges, reconciliation restores acceptable consistency.

Possible techniques include:

- Replay
- Comparison
- Repair
- Reprocessing
- Domain-specific correction

Critical reconciliation procedures should be understood before failures occur.

---

# Disaster Recovery

Where required, distributed design should consider:

- Failure scope
- Recovery objectives
- Data recovery
- Geographic dependency
- Restoration order
- Validation

Disaster recovery should reflect business requirements rather than arbitrary maximum resilience.

---

# Distributed-System Testing

Testing should include relevant failure scenarios.

Examples include:

- Delayed communication
- Lost communication
- Duplicate messages
- Out-of-order messages
- Dependency unavailability
- Partial network failure
- Retry behavior
- Failover
- Recovery
- State reconciliation

Happy-path testing alone is insufficient for critical distributed behavior.

---

# Decision Guidelines

Before introducing distribution, ask:

1. What requirement requires distribution?
2. Could a simpler local boundary satisfy the requirement?
3. Is independent scaling required?
4. Is independent deployment required?
5. Is failure isolation required?
6. Is geographic distribution required?
7. Is independent ownership required?
8. What network failures become possible?
9. What consistency model is required?
10. Who owns authoritative state?
11. Can operations be retried safely?
12. What happens with duplicate processing?
13. Does ordering matter?
14. What happens during a network partition?
15. How will failures be observed?
16. How will state be reconciled?
17. What operational capability is required?
18. Does the value justify the added complexity?

If these questions cannot be answered, distribution may be premature.

---

# Best Practices

- Avoid distribution without clear architectural drivers.
- Assume network communication can fail.
- Design explicitly for partial failure.
- Use timeouts for remote dependencies.
- Bound retries.
- Use backoff and jitter where appropriate.
- Design for idempotency where operations may repeat.
- Expect duplicate delivery where relevant.
- Define ordering requirements explicitly.
- Keep authoritative state ownership clear.
- Choose consistency according to business requirements.
- Minimize distributed coordination.
- Prefer local transactions where possible.
- Use compensation when cross-boundary atomicity is unnecessary.
- Partition according to realistic access patterns.
- Avoid hot partitions.
- Limit failure propagation.
- Use backpressure where capacity can be exceeded.
- Consider graceful degradation.
- Maintain end-to-end observability.
- Design recovery and reconciliation explicitly.
- Test failure scenarios.
- Document important distributed trade-offs.

---

# Quality Considerations

Good distributed-system design should demonstrate:

## Correctness

Distributed behavior preserves required outcomes despite expected communication uncertainty.

## Resilience

Important failures are contained and recoverable.

## Consistency

State guarantees match actual requirements.

## Scalability

Distribution supports realistic growth requirements.

## Availability

Required outcomes remain available according to defined expectations.

## Observability

Cross-boundary behavior can be understood.

## Recoverability

State and processing can return to an acceptable condition after disruption.

## Security

Distributed trust boundaries are appropriately protected.

## Operability

The organization can operate the distributed structure effectively.

## Simplicity

Distribution is limited to areas where its value justifies its complexity.

---

# Trade-offs

Distributed systems commonly involve trade-offs such as:

| Concern | Trade-off |
|---|---|
| Strong Consistency | Availability / Latency |
| Replication | Consistency Complexity |
| Partitioning | Cross-Partition Coordination |
| Distribution | Operational Simplicity |
| Independent Deployment | Integration Complexity |
| Retry | Duplicate Processing |
| Buffering | Processing Delay |
| Redundancy | Cost |
| Isolation | Resource Efficiency |
| Geographic Distribution | Replication Complexity |
| Central Coordination | Bottleneck Risk |
| Decentralization | Conflict Management |
| Synchronous Interaction | Temporal Coupling |
| Asynchronous Interaction | Eventual Consistency |

There is no distributed design without trade-offs.

---

# Common Mistakes

Avoid:

- Distributing systems because distribution is considered modern.
- Treating remote calls like local calls.
- Assuming the network is reliable.
- Assuming timeouts mean an operation did not happen.
- Retrying indefinitely.
- Retrying non-idempotent operations without protection.
- Assuming messages are delivered exactly once.
- Ignoring duplicate messages.
- Assuming messages arrive in order.
- Depending on globally synchronized clocks.
- Using strong consistency without a requirement.
- Using eventual consistency without understanding consequences.
- Sharing authoritative state across independent owners.
- Creating distributed transactions unnecessarily.
- Using distributed locks as the default coordination mechanism.
- Ignoring split-brain scenarios.
- Choosing poor partition keys.
- Ignoring hot partitions.
- Using unlimited queues.
- Ignoring backpressure.
- Allowing cascading failures.
- Creating long synchronous dependency chains.
- Assuming replication automatically guarantees resilience.
- Ignoring recovery and reconciliation.
- Ignoring contract evolution.
- Creating geographic distribution without explicit requirements.
- Testing only successful scenarios.
- Ignoring operational complexity.

---

# Validation Checklist

Before considering a distributed design sufficiently sound, verify:

- [ ] Distribution has explicit architectural drivers.
- [ ] Simpler alternatives have been considered.
- [ ] Distributed boundaries have meaningful responsibilities.
- [ ] Authoritative state ownership is clear.
- [ ] Remote interactions have defined timeout behavior.
- [ ] Retry behavior is bounded.
- [ ] Backoff and jitter are considered where appropriate.
- [ ] Idempotency is addressed where repeated execution is possible.
- [ ] Duplicate processing is handled where relevant.
- [ ] Delivery semantics are understood.
- [ ] Ordering requirements are explicit.
- [ ] Time assumptions are understood.
- [ ] Consistency requirements reflect business needs.
- [ ] Network partition behavior is understood.
- [ ] Replication strategy is appropriate where replication exists.
- [ ] Replication lag consequences are understood.
- [ ] Partitioning strategy supports realistic access patterns.
- [ ] Hotspot risks are considered.
- [ ] Distributed coordination is minimized.
- [ ] Transaction boundaries are appropriate.
- [ ] Compensation is considered where relevant.
- [ ] Conflict resolution is defined where concurrent changes are possible.
- [ ] Split-brain risk is considered where exclusive authority exists.
- [ ] Backpressure behavior is defined where relevant.
- [ ] Cascading failure is appropriately limited.
- [ ] Critical dependencies are understood.
- [ ] Graceful degradation is considered where appropriate.
- [ ] Cross-boundary security is considered.
- [ ] Contract evolution is considered.
- [ ] End-to-end observability is supported.
- [ ] Recovery behavior is understood.
- [ ] State reconciliation is considered.
- [ ] Relevant failure scenarios can be tested.
- [ ] Operational complexity is justified by expected value.

---

# References

Distributed-system principles may draw, where applicable, from recognized knowledge such as:

- Distributed systems research and literature
- Designing Data-Intensive Applications
- Enterprise Integration Patterns
- CAP theorem
- Consensus algorithm research
- Fault-tolerant computing principles
- Reliability engineering principles
- Resilience engineering principles
- Domain-Driven Design
- ISO/IEC/IEEE 42010 — Architecture Description
- ISO/IEC 25010 — Systems and Software Quality Models
- Relevant organizational architecture and reliability standards

Distributed-system techniques should support engineering judgment rather than replace it.

Distribution should be introduced only when its benefits justify the additional coordination, failure, consistency, security, operational, and lifecycle complexity.

