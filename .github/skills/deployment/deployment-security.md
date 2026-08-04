# Deployment Security

## Purpose

Define security standards for CI/CD pipelines, deployment processes, infrastructure changes, artifacts, credentials, and production releases.

This skill applies to all deployment models and platforms.

Security controls must be appropriate to:

- Application risk
- Deployment environment
- Architecture
- Data sensitivity
- Organizational policies
- Compliance requirements

Do not introduce security controls that provide no meaningful risk reduction.

---

# Core Principles

Deployment security should follow:

```text
Least Privilege
+
Secure Identity
+
Secret Protection
+
Trusted Artifacts
+
Controlled Access
+
Security Validation
+
Auditability
```

Security must be integrated into deployment rather than added only after production release.

---

# Deployment Identity

CI/CD pipelines should use dedicated deployment identities.

Prefer:

```text
Workload Identity
Federated Identity
Managed Identity
Short-Lived Credentials
```

over long-lived credentials where supported.

Deployment identities must not use personal user accounts.

---

# Least Privilege

Grant deployment identities only the permissions required for their responsibilities.

Example:

```text
Pipeline
   ↓
Required Deployment Permission
   ↓
Target Resources
```

Avoid:

```text
Owner
Administrator
Full Subscription / Account Access
```

when narrower permissions are sufficient.

Production permissions should be more restricted than lower environments.

---

# Environment Separation

Separate deployment access between environments where appropriate.

Example:

```text
Development Identity
      ↓
Development

Test Identity
      ↓
Test

Production Identity
      ↓
Production
```

A compromised lower-environment pipeline should not automatically provide production access.

Follow:

```text
environment-management.md
```

---

# Secret Management

Never hardcode secrets in:

- Source code
- Pipeline definitions
- IaC files
- Container images
- Deployment scripts
- Configuration committed to source control

Secrets include:

```text
Passwords
API Keys
Tokens
Private Keys
Certificates
Connection Credentials
```

Use approved secret-management systems.

---

# Secret Exposure

Prevent secrets from appearing in:

```text
Pipeline Logs
Command Output
Deployment Reports
Build Artifacts
Test Reports
Container Layers
IaC Outputs
```

Mask sensitive values where supported.

Do not intentionally print secrets for debugging.

If exposure occurs, treat the secret as compromised and follow the organization's credential-rotation process.

---

# Secret Scope

Scope secrets to the smallest required environment and workload.

Avoid unnecessary reuse such as:

```text
Same Credential
     ↓
Development
Test
Production
```

Prefer environment-specific credentials where appropriate.

---

# Artifact Security

Only trusted and validated artifacts should be deployed.

Maintain:

```text
Source
  ↓
Build
  ↓
Test
  ↓
Security Validation
  ↓
Artifact
  ↓
Deployment
```

Artifacts should be:

- Versioned
- Immutable
- Traceable
- Stored in approved repositories or registries

Do not deploy unknown or manually modified production artifacts.

---

# Artifact Integrity

Where supported and required, use mechanisms that verify artifact integrity and provenance.

Examples may include:

- Checksums
- Signing
- Provenance metadata
- Trusted registries
- Approved artifact repositories

The deployment process should be able to determine which source and build produced the deployed artifact.

---

# Dependency Security

Validate dependencies during the delivery process where required.

Applicable checks may include:

```text
Dependency Vulnerability Scan
Package Integrity Validation
License Validation
Unsupported Version Detection
```

Critical findings should be handled according to organizational security policy.

Do not silently ignore known critical dependency vulnerabilities.

---

# Source Security Validation

Before producing deployable artifacts, execute applicable security validation.

Examples:

```text
Secret Scanning
Static Application Security Testing
Dependency Scanning
Infrastructure-as-Code Scanning
Container Scanning
```

Use only checks relevant to the solution.

Follow:

```text
ci-cd-practices.md
```

---

# Container Security

When containers are used, validate:

- Trusted base image
- Vulnerabilities
- Unnecessary packages
- Non-root execution where possible
- No embedded secrets
- Immutable image version

Follow:

```text
containerization.md
```

Do not deploy container images that bypass required security gates.

---

# Infrastructure Security

Infrastructure changes should be security-validated before deployment.

Review applicable:

```text
Public Exposure
Firewall Rules
Network Security
Identity Permissions
Encryption
Secret Configuration
Storage Access
Diagnostic Configuration
```

Follow:

```text
infrastructure-as-code.md
```

Security-sensitive infrastructure changes require appropriate review.

---

# Production Access

Restrict direct production access.

Prefer:

```text
Approved Pipeline
      ↓
Production
```

over:

```text
Developer Workstation
      ↓
Production
```

Human production access should be limited to approved operational scenarios.

Avoid routine manual production changes.

---

# Pipeline Protection

Protect CI/CD pipelines from unauthorized modification.

Apply applicable:

- Repository permissions
- Branch protection
- Pull request reviews
- Required checks
- Environment permissions
- Deployment approvals
- Protected variables
- Protected secrets

Changes to production deployment logic should receive appropriate review.

---

# Untrusted Code

Treat code from untrusted branches, forks, or external contributions carefully.

Do not automatically expose production credentials or sensitive secrets to untrusted pipeline execution.

Separate:

```text
Code Validation
```

from:

```text
Privileged Deployment
```

where necessary.

---

# Deployment Approval

Use deployment approvals when required by:

- Production risk
- Security policy
- Compliance
- Change-management requirements

Approvals should verify meaningful evidence.

Do not use approvals as a substitute for automated security validation.

---

# Network Security

Deployment processes must respect the approved network architecture.

Do not:

- Open public access temporarily for deployment convenience.
- Disable firewall rules to make pipelines work.
- Bypass private connectivity without approval.
- Permanently whitelist broad network ranges without justification.

If deployment requires private resource access, use an approved connectivity approach.

---

# Configuration Security

Validate production configuration before deployment.

Check applicable:

```text
Environment Settings
Security Flags
Authentication Configuration
Authorization Configuration
External Endpoints
Logging Configuration
Secret References
```

Production should not accidentally use development or test configuration.

---

# Database Deployment Security

Database deployment identities should have only the permissions required for migration.

Avoid using unrestricted administrative database credentials where narrower migration permissions are sufficient.

Protect migration credentials and connection information.

Follow:

```text
database-deployment.md
```

---

# Logging and Auditability

Deployment activity should provide sufficient evidence to answer:

```text
What changed?
Which version?
Who or what triggered it?
Which environment?
When?
What security validation occurred?
Was deployment successful?
```

Preserve logs according to organizational retention requirements.

Do not include sensitive values in audit evidence.

---

# Security Failure Handling

When mandatory security validation fails:

```text
Stop Promotion
      ↓
Record Finding
      ↓
Assess Severity
      ↓
Remediate / Approved Exception
      ↓
Revalidate
      ↓
Continue
```

Do not bypass failed mandatory security gates merely to complete a release.

---

# Security Exceptions

When an organization permits security exceptions, they should be:

```text
Explicit
+
Risk Assessed
+
Approved
+
Time-Bounded Where Appropriate
+
Traceable
```

Do not silently suppress security findings.

---

# Rollback Security

Rollback artifacts must meet the same trust requirements as current release artifacts.

Do not rollback to:

- Known compromised artifacts
- Unsupported versions
- Artifacts with unacceptable vulnerabilities

Security must be considered when selecting the recovery approach.

Follow:

```text
rollback-recovery.md
```

---

# Security Checklist

Before deployment verify:

- [ ] Deployment identity follows least privilege.
- [ ] Personal credentials are not used by pipelines.
- [ ] Environment permissions are appropriately separated.
- [ ] No secrets are hardcoded.
- [ ] Secrets are obtained securely.
- [ ] Secrets are not exposed in logs or artifacts.
- [ ] Artifact is versioned and traceable.
- [ ] Required source security checks passed.
- [ ] Required dependency checks passed.
- [ ] Required container scans passed where applicable.
- [ ] Required IaC security checks passed where applicable.
- [ ] Production configuration is correct.
- [ ] Network security matches approved architecture.
- [ ] Required deployment approvals are complete.
- [ ] Production access is appropriately restricted.
- [ ] Security exceptions are documented and approved.

---

# Anti-Patterns

Avoid:

### Long-Lived Credentials by Default

Prefer managed, federated, workload, or short-lived identity mechanisms.

### Administrator Permissions for Pipelines

Apply least privilege.

### Secrets in Repository or Pipeline Files

Use approved secret management.

### Security Scanning After Deployment

Perform required checks before artifact promotion.

### Public Access for Deployment Convenience

Respect approved network security.

### Production Deployment From Developer Machines

Use controlled pipelines.

### Shared Credentials Across All Environments

Separate credentials where appropriate.

### Security Gate Bypass

Resolve findings or use the approved exception process.

### Logging Secrets for Troubleshooting

Never expose sensitive credentials in logs.

### Untrusted Artifact Deployment

Deploy only validated and traceable artifacts.

---

# Final Principle

Deployment security should follow:

```text
Trusted Source
      ↓
Secure Build
      ↓
Security Validation
      ↓
Trusted Artifact
      ↓
Secure Identity
      ↓
Least-Privilege Deployment
      ↓
Controlled Production Access
      ↓
Validation
      ↓
Audit Evidence
```

The objective is to ensure that **only trusted, validated changes are deployed by authorized identities to approved environments without exposing credentials, weakening security controls, or bypassing governance**.