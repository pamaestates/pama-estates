import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { runInNewContext } from "node:vm"
import test from "node:test"

const require = createRequire(import.meta.url)
const ts = require("typescript")
const origin = "https://www.pamaestates.com"
const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8")

// Run actual TS/TSX module exports in a sandbox. No network, Vercel, CRM, or production writes.
function load(path, env, imports = {}) {
  const javascript = ts.transpileModule(read(path), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText
  const loadedModule = { exports: {} }
  runInNewContext(javascript, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (name) => {
      if (name === "react/jsx-runtime") return { jsx: () => null, jsxs: () => null, Fragment: Symbol("Fragment") }
      if (!Object.hasOwn(imports, name)) throw new Error("Unmocked import: " + name + " in " + path)
      return imports[name]
    },
    process: { env: { ...env } },
    Intl,
    Date,
    URL,
    URLSearchParams,
    Set,
    Number,
  })
  return loadedModule.exports
}

const off = { VERCEL_ENV: "production" }
const on = { VERCEL_ENV: "production", PAMA_PL_SEO_RELEASE_APPROVED: "true" }
const preview = { VERCEL_ENV: "preview", PAMA_PL_SEO_RELEASE_APPROVED: "true" }
const fixture = [
  { listingReference: "TEST-APPROVED", slug: "approved", title: "Approved EN", description: "Current EN", amenities: [], highlights: [], images: [], updatedAt: "2026-11-16T00:00:00Z", community: "Dubai", propertyType: "APARTMENT" },
  { listingReference: "TEST-STALE", slug: "stale", title: "Stale EN", description: "Changed EN", amenities: [], highlights: [], images: [], updatedAt: "2026-11-16T00:00:00Z", community: "Dubai", propertyType: "APARTMENT" },
]
const approvedCopy = { reference: "TEST-APPROVED", status: "APPROVED", title: "Zatwierdzona oferta", description: "Aktualny opis PL", englishFingerprint: "match", approvedAt: "2026-11-16T00:00:00Z" }
const copyFor = (property, approval) =>
  approval?.englishFingerprint === "match" && property.slug === "approved"
    ? { title: approval.title, description: approval.description, reviewed: true }
    : { title: "Opis zastępczy", description: "Wymaga akceptacji", reviewed: false }
const approvalFor = (property) => property.slug === "approved" ? approvedCopy : undefined

function gate(env) {
  return load("src/lib/pl-seo-release.ts", env)
}
function metadataModules(env) {
  const seo = gate(env)
  const dummy = () => null
  const home = load("src/app/pl/page.tsx", env, {
    "next/link": dummy,
    "@/lib/pl-seo-release": seo,
    "@/components/PolishInquiryForm": dummy,
    "@/components/PolishFeaturedProperties": dummy,
  })
  const catalog = load("src/app/pl/properties/page.tsx", env, {
    "next/link": dummy,
    "@/lib/pl-approved-copy": { approvedPolishCopyFor: approvalFor },
    "@/lib/pl-seo-release": seo,
    "@/lib/public-properties": { getPublishedProperties: async () => fixture },
    "@/lib/pl-property": { polishMoney: () => "", polishFacts: () => "", publicationSafePolishCopy: copyFor },
  })
  const editorial = load("src/app/pl/[...path]/page.tsx", env, {
    "next/link": dummy,
    "next/navigation": { notFound: () => { throw Error("404") } },
    "@/lib/pl-seo-release": seo,
    "@/lib/pl-content": { polishPages: {
      about: { title: "O nas", lead: "Polski opis", sections: [] },
      opportunities: { title: "Okazje", lead: "Polski opis", sections: [] },
      privacy: { title: "Prywatność", lead: "Polski opis", sections: [] },
    } },
    "@/lib/pl-editorial-depth": { polishEditorialDepth: {} },
    "@/components/PolishInquiryForm": dummy,
    "@/components/PolishAreasDirectory": dummy,
    "@/components/PolishOpportunities": dummy,
    "@/lib/pl-whatsapp": { polishWhatsAppHref: () => "" },
  })
  const details = load("src/app/pl/properties/[slug]/page.tsx", env, {
    "next/link": dummy,
    "@/lib/pl-approved-copy": { approvedPolishCopyFor: approvalFor },
    "@/lib/pl-seo-release": seo,
    "next/navigation": { notFound: () => { throw Error("404") } },
    "@/components/PropertyGallery": dummy,
    "@/lib/public-properties": { getPublishedPropertyBySlug: async (slug) => fixture.find(p => p.slug === slug) },
    "@/lib/pl-whatsapp": { polishWhatsAppHref: () => "" },
    "@/lib/pl-property": {
      polishMoney: () => "", polishPropertyType: () => "", publicationSafePolishCopy: copyFor,
      polishFurnishing: () => "", polishView: () => "", polishCompletion: () => "",
      polishCompletionStatus: () => "", polishAmenity: () => "",
    },
  })
  return { home, catalog, editorial, details }
}

async function sitemapFor(env, { enEnabled = true, plEnabled = true, flagsThrow = false } = {}) {
  const { default: sitemap } = load("src/app/sitemap.ts", env, {
    "@/lib/public-properties": { getPublishedProperties: async () => fixture },
    "@/lib/pl-approved-copy": { approvedPolishCopyFor: approvalFor },
    "@/lib/pl-property": { publicationSafePolishCopy: copyFor },
    "@/lib/pl-seo-release": gate(env),
    "@/flags": {
      pamaWebsiteEnEnabled: async () => { if (flagsThrow) throw Error("Flag failure"); return enEnabled },
      pamaWebsitePlEnabled: async () => plEnabled,
    },
    "@/lib/website-availability": {
      normalizeAvailability: ({ englishEnabled, polishEnabled }) => ({
        polishEnabled: englishEnabled === true && polishEnabled === true,
      }),
    },
  })
  return sitemap()
}

function checkReciprocal(entries, route) {
  const en = entries.find(entry => entry.url === origin + route)
  const pl = entries.find(entry => entry.url === origin + "/pl" + route)
  assert.ok(en && pl, "Missing bilingual sitemap pair: " + route)
  assert.equal(en.alternates.languages.en, en.url)
  assert.equal(en.alternates.languages.pl, pl.url)
  assert.equal(pl.alternates.languages.en, en.url)
  assert.equal(pl.alternates.languages.pl, pl.url)
}

test("index release OFF: every sampled PL page remains noindex and sitemap remains EN-only", async () => {
  const m = metadataModules(off)
  assert.equal(m.home.metadata.robots.index, false)
  assert.equal(m.catalog.metadata.robots.index, false)
  for (const path of ["about", "opportunities", "privacy"]) {
    const x = await m.editorial.generateMetadata({ params: Promise.resolve({ path: path.split("/") }) })
    assert.equal(x.robots.index, false)
    assert.equal(x.alternates.canonical, origin + "/pl/" + path)
  }
  for (const slug of ["approved", "stale"]) {
    const x = await m.details.generateMetadata({ params: Promise.resolve({ slug }) })
    assert.equal(x.robots.index, false)
  }
  const entries = await sitemapFor(off)
  assert.ok(entries.every(x => !x.url.startsWith(origin + "/pl")), "PL leaked into OFF sitemap")
  assert.ok(entries.some(x => x.url === origin + "/opportunities"))
  assert.ok(entries.some(x => x.url === origin + "/properties/stale"))
})

test("index release ON: canonical, reciprocal alternates and sitemap match approved PL indexability", async () => {
  const m = metadataModules(on)
  assert.equal(m.home.metadata.robots.index, true)
  assert.equal(m.catalog.metadata.robots.index, true)
  assert.equal(m.home.metadata.alternates.canonical, origin + "/pl")
  assert.equal(m.catalog.metadata.alternates.canonical, origin + "/pl/properties")
  assert.equal(m.home.metadata.alternates.languages.en, origin + "/")
  assert.equal(m.catalog.metadata.alternates.languages.en, origin + "/properties")
  for (const path of ["about", "opportunities"]) {
    const x = await m.editorial.generateMetadata({ params: Promise.resolve({ path: [path] }) })
    assert.equal(x.robots.index, true)
    assert.equal(x.alternates.canonical, origin + "/pl/" + path)
    assert.equal(x.alternates.languages.en, origin + "/" + path)
    assert.equal(x.alternates.languages.pl, origin + "/pl/" + path)
  }
  const privacy = await m.editorial.generateMetadata({ params: Promise.resolve({ path: ["privacy"] }) })
  assert.equal(privacy.robots.index, false)
  assert.equal(privacy.alternates.canonical, origin + "/pl/privacy")
  assert.equal(privacy.alternates.languages, undefined)
  const approved = await m.details.generateMetadata({ params: Promise.resolve({ slug: "approved" }) })
  const stale = await m.details.generateMetadata({ params: Promise.resolve({ slug: "stale" }) })
  assert.equal(approved.robots.index, true)
  assert.equal(approved.alternates.canonical, origin + "/pl/properties/approved")
  assert.equal(approved.alternates.languages.en, origin + "/properties/approved")
  assert.equal(stale.robots.index, false)
  assert.equal(stale.alternates.canonical, origin + "/pl/properties/stale")
  const entries = await sitemapFor(on)
  for (const route of ["", "/about", "/opportunities", "/properties", "/properties/approved"]) {
    checkReciprocal(entries, route)
  }
  assert.equal(entries.filter(x => x.url === origin + "/pl/properties/stale").length, 0)
  assert.equal(entries.filter(x => x.url === origin + "/pl/privacy").length, 0)
  assert.ok(entries.some(x => x.url === origin + "/properties/stale"))
})

test("preview and failed PL availability remain non-indexable or absent from PL sitemap", async () => {
  assert.equal(metadataModules(preview).home.metadata.robots.index, false)
  assert.equal(metadataModules(preview).catalog.metadata.robots.index, false)
  const p = await metadataModules(preview).editorial.generateMetadata({ params: Promise.resolve({ path: ["about"] }) })
  assert.equal(p.robots.index, false)
  for (const options of [{ plEnabled: false }, { enEnabled: false }, { flagsThrow: true }]) {
    const entries = await sitemapFor(on, options)
    assert.ok(entries.every(x => !x.url.startsWith(origin + "/pl")))
    assert.ok(entries.some(x => x.url === origin + "/opportunities"))
  }
})
