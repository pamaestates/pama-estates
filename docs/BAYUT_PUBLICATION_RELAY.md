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
