# PAMA Estates website

Next.js website for PAMA Estates. The release requirements for the CRM-first lead intake are authoritative in [docs/website-crm-release.md](docs/website-crm-release.md).

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Before opening or updating a release PR, run:

```bash
npm audit --audit-level=high
npm run lint
npm run typecheck
npm run build
```

## Environment and release safety

`.env.example` contains placeholders only. Set the server-only `PAMA_CORE_WEBSITE_INTAKE_URL` and `PAMA_CORE_WEBSITE_INGEST_SECRET` values in `.env.local` for local development and in Vercel for each environment. Never commit, log, screenshot, or expose real secrets; do not use `NEXT_PUBLIC_*` for either value.

The website submits CRM intake through same-origin `/api/lead`. Follow the release contract for configured Preview QA, database verification, fail-closed behavior, abuse protection, and the required merge/Production gates. Do not promote to Production outside that process.
