# Blob runtime cost controls

Ordinary public reads use deterministic public URLs, never storage discovery. Public URL format: https://<store-id>.public.blob.vercel-storage.com/<pathname> ([Vercel contract](https://vercel.com/docs/vercel-blob/public-storage)). Store identity comes from existing BLOB_STORE_ID or the existing read/write token's store segment. IDs must be DNS labels; conflicting identities and malformed configuration fail closed. Only the three known feed path patterns are allowed. The credential is never attached to a public GET or returned to clients.

## Operation inventory

| Runtime path/action | Class | Before Advanced operations | After Advanced operations |
| --- | --- | --- | --- |
| /feeds/properties.json | Public READ | 1 LIST normally; up to 3 attempts | 0 |
| /feeds/bayut.xml | Public READ | 1 LIST normally; up to 3 attempts | 0 |
| /feeds/bayut.xml?candidate=<sha> | Public READ | 1 LIST normally; up to 3 attempts | 0 |
| Property page feed retrieval | Public READ | Indirect LIST per uncached fetch/render | 0 |
| /api/portal-publication durable asset | Authenticated WRITE | Up to 3 PUT attempts | At most 1 PUT attempt |
| Changed Bayut stable feed plus immutable candidate | Authenticated WRITE | 2 normal; up to 6 PUT attempts | At most 2 PUT attempts total |

The only Blob API HTTP call remaining in runtime source is uploadBlob's PUT in src/app/api/portal-publication/route.ts. Both stable-feed and immutable-candidate branches use that helper. There are no runtime LIST, COPY, HEAD or DELETE API calls. Public URL fetches in both feed routes and public-properties.ts are CDN reads, not Advanced operations. next.config.ts only contains image/CSP hostname configuration. No admin/test storage calls exist; the regression harness substitutes every fetch and never connects to storage.

## Caching and integrity

- Photos, floor plans and QR: existing 31,536,000-second source cache preserved.
- Stable JSON/XML: existing 60-second public/CDN cache with 60-second stale-while-revalidate preserved. Missing website JSON retains the empty feed and short 30-second cache; errors remain uncached.
- Immutable SHA candidate: 31,536,000-second source/response cache; exact body SHA and XML envelope still validated before serving.
- Property-page data: shared Next fetch revalidation of 60 seconds. It fetches the deterministic public JSON URL directly, avoiding an extra self-HTTP function and the feed-route CDN cache layer. Validation and OP privacy sanitization still run. This is bounded request-driven revalidation, not a strict 60-second freshness SLA during upstream/CDN errors; the Blob's existing short overwrite cache can also briefly serve the prior body.
- ETag/304, publication hashes/counts, XML headers and privacy checks remain active.

## Write uncertainty

Every upload helper invocation makes one PUT only, including transient HTTP failure or a thrown network/body-read error. Failure is returned with a reconciliation instruction; no automatic PUT retry occurs. A Bayut stable-feed success followed by candidate failure reports that partial state. The caller must reconcile rather than blindly repeat a potentially completed write. Core's existing reuse-only guard and deliberate claim/reconciliation workflow are unchanged.

## Image, function and abuse audit

Next Image remains enabled. Gallery and property pages specify responsive sizes; thumbnails request small variants. No custom quality proliferation was found. Existing default format/quality/device sizes and minimum TTL are retained: long source cache already prevents unnecessary reoptimization, and no evidence supports changing visual quality or responsive breakpoints. Recommendation for a separate reviewed task: narrow the broad Blob remotePatterns hostname to the actual store to reduce arbitrary optimizer use; measure transformation counts before tuning sizes/formats.

No middleware/proxy runtime was found. Feed handlers remain dynamic for request-specific candidate/ETag handling; explicit successful HTTP cache headers are retained. Publication relay and lead submissions remain uncached. Lead POST is a required server proxy carrying the private ingest secret; it enforces same origin, content type, body bounds, submission age, input validation and an upstream timeout. It has no durable abuse limiter. Recommend reviewed Vercel WAF/Bot Protection/rate-limit rules scoped to /api/lead, with false-positive testing and an explicit exclusion for authenticated /api/portal-publication. No firewall settings were changed and no in-memory limiter was added. Feed bodies are returned whole; pagination/streaming would change contracts and is deferred.

## Local validation / release

Run npm run test:cost-controls, npm run typecheck, scoped ESLint, and git diff --check. Local build can use tests/block-blob-network.cjs in NODE_OPTIONS plus process-only invalid Blob configuration to prevent storage traffic. Such a build verifies compilation/routes only and is not a deployable production feed snapshot. No environment file is changed.

This patch stops future Advanced-operation consumption from normal feed reads once deployed. It does not refund historical usage or clear the existing 90% warning. Keep PAMA_BLOB_REUSE_ONLY=1 and defer all 48 pending durable writes. A separately authorized single website deployment is required for the emergency fix to become live; no Core deployment or media publication is needed.

Local runtime caveat: installed Next reports 16.2.2, while package.json/package-lock.json specify 16.3.8. No dependencies were changed or installed. TypeScript/build passed against the installed runtime; release should validate the locked version through the existing deployment build. The only build warning was multiple workspace lockfiles/root inference; no speculative root/lockfile change was made.
