# Architecture Patterns Skill

## Purpose

This skill provides guidance for selecting the most appropriate architecture pattern based on business requirements, scalability, complexity, deployment model, and operational needs.

Always recommend the simplest architecture that satisfies the requirements.

Avoid unnecessary complexity.

---

# Decision Principles

When selecting an architecture, consider:

- Business Complexity
- Team Size
- Deployment Frequency
- Scalability Requirements
- Performance Requirements
- Security Requirements
- Integration Requirements
- Operational Complexity
- Cost
- Future Growth

Never recommend Microservices simply because it is popular.

Choose the architecture based on the actual business needs.

---

# Architecture Selection Guide

## Layered Architecture

Use when:

- Small applications
- Internal business applications
- Limited integrations
- Small development teams

Advantages

- Easy to understand
- Fast development
- Low operational cost

Avoid when

- Independent deployments are required
- Large-scale systems

---

## Modular Monolith

Use when:

- Medium to large business applications
- Domain boundaries are well defined
- Independent modules are required
- Single deployment is acceptable

Advantages

- Easier maintenance
- Better separation of concerns
- Simpler than Microservices

Preferred enterprise default unless strong reasons exist for Microservices.

---

## Microservices

Use when:

- Large enterprise systems
- Multiple development teams
- Independent deployments
- High scalability
- Frequent releases

Requirements

- API Gateway
- Service Discovery
- Centralized Logging
- Monitoring
- Distributed Tracing

Avoid when:

- Small teams
- Simple applications
- Tight deadlines

---

## Event-Driven Architecture

Use when:

- Asynchronous communication
- Real-time processing
- Multiple consumers
- Event publishing

Typical Azure Services

- Event Grid
- Event Hubs
- Service Bus

---

## Serverless

Use when:

- Event-based workloads
- Short-running processes
- Variable workloads
- Cost optimization

Typical Azure Services

- Azure Functions
- Logic Apps

---

## CQRS

Use when:

- Read and write workloads differ
- Complex reporting
- High-performance reads

Avoid for CRUD applications.

---

## Clean Architecture

Apply to all enterprise applications where possible.

Principles

- Business Logic Independent
- Framework Independent
- Testable
- Maintainable

---

## Domain Driven Design

Use when:

- Complex business domains
- Multiple business capabilities
- Long-term enterprise applications

Always identify:

- Bounded Contexts
- Aggregates
- Entities
- Value Objects
- Domain Services

---

# Architecture Comparison

| Pattern | Complexity | Scalability | Cost | Recommended |
|----------|------------|------------|------|-------------|
| Layered | Low | Low | Low | Small Apps |
| Modular Monolith | Medium | Medium | Medium | Default Enterprise Choice |
| Microservices | High | High | High | Large Enterprise |
| Event Driven | Medium | High | Medium | Real-time Systems |
| Serverless | Low | Medium | Low | Event Workloads |

---

# Validation Checklist

Verify:

✓ Architecture matches business needs

✓ Operational complexity is justified

✓ Scalability requirements are met

✓ Security considerations are addressed

✓ Deployment strategy is defined

✓ Architecture decisions are documented

---

# Common Mistakes

Avoid:

- Choosing Microservices unnecessarily.
- Mixing multiple patterns without justification.
- Ignoring operational complexity.
- Ignoring deployment strategy.
- Ignoring cost implications.

---

# Expected Output

A well-justified architecture style selection with documented rationale and trade-offs.