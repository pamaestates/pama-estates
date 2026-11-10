# PL-BUILD-01 — provisional acceptance register

Status: **development only**. This register measures verifiable acceptance gates, **not** engineering hours, production readiness or a signed-off percentage of the original business scope. Founder approval of this register is pending.

## Scope and immutable guardrails

- Work only on the isolated `feature/pl-build-01-localization` branch.
- No production deployment, merge to `main`, database modifications, storage writes, publication changes or external integration mutations.
- Existing English website and public property feed remain the source of truth.
- Polish routes remain `noindex` and excluded from sitemap until a separately approved release.
- Do not assume translation approval authorizes SEO indexing or deployment.

## Acceptance gates

| ID | Objective evidence required | Status | Evidence / outstanding verification |
| --- | --- | --- | --- |
| PL01 | Isolated feature branch and main-only Vercel deployment setting | PASS | Branch inspected; `vercel.json` has `"**": false` and `"main": true` |
| PL02 | Polish homepage, catalogue and editorial routes implemented | PASS | Next build and local HTTP test: 25 routes returned 200 |
| PL03 | Original Polish advisory content available on editorial routes | PASS — IMPLEMENTATION | Source contains Polish sections; editorial sign-off is separate (PL11) |
| PL04 | Catalogue reads public facts without duplicating operational listings | PASS — IMPLEMENTATION | `src/app/pl/properties/page.tsx`, `src/lib/public-properties.ts` inspected; live-feed acceptance is PL09 |
| PL05 | Supported language targets and localized contact affordances | PASS — SOURCE/HTTP | `tests/pl-safety.test.mjs` plus 25 English alternates returned 200; interactive browser QA is PL10 |
| PL06 | Indexing stays disabled and unapproved listing copy is withheld | PASS — LOCAL | Four safety tests; rendered `noindex` on sampled Polish routes; Polish routes excluded from sitemap |
| PL07 | Source checks, TypeScript and Next.js compilation | PASS | Four safety tests, TypeScript, scoped ESLint and local build passed on 11 Nov 2026 |
| PL08 | Local Polish navigation and canonical URLs resolve | PASS — HTTP | 25 Polish routes, 8 internal destinations, 25 English alternatives, no failures (11 Nov 2026) |
| PL09 | Individual property pages agree with real approved public feed | NOT VERIFIED | Needs authorized read-only feed access and representative property-detail checks; no private data |
| PL10 | Browser/mobile layout, menu, language switch and contact interactions | BLOCKED | Local Chromium socket creation denied by execution environment; use a browser-capable isolated environment |
| PL11 | Founder/editorial approval of Polish marketing claims and tone | PENDING APPROVAL | Requires human review of displayed copy, including sensitive luxury/off-market wording |
| PL12 | Polish privacy/legal wording reviewed | PENDING APPROVAL | English privacy policy remains authoritative; no Polish legal translation is approved |

**Observed count:** 8 PASS / 12 defined gates = **66.7% gate coverage**. This is an *equal-gate count created for tracking*, not a measured percentage of total work or a release readiness score. Do not report it as an actual work-completion percentage without founder acceptance of this register and its weighting.

## Next bounded engineering objective

Perform **PL09** with read-only public data: verify at least three different current listing types against public detail pages and ensure missing/retracted listings fail closed. Do not use confidential Core data. Then perform **PL10** in a browser-capable isolated environment. Neither test authorizes production deployment or publication.
