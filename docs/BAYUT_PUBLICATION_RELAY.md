# Bayut publication relay

This public website is the outward-facing delivery surface for a future PAMA Core Bayut/dubizzle XML feed. The relay must never expose operational CRM data directly.

Planned public routes:

- `/feeds/bayut.xml` — reads one pre-approved sanitized immutable XML snapshot from an isolated server-side relay store.
- `/portal-media/[mediaId]/[token]` — streams an approved private relay media copy only after server-side row/state and HMAC checks.

Required server-only environment variables:

- `PAMA_PUBLICATION_SUPABASE_URL`
- `PAMA_PUBLICATION_SUPABASE_SERVICE_ROLE_KEY`
- `PAMA_BAYUT_MEDIA_GATEWAY_SECRET`

No publication route accepts writes. No secret may use a `NEXT_PUBLIC_` prefix.

The route code is designed to fail closed (503/404) until the relay schema, server credentials and an explicitly active snapshot exist.
