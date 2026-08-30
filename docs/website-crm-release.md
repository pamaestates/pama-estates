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

## Public opportunities safety

`src/lib/public-opportunities.ts` is intentionally publication-gated.

- Do not auto-sync private CRM/off-market records to the public site.
- A property may render publicly only after explicit publication approval and verification.
- Current asking price must be labelled as asking, never as an achieved DLD/transaction price.
- Original price, owner acquisition price, yields, service charges, rental values and price-journey figures may be published only when verified and publication-safe.
- Never invent missing figures to fill a card.

## Release gate

Do not merge PR #8 until:

1. exact-head Vercel Preview is READY;
2. Preview environment variables are configured;
3. runtime QA above passes;
4. final desktop/mobile visual QA is completed;
5. Production environment variables are configured;
6. PR is merged with expected-head SHA protection;
7. resulting exact `main` SHA reaches Vercel Production READY;
8. live smoke tests confirm homepage, `/opportunities`, `/property-review`, `/sell-with-us`, sitemap, robots and CRM intake behavior.
