# Deployment Validation

## Purpose

Define standards for validating that a deployment completed successfully and the deployed solution is healthy, functional, correctly configured, and ready to serve its intended workload.

Deployment validation applies after changes to:

- Applications
- APIs
- Services
- Infrastructure
- Databases
- Containers
- Configuration

A successful deployment command does not mean the deployment is successful.

---

# Core Principles

Deployment validation should be:

```text
Automated Where Practical
+
Repeatable
+
Fast
+
Risk-Based
+
Observable
+
Traceable
```

Validate:

```text
Deployment
     ↓
Runtime Health
     ↓
Dependencies
     ↓
Critical Functionality
     ↓
Monitoring
     ↓
Accept or Recover
```

---

# Validation Scope

Determine validation based on the deployed changes.

Consider:

```text
Application
Infrastructure
Database
Configuration
Networking
Identity
External Integrations
```

Do not execute unrelated validation without meaningful value.

---

# Deployment Completion

First verify that the deployment process itself completed successfully.

Check applicable:

- Deployment command/result
- Artifact version
- Target environment
- Infrastructure deployment
- Database migration
- Configuration application
- Container/image version

Confirm the intended version was actually deployed.

---

# Application Startup

Verify that the deployed application starts successfully.

Check applicable:

```text
Process Started
Runtime Loaded
Configuration Loaded
Required Services Initialized
No Critical Startup Errors
```

Startup success alone is not sufficient for deployment acceptance.

---

# Health Checks

Execute available health checks.

Consider:

```text
Startup Health
Liveness
Readiness
Dependency Health
```

Health checks should confirm meaningful application readiness.

Example:

```text
Application Running
        +
Required Dependencies Available
        ↓
Ready
```

Do not treat a successful HTTP response from a meaningless endpoint as complete validation.

---

# Smoke Testing

Run a small set of high-value smoke tests after deployment.

Smoke tests should validate critical functionality such as:

```text
Application Accessible
Authentication Works
Critical API Works
Critical User Journey Works
Database Operation Works
Required Integration Works
```

Smoke tests should be fast and focused.

Comprehensive regression testing belongs in the testing process, not deployment validation.

---

# API Validation

When APIs are deployed, validate applicable:

- Endpoint accessibility
- Authentication
- Authorization
- Expected status behavior
- Critical request/response flow
- Dependency connectivity

Do not rerun the entire API test suite unless required by the release strategy.

---

# UI Validation

For browser applications, validate critical user-facing behavior.

Examples:

```text
Application Loads
Login Works
Critical Page Loads
Critical Workflow Completes
```

Use automated smoke tests where practical.

Full UI and end-to-end regression testing should remain part of the testing process.

---

# Database Validation

When database changes are deployed, verify:

```text
Migration Completed
Expected Schema Exists
Application Can Connect
Critical Read/Write Works
Data Integrity Is Preserved
```

Follow:

```text
database-deployment.md
```

Do not declare database deployment successful solely because the migration command completed.

---

# Infrastructure Validation

When infrastructure changes occur, verify applicable:

- Expected resources exist
- Resource configuration is correct
- Required endpoints are available
- Identity permissions work
- Network connectivity works
- Security controls remain active
- Monitoring is available

Compare the result with:

```text
docs/Architecture-Design.md
```

Do not accept infrastructure that differs unexpectedly from the approved design.

---

# Configuration Validation

Verify that the deployed environment uses the intended configuration.

Check applicable:

```text
Environment Settings
Feature Settings
Service Endpoints
Database References
Secret References
Runtime Configuration
```

Ensure production does not accidentally use development or test configuration.

Do not expose secret values while validating configuration.

---

# Identity Validation

Verify required application identities can access only the resources they need.

Validate applicable:

```text
Authentication
Authorization
Managed / Workload Identity
Resource Access
```

Permission failures should be investigated rather than solved by granting broad access.

---

# Network Validation

Where networking is relevant, verify required connectivity.

Examples:

```text
Client → Application

Application → Database

Application → External Service

Application → Private Resource
```

Validate:

- DNS resolution
- Routing
- Firewall/access rules
- Private connectivity

Do not disable network security controls merely to make validation pass.

---

# Integration Validation

Validate critical external integrations affected by the deployment.

Verify applicable:

```text
Connectivity
Authentication
Request / Response
Failure Handling
```

Use appropriate non-production or production-safe validation methods.

Avoid creating unintended business transactions during validation.

---

# Monitoring Validation

Confirm that required telemetry is functioning.

Check applicable:

```text
Logs
Metrics
Traces
Health Signals
Alerts
```

Review for:

- Startup failures
- Unexpected exceptions
- Increased errors
- Dependency failures
- Abnormal latency
- Resource problems

Do not declare deployment healthy when critical monitoring indicates failure.

---

# Deployment Strategy Validation

Validation should support the selected deployment strategy.

## Rolling

Validate new instances before continuing rollout.

```text
Deploy Instance
      ↓
Validate
      ↓
Continue Rollout
```

## Blue-Green

Validate the new environment before switching traffic.

```text
Deploy Green
      ↓
Validate Green
      ↓
Switch Traffic
      ↓
Validate Production
```

## Canary

Validate each controlled exposure stage before increasing traffic.

```text
Small Exposure
      ↓
Validate
      ↓
Increase Exposure
```

## Slot-Based

Validate the staging slot before swap and production after swap.

```text
Deploy Staging
      ↓
Warm Up
      ↓
Validate
      ↓
Swap
      ↓
Validate Production
```

Follow:

```text
deployment-strategy.md
```

---

# Validation Failure

When critical deployment validation fails:

```text
Detect Failure
      ↓
Stop Promotion
      ↓
Preserve Evidence
      ↓
Assess Impact
      ↓
Determine Cause
      ↓
Rollback / Recover / Fix
      ↓
Revalidate
```

Follow:

```text
rollback-recovery.md
```

Do not continue rollout when mandatory validation has failed.

---

# Validation Results

Use clear results:

```text
PASS
FAIL
BLOCKED
NOT RUN
```

Definitions:

```text
PASS
Validation executed successfully.

FAIL
Validation executed and expected behavior was not observed.

BLOCKED
Validation could not execute because of a known blocker.

NOT RUN
Validation was not executed.
```

Never report `PASS` without actual validation evidence.

---

# Deployment Evidence

Record applicable:

```text
Release Version
Artifact Version
Environment
Deployment Time
Validation Performed
Validation Results
Failed Checks
Recovery Actions
Final Deployment Status
```

Evidence should be sufficient for troubleshooting and release traceability.

---

# Deployment Acceptance

A deployment may be accepted when:

```text
Correct Version Deployed
+
Application Healthy
+
Critical Dependencies Healthy
+
Required Smoke Tests Passed
+
Required Database Validation Passed
+
Monitoring Healthy
+
No Blocking Deployment Issue
```

The exact acceptance criteria depend on the solution and release requirements.

---

# Validation Checklist

After deployment verify applicable:

- [ ] Correct artifact/version is deployed.
- [ ] Deployment completed successfully.
- [ ] Application starts successfully.
- [ ] Health checks pass.
- [ ] Critical dependencies are reachable.
- [ ] Smoke tests pass.
- [ ] Critical API operations work.
- [ ] Critical UI workflow works where applicable.
- [ ] Database migration completed where applicable.
- [ ] Critical database operations work.
- [ ] Configuration is correct.
- [ ] Required identities work.
- [ ] Required network connectivity works.
- [ ] Critical integrations work.
- [ ] Logs and metrics are available.
- [ ] No critical runtime errors are observed.
- [ ] Deployment result is recorded.

---

# Anti-Patterns

Avoid:

### Deployment Command = Success

Runtime behavior must also be validated.

### Full Regression During Every Deployment

Use focused deployment validation; comprehensive testing belongs in the testing lifecycle.

### Health Endpoint Only

Combine health checks with critical functional validation.

### Ignoring Monitoring

Runtime telemetry is part of deployment validation.

### Broad Permission Fixes

Investigate identity failures instead of granting excessive access.

### Disabling Network Security

Do not weaken security to pass validation.

### Continuing After Critical Failure

Stop promotion and recover.

### Reporting Unexecuted Validation as Passed

Use `NOT RUN` or `BLOCKED`.

---

# Final Principle

Deployment validation should follow:

```text
Deploy
  ↓
Verify Version
  ↓
Verify Startup
  ↓
Verify Health
  ↓
Verify Dependencies
  ↓
Run Smoke Tests
  ↓
Verify Monitoring
  ↓
PASS?
 ├── Yes → Accept Deployment
 └── No  → Stop and Recover
```

The objective is to provide **fast and reliable evidence that the deployed solution is healthy and ready for use without duplicating the complete testing lifecycle**.