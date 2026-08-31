# Website → PAMA Core release contract

This document is the release checklist for the CRM-first website intake introduced in PR #8.

## Server-only Vercel variables

Configure both variables in **Preview** and **Production** for the `pama-estates` Vercel project:

- `PAMA_CORE_WEBSITE_INTAKE_URL`
  - Must be the verified PAMA Core Production/Preview endpoint ending in `/api/v1/intake/website` as appropriate for the environment.
  - Do not guess or derive a hostname from a project name.
- `PAMA_CORE_WEBSITE_INGEST_SECRET`
  - Must exactly match PAMA Core `WEBSITE_INGEST_SECRET` for the corresponding environment.
  - Server-only. Never expose it through `NEXT_PUBLIC_*`, client bundles, logs, screenshots, PR comments or repository files.

PAMA Core also requires its own server configuration, including `WEBSITE_INGEST_ORGANIZATION_ID` and the matching `WEBSITE_INGEST_SECRET`.

## Fail-closed behavior

The public website posts only to same-origin `/api/lead`.

`/api/lead` must:

1. validate payload size and input;
2. require both server-only variables above;
3. forward to PAMA Core with Bearer authentication;
4. return an error when PAMA Core is unavailable/rejects the request;
5. never return or log the ingest secret.

The browser must not continue to the normal WhatsApp handoff when CRM capture fails. A separate direct-contact fallback link may be displayed to the user.

## Runtime QA before merge

Use non-production test contact details and verify all of the following against the exact Preview head:

- Homepage Private Access — Investor → `PRIVATE_ACCESS_INVESTOR` / `BUYER`
- Homepage Private Access — End User → `PRIVATE_ACCESS_END_USER` / `BUYER`
- Homepage Private Access — Broker → `BROKER_COLLABORATION` / `BROKER`
- Sell With Us — Sell → `SELL_WITH_US` / `SELLER`
- Sell With Us — Rent Out → `RENT_WITH_US` / `LANDLORD`
- Owner Property Review — Sell → `PROPERTY_REVIEW` / `SELLER`
- Owner Property Review — Rent Out → `PROPERTY_REVIEW` / `LANDLORD`
- Owner Property Review — Exploring → `PROPERTY_REVIEW` / `OTHER`

For each relevant flow verify:

- one CRM Lead/Interaction is created;
- retry of an unchanged submission does not create a duplicate;
- changing the form creates a new submission ID where implemented;
- `landingPage` is captured;
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` are preserved when present;
- malformed email/mobile fails validation;
- missing server configuration returns fail-closed error;
- upstream rejection/unavailability returns fail-closed error;
- WhatsApp handoff occurs only after successful CRM capture;
- no ingest secret appears in browser responses or logs.

## Final single-batch repository hardening

Before the configured Preview QA, make the following small repository changes together in **one commit** so Vercel produces one consolidated Preview deployment rather than a deployment for each housekeeping change:

1. **Sell With Us classification**
   - make `Purpose` required so normal submissions cannot silently fall back to `OWNER_INQUIRY` / `OTHER`;
   - retain server-side fallback defensively, but the normal UI must require either `Sell` or `Rent Out`.
2. **Explicit TypeScript CI gate**
   - add a `typecheck` script using `tsc --noEmit`;
   - run it in permanent CI before the production build.
   - `tsconfig.json` is already `strict: true` and `noEmit: true`.
3. **Safe local environment template**
   - allow `.env.example` through `.gitignore` while continuing to ignore real `.env*` files;
   - add `.env.example` containing only placeholder values for `PAMA_CORE_WEBSITE_INTAKE_URL` and `PAMA_CORE_WEBSITE_INGEST_SECRET`;
   - never place a real endpoint secret in the repository.
4. **Repository README**
   - replace the default create-next-app README with a concise PAMA Estates developer/release README pointing to this release contract and documenting local commands and secret-handling rules.

Do not split these housekeeping changes into separate commits/deployments unless an isolated rollback is genuinely required.

## Abuse protection

Same-origin browser checks are an integrity layer, not a complete anti-abuse boundary because scripted clients can forge ordinary request headers.

After the real configured Preview integration QA passes:

- configure conservative Vercel-native rate limiting / bot protection for public `/api/lead` using features supported by the current Vercel plan;
- avoid aggressive thresholds that could block genuine clients or the release QA itself;
- re-smoke-test a normal form submission after enabling the control;
- do not add unofficial third-party CAPTCHA/automation dependencies merely to satisfy this gate.

## Public opportunities safety

`src/lib/public-opportunities.ts` is intentionally publication-gated.

- Do not auto-sync private CRM/off-market records to the public site.
- A property may render publicly only after explicit publication approval and verification.
- Current asking price must be labelled as asking, never as an achieved DLD/transaction price.
- Original price, owner acquisition price, yields, service charges, rental values and price-journey figures may be published only when verified and publication-safe.
- Never invent missing figures to fill a card.

## Release gate

Do not merge PR #8 until:

1. final single-batch repository hardening above is complete and exact-head CI/Deep Browser QA pass;
2. exact-head Vercel Preview is READY;
3. Preview environment variables are configured;
4. runtime QA above passes against the configured Preview and database deltas match expectations;
5. final desktop/mobile visual QA is completed;
6. Production environment variables are configured;
7. conservative public lead abuse protection is configured and normal submission is re-smoke-tested;
8. PR is merged with expected-head SHA protection;
9. resulting exact `main` SHA reaches Vercel Production READY;
10. live smoke tests confirm homepage, `/opportunities`, `/property-review`, `/sell-with-us`, sitemap, robots and CRM intake behavior.
