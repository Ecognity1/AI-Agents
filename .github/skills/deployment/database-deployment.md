# Database Deployment

## Purpose

Define standards for safely deploying database schema, configuration, and data changes as part of application releases.

This skill applies to relational and non-relational databases where controlled database changes are required.

Database deployment must follow:

```text
docs/Architecture-Design.md
```

Do not change the approved database technology or data architecture during deployment.

---

# Core Principles

Database changes should be:

```text
Versioned
+
Automated
+
Tested
+
Backward-Compatible Where Practical
+
Recoverable
+
Traceable
```

Prefer small, incremental database changes over large combined migrations.

---

# Database Change Types

Identify the type of change before deployment.

Common changes include:

```text
Schema Changes
Index Changes
Constraint Changes
Stored Logic Changes
Reference Data Changes
Data Migrations
Partition Changes
Configuration Changes
```

Evaluate deployment risk based on the actual change.

---

# Migration Management

Database changes should use the migration mechanism established by the application or repository.

Each migration should be:

- Version controlled
- Ordered
- Repeatable where appropriate
- Traceable to the release
- Tested before production

Do not manually modify production schemas when migrations are the established source of truth.

---

# Deployment Flow

Typical database deployment:

```text
Migration Created
      ↓
Review
      ↓
Test in Lower Environment
      ↓
Validate Compatibility
      ↓
Backup / Recovery Check
      ↓
Production Migration
      ↓
Application Deployment
      ↓
Validation
```

The exact order depends on application compatibility requirements.

---

# Backward Compatibility

Database changes should support coexistence between application versions where rolling, blue-green, canary, or slot-based deployments are used.

Prefer:

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

Example:

```text
Add New Column
      ↓
Deploy Code Supporting Old + New Structure
      ↓
Populate New Data
      ↓
Switch Application Usage
      ↓
Remove Old Column Later
```

Avoid destructive schema changes in the same release when old application instances may still depend on the previous structure.

---

# Destructive Changes

Treat changes such as these as high risk:

```text
DROP TABLE
DROP COLUMN
Data Type Reduction
Constraint Changes
Large Data Deletion
Major Data Transformation
```

Before executing, verify:

- Change is intentional.
- Application no longer depends on the structure.
- Data impact is understood.
- Backup/recovery is available.
- Rollback or forward-fix approach is defined.

Do not perform destructive production changes without explicit validation.

---

# Data Migration

Data migrations must be designed to protect:

```text
Data Integrity
+
Availability
+
Performance
```

For large migrations consider:

- Batch processing
- Transaction size
- Lock duration
- Execution time
- Resource usage
- Retry behavior
- Restartability

Avoid large blocking transactions when safer incremental migration is possible.

---

# Migration Idempotency

Where practical, migrations or deployment scripts should safely detect whether required changes already exist.

Do not rely on repeated execution unless the migration mechanism explicitly supports it.

Migration history must clearly indicate which changes have already been applied.

---

# Transaction Management

Use transactions where they provide safe atomic behavior.

Consider:

```text
Migration Size
Database Capability
Locking
Execution Duration
Failure Behavior
```

Do not place extremely large migrations inside a single transaction without evaluating operational impact.

---

# Index Changes

Evaluate index operations for:

- Locking
- Storage usage
- Write impact
- Execution duration
- Query performance

Large production index changes may require platform-supported online or low-impact mechanisms.

Do not create indexes without workload or requirement justification.

---

# Database Configuration

Environment-specific database configuration must remain externalized.

Protect:

```text
Connection Credentials
Connection Strings
Administrative Credentials
Certificates
```

Use approved secret-management mechanisms.

Never commit database credentials to source control.

---

# Deployment Identity

Database migrations should use a dedicated deployment identity where practical.

Grant only permissions required to perform approved migrations.

Separate:

```text
Application Runtime Permissions
```

from:

```text
Database Migration Permissions
```

when appropriate.

Follow:

```text
deployment-security.md
```

---

# Backup and Recovery

Before high-risk production database changes verify applicable:

```text
Backup Available
Recovery Mechanism Available
Restore Procedure Understood
Recovery Point Known
```

Do not assume that application rollback will restore database state.

Backup and recovery requirements must follow the approved architecture and operational standards.

---

# Application and Database Sequencing

Determine deployment order based on compatibility.

Possible sequence:

```text
Backward-Compatible Database Change
      ↓
Application Deployment
      ↓
Data Migration
      ↓
Cleanup Migration
```

Another solution may require:

```text
Application Preparation
      ↓
Database Migration
      ↓
Application Activation
```

Do not use one fixed deployment order for every system.

---

# Deployment Slots and Parallel Versions

When application versions may coexist:

```text
Old Application
        +
New Application
        ↓
Same Database
```

the database must remain compatible with both versions during the transition.

This applies to:

- Deployment slots
- Rolling deployment
- Blue-green deployment
- Canary deployment

Follow:

```text
deployment-strategy.md
```

---

# CI/CD Integration

Database migrations should be executed through controlled deployment pipelines where practical.

Typical flow:

```text
Validate Migration
      ↓
Test Migration
      ↓
Deploy to Lower Environment
      ↓
Validate
      ↓
Production Gate
      ↓
Execute Production Migration
      ↓
Validate
```

Follow:

```text
ci-cd-practices.md
```

Avoid routine production database changes from developer machines.

---

# Migration Validation

Before production deployment verify:

- Migration syntax is valid.
- Migration executes successfully in a representative environment.
- Existing data remains valid.
- Application compatibility is confirmed.
- Expected schema exists after migration.
- Required indexes and constraints exist.
- Performance impact is acceptable where relevant.

---

# Post-Deployment Validation

After database deployment validate applicable:

```text
Migration Completed
      ↓
Expected Schema Exists
      ↓
Data Integrity Verified
      ↓
Application Connectivity Verified
      ↓
Critical Database Operations Verified
      ↓
Application Smoke Tests Passed
```

Do not declare a migration successful solely because the migration command completed.

---

# Migration Failure

When a migration fails:

```text
Stop Deployment
      ↓
Preserve Error Evidence
      ↓
Assess Database State
      ↓
Determine Partial Changes
      ↓
Recover / Forward Fix
      ↓
Validate Data
      ↓
Resume Only When Safe
```

Do not repeatedly rerun a failed migration without understanding its current state.

---

# Rollback

Database rollback must be treated separately from application rollback.

Possible approaches include:

```text
Reverse Migration
Restore Backup
Forward Fix
Compatibility Migration
```

Choose the safest approach based on data impact.

Some database changes should not be automatically reversed.

Follow:

```text
rollback-recovery.md
```

---

# Traceability

Maintain traceability:

```text
Requirement
    ↓
Database Change
    ↓
Migration Version
    ↓
Application Version
    ↓
Release
    ↓
Deployment Result
```

Production database changes should be identifiable and auditable.

---

# Anti-Patterns

Avoid:

### Manual Production Schema Changes

Use controlled migrations.

### Destructive Change Without Impact Review

Understand data and application dependencies first.

### Assuming Application Rollback Restores Database

Database recovery must be planned independently.

### Immediate Remove/Rename Changes

Prefer backward-compatible migration when versions may coexist.

### Credentials in Migration Scripts

Use secure secret management.

### Large Uncontrolled Transactions

Consider locking and operational impact.

### Untested Production Migration

Validate migrations in representative lower environments first.

### Repeated Blind Migration Retries

Understand failure state before retrying.

---

# Checklist

Before database deployment:

- [ ] Change aligns with approved architecture.
- [ ] Migration is version controlled.
- [ ] Migration has been reviewed.
- [ ] Migration has been tested.
- [ ] Application compatibility is verified.
- [ ] Parallel-version compatibility is considered where applicable.
- [ ] Destructive changes are identified.
- [ ] Data impact is understood.
- [ ] Performance/locking impact is considered.
- [ ] Database credentials are securely managed.
- [ ] Deployment identity follows least privilege.
- [ ] Backup/recovery is available where required.
- [ ] Deployment sequence is defined.
- [ ] Failure/recovery approach is defined.

After deployment:

- [ ] Migration completed successfully.
- [ ] Expected schema exists.
- [ ] Required data migration completed.
- [ ] Data integrity is verified.
- [ ] Application connectivity works.
- [ ] Critical database operations work.
- [ ] Smoke tests pass.
- [ ] Migration result is recorded.

---

# Final Principle

Database deployment should follow:

```text
Design Change
     ↓
Versioned Migration
     ↓
Review
     ↓
Test
     ↓
Compatibility Validation
     ↓
Recovery Readiness
     ↓
Deploy
     ↓
Validate Data and Schema
     ↓
Validate Application
```

The objective is to deploy database changes **safely, incrementally, traceably, and with minimal risk to data integrity and application availability**.