# Production Readiness

## Purpose

Define the minimum validation required before a solution is considered ready for production deployment.

Production readiness confirms that the solution is:

```text
Functional
+
Tested
+
Secure
+
Deployable
+
Observable
+
Recoverable
+
Operationally Ready
```

Apply only checks relevant to the solution, architecture, and organizational requirements.

---

# Core Principles

Production readiness must be based on evidence.

Do not approve production readiness because:

- Development is complete.
- The application builds.
- Most tests pass.
- Deployment succeeds in a lower environment.

Production readiness requires validation across the complete solution.

---

# Readiness Inputs

Review applicable:

```text
docs/PRD.md
docs/Architecture-Design.md
docs/Test-Summary-Report.md
```

Also review:

- Build results
- Security results
- Deployment configuration
- Infrastructure readiness
- Database changes
- Known defects
- Monitoring configuration
- Recovery plan
- Release artifacts

---

# Functional Readiness

Verify that required functionality has been implemented and validated.

Confirm:

- Required Features are complete.
- Required User Stories are implemented.
- Acceptance Criteria are satisfied.
- Critical business workflows pass.
- No blocking functional defects remain.

Do not approve functionality that has not been tested.

---

# Test Readiness

Review the final testing results.

Verify applicable:

```text
Unit Tests
Integration Tests
API Tests
UI / End-to-End Tests
Regression Tests
Non-Functional Tests
```

Confirm:

- Required tests were executed.
- Critical tests passed.
- Failed tests were investigated.
- Blocking defects are resolved.
- Accepted defects have documented risk.

Use:

```text
docs/Test-Summary-Report.md
```

as primary test evidence where available.

---

# Security Readiness

Verify required security controls.

Check applicable:

- Authentication
- Authorization
- Least privilege
- Secret management
- Encryption
- Dependency security
- Application security scans
- Container security
- Infrastructure security
- Network restrictions

Critical unresolved security findings should block production unless an approved exception exists.

Follow:

```text
deployment-security.md
```

---

# Infrastructure Readiness

Verify production infrastructure matches:

```text
docs/Architecture-Design.md
```

Confirm applicable:

- Required resources exist.
- Capacity is appropriate.
- Networking is configured.
- Identity and permissions are configured.
- Security controls are active.
- Scaling is configured where required.
- Infrastructure deployment is repeatable.

Follow:

```text
infrastructure-as-code.md
```

---

# Environment Readiness

Verify the production environment is correctly configured.

Check:

- Production configuration
- Secret references
- External endpoints
- Identity configuration
- Network connectivity
- Environment-specific settings

Ensure production does not reference development or test resources unintentionally.

Follow:

```text
environment-management.md
```

---

# Application Deployment Readiness

Verify:

```text
Approved Artifact
+
Correct Version
+
Deployment Pipeline
+
Deployment Strategy
+
Deployment Permissions
+
Validation Process
```

The production artifact should already have passed required lower-environment validation.

Do not rebuild the application specifically for production unless technically required.

---

# Database Readiness

When database changes exist, verify:

- Migrations are version controlled.
- Migrations were tested.
- Application compatibility is confirmed.
- Destructive changes are understood.
- Data migration impact is understood.
- Backup/recovery is available where required.
- Deployment sequence is defined.

Follow:

```text
database-deployment.md
```

---

# Integration Readiness

Verify critical integrations are production-ready.

Check applicable:

```text
Production Endpoint
Authentication
Authorization
Connectivity
Configuration
Failure Handling
```

Ensure lower-environment integration endpoints are not accidentally configured for production.

---

# Observability Readiness

Production must provide sufficient visibility to detect and diagnose failures.

Verify applicable:

```text
Logs
Metrics
Traces
Health Checks
Dashboards
Alerts
```

Confirm critical failures can be detected.

Do not approve a production service that cannot be meaningfully monitored.

---

# Health Check Readiness

Verify meaningful health checks exist where required.

Consider:

```text
Startup
Liveness
Readiness
Dependency Health
```

Health checks should represent actual application readiness and should not expose sensitive information.

---

# Availability and Scaling

Validate architecture-defined availability requirements.

Check applicable:

- Instance count
- Redundancy
- Autoscaling
- Scaling limits
- Load distribution
- Dependency availability

Do not introduce high availability or autoscaling unless required by architecture or workload needs.

---

# Performance Readiness

Where performance requirements exist, verify evidence against approved targets.

Examples:

```text
Response Time
Throughput
Concurrency
Resource Utilization
```

Do not invent performance targets.

If required targets are undefined, report them as:

```text
TBD
```

---

# Backup and Recovery Readiness

Verify applicable backup and recovery mechanisms.

Check:

- Required backups exist.
- Retention is configured.
- Recovery method is understood.
- Critical restore procedures are available.
- Database recovery is considered.

Recovery requirements must follow approved architecture and business requirements.

---

# Deployment Recovery Readiness

Before production deployment verify:

```text
Previous Stable Version Available
+
Rollback / Recovery Method Defined
+
Database Impact Understood
+
Configuration Recovery Understood
+
Validation Steps Defined
```

Follow:

```text
rollback-recovery.md
```

Do not deploy high-risk production changes without an appropriate recovery approach.

---

# Release Readiness

Verify:

- Release version is assigned.
- Release scope is known.
- Artifact is immutable and traceable.
- Required quality gates passed.
- Required approvals are complete.
- Known issues are documented.
- Deployment strategy is confirmed.

Follow:

```text
release-management.md
```

---

# Operational Readiness

Ensure the production solution can be operated after deployment.

Verify applicable:

- Ownership is defined.
- Support responsibilities are understood.
- Critical operational procedures exist.
- Monitoring is accessible.
- Recovery procedures are available.
- Known limitations are documented.

Do not create unnecessary operational documentation for trivial procedures.

---

# Deployment Validation Readiness

Before deployment, define how production will be validated.

Include applicable:

```text
Version Check
Health Check
Smoke Tests
Critical Workflow
Integration Validation
Monitoring Validation
```

Follow:

```text
deployment-validation.md
```

Production validation must be executable immediately after deployment.

---

# Known Risks

Identify unresolved production risks.

For each significant risk capture:

| Field | Description |
|---|---|
| Risk | Identified production concern |
| Impact | Potential consequence |
| Mitigation | Existing control |
| Status | Open / Accepted / Resolved |
| Decision | Required action |

Do not hide known production risks.

---

# Blocking Conditions

Production readiness should normally fail when any applicable condition exists:

```text
Critical Requirement Not Implemented
Critical Test Failure
Critical Security Finding
Blocking Defect
Invalid Production Configuration
Missing Required Infrastructure
Failed Database Migration Validation
Missing Required Secret
Critical Integration Failure
No Recovery Approach for High-Risk Change
```

Approved organizational exceptions must be documented.

---

# Readiness Decision

Use one of the following outcomes:

```text
READY

READY WITH KNOWN RISKS

NOT READY

BLOCKED
```

### READY

All mandatory production-readiness criteria are satisfied.

### READY WITH KNOWN RISKS

Mandatory criteria are satisfied, but accepted non-blocking risks remain.

### NOT READY

One or more mandatory criteria are not satisfied.

### BLOCKED

Readiness cannot be determined because required validation or dependencies are unavailable.

Never report `READY` without supporting evidence.

---

# Production Readiness Checklist

## Application

- [ ] Required functionality is complete.
- [ ] Acceptance Criteria are satisfied.
- [ ] Critical workflows are validated.
- [ ] Approved production artifact exists.

## Testing

- [ ] Required automated tests passed.
- [ ] Required regression testing passed.
- [ ] Critical failures are resolved.
- [ ] Blocking defects are resolved.

## Security

- [ ] Required security checks passed.
- [ ] Secrets are securely managed.
- [ ] Production identities follow least privilege.
- [ ] Critical security findings are resolved or formally accepted.

## Infrastructure

- [ ] Production infrastructure is ready.
- [ ] Infrastructure matches approved architecture.
- [ ] Required networking works.
- [ ] Required capacity/scaling is configured.

## Database

- [ ] Required migrations are tested.
- [ ] Compatibility is verified.
- [ ] Data impact is understood.
- [ ] Recovery is available where required.

## Deployment

- [ ] Deployment strategy is confirmed.
- [ ] Deployment pipeline is ready.
- [ ] Correct artifact is identifiable.
- [ ] Required approvals are complete.
- [ ] Recovery approach is defined.

## Operations

- [ ] Health checks are available where required.
- [ ] Monitoring is available.
- [ ] Required alerts are configured.
- [ ] Support/ownership is understood.
- [ ] Production validation is defined.

---

# Anti-Patterns

Avoid:

### Build Passed = Production Ready

Build success validates only part of readiness.

### Deployment Passed = Production Ready

Runtime and operational validation are still required.

### Ignoring Known Defects

Evaluate and document their production impact.

### Security Review After Production

Required security validation must occur before release.

### No Monitoring

Production services must be observable according to their operational requirements.

### No Recovery Strategy

High-risk production changes require recovery planning.

### Checklist Without Evidence

Readiness decisions must be supported by actual results.

### Adding Unnecessary Controls

Use controls appropriate to architecture, risk, and organizational policy.

---

# Final Principle

Production readiness should follow:

```text
Requirements Complete
        +
Testing Complete
        +
Security Validated
        +
Infrastructure Ready
        +
Environment Ready
        +
Database Ready
        +
Deployment Ready
        +
Observability Ready
        +
Recovery Ready
        ↓
Production Readiness Decision
```

The objective is not to create a large readiness process.

The objective is to provide **clear evidence that the solution can be safely deployed, operated, monitored, and recovered in production**.