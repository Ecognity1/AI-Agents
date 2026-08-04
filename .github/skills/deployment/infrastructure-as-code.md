# Infrastructure as Code

## Purpose

Define standards for provisioning and managing infrastructure through version-controlled, repeatable, secure, and automated Infrastructure as Code (IaC).

This skill is technology-neutral and applies to tools such as:

- Terraform
- Bicep
- ARM
- Pulumi
- CloudFormation
- Other approved IaC platforms

Use the IaC technology defined by the approved architecture and organization standards.

Do not introduce a new IaC tool when the repository already has an approved solution.

---

# Core Principles

Infrastructure should be:

```text
Declarative Where Practical
+
Version Controlled
+
Repeatable
+
Automated
+
Secure
+
Reviewable
+
Environment-Aware
```

Prefer:

```text
Code
 ↓
Validate
 ↓
Plan / Preview
 ↓
Review
 ↓
Apply
 ↓
Verify
```

Avoid manual infrastructure changes when infrastructure is managed through IaC.

---

# Source of Truth

IaC should be the source of truth for managed infrastructure.

Infrastructure changes should normally follow:

```text
IaC Change
    ↓
Pull Request
    ↓
Validation
    ↓
Review
    ↓
Deployment Pipeline
    ↓
Infrastructure
```

Avoid modifying managed resources manually through cloud portals or command-line tools.

Emergency manual changes must be reconciled back into IaC.

---

# Architecture Alignment

Before creating infrastructure, read:

```text
docs/Architecture-Design.md
```

Provision only infrastructure required by the approved architecture.

Do not use IaC implementation to introduce:

- New architecture components
- Unapproved services
- Unnecessary networking
- Additional databases
- Premium service tiers
- Multi-region deployments

without architecture justification.

---

# Repository Structure

Organize IaC so responsibilities are clear.

A typical structure may separate:

```text
Reusable Modules
Environment Configuration
Deployment Entry Points
Variables / Parameters
Outputs
```

Example:

```text
infra/
├── modules/
├── environments/
│   ├── dev/
│   ├── test/
│   └── prod/
└── shared/
```

The exact structure should follow repository conventions.

Do not restructure an existing IaC repository unnecessarily.

---

# Reusable Modules

Create reusable modules for infrastructure capabilities that are repeated or logically independent.

A module should:

- Have one clear responsibility.
- Expose required inputs.
- Produce useful outputs.
- Hide unnecessary implementation details.
- Avoid environment-specific hardcoding.

Prefer:

```text
Reusable Module
      +
Environment Parameters
```

over duplicated resource definitions.

Do not create modules for trivial one-time resources unless they provide meaningful reuse or maintainability.

---

# Variables and Parameters

Environment-specific values should be provided through variables or parameters.

Examples:

```text
Region
Resource Names
SKU / Tier
Instance Count
Network Configuration
Scaling Settings
Feature Configuration
```

Provide sensible defaults only when they are safe and broadly applicable.

Do not hardcode production-specific values into reusable modules.

---

# Environment Management

Reuse the same IaC definitions across environments where practical.

Example:

```text
Shared Infrastructure Definition
        +
Development Parameters
        ↓
Development

Shared Infrastructure Definition
        +
Production Parameters
        ↓
Production
```

Environment differences should primarily be configuration-driven.

Detailed environment guidance belongs in:

```text
environment-management.md
```

---

# Resource Naming and Tagging

Follow organization-defined naming and tagging conventions.

Tags may include applicable:

```text
Environment
Application
Owner
Cost Center
Managed By
```

Do not invent new naming conventions when organization standards already exist.

---

# Resource Dependencies

Declare dependencies explicitly where the IaC platform cannot determine them automatically.

Prefer natural dependency relationships through resource references.

Avoid unnecessary explicit dependencies that make deployments harder to maintain.

---

# State Management

For stateful IaC tools, state must be stored securely and reliably.

State storage should support applicable:

- Remote storage
- Access control
- Encryption
- Locking
- Backup/versioning
- Environment isolation

Production and non-production state should be isolated.

Never commit sensitive state files to source control.

---

# Secrets

Never hardcode secrets in IaC.

Do not commit:

```text
Passwords
Tokens
API Keys
Private Keys
Connection Secrets
Certificates
```

Use approved secret-management systems and secure pipeline mechanisms.

Be aware that some IaC tools may store sensitive values in state.

Protect state accordingly.

---

# Identity and Permissions

IaC deployment identities must follow least privilege.

Prefer workload or federated identity where supported rather than long-lived credentials.

Separate production permissions from lower-environment permissions where appropriate.

Do not grant broad administrator permissions merely to simplify deployment.

---

# Infrastructure Validation

Before deployment, perform applicable validation.

Typical flow:

```text
Format Check
     ↓
Syntax Validation
     ↓
Static Analysis
     ↓
Security Scan
     ↓
Plan / Preview
```

Validation failures must be resolved before infrastructure deployment.

---

# Plan Before Apply

Where supported, generate a deployment plan or preview before changing infrastructure.

Review:

```text
Resources Created
Resources Modified
Resources Replaced
Resources Deleted
Security Changes
Network Changes
Data Impact
Cost-Relevant Changes
```

Unexpected destructive changes must be investigated before deployment.

Production destructive changes should require appropriate controls.

---

# CI/CD Integration

Infrastructure deployment should use controlled CI/CD pipelines.

Typical flow:

```text
IaC Change
    ↓
Validate
    ↓
Security Scan
    ↓
Plan / Preview
    ↓
Approval where required
    ↓
Apply
    ↓
Validate Infrastructure
```

Follow:

```text
ci-cd-practices.md
```

Avoid routine production infrastructure deployment from developer machines.

---

# Infrastructure Security

Apply secure defaults.

Review applicable:

- Public network exposure
- Identity permissions
- Encryption
- Secret handling
- Firewall rules
- Security groups
- Private connectivity
- Diagnostic configuration

Do not make resources publicly accessible merely to simplify deployment.

Security decisions must align with:

```text
docs/Architecture-Design.md
```

---

# Cost Awareness

IaC definitions should use the service tiers and capacities approved by architecture.

Review:

- SKU / Tier
- Instance count
- Storage size
- Scaling limits
- Redundant resources
- Environment sizing

Do not default to premium or maximum-capacity resources.

Use the lowest-cost configuration that satisfies approved requirements.

---

# Infrastructure Changes

Classify significant changes before deployment.

Examples:

```text
Create
Update
Replace
Delete
```

Pay particular attention to:

```text
Database Replacement
Storage Replacement
Network Replacement
Identity Changes
Resource Deletion
Stateful Resource Changes
```

Changes with potential data loss require explicit review.

---

# Drift Management

Infrastructure drift occurs when actual infrastructure differs from IaC.

Typical causes:

- Manual changes
- Emergency fixes
- External automation
- Configuration changes outside IaC

When drift is detected:

```text
Detect
 ↓
Understand Cause
 ↓
Determine Desired State
 ↓
Update IaC or Restore Infrastructure
 ↓
Validate
```

Do not blindly overwrite production drift without understanding its origin.

---

# Resource Deletion

Resource deletion must be treated carefully.

Before deleting a stateful or production resource verify:

```text
Is deletion intentional?
Is data protected?
Is backup available?
Are dependencies understood?
Is recovery possible?
```

Do not automatically delete critical resources because they disappeared from IaC without reviewing impact.

---

# Rollback and Recovery

Infrastructure rollback is not always equivalent to application rollback.

Some infrastructure changes cannot be safely reversed automatically.

Before significant changes define:

- Recovery approach
- Backup requirements
- State recovery
- Data recovery
- Forward-fix option

Follow:

```text
rollback-recovery.md
```

---

# Outputs

IaC should expose only outputs required by dependent systems.

Examples:

```text
Resource Identifier
Endpoint
Hostname
Managed Identity ID
Network Identifier
```

Do not expose secrets as ordinary outputs.

---

# Documentation

Document only information necessary to operate and maintain the infrastructure.

Include applicable:

- Prerequisites
- Deployment commands/process
- Required variables
- State location approach
- Important dependencies
- Special recovery considerations

Avoid documentation that simply repeats obvious IaC definitions.

---

# Anti-Patterns

Avoid:

### Manual Infrastructure as Normal Practice

Use IaC for managed resources.

### Hardcoded Environment Values

Use parameters or environment configuration.

### Secrets in Source Control

Use secure secret management.

### Copy-Paste Infrastructure

Use reusable definitions where meaningful.

### Unreviewed Destructive Changes

Inspect plans before applying.

### Shared State Across Environments

Isolate environments appropriately.

### Excessive Deployment Permissions

Apply least privilege.

### Architecture Changes Through IaC

IaC implements approved architecture; it does not redefine it.

### Premium by Default

Select capacity based on actual requirements.

---

# Validation Checklist

Before applying infrastructure changes verify:

- [ ] Changes align with approved architecture.
- [ ] Existing IaC conventions are followed.
- [ ] Configuration is parameterized appropriately.
- [ ] No secrets are hardcoded.
- [ ] State is securely managed where applicable.
- [ ] Deployment identity follows least privilege.
- [ ] Formatting and syntax validation pass.
- [ ] Required security checks pass.
- [ ] Plan/preview has been reviewed.
- [ ] Unexpected deletions or replacements are resolved.
- [ ] Stateful resource impact is understood.
- [ ] Cost-impacting changes are justified.
- [ ] Recovery approach exists for high-risk changes.

After deployment verify:

- [ ] IaC execution succeeded.
- [ ] Expected resources exist.
- [ ] Configuration matches the desired state.
- [ ] Security controls are active.
- [ ] Required connectivity works.
- [ ] No unexpected resources changed.
- [ ] Infrastructure is ready for application deployment.

---

# Final Principle

Infrastructure changes should follow:

```text
Architecture
     ↓
Infrastructure Code
     ↓
Validate
     ↓
Security Check
     ↓
Plan / Preview
     ↓
Review
     ↓
Apply
     ↓
Verify
```

Infrastructure as Code exists to make infrastructure **repeatable, controlled, secure, traceable, and recoverable**.

Use the simplest IaC implementation that reliably represents the approved architecture.