---
name: legacy-database-design
description: Repository guidance for database design. Use when Codex performs related solution design work.
---

# Database Design Skill

## Purpose

This skill provides database design standards for enterprise applications.

---

# Database Selection

Choose based on workload.

Relational

- Azure SQL Database
- PostgreSQL

NoSQL

- Azure Cosmos DB

Document why the database was selected.

---

# Data Modeling

Identify:

- Entities
- Relationships
- Attributes
- Keys
- Constraints

Normalize data where appropriate.

---

# Performance

Always consider:

- Indexing
- Partitioning
- Query Optimization
- Connection Pooling

---

# Data Protection

Plan for:

- Backup
- Restore
- Disaster Recovery
- Encryption
- Auditing

---

# Security

Use:

- Managed Identity
- Least Privilege
- Encryption at Rest
- Encryption in Transit

---

# Validation

Verify:

✓ Primary Keys

✓ Foreign Keys

✓ Indexes

✓ Constraints

✓ Data Integrity

✓ Backup Strategy

✓ Recovery Strategy

---

# Mermaid

Generate ER Diagram where appropriate.

---

# Common Mistakes

Avoid:

- Duplicate data
- Missing indexes
- Large table scans
- Hardcoded credentials
- Missing backups

---

# Expected Output

Scalable, secure, and maintainable database design.

