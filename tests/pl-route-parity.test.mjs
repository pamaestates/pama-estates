import assert from "node:assert/strict"
import test from "node:test"
import { inspectRouteParity, readPolishEditorialKeys } from "../scripts/check-pl-route-parity.mjs"

const pages = ["/", "/pl", "/about", "/pl/[...path]", "/properties", "/pl/properties", "/properties/[slug]", "/pl/properties/[slug]", "/opportunities"]

test("missing Polish opportunities page is detected", () => {
  assert.deepEqual(inspectRouteParity(pages, ["about", "properties"], []).errors, ["Missing Polish counterpart (no approved exemption): /opportunities"])
})
test("new English page without Polish counterpart fails closed", () => {
  assert.ok(inspectRouteParity([...pages, "/future-page"], ["about", "properties"], []).errors.some(x => x.endsWith("/future-page")))
})
test("homepage, static and dynamic property routes are paired", () => {
  assert.deepEqual(inspectRouteParity(pages.filter(p => p !== "/opportunities"), ["about", "properties"], []).errors, [])
})
test("unapproved exemption is rejected", () => {
  const r = inspectRouteParity(pages, ["about"], [{ route: "/opportunities", rationale: "temporary" }])
  assert.ok(r.errors.some(x => x.includes("Invalid")))
  assert.ok(r.errors.some(x => x.includes("/opportunities")))
})
test("documented exemption is accepted and counted", () => {
  const r = inspectRouteParity(pages, ["about"], [{
    route: "/opportunities", rationale: "Founder-authorized temporary exception",
    approvedBy: "Founder", approvalReference: "record-of-approval",
  }])
  assert.deepEqual(r.errors, [])
  assert.equal(r.approvedExceptions, 1)
})
test("stale exemption is rejected", () => {
  const r = inspectRouteParity(pages.filter(x => x !== "/opportunities"), ["about"], [{
    route: "/opportunities", rationale: "old", approvedBy: "Founder", approvalReference: "approval",
  }])
  assert.ok(r.errors.some(x => x.startsWith("Stale")))
})
test("editorial content keys are extracted", () => {
  const source = 'export const polishPages = {\n  "about": {\n    title: "O nas"\n  },\n  "areas/palm-jumeirah": { title: "Palm" }\n}'
  assert.deepEqual(readPolishEditorialKeys(source), ["about", "areas/palm-jumeirah"])
})
