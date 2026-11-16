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
    Date,
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

test("EN and PL owner WhatsApp amounts use exact AED grouping without rounding", () => {
  const { formatAedAmount, formatAedInput } = loadPureModule("src/lib/format-aed-amount.ts")
  assert.equal(formatAedInput("100000000"), "100,000,000")
  assert.equal(formatAedInput("2000000"), "2,000,000")
  assert.equal(formatAedInput("100000000.50"), "100,000,000.50")
  assert.equal(formatAedInput("1234."), "1,234.")
  assert.equal(formatAedInput("AED 1,234,567"), "1,234,567")
  assert.equal(formatAedInput("N/A"), "N/A")
  assert.equal(formatAedInput(""), "")
  assert.equal(formatAedAmount("100000000"), "AED 100,000,000")
  assert.equal(formatAedAmount("5000000"), "AED 5,000,000")
  assert.equal(formatAedAmount("1234567.89"), "AED 1,234,567.89")
  assert.equal(formatAedAmount("AED 1,234,567"), "AED 1,234,567")
  assert.equal(formatAedAmount("N/A"), "N/A")
  assert.equal(formatAedAmount(""), "-")
  assert.equal(formatAedAmount("3–5 mln AED"), "3–5 mln AED")
  const english = read("src/app/property-review/page.tsx")
  const polish = read("src/components/PolishInquiryForm.tsx")
  assert.match(english, /Expected Price: \$\{formatAedAmount\(form\.expectedPrice\)\}/)
  assert.match(english, /Current Annual Rent: \$\{formatAedAmount\(form\.currentRent\)\}/)
  assert.match(polish, /field\.id === "price" \|\| field\.id === "rent"/)
  assert.match(polish, /formatAedAmount\(values\[field\.id\] \|\| ""\)/)
  assert.ok(english.includes('update("expectedPrice", formatAedInput(e.target.value))'))
  assert.ok(english.includes('update("currentRent", formatAedInput(e.target.value))'))
  assert.ok(polish.includes('formatAedInput(e.target.value) : e.target.value'))
})

test("property review preview handoff is explicit and production CRM capture stays mandatory", () => {
  const page = read("src/app/property-review/page.tsx")
  const route = read("src/app/api/lead/route.ts")
  const styles = read("src/app/globals.css")
  assert.match(page, /process\.env\.NEXT_PUBLIC_VERCEL_ENV === "preview"/)
  assert.match(page, /PREVIEW TEST — NOT RECORDED IN PAMA CORE/)
  assert.match(page, /No lead is recorded in PAMA Core/)
  assert.match(page, /Preview WhatsApp Message \(No CRM Save\)/)
  const previewGuard = page.indexOf("if (isPreview) {")
  const capture = page.indexOf("await captureWebsiteLead(")
  assert.ok(previewGuard > 0 && capture > previewGuard)
  assert.match(route, /process\.env\.VERCEL_ENV !== "production"\) return error\("CRM_CAPTURE_UNAVAILABLE", 503\)/)
  assert.match(page, /className="pama-review-form /)
  assert.match(styles, /\.pama-review-form input:-webkit-autofill/)
  assert.match(styles, /-webkit-text-fill-color: #ffffff/)
})

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
  assert.equal(alternateLanguageUrl("/unknown-route", "?mode=SALE", "#section"), "/pl/language-unavailable?from=%2Funknown-route")
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
    assert.match(source, /robots:\s*polishSeoRobots\(/, `Indexing guard absent: ${path}`)
  }
  assert.match(details, /robots:\s*polishSeoRobots\(\{ reviewed: copy\.reviewed \}\)/)
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
  assert.ok(Array.isArray(storage.records))
  const seen = new Set()
  for (const record of storage.records) {
    assert.equal(typeof record.reference, "string")
    assert.ok(record.reference.trim())
    assert.ok(!seen.has(record.reference))
    seen.add(record.reference)
    assert.ok(["DRAFT", "APPROVED", "STALE"].includes(record.status))
    if (record.status === "APPROVED") {
      assert.ok(record.title?.trim())
      assert.ok(record.description?.trim())
      assert.ok(record.englishFingerprint?.length > 10)
      assert.ok(typeof record.approvedAt === "string")
      assert.ok(!Number.isNaN(Date.parse(record.approvedAt)))
    }
  }
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

test("PL routes are included in browser QA with explicit noindex and no unsafe lead write", () => {
  const qa = read(".github/workflows/deep-browser-qa.yml")
  for (const route of ["/pl", "/pl/properties", "/pl/opportunities", "/pl/property-review", "/pl/language-unavailable"]) {
    assert.ok(qa.includes(route), `Browser QA missing ${route}`)
  }
  assert.match(qa, /el\.closest\('label'\)/)
  assert.match(qa, /locale\.lang !== 'pl'/)
  assert.match(qa, /includes\('noindex'\)/)
  assert.match(qa, /a\[href="\/no-translation"\]/)
  const forms = read("src/components/PolishInquiryForm.tsx")
  assert.doesNotMatch(forms, /fetch\(|captureWebsiteLead\s*\(/)
})

test("Polish SEO remains blocked until explicit launch approval", () => {
  const root = read("src/app/pl/page.tsx")
  const listing = read("src/app/pl/properties/page.tsx")
  const details = read("src/app/pl/properties/[slug]/page.tsx")
  const editorial = read("src/app/pl/[...path]/page.tsx")
  const notice = read("src/app/pl/language-unavailable/page.tsx")
  const sitemap = read("src/app/sitemap.ts")
  const robots = read("src/app/robots.ts")
  for (const [name, content] of Object.entries({ root, listing, details, editorial, notice })) {
    if (name === "notice") assert.match(content, /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/)
    else assert.match(content, /robots:\s*polishSeoRobots\(/, "Missing guard on " + name)
  }
  assert.match(sitemap, /if \(!polishSeoReleaseEnabled\(\)\) return \[\.\.\.staticEntries, \.\.\.propertyEntries\]/)
  assert.doesNotMatch(robots, /disallow:\s*\[.*\/pl/, "Do not prevent search engines from reading noindex")
  // PL indexing remains blocked independently of editorial records.
})

test("local release verification checks lint, types, full safety tests and build", () => {
  const scripts = JSON.parse(read("package.json")).scripts
  assert.match(scripts["verify:pl-release"], /npm run lint/)
  assert.match(scripts["verify:pl-release"], /npm run typecheck/)
  assert.match(scripts["verify:pl-release"], /npm run build/)
  assert.match(scripts.build, /npm run test:pl-safety/)
  assert.match(scripts.build, /npm run test:pl-parity/)
})

test("public structured property values use Polish labels without inventing unknown translations", () => {
  const { polishFurnishing, polishView, polishCompletion, polishAmenity, polishCompletionStatus } = loadPureModule("src/lib/pl-property.ts")
  assert.equal(polishFurnishing("Unfurnished"), "Nieumeblowany")
  assert.equal(polishView("Sea and Swimming pool view"), "Widok na morze i basen")
  assert.equal(polishCompletion("2029-12-31"), "31 grudnia 2029")
  assert.equal(polishCompletion("2029-02-30"), "2029-02-30")
  assert.equal(polishCompletion("Q4 2029"), "Q4 2029")
  assert.equal(polishAmenity("Private Pool"), "Prywatny basen")
  assert.equal(polishCompletionStatus("UNDER_CONSTRUCTION"), "W budowie")
  assert.equal(polishView("Unreviewed marketing phrase"), "Unreviewed marketing phrase")
  const detail = read("src/app/pl/properties/[slug]/page.tsx")
  for (const helper of ["polishFurnishing(p.furnishedStatus)", "polishView(p.view)", "polishCompletion(p.completion)", "polishAmenity(amenity)", "polishCompletionStatus(p.completionStatus)"]) assert.ok(detail.includes(helper), "Missing localized fact: " + helper)
})

test("Polish 404 does not fall back to an English error page", () => {
  const source = read("src/app/pl/not-found.tsx")
  assert.match(source, /Nie znaleziono strony/)
  assert.match(source, /href="\/pl"/)
  assert.match(source, /href="\/pl\/properties"/)
})

test("Polish homepage uses public-only featured properties with safe empty state", () => {
  const homepage = read("src/app/pl/page.tsx")
  const component = read("src/components/PolishFeaturedProperties.tsx")
  assert.match(homepage, /<PolishFeaturedProperties\s*\/>/)
  assert.match(component, /getPublishedProperties\(\)/)
  assert.match(component, /\.slice\(0, 3\)/)
  assert.match(component, /selected.length > 0/)
  assert.match(component, /publicationSafePolishCopy\(property, approvedPolishCopyFor\(property\)\)/)
  assert.doesNotMatch(component, /getPrivate|PAMA.Core|ownerAcquisitionPriceAed|supabase|fetch\(/)
  assert.match(homepage, /locale: "pl_PL"/)
  assert.match(homepage, /robots:\s*polishSeoRobots\(/)
})


test("canonical SEO uses one www .com host without changing mirrored .ae routing or PL indexing hold", () => {
  const primary = "https://www.pamaestates.com"
  const files = [
    "src/app/layout.tsx",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/app/properties/page.tsx",
    "src/app/properties/[slug]/page.tsx",
    "src/app/pl/page.tsx",
    "src/app/pl/[...path]/page.tsx",
    "src/app/pl/properties/page.tsx",
    "src/app/pl/properties/[slug]/page.tsx",
    "src/app/pl/opportunities/[slug]/page.tsx",
  ]
  for (const path of files) {
    const source = read(path)
    assert.ok(source.includes(primary), path + " must link to primary www host")
    assert.doesNotMatch(source, /https:\/\/pamaestates\.com\b/, path + " still references apex canonical")
  }

  const layout = read("src/app/layout.tsx")
  assert.ok(layout.includes('metadataBase: new URL("https://www.pamaestates.com")'))
  assert.ok(layout.includes('url: "https://www.pamaestates.com"'))
  const robots = read("src/app/robots.ts")
  assert.ok(robots.includes('sitemap: "https://www.pamaestates.com/sitemap.xml"'))
  const sitemap = read("src/app/sitemap.ts")
  assert.ok(sitemap.includes('const baseUrl = "https://www.pamaestates.com"'))
  assert.match(sitemap, /if \(!polishSeoReleaseEnabled\(\)\) return \[\.\.\.staticEntries, \.\.\.propertyEntries\]/)
  for (const path of files.filter((value) => value.startsWith("src/app/pl/"))) {
    if (path === "src/app/pl/opportunities/[slug]/page.tsx") assert.match(read(path), /robots:\s*\{\s*index:\s*false,\s*follow:\s*true\s*\}/)
    else assert.match(read(path), /robots:\s*polishSeoRobots\(/, path + " must have a release guard")
  }
  const config = JSON.parse(read("vercel.json"))
  assert.equal(config.redirects, undefined, "Do not change .ae mirror or domain redirects in this scope")
})


test("homepage metadata is page-scoped, reciprocal, and preserves the existing interactive client", () => {
  const homepage = read("src/app/page.tsx")
  const client = read("src/components/HomePageClient.tsx")
  const pl = read("src/app/pl/page.tsx")
  assert.match(homepage, /export const metadata: Metadata/)
  assert.match(homepage, /canonical: "https:\/\/www\.pamaestates\.com\/"/)
  assert.match(homepage, /en: "https:\/\/www\.pamaestates\.com\/"/)
  assert.match(homepage, /pl: "https:\/\/www\.pamaestates\.com\/pl"/)
  assert.match(homepage, /"x-default": "https:\/\/www\.pamaestates\.com\/"/)
  assert.match(homepage, /<HomePageClient\s*\/>/)
  assert.match(client, /^"use client"/)
  assert.match(client, /captureWebsiteLead/)
  assert.match(pl, /canonical: "https:\/\/www\.pamaestates\.com\/pl"/)
  assert.match(pl, /"x-default": "https:\/\/www\.pamaestates\.com\/"/)
  assert.match(pl, /robots:\s*polishSeoRobots\(/)
  const root = read("src/app/layout.tsx")
  assert.doesNotMatch(root, /alternates:\s*\{\s*canonical:/, "Root layout must not force homepage canonical onto other routes")
})

test("EN property pages emit reciprocal hreflang only for their actual PL route counterparts", () => {
  const enCollection = read("src/app/properties/page.tsx")
  const plCollection = read("src/app/pl/properties/page.tsx")
  assert.match(enCollection, /canonical: "https:\/\/www\.pamaestates\.com\/properties"/)
  assert.match(enCollection, /pl: "https:\/\/www\.pamaestates\.com\/pl\/properties"/)
  assert.match(plCollection, /en: "https:\/\/www\.pamaestates\.com\/properties"/)
  assert.match(plCollection, /robots:\s*polishSeoRobots\(/)
  const enDetail = read("src/app/properties/[slug]/page.tsx")
  const plDetail = read("src/app/pl/properties/[slug]/page.tsx")
  assert.match(enDetail, /pl: \x60https:\/\/www\.pamaestates\.com\/pl\/properties\/\$\{property\.slug\}\x60/)
  assert.match(plDetail, /en,\s*pl/)
  assert.match(plDetail, /robots:\s*polishSeoRobots\(\{ reviewed: copy\.reviewed \}\)/)
  const sitemap = read("src/app/sitemap.ts")
  assert.match(sitemap, /if \(!polishSeoReleaseEnabled\(\)\) return \[\.\.\.staticEntries, \.\.\.propertyEntries\]/)
})

test("static EN/PL editorial pairs have exact page-scoped canonical and reciprocal languages", () => {
  const paths = [
    "about", "contact", "areas", "areas/palm-jumeirah", "areas/palm-jebel-ali",
    "areas/emirates-living", "areas/dubai-marina", "areas/jumeirah-islands",
    "areas/jumeirah-park", "property-review", "sell-with-us", "opportunities",
    "luxury-property-dubai", "luxury-villas-dubai", "dubai-luxury-penthouses",
    "off-market-properties-dubai", "billionaires-row-palm-jumeirah",
    "palm-jumeirah-villas-for-sale", "palm-jumeirah-apartments-for-sale",
    "dubai-marina-apartments-for-sale", "emirates-hills-villas-for-sale",
    "jumeirah-islands-villas-for-sale", "jumeirah-park-villas-for-sale"
  ]
  const origin = "https://www.pamaestates.com"
  for (const path of paths) {
    assert.ok(polishPages[path], "Missing Polish equivalent for " + path)
    const file = "src/app/" + path + (["property-review", "sell-with-us"].includes(path) ? "/layout.tsx" : "/page.tsx")
    const source = read(file)
    assert.ok(source.includes('canonical: "' + origin + '/' + path + '"'), "Canonical missing: " + file)
    assert.ok(source.includes('en: "' + origin + '/' + path + '"'), "EN hreflang missing: " + file)
    assert.ok(source.includes('pl: "' + origin + '/pl/' + path + '"'), "PL hreflang missing: " + file)
    assert.ok(!source.includes("https://pamaestates.com/"), "Apex URL remains: " + file)
  }
  const catchall = read("src/app/pl/[...path]/page.tsx")
  assert.ok(catchall.includes('languages: { en, pl }'))
  assert.ok(catchall.includes('path === "privacy"'))
  assert.ok(catchall.includes('robots: polishSeoRobots({ legalApproved: path !== "privacy" })'))
  for (const path of ["property-review", "sell-with-us"]) {
    assert.ok(read("src/app/" + path + "/page.tsx").startsWith('"use client"'))
  }
  assert.ok(read("src/app/sitemap.ts").includes('if (!polishSeoReleaseEnabled())'))
})

test("privacy remains canonical-only until a Polish legal equivalent is approved", () => {
  const en = read("src/app/privacy/page.tsx")
  const pl = read("src/app/pl/[...path]/page.tsx")
  assert.ok(en.includes('canonical: "https://www.pamaestates.com/privacy"'))
  assert.ok(!en.includes("languages:"))
  assert.ok(pl.includes('path === "privacy"'))
  assert.ok(pl.includes('? { canonical: pl }'))
})

test("privacy notices disclose both CRM capture and WhatsApp-only Polish flow without enabling Polish indexing", () => {
  const en = read("src/app/privacy/page.tsx")
  const pl = read("src/lib/pl-content.ts")
  const route = read("src/app/pl/[...path]/page.tsx")
  for (const term of ["internal CRM", "Polish website forms", "outside the UAE", "consent where required", "legal and regulatory"]) {
    assert.ok(en.includes(term), "English notice missing " + term)
  }
  for (const term of ["PAMA ESTATES L.L.C", "systemu CRM", "WhatsApp", "prawnych", "Przetwarzanie i przekazywanie danych", "RODO"]) {
    assert.ok(pl.includes(term), "Polish notice missing " + term)
  }
  assert.ok(route.includes('robots: polishSeoRobots({ legalApproved: path !== "privacy" })'))
  assert.ok(route.includes('path === "privacy"'))
  assert.ok(!read("src/app/sitemap.ts").includes('"/pl/privacy"'))
})

test("Polish SEO gate is OFF by default, always OFF outside production and respects approval", () => {
  const { polishSeoReleaseEnabled, polishSeoRobots } = loadPureModule("src/lib/pl-seo-release.ts")
  for (const env of [
    {}, { VERCEL_ENV: "production" }, { VERCEL_ENV: "preview", PAMA_PL_SEO_RELEASE_APPROVED: "true" },
    { VERCEL_ENV: "development", PAMA_PL_SEO_RELEASE_APPROVED: "true" },
    { VERCEL_ENV: "production", PAMA_PL_SEO_RELEASE_APPROVED: "TRUE" },
    { VERCEL_ENV: "production", PAMA_PL_SEO_RELEASE_APPROVED: "false" },
  ]) {
    assert.equal(polishSeoReleaseEnabled(env), false)
    assert.equal(polishSeoRobots({}, env).index, false)
    assert.equal(polishSeoRobots({ reviewed: true }, env).index, false)
  }
  const approved = { VERCEL_ENV: "production", PAMA_PL_SEO_RELEASE_APPROVED: "true" }
  assert.equal(polishSeoReleaseEnabled(approved), true)
  assert.equal(polishSeoRobots({}, approved).index, true)
  assert.equal(polishSeoRobots({ reviewed: true }, approved).index, true)
  assert.equal(polishSeoRobots({ reviewed: false }, approved).index, false)
  assert.equal(polishSeoRobots({ legalApproved: false }, approved).index, false)
  assert.equal(polishSeoRobots({ reviewed: false, legalApproved: true }, approved).index, false)
})

test("Polish sitemap eligibility is limited to currently approved properties and excludes legal privacy", () => {
  const sitemap = read("src/app/sitemap.ts")
  const detail = read("src/app/pl/properties/[slug]/page.tsx")
  const editorial = read("src/app/pl/[...path]/page.tsx")
  assert.match(sitemap, /if \(!polishSeoReleaseEnabled\(\)\) return \[\.\.\.staticEntries, \.\.\.propertyEntries\]/)
  assert.ok(sitemap.includes("normalizeAvailability({ englishEnabled, polishEnabled }).polishEnabled"))
  assert.ok(sitemap.includes('routes.filter((route) => route !== "/privacy")'))
  assert.ok(sitemap.includes("publicationSafePolishCopy(property, approvedPolishCopyFor(property)).reviewed"))
  assert.ok(sitemap.includes("eligibleProperties.map"))
  assert.ok(sitemap.includes("if (!eligibleSlugs.has(properties[index].slug)) return entry"))
  assert.ok(sitemap.includes('url: `${baseUrl}/pl/properties/${property.slug}`'))
  assert.ok(detail.includes("polishSeoRobots({ reviewed: copy.reviewed })"))
  assert.ok(editorial.includes('polishSeoRobots({ legalApproved: path !== "privacy" })'))
  assert.ok(!sitemap.includes('"/pl/privacy"'))
})
