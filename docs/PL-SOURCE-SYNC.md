# Polish / English source synchronization guard

The Polish website must have **the same subject matter, navigation targets, lead routes, and public property facts** as English, using natural Polish writing.

## Implemented protection
- `npm run test:pl-parity` compares Git-blob fingerprints of nine high-impact English page/component files to an explicit baseline.
- `npm run build` runs that check first, so an unnoticed edit to those English files blocks new builds of this feature branch.
- No external service, paid translation, database, blob, publication, or production change is performed.
- The public property feed is already shared between EN and PL for structured facts, but a Polish marketing description is NOT automatically translated or approved.

## Mandatory update procedure when English changes
1. Identify changed English routes and affected elements (sections, forms, galleries, SEO, CTA, tracking, legal content).
2. Update and review the corresponding Polish experience, preserving the same functionality without inventing property details.
3. Extend deterministic tests for new behavior and complete browser QA on both languages.
4. Only **after** review, update the corresponding `englishBlobSha` in `docs/pl-source-parity.json` from the Git blob of the new English file.
5. Confirm `npm run test:pl-parity`, `npm run test:pl-safety`, typecheck and build; obtain approval before production release.

## Explicit limitations
A baseline means **no source drift relative to the snapshot**. It does not mean the two experiences were equivalent when the baseline was created. English modifications in untracked files, remote CMS content, changes in public listings' marketing prose, and changes outside these nine files are not yet covered. Automatic Polish draft generation and editorial approval are not implemented. Do not interpret a passing test as permission to publish.

Future architecture should make critical forms and page structure shared, with localized strings, and use source-change events to create Polish review drafts. Changes to production automation, notifications or AI services require separate assessment.
