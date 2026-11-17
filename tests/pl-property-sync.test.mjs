import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { createRequire } from "node:module"

// Use the project's existing TypeScript compiler to test its .ts source with
// Node's built-in test runner. This test neither writes compiled files nor
// requires a new test framework.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const requireFromRoot = createRequire(pathToFileURL(resolve(root, "package.json")))
const ts = requireFromRoot("typescript")
const source = readFileSync(resolve(root, "src/lib/pl-property-sync.ts"), "utf8")
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
})
assert.deepEqual(compiled.diagnostics ?? [], [])
const { buildPolishPropertySyncReport: report } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`
)

const property = (ref = "PAMA-S-001", title = "English title") => ({
  listingReference: ref, title, description: "English description", amenities: [], highlights: [],
})
const fingerprint = p => JSON.stringify([p.title, p.description, p.amenities, p.highlights])
const approved = (p, changes = {}) => ({
  reference: p.listingReference,
  englishFingerprint: fingerprint(p),
  title: "Polski tytuł", description: "Polski opis",
  status: "APPROVED", approvedAt: "2026-11-16T10:00:00Z", ...changes,
})
const result = (properties, records, fp = fingerprint) => report(properties, records, fp)

test("CURRENT: exactly one approved matching translation", () => {
  const p = property()
  assert.deepEqual(result([p], [approved(p)]), [
    { reference: p.listingReference, status: "CURRENT", reason: "APPROVED_AND_CURRENT" },
  ])
})
test("MISSING: no translation or only a draft", () => {
  const p = property()
  assert.equal(result([p], [])[0].reason, "NO_RECORD")
  assert.deepEqual(result([p], [approved(p, { status: "DRAFT" })])[0], {
    reference: p.listingReference, status: "MISSING", reason: "PENDING_APPROVAL",
  })
})
test("STALE: English marketing content changed", () => {
  const p = property()
  const old = approved(p)
  assert.deepEqual(result([{ ...p, title: "Changed title" }], [old])[0], {
    reference: p.listingReference, status: "STALE", reason: "SOURCE_CHANGED",
  })
})
test("STALE: explicitly marked stale record", () => {
  const p = property()
  assert.equal(result([p], [approved(p, { status: "STALE" })])[0].reason, "MARKED_STALE")
})
test("CONFLICT: duplicate editorial records fail closed", () => {
  const p = property()
  assert.equal(result([p], [approved(p), approved(p)])[0].reason, "DUPLICATE_EDITORIAL_RECORD")
})
test("CONFLICT: duplicate public listing references fail closed", () => {
  const p = property()
  assert.ok(result([p, p], [approved(p)]).every(x => x.reason === "DUPLICATE_PROPERTY"))
})
test("CONFLICT: empty reference and invalid approved record fail closed", () => {
  const p = property()
  assert.equal(result([property("")], [])[0].reason, "INVALID_REFERENCE")
  assert.equal(result([p], [approved(p, { title: " " })])[0].reason, "INVALID_EDITORIAL_RECORD")
  assert.equal(result([p], [null])[0].reason, "INVALID_EDITORIAL_RECORD")
  assert.equal(result([p], [approved(p, { approvedAt: "invalid" })])[0].reason, "INVALID_EDITORIAL_RECORD")
})
test("CONFLICT: source fingerprint failure does not publish as current", () => {
  const p = property()
  assert.equal(result([p], [approved(p)], () => { throw Error("blocked") })[0].reason, "SOURCE_FINGERPRINT_FAILED")
})
test("deterministic ordering and no mutation of inputs", () => {
  const a = property("A"), b = property("B")
  const properties = Object.freeze([Object.freeze(b), Object.freeze(a)])
  const records = Object.freeze([Object.freeze(approved(a)), Object.freeze(approved(b))])
  assert.deepEqual(result(properties, records).map(x => x.reference), ["A", "B"])
})
