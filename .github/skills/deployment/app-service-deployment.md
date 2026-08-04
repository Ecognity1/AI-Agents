# App Service Deployment

## Purpose

Define standards for deploying applications securely and reliably to Azure App Service.

Use this skill only when:

```text
docs/Architecture-Design.md
```

selects Azure App Service as the application hosting platform.

This skill applies to:

- Web Applications
- APIs
- Backend Applications
- Code-Based App Service Deployments
- Container-Based App Service Deployments

Do not select App Service simply because this skill exists.

---

# Core Principles

App Service deployments should be:

```text
Automated
+
Secure
+
Repeatable
+
Environment-Aware
+
Observable
+
Recoverable
```

Prefer managed App Service capabilities before introducing additional infrastructure.

---

# Deployment Model

Determine the deployment model from the approved architecture.

## Code-Based Deployment

```text
Source
  ↓
Build
  ↓
Test
  ↓
Package
  ↓
Publish Artifact
  ↓
Deploy to App Service
```

Use when App Service directly hosts the application runtime.

## Container-Based Deployment

```text
Source
  ↓
Build
  ↓
Test
  ↓
Build Container
  ↓
Scan
  ↓
Publish to Registry
  ↓
Deploy Image to App Service
```

When containers are used, also follow:

```text
containerization.md
```

Do not introduce containers when code-based deployment already satisfies the approved architecture.

---

# App Service Plan

Select the App Service Plan based on confirmed requirements.

Consider:

- Operating system
- Runtime requirements
- Compute requirements
- Memory requirements
- Scaling
- Availability
- Deployment slots
- Networking
- Cost

Do not automatically select Premium or high-capacity tiers.

Prefer:

```text
Lowest-Cost Tier
      +
Required Capabilities
      +
Required Capacity
```

Production and non-production environments may use different capacities when appropriate.

---

# Application Configuration

Keep environment-specific configuration outside application code.

Use App Service configuration for applicable:

```text
Application Settings
Connection Configuration
Runtime Settings
Feature Configuration
Environment Values
```

The same application artifact should be deployable across environments.

Follow:

```text
environment-management.md
```

Do not hardcode environment-specific values in application code.

---

# Secret Management

Do not store secrets directly in:

- Source code
- Pipeline definitions
- Deployment scripts
- Container images
- Repository configuration files

Use approved secret-management mechanisms.

Where architecture defines Azure Key Vault, prefer secure Key Vault integration or references.

Protect:

```text
Passwords
Tokens
API Keys
Connection Credentials
Certificates
Private Keys
```

---

# Managed Identity

Use App Service Managed Identity where appropriate for accessing Azure resources.

Prefer:

```text
App Service
     ↓
Managed Identity
     ↓
Azure Resource
```

over:

```text
App Service
     ↓
Stored Credential
     ↓
Azure Resource
```

Grant only required permissions.

Do not assign broad roles merely to simplify deployment.

---

# Deployment Slots

Use deployment slots when required for low-downtime deployment, production validation, or rapid rollback.

Typical flow:

```text
Production Slot
      +
Staging Slot
      ↓
Deploy to Staging
      ↓
Warm Up
      ↓
Validate
      ↓
Swap
      ↓
Production
```

Do not create deployment slots when they provide no meaningful deployment benefit.

---

# Slot Configuration

Understand which settings should move during a swap and which must remain environment-specific.

Examples of settings that may need to remain slot-specific:

```text
Environment Configuration
External Integration Endpoints
Secrets / Secret References
Feature Settings
```

Review slot behavior before production deployment.

Incorrect slot configuration can cause the staging application to connect to production or incorrect dependencies.

---

# Slot Deployment Flow

When slots are used:

```text
Build Approved Artifact
      ↓
Deploy to Staging Slot
      ↓
Start Application
      ↓
Warm Up
      ↓
Health Validation
      ↓
Smoke Tests
      ↓
Swap
      ↓
Production Validation
      ↓
Monitor
```

Do not swap an unhealthy staging deployment into production.

---

# Slot Rollback

If a production issue occurs immediately after a slot swap and rollback is safe:

```text
Detect Failure
      ↓
Swap Back
      ↓
Validate Previous Version
      ↓
Investigate Failure
```

Database changes and external side effects must be considered before swapping back.

A slot swap does not automatically reverse database changes.

Follow:

```text
rollback-recovery.md
database-deployment.md
```

---

# Networking

Configure networking according to:

```text
docs/Architecture-Design.md
```

Applicable capabilities may include:

```text
VNet Integration
Private Endpoint
Access Restrictions
Private DNS
Controlled Outbound Connectivity
```

Do not introduce private networking without architecture or security justification.

---

# Inbound Connectivity

Control how users and systems reach App Service.

Depending on architecture, access may be:

```text
Public HTTPS
        OR
Restricted Public Access
        OR
Private Access
```

Apply access restrictions where required.

Do not expose applications publicly merely to simplify deployment.

---

# Outbound Connectivity

Use VNet Integration when the application must securely access architecture-defined private resources.

Examples:

```text
App Service
     ↓
VNet Integration
     ↓
Private Database
```

or:

```text
App Service
     ↓
VNet Integration
     ↓
Private Service
```

Validate DNS and routing when private connectivity is used.

---

# HTTPS

Production applications should use HTTPS.

Apply applicable:

- HTTPS-only access
- Supported TLS configuration
- Approved certificates
- Secure custom-domain configuration

Do not expose sensitive application traffic through insecure protocols.

---

# Scaling

Configure scaling based on actual requirements.

Consider:

```text
Scale Up
    =
Increase Instance Capacity

Scale Out
    =
Increase Instance Count
```

Use autoscaling when workload characteristics and requirements justify it.

Do not enable aggressive autoscaling without defined limits.

Define appropriate:

- Minimum capacity
- Maximum capacity
- Scaling conditions

Avoid unnecessary production capacity.

---

# Application State

Applications intended to scale across multiple App Service instances should avoid dependence on local instance state.

Persistent state should use architecture-approved external storage.

Examples:

```text
Database
Object Storage
Distributed Cache
```

Do not assume local files remain available consistently across instances or deployments.

---

# Health Checks

Configure meaningful application health checks where required.

A health endpoint should verify that the application is capable of serving requests.

Typical flow:

```text
App Service
     ↓
Health Endpoint
     ↓
Application Health
```

Health checks should not expose sensitive information.

Do not treat successful process startup as sufficient application validation.

---

# Logging and Monitoring

Enable monitoring required by the approved architecture.

Applicable capabilities may include:

```text
Application Logs
Platform Metrics
Application Insights
Azure Monitor
Diagnostic Settings
Alerts
```

Monitor important:

- Availability
- Failed requests
- Exceptions
- Response time
- Resource utilization
- Deployment failures

Do not enable excessive telemetry without operational value.

---

# CI/CD Deployment

Deploy App Service through controlled CI/CD where practical.

Typical code-based flow:

```text
Source
  ↓
Build
  ↓
Test
  ↓
Security Validation
  ↓
Package
  ↓
Publish Artifact
  ↓
Deploy to App Service / Slot
  ↓
Validate
  ↓
Promote / Swap
```

Follow:

```text
ci-cd-practices.md
```

Avoid routine production deployment from developer machines.

---

# Deployment Identity

Pipeline deployment identities should use least privilege.

Prefer workload/federated identity where supported rather than long-lived credentials.

The deployment identity should receive only permissions required to deploy the application.

Separate production permissions from lower environments where appropriate.

---

# Infrastructure Provisioning

Provision App Service infrastructure using Infrastructure as Code when it is part of the organization's managed infrastructure.

IaC should define applicable:

```text
App Service Plan
App Service
Deployment Slots
Managed Identity
Networking
Monitoring Configuration
Application Configuration Structure
```

Follow:

```text
infrastructure-as-code.md
```

Avoid creating managed App Service infrastructure manually when IaC is the established source of truth.

---

# Database Deployment

Coordinate database migrations with App Service deployment.

Ensure compatibility between:

```text
Current Application
New Application
Current Database
Updated Database
```

This is particularly important when deployment slots allow application versions to coexist temporarily.

Follow:

```text
database-deployment.md
```

Do not assume slot rollback automatically rolls back database changes.

---

# Post-Deployment Validation

After deployment verify:

```text
Deployment Completed
      ↓
Application Started
      ↓
Health Check Passed
      ↓
Required Dependencies Available
      ↓
Smoke Tests Passed
      ↓
Critical Workflow Passed
      ↓
Monitoring Healthy
```

Follow:

```text
deployment-validation.md
```

Do not declare deployment successful only because App Service accepted the deployment package or container image.

---

# Rollback

Possible App Service recovery approaches include:

```text
Slot Swap Back
Previous Application Artifact
Previous Container Image
Configuration Recovery
Forward Fix
```

Select the safest approach based on:

- Application state
- Database changes
- External side effects
- Configuration changes

Follow:

```text
rollback-recovery.md
```

---

# App Service Validation Checklist

Before deployment:

- [ ] App Service is approved by the architecture.
- [ ] Deployment model is confirmed.
- [ ] Required App Service tier/capacity is justified.
- [ ] Approved artifact or container image exists.
- [ ] Application configuration is externalized.
- [ ] Secrets are securely managed.
- [ ] Managed Identity is configured where required.
- [ ] Networking matches the architecture.
- [ ] Required deployment slot exists where applicable.
- [ ] Slot-specific settings are verified.
- [ ] Health check is available where required.
- [ ] Monitoring is configured.
- [ ] Database migration impact is understood.
- [ ] Rollback approach is defined.

After deployment:

- [ ] Deployment completed successfully.
- [ ] Application started successfully.
- [ ] Health check passed.
- [ ] Required integrations are reachable.
- [ ] Smoke tests passed.
- [ ] Critical workflows work.
- [ ] Slot swap completed correctly where applicable.
- [ ] Monitoring shows healthy behavior.
- [ ] No unexpected configuration changes occurred.
- [ ] Deployment evidence is recorded.

---

# Anti-Patterns

Avoid:

### Premium Tier by Default

Select capacity based on actual requirements.

### Secrets in Application Settings Without Proper Protection

Use approved secret-management integration.

### Production Deployment From Developer Machines

Use controlled CI/CD.

### Direct Production Deployment When Slots Are Required

Deploy and validate through the approved slot strategy.

### Blind Slot Swaps

Validate staging before swapping.

### Assuming Slot Swap Handles Database Rollback

Database lifecycle must be managed separately.

### Public Access for Convenience

Follow approved network architecture.

### Local Instance State

Use external persistent storage where state must survive scaling or replacement.

### Broad Deployment Permissions

Apply least privilege.

### Rebuilding Per Environment

Promote the same validated artifact where practical.

### App Service Driving Architecture

App Service implements the approved architecture; it does not define it.

---

# Final Principle

App Service deployment should follow:

```text
Approved Architecture
        ↓
App Service Infrastructure
        ↓
Secure Configuration
        ↓
Approved Artifact / Image
        ↓
Deploy
        ↓
Warm Up
        ↓
Validate
        ↓
Swap / Promote
        ↓
Production Validation
        ↓
Monitor
        ↓
Accept or Recover
```

The objective is to use Azure App Service capabilities to provide a **simple, secure, repeatable, observable, cost-aware, and recoverable deployment process** without introducing unnecessary infrastructure or deployment complexity.