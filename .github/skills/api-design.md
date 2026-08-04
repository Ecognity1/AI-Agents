# API Design Skill

## Purpose

This skill defines enterprise REST API standards for designing secure, maintainable, and scalable APIs.

---

# API Design Principles

Design APIs that are:

- Consistent
- Versioned
- Secure
- Stateless
- Easy to consume

---

# Resource Naming

Use nouns.

Good

/users

/orders

/products

Avoid:

/getUsers

/createOrder

---

# HTTP Methods

GET

Read

POST

Create

PUT

Replace

PATCH

Update

DELETE

Delete

---

# Versioning

Always version APIs.

Example

/api/v1/orders

Do not break existing consumers.

---

# Request & Response

Use JSON.

Use consistent naming conventions.

Return meaningful status codes.

---

# Security

Always consider:

- OAuth2
- JWT
- Microsoft Entra ID
- HTTPS
- Input Validation

---

# Error Handling

Return consistent error format.

Include:

- Error Code
- Message
- Correlation ID

---

# Documentation

Generate OpenAPI specification.

Document:

- Endpoint
- Request
- Response
- Error Codes

---

# Validation

Verify:

✓ Proper HTTP methods

✓ Input validation

✓ Authentication

✓ Authorization

✓ Versioning

✓ Pagination

✓ Rate limiting

---

# Common Mistakes

Avoid:

- Verbs in URLs
- Breaking changes
- Missing versioning
- Inconsistent responses
- Exposing internal implementation

---

# Expected Output

Well-designed REST APIs following enterprise standards.