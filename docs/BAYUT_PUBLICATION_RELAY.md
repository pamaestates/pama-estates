# Bayut publication relay

Current runtime uses Vercel Blob, not the historical proposed Supabase relay schema. The relay must never expose operational CRM data directly.

Current routes:

- `/feeds/bayut.xml` — sanitized stable XML snapshot from a deterministic public Blob URL, zero LIST.
- `/feeds/bayut.xml?candidate=<sha256>` — immutable XML with exact SHA validation, zero LIST.
- `/feeds/properties.json` — validated, privacy-sanitized public property snapshot, zero LIST.
- `/api/portal-publication` PUT — trusted authenticated PAMA Core publication relay. Production only on Vercel; one automatic PUT attempt per durable object, at most two for stable Bayut feed plus immutable candidate. Never retries an uncertain write.

Required server-only environment variables:

- `BLOB_READ_WRITE_TOKEN`
- `PAMA_PUBLICATION_RELAY_SECRET`

`BLOB_STORE_ID` is optional when the token supplies the validated store identity; OIDC-only configuration requires it. Public read-only Preview/Development uses nonsecret BLOB_STORE_ID rather than a write credential. No secret may use a NEXT_PUBLIC prefix.

Core owns authorization, approved media selection, reuse-only protection, durable claims and reconciliation. This relay does not submit to Bayut/dubizzle providers. See [cost controls](BLOB_COST_CONTROLS.md) and [production hardening policy](PRODUCTION_HARDENING_AND_VERCEL_POLICY.md) for scope, bounds, environment requirements and release gates. Local hardening is not live until explicitly released.

## Bounded Bayut photo claims (protocol v1)

Every `bayut/media/**` PUT additionally requires `x-pama-bounded-claim` (base64url UTF-8 canonical JSON tuple) and `x-pama-bounded-signature` (lowercase HMAC-SHA256 hex). The exact tuple order is `[1,"BAYUT_MEDIA_INITIALIZATION",runId,listingId,listingReference,pathname,sha256,contentType,issuedAt,expiresAt,intent]`; timestamps are integer Unix seconds, intent is `WRITE`, `VERIFY_ONLY` or `RECONCILE_ONLY`. HMAC input is `pama-bounded-publication:v1:` followed by the canonical tuple bytes. No private source path is transmitted. Both repositories retain identical protocol modules and a synthetic, fixed wire vector.

The dedicated server-only `PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET` must later be configured securely with the SAME high-entropy value in the authorized local Core runtime and **Production only** for pama-estates Vercel. Use at least 32 cryptographically random bytes (encoded for environment storage); it must differ from `PAMA_PUBLICATION_RELAY_SECRET`. Never use NEXT_PUBLIC or commit it. This implementation task does not configure it. Missing/short/reused key fails closed for photo writes; XML/candidate/website paths retain existing authorization.

Core signs only after founder authorization, persisted claim acquisition, exact selection/QA revalidation and source rehash. The relay independently checks canonical shape/version/operation, signature, namespace, listing reference/path, exact type, body SHA, no future issue time, expiry and maximum 120-second lifetime **before any Blob PUT**. It does not forward claims to Blob or return their payload. Invalid claims cause zero storage calls; uncertain storage results retain reconciliation-required behavior and one-attempt semantics.

Replay boundary: this relay is stateless, not a durable one-time-token ledger. A captured WRITE claim can authorize the same exact bytes/type/path again within its short validity window, potentially consuming another PUT. It cannot authorize another object, changed bytes, another namespace or a higher Core budget. Core's database claim, advisory locking and persisted per-object outcomes remain authoritative for run ceilings/idempotency. Protect both secrets and transport; do not blindly retry. No new paid state service is introduced.

Deployment readiness: configure the same dedicated secret securely, deploy the compatible relay and load compatible Core code, keeping PAMA_BLOB_REUSE_ONLY=1. Under separate release authorization, use a server-generated **signed VERIFY_ONLY intent** for a fresh, authorized object/body to test the positive production handshake, plus an invalid-signature negative request. Both must perform zero Blob operations. VERIFY_ONLY is signature-bound and always returns before upload; changing it to WRITE invalidates the signature. This task does not perform either handshake. Only afterward consider separate authorization for the current DB-derived initialization plan (do not assume 33 remains current).

## Uncertain Bayut photo reconciliation

`RECONCILE_ONLY` is the third signature-bound protocol-v1 intent, using the identical canonical tuple and 120-second validity in both repositories. Core sends the current private bytes so the relay verifies the expected SHA-bound request. The relay then GETs only the exact deterministic public URL on the connected store, with no credentials, no cache reuse and redirects disabled. A genuine exact-URL 404 is NOT_FOUND. Exact HTTPS URL, MIME, supported image signature and bounded body SHA agreement is EXACT_MATCH. Wrong bytes/type/path or oversized content is MISMATCH; network/timeouts/non-authoritative status is UNCERTAIN. There is no list(), fallback discovery, write or automatic retry. An image signature check is not a new full image decoder; Core's existing technical/human approval and SHA binding remain necessary.

Core permits this founder-only action solely for RECONCILIATION_REQUIRED. It rechecks organization/run ownership, the persisted in-flight asset, exact current source/selection/QA snapshot and source checksum under the shared advisory lock, and holds the lock through the one read request. It rechecks context/source afterward. NOT_FOUND and EXACT_MATCH release the blocking status and advance a plan revision: an old browser fingerprint cannot authorize another run. EXACT_MATCH adopts only the verified item, never the whole selection. MISMATCH/UNCERTAIN stay blocked. No action clears a run forcibly or continues its old write loop.

Every result keeps run token, attempted object/path/SHA, original attempts/status, timestamp and resolver identity in capped providerMetadata history (latest 20 records). AuditLog holds the full prior run and the result immutably, so a new run/history cap does not destroy the ambiguous evidence. A fresh founder confirmation obtains a fresh plan/run token and counter. QR, website assets, XML and private originals remain unchanged.

Operator sequence after a separately authorized compatible release: reconcile the exact uncertain object -> inspect the result -> refresh/review the authoritative plan -> explicitly confirm a NEW bounded initialization only if resolved. For 007, NOT_FOUND should leave 33 selected / 0 reusable / 33 required; a one-object EXACT_MATCH should leave 33 / 1 / 32. These are incident expectations, not hardcoded invariants. The prompt's historic triple-404 observation is not consumed as a DB override. No live reconciliation occurs in this implementation task.

### Supported write transport

The website now pins @vercel/blob 2.8.1 (previously absent). `put()` uses the installed `allowOverwrite` option, public access, deterministic names, no random suffix, no multipart, the existing cache ages and a 15-second abort signal. Existing overwrite semantics remain unchanged. It validates the returned exact store/path URL and any returned pathname; uncertain failures do not retry. Sanitized diagnostics distinguish TIMEOUT, SDK_NETWORK_FAILURE and RETURNED_VALIDATION_FAILURE without returning raw error bodies.

This pinned SDK exposes no per-put retry option. Its inspected source reads the process-wide `VERCEL_BLOB_RETRIES` control and defaults to 10. The transport sets it permanently to `0` at module load and fails closed if changed; it never temporarily restores defaults across concurrent requests. A real-SDK test with a network-disabled undici MockAgent proves one HTTP attempt on transient failure. Future SDK upgrades must revalidate this implementation contract. No production environment/configuration was changed by this task. The local build guard also blocks direct undici SDK requests, not just global fetch.
