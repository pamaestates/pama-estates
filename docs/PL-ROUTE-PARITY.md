# EN/PL route-parity guard

Purpose: detect public English page routes lacking a matching Polish route.

The test discovers actual page files in src/app and matches static pages against the PL catch-all plus src/lib/pl-content.ts keys. Dynamic English routes require a physical Polish page. The /api subtree is excluded. No external network access or dependencies are needed beyond Node.

Run: npm run test:pl-routes (fixture tests followed by full inventory). The test is also included in test:pl-parity and therefore in the branch build.

The former missing /opportunities counterpart is now implemented using the shared approved-public-opportunities feed; docs/pl-route-exemptions.json remains empty. Future uncovered English routes must fail the route check. Unmapped language-switch requests use a noindex explanatory page rather than silently redirecting to the PL homepage.

Exceptions need route, rationale, approvedBy and approvalReference and must be independently reviewed; the mechanical test does not authenticate approvals.

A passing route test does not prove translated content, SEO correctness, form parity, gallery behavior or browser acceptance. No production release is authorized by this change.
