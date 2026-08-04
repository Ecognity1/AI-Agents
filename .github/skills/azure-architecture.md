# Azure Architecture Skill

## Purpose

This skill provides Azure architecture standards and best practices for designing secure, scalable, resilient, and cost-effective enterprise solutions.

Always follow Microsoft's Azure Well-Architected Framework and Cloud Adoption Framework.

---

# Architecture Principles

Always design for:

- Scalability
- Reliability
- Security
- Performance
- Cost Optimization
- Operational Excellence

Never select Azure services without explaining the rationale.

---

# Architecture Selection

Choose the most suitable architecture style:

- Modular Monolith
- Microservices
- Event-Driven
- Serverless
- Layered Architecture
- Clean Architecture

Document why the selected architecture is appropriate.

---

# Azure Service Selection

## Compute

Prefer:

- Azure App Service
- Azure Functions
- Azure Kubernetes Service (AKS)
- Azure Container Apps

## Storage

Choose based on workload:

- Azure SQL Database
- Azure Cosmos DB
- Azure Storage Account
- Azure Files

## Messaging

Use:

- Azure Service Bus
- Azure Event Grid
- Azure Event Hubs

## Identity

Use:

- Microsoft Entra ID
- Managed Identity

Avoid storing credentials in code.

## Networking

Prefer:

- Virtual Networks
- Private Endpoints
- Application Gateway
- Azure Front Door
- Azure Firewall
- NSGs

## Monitoring

Use:

- Azure Monitor
- Application Insights
- Log Analytics

---

# Architecture Validation

Verify:

✓ High Availability

✓ Disaster Recovery

✓ Scalability

✓ Security

✓ Monitoring

✓ Cost Optimization

✓ Identity

✓ Networking

---

# Mermaid Diagrams

Generate where appropriate:

- System Context
- Component Diagram
- Deployment Diagram
- Infrastructure Diagram
- Network Diagram
- Data Flow Diagram

---

# Common Mistakes

Avoid:

- Public endpoints without justification
- Hardcoded secrets
- Missing monitoring
- Single points of failure
- No disaster recovery strategy

---

# Expected Output

Enterprise-ready Azure architecture aligned with Microsoft best practices.