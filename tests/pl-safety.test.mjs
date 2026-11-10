import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"
import test from "node:test"

const require = createRequire(import.meta.url)
const ts = require("typescript")
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8")

// Execute pure TypeScript helpers without a server, network access or external services.
function loadPureModule(path, imports = {}) {
  const javascript = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const module = { exports: {} }
  runInNewContext(javascript, {
    module,
    exports: module.exports,
    require: (name) => {
      if (!(name in imports)) throw new Error(`Unexpected module import: ${name}`)
      return imports[name]
    },
    Intl,
  })
  return module.exports
}

const { polishPages } = loadPureModule("src/lib/pl-content.ts")
const { polishEditorialDepth } = loadPureModule("src/lib/pl-editorial-depth.ts")
const { alternateLanguagePath } = loadPureModule("src/lib/pl-routing.ts", { "@/lib/pl-content": { polishPages } })
const { publicationSafePolishCopy, polishMoney } = loadPureModule("src/lib/pl-property.ts")

test("all Polish editorial routes have substantive, unique sections", () => {
  const seen = new Set()
  for (const [path, page] of Object.entries(polishPages)) {
    const sections = [...page.sections, ...(polishEditorialDepth[path] ?? [])]
    assert.ok(page.title && page.lead, `Empty Polish metadata: ${path}`)
    assert.ok(sections.length >= 1, `No content sections: ${path}`)
    for (const section of sections) {
      assert.ok(section.heading && section.body.length >= 35, `Thin section: ${path}`)
      assert.ok(!seen.has(`${path}:${section.heading}`), `Duplicate heading: ${path}`)
      seen.add(`${path}:${section.heading}`)
    }
  }
  for (const path of Object.keys(polishEditorialDepth)) assert.ok(path in polishPages, `Orphan Polish content: ${path}`)
})

test("language switch leads to supported destinations", () => {
  assert.equal(alternateLanguagePath("/"), "/pl")
  assert.equal(alternateLanguagePath("/pl"), "/")
  assert.equal(alternateLanguagePath("/pl/contact"), "/contact")
  assert.equal(alternateLanguagePath("/properties/sample"), "/pl/properties/sample")
  assert.equal(alternateLanguagePath("/pl/properties/sample"), "/properties/sample")
  assert.equal(alternateLanguagePath("/not-localized"), "/pl")
  for (const path of Object.keys(polishPages)) {
    assert.equal(alternateLanguagePath(`/${path}`), `/pl/${path}`)
    assert.equal(alternateLanguagePath(`/pl/${path}`), `/${path}`)
  }
})

test("unapproved and stale listing descriptions never enter Polish output", () => {
  const property = {
    listingReference: "TEST-SAFE", title: "Unreviewed English copy", description: "Private sales notes",
    propertyType: "VILLA", community: "Dubai", amenities: [], highlights: [],
  }
  const draft = { reference: "TEST-SAFE", englishFingerprint: "ignored", status: "DRAFT", title: "DRAFT TITLE", description: "DRAFT DESCRIPTION" }
  const safe = publicationSafePolishCopy(property, draft)
  assert.equal(safe.reviewed, false)
  assert.ok(!safe.description.includes("Private sales notes"))
  assert.ok(!safe.description.includes("DRAFT DESCRIPTION"))
  assert.equal(publicationSafePolishCopy(property, { ...draft, status: "APPROVED" }).reviewed, false)
  assert.equal(polishMoney(), "Cena na zapytanie")
})

test("search indexing remains held independently of translation approval", () => {
  const landing = read("src/app/pl/page.tsx")
  const catalogue = read("src/app/pl/properties/page.tsx")
  const editorial = read("src/app/pl/[...path]/page.tsx")
  const details = read("src/app/pl/properties/[slug]/page.tsx")
  const sitemap = read("src/app/sitemap.ts")
  for (const [path, source] of Object.entries({ landing, catalogue, editorial, details })) {
    assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/, `Indexing hold absent: ${path}`)
  }
  assert.doesNotMatch(details, /robots:\s*copy\.reviewed\s*\?/, "Editorial approval must not enable indexing")
  assert.match(sitemap, /return \[\.\.\.staticEntries, \.\.\.propertyEntries\]/)
  assert.match(read("vercel.json"), /"\*\*":\s*false/)
})
