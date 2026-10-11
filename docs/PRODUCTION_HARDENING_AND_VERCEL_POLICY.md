# Production hardening and Vercel policy

Local audit dated 2026-10-12. Baseline production/main commit: `308453b846bd377be578a12f2789027acb7a4da5`. Next and eslint-config-next remain locked/installed at 16.3.8. No remote setting, secret, deployment, publication or billing was changed by this task.

## Branch, Preview and release policy

The earlier `codex/vercel-blob-cost-controls` backup push unexpectedly created a READY Preview. GitHub CI was not the trigger: CI runs on PRs and main pushes; Deep Browser QA runs on PRs targeting main or explicit workflow_dispatch. Neither workflow deploys with Vercel CLI. With no vercel.json opt-out, Vercel's connected Git integration defaults to deploying feature pushes independently of GitHub Actions.

New repository configuration uses `git.deploymentEnabled: { "**": false, "main": true }`. Matching uses minimatch; a matching true rule enables deployment. This suppresses branch backups, including names containing slashes, while keeping the established main production path. It takes effect only on commits containing this config, and does not cancel existing deployments or protect older branches that lack it. Manual CLI/dashboard deployments remain possible. Do not treat a skipped build command as equivalent to preventing creation of a deployment.

External follow-up, separately authorized: verify Project Settings → Git production branch is main, verify Root Directory is this repository, restrict preview creation using project Git/branch-deployment controls where available, enable available Preview deployment protection, and confirm behavior with a separately authorized safe backup. No dashboard control was changed or claimed verified here. Production releases require reviewed code, locked-version tests/typecheck/lint/build, an identified READY rollback, explicit release authorization and one deployment. PR creation can consume CI minutes; do not assume a PR or main push is cost-free.

References: [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration), [Git integration](https://vercel.com/docs/git).

## Environment scope and least privilege

| Variable | Known existing scopes (user evidence) | Target |
| --- | --- | --- |
| BLOB_READ_WRITE_TOKEN | Production, Preview, Development | Production only |
| PAMA_PUBLICATION_RELAY_SECRET | Production | Production only |
| PAMA_CORE_WEBSITE_INGEST_SECRET | Production, Preview | Production only; isolated test backend/credential for explicitly approved Preview testing |
| PAMA_CORE_WEBSITE_INTAKE_URL | Production, Preview | Production; isolated test endpoint only for approved Preview tests |
| BLOB_STORE_ID | Optional with read/write token | Nonsecret public store ID for authorized read-only Preview/Development feed access after removing the write token |

Public deterministic URL reads do not need write authority. Without BLOB_STORE_ID or a token, public feed configuration fails closed. Production token derives the store identity; an additional production variable is not required with the current read/write token. OIDC-only publication needs a valid configured BLOB_STORE_ID. Never expose secrets through NEXT_PUBLIC variables, build artifacts, client bundles, logs or command lines. Local development uses placeholders/mocks, never production write credentials.

Relay PUT and lead POST now reject non-production VERCEL_ENV values before forwarding, even if production secrets are accidentally supplied. This protects runtime behavior, but does not protect against arbitrary untrusted Preview code reading an available secret. Removing the write/ingest secrets from Preview/Development remains a priority external action. Undefined VERCEL_ENV permits existing local mock testing; local environments must remain secret-safe. Current production configuration is unchanged.

## Publication relay security

The relay requires a server-only shared secret and uses timingSafeEqual after a length check. It permits only website/ and bayut/ namespaces; traversal, encoded/non-ASCII paths, backslashes, empty segments, dot segments and directory-only destinations are rejected. MIME is allowlisted (JPEG/PNG/WebP/PDF/JSON/XML). This is an authenticated trusted Core relay, not a public upload endpoint; byte-content sniffing and asset authorization remain Core responsibilities. A leaked relay credential has broad namespace overwrite power, so rotate it through a separately authorized procedure if exposure is suspected.

Both declared and streamed input are capped at 25 MiB before a full body is buffered. Empty input fails. Blob identity now uses the same strict DNS/store/token contract as public reads, including mismatch rejection. Uploads reject redirects, time out after 15 seconds and cap response acknowledgements at 64,000 bytes. Durable acknowledgements must match HTTPS, the exact store hostname and requested pathname, with no credentials/query/fragment. Upstream error bodies are never relayed or logged.

Automatic upload invariant remains one PUT attempt per durable object; stable Bayut feed plus immutable candidate uses at most two attempts. No write retries, list/discovery, copy, head or delete were added. An uncertain/partial response requires manual reconciliation, including a success followed by invalid acknowledgement. A shared secret does not prevent replay by an authorized/compromised caller: durable idempotency/reuse/claims in Core are still required. Overwrite is intentional for deterministic assets/feeds; one-year asset cache means URL replacement can remain stale. Prefer Core reuse and separately reviewed content-addressed paths before changing that contract.

## Lead abuse and idempotency policy

Lead POST checks Origin, Sec-Fetch-Site when present, JSON type, bounded byte count, submission age (24 hours/five-minute future skew), allowed form/type, contact fields and a valid upstream URL. Landing pages are stripped to matching-origin path. Forwarding uses an eight-second timeout and redirects are forbidden; responses/logs expose only generic codes/status/error class. Submission ID is passed unchanged to Core and duplicate acknowledgements are retained. Deduplication is authoritative in Core, not a website process-local map. A caller replay still costs one function/upstream request even when Core deduplicates. Browser same-origin headers are CSRF protection, not bot authentication: scripted attackers can forge them and generate fresh submission IDs.

Do not add in-memory rate limiting. Separately authorize persistent platform enforcement: start with a monitored WAF rule scoped to POST /api/lead (for example 10 requests/IP/minute and 100/hour, adjusted after legitimate/NAT traffic review), then block/rate-limit confirmed abuse. Use managed bot detection/challenge only on browser lead flows and validate form failure/retry UX. Confirm rule availability/cost on Hobby before enabling anything. Explicitly exclude /api/portal-publication from generic browser challenges; its machine requests use shared-secret auth. Also protect the Core ingest endpoint independently. No WAF/Bot rule was enabled in this task.

## Route/function/cache and cost inventory

| Path | Operation / frequency | Cost category | Current guardrail | Risk / recommendation |
| --- | --- | --- | --- | --- |
| Public static marketing/area/contact/privacy pages | Static generation; browser assets | CDN transfer | No server proxy or runtime external fetch | Retain static pages |
| Properties/detail pages, sitemap and metadata | Public JSON GET; shared request-driven 60-second Next cache | Public Blob/CDN reads and revalidation | Direct deterministic URL, sanitized public contract; 0 LIST | Metadata/page consumers may request same feed; Next shared fetch cache prevents discovery. Keep 60-second freshness contract |
| /feeds/properties.json | Public snapshot GET; at most 3 transient GET attempts on cache miss | Function + public transfer | 60-second CDN cache, ETag/hash/count, privacy validation; 0 LIST | no-store upstream is deliberate for feed freshness; errors uncached |
| /feeds/bayut.xml | Stable XML GET, up to 3 transient GET attempts | Function + public transfer | 60-second CDN cache; 0 LIST | Retain freshness and envelope/hash checks |
| /feeds/bayut.xml?candidate=SHA | Exact immutable candidate GET, bounded transient read retries | Function + public transfer | One-year cache, SHA verification; 0 LIST | Arbitrary valid hashes can cause miss requests; review scoped WAF rate policy if abused |
| /api/portal-publication durable asset | Authenticated PUT, one attempt/request | Blob Advanced operation | Auth, production gate, namespace/MIME/stream bounds, timeout, no retry | Replay/overwrite power; keep Core reuse-only and durable claims |
| Same route, bayut/feed.xml | Stable PUT then one immutable candidate PUT | At most 2 Advanced operations/request | Fail-stop, no retry, safe partial-error message | Reconcile ambiguous result; do not repeat blindly |
| /api/lead | One required secret-bearing Core POST per valid submission | Function + Core processing | Production gate, same-origin/schema/stream checks, timeout; durable Core dedup | Durable WAF/rate limiting external follow-up |
| next/image | Optimized approved public images and static logo | Image transforms/cache + source transfer | Responsive sizes, default format/quality, one-year media source cache | Broad Blob remotePatterns permits any store; narrow only after confirming all approved image origins |

Runtime search found no Blob LIST/COPY/HEAD/DELETE, Vercel management API calls, autonomous cron/publication jobs or middleware/proxy. Only publication uploadBlob performs Blob API PUT. Other third-party runtime fetches are public storage reads or the authorized Core ingest proxy; CSS Unsplash backgrounds are browser transfers, not secret-bearing server calls. Dynamic routes are limited to the two feed handlers and two mutation APIs. Their dynamic/no-store behavior is justified by request-specific checks and write safety; no speculative cache change was made.

## Workspace root, images and headers

Parent lockfile: C:\Users\ptmsd\pama-estates\package-lock.json, outside Git root. This standalone repository has its own lockfile and no workspace declaration. Pin turbopack.root and outputFileTracingRoot to the repository config directory using the supported Next configuration; do not delete/change the parent lockfile. [Next root documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack).

Next Image remains enabled. Property grids/galleries/thumbnails use sizes; logo/cover/lightbox priority behavior is retained. No speculative quality/format/cache changes. Blob remotePatterns and CSP are broad across stores; narrowing requires a complete approved-source inventory. Current HSTS, DENY frame policy/frame-ancestors, nosniff, referrer and permissions policies, COOP, self-only connect, object-src none remain intact. Inline Next scripts/styles currently require unsafe-inline; a strict nonce CSP is a separate tested change, not a safe blanket removal. Blob images, lead API and local/static functionality remain compatible.

## Local validation

Website focused tests: 28/28 PASS (16 existing cost tests plus 12 new hardening tests). TypeScript PASS; file-scoped ESLint PASS; diff-check PASS. One local production build PASS against installed Next 16.3.8, with the existing Blob network blocker and process-only invalid storage configuration. No workspace-root warning or other build warning was emitted. Build output remains local verification output only. Core signature/budget fixture tests: 15/15 PASS; Core TypeScript and scoped lint PASS. No database mutation or real Blob/relay call was used.

## Cost thresholds and release/rollback checklist

Latest user-provided Blob evidence: 2026-10-11 ~20:28 GMT+4, 1,761/2,000 Advanced operations visible (88.05% minimum); the 239 theoretical remainder is only an upper bound. These are historical, not refreshed totals. Keep CRITICAL CONSERVATION MODE: real local Blob/relay operations zero; no new-media test or 49-write initialization. Suggested monitored policy: 70% attention, 80% conservation, 85% critical review, 90% no new writes, 95% hard stop; historical minimum already crosses critical review, so do not loosen the existing stricter prohibition. Configure notifications externally only with authorization.

Before release: review exact diff/commit; locked Next 16.3.8; focused cost/security tests; typecheck/lint/diff-check; local build with Blob traffic blocked; confirm environment scopes; verify main-only Git policy on the exact pushed commit; identify previous READY deployment; obtain release authorization. The local blocked-network build verifies compilation/routes and uses empty feeds, not a production content snapshot. Never deploy that local verification output.

After separately authorized release: one production deployment, verify health and protected API behavior without mutation, check logs/metrics without Blob discovery, retain Core reuse-only. Do not use a live PUT as a security check. For rollback, record the pre-release READY deployment/commit and use the established Vercel rollback path only with authorization; keep reuse-only and secret scoping protection. A rollback to 308453b retains Blob cost controls but loses these new hardening guards. Vercel rollback may affect future automatic alias assignment; inspect/re-enable deliberately. No rollback was executed here.
