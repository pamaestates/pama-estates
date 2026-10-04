# Bayut publication relay

Status: **implemented on `feature/bayut-publication-relay`, intentionally unconfigured/fail-closed until the isolated publication store exists and has an approved snapshot.**

This public website is the outward-facing delivery surface for PAMA Core Bayut/dubizzle XML publication. The relay must never expose operational CRM data directly.

Implemented public routes:

- `/feeds/bayut.xml` — reads one pre-approved sanitized immutable XML snapshot from an isolated server-side relay store. Returns `503` when no relay configuration/approved snapshot exists. Supports conditional GET/HEAD via ETag and never serves stale listing state beyond the short revalidation window.
- `/portal-media/[mediaId]/[token]` — streams an approved private relay media copy only after server-side row/state and HMAC checks. Invalid or unconfigured requests fail closed as `404`; upstream storage failure returns `503`. GET and HEAD are supported.

Required server-only environment variables:

- `PAMA_PUBLICATION_SUPABASE_URL`
- `PAMA_PUBLICATION_SUPABASE_SERVICE_ROLE_KEY`
- `PAMA_BAYUT_MEDIA_GATEWAY_SECRET`

No publication route accepts writes. No secret may use a `NEXT_PUBLIC_` prefix.

## Required relay-store contract before activation

The public website expects two isolated server-only resources:

- `portal_publication_snapshots` — one explicitly active approved BAYUT snapshot at a time, containing XML, SHA-256 fingerprints, source revision, approval/generation timestamps and listing-reference manifest.
- `portal_publication_media` — approved immutable media copies with provider, private storage bucket/path, SHA-256 content hash, MIME type, size and an explicit active flag.

The relay-store migration must enable RLS, revoke `anon`/`authenticated`, explicitly grant only the server role required by the publication service, and use a private storage bucket. Activation of a new snapshot must be atomic so the public route never observes two active versions or a partially updated feed.

## Security properties

- operational PAMA Core tables are not read by the public website;
- PRIVATE/OFF_MARKET/owner/contact/internal CRM data is absent from the relay schema;
- media URLs are durable HMAC paths, not expiring Supabase signed URLs;
- content hashes make media/version changes auditable and revocable;
- XML is served only from an explicit approved snapshot;
- unconfigured state is intentionally unavailable rather than falling back to live CRM data.

## Activation checklist

Before setting production environment variables or sending the feed URL to Bayut:

1. create/review the isolated publication schema and private storage bucket;
2. implement the authenticated local PAMA Core publisher that writes only a sanitized approved snapshot and approved media copies;
3. verify the snapshot contains every and only ACTIVE + PUBLIC + Bayut/dubizzle-enabled + publication-ready listing;
4. verify every XML image/floor-plan URL returns public HTTPS `200`/`HEAD 200` with correct MIME and no expiring credentials;
5. verify XML is well-formed, unique by `Property_Ref_No`, and matches the provider contract;
6. externally fetch `/feeds/bayut.xml` from the production custom domain and verify HTTP headers/content;
7. only then share the URL with Profolio Support.
