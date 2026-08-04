# Deployment Plan

---

# 1. Deployment Overview

Summarize:

- Application / Solution
- Release Version
- Target Environment
- Deployment Target
- Deployment Strategy
- Deployment Method
- Release Scope

---

# 2. Deployment Scope

## In Scope

Document the components included in this deployment.

| Component | Version | Change Type | Deployment Target |
|---|---|---|---|
| | | | |

## Out of Scope

Document components explicitly excluded from this deployment.

---

# 3. Deployment Architecture

Summarize the deployment architecture from:

```text
docs/Architecture-Design.md
```

Include applicable:

- Application Components
- Hosting Platform
- Infrastructure
- Database
- Networking
- External Dependencies

Do not introduce architecture decisions in this document.

---

# 4. Environment Strategy

Document required environments.

| Environment | Purpose | Deployment Method | Promotion Criteria |
|---|---|---|---|
| Development | | | |
| Test | | | |
| Staging / UAT | | | |
| Production | | | |

Include only environments required by the solution.

---

# 5. Deployment Strategy

Document:

- Selected Deployment Strategy
- Reason for Selection
- Availability Impact
- Traffic Management
- Validation Approach
- Recovery Approach

Possible strategies may include:

```text
Recreate
Rolling
Blue-Green
Canary
Slot-Based
```

Use the strategy defined or supported by the approved architecture.

---

# 6. CI/CD Pipeline

Describe the delivery flow.

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
Deploy
  ↓
Validate
  ↓
Promote
```

Document actual stages used by the solution.

| Stage | Purpose | Validation / Gate |
|---|---|---|
| | | |

---

# 7. Artifact Strategy

Document:

- Artifact Type
- Versioning Strategy
- Artifact Repository / Registry
- Promotion Strategy

Prefer:

```text
Build Once
    ↓
Validate
    ↓
Promote Same Artifact
```

Record:

| Artifact | Version | Source Version | Target |
|---|---|---|---|
| | | | |

---

# 8. Infrastructure Deployment

If infrastructure changes exist, document:

- IaC Technology
- Infrastructure Scope
- Modules / Components
- State Management
- Validation
- Plan / Preview
- Deployment Process

Typical flow:

```text
Validate
   ↓
Security Scan
   ↓
Plan / Preview
   ↓
Review
   ↓
Apply
   ↓
Validate
```

If no infrastructure changes exist, state:

```text
Not Applicable
```

---

# 9. Application Deployment

Document:

- Application Artifact
- Hosting Platform
- Deployment Method
- Runtime Configuration
- Deployment Sequence

## Deployment Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

---

# 10. Container Deployment

Complete only when containers are used.

Document:

- Container Image
- Image Version
- Base Image
- Registry
- Security Scan
- Deployment Target

```text
Source
  ↓
Build Image
  ↓
Scan
  ↓
Publish
  ↓
Deploy
  ↓
Validate
```

Otherwise:

```text
Not Applicable
```

---

# 11. Azure App Service Deployment

Complete only when Azure App Service is the approved hosting platform.

Document applicable:

- App Service
- App Service Plan
- Deployment Type
- Deployment Slot
- Application Configuration
- Managed Identity
- Key Vault Integration
- Networking
- Health Check
- Scaling
- Monitoring

When slots are used:

```text
Deploy to Staging
      ↓
Warm Up
      ↓
Validate
      ↓
Swap
      ↓
Validate Production
```

Otherwise:

```text
Not Applicable
```

---

# 12. Kubernetes Deployment

Complete only when Kubernetes is the approved hosting platform.

Document applicable:

- Cluster
- Namespace
- Workloads
- Services
- Configuration
- Secrets
- Resource Requirements
- Health Probes
- Scaling
- Deployment Strategy

Otherwise:

```text
Not Applicable
```

---

# 13. Configuration Management

Document environment-specific configuration.

| Configuration | Source | Environment | Sensitive |
|---|---|---|---|
| | | | |

Do not include actual secret values.

---

# 14. Secret Management

Document:

- Secret Management Mechanism
- Application Secret Access
- Pipeline Secret Access
- Identity Used
- Rotation Approach where required

Never include:

```text
Passwords
Tokens
API Keys
Private Keys
Connection Credentials
```

---

# 15. Identity and Deployment Permissions

Document:

| Identity | Purpose | Environment | Required Access |
|---|---|---|---|
| | | | |

Apply least privilege.

Prefer managed, workload, or federated identity where supported.

---

# 16. Database Deployment

Complete only when database changes exist.

Document:

- Migration Version
- Migration Type
- Compatibility Requirements
- Deployment Sequence
- Data Migration
- Backup Requirement
- Recovery Approach

Example:

```text
Compatible Schema Change
      ↓
Application Deployment
      ↓
Data Migration
      ↓
Validation
      ↓
Cleanup
```

Otherwise:

```text
Not Applicable
```

---

# 17. Network Requirements

Document deployment-relevant connectivity.

| Source | Destination | Purpose | Connectivity |
|---|---|---|---|
| | | | |

Include applicable:

- Public Access
- Private Access
- VNet Integration
- Private Endpoints
- DNS
- Firewall / Access Restrictions

Follow the approved architecture.

---

# 18. Security Gates

Document required deployment security validation.

| Security Check | Stage | Blocking | Result |
|---|---|---|---|
| Secret Scan | | | |
| Dependency Scan | | | |
| SAST | | | |
| Container Scan | | | |
| IaC Scan | | | |

Include only applicable checks.

---

# 19. Pre-Deployment Checklist

Verify applicable:

- [ ] Approved release version exists.
- [ ] Correct artifact is available.
- [ ] Required tests passed.
- [ ] Required security checks passed.
- [ ] Infrastructure is ready.
- [ ] Configuration is ready.
- [ ] Secrets are available securely.
- [ ] Database migration is ready.
- [ ] Required integrations are available.
- [ ] Required approvals are complete.
- [ ] Monitoring is available.
- [ ] Recovery approach is defined.

---

# 20. Deployment Execution

Record actual execution.

| Step | Component | Action | Result | Evidence |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Use:

```text
PASS
FAIL
BLOCKED
NOT RUN
```

Do not report unexecuted steps as successful.

---

# 21. Post-Deployment Validation

Validate applicable:

```text
Correct Version
      ↓
Application Startup
      ↓
Health Check
      ↓
Dependencies
      ↓
Smoke Tests
      ↓
Critical Workflow
      ↓
Monitoring
```

Record:

| Validation | Expected Result | Actual Result | Status |
|---|---|---|---|
| | | | |

---

# 22. Monitoring Validation

Verify applicable:

- Application Logs
- Platform Logs
- Metrics
- Traces
- Health Checks
- Alerts

Document critical issues observed after deployment.

---

# 23. Rollback and Recovery Plan

Document:

- Rollback Trigger
- Previous Stable Version
- Recovery Method
- Database Impact
- Configuration Impact
- Infrastructure Impact
- Validation After Recovery

Possible recovery methods:

```text
Previous Artifact
Previous Container Image
Slot Swap Back
Traffic Switch
Configuration Recovery
Infrastructure Recovery
Database Recovery
Feature Disablement
Forward Fix
```

---

# 24. Production Readiness

Evaluate:

| Area | Status | Evidence / Notes |
|---|---|---|
| Functional | | |
| Testing | | |
| Security | | |
| Infrastructure | | |
| Configuration | | |
| Database | | |
| Deployment | | |
| Monitoring | | |
| Recovery | | |

Use:

```text
READY
READY WITH KNOWN RISKS
NOT READY
BLOCKED
```

---

# 25. Risks and Known Issues

| ID | Risk / Issue | Impact | Mitigation | Status |
|---|---|---|---|---|
| | | | | |

Do not hide known deployment or production risks.

---

# 26. Deployment Result

Summarize:

| Metric | Result |
|---|---|
| Release Version | |
| Environment | |
| Artifact Version | |
| Deployment Status | |
| Validation Status | |
| Failed Checks | |
| Rollback Required | |
| Final Status | |

---

# 27. Release Decision

Select one:

```text
DEPLOYED SUCCESSFULLY

DEPLOYED WITH KNOWN RISKS

DEPLOYMENT FAILED

ROLLED BACK

BLOCKED
```

Provide a concise reason supported by deployment evidence.

---

# 28. Deployment Traceability

Maintain:

```text
Requirement
    ↓
Implementation
    ↓
Test
    ↓
Build
    ↓
Artifact
    ↓
Release
    ↓
Deployment
    ↓
Validation
```

Where useful:

| Requirement / Change | Artifact | Release | Deployment | Validation |
|---|---|---|---|---|
| | | | | |

---

# 29. Deployment Summary

Provide a concise final summary containing:

- What was deployed
- Where it was deployed
- Version deployed
- Deployment strategy used
- Deployment result
- Validation result
- Known issues
- Recovery actions if any
- Final production status

---

# Template Rules

Always:

- Follow the approved architecture.
- Include only applicable deployment sections.
- Mark non-applicable technology-specific sections as `Not Applicable`.
- Use actual deployment results.
- Preserve artifact and release traceability.
- Protect secrets.
- Document failures accurately.
- Document recovery actions.
- Keep the deployment plan concise and operationally useful.

Never:

- Invent deployment results.
- Mark unexecuted validation as passed.
- Include actual secret values.
- Introduce architecture decisions.
- Select Kubernetes, containers, or App Service merely because the template contains those sections.
- Hide failed deployment steps.
- Hide known production risks.
- Declare production readiness without evidence.