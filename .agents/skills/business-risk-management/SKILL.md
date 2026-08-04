---
name: business-risk-management
description: Repository guidance for risk management. Use when Codex performs related business analysis work.
---

# Risk Management Skill

## Purpose

This skill defines principles, concepts, decision criteria, and best practices for identifying, assessing, treating, monitoring, communicating, and governing risk.

Risk management supports informed decision-making under uncertainty.

The objective is not to eliminate all risk.

The objective is to understand uncertainty, evaluate its potential effect on objectives, and make deliberate decisions about appropriate responses.

This skill is:

- Domain-neutral
- Technology-neutral
- Solution-neutral
- Industry-neutral

It should be used as organizational knowledge rather than as a project workflow.

---

## Objectives

Effective risk management should help:

- Identify uncertainty that may affect objectives.
- Understand potential consequences.
- Assess likelihood and impact consistently.
- Prioritize significant risks.
- Select appropriate responses.
- Assign clear ownership.
- Understand residual risk.
- Support informed risk acceptance.
- Identify emerging risks.
- Maintain visibility of significant exposure.
- Support evidence-based decisions.
- Avoid unnecessary risk management overhead.

---

## Definitions

### Risk

The effect of uncertainty on objectives.

Risk may represent:

- Threat
- Opportunity
- Uncertainty
- Potential loss
- Potential benefit

depending on context.

### Threat

An uncertain event or condition that may negatively affect objectives.

### Opportunity

An uncertain event or condition that may positively affect objectives.

### Risk Event

A possible event that could affect objectives if it occurs.

### Likelihood

The estimated possibility that a risk event will occur.

### Impact

The magnitude of consequences if a risk occurs.

### Risk Exposure

The relative significance of a risk based on factors such as likelihood and impact.

### Inherent Risk

The level of risk before controls or treatments are considered.

### Residual Risk

The risk remaining after controls or treatments have been applied.

### Risk Appetite

The amount and type of risk an organization is willing to pursue or retain in support of its objectives.

### Risk Tolerance

The acceptable variation around a particular objective or risk boundary.

### Risk Owner

The person or role accountable for understanding and managing a particular risk.

### Risk Treatment

An action intended to modify risk.

### Control

A measure that modifies likelihood, impact, exposure, or detectability of risk.

### Contingency

A predefined response intended for use if a risk event occurs.

### Trigger

An observable condition indicating that a risk is increasing, changing, or has occurred.

---

## Fundamental Principles

### Risk Management Supports Decisions

Risk analysis should improve decision quality.

It should not exist only to populate registers, reports, or governance artifacts.

Risk information should help answer:

- What could happen?
- Why could it happen?
- What would the impact be?
- How likely is it?
- What can be done?
- Who owns the decision?
- What risk remains?

---

### Risk Is Uncertainty

A confirmed problem is not the same as a risk.

Risk:

> A critical dependency may become unavailable.

Issue:

> The critical dependency is unavailable.

Risks concern uncertainty.

Issues concern conditions that already exist.

Both may require management, but they should not be confused.

---

### Risk Must Relate to Objectives

A risk should describe uncertainty that could affect an objective, outcome, obligation, or important condition.

Avoid recording vague concerns without meaningful consequence.

---

### Risk Management Should Be Proportional

The level of analysis should reflect:

- Potential impact
- Complexity
- Uncertainty
- Governance requirements
- Cost of failure
- Decision significance

Low-impact risks should not require the same level of analysis as critical risks.

---

### Risk Cannot Always Be Eliminated

Some risk is unavoidable.

Attempting to eliminate every risk may:

- Increase cost
- Reduce flexibility
- Delay outcomes
- Eliminate opportunities
- Introduce new risks

Risk treatment should be economically and operationally reasonable.

---

## Risk Identification

Risk identification should consider uncertainty that could affect desired outcomes.

Potential sources include:

- Assumptions
- Dependencies
- Decisions
- External conditions
- Organizational changes
- Resources
- Processes
- Suppliers
- Regulations
- Financial conditions
- Operational conditions
- Human factors
- Strategic changes
- Environmental factors

The relevant categories depend on context.

---

## Risk Categories

Categories can help identify risks systematically.

Possible categories include:

### Strategic Risk

Uncertainty affecting strategic objectives.

### Operational Risk

Uncertainty affecting ongoing activities or capabilities.

### Financial Risk

Uncertainty affecting cost, funding, revenue, or financial exposure.

### Compliance Risk

Uncertainty relating to laws, regulations, policies, standards, or contractual obligations.

### Security Risk

Uncertainty involving confidentiality, integrity, availability, misuse, or unauthorized access.

### Privacy Risk

Uncertainty involving inappropriate collection, processing, retention, disclosure, or use of information.

### Delivery Risk

Uncertainty affecting expected outcomes, timing, resources, or commitments.

### Dependency Risk

Uncertainty resulting from reliance on another capability, decision, organization, resource, or condition.

### Supplier Risk

Uncertainty associated with external providers or third parties.

### Reputational Risk

Uncertainty that could affect trust, confidence, or reputation.

Categories are aids to identification.

They should not restrict consideration of risks that cross multiple categories.

---

## Risk Statements

Risk statements should be clear and causal.

A useful structure is:

> Because of **cause**, there is a possibility that **event** may occur, resulting in **impact**.

For example:

> Because a critical external dependency has uncertain availability, there is a possibility that required activities may be delayed, resulting in missed commitments.

A good risk statement identifies:

- Cause
- Uncertain event
- Potential consequence

Avoid vague statements such as:

> Resource risk.

or:

> Performance might be bad.

---

## Causes, Events, and Consequences

These concepts should be distinguished.

### Cause

Why the risk may arise.

### Event

What uncertain event may occur.

### Consequence

What happens if the event occurs.

Understanding this relationship helps identify effective treatments.

Treating the cause may reduce likelihood.

Treating the consequence may reduce impact.

---

## Risk Assessment

Risk assessment should evaluate the significance of identified risks.

Common factors include:

- Likelihood
- Impact
- Exposure
- Urgency
- Proximity
- Detectability
- Duration
- Velocity

Not every factor is required in every context.

Use only those that improve decision quality.

---

## Likelihood

Likelihood represents the estimated possibility of occurrence.

Possible qualitative scales include:

| Rating | Meaning |
|---|---|
| Very Low | Unlikely under expected conditions |
| Low | Possible but not expected |
| Medium | Reasonably possible |
| High | Likely |
| Very High | Expected or highly likely |

Definitions should be consistent within the same assessment.

Where reliable quantitative evidence exists, probabilities may be used.

Do not invent precise probabilities without evidence.

---

## Impact

Impact represents the potential consequence if the risk occurs.

Possible qualitative scales include:

| Rating | Meaning |
|---|---|
| Very Low | Minimal effect |
| Low | Limited effect |
| Medium | Meaningful effect requiring attention |
| High | Significant effect on objectives |
| Very High | Severe or critical effect |

Impact may need to be considered across multiple dimensions.

Examples include:

- Financial
- Operational
- Strategic
- Regulatory
- Security
- Privacy
- Reputation
- Schedule
- Quality

---

## Risk Exposure

A simple qualitative approach may combine likelihood and impact.

Conceptually:

```text
Risk Exposure = Likelihood × Impact
```

This is a decision-support mechanism rather than a precise mathematical measurement.

Two risks with the same calculated score may require different responses because their consequences differ.

---

## Risk Matrix

A risk matrix may support consistent classification.

Example:

| Likelihood \ Impact | Low | Medium | High |
|---|---:|---:|---:|
| High | Medium | High | Critical |
| Medium | Low | Medium | High |
| Low | Low | Low | Medium |

The organization should define its own thresholds where formal governance requires them.

Do not assume generic thresholds represent organizational risk appetite.

---

## Qualitative Assessment

Qualitative assessment uses descriptive classifications.

Advantages:

- Simple
- Fast
- Easy to communicate

Limitations:

- Subjective
- Sensitive to inconsistent definitions
- Can hide meaningful differences

Use clearly defined scales.

---

## Quantitative Assessment

Quantitative assessment may use:

- Probabilities
- Financial exposure
- Expected value
- Statistical models
- Scenario analysis
- Sensitivity analysis

Use quantitative approaches when reliable data exists and the decision warrants the additional effort.

Avoid false precision.

---

## Risk Prioritization

Risks should be prioritized according to significance.

Consider:

- Exposure
- Potential severity
- Urgency
- Proximity
- Risk appetite
- Regulatory implications
- Dependency impact
- Treatment feasibility

High likelihood does not automatically mean highest priority.

A low-likelihood catastrophic risk may require greater attention than a frequent low-impact risk.

---

## Risk Response Strategies

Common response strategies include:

### Avoid

Change the approach so that the risk no longer exists or is materially removed.

Use when the exposure is unacceptable and avoidance is feasible.

---

### Mitigate

Reduce likelihood, impact, or both.

Mitigation may involve:

- Controls
- Process changes
- Additional validation
- Redundancy
- Monitoring
- Alternative approaches

---

### Transfer or Share

Shift or distribute some financial or operational consequences to another party.

Examples may include:

- Contracts
- Insurance
- Shared responsibility arrangements

Transfer does not necessarily eliminate accountability.

---

### Accept

Consciously retain the risk.

Acceptance may be appropriate when:

- Exposure is within tolerance.
- Treatment cost exceeds expected benefit.
- No practical treatment exists.
- The risk is necessary to pursue an opportunity.

Acceptance should be deliberate rather than accidental.

---

### Exploit

For positive risks or opportunities, take action to increase the likelihood or value of the opportunity.

---

### Enhance

Increase the probability or impact of a beneficial outcome.

---

## Risk Treatment

Risk treatment should address meaningful causes or consequences.

For significant treatments, consider:

- Intended effect
- Owner
- Dependencies
- Cost
- Timeline
- Expected residual risk

Avoid treatments that are vague or impossible to verify.

Instead of:

> Monitor closely.

Prefer defining:

- What will be monitored
- What condition matters
- Who is responsible
- What action follows

---

## Preventive Controls

Preventive controls aim to reduce the likelihood of an undesirable event.

Examples include:

- Policies
- Approvals
- Separation of duties
- Validation
- Training
- Preventive safeguards

---

## Detective Controls

Detective controls help identify when an event has occurred or conditions are deteriorating.

Examples include:

- Monitoring
- Auditing
- Reviews
- Alerts
- Reconciliation

---

## Corrective Controls

Corrective controls reduce consequences or restore expected conditions after an event occurs.

Examples include:

- Recovery procedures
- Remediation
- Restoration
- Corrective actions

A balanced control environment may require multiple control types.

---

## Contingency Planning

Contingency plans define actions to take if a risk occurs.

A useful contingency should identify:

- Trigger
- Response
- Owner
- Required resources
- Decision authority

Contingency planning is particularly important when prevention cannot fully eliminate exposure.

---

## Risk Triggers

Triggers provide early indicators that risk conditions are changing.

A trigger should be:

- Observable
- Relevant
- Actionable where possible

Examples include:

- Missed dependency milestone
- Threshold exceeded
- Approval delayed
- External condition changed

Triggers help convert passive risk monitoring into active management.

---

## Inherent and Residual Risk

Risk should be understood before and after treatment.

```text
Inherent Risk
      ↓
Controls / Treatment
      ↓
Residual Risk
```

Residual risk should be evaluated rather than assumed to be acceptable.

---

## Risk Acceptance

Significant residual risk should be accepted by an appropriate authority.

Acceptance should consider:

- Risk appetite
- Risk tolerance
- Potential impact
- Existing controls
- Treatment alternatives
- Cost of additional treatment

Risk should not be considered accepted merely because no action was taken.

---

## Risk Ownership

Every significant risk should have clear accountability.

The risk owner should have sufficient:

- Authority
- Context
- Responsibility

to oversee the risk.

The person implementing a mitigation does not necessarily have to be the risk owner.

---

## Risk Escalation

Risks should be escalated when they exceed appropriate decision authority or tolerance.

Possible escalation conditions include:

- Exposure exceeds tolerance.
- Impact crosses organizational boundaries.
- Required treatment exceeds available authority.
- Regulatory consequences are significant.
- Treatment is failing.
- Residual risk remains unacceptable.

Escalation should support decisions rather than simply increase visibility.

---

## Risk Dependencies

Risks may be related.

One risk may:

- Cause another risk.
- Increase another risk.
- Depend on another risk.
- Share a common cause.
- Share a common control.

Important relationships should be understood to avoid treating risks independently when they are actually connected.

---

## Aggregated Risk

Several individually moderate risks may collectively create significant exposure.

Consider:

- Common causes
- Concentrated dependencies
- Correlated events
- Shared resources
- Cascading effects

Risk assessment should consider both individual and aggregate exposure where relevant.

---

## Emerging Risks

Some risks become visible only as circumstances change.

Risk identification should therefore not be treated as a one-time activity.

Potential signals include:

- Changed assumptions
- New dependencies
- External events
- Organizational changes
- Regulatory changes
- New information
- Changed objectives

---

## Risk and Opportunity

Risk management should not focus exclusively on negative outcomes.

Uncertainty may also create opportunities.

Examples include:

- Faster outcomes
- Cost reduction
- New capabilities
- Strategic advantage
- Improved efficiency

Positive uncertainty should be evaluated deliberately where relevant.

---

## Decision Guidelines

When deciding how much risk analysis is necessary, consider:

1. What objective could be affected?
2. What is the potential consequence?
3. How uncertain is the situation?
4. Is the exposure within known tolerance?
5. Is treatment available?
6. What would treatment cost?
7. What risk would remain?
8. Who has authority to accept that residual risk?

Greater consequence and uncertainty generally justify deeper analysis.

---

## Best Practices

- Connect risks to objectives.
- Separate risks from existing issues.
- Write clear cause-event-impact statements.
- Use consistent assessment scales.
- Avoid false numerical precision.
- Consider both likelihood and impact.
- Identify significant dependencies.
- Assign ownership.
- Define meaningful treatments.
- Evaluate residual risk.
- Define contingency plans where appropriate.
- Use observable triggers where useful.
- Escalate risks beyond local authority.
- Reassess risks when circumstances change.
- Consider aggregate exposure.
- Consider opportunities as well as threats.
- Keep risk management proportional to decision significance.

---

## Quality Considerations

Effective risk management should provide:

### Clarity

Risks and consequences are understandable.

### Consistency

Comparable risks use comparable assessment criteria.

### Traceability

Important risks relate to objectives, assumptions, dependencies, or decisions.

### Accountability

Significant risks have identifiable owners.

### Actionability

Risk information supports meaningful decisions or responses.

### Proportionality

Effort reflects the significance of the exposure.

### Transparency

Residual risk and acceptance decisions are visible.

---

## Trade-offs

Risk management often requires balancing:

- Risk reduction vs. cost
- Risk reduction vs. speed
- Control vs. flexibility
- Prevention vs. recovery
- Opportunity vs. exposure
- Short-term outcomes vs. long-term resilience
- Detailed analysis vs. timely decisions

Risk treatment may itself introduce new risks.

Trade-offs should therefore be explicit.

---

## Common Mistakes

Avoid:

- Treating existing issues as risks.
- Recording vague concerns without consequences.
- Identifying risks without relating them to objectives.
- Using inconsistent scoring.
- Inventing precise probabilities.
- Assuming all high-likelihood risks are highest priority.
- Ignoring low-likelihood high-impact risks.
- Assigning risks without clear owners.
- Creating vague mitigation actions.
- Assuming controls eliminate risk completely.
- Ignoring residual risk.
- Accepting risk without appropriate authority.
- Ignoring dependencies between risks.
- Treating risk identification as a one-time activity.
- Maintaining large risk registers that provide little decision value.
- Attempting to eliminate all risk regardless of cost.
- Focusing only on threats and ignoring opportunities.

---

## Validation Checklist

Before considering risk analysis sufficiently complete, verify:

- [ ] Relevant objectives are understood.
- [ ] Significant uncertainties have been identified.
- [ ] Risks are distinguished from existing issues.
- [ ] Important risks identify cause, event, and consequence.
- [ ] Relevant risk categories have been considered.
- [ ] Likelihood has been assessed where appropriate.
- [ ] Impact has been assessed where appropriate.
- [ ] Significant risk exposure is understood.
- [ ] Assessment scales are used consistently.
- [ ] False numerical precision has been avoided.
- [ ] Significant dependencies between risks are understood.
- [ ] Appropriate response strategies have been considered.
- [ ] Important treatment actions are specific.
- [ ] Significant risks have owners.
- [ ] Contingency plans exist where appropriate.
- [ ] Useful triggers are identified where appropriate.
- [ ] Residual risk has been considered.
- [ ] Significant residual risk has appropriate acceptance authority.
- [ ] Escalation requirements are understood.
- [ ] Aggregate exposure has been considered where relevant.
- [ ] Opportunities have been considered where relevant.
- [ ] Risk information can be reassessed when circumstances change.

---

## References

Risk management practices should align, where applicable, with recognized guidance such as:

- ISO 31000 — Risk Management Guidelines
- ISO/IEC 31010 — Risk Assessment Techniques
- COSO Enterprise Risk Management Framework
- PMI Risk Management guidance
- NIST risk management guidance where relevant
- IIBA Business Analysis Body of Knowledge (BABOK)
- Relevant organizational risk governance frameworks

Frameworks provide structured guidance.

The appropriate treatment of risk should ultimately reflect organizational objectives, context, risk appetite, risk tolerance, evidence, and professional judgment.

