import assert from "node:assert/strict"
import test from "node:test"
import { gitBlobSha, validateEnglishSourceManifest } from "../scripts/check-pl-source-drift.mjs"

const english = "original English content"
const hash = gitBlobSha(english)
const entry = { english: "src/app/about/page.tsx", polish: "src/lib/pl-content.ts", englishBlobSha: hash }
const manifest = { version: 1, entries: [entry] }
const readSource = (path) => path === entry.english ? Buffer.from(english) : Buffer.from("Polish content")

test("unchanged English source and existing Polish counterpart pass", () => {
  assert.deepEqual(validateEnglishSourceManifest(manifest, readSource), [])
})
test("English change fails closed until reviewed", () => {
  assert.match(validateEnglishSourceManifest(manifest, path => path === entry.english ? Buffer.from("changed") : Buffer.from("Polish"))[0], /EN changed/)
})
test("missing Polish counterpart fails closed", () => {
  assert.match(validateEnglishSourceManifest(manifest, path => {
    if (path === entry.polish) throw new Error("missing")
    return Buffer.from(english)
  })[0], /Missing Polish counterpart/)
})
test("empty, duplicate, or unsafe manifests do not silently pass", () => {
  assert.match(validateEnglishSourceManifest({ version: 1, entries: [] }, readSource)[0], /Empty/)
  assert.ok(validateEnglishSourceManifest({ version: 1, entries: [entry, entry] }, readSource).length)
  assert.match(validateEnglishSourceManifest({ version: 1, entries: [{ ...entry, english: "../outside.tsx" }] }, readSource)[0], /Unsafe/)
})
