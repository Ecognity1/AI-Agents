# Application and Infrastructure Analysis

## Purpose

Define the mandatory repository-root analysis and architecture report that must precede IaC or CI/CD generation.

## Required Inputs

Determine the target cloud, IaC tool/language, and repository/CI/CD platform from explicit user input or reliable repository context. Ask the user when any value is unknown or ambiguous. Never assume these choices.

## Repository-Root Analysis

Inspect actual source, manifests, configuration, and deployment assets. Identify:

- Repository structure and application architecture
- Frontend, backend, APIs, services, modules, and microservices
- Databases, messaging, caching, file/object storage, and data flows
- Authentication, authorization, secrets, configuration, and external integrations
- Networking, public/private exposure, DNS, ports, and health endpoints
- Containers, Dockerfiles, runtime, build commands, and test commands
- Existing IaC, environments, workflows/pipelines, and deployment configuration
- Scaling, availability, logging, monitoring, security, and dependencies

Analyze actual behavior. Do not infer generic infrastructure from names alone.

## Architecture and Resource Selection

Map application components to cloud capabilities only when required by the application and approved architecture. Evaluate hosting, containers, orchestration, serverless, routing, databases, storage, cache, messaging/events, search, AI, secrets, private networking, DNS, and observability for applicability. Do not add common resources without a documented requirement.

Use this decision chain:

```text
Application Code Analysis
â†’ Application Architecture
â†’ Deployment Requirements
â†’ Cloud Architecture
â†’ Required Resources
â†’ IaC Implementation
```

## Pre-IaC Report

Before creating IaC, document in `docs/Deployment-Plan.md`:

- Application type, technology stack, components, services/modules, runtimes, data, dependencies, and integrations
- Proposed deployment architecture and component-to-resource mapping
- `Application Component â†’ Cloud Resource â†’ Dependency â†’ Deployment Method`
- For every resource: name/type, purpose, requiring component, necessity, selection rationale, dependencies, networking, security, configuration, scaling, availability, and monitoring
- Selected cloud, IaC, repository/CI/CD platform, environments, assumptions, constraints, risks, and unresolved decisions

The report must be reviewable before infrastructure generation begins. Do not proceed when a required platform choice remains unresolved.
