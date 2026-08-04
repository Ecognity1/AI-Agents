# Rollback and Recovery

## Purpose

Define standards for safely recovering applications, infrastructure, configuration, and databases when a deployment fails or causes unacceptable production behavior.

Rollback and recovery must be planned before production deployment.

The objective is to restore a stable service while protecting:

- Availability
- Data integrity
- Security
- Business operations

---

# Core Principles

Recovery should be:

```text
Planned
+
Fast
+
Controlled
+
Validated
+
Traceable
```

Every production deployment should answer:

```text
What can fail?
      ↓
How will failure be detected?
      ↓
Can we rollback safely?
      ↓
If not, how will we recover?
```

Do not assume every change can be reversed.

---

# Rollback vs Recovery

## Rollback

Return to a previously validated version or configuration.

Examples:

```text
Previous Application Artifact
Previous Container Image
Slot Swap Back
Traffic Switch
Previous Configuration
```

## Recovery

Restore service when direct rollback is unsafe or impossible.

Examples:

```text
Forward Fix
Database Restore
Configuration Repair
Infrastructure Recovery
Feature Disablement
```

Select the approach based on actual failure impact.

---

# Recovery Planning

Before production deployment identify:

- Rollback trigger
- Recovery method
- Previous stable version
- Database impact
- Infrastructure impact
- Configuration impact
- External side effects
- Validation steps
- Required permissions

Higher-risk changes require stronger recovery planning.

---

# Rollback Triggers

Rollback or recovery may be required when:

```text
Application Fails to Start
Health Checks Fail
Critical Smoke Tests Fail
Error Rate Increases Significantly
Critical User Journey Fails
Data Integrity Is At Risk
Security Control Fails
Critical Dependency Fails
```

Use defined requirements and monitoring thresholds where available.

Do not invent operational thresholds when none have been approved.

---

# Application Rollback

Application rollback should use a previously validated artifact.

Typical flow:

```text
Failure Detected
      ↓
Stop Deployment / Traffic Progression
      ↓
Select Previous Stable Artifact
      ↓
Redeploy / Redirect Traffic
      ↓
Validate
      ↓
Monitor
```

Maintain traceability between deployed and previous versions.

---

# Container Rollback

For containerized applications:

```text
Current Image
      ↓
Failure
      ↓
Previous Validated Image
      ↓
Deploy
      ↓
Validate
```

Use immutable image versions.

Do not rely only on mutable tags such as:

```text
latest
```

Follow:

```text
containerization.md
```

---

# Slot-Based Rollback

When deployment slots are used:

```text
Production → New Version
      ↓
Failure
      ↓
Swap Back
      ↓
Previous Version
      ↓
Validate
```

Before swapping back, evaluate:

- Database changes
- Configuration changes
- External side effects
- Background processing

A slot swap does not reverse these automatically.

---

# Blue-Green Recovery

For blue-green deployments:

```text
Blue → Previous Stable
Green → New Version
```

If Green fails after traffic switching:

```text
Green
  ↓
Failure
  ↓
Redirect Traffic
  ↓
Blue
```

Keep the previous environment available until the new release has been sufficiently validated.

---

# Canary Recovery

For canary deployments:

```text
Limited Traffic → New Version
```

If validation fails:

```text
Stop Progression
      ↓
Route Traffic to Stable Version
      ↓
Validate
      ↓
Investigate
```

Do not continue increasing traffic after defined failure criteria are reached.

---

# Configuration Recovery

Configuration changes may fail independently of application code.

Maintain controlled configuration so previous known-good values can be restored.

Typical flow:

```text
Configuration Change
      ↓
Failure
      ↓
Restore Previous Configuration
      ↓
Restart / Reload if required
      ↓
Validate
```

Do not store recovery configuration containing secrets in insecure locations.

---

# Infrastructure Recovery

Infrastructure changes may require:

```text
Reapply Previous IaC
Forward Fix
Resource Restoration
State Recovery
Backup Restoration
```

Infrastructure rollback is not always automatically safe.

Stateful resource replacement or deletion requires particular care.

Follow:

```text
infrastructure-as-code.md
```

Do not blindly apply an old infrastructure version without reviewing its impact.

---

# Database Recovery

Database recovery must be handled separately from application rollback.

Possible approaches:

```text
Reverse Migration
Forward Migration
Backup Restore
Data Repair
Compatibility Fix
```

Before recovery determine:

- Whether data changed after deployment
- Whether reverse migration is safe
- Whether data would be lost
- Whether previous application version supports current schema
- Whether restore affects newer transactions

Follow:

```text
database-deployment.md
```

Never automatically rollback destructive database changes without understanding the data impact.

---

# Forward Fix

Use a forward fix when rollback is more dangerous or impossible.

Typical flow:

```text
Failure
  ↓
Identify Minimal Correction
  ↓
Implement
  ↓
Validate
  ↓
Deploy
  ↓
Confirm Recovery
```

Forward fixes should remain focused on restoring stable service.

Do not combine unrelated enhancements with an emergency fix.

---

# Feature Disablement

When feature flags or equivalent controls exist, disabling a faulty feature may provide faster recovery.

```text
Release
   ↓
Feature Failure
   ↓
Disable Feature
   ↓
Restore Stable Behavior
```

Use this only when the application was designed to support safe feature disablement.

Feature flags are not a substitute for a proper rollback strategy.

---

# Failed Deployment Handling

When deployment fails:

```text
Stop
  ↓
Preserve Evidence
  ↓
Assess User / Data Impact
  ↓
Determine Recovery Strategy
  ↓
Rollback / Recover
  ↓
Validate
  ↓
Monitor
  ↓
Investigate Root Cause
```

Do not repeatedly redeploy or retry without understanding the failure.

---

# Partial Deployment

A failure may leave only part of the system updated.

Identify:

```text
What Changed?
What Did Not Change?
What Data Changed?
Which Version Is Running?
Which Dependencies Were Modified?
```

Restore the system to a known compatible state.

Do not assume failed deployment means no changes occurred.

---

# Recovery Validation

After rollback or recovery verify applicable:

```text
Application Healthy
      ↓
Dependencies Healthy
      ↓
Data Integrity Verified
      ↓
Smoke Tests Passed
      ↓
Critical Workflows Passed
      ↓
Monitoring Stable
```

Recovery is not complete merely because the previous version was deployed.

Follow:

```text
deployment-validation.md
```

---

# Recovery Evidence

Record applicable:

```text
Failed Release
Failure Time
Failure Symptoms
Recovery Decision
Recovery Method
Recovered Version
Recovery Result
Validation Result
Outstanding Risks
```

Preserve relevant logs and deployment evidence for investigation.

---

# CI/CD Integration

Where practical, pipelines should support controlled recovery actions.

Examples:

```text
Redeploy Previous Artifact
Deploy Previous Image
Swap Slot Back
Restore Configuration
Execute Approved Recovery Process
```

Recovery operations must use the same security and access controls as normal deployments.

Follow:

```text
ci-cd-practices.md
deployment-security.md
```

---

# Recovery Testing

Critical recovery procedures should be validated where justified.

Test applicable:

- Previous-version deployment
- Slot swap-back
- Configuration restoration
- Backup restoration
- Database recovery
- Infrastructure recovery

A recovery procedure that has never been validated carries additional operational risk.

---

# Rollback Decision

Use rollback when:

```text
Previous Version Is Safe
+
Database Is Compatible
+
External Effects Are Reversible
+
Rollback Restores Service Faster
```

Use recovery or forward fix when:

```text
Rollback Risks Data Loss
OR
Database Is Incompatible
OR
External Effects Cannot Be Reversed
OR
Previous Version Cannot Safely Run
```

Choose the safest recovery path, not automatically the fastest command.

---

# Anti-Patterns

Avoid:

### No Recovery Plan

Define recovery before production deployment.

### Assuming Everything Is Reversible

Database and infrastructure changes may not be.

### Blind Rollback

Assess current system and data state first.

### Retrying Failed Deployment Repeatedly

Understand the root cause before retrying.

### Deleting Previous Artifacts Immediately

Retain required stable versions according to release policy.

### Rollback Without Validation

Always validate recovered service.

### Emergency Changes Without Traceability

Record recovery actions and results.

### Treating Database Rollback Like Application Rollback

Database recovery requires separate impact analysis.

---

# Checklist

Before deployment:

- [ ] Previous stable version is identifiable.
- [ ] Rollback/recovery approach is defined.
- [ ] Rollback triggers are understood.
- [ ] Required previous artifacts are available.
- [ ] Database impact is understood.
- [ ] Infrastructure impact is understood.
- [ ] Configuration recovery is possible where required.
- [ ] External side effects are considered.
- [ ] Required permissions are available securely.
- [ ] Recovery validation steps are defined.

During failure:

- [ ] Deployment progression is stopped.
- [ ] Evidence is preserved.
- [ ] User and data impact are assessed.
- [ ] Partial deployment state is understood.
- [ ] Safe recovery method is selected.
- [ ] Recovery is executed through controlled mechanisms.

After recovery:

- [ ] Application health is verified.
- [ ] Dependencies are verified.
- [ ] Data integrity is verified where applicable.
- [ ] Smoke tests pass.
- [ ] Critical workflows work.
- [ ] Monitoring is stable.
- [ ] Recovery evidence is recorded.
- [ ] Root cause requires follow-up.

---

# Final Principle

Rollback and recovery should follow:

```text
Detect Failure
      ↓
Stop Progression
      ↓
Assess Impact
      ↓
Select Safest Recovery
      ↓
Rollback / Recover / Forward Fix
      ↓
Validate
      ↓
Monitor
      ↓
Record Evidence
```

The objective is to **restore a known stable service quickly without creating additional risk to data, infrastructure, security, or business operations**.