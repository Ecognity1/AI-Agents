---
name: legacy-security-review
description: Repository guidance for security review. Use when Codex performs related solution design work.
---

# Security Review Skill

## Purpose

This skill defines enterprise security standards for application and cloud architecture.

Always apply Zero Trust principles.

---

# Identity

Use:

- Microsoft Entra ID
- Managed Identity
- MFA

Never store credentials in source code.

---

# Authentication

Support:

- OAuth2
- OpenID Connect
- JWT

---

# Authorization

Use:

- Role-Based Access Control (RBAC)
- Least Privilege

---

# Secrets Management

Store secrets in:

- Azure Key Vault

Never hardcode:

- Passwords
- Keys
- Tokens
- Connection Strings

---

# Data Protection

Encrypt:

- Data at Rest
- Data in Transit

Use HTTPS everywhere.

---

# Network Security

Prefer:

- Private Endpoints
- Network Security Groups
- Azure Firewall
- Application Gateway with WAF

---

# Threat Protection

Review against:

- OWASP Top 10
- Microsoft Security Baseline

Perform:

- Threat Modeling
- Risk Assessment

---

# Monitoring

Ensure:

- Audit Logs
- Security Logs
- Alerts
- Monitoring

---

# Validation

Verify:

✓ Authentication

✓ Authorization

✓ Encryption

✓ Secrets

✓ Network Isolation

✓ Logging

✓ Compliance

✓ Least Privilege

---

# Common Mistakes

Avoid:

- Public databases
- Open storage accounts
- Hardcoded secrets
- Missing logging
- Missing RBAC
- Broad permissions

---

# Expected Output

A secure architecture following enterprise security best practices.

