# Folio Online Bookstore Deployment Plan and Execution Report

## 1. Deployment summary

Deploy the current tested Folio prototype to an isolated Azure development environment using Terraform. The selected footprint is one Azure resource group, one Linux App Service plan, and one Linux Web App. This implements managed HTTPS ingress and a single application deployment at the lowest justified development cost.

This is not a production release. The implemented application uses local JSON persistence and development-only payment, notification, and staff-authorization adapters. The approved architecture requires relational persistence, approved external providers, workforce identity, and production readiness decisions before production acceptance.

### Mandatory deployment inputs

| Input | Selection | Evidence |
|---|---|---|
| Cloud | Microsoft Azure | Explicit prior user selection and existing resources in subscription `7b53f31b-558b-4108-b0c2-8fc0c7ea7435`. |
| IaC | Terraform | Explicit prior user selection; Terraform 1.6.2 and AzureRM 3.117.1 were used for the existing deployment. |
| Repository / CI/CD | GitHub / GitHub Actions | Git remote resolves to GitHub, authenticated repository context is `Ecognity1/AI-Agents`, default branch `main`. |

### Repository-root application analysis

| Area | Actual implementation | Deployment implication |
|---|---|---|
| Application type | One Node.js process serves a Vite-built SPA and same-origin REST API. It is a modular-monolith prototype, not microservices. | One Linux Web App is sufficient for the implemented development scope. No orchestrator, API gateway, or service mesh is justified. |
| Runtime and entry point | Node 20; `npm start` runs `src/server/server.js`; Azure supplies `PORT`; local fallback is 8080. | App Service Node 20 LTS with `npm start`; package must include `dist`, `src`, and `package.json`. |
| Build and tests | `npm ci`, `npm test`, `npm run build`; Playwright is configured separately. | Application CI must restore locked dependencies, run Node tests/build, create one immutable ZIP, and validate its digest before deployment. |
| Frontend | Static HTML/CSS/ES modules produced by Vite; browser cart uses `localStorage`, checkout idempotency key uses `sessionStorage`. | Same-origin delivery avoids CORS infrastructure. No CDN is justified for this development scope. |
| API | JSON endpoints under `/api/v1`; `/api/v1/status` is the health endpoint. | HTTPS-only public ingress and App Service health checking are required. |
| Data | `JsonRepository` writes one JSON file; Azure path is `/home/data/folio.json`. | App Service persistent content is acceptable only for one-instance development. It blocks stateless scale-out and production acceptance. |
| Authentication/authorization | Hard-coded local admin header/token and role strings. Guest checkout has no identity provider. | No production identity resource is justified until the application implements OIDC; current control is a documented release blocker. |
| External integrations | Local payment and notification adapters; no real tax, fulfillment, email, payment, cache, messaging, search, or AI integration. | Do not provision speculative provider, messaging, cache, search, or AI resources. |
| Secrets/configuration | No runtime secrets; only non-secret data-file and package settings. | No Key Vault is required for the implemented development adapter. Add one only when real providers introduce secrets. |
| Logging/monitoring | Structured startup event plus platform HTTP/application logs; no telemetry SDK. | Retain short App Service logs and health checks. Application Insights is not added without approved retention/telemetry requirements. |
| Availability/scaling | One JSON-backed instance; no approved SLA, RTO, or RPO. | Keep one B1 instance if capacity becomes available; Always On is appropriate on B1. Scaling out is unsafe. |
| Containers | No Dockerfile or container runtime requirement. | Use App Service code deployment; no registry or container resources. |

### Architecture-driven resource requirements

| Application component → cloud resource → dependency → deployment method | Necessity and selection | Networking/security | Scaling/availability/monitoring |
|---|---|---|---|
| SPA + Node API → Linux Web App `folio-bookstore-dev-7b53f31b` → Linux App Service plan → Terraform infrastructure workflow, immutable ZIP application workflow | Required compute and managed HTTPS for the single deployable process. | Public HTTPS only, TLS 1.2 minimum, FTPS and publishing basic auth disabled, system identity enabled. | One instance; health path `/api/v1/status`; platform HTTP/application logs. |
| Web App → B1 plan `asp-folio-bookstore-dev-cin` → resource group → Terraform infrastructure workflow | Approved paid target intended to resolve F1 daily quota and enable Always On. Azure capacity currently blocks the in-place upgrade. | No inbound endpoint of its own. | B1 one instance, Always On; no autoscale because JSON persistence is not scale-safe. |
| Immutable application ZIP → private blob/container in `stfoliodev7b53f31b` → storage account → Terraform infrastructure plus application artifact publication | Required because publishing basic auth is disabled; Web App uses run-from-package. | Private container, TLS 1.2, public nested items disabled, OAuth default, local storage users disabled. | Standard LRS is sufficient for development; artifact digest supplies traceability. |
| Web App identity → `Storage Blob Data Reader` at deployment storage scope → private package blob → Terraform | Required least-privilege access to the run-from-package artifact. | System-assigned identity; read-only data-plane role at storage-account scope; no broader Azure role. | RBAC propagation must complete before restart/validation. |
| All resources → resource group `rg-folio-bookstore-dev-cin` → Azure subscription → Terraform | Required lifecycle and cost boundary for the development environment. | Existing Azure RBAC governs management access. | Region is Central India; regional B1 capacity error `03029` is the current blocker. |

Not required for the implemented development application: Azure SQL (no adapter/migrations), Key Vault (no runtime secrets), CDN/WAF, private endpoints/VNet, load balancer, cache, queue/broker, search, Kubernetes, container registry, or AI services. Production architecture still requires relational persistence and approved identity/payment/notification capabilities before release.

### IaC and CI/CD recovery constraint

The Azure resources still exist, but the previously generated `infrastructure/terraform` directory and its local state are absent from the current workspace. Infrastructure must not be recreated blindly. A recovery-safe implementation requires modular Terraform plus import/state adoption of the existing resources. GitHub Actions execution additionally requires an approved OIDC deployment identity and remote state bootstrap; those credentials and backend configuration do not currently exist in repository evidence.

## 2. Scope and traceability

| Scope | Architecture / requirement | Deployment treatment |
|---|---|---|
| Storefront and `/api/v1` application | COMP-001–COMP-004; FR-001–FR-010 | Deploy one Node/Vite application to Azure App Service. |
| HTTPS and health | Architecture sections 9 and 15; NFR-007 | Enforce HTTPS/TLS 1.2 and configure `/api/v1/status` health checks. |
| Workload identity | Architecture section 9 | Enable a system-assigned managed identity; grant no additional roles. |
| Relational persistence | COMP-010; ADR-002 | Not implemented in application code; no unused database is provisioned. Production blocker. |
| Real identity/payment/notification | COMP-005, COMP-007, COMP-008 | Not implemented; local adapters remain development-only. Production blocker. |

## 3. Environment and Azure target

- Environment: `development` only.
- Subscription: active Azure CLI subscription, verified before planning; identifiers are recorded in execution evidence without credentials.
- Region: `centralindia`, selected as a cost-neutral development default near the operator. Region policy remains unapproved for production.
- Terraform state: local state for this isolated development execution. Remote state and CI identity are required before team/production use.
- Naming: deterministic resource names tagged with application, environment, and Terraform ownership.

## 4. Infrastructure and deployment strategy

- Strategy: recreate/in-place development deployment. Advanced slots, canary, WAF/CDN, private networking, and premium tiers are not justified by approved targets.
- Resource group: `rg-folio-bookstore-dev-cin`.
- App Service plan: Linux `F1`; no Always On on the Free tier. Azure later reported the site state as `QuotaExceeded`. The user approved an in-place paid B1 upgrade, but Azure could not allocate B1 capacity after two bounded attempts.
- Web App: `folio-bookstore-dev-7b53f31b`, Node 20 LTS, HTTPS only, FTPS disabled, system-assigned identity, health endpoint, short platform log retention.
- Artifact: a prebuilt dependency-free ZIP containing `dist`, the application/API source, and `package.json`. Its SHA-256 is `356EE30FF272C570235D8DF1F5D5B21BDD64A986CD6EC27C9CA85D38D52EC672`.
- Secure package delivery: a hash-named blob in a private Standard LRS storage container, read only by the Web App system identity through `Storage Blob Data Reader`. Publishing basic authentication remains disabled.

## 5. Configuration, secrets, identity, and networking

- No secrets are required by the current local adapters and none are stored in Terraform or source control.
- Runtime configuration is limited to non-secret build/runtime settings.
- The web app receives a managed identity with only `Storage Blob Data Reader` on the deployment storage account so it can read the private run-from-package artifact.
- Public HTTPS ingress is enabled for the development prototype. Direct HTTP is redirected by `https_only`.
- The local staff header/token mechanism is not production authentication and is an explicit release blocker.

## 6. Database and data safety

The current `JsonRepository` writes `/home/data/folio.json` in the App Service persistent content volume. This may persist across ordinary restarts but is not relational, is not suitable for scale-out, and has no architecture-approved backup/RPO/RTO evidence. Terraform intentionally does not create Azure SQL because the application has no relational adapter or migrations; an unused database would add cost without satisfying ADR-002.

Only a development deployment is authorized by this plan. No database migration, destructive data operation, or stateful replacement is included.

## 7. Validation gates

Before apply:

1. `npm test` passes.
2. `npm run build` passes.
3. `terraform fmt -check`, `terraform validate`, and a saved `terraform plan` pass.
4. Terraform plan contains only the three expected Azure resources.

After apply and ZIP deployment:

1. Azure resources report provisioned/running state.
2. HTTPS root endpoint returns the application.
3. `/api/v1/status` returns HTTP 200 and the expected development warning.
4. Catalog API returns HTTP 200.
5. A non-destructive browser/API smoke path is validated where practical.
6. App Service logs are checked if startup or health validation fails.

## 8. Rollback and recovery

- Application failure: redeploy the previous known artifact when available or stop the Web App while preserving the resource group and content volume.
- Terraform failure before application deployment: preserve the plan/logs and correct the repository-controlled cause; do not repeatedly retry unknown failures.
- Stateful resource replacement or destruction is not an automatic recovery action and requires explicit approval.
- Production rollback is not defined because this plan does not authorize production.

## 9. Risks, prerequisites, and approvals

| Risk / prerequisite | Status / treatment |
|---|---|
| Active Azure credentials and subscription permission | Verify before plan/apply. |
| Provider registration, regional quota, and globally unique hostname | Validate during Terraform plan/apply; report external blockers accurately. |
| Local JSON persistence | Accepted only for development; blocks production and scale-out. |
| Local payment, notification, and authorization adapters | Accepted only for development; block production. |
| Quantitative SLA/SLO, RTO/RPO, load and recovery evidence | TBD; block production readiness. |
| Cost | The user approved B1 for the existing plan, but both upgrade attempts failed for regional capacity. B1 and storage charges are governed by current Azure pricing and continue until resources are scaled down or removed through an approved change. |
| Empty `.github/prompts/deployment-template.md` | Repository template has no structure; this document uses the deployment agent’s required sections without inventing evidence. |

## 10. Execution evidence

Status: **BLOCKED — infrastructure and package are provisioned, but the F1 runtime quota prevents startup and Azure rejected both approved B1 upgrade attempts because regional capacity was unavailable.**

Execution date: 2026-08-04 (Asia/Calcutta operator time; Azure evidence in UTC).

| Evidence | Actual result |
|---|---|
| Azure context | Subscription `Azure subscription 1` (`7b53f31b-558b-4108-b0c2-8fc0c7ea7435`), authenticated user verified; no credential material recorded. |
| Local quality gates | `npm.cmd test`: 11 passed, 0 failed. `npm.cmd run build`: passed. Production server smoke: root 200 and status API 200. |
| Terraform toolchain | Terraform 1.6.2; AzureRM 3.117.1; `terraform fmt -check` and `terraform validate` passed. |
| Initial infrastructure plan/apply | Plan 3 add, 0 change, 0 destroy. Apply created resource group, F1 Linux plan, and Web App. |
| Security correction | FTP and WebDeploy publishing basic authentication explicitly disabled; re-plan remained 3 add, 0 change, 0 destroy before initial apply. |
| OneDeploy attempts | Two ZIP attempts returned HTTP 400. Azure deployment records reached Oryx/deployment command and reported failure without an exposed detailed error. Basic authentication was not enabled to bypass the failure. |
| Runtime repair | Added dependency-free Node entry point, changed startup to `npm start`, disabled remote build. Local tests/build/smoke passed. Terraform applied 0 add, 1 in-place change, 0 destroy. |
| Managed-identity package plan/apply | Plan/apply: 4 add, 1 in-place change, 0 destroy. Created private storage/container/hash-named blob and least-privilege reader role; updated Web App run-from-package settings. |
| Approved B1 upgrade plan | Refreshed plan on both attempts: 0 add, 2 in-place changes, 0 destroy. Intended changes were App Service plan `F1` to `B1` and Web App Always On `false` to `true`. |
| Approved B1 attempt 1 | Failed with Azure HTTP 409 Conflict, ExtendedCode `03029`: `No available instances to satisfy this request. App Service is attempting to increase capacity. Please retry your request later or consider enabling Async Scaling ... If urgent ... new resource group.` No resource was destroyed or replaced. |
| Approved B1 attempt 2 | A bounded retry failed identically with Azure HTTP 409 Conflict and ExtendedCode `03029`. No resource was destroyed or replaced. Further retries were stopped to avoid uncontrolled repetition. |
| Azure resources | Resource group `rg-folio-bookstore-dev-cin`; plan `asp-folio-bookstore-dev-cin`; Web App `folio-bookstore-dev-7b53f31b`; storage `stfoliodev7b53f31b`; private container `deployments`; system identity `c37af2dc-2ef3-4ec1-8e00-9afaa92fd8fb`. |
| Intended endpoint | `https://folio-bookstore-dev-7b53f31b.azurewebsites.net` |
| Current Azure state | App Service plan remains `F1`; Web App remains `QuotaExceeded`. Existing storage, private package, managed identity, RBAC, TLS, and publishing-auth controls remain intact. |
| Live validation | Six bounded checks returned HTTP 403 with Azure's “web app is stopped” response. Root, status API, and catalog API acceptance therefore did not pass. No live deployment success is claimed. |
| Rollback/recovery | No rollback or destructive operation executed. All resources and private package remain provisioned for restart after quota/cost resolution. |

Safe next choices:

1. Wait for Azure capacity and retry the already approved in-place B1 plan later, first refreshing state and confirming it remains non-destructive.
2. Wait for the F1 quota to reset, start the existing Web App, and rerun root/status/catalog validation without changing topology.
3. If urgent, separately evaluate capacity in another Azure region and obtain explicit approval before creating a new resource group or changing topology. Azure's async-scaling suggestion also requires separate architecture, behavior, and cost assessment before enablement.

Do not claim deployment success until the Web App runs and root, status API, catalog API, and critical smoke validation pass.

## 11. Change-aware deployment-agent rerun (2026-08-04)

### Repository and platform evidence

- Repository root was rescanned. The actual application remains the single Node 20/Vite SPA and REST API described above; no database adapter, container, cache, queue, search, AI service, or real external provider was added.
- Git remote is hosted on GitHub; authenticated repository context is `Ecognity1/AI-Agents` with default branch `main`. GitHub Actions is therefore the selected CI/CD platform.
- Azure CLI remains authenticated to subscription `7b53f31b-558b-4108-b0c2-8fc0c7ea7435`.
- Read-only Azure inventory confirms the existing Central India resource group still contains `asp-folio-bookstore-dev-cin`, `folio-bookstore-dev-7b53f31b`, and `stfoliodev7b53f31b`.

### Generated modular IaC

| File | Purpose |
|---|---|
| `infrastructure/terraform/versions.tf` | Pins Terraform and AzureRM and declares a partial AzureRM backend. |
| `infrastructure/terraform/providers.tf` | AzureRM provider configuration. |
| `infrastructure/terraform/main.tf`, `variables.tf`, `outputs.tf` | Reusable root composition and interface. |
| `infrastructure/terraform/imports.tf` | Declarative adoption of the six existing resources; prevents blind recreation after local-state loss. |
| `infrastructure/terraform/modules/folio/*` | Focused module for resource group, B1 plan target, Web App, private artifact storage/container, and least-privilege package-reader role. |
| `infrastructure/terraform/environments/development.tfvars` | Existing development resource names and the user-approved B1 target. |
| `infrastructure/terraform/environments/backend.hcl.example` | Non-secret remote-state input contract. |
| `infrastructure/terraform/.terraform.lock.hcl` | AzureRM 3.117.1 provider lock. |
| `infrastructure/terraform/.gitignore` | Excludes state, plans, packages, and local backend configuration. |

Local backend-disabled validation from the actual Terraform root passed: module initialization, AzureRM 3.117.1 installation, `terraform validate`, and recursive format check. No import or apply ran. A recovery plan was attempted only as a read-only ownership proof, but Terraform correctly refused because the declared AzureRM backend is not initialized. No local replacement state was created and Azure was not changed.

### Generated GitHub Actions workflows

| Workflow | Behavior | Execution status |
|---|---|---|
| `.github/workflows/infrastructure.yml` | OIDC login; Terraform format/init/validate/plan; serialized remote-state locking; environment-controlled optional apply; outputs/evidence. Pull requests plan only; apply requires manual dispatch and the `development` environment. | YAML parsed locally; not published or executed. |
| `.github/workflows/application.yml` | `npm ci`, Node tests, Vite build, SHA-256 ZIP, private blob upload using Azure AD, Terraform package-reference deployment, and six bounded root/status/catalog checks. | YAML parsed locally; not published or executed. |

Application validation for this rerun: `npm.cmd test` passed 11/11 and `npm.cmd run build` passed. `git diff --check` passed.

### Secure CI/CD bootstrap and required inputs

The initial scan found no Actions inputs, OIDC identity, or remote state. After explicit approval, the following minimum bootstrap was completed without a client secret:

- GitHub environment: `development`.
- Environment secrets: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID`; these contain identifiers only. No client secret exists.
- Environment variables: `TF_STATE_RESOURCE_GROUP=rg-folio-bookstore-dev-cin`, `TF_STATE_STORAGE_ACCOUNT=stfoliodev7b53f31b`, and `TF_STATE_CONTAINER=tfstate`.
- Private state container: ARM-managed `tfstate` container in the existing storage account, with public access disabled.
- Entra application/client ID `a41576b5-7822-498a-ba41-910ab9fbc325`, service-principal object ID `6d760af1-35d5-41d2-a097-e59741e0313e`.
- Federated credential restricted to issuer `https://token.actions.githubusercontent.com`, audience `api://AzureADTokenExchange`, and GitHub's immutable repository/environment subject `repo:Ecognity1@253695279/AI-Agents@1314883726:environment:development`.
- `Contributor` is limited to the existing resource group; `Storage Blob Data Contributor` is limited to the existing storage account. No subscription-wide role was granted.

The deployment files and workflows are published on `main` at commit `a1e1a3d1f335811dc85cc5e96ea2be5cce2f6239`. That pre-existing shared commit also contains broader repository files; it was not rewritten during deployment.

### GitHub Actions execution evidence

| Run | Result and evidence |
|---|---|
| Infrastructure `30908452234` | Failed at `azure/login` before Terraform with `AADSTS700213`. GitHub emitted an immutable repository-ID subject that did not match the original name-only federated subject. No Terraform action ran. |
| OIDC repair | Existing federated credential was updated in place to the exact observed immutable subject. Issuer, audience, application, environment, and RBAC scopes were unchanged. |
| Infrastructure apply `30908655529` | OIDC login, remote-state initialization, formatting, validation, and plan passed. Plan: **6 imports, 0 add, 2 in-place changes, 0 destroy**. Apply imported all six existing Azure resources into locked remote state, then failed changing F1 to B1 with Azure HTTP 409, ExtendedCode `03029` (regional instances unavailable). State lock released; no replacement or destruction occurred. |
| Infrastructure reconciliation `30908849978` | Plan-only run passed. It showed **0 add, 2 in-place changes, 0 destroy** and no remaining imports, proving remote-state adoption persisted. The only drift is the approved F1-to-B1 plan change and Web App Always On. |
| Application workflow | Not triggered because the infrastructure apply gate failed. This preserves the required infrastructure-before-application order. |

Post-run Azure evidence: plan remains F1; the control plane briefly reported the Web App `Running`/`Normal`, but the actual HTTPS request returned HTTP 503. App settings still point to the private hash-named package using `SystemAssigned` managed identity and `/home/data/folio.json`. Root, status API, catalog API, and newly built artifact deployment are therefore not validated.

### Safe recovery and execution sequence

1. Wait for Azure Central India B1 capacity and rerun the existing infrastructure workflow with `apply=true`; first confirm the plan remains 0 add, 2 in-place changes, 0 destroy.
2. Do not enable async scaling or create a new resource group/region/topology without separate review and approval.
3. After infrastructure succeeds and B1/Always On are verified, run the application workflow.
4. Require the immutable blob publication and HTTP 200 from root, status API, and catalog API before accepting deployment.

No additional paid topology, new region/resource group, or async scaling was introduced. Application deployment remains blocked by external App Service capacity.

## 12. Final outcome

**BLOCKED**

## 13. Authorized South India redeployment

The user authorized changing region and redeploying while preserving the Central India resources. Azure's live App Service location query for Linux B1 lists South India as supported, and Azure identifies South India as Central India's paired region. South India is selected as the closest architecture-compatible alternative; this is service-support evidence, while actual capacity is validated only by the infrastructure apply.

| Item | South India deployment |
|---|---|
| Region | `southindia` |
| Resource group | `rg-folio-bookstore-dev-sin` |
| App Service plan | `asp-folio-bookstore-dev-sin`, Linux B1, one instance, Always On |
| Web App | `folio-bookstore-dev-sin-7b53f31b` |
| Deployment storage | `stfoliosin7b53f31b`, Standard LRS, private `deployments` container |
| Remote state | Existing private state account/container, isolated key `folio/southindia-development.tfstate` |
| Intended endpoint | `https://folio-bookstore-dev-sin-7b53f31b.azurewebsites.net` |

The Central India state key and all Central India resources are retained. The new state imports only the separately bootstrapped South India resource group, then creates the new regional plan, Web App, storage account, and private container. The deployment pipeline identity remains environment-scoped; it must receive Contributor only on the new resource group and Blob Data Contributor only on the new storage account. The new Web App identity must receive Blob Data Reader only on the new storage account before package activation. No subscription-wide role is permitted.

Until the new deployment passes infrastructure apply, private-package RBAC, application workflow, and HTTP root/status/catalog checks, the overall outcome remains **BLOCKED**.
