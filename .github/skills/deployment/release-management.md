# Release Management

## Purpose

Define standards for planning, controlling, deploying, validating, and tracking software releases across environments.

Release management ensures that production changes are:

```text
Approved
+
Traceable
+
Tested
+
Controlled
+
Recoverable
```

Use the release process appropriate to the solution's risk and organizational governance requirements.

---

# Core Principles

Every release should be:

- Versioned
- Traceable
- Tested
- Approved where required
- Based on immutable artifacts
- Deployable through controlled automation
- Validated after deployment
- Recoverable

Prefer:

```text
Small
+
Frequent
+
Low-Risk
+
Automated
```

releases where practical.

---

# Release Inputs

Before creating a release, verify applicable:

```text
Approved Requirements
Approved Architecture
Implemented Changes
Test Results
Security Results
Deployment Artifacts
Infrastructure Changes
Database Changes
Configuration Changes
Known Defects
Rollback Plan
```

Do not release changes whose critical dependencies or validation status are unknown.

---

# Release Identification

Every release must have a unique identifier.

Examples:

```text
1.0.0
2.3.1
2026.08.15
release-105
```

Use the organization's established versioning convention.

Do not introduce a different versioning model when one already exists.

---

# Versioning

Use a consistent versioning strategy.

When semantic versioning is appropriate:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
2.4.1
```

Where:

```text
MAJOR → Breaking change
MINOR → Backward-compatible feature
PATCH → Backward-compatible fix
```

Other versioning approaches are acceptable when defined by organizational standards.

---

# Release Scope

Clearly identify what is included in the release.

Capture applicable:

- Features
- User Stories
- Defects
- Configuration changes
- Database changes
- Infrastructure changes
- Dependency changes

Preserve existing requirement identifiers.

Example:

```text
Release 2.4.0

FEAT-004
US-021
US-022
DEF-018
```

Avoid including unrelated changes without clear justification.

---

# Artifact Management

A release should reference immutable, validated artifacts.

Examples:

```text
Application Package
Container Image
Infrastructure Version
Database Migration Version
```

Maintain traceability:

```text
Release
   ↓
Artifact Version
   ↓
Build
   ↓
Source Commit
```

Do not rebuild an approved release artifact separately for production.

Follow:

```text
ci-cd-practices.md
```

---

# Release Readiness

Before promotion, confirm applicable quality gates.

```text
Build Passed
      ↓
Required Tests Passed
      ↓
Security Checks Passed
      ↓
Artifact Published
      ↓
Deployment Validation Ready
      ↓
Required Approval
      ↓
Release Ready
```

Known failures must be evaluated before release.

Critical unresolved defects should normally block production release.

---

# Release Approval

Use approval gates only where required by:

- Organizational policy
- Compliance
- Production risk
- Change-management process

Approval should confirm that required evidence has been reviewed.

Do not add unnecessary manual approvals to low-risk automated releases.

Never bypass mandatory approvals without an approved exception.

---

# Release Promotion

Promote the same validated artifact through environments where practical.

```text
Validated Artifact
      ↓
Development
      ↓
Test
      ↓
UAT / Staging
      ↓
Production
```

Each promotion should satisfy required environment gates.

Follow:

```text
environment-management.md
```

---

# Deployment Strategy

Release management must use the deployment strategy selected for the solution.

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

Release management must not independently redefine the deployment architecture.

---

# Database and Infrastructure Changes

A release may include:

```text
Application
+
Infrastructure
+
Database
+
Configuration
```

Determine the required deployment sequence before release.

Example:

```text
Infrastructure
      ↓
Compatible Database Migration
      ↓
Application
      ↓
Post-Deployment Migration
      ↓
Validation
```

The exact sequence depends on the architecture.

Follow:

```text
infrastructure-as-code.md
database-deployment.md
```

---

# Release Notes

Generate concise release notes for meaningful releases.

Include applicable:

```text
Release Version
Release Date
Features
Fixes
Important Changes
Known Issues
Deployment Considerations
```

Do not copy entire requirement documents into release notes.

Release notes should communicate what changed and any important operational impact.

---

# Known Issues

Document unresolved issues that are accepted for release.

For each significant issue capture:

```text
Issue
Impact
Workaround if available
Risk
```

Do not hide known defects from release stakeholders.

---

# Production Release

Production releases should occur through controlled deployment mechanisms.

Before production deployment verify:

- Correct artifact
- Correct environment
- Required approvals
- Configuration readiness
- Secret availability
- Infrastructure readiness
- Database migration readiness
- Monitoring availability
- Rollback/recovery readiness

Avoid routine manual production deployment.

---

# Post-Deployment Validation

A release is not complete when deployment execution finishes.

Validate applicable:

```text
Deployment Success
      ↓
Health Checks
      ↓
Smoke Tests
      ↓
Critical Workflows
      ↓
Monitoring
      ↓
Release Accepted
```

Follow:

```text
deployment-validation.md
```

If validation fails, apply the defined recovery process.

---

# Rollback and Recovery

Before production release, define the recovery approach.

Possible actions:

```text
Previous Artifact
Previous Container Image
Slot Swap Back
Traffic Switch
Configuration Recovery
Infrastructure Recovery
Feature Disablement
Forward Fix
```

Database impact must be evaluated separately.

Follow:

```text
rollback-recovery.md
```

Do not assume every release can be safely rolled back.

---

# Release Failure

When a release fails:

```text
Stop Progression
      ↓
Preserve Evidence
      ↓
Assess Impact
      ↓
Recover / Rollback
      ↓
Validate Service
      ↓
Identify Cause
      ↓
Correct
      ↓
Revalidate
```

Do not continue promoting a failed release to additional environments.

---

# Release Traceability

Maintain traceability where applicable:

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
```

A production release should be traceable back to the source changes that created it.

---

# Release Evidence

Capture appropriate:

```text
Release Version
Artifact Version
Source Version
Environment
Deployment Time
Deployment Result
Test Results
Security Results
Approval Status
Validation Result
Rollback Result if applicable
```

Evidence should support troubleshooting, governance, and audit requirements.

---

# Hotfix Releases

Use a controlled hotfix process for urgent production fixes.

Typical flow:

```text
Production Issue
      ↓
Create Minimal Fix
      ↓
Review
      ↓
Required Tests
      ↓
Security Validation
      ↓
Build Artifact
      ↓
Deploy
      ↓
Validate
      ↓
Merge / Reconcile
```

Urgency does not justify removing essential safety controls.

Keep hotfix scope minimal.

---

# Release Checklist

Before release:

- [ ] Release scope is defined.
- [ ] Release version is assigned.
- [ ] Source changes are traceable.
- [ ] Required tests passed.
- [ ] Required security checks passed.
- [ ] Known defects are evaluated.
- [ ] Artifact is immutable and identifiable.
- [ ] Infrastructure changes are understood.
- [ ] Database changes are understood.
- [ ] Configuration is ready.
- [ ] Required approvals are complete.
- [ ] Deployment strategy is confirmed.
- [ ] Monitoring is available.
- [ ] Recovery approach is defined.

After deployment:

- [ ] Correct version was deployed.
- [ ] Health checks passed.
- [ ] Smoke tests passed.
- [ ] Critical workflows passed.
- [ ] Monitoring is healthy.
- [ ] Release evidence is recorded.
- [ ] Release notes are updated where required.
- [ ] Release status is finalized.

---

# Anti-Patterns

Avoid:

### Rebuilding for Production

Promote the already validated artifact.

### Unversioned Releases

Every release should be identifiable.

### Large Unrelated Releases

Keep release scope controlled where practical.

### Release Without Test Evidence

Required validation must be known before promotion.

### Release Without Recovery Planning

Production changes need an appropriate recovery strategy.

### Hidden Known Issues

Document accepted release risks.

### Manual Production Changes

Use controlled deployment processes.

### Approval for Everything

Use manual gates only when they provide required governance or risk control.

### Bypassing Controls for Hotfixes

Urgent changes still require appropriate validation.

---

# Final Principle

Release management should follow:

```text
Approved Changes
      ↓
Build
      ↓
Test
      ↓
Secure
      ↓
Version
      ↓
Publish Artifact
      ↓
Approve Where Required
      ↓
Promote
      ↓
Deploy
      ↓
Validate
      ↓
Accept or Recover
```

The objective is to ensure every release is **controlled, traceable, validated, secure, and recoverable without unnecessary release-process complexity**.