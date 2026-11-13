import assert from "node:assert/strict"
import test from "node:test"
import { readFileSync } from "node:fs"
import { checkRepository } from "../scripts/check-pl-route-parity.mjs"

const source = readFileSync(
  new URL("../src/app/pl/opportunities/[slug]/page.tsx", import.meta.url),
  "utf8"
)

test("Polish opportunity detail closes EN/PL route gap", () => {
  assert.deepEqual(checkRepository().errors, [])
})

test("Only explicitly published opportunities are used", () => {
  assert.match(source, /getPublishedOpportunityBySlug/)
  assert.match(source, /getPublishedOpportunities/)
  assert.match(source, /dynamicParams = false/)
})

test("Polish opportunity remains noindex", () => {
  assert.match(source, /robots:\s*\{\s*index:\s*false/)
  assert.match(source, /\/pl\/opportunities\/\$\{slug\}/)
})

test("Unapproved English marketing text is not rendered", () => {
  assert.doesNotMatch(source, /opportunity\.(title|thesis|highlights|verificationNote)/)
})

test("Missing financial inputs do not create estimated values", () => {
  assert.match(source, /asking == null/)
  assert.match(source, /Brak danych/)
})