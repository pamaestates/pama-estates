import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"
import test from "node:test"
import { reportPolishEditorialQueue } from "../scripts/report-pl-editorial-queue.mjs"

const require = createRequire(import.meta.url)
const ts = require("typescript")
const text = readFileSync(new URL("../src/lib/pl-property.ts", import.meta.url), "utf8")
const javascript = ts.transpileModule(text, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText
const loadedModule = { exports: {} }
runInNewContext(javascript, {
  module: loadedModule, exports: loadedModule.exports, require: () => { throw Error("No runtime imports allowed") },
  Intl, Date, JSON,
})
const { sourceFingerprint } = loadedModule.exports

const property = (reference, overrides = {}) => ({
  listingReference: reference, title: "English title", description: "English description",
  amenities: ["pool"], highlights: ["view"], ...overrides,
})
const approval = (p, overrides = {}) => ({
  reference: p.listingReference, englishFingerprint: sourceFingerprint(p),
  title: "Polski tytuł", description: "Polski opis", status: "APPROVED",
  approvedAt: "2026-11-16T00:00:00Z", ...overrides,
})
const feed = (properties) => ({
  schemaVersion: 1, generatedAt: "2026-11-16T00:00:00Z", properties,
})
const registry = (records) => ({ version: 1, records })

test("queue reports current, new, changed and draft listings without leaking descriptions", () => {
  const current = property("PAMA-APPROVED")
  const changed = property("PAMA-CHANGED", { description: "New EN description" })
  const newListing = property("PAMA-NEW")
  const draft = property("PAMA-DRAFT")
  const result = reportPolishEditorialQueue(feed([current, changed, newListing, draft]), registry([
    approval(current),
    approval(changed, { englishFingerprint: "previous EN" }),
    approval(draft, { status: "DRAFT" }),
  ]))
  assert.equal(result.totalPublished, 4)
  assert.equal(result.needsAttention, 3)
  assert.deepEqual(result.entries, [
    { reference: "PAMA-APPROVED", status: "APPROVED_CURRENT" },
    { reference: "PAMA-CHANGED", status: "SOURCE_CHANGED" },
    { reference: "PAMA-DRAFT", status: "NEEDS_APPROVAL" },
    { reference: "PAMA-NEW", status: "NEEDS_TRANSLATION" },
  ])
  const output = JSON.stringify(result)
  assert.ok(!output.includes("New EN description"))
  assert.ok(!output.includes("Polski opis"))
  assert.ok(!output.includes("previous EN"))
})

test("any marketing source edit invalidates the exact approved fingerprint", () => {
  const original = property("PAMA-ORIGINAL")
  const record = approval(original)
  for (const variant of [
    { title: "Changed EN title" },
    { description: "Changed EN description" },
    { amenities: ["pool", "gym"] },
    { highlights: ["different view"] },
  ]) {
    const result = reportPolishEditorialQueue(feed([{ ...original, ...variant }]), registry([record]))
    assert.equal(result.entries[0].status, "SOURCE_CHANGED")
  }
})

test("structured price edits do not invalidate the separately approved marketing copy", () => {
  const original = property("PAMA-PRICE")
  const result = reportPolishEditorialQueue(feed([{ ...original, askingPriceAed: 1234567 }]), registry([approval(original)]))
  assert.equal(result.entries[0].status, "APPROVED_CURRENT")
})

test("invalid approvals fail closed and absent references trigger review, not deletion", () => {
  const p = property("PAMA-CURRENT")
  for (const record of [
    approval(p, { title: "" }),
    approval(p, { approvedAt: "invalid" }),
    approval(p, { status: "STALE" }),
  ]) {
    const report = reportPolishEditorialQueue(feed([p]), registry([record]))
    assert.equal(report.entries[0].status, "NEEDS_APPROVAL")
  }
  const report = reportPolishEditorialQueue(feed([p]), registry([approval(p), approval(property("PAMA-ABSENT"))]))
  assert.deepEqual(report.approvedReferencesAbsentFromSnapshot, ["PAMA-ABSENT"])
  assert.equal(report.totalPublished, 1)
})

test("bad schema and duplicate feed or approvals abort rather than imply publication or withdrawal", () => {
  const p = property("PAMA-X")
  assert.throws(() => reportPolishEditorialQueue({}, registry([])), /Invalid public property feed/)
  assert.throws(() => reportPolishEditorialQueue(feed([p,p]), registry([])), /duplicate public listing/)
  assert.throws(() => reportPolishEditorialQueue(feed([p]), registry([approval(p), approval(p)])), /duplicate PL approval/)
  assert.throws(() => reportPolishEditorialQueue(feed([p]), {}), /Invalid PL approval registry/)
})
