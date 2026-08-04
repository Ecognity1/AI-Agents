# Containerization

## Purpose

Define standards for packaging applications into secure, portable, reproducible, and production-ready container images.

This skill applies when the approved architecture uses containers.

It is platform-neutral and can support deployment targets such as:

- Kubernetes
- Managed Container Platforms
- Container Apps
- App Services supporting containers
- Container Instances
- Virtual Machines
- Other container runtimes

Containerization must follow:

```text
docs/Architecture-Design.md
```

Do not containerize an application unless the architecture or deployment requirements justify it.

---

# Core Principles

Containers should be:

```text
Minimal
+
Immutable
+
Reproducible
+
Secure
+
Portable
+
Observable
```

Prefer:

```text
Application
+
Required Runtime
+
Required Dependencies
=
Minimal Container Image
```

Do not include unnecessary tools, files, or dependencies.

---

# Container Image

A container image should contain only what is required to run the application.

Avoid including:

- Source-control metadata
- Development tools
- Test artifacts
- Local configuration
- Credentials
- Secrets
- Temporary files
- Unnecessary operating-system packages

Use `.dockerignore` or equivalent mechanisms to restrict the build context.

---

# Dockerfile Standards

Keep Dockerfiles:

- Simple
- Deterministic
- Readable
- Secure
- Maintainable

Typical structure:

```dockerfile
FROM <approved-base-image>

WORKDIR <application-directory>

COPY <required-files>

RUN <required-build-or-installation>

USER <non-root-user>

ENTRYPOINT ["<application-command>"]
```

Exact implementation depends on the technology stack.

Do not copy the entire repository when only selected artifacts are required.

---

# Base Images

Use trusted and maintained base images.

Prefer:

- Official images
- Organization-approved images
- Minimal runtime images
- Supported versions

Pin versions appropriately to improve reproducibility.

Avoid:

```text
latest
```

for production images when it can introduce uncontrolled changes.

Regularly update base images for security fixes.

---

# Multi-Stage Builds

Use multi-stage builds when they meaningfully reduce runtime image size or separate build dependencies from runtime dependencies.

Example:

```text
Build Stage
├── Compiler
├── Build Tools
└── Dependencies
        ↓
Runtime Stage
├── Application Artifact
└── Required Runtime
```

Do not include compilers and build tooling in the final image unless required at runtime.

---

# Build Reproducibility

Container builds should produce predictable artifacts from the same source and dependency versions.

Control:

- Base image versions
- Dependency versions
- Build arguments
- Build context
- Runtime versions

Avoid downloading uncontrolled dependencies during runtime startup.

---

# Non-Root Execution

Applications should run as a non-root user whenever technically possible.

Prefer:

```dockerfile
USER <non-root-user>
```

Do not run containers with unnecessary elevated privileges.

If privileged execution is required, document and justify it.

---

# Secrets

Never place secrets inside container images.

Do not use:

```dockerfile
ENV PASSWORD=...
ENV API_KEY=...
COPY secrets.json ...
```

for sensitive values.

Secrets should be supplied securely at runtime through the approved secret-management mechanism.

Assume anything added during an image build may remain discoverable in image layers.

---

# Configuration

Separate application configuration from the container image.

Prefer:

```text
Container Image
      +
Runtime Configuration
      +
Runtime Secrets
```

The same image should be usable across environments.

Do not create separate container images merely for environment-specific configuration.

Follow:

```text
environment-management.md
```

---

# Application State

Containers should be treated as disposable where practical.

Do not store important persistent data only inside the container filesystem.

Persistent state should use architecture-approved storage.

Examples:

```text
Database
Object Storage
Persistent Volume
External Cache
```

Container restart or replacement should not cause unintended data loss.

---

# Logging

Applications should expose logs in a way the hosting platform can collect.

Prefer application logging to:

```text
stdout
stderr
```

where appropriate.

Do not depend solely on files stored inside ephemeral container filesystems.

Never log secrets or sensitive credentials.

---

# Health Checks

Containerized applications should expose meaningful health information where required.

Consider:

```text
Startup
Liveness
Readiness
```

Health checks should reflect actual application health.

A running process does not necessarily mean the application is ready to serve traffic.

Platform-specific health configuration belongs in the corresponding deployment skill.

---

# Graceful Shutdown

Applications should handle container termination gracefully.

When receiving a termination signal:

```text
Stop Accepting New Work
      ↓
Complete / Safely Stop Active Work
      ↓
Release Resources
      ↓
Exit
```

This is particularly important for:

- APIs
- Workers
- Queue consumers
- Background processors

Avoid abrupt termination that can cause data corruption or duplicate processing.

---

# Resource Management

Applications should operate within defined resource constraints where supported.

Consider:

- CPU
- Memory
- Temporary storage

Application behavior should remain predictable when resources are constrained.

Detailed resource configuration belongs to the target deployment platform.

---

# Image Tagging

Container images must be identifiable and traceable.

Prefer immutable identifiers such as:

```text
Application Version
Build Number
Commit Identifier
Release Version
```

Example:

```text
application:1.4.2
application:build-1058
```

Avoid relying only on:

```text
application:latest
```

for production deployments.

---

# Container Registry

Store images in an approved container registry.

Registry controls should include applicable:

- Authentication
- Authorization
- Encryption
- Image scanning
- Retention
- Auditability

Production deployment identities should have only required registry permissions.

---

# Image Security Scanning

Scan container images for known vulnerabilities before production promotion where required.

Typical flow:

```text
Build Image
    ↓
Scan
    ↓
Evaluate Findings
    ↓
Publish / Promote
```

Critical vulnerabilities should be handled according to organization security policy.

Do not disable scanning merely to allow deployment.

---

# Dependency Security

Container security includes:

```text
Base Image
+
Operating-System Packages
+
Application Dependencies
```

Keep all three maintained.

Remove unnecessary packages to reduce attack surface.

Follow applicable dependency-management standards from the engineering knowledge base.

---

# Image Build in CI/CD

Prefer building container images through controlled CI pipelines.

Typical flow:

```text
Source
  ↓
Build Application
  ↓
Run Required Tests
  ↓
Build Container Image
  ↓
Scan Image
  ↓
Tag
  ↓
Publish
```

Follow:

```text
ci-cd-practices.md
```

Avoid routine production image builds on developer machines.

---

# Build Once, Promote

Prefer:

```text
Build Image Once
      ↓
Validate
      ↓
Publish
      ↓
Development
      ↓
Test
      ↓
Staging
      ↓
Production
```

Promote the same validated image between environments.

Do not rebuild the image for every environment unless technically required.

---

# Image Immutability

Published release images should be treated as immutable.

Do not overwrite an existing production version tag with different content.

A new application version should produce a new identifiable image.

This improves:

- Traceability
- Rollback
- Reproducibility

---

# Container Deployment

Container creation and container deployment are separate concerns.

This skill defines:

```text
How the application is packaged.
```

Deployment-platform skills define:

```text
How the container is hosted and operated.
```

Examples:

```text
Architecture selects Kubernetes
        ↓
containerization.md
        +
kubernetes-deployment.md
```

```text
Architecture selects App Service Container
        ↓
containerization.md
        +
app-service-deployment.md
```

Do not allow Dockerfile decisions to redefine the approved deployment architecture.

---

# Container Validation

Before publishing or deploying an image verify applicable:

```text
Image Builds
     ↓
Application Starts
     ↓
Required Configuration Loads
     ↓
Application Health Succeeds
     ↓
Required Connectivity Works
     ↓
Automated Tests Pass
     ↓
Security Scan Passes
```

Do not consider an image valid merely because the image build completed.

---

# Rollback

Container deployments should support rollback to a previously validated image where the deployment platform permits it.

Maintain traceability between:

```text
Release
 ↓
Image Version
 ↓
Source Version
 ↓
Build
```

Do not delete required rollback images prematurely.

Follow:

```text
rollback-recovery.md
```

---

# Image Optimization

Optimize images when it provides meaningful benefit.

Consider:

- Minimal base images
- Multi-stage builds
- Reduced build context
- Dependency cleanup
- Layer efficiency

Do not perform obscure optimizations that significantly reduce maintainability for negligible benefit.

---

# Anti-Patterns

Avoid:

### Running as Root Without Need

Use non-root execution where possible.

### Secrets Inside Images

Supply secrets securely at runtime.

### Using `latest` as the Only Production Identifier

Use traceable immutable versions.

### Development Tools in Runtime Images

Use multi-stage builds where appropriate.

### Environment-Specific Images

Externalize configuration.

### Persistent Data Inside Containers

Use architecture-approved persistent storage.

### Uncontrolled Base Images

Use trusted, maintained images.

### Huge Build Contexts

Include only required files.

### Manual Production Builds

Use controlled CI/CD.

### Treating Containers as Architecture

Containerization is a packaging mechanism, not an architecture pattern.

---

# Checklist

Before considering containerization complete verify:

- [ ] Containerization is required by the approved architecture.
- [ ] Dockerfile/container definition is simple and maintainable.
- [ ] Trusted base image is used.
- [ ] Base image version is appropriately controlled.
- [ ] Final image contains only required runtime components.
- [ ] Multi-stage build is used where beneficial.
- [ ] Application runs as non-root where possible.
- [ ] No secrets exist in the image.
- [ ] Environment configuration is externalized.
- [ ] Persistent data is stored outside the container where required.
- [ ] Logging works with the hosting platform.
- [ ] Health behavior is available where required.
- [ ] Graceful shutdown is supported where applicable.
- [ ] Images use traceable versions.
- [ ] Registry access is secured.
- [ ] Required image security scanning is performed.
- [ ] Image can be promoted across environments.
- [ ] Image is traceable to source and build.
- [ ] Rollback image is identifiable.

---

# Final Principle

Containerization should follow:

```text
Application
     ↓
Minimal Runtime
     ↓
Secure Container Definition
     ↓
Build
     ↓
Test
     ↓
Scan
     ↓
Version
     ↓
Publish
     ↓
Deploy Using Approved Platform
```

The objective is to produce a **minimal, secure, immutable, reproducible, and portable application image** without adding unnecessary container complexity.