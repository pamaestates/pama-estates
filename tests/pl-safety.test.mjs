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
  const loadedModule = { exports: {} }
  runInNewContext(javascript, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (name) => {
      if (!(name in imports)) throw new Error(`Unexpected module import: ${name}`)
      return imports[name]
    },
    Intl,
    URL,
    URLSearchParams,
  })
  return loadedModule.exports
}

const { polishPages } = loadPureModule("src/lib/pl-content.ts")
const { polishEditorialDepth } = loadPureModule("src/lib/pl-editorial-depth.ts")
const { alternateLanguagePath, alternateLanguageUrl, isActiveNavigationPath } = loadPureModule("src/lib/pl-routing.ts", { "@/lib/pl-content": { polishPages } })
const { publicationSafePolishCopy, polishMoney } = loadPureModule("src/lib/pl-property.ts")
const { validatePublicPropertyFeed } = loadPureModule("src/lib/public-properties.ts", { "@/lib/public-blob-url": { publicBlobUrl: () => "" } })

test("public feed rejects missing, malformed and unsafe floor plans", () => {
  const property = {
    schemaVersion: 1, listingReference: "TEST-001", slug: "test-001", listingType: "SALE",
    title: "Test", description: "Test", community: "Dubai", images: [], amenities: [], highlights: [],
    floorPlans: [], regulatoryVerification: { qrImageUrl: "https://example.com/qr.png" },
  }
  const accepted = (candidate) => validatePublicPropertyFeed({
    schemaVersion: 1, generatedAt: "2026-11-11T00:00:00Z", properties: [candidate],
  }) !== null
  assert.equal(accepted(property), true, "Valid feed must remain accepted")
  assert.equal(accepted({ ...property, floorPlans: [{ url: "https://example.com/plan.pdf", label: "Plan" }] }), true)
  assert.equal(accepted({ ...property, floorPlans: undefined }), false)
  assert.equal(accepted({ ...property, floorPlans: "bad" }), false)
  assert.equal(accepted({ ...property, floorPlans: [null] }), false)
  assert.equal(accepted({ ...property, floorPlans: [{ url: "javascript:alert(1)" }] }), false)
  assert.equal(accepted({ ...property, floorPlans: [{ url: "http://example.com/plan.pdf" }] }), false)
  assert.equal(accepted({ ...property, floorPlans: [{ url: "https://example.com/plan.pdf", label: 42 }] }), false)
})

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

test("Polish owner and buyer forms preserve key fields and never write operational leads in preview", () => {
  const form = read("src/components/PolishInquiryForm.tsx")
  for (const field of ["role", "intent", "propertyType", "community", "project", "unit", "bedrooms", "occupancy", "condition", "price", "rent", "timeline", "preferredContact", "marketing", "profile", "budget", "requirements"]) {
    assert.match(form, new RegExp(`id: "${field}"`), `Missing form field: ${field}`)
  }
  assert.doesNotMatch(form, /captureWebsiteLead\s*\(/)
  assert.match(form, /Źródło: https:\/\/www\.pamaestates\.com/)
  assert.match(form, /encodeURIComponent\(message\)/)
})

test("Polish area directory links to all six English-equivalent community pages", () => {
  const directory = read("src/components/PolishAreasDirectory.tsx")
  const editorial = read("src/app/pl/[...path]/page.tsx")
  for (const route of [
    "palm-jumeirah", "palm-jebel-ali", "emirates-living",
    "dubai-marina", "jumeirah-islands", "jumeirah-park",
  ]) {
    assert.ok(directory.includes(`/pl/areas/${route}`), `Missing area: ${route}`)
  }
  assert.match(editorial, /path === "areas" && <PolishAreasDirectory/)
})

test("Polish opportunities use approved public-only source and preserve empty-state route", () => {
  const editorial = read("src/app/pl/[...path]/page.tsx")
  const component = read("src/components/PolishOpportunities.tsx")
  const manifest = JSON.parse(read("docs/pl-source-parity.json"))
  assert.ok(polishPages.opportunities, "Missing Polish editorial route")
  assert.match(editorial, /path === "opportunities" && <PolishOpportunities/)
  assert.match(component, /getPublishedOpportunities\s*\(/)
  assert.match(component, /opportunities\.length > 0/)
  assert.doesNotMatch(component, /getPrivate|PAMA.Core|ownerAcquisitionPriceAed|estimatedAnnualRentAed/)
  assert.ok(manifest.entries.some(entry => entry.english === "src/app/opportunities/page.tsx"))
  assert.equal(alternateLanguagePath("/opportunities"), "/pl/opportunities")
  assert.equal(alternateLanguagePath("/pl/opportunities"), "/opportunities")
})

test("owners can submit an inquiry from both Polish owner pages", () => {
  const editorial = read("src/app/pl/[...path]/page.tsx")
  assert.match(editorial, /path === "property-review" \|\| path === "sell-with-us"/)
  assert.match(editorial, /<PolishInquiryForm kind="owner"\s*\/>/)
  assert.match(read("src/app/pl/page.tsx"), /<PolishInquiryForm kind="buyer"\s*\/>/)
})

test("navigation highlights only the active Polish route", () => {
  assert.equal(isActiveNavigationPath("/pl", "/pl"), true)
  assert.equal(isActiveNavigationPath("/pl/about", "/pl"), false)
  assert.equal(isActiveNavigationPath("/pl/properties", "/pl"), false)
  assert.equal(isActiveNavigationPath("/pl/about", "/pl/about"), true)
  assert.equal(isActiveNavigationPath("/pl/areas/palm-jumeirah", "/pl/areas"), true)
  assert.equal(isActiveNavigationPath("/about", "/"), false)
})

test("language switch retains catalogue filters and relevant form anchors", () => {
  assert.equal(alternateLanguageUrl("/properties", "?mode=SALE&bedrooms=2"), "/pl/properties?mode=SALE&bedrooms=2")
  assert.equal(alternateLanguageUrl("/pl/properties", "?mode=RENT&community=Dubai"), "/properties?mode=RENT&community=Dubai")
  assert.equal(alternateLanguageUrl("/properties/example", "", "#gallery"), "/pl/properties/example#gallery")
  assert.equal(alternateLanguageUrl("/pl/properties/example", "?source=card", "#floor-plan"), "/properties/example?source=card#floor-plan")
  assert.equal(alternateLanguageUrl("/", "", "#private-access"), "/pl#zapytanie")
  assert.equal(alternateLanguageUrl("/pl", "", "#zapytanie"), "/#private-access")
  assert.equal(alternateLanguageUrl("/unknown-route", "?mode=SALE", "#section"), "/pl")
  assert.equal(alternateLanguagePath("/pl/nonexistent-page"), "/")
  assert.equal(alternateLanguageUrl("/pl/nonexistent-page", "?mode=RENT", "#section"), "/")
})

test("Polish catalogue offers clear search recovery and owner contact", () => {
  const catalogue = read("src/app/pl/properties/page.tsx")
  assert.match(catalogue, /properties.length === 0/)
  assert.match(catalogue, /Wyczyść filtry/)
  assert.match(catalogue, /href="\/pl#zapytanie"/)
  assert.match(catalogue, /href="\/pl\/property-review"/)
})

test("language switch leads to supported destinations", () => {
  assert.equal(alternateLanguagePath("/"), "/pl")
  assert.equal(alternateLanguagePath("/pl"), "/")
  assert.equal(alternateLanguagePath("/pl/contact"), "/contact")
  assert.equal(alternateLanguagePath("/properties/sample"), "/pl/properties/sample")
  assert.equal(alternateLanguagePath("/pl/properties/sample"), "/properties/sample")
  assert.equal(alternateLanguagePath("/not-localized"), "/pl/language-unavailable")
  assert.equal(alternateLanguageUrl("/not-localized"), "/pl/language-unavailable?from=%2Fnot-localized")
  assert.equal(alternateLanguageUrl("/pl/language-unavailable", "?from=%2Fnot-localized"), "/not-localized")
  assert.equal(alternateLanguageUrl("/pl/language-unavailable", "?from=https%3A%2F%2Fevil.example"), "/")
  assert.equal(alternateLanguageUrl("/pl/language-unavailable", "?from=%2F%2Fevil.example"), "/")
  assert.equal(alternateLanguageUrl("/pl/language-unavailable", "?from=%2Fpl%2Fcontact"), "/")
  assert.equal(alternateLanguageUrl("/opportunities"), "/pl/opportunities")
  assert.equal(alternateLanguageUrl("/properties", "?mode=rent"), "/pl/properties?mode=rent")
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

test("Polish details reuse the bilingual English gallery without exposing unapproved price copy", () => {
  const details = read("src/app/pl/properties/[slug]/page.tsx")
  const gallery = read("src/components/PropertyGallery.tsx")
  assert.match(details, /<PropertyGallery\s+images=\{p.images\}/)
  assert.match(details, /locale="pl"/)
  assert.match(gallery, /locale = "en"/)
  assert.match(gallery, /Galeria zdjęć nieruchomości/)
  assert.doesNotMatch(details, /p.images.slice\(0,12\)/)
  assert.doesNotMatch(details, /pricePositionLabel=\{p.pricePositionLabel\}/)
})

test("Polish property details retain public plot, parking, furnishing, completion, amenities and floor plans", () => {
  const details = read("src/app/pl/properties/[slug]/page.tsx")
  for (const field of ["plotSqFt", "parkingSpaces", "furnishedStatus", "completion", "amenities", "floorPlans"]) {
    assert.ok(details.includes(`p.${field}`), `Missing public fact: ${field}`)
  }
  assert.match(details, /p\.plotSqFt != null/, "Zero and missing plot values must be distinguished")
  assert.match(details, /p\.floorPlans\.map/, "Floor plans must be reachable")
})

test("unmapped-language notice is explicit, noindex and cannot link to external redirects", () => {
  const notice = read("src/app/pl/language-unavailable/page.tsx")
  assert.match(notice, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/)
  assert.match(notice, /safeEnglishSourcePath/)
  assert.match(notice, /Ta podstrona nie jest jeszcze dostępna po polsku/)
  assert.match(notice, /href=\{source\}/)
})

// The editorial store starts empty; live descriptions require a separately authorized
// reviewed commit rather than automatic publication or private-CRM reads.
test("approved Polish property copy is approval-gated and read-only", () => {
  const storage = JSON.parse(read("src/content/pl-approved-properties.json"))
  assert.equal(storage.version, 1)
  assert.deepEqual(storage.records, [])
  const helper = read("src/lib/pl-approved-copy.ts")
  const catalogue = read("src/app/pl/properties/page.tsx")
  const details = read("src/app/pl/properties/[slug]/page.tsx")
  assert.match(helper, /record.status === "APPROVED"/)
  assert.match(helper, /matches.length === 1/)
  assert.match(catalogue, /approvedPolishCopyFor\(p\)/)
  assert.match(details, /approvedPolishCopyFor\(p\)/)
  assert.doesNotMatch(helper, /fetch\(|supabase|Blob|writeFile|insert\(/)
})

test("missing editorial approval timestamp never authorizes Polish publication", () => {
  const property = { listingReference: "PAMA-QA", title: "Original", description: "English text",
    propertyType: "APARTMENT", community: "Dubai", amenities: [], highlights: [] }
  const { sourceFingerprint } = loadPureModule("src/lib/pl-property.ts")
  const record = { reference: property.listingReference, englishFingerprint: sourceFingerprint(property),
    title: "Zatwierdzona treść", description: "Polski opis", status: "APPROVED" }
  assert.equal(publicationSafePolishCopy(property, record).reviewed, false)
  assert.equal(publicationSafePolishCopy(property, { ...record, approvedAt: "not-a-date" }).reviewed, false)
  assert.equal(publicationSafePolishCopy(property, { ...record, approvedAt: "2026-11-11T12:00:00Z" }).reviewed, true)
  assert.equal(publicationSafePolishCopy({ ...property, description: "Changed" }, { ...record, approvedAt: "2026-11-11T12:00:00Z" }).reviewed, false)
})
