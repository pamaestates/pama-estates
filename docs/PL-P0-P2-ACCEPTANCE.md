# PAMA Estates EN/PL — P0–P2 controlled acceptance matrix

**Scope:** isolated branch `feature/pl-build-01-localization` only. Existing N410 worktrees, PAMA Core, operational databases, storage, feed publication, production domains, and DNS are protected. No deployment or operational lead write is authorized by this document.

## P0 — engineering acceptance
- `npm run verify:pl-release` must pass in a **separate isolated checkout with installed dependencies** (lint, TypeScript, PL source/route parity, PL safety tests, Next.js production build).
- Inspect actual GitHub workflow job conclusion, rather than assuming no recorded check means success.
- Review failures and resolve them before attempting a preview deployment.

## P1 — functionality and content
- The browser QA suite tests EN and PL desktop/mobile routes, axe accessibility, console errors, layout overflow, proper locale and PL noindex.
- Test actual EN/PL property details and gallery with one safely published fixture, including keyboard, touch, fullscreen, QR and floor plans. A static code diff does NOT establish interactive behavior.
- Polish owner/buyer forms remain **WhatsApp-only** with no operational CRM write. Connecting the lead API requires separate founder authorization, secure implementation, origin/privacy validation, and verified attribution.
- Versioned Polish property editorial store begins **empty** and blocks any unapproved, outdated, or ambiguous marketing description. Populate only after real human review and explicit approval; no automatic AI translation publication.
- Verify what the visitor sends in WhatsApp and that there is no implied delivery before the user sends it.

## P2 — SEO and publication
- PL remains `noindex,follow` and excluded from the sitemap. Do not turn indexing on solely because code compiled.
- Reciprocal hreflang from EN is not yet fully implemented; finish it **before** separately approved PL indexing, and verify rendered alternate tags, canonical URLs and sitemap pairing.
- Validate Polish legal/privacy language and the actual property descriptions with the founder/editor. Zero automatically approved inventory is not sufficient for broad indexing.
- Validate production/preview navigation, accessible form labels, gallery media, and page performance with measured evidence.

## Current release status
CODE IMPLEMENTED: P0 guardrails, P1 preview-safe editorial gate, P2 browser QA coverage and SEO indexing hold.
TESTS PASSED: **NOT VERIFIED** on the current branch; no complete runner results.
LOCAL BEHAVIOUR VERIFIED: **NOT VERIFIED**.
EXTERNAL BEHAVIOUR VERIFIED: **NOT VERIFIED** for latest commit.
BUSINESS OBJECTIVE ACHIEVED: **NOT VERIFIED**.

## STOP conditions
Do not merge, deploy, switch on PL indexing, connect operational lead writes, or declare full EN/PL parity until each relevant acceptance criterion passes and the founder separately approves consequential operations.
