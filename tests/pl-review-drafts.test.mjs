import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"

const require = createRequire(import.meta.url)
const ts = require("typescript")
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8")
function load(path, imports = {}) {
  const output = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  })
  assert.deepEqual(output.diagnostics ?? [], [])
  const m = { exports: {} }
  runInNewContext(output.outputText, {
    module: m, exports: m.exports,
    require: name => {
      if (!Object.hasOwn(imports, name)) throw Error("Unexpected import: " + name)
      return imports[name]
    },
    Map, Number, Date,
  })
  return m.exports
}
const fingerprint = p => JSON.stringify([p.title, p.description, p.amenities, p.highlights])
const compare = load("src/lib/pl-property-sync.ts")
const drafts = load("src/lib/pl-review-drafts.ts", {
  "@/lib/pl-property-sync": compare,
  "@/lib/pl-property": { sourceFingerprint: fingerprint },
})
const build = (properties, records) => drafts.buildPolishReviewDrafts(properties, records, fingerprint, compare.buildPolishPropertySyncReport)
const property = (reference = "TEST-1", changes = {}) => ({
  listingReference: reference, title: "EN listing", description: "EN details",
  amenities: [], highlights: [], community: "Dubai Marina",
  propertyType: "APARTMENT", bedrooms: 2, sizeSqFt: 1200, ...changes,
})
const approved = p => ({
  reference: p.listingReference, title: "Zatwierdzony tytuł",
  description: "Zatwierdzony opis", status: "APPROVED",
  englishFingerprint: fingerprint(p), approvedAt: "2026-11-18T00:00:00Z",
})

test("new public listing creates a draft, not an approval", () => {
  const p = property()
  const result = build([p], [])
  assert.equal(result.length, 1)
  assert.equal(result[0].status, "DRAFT")
  assert.equal(result[0].reason, "NO_RECORD")
  assert.equal(result[0].englishFingerprint, fingerprint(p))
  assert.match(result[0].description, /Powierzchnia: 1200 ft²/)
  assert.equal("approvedAt" in result[0], false)
})
test("matching approved listing produces no draft", () => {
  const p = property()
  assert.equal(build([p], [approved(p)]).length, 0)
})
test("changed EN description produces a review draft without automatic approval", () => {
  const p = property()
  const old = approved(p)
  const changed = { ...p, description: "Changed original description" }
  const result = build([changed], [old])
  assert.equal(result.length, 1)
  assert.equal(result[0].reason, "SOURCE_CHANGED")
  assert.equal(result[0].englishFingerprint, fingerprint(changed))
  assert.equal(result[0].status, "DRAFT")
})
test("ambiguous or duplicate records never create an actionable draft", () => {
  const p = property()
  assert.equal(build([p, p], []).length, 0)
  assert.equal(build([p], [approved(p), approved(p)]).length, 0)
  assert.equal(build([p], [null]).length, 0)
})
test("draft queue is stable, does not mutate inputs or invent property facts", () => {
  const a = Object.freeze(property("A", { bedrooms: undefined, sizeSqFt: undefined, propertyType: "UNKNOWN" }))
  const b = Object.freeze(property("B"))
  const properties = Object.freeze([b, a])
  const result = build(properties, Object.freeze([]))
  assert.deepEqual(Array.from(result, x => x.reference), ["A", "B"])
  assert.doesNotMatch(result[0].description, /Powierzchnia|sypialni/)
  assert.match(result[0].title, /^Nieruchomość/)
  assert.equal(properties[0], b)
})
test("missing public community fails closed instead of inventing location", () => {
  assert.throws(() => build([property("A", { community: " " })], []))
})
