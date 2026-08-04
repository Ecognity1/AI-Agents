# Environment Management

## Purpose

Define standards for managing application and infrastructure environments consistently, securely, and predictably across the software delivery lifecycle.

This skill applies to environments such as:

- Development
- Test
- QA
- UAT
- Staging
- Pre-Production
- Production
- Disaster Recovery

Create only environments required by the solution and organization.

---

# Core Principles

Environment management should provide:

```text
Consistency
+
Isolation
+
Secure Configuration
+
Controlled Promotion
+
Traceability
```

Prefer:

```text
Same Code / Artifact
+
Same Infrastructure Definition
+
Environment-Specific Configuration
```

Avoid maintaining separate application implementations for different environments.

---

# Environment Strategy

Define environments based on:

- Development workflow
- Testing requirements
- Security requirements
- Release process
- Compliance requirements
- Production risk
- Cost

A typical flow may be:

```text
Development
     ↓
Test
     ↓
UAT / Staging
     ↓
Production
```

This is not mandatory.

Do not create environments that provide no meaningful validation or governance value.

---

# Environment Isolation

Environments should be isolated according to their risk.

Consider separating:

- Infrastructure
- Data
- Identity permissions
- Secrets
- Configuration
- Network access
- Deployment permissions

Production should have stronger controls than lower environments.

Avoid sharing production resources with development or testing unless explicitly approved.

---

# Environment Parity

Environments should be sufficiently similar to provide meaningful validation.

Maintain consistency in:

```text
Application Architecture
Runtime
Infrastructure Pattern
Configuration Structure
Deployment Process
Security Model
```

Differences such as capacity or scale are acceptable when intentional.

Example:

```text
Development
Small Capacity

Production
Production-Required Capacity
```

Do not require identical infrastructure sizing when it provides no validation benefit.

---

# Artifact Promotion

Prefer building an artifact once and promoting the same artifact through environments.

```text
Build
  ↓
Validated Artifact
  ↓
Development
  ↓
Test
  ↓
Staging
  ↓
Production
```

Environment differences should come from configuration.

Follow:

```text
ci-cd-practices.md
```

Avoid rebuilding application artifacts for each environment unless technically required.

---

# Infrastructure Consistency

Use common Infrastructure as Code definitions across environments where practical.

Example:

```text
Shared IaC
   +
Dev Parameters
   ↓
Development

Shared IaC
   +
Prod Parameters
   ↓
Production
```

Follow:

```text
infrastructure-as-code.md
```

Avoid maintaining unrelated infrastructure implementations for each environment.

---

# Configuration Management

Environment-specific configuration may include:

- Service endpoints
- Database references
- Feature settings
- Logging levels
- Resource names
- Scaling settings
- Integration endpoints

Configuration should be externalized from application code.

Do not hardcode environment-specific values in source code.

---

# Secret Management

Secrets must be managed separately from ordinary configuration.

Examples:

```text
Passwords
API Keys
Tokens
Certificates
Connection Credentials
Private Keys
```

Use approved secret-management systems.

Never:

- Commit secrets to source control.
- Store production secrets in development configuration.
- Print secrets in deployment logs.
- Reuse sensitive credentials unnecessarily across environments.

---

# Environment Variables

Use environment variables or equivalent configuration mechanisms where appropriate.

Names should remain consistent across environments.

Example:

```text
DATABASE_ENDPOINT
API_ENDPOINT
LOG_LEVEL
```

Values change by environment; application code should not.

---

# Feature Configuration

Feature flags or configuration may be used to control functionality independently of deployment where justified.

Example:

```text
Deploy Feature
     ↓
Feature Disabled
     ↓
Validate
     ↓
Enable for Selected Environment / Users
     ↓
Enable Broadly
```

Do not use feature flags as permanent substitutes for proper configuration or code cleanup.

---

# Data Management

Environment data must be appropriate for its purpose.

### Development

Prefer:

- Synthetic data
- Generated data
- Safe test datasets

### Test / QA

Use controlled datasets suitable for repeatable testing.

### UAT / Staging

Use representative data where required.

### Production

Use actual production data under approved security controls.

Do not copy sensitive production data into lower environments unless explicitly permitted and appropriately protected or anonymized.

---

# External Integrations

Environment-specific integrations should use appropriate endpoints.

Example:

```text
Development → Sandbox Integration

Test → Test Integration

Production → Production Integration
```

Avoid lower environments calling production external systems unless explicitly required and controlled.

---

# Identity and Access

Apply least privilege independently to each environment.

Consider separate:

```text
Application Identities
Deployment Identities
Service Identities
Human Access
```

Production permissions should be restricted to required users and automation.

Do not reuse highly privileged production identities in lower environments.

---

# Network Separation

Where required, environments may use separate:

- Networks
- Subnets
- Firewalls
- Private endpoints
- DNS configuration
- Access restrictions

Network design must follow:

```text
docs/Architecture-Design.md
```

Do not introduce complex network isolation without requirement or security justification.

---

# Environment Naming

Use consistent organization-approved naming conventions.

Environment identifiers should be predictable.

Examples:

```text
dev
test
qa
uat
stage
prod
dr
```

Do not create multiple aliases for the same environment without reason.

---

# Environment Provisioning

Prefer automated provisioning.

Typical flow:

```text
Environment Definition
      ↓
Infrastructure as Code
      ↓
Configuration
      ↓
Secrets
      ↓
Application Deployment
      ↓
Validation
```

Avoid manually building environments when they can be reliably reproduced through automation.

---

# Environment Promotion

Promotion should follow defined quality gates.

Example:

```text
Development
    ↓
Build / Developer Validation
    ↓
Test
    ↓
Automated Testing
    ↓
Staging / UAT
    ↓
Acceptance Validation
    ↓
Production
```

Actual gates depend on organizational requirements.

Do not promote known failing artifacts unless an approved exception exists.

---

# Production Environment

Production requires stronger controls.

Verify applicable:

- Restricted access
- Secure secrets
- Approved configuration
- Monitoring
- Backup
- Recovery
- Scaling
- Deployment controls
- Auditability

Production configuration should be reviewed before release.

---

# Temporary Environments

Temporary environments may be useful for:

- Pull request validation
- Feature testing
- Integration testing
- Demonstrations

Where used:

```text
Create
  ↓
Deploy
  ↓
Validate
  ↓
Destroy
```

Temporary environments should have controlled lifetimes to prevent unnecessary cost.

Do not create temporary environments when existing shared environments are sufficient.

---

# Environment Drift

Environment drift occurs when environments differ unintentionally.

Common causes:

- Manual infrastructure changes
- Manual configuration
- Untracked secret changes
- Different deployment processes
- Uncontrolled package versions

When drift is detected:

```text
Identify Difference
      ↓
Determine Intended State
      ↓
Correct Through Managed Configuration / IaC
      ↓
Validate
```

Do not normalize manual production changes without updating the source of truth.

---

# Cost Management

Non-production environments should be sized according to their purpose.

Consider:

- Smaller compute capacity
- Reduced instance count
- Scheduled shutdown
- Autoscaling limits
- Temporary environments
- Reduced retention where appropriate

Do not duplicate full production capacity in every environment unless required for meaningful testing.

Cost optimization must not invalidate required testing.

---

# Environment Validation

After provisioning or changing an environment verify:

- [ ] Required infrastructure exists.
- [ ] Application configuration is correct.
- [ ] Secrets are available securely.
- [ ] Required identities have correct access.
- [ ] Network connectivity works.
- [ ] Required integrations are reachable.
- [ ] Application deployment succeeds.
- [ ] Health checks succeed.
- [ ] Environment is ready for its intended purpose.

---

# Anti-Patterns

Avoid:

### Different Code Per Environment

Use the same application code with externalized configuration.

### Production Secrets in Lower Environments

Keep credentials isolated.

### Manual Environment Creation

Prefer automated and reproducible provisioning.

### Uncontrolled Configuration Changes

Manage configuration through approved mechanisms.

### Shared Production Dependencies

Avoid unnecessary coupling between production and lower environments.

### Production-Sized Everything

Size environments according to purpose.

### Environment-Specific Architecture

Keep architecture consistent unless a documented requirement justifies the difference.

---

# Checklist

Before considering environment management complete verify:

- [ ] Required environments are clearly defined.
- [ ] Unnecessary environments are avoided.
- [ ] Environment responsibilities are understood.
- [ ] Production is appropriately isolated.
- [ ] Infrastructure definitions are reusable.
- [ ] Application artifacts can be promoted consistently.
- [ ] Configuration is externalized.
- [ ] Secrets are securely managed.
- [ ] Identities follow least privilege.
- [ ] Test data is appropriate and protected.
- [ ] External integrations use correct environment endpoints.
- [ ] Environment drift is controlled.
- [ ] Non-production cost is appropriate.
- [ ] Environment validation exists.

---

# Final Principle

Environment management should follow:

```text
Common Code
     +
Common Infrastructure Definition
     +
Environment Configuration
     +
Environment Security
          ↓
Consistent Environments
          ↓
Controlled Promotion
```

The objective is to maintain **secure, reproducible, appropriately isolated environments without unnecessary duplication or operational complexity**.