# CI/CD Practices

## Purpose

Define reusable standards for building secure, reliable, repeatable, and maintainable Continuous Integration and Continuous Delivery pipelines.

This skill applies across technologies, platforms, cloud providers, and deployment targets.

CI/CD pipelines should automate:

```text
Code Change
    ↓
Build
    ↓
Validate
    ↓
Test
    ↓
Security Checks
    ↓
Package
    ↓
Publish Artifact
    ↓
Deploy
    ↓
Validate Deployment
```

Only stages applicable to the solution should be included.

---

# Repository Platform and Required Pipelines

Determine the repository/CI/CD platform from explicit user input or reliable repository context before creating pipeline files. If it is unknown or ambiguous, ask the user. Never assume it.

Use:

```text
GitHub â†’ GitHub Actions under .github/workflows/
Azure DevOps â†’ Azure Pipelines YAML using repository conventions
```

Create or update both of the following when deployment is in scope:

1. Infrastructure CI/CD for the selected IaC lifecycle: tool setup, secure authentication, initialization, formatting, validation, configured security/static checks, plan/preview, controlled apply, outputs, evidence, and failure reporting.
2. Application CI/CD derived from the actual technology stack and target: dependency restore, build, tests, artifact or image generation, publish/push, required database migration, deployment, configuration, verification, and health checks.

Keep infrastructure deployment before application deployment. Use pipeline/workflow execution as the primary deployment mechanism when repository access, credentials, permissions, and tooling allow. Manual CLI deployment is permitted only for a documented bootstrap or recovery operation.

Do not stop after generating YAML. Trigger and monitor the infrastructure workflow/pipeline, validate infrastructure, then trigger and monitor the application workflow/pipeline. Capture run identifiers, stages, results, logs, outputs, artifacts, and validation evidence. If execution is unavailable, report the exact blocker.

---

# Core Principles

CI/CD pipelines must be:

- Automated where practical
- Repeatable
- Secure
- Traceable
- Environment-aware
- Fail-fast
- Recoverable
- Easy to understand

Prefer:

```text
Simple Pipeline
+
Required Quality Gates
+
Controlled Deployment
```

Avoid unnecessary pipeline complexity.

---

# Continuous Integration

CI validates every meaningful code change before it becomes deployable.

Typical CI flow:

```text
Checkout
    ↓
Restore Dependencies
    ↓
Build
    ↓
Static Analysis
    ↓
Unit Tests
    ↓
Integration Tests where applicable
    ↓
Security Validation
    ↓
Package
    ↓
Publish Artifact
```

The exact stages depend on the application.

---

# Build Validation

The pipeline must verify that the application can be built successfully.

Applicable activities may include:

- Dependency restoration
- Compilation
- Linting
- Formatting validation
- Static analysis
- Package validation

Build failures must stop artifact promotion.

---

# Automated Testing

Execute applicable automated tests during CI.

Examples:

```text
Unit Tests
Integration Tests
API Tests
Component Tests
```

Long-running or environment-dependent tests may execute in later validation stages.

Failed mandatory tests must block promotion.

Do not disable or bypass tests simply to make the pipeline succeed.

---

# Security Validation

Apply security checks appropriate to the application and organizational standards.

Examples:

- Secret scanning
- Static application security testing
- Dependency vulnerability scanning
- Container image scanning
- Infrastructure-as-Code scanning

Critical findings should block promotion according to organization policy.

Do not expose secrets in pipeline logs.

---

# Artifact Management

Create immutable, versioned deployment artifacts.

Examples:

```text
Application Package
Container Image
Library Package
Infrastructure Artifact
```

Each artifact should be traceable to:

```text
Source Version
+
Build
+
Test Results
+
Artifact Version
```

Prefer:

```text
Build Once
    ↓
Validate
    ↓
Publish
    ↓
Promote Same Artifact
```

Do not rebuild application artifacts independently for each environment unless technically required.

---

# Continuous Delivery

CD promotes validated artifacts through approved environments.

Typical flow:

```text
Validated Artifact
      ↓
Development
      ↓
Test
      ↓
Staging / UAT
      ↓
Production
```

Actual environments depend on project requirements.

Do not create unnecessary environments.

---

# Environment Promotion

Environment-specific behavior should come from controlled configuration rather than application rebuilds.

Prefer:

```text
Same Artifact
+
Environment Configuration
```

over:

```text
Different Build Per Environment
```

Promotion should occur only after required validation succeeds.

---

# Pipeline Quality Gates

Apply gates based on risk and organizational policy.

Possible gates include:

```text
Build Success
Automated Test Success
Security Validation
Artifact Validation
Deployment Validation
Approval
```

Manual approvals should be used only where required for governance or deployment risk.

Do not add approvals that provide no meaningful control.

---

# Pipeline Separation

Separate CI and deployment concerns logically.

Example:

```text
CI
├── Build
├── Test
├── Scan
└── Publish

CD
├── Retrieve Artifact
├── Configure
├── Deploy
├── Validate
└── Promote / Rollback
```

This improves reuse and allows the same artifact to be promoted safely.

---

# Infrastructure Deployment

When infrastructure changes are required, integrate Infrastructure as Code into the delivery process.

Typical flow:

```text
Validate IaC
    ↓
Security Check
    ↓
Generate Change Plan
    ↓
Review / Approval where required
    ↓
Apply
    ↓
Validate Infrastructure
```

Detailed guidance belongs in:

```text
infrastructure-as-code.md
```

Do not create or modify production infrastructure manually when managed Infrastructure as Code is the established source of truth.

---

# Database Changes

Database changes must be coordinated with application deployment.

Pipeline sequencing may require:

```text
Pre-Deployment Migration
        ↓
Application Deployment
        ↓
Post-Deployment Migration
```

Migration strategy must support the selected deployment approach.

Detailed guidance belongs in:

```text
database-deployment.md
```

---

# Deployment Strategy

The CD pipeline must implement the deployment strategy selected for the solution.

Examples:

```text
Recreate
Rolling
Blue-Green
Canary
Slot-Based
```

Follow:

```text
deployment-strategy.md
```

Do not let pipeline tooling determine architecture or deployment strategy.

---

# Deployment Validation

A successful deployment command does not mean the release is healthy.

After deployment execute applicable:

```text
Health Check
    ↓
Smoke Tests
    ↓
Critical Workflow Validation
    ↓
Monitoring Validation
```

Detailed guidance belongs in:

```text
deployment-validation.md
```

---

# Rollback

Production pipelines must support an appropriate recovery approach.

Examples:

- Redeploy previous artifact
- Traffic switch
- Slot swap
- Container image rollback
- Infrastructure rollback
- Feature disablement
- Forward fix

Detailed guidance belongs in:

```text
rollback-recovery.md
```

Do not automatically retry failed production deployments without understanding the failure.

---

# Secrets and Credentials

Never store credentials directly in pipeline definitions.

Use approved secret-management mechanisms.

Prefer short-lived or workload identities over long-lived credentials where supported.

Protect:

```text
Deployment Credentials
API Keys
Tokens
Certificates
Database Credentials
Cloud Credentials
```

Never print sensitive values to pipeline logs.

---

# Pipeline Permissions

Apply least privilege.

Pipeline identities should receive only permissions required for their deployment responsibilities.

Separate permissions between environments where appropriate.

Production access should be more restricted than lower environments.

---

# Pipeline Triggers

Use triggers appropriate to the repository workflow.

Examples:

```text
Pull Request
Branch Update
Merge
Tag
Release
Manual Trigger
Scheduled Trigger
```

Production deployments should occur only through controlled release paths.

Avoid unexpected production deployments from ordinary development activity.

---

# Branch and Release Protection

Protect important branches and release paths using applicable:

- Pull request reviews
- Required checks
- Test validation
- Security checks
- Deployment approvals

Do not bypass required controls without an approved exception process.

---

# Failure Handling

When a pipeline stage fails:

```text
Stop
  ↓
Preserve Logs / Evidence
  ↓
Identify Failure
  ↓
Correct Root Cause
  ↓
Revalidate
  ↓
Continue / Redeploy
```

Do not hide failures or force later stages to continue when mandatory validation has failed.

---

# Pipeline Observability

Pipeline execution should provide enough information to determine:

```text
What was deployed?
Which version?
To which environment?
When?
Did validation pass?
Who or what triggered it?
```

Preserve deployment evidence according to organizational requirements.

---

# Anti-Patterns

Avoid:

### Build Separately Per Environment

Promote the same validated artifact where practical.

### Secrets in Pipeline Files

Use secure secret management.

### Disabled Tests

Do not bypass failing tests to obtain successful builds.

### Uncontrolled Production Deployment

Production deployment must use controlled release paths.

### Manual Infrastructure Drift

Use Infrastructure as Code where infrastructure is managed through IaC.

### Pipeline Duplication

Reuse templates, components, or shared workflows where appropriate.

### Tool-Driven Architecture

CI/CD tooling must implement the approved architecture, not redefine it.

---

# CI/CD Checklist

Before considering the pipeline complete verify:

- [ ] Source changes trigger appropriate validation.
- [ ] Dependencies restore successfully.
- [ ] Build succeeds.
- [ ] Required automated tests execute.
- [ ] Required security checks execute.
- [ ] Failed mandatory checks stop promotion.
- [ ] Artifacts are versioned and immutable.
- [ ] The same artifact can be promoted across environments where practical.
- [ ] Environment configuration is externalized.
- [ ] Secrets are protected.
- [ ] Pipeline permissions follow least privilege.
- [ ] Deployment strategy matches architecture.
- [ ] Deployment validation exists.
- [ ] Rollback/recovery approach exists.
- [ ] Production deployment is controlled.
- [ ] Deployment results are traceable.

---

# Final Principle

CI/CD should follow:

```text
Code
 ↓
Build
 ↓
Test
 ↓
Secure
 ↓
Package
 ↓
Publish
 ↓
Promote
 ↓
Deploy
 ↓
Validate
 ↓
Accept or Recover
```

The objective is not to create the largest pipeline.

The objective is to create the **smallest reliable pipeline that safely builds, validates, secures, and deploys the solution**.
