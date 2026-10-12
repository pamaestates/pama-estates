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

Every `bayut/media/**` PUT additionally requires `x-pama-bounded-claim` (base64url UTF-8 canonical JSON tuple) and `x-pama-bounded-signature` (lowercase HMAC-SHA256 hex). The exact tuple order is `[1,"BAYUT_MEDIA_INITIALIZATION",runId,listingId,listingReference,pathname,sha256,contentType,issuedAt,expiresAt,intent]`; timestamps are integer Unix seconds, intent is `WRITE` or `VERIFY_ONLY`. HMAC input is `pama-bounded-publication:v1:` followed by the canonical tuple bytes. No private source path is transmitted. Both repositories retain identical protocol modules and a synthetic, fixed wire vector.

The dedicated server-only `PAMA_BOUNDED_PUBLICATION_CLAIM_SECRET` must later be configured securely with the SAME high-entropy value in the authorized local Core runtime and **Production only** for pama-estates Vercel. Use at least 32 cryptographically random bytes (encoded for environment storage); it must differ from `PAMA_PUBLICATION_RELAY_SECRET`. Never use NEXT_PUBLIC or commit it. This implementation task does not configure it. Missing/short/reused key fails closed for photo writes; XML/candidate/website paths retain existing authorization.

Core signs only after founder authorization, persisted claim acquisition, exact selection/QA revalidation and source rehash. The relay independently checks canonical shape/version/operation, signature, namespace, listing reference/path, exact type, body SHA, no future issue time, expiry and maximum 120-second lifetime **before any Blob PUT**. It does not forward claims to Blob or return their payload. Invalid claims cause zero storage calls; uncertain storage results retain reconciliation-required behavior and one-attempt semantics.

Replay boundary: this relay is stateless, not a durable one-time-token ledger. A captured WRITE claim can authorize the same exact bytes/type/path again within its short validity window, potentially consuming another PUT. It cannot authorize another object, changed bytes, another namespace or a higher Core budget. Core's database claim, advisory locking and persisted per-object outcomes remain authoritative for run ceilings/idempotency. Protect both secrets and transport; do not blindly retry. No new paid state service is introduced.

Deployment readiness: configure the same dedicated secret securely, deploy the compatible relay and load compatible Core code, keeping PAMA_BLOB_REUSE_ONLY=1. Under separate release authorization, use a server-generated **signed VERIFY_ONLY intent** for a fresh, authorized object/body to test the positive production handshake, plus an invalid-signature negative request. Both must perform zero Blob operations. VERIFY_ONLY is signature-bound and always returns before upload; changing it to WRITE invalidates the signature. This task does not perform either handshake. Only afterward consider separate authorization for the current DB-derived initialization plan (do not assume 33 remains current).
