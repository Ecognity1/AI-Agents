---
name: business-prioritization
description: Repository guidance for prioritization. Use when Codex performs related business analysis work.
---

# Prioritization Techniques Skill

## Purpose

This skill defines principles, decision criteria, techniques, and best practices for prioritizing competing needs, requirements, capabilities, initiatives, risks, opportunities, and work items.

Prioritization helps determine relative importance when available:

- Time
- Capacity
- Funding
- Resources
- Attention

are constrained.

This skill is:

- Domain-neutral
- Technology-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge rather than as a project workflow.

---

## Objectives

Effective prioritization should help:

- Focus effort on the highest-value outcomes.
- Make trade-offs explicit.
- Support transparent decision-making.
- Consider urgency and business impact.
- Account for dependencies.
- Consider risk and uncertainty.
- Avoid treating everything as equally important.
- Support sequencing decisions.
- Provide understandable rationale for priorities.
- Enable priorities to change when circumstances change.

---

## Definitions

### Priority

The relative importance or precedence assigned to an item compared with other items.

### Business Value

The expected contribution of an item toward desired organizational outcomes.

Value may include:

- Revenue
- Cost reduction
- Risk reduction
- Compliance
- Customer value
- Operational efficiency
- Strategic alignment
- Quality improvement

### Urgency

The degree to which delaying an item reduces its value or increases negative consequences.

### Effort

The estimated amount of work or resources required.

### Cost of Delay

The expected loss or impact caused by delaying an outcome.

### Dependency

A relationship where one item relies on another item, condition, decision, or capability.

### Risk

Uncertainty that could affect expected outcomes.

### Confidence

The level of certainty associated with an estimate, assumption, value assessment, or expected outcome.

---

## Fundamental Principles

### Prioritization Is Relative

Priority has meaning only when items are compared.

If every item is classified as highest priority, meaningful prioritization has not occurred.

---

### Prioritize Outcomes, Not Opinions

Priority should be based on relevant factors such as:

- Value
- Risk
- Urgency
- Strategic alignment
- Compliance
- Dependencies
- Effort
- Impact

Avoid prioritizing solely because a particular stakeholder requests it.

---

### Priority Requires Context

There is no universally correct priority.

Priority depends on:

- Objectives
- Constraints
- Timing
- Risk
- Dependencies
- Available resources
- Organizational strategy

An item may legitimately change priority as circumstances change.

---

### Priority Is Not Permanent

Priorities should be revisited when significant changes occur.

Examples include:

- New information
- Changed business objectives
- New risks
- Regulatory changes
- Dependency changes
- Cost changes
- Resource changes
- Market changes

---

### Avoid False Precision

Prioritization techniques support decisions.

They do not mathematically prove which item is most important.

A score such as:

```text
82.7
```

should not automatically be considered meaningfully more precise than:

```text
81.9
```

when the underlying inputs are subjective estimates.

---

## Prioritization Factors

Relevant factors may include:

### Business Value

How much meaningful value could the item provide?

### Strategic Alignment

How strongly does the item support defined objectives?

### Urgency

What happens if the item is delayed?

### Risk Reduction

Does the item reduce meaningful uncertainty or exposure?

### Compliance

Is the item required by:

- Law
- Regulation
- Contract
- Policy
- Governance

### Impact

How significant is the expected effect?

### Reach

How broadly could the outcome affect relevant stakeholders or processes?

### Effort

How much work or resource is expected?

### Cost

What financial commitment is required?

### Dependencies

Does another important outcome depend on this item?

### Confidence

How reliable are the assumptions supporting the prioritization?

Not every factor needs to be used in every prioritization exercise.

---

# MoSCoW Prioritization

## Definition

MoSCoW groups items into four priority categories.

| Category | Meaning |
|---|---|
| Must Have | Essential for the agreed outcome |
| Should Have | Important but not essential for initial success |
| Could Have | Valuable if resources permit |
| Won't Have Now | Explicitly deferred |

---

## When Appropriate

MoSCoW is useful when:

- A clear scope boundary is required.
- Stakeholders need an easy-to-understand classification.
- Time or capacity is constrained.
- A release or delivery boundary must be established.

---

## Benefits

- Simple
- Easy to communicate
- Easy to apply
- Encourages explicit deferral

---

## Limitations

MoSCoW can become ineffective when too many items are classified as Must Have.

A "Must Have" should represent something whose absence would materially prevent the agreed outcome.

---

# Value vs. Effort

## Definition

Items are compared using expected value and expected effort.

Typical categories include:

| Value | Effort | Interpretation |
|---|---|---|
| High | Low | Strong candidate for early priority |
| High | High | Valuable but requires planning |
| Low | Low | Opportunistic |
| Low | High | Usually lower priority |

---

## When Appropriate

Useful for:

- Early-stage comparison
- Opportunity assessment
- Backlog discussions
- Resource allocation

---

## Benefits

- Simple
- Visual
- Encourages consideration of cost

---

## Limitations

Value and effort may be subjective.

The technique should not replace deeper analysis for high-impact decisions.

---

# Weighted Scoring

## Definition

Weighted scoring evaluates alternatives against multiple criteria.

Example:

| Criterion | Weight |
|---|---:|
| Business Value | 30% |
| Strategic Alignment | 25% |
| Risk Reduction | 20% |
| Urgency | 15% |
| Effort | 10% |

Each item is scored against the criteria.

The weighted scores support comparison.

---

## When Appropriate

Useful when:

- Multiple factors matter.
- Several alternatives must be compared.
- Decision transparency is important.
- Stakeholders need explicit evaluation criteria.

---

## Benefits

- Structured
- Transparent
- Customizable
- Supports multi-factor decisions

---

## Limitations

Weights and scores may still be subjective.

Avoid excessive precision.

Criteria should not overlap significantly.

---

# RICE

## Definition

RICE considers:

- Reach
- Impact
- Confidence
- Effort

A common conceptual formula is:

```text
Priority = (Reach × Impact × Confidence) / Effort
```

---

## Reach

How many relevant people, transactions, processes, or outcomes may be affected?

## Impact

How significant is the expected effect?

## Confidence

How reliable are the assumptions?

## Effort

How much work is expected?

---

## When Appropriate

Useful when comparing multiple opportunities where reach and impact can be reasonably estimated.

---

## Benefits

- Includes confidence.
- Considers effort.
- Helps compare opportunities.

---

## Limitations

RICE depends heavily on estimate quality.

It may not be appropriate when:

- Reach cannot reasonably be estimated.
- Compliance dominates the decision.
- Dependencies dominate sequencing.
- Risk is the primary concern.

---

# WSJF

## Definition

Weighted Shortest Job First prioritizes work by comparing Cost of Delay against relative effort.

Conceptually:

```text
WSJF = Cost of Delay / Relative Effort
```

Cost of Delay may consider:

- Business Value
- Time Criticality
- Risk Reduction
- Opportunity Enablement

---

## When Appropriate

Useful where:

- Many competing items exist.
- Sequencing matters.
- Delay has measurable consequences.
- Relative effort can be estimated.

---

## Benefits

- Explicitly considers delay.
- Encourages economic prioritization.
- Balances value against size.

---

## Limitations

Results depend on reasonable relative estimates.

It should not be treated as mathematically exact.

---

# Cost of Delay

## Definition

Cost of Delay evaluates the impact of postponing an outcome.

Delay may cause:

- Lost revenue
- Increased cost
- Increased risk
- Missed opportunities
- Regulatory exposure
- Customer dissatisfaction
- Operational inefficiency

---

## When Appropriate

Use when timing materially affects value.

---

## Key Question

Ask:

> What is the consequence of delivering this later rather than sooner?

This can reveal priorities that simple value scoring may miss.

---

# Risk-Based Prioritization

## Definition

Risk-based prioritization gives greater attention to items that:

- Reduce significant risk.
- Address high-impact uncertainty.
- Prevent serious negative outcomes.
- Resolve critical vulnerabilities or dependencies.

---

## When Appropriate

Useful where:

- Consequence of failure is high.
- Uncertainty is significant.
- Safety, security, compliance, or operational continuity matters.

---

## Risk Considerations

Evaluate:

- Likelihood
- Impact
- Exposure
- Detectability where relevant
- Mitigation effectiveness

High risk does not automatically mean highest priority.

The decision should consider overall context.

---

# Dependency-Aware Prioritization

## Definition

Dependency-aware prioritization considers relationships between items when determining sequence.

An item with moderate standalone value may require higher priority if it enables several high-value outcomes.

---

## Dependency Types

Dependencies may involve:

- Capabilities
- Decisions
- Data
- External parties
- Policies
- Resources
- Preconditions
- Other requirements

---

## Best Practice

Distinguish between:

**Business Priority**

How important is the outcome?

and:

**Delivery Sequence**

When must it occur because of dependencies?

These are not always the same.

---

# Compliance-Driven Prioritization

Some items may be mandatory because of:

- Legal obligations
- Regulations
- Contracts
- Policies
- Audit findings
- Governance requirements

Mandatory does not mean that prioritization analysis is unnecessary.

Consider:

- Deadline
- Consequence of non-compliance
- Scope
- Dependency
- Required evidence

---

# Opportunity-Based Prioritization

Some priorities are driven by temporary opportunities.

Examples may include:

- Market timing
- Partnership availability
- Funding windows
- Strategic opportunities

Evaluate both:

- Potential value
- Cost of missing the opportunity

---

# Pairwise Comparison

## Definition

Pairwise comparison evaluates two items at a time.

For each pair, determine which is more important relative to the objective.

---

## When Appropriate

Useful when:

- The number of alternatives is relatively small.
- Stakeholders struggle with absolute scoring.
- Relative preference is easier to determine.

---

## Limitations

Pairwise comparison becomes difficult as the number of items grows.

---

# Ranking

## Definition

Ranking places items in explicit order.

Example:

```text
1
2
3
4
5
```

---

## Benefits

Ranking forces relative decisions.

It prevents every item from receiving the same priority.

---

## Limitations

Ranking does not explain why one item is more important than another.

Important rankings should therefore include rationale.

---

# Decision Guidelines

Select the prioritization technique according to the decision context.

| Situation | Suitable Technique |
|---|---|
| Simple scope classification | MoSCoW |
| Value compared with effort | Value vs. Effort |
| Multiple decision criteria | Weighted Scoring |
| Reach and impact comparison | RICE |
| Economic sequencing | WSJF |
| Timing-sensitive decisions | Cost of Delay |
| High uncertainty or exposure | Risk-Based |
| Strong sequencing constraints | Dependency-Aware |
| Mandatory obligations | Compliance-Driven |
| Small number of alternatives | Pairwise Comparison |

Multiple techniques may be combined when appropriate.

Avoid combining methods unnecessarily.

---

## Prioritization Under Uncertainty

When information is incomplete:

- Identify uncertainty.
- Avoid inventing estimates.
- Use ranges where appropriate.
- Record assumptions.
- Consider confidence.
- Revisit priority when better information becomes available.

An uncertain high-value estimate should not automatically outrank a well-understood moderate-value outcome.

---

## Stakeholder Considerations

Stakeholder input is important but should not be confused with decision authority.

Prioritization should distinguish between:

- Input
- Preference
- Recommendation
- Approval
- Decision authority

When stakeholders disagree, evaluate priorities against agreed objectives and decision criteria.

---

## Prioritization and Business Objectives

Every high-priority item should ideally have a clear relationship to one or more business objectives.

If an item cannot be connected to:

- Business value
- Risk
- Compliance
- Dependency
- Strategic need

its priority should be challenged.

---

## Best Practices

- Define prioritization criteria before scoring.
- Use the simplest technique suitable for the decision.
- Make significant assumptions visible.
- Separate business priority from delivery sequence.
- Consider dependencies explicitly.
- Consider the cost of delay.
- Include risk where relevant.
- Consider confidence in uncertain estimates.
- Document rationale for significant priorities.
- Revisit priorities when circumstances change.
- Avoid unnecessary scoring complexity.
- Keep criteria understandable to decision-makers.

---

## Quality Considerations

Good prioritization should provide:

### Transparency

Stakeholders understand why priorities were assigned.

### Consistency

Comparable items are evaluated using comparable criteria.

### Traceability

High-priority decisions can be related to relevant objectives or constraints.

### Adaptability

Priorities can change when new information becomes available.

### Proportionality

The complexity of prioritization matches the importance of the decision.

### Evidence

Important priority decisions use available evidence rather than unsupported opinion.

---

## Trade-offs

Prioritization commonly requires balancing:

- Value vs. effort
- Urgency vs. importance
- Risk reduction vs. opportunity creation
- Short-term outcomes vs. long-term value
- Mandatory work vs. discretionary work
- Individual stakeholder value vs. organizational value
- Certainty vs. potential upside
- Immediate delivery vs. enabling dependencies

Trade-offs should be explicit.

---

## Common Mistakes

Avoid:

- Marking everything as highest priority.
- Prioritizing solely by stakeholder seniority.
- Treating estimates as facts.
- Using complex formulas for simple decisions.
- Ignoring dependencies.
- Ignoring cost of delay.
- Ignoring risk.
- Ignoring mandatory obligations.
- Confusing priority with delivery sequence.
- Inventing numerical estimates.
- Using arbitrary weights.
- Double-counting similar criteria.
- Treating calculated scores as objectively correct.
- Failing to revisit priorities.
- Prioritizing items without understanding their value.

---

## Validation Checklist

Before considering prioritization sufficiently reliable, verify:

- [ ] The decision objective is understood.
- [ ] Relevant alternatives have been identified.
- [ ] Appropriate prioritization criteria are defined.
- [ ] The selected technique matches the decision context.
- [ ] Business value has been considered.
- [ ] Urgency has been considered where relevant.
- [ ] Risk has been considered where relevant.
- [ ] Dependencies have been considered.
- [ ] Effort or cost has been considered where appropriate.
- [ ] Compliance obligations are identified where relevant.
- [ ] Assumptions are visible.
- [ ] Confidence is considered where uncertainty is significant.
- [ ] Business priority is distinguished from delivery sequence.
- [ ] High-priority items have clear rationale.
- [ ] False numerical precision has been avoided.
- [ ] Decision authority is understood.
- [ ] Priorities can be reassessed when conditions change.

---

## References

Prioritization practices may draw, where appropriate, from recognized guidance such as:

- IIBA Business Analysis Body of Knowledge (BABOK)
- PMI prioritization and portfolio management guidance
- Lean product management practices
- Agile product management practices
- Cost of Delay principles
- Weighted Shortest Job First (WSJF)
- RICE prioritization framework
- Relevant organizational portfolio and governance standards

Prioritization frameworks are decision-support tools.

They should support professional judgment rather than replace it.

