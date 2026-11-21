# PAMA Estates — Polish SEO release plan (DRAFT / NO-GO)

Status: preparation only, 16 Nov 2026. This file changes **no runtime SEO behavior**.

## Verified baseline
- Production HTML checked from user's Windows machine: /privacy, /pl/privacy, /about, /pl/about HTTP 200; self-canonical; PL noindex; about EN/PL appear in page markup (the earlier regex did **not** isolate rel=alternate tags).
- Eight approved PL listing records are unique and have nonempty descriptions, with source-fingerprint matching in `publicationSafePolishCopy`.
- Eight PL property pages returned HTTP 200 with Polish titles and no approval-warning banner; no independent full feed/description diff was performed.
- The current `src/app/sitemap.ts` publishes EN static and public feed listing URLs, excludes all PL. `robots.ts` does not blanket-disallow PL.
- PL homepage, editorial pages, catalog, detail pages use `robots: { index: false, follow: true }`.
- The public feed is dynamic and may contain additional or changed properties without approved Polish copy.

## Proposed release scope (future separate approval)
1. Explicit, OFF-by-default **production-only** release gate. Never enable on Vercel Preview, localhost, or flag failures. Keep current production `noindex` until gate and editorial sign-off.
2. On explicit release, permit PL indexing for reviewed static/editorial pages and public catalog. Keep PL privacy page `noindex` until distinct legal sign-off. Keep unknown /pl routes, unpublished properties and Polish language-unavailable pages blocked.
3. For each published listing, enable PL detail indexing only when `publicationSafePolishCopy(property, approvedPolishCopyFor(property)).reviewed === true`; otherwise emit `noindex,follow` even if the general release gate is enabled. When the English feed changes, the existing fingerprint fallback must revoke eligibility immediately, subject to site cache freshness.
4. Include in the XML sitemap **only** index-eligible PL URLs. Add EN/PL language alternates on actual paired, index-eligible entries. English-only property URLs must remain discoverable as EN entries if PL copy is unapproved.
5. Do not publish /pl/privacy to the sitemap or as a legal hreflang pair until legal review. Fix the out-of-date comment in `src/app/pl/[...path]/page.tsx` before production release.
6. Do not alter CRM, Blob storage, property feeds, lead capture, social accounts, DNS, protected worktrees or data.

## Required proof and stop conditions
- Unit/integration tests: flag absent/false; preview and local always noindex; indexable approved detail; unapproved/stale/ambiguous detail noindex; no PL privacy, error or unavailable pages in XML; EN-only fallback; complete reciprocal alternate tag test; sitemap behavior on empty/invalid feed; PL flag fail closed.
- Pass CI, Next production build and relevant browser QA with **PL enabled**, not merely the existing `PAMA_QA_EXPECT_PL_CLOSED=1` mode.
- Read-only public verification after a separately approved release: current `robots`, correct self-canonicals, `rel=alternate hreflang`, sitemap entries, 200 responses and live feed approval matching. Spot-check desktop/mobile and real WhatsApp handoff.
- Confirm full Polish editorial acceptance, privacy/legal position and any unresolved regulatory risks; verify current live feed inventory, not only eight historical approvals.
- A successful PR is not business launch. Search-engine discovery/indexing remains independently NOT VERIFIED until Google results/Search Console demonstrate it.

## Authorization
**No approval** to remove PL noindex, update sitemap in production, change environment flags, merge launch code, deploy, or alter feeds. This Draft PR is an implementation specification and release checklist only. Founder approval is required before making such changes, with exact target, rollback to the previous READY deployment, validation and explicit GO/NO-GO.
