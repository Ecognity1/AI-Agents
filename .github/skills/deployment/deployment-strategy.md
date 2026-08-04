# Deployment Strategy

## Purpose

Define reusable standards for selecting and executing safe, repeatable, controlled, and recoverable software deployment strategies.

This skill applies to:

- Web Applications
- APIs
- Backend Services
- Worker Services
- Cloud Applications
- Containerized Applications
- Kubernetes Workloads
- Serverless Applications
- Platform Services
- Distributed Systems
- Enterprise Applications

The deployment strategy must be selected based on architecture, risk, availability requirements, operational capability, and rollback needs.

Do not select a deployment strategy simply because it is commonly used.

---

# Core Principles

Every deployment should be:

```text
Repeatable
+
Automated Where Practical
+
Controlled
+
Observable
+
Validated
+
Recoverable
+
Secure
```

Prefer:

```text
Simple Deployment
        +
Meets Availability Requirements
        +
Supports Safe Recovery
```

Avoid unnecessary deployment complexity.

---

# Deployment Inputs

Before selecting a strategy, understand:

```text
Application Architecture
Hosting Model
Availability Requirements
Downtime Tolerance
Traffic Pattern
Deployment Frequency
Database Changes
State Management
External Dependencies
Rollback Requirements
Infrastructure Constraints
Operational Capability
```

The approved architecture should normally be obtained from:

```text
docs/Architecture-Design.md
```

Do not redesign the hosting architecture during deployment.

---

# Deployment Strategy Selection

Select the deployment strategy based on requirements and risk.

Common strategies include:

```text
Recreate
Rolling
Blue-Green
Canary
Slot-Based
Immutable
Progressive Delivery
```

Not every application requires an advanced deployment strategy.

---

# Recreate Deployment

A recreate deployment replaces the existing version with the new version.

Flow:

```text
Old Version
     ↓
Stop / Replace
     ↓
New Version
     ↓
Validate
```

Suitable when:

- Short downtime is acceptable.
- The application is simple.
- Deployment frequency is low.
- Infrastructure does not support parallel versions.
- Cost must be minimized.

Advantages:

- Simple
- Low operational complexity
- Low infrastructure overhead

Risks:

- Temporary downtime
- Slower recovery if deployment fails
- No parallel production validation

Do not use when confirmed requirements prohibit downtime.

---

# Rolling Deployment

A rolling deployment gradually replaces existing instances.

Flow:

```text
V1 V1 V1 V1
      ↓
V2 V1 V1 V1
      ↓
V2 V2 V1 V1
      ↓
V2 V2 V2 V1
      ↓
V2 V2 V2 V2
```

Suitable when:

- Multiple application instances exist.
- Continuous availability is required.
- Old and new versions can temporarily coexist.

Advantages:

- Reduced downtime
- Incremental rollout
- Efficient infrastructure usage

Consider:

- Version compatibility
- Session state
- Database compatibility
- Health checks
- Rollback behavior

Do not assume rolling deployment is safe when versions cannot coexist.

---

# Blue-Green Deployment

Maintain two equivalent environments:

```text
Blue
Current Production

Green
New Version
```

Deployment flow:

```text
Deploy Green
      ↓
Validate Green
      ↓
Switch Traffic
Blue → Green
      ↓
Monitor
      ↓
Retain Blue Temporarily
      ↓
Remove / Reuse Blue
```

Suitable when:

- Minimal downtime is required.
- Rapid rollback is important.
- Parallel environments are feasible.

Advantages:

- Fast traffic switch
- Strong pre-production validation
- Fast application rollback

Consider:

- Additional infrastructure cost
- Database compatibility
- Shared external dependencies
- Traffic routing
- Environment consistency

Blue-green deployment does not automatically provide safe database rollback.

---

# Canary Deployment

Release the new version to a limited portion of traffic first.

Example:

```text
95% → Version 1
 5% → Version 2
```

Then progressively increase exposure:

```text
5%
 ↓
25%
 ↓
50%
 ↓
100%
```

Suitable when:

- Production behavior must be validated gradually.
- Traffic can be controlled.
- Strong observability exists.
- Risk reduction justifies additional complexity.

Monitor applicable:

- Error rate
- Latency
- Availability
- Business failures
- Resource utilization
- User impact

Rollback or stop progression when defined failure thresholds are exceeded.

Do not use canary deployment without sufficient monitoring and traffic-control capability.

---

# Slot-Based Deployment

Some application platforms provide deployment slots or equivalent staging environments.

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

Suitable when:

- The hosting platform supports deployment slots.
- Low-downtime deployment is required.
- Pre-production validation on production-like infrastructure is valuable.

Consider:

- Slot-specific configuration
- Shared configuration
- Warm-up
- Database compatibility
- Background jobs
- External integrations
- Post-swap validation

Platform-specific guidance belongs in the relevant deployment skill.

For example:

```text
app-service-deployment.md
```

---

# Immutable Deployment

Immutable deployment replaces infrastructure or deployment units rather than modifying them in place.

Concept:

```text
Existing Deployment
        ↓
Create New Deployment
        ↓
Validate
        ↓
Redirect Traffic
        ↓
Retire Existing Deployment
```

Suitable when:

- Infrastructure automation is mature.
- Consistency is important.
- Deployment artifacts should remain unchanged after creation.

Benefits:

- Reduced configuration drift
- Reproducibility
- Easier rollback
- Strong artifact consistency

Consider infrastructure cost and provisioning time.

---

# Progressive Delivery

Progressive delivery gradually exposes changes using controlled mechanisms.

May include:

```text
Canary Deployment
Feature Flags
Traffic Splitting
Ring Deployment
Controlled User Groups
```

Suitable when deployment risk is high and controlled exposure provides meaningful value.

Deployment and feature release should be treated separately where appropriate.

Example:

```text
Deploy Code
      ↓
Feature Disabled
      ↓
Enable for Internal Users
      ↓
Enable for Limited Users
      ↓
Validate
      ↓
Enable Broadly
```

Do not introduce progressive-delivery infrastructure unless justified.

---

# Strategy Decision Matrix

Use criteria such as:

| Factor | Recreate | Rolling | Blue-Green | Canary | Slot-Based |
|---|---|---|---|---|---|
| Operational Complexity | Low | Medium | Medium | High | Low-Medium |
| Additional Capacity | Low | Low-Medium | High | Medium | Platform Dependent |
| Downtime | Possible | Low | Very Low | Very Low | Very Low |
| Rollback Speed | Medium | Medium | Fast | Fast | Fast |
| Traffic Control Required | No | Limited | Yes | Yes | Platform Managed |
| Production Exposure Risk | High | Medium | Low | Lowest/Controlled | Low |

This matrix is guidance only.

Final selection must consider the actual architecture.

---

# Deployment Strategy Decision

For significant deployments document:

```text
Selected Strategy
Why Selected
Requirements Addressed
Alternatives Considered
Trade-offs
Rollback Approach
Validation Approach
```

Example:

```text
Selected Strategy:
Slot-Based Deployment

Reason:
The application requires low-downtime releases and the
approved hosting platform provides deployment slots.

Alternatives:
Recreate
Rolling

Trade-off:
Additional slot configuration and validation are required.
```

Do not provide generic justification such as:

```text
"Blue-green is an industry best practice."
```

Explain why it fits the specific requirements.

---

# Deployment Preparation

Before deployment verify applicable:

```text
Approved Build
Approved Artifact
Configuration Available
Secrets Available
Infrastructure Ready
Database Migration Ready
Dependencies Available
Deployment Permissions Available
Rollback Plan Defined
Validation Plan Defined
Monitoring Available
```

Do not start deployment when critical prerequisites are missing.

---

# Artifact Principle

The same approved artifact should be promoted across environments where practical.

Prefer:

```text
Build Once
     ↓
Test
     ↓
Promote Same Artifact
     ↓
Deploy
```

Avoid:

```text
Build Dev Artifact
Build Test Artifact
Build Production Artifact
```

when environment differences can instead be supplied through external configuration.

This reduces environment drift.

---

# Environment Promotion

Typical promotion:

```text
Development
      ↓
Test
      ↓
UAT / Staging
      ↓
Production
```

Actual environments depend on organizational requirements.

Promotion should be based on defined quality gates.

Do not assume every organization requires every environment.

---

# Deployment Gates

Applicable deployment gates may include:

```text
Build Success
Unit Test Success
Integration Test Success
Security Validation
Artifact Validation
Change Approval
Environment Approval
Smoke Test
Production Approval
```

Use only gates required by organizational policy, risk, and architecture.

Do not create unnecessary manual approvals that provide no risk reduction.

---

# Database Compatibility

Deployment strategy must account for database changes.

Application and database versions may temporarily coexist.

Prefer backward-compatible migration patterns where possible.

Example:

```text
Expand
   ↓
Deploy Compatible Application
   ↓
Migrate Data
   ↓
Validate
   ↓
Contract
```

Detailed database deployment guidance belongs in:

```text
database-deployment.md
```

Never assume application rollback automatically reverses database changes.

---

# State Management

Before selecting rolling, blue-green, or canary deployment, understand application state.

Consider:

- User sessions
- Local state
- Distributed state
- Cache
- Background processing
- Queues
- Scheduled jobs
- File storage

Avoid deployment strategies that can corrupt or lose state.

---

# Background Processing

Special care is required for:

```text
Workers
Scheduled Jobs
Queue Consumers
Batch Processing
Event Consumers
```

During deployment consider:

- Duplicate processing
- Version coexistence
- Message compatibility
- Graceful shutdown
- In-flight work
- Idempotency

Do not terminate active processing without understanding its impact.

---

# Health Checks

Deployments should use meaningful health checks where supported.

Consider:

```text
Startup Health
Liveness
Readiness
Dependency Health
```

A successful process start does not necessarily mean the application is ready to receive traffic.

Health checks should reflect actual service readiness.

---

# Deployment Validation

After deployment validate applicable:

```text
Application Started
      ↓
Health Checks Passed
      ↓
Critical Dependencies Available
      ↓
Smoke Tests Passed
      ↓
Critical User Journey Passed
      ↓
Monitoring Healthy
      ↓
Deployment Accepted
```

Detailed validation belongs in:

```text
deployment-validation.md
```

Do not declare deployment successful only because the deployment command completed.

---

# Monitoring During Deployment

Observe applicable:

- Availability
- Error rate
- Latency
- Failed requests
- Resource utilization
- Dependency failures
- Application exceptions
- Business-critical operations

Compare behavior before and after deployment where practical.

Deployment success requires both technical completion and healthy runtime behavior.

---

# Rollback

Every production deployment should have a recovery approach appropriate to its risk.

Determine before deployment:

```text
Rollback Trigger
Rollback Method
Responsible Process
Data Impact
Configuration Impact
Validation After Rollback
```

Possible recovery actions include:

```text
Previous Artifact
Previous Container Image
Traffic Switch
Slot Swap
Previous Infrastructure Version
Feature Disablement
Forward Fix
```

Detailed guidance belongs in:

```text
rollback-recovery.md
```

---

# Forward Fix vs Rollback

Not every failure should automatically trigger rollback.

Evaluate:

```text
Severity
User Impact
Data Impact
Recovery Time
Rollback Safety
Fix Complexity
```

Use rollback when it provides the safest and fastest recovery.

Use forward fix when rollback creates greater risk or is technically unsafe.

---

# Deployment Failure Handling

When deployment fails:

```text
Stop Progression
      ↓
Preserve Evidence
      ↓
Assess Impact
      ↓
Rollback / Recover if Required
      ↓
Validate Service
      ↓
Identify Root Cause
      ↓
Correct
      ↓
Revalidate
      ↓
Redeploy
```

Do not repeatedly retry a failed production deployment without understanding the cause.

---

# Security

Deployment processes must protect:

```text
Credentials
Secrets
Artifacts
Deployment Identity
Configuration
Infrastructure Access
Production Access
```

Apply least privilege.

Do not expose secrets through:

- Source code
- Pipeline logs
- Command output
- Deployment reports
- Configuration files committed to source control

Detailed controls belong in:

```text
deployment-security.md
```

---

# Deployment Evidence

Preserve appropriate evidence such as:

```text
Application Version
Artifact Version
Deployment Time
Target Environment
Deployment Result
Validation Result
Approvals where required
Rollback Result where applicable
```

Evidence should support troubleshooting and auditability.

---

# Technology Selection

Deployment strategy and hosting technology are separate decisions.

Examples:

```text
Architecture selects App Service
        ↓
Use app-service-deployment.md

Architecture selects Containers
        ↓
Use containerization.md

Architecture selects Kubernetes
        ↓
Use kubernetes-deployment.md
```

Do not select Kubernetes because:

```text
kubernetes-deployment.md
```

exists.

Do not select App Service because:

```text
app-service-deployment.md
```

exists.

Skills provide guidance after the architecture establishes the applicable technology.

---

# Anti-Patterns

Avoid:

### Deploying Directly From Developer Machines

Production deployments should use controlled and repeatable processes where practical.

### Rebuilding Per Environment

Prefer promoting the same validated artifact.

### Manual Configuration Drift

Environment configuration should be controlled and repeatable.

### No Rollback Plan

Production deployment without a recovery approach creates unnecessary risk.

### Deploy and Assume Success

Always perform post-deployment validation.

### Changing Multiple Unrelated Systems Together

Keep deployment scope controlled where possible.

### Advanced Deployment Without Observability

Canary or progressive deployment without monitoring provides limited safety.

### Architecture by Deployment Tool

Do not let deployment tooling redefine the approved system architecture.

---

# Decision Checklist

Before selecting a deployment strategy verify:

- [ ] Hosting model is understood.
- [ ] Availability requirements are understood.
- [ ] Downtime tolerance is known where required.
- [ ] Application state is understood.
- [ ] Database compatibility is considered.
- [ ] External dependencies are considered.
- [ ] Version coexistence is understood.
- [ ] Health checks are available where applicable.
- [ ] Monitoring is available.
- [ ] Validation approach is defined.
- [ ] Rollback/recovery approach is defined.
- [ ] Cost implications are considered.
- [ ] Operational complexity is justified.

---

# Deployment Checklist

Before production deployment verify:

- [ ] Approved artifact exists.
- [ ] Required tests passed.
- [ ] Infrastructure is ready.
- [ ] Configuration is available.
- [ ] Secrets are available securely.
- [ ] Database changes are ready.
- [ ] Dependencies are available.
- [ ] Required approvals are complete.
- [ ] Deployment strategy is confirmed.
- [ ] Rollback/recovery plan exists.
- [ ] Monitoring is available.
- [ ] Post-deployment validation is defined.

After deployment verify:

- [ ] Deployment completed.
- [ ] Application is healthy.
- [ ] Dependencies are healthy.
- [ ] Smoke tests passed.
- [ ] Critical workflows are functioning.
- [ ] Monitoring shows no critical regression.
- [ ] Deployment evidence is recorded.

---

# Final Principle

Deployment strategy must follow:

```text
Architecture
      ↓
Requirements
      ↓
Risk
      ↓
Deployment Strategy
      ↓
Controlled Deployment
      ↓
Validation
      ↓
Monitoring
      ↓
Accept or Recover
```

The objective is not to use the most advanced deployment strategy.

The objective is to achieve:

```text
Safe
+
Repeatable
+
Observable
+
Recoverable
+
Requirement-Appropriate
```

deployments with the lowest justified operational complexity.