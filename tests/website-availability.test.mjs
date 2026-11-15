import assert from "node:assert/strict"
import test from "node:test"

const {
  normalizeAvailability,
  websiteMode,
  isPublicPageAllowed,
} = await import("../src/lib/website-availability.ts")

test("both languages enabled", () => {
  const config = { englishEnabled: true, polishEnabled: true }
  assert.equal(websiteMode(config), "BOTH")
  assert.equal(isPublicPageAllowed("/", config), true)
  assert.equal(isPublicPageAllowed("/properties", config), true)
  assert.equal(isPublicPageAllowed("/pl", config), true)
  assert.equal(isPublicPageAllowed("/pl/properties", config), true)
})

test("Polish OFF leaves English available", () => {
  const config = { englishEnabled: true, polishEnabled: false }
  assert.equal(websiteMode(config), "EN_ONLY")
  assert.equal(isPublicPageAllowed("/", config), true)
  assert.equal(isPublicPageAllowed("/properties", config), true)
  assert.equal(isPublicPageAllowed("/pl", config), false)
  assert.equal(isPublicPageAllowed("/pl/properties", config), false)
})

test("English OFF activates maintenance", () => {
  const config = { englishEnabled: false, polishEnabled: false }
  assert.equal(websiteMode(config), "MAINTENANCE")
  assert.equal(isPublicPageAllowed("/", config), false)
  assert.equal(isPublicPageAllowed("/properties", config), false)
  assert.equal(isPublicPageAllowed("/pl", config), false)
})

test("Polish cannot stay public when English is OFF", () => {
  const config = { englishEnabled: false, polishEnabled: true }
  assert.deepEqual(normalizeAvailability(config), {
    englishEnabled: false,
    polishEnabled: false,
  })
  assert.equal(websiteMode(config), "MAINTENANCE")
})

test("website availability rejects invalid configuration safely", () => {
  const invalid = [
    null,
    undefined,
    {},
    [],
    "ON",
    { englishEnabled: "false", polishEnabled: true },
    { englishEnabled: true, polishEnabled: "true" },
  ]

  for (const value of invalid) {
    assert.equal(websiteMode(value), "EN_ONLY")
    assert.equal(isPublicPageAllowed("/", value), true)
    assert.equal(isPublicPageAllowed("/pl", value), false)
  }
})

test("language matching respects path boundaries", () => {
  const config = { englishEnabled: true, polishEnabled: false }
  assert.equal(isPublicPageAllowed("/pl", config), false)
  assert.equal(isPublicPageAllowed("/pl/contact", config), false)
  assert.equal(isPublicPageAllowed("/plugin", config), true)
  assert.equal(isPublicPageAllowed("/places", config), true)
})