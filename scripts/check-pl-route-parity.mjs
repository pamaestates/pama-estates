#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const pagePattern = /^page\.(tsx|ts|jsx|js)$/

export function discoverPages(appRoot) {
  const pages = new Set()
  function visit(dir, parts) {
    for (const item of readdirSync(dir, { withFileTypes: true })) {
      if (item.isSymbolicLink()) continue
      if (item.isFile() && pagePattern.test(item.name)) {
        const route = "/" + parts.filter(part => !/^\([^/]+\)$/.test(part)).join("/")
        pages.add(route)
      }
      if (item.isDirectory() && !item.name.startsWith("_")) visit(join(dir, item.name), [...parts, item.name])
    }
  }
  visit(appRoot, [])
  return [...pages].sort()
}

export function readPolishEditorialKeys(source) {
  if (!source.includes("export const polishPages")) throw new Error("Missing Polish editorial map")
  const keys = [...source.slice(source.indexOf("export const polishPages")).matchAll(/^  "([^"]+)":\s*\{\s*title\s*:/gm)].map(match => match[1])
  if (!keys.length) throw new Error("Polish editorial map has no recognizable keys")
  return keys
}

export function inspectRouteParity(allPages, editorialKeys, exemptions) {
  if (!Array.isArray(allPages) || !Array.isArray(editorialKeys) || !Array.isArray(exemptions)) throw new Error("Invalid parity input")
  const english = [...new Set(allPages.filter(p => p !== "/pl" && !p.startsWith("/pl/") && p !== "/api" && !p.startsWith("/api/")))].sort()
  const physical = new Set(allPages)
  const editorial = new Set(editorialKeys.map(key => "/" + key))
  const errors = []
  const allowed = new Map()
  for (const entry of exemptions) {
    if (!entry || typeof entry.route !== "string" || !entry.route.startsWith("/") ||
        typeof entry.rationale !== "string" || !entry.rationale.trim() ||
        typeof entry.approvedBy !== "string" || !entry.approvedBy.trim() ||
        typeof entry.approvalReference !== "string" || !entry.approvalReference.trim() ||
        allowed.has(entry.route)) {
      errors.push("Invalid or duplicate approved route exemption")
      continue
    }
    allowed.set(entry.route, entry)
  }
  for (const route of allowed.keys()) {
    if (!english.includes(route)) errors.push("Stale or non-public route exemption: " + route)
  }
  for (const route of english) {
    const match = route === "/"
      ? physical.has("/pl")
      : route.includes("[")
        ? physical.has("/pl" + route)
        : physical.has("/pl" + route) || (physical.has("/pl/[...path]") && editorial.has(route))
    if (!match && !allowed.has(route)) errors.push("Missing Polish counterpart (no approved exemption): " + route)
  }
  return { englishCount: english.length, approvedExceptions: allowed.size, errors }
}

export function checkRepository(projectRoot = root) {
  const pages = discoverPages(join(projectRoot, "src/app"))
  const editorial = readPolishEditorialKeys(readFileSync(join(projectRoot, "src/lib/pl-content.ts"), "utf8"))
  const config = JSON.parse(readFileSync(join(projectRoot, "docs/pl-route-exemptions.json"), "utf8"))
  if (config.version !== 1 || !Array.isArray(config.exemptions)) throw new Error("Invalid route exemptions manifest")
  return inspectRouteParity(pages, editorial, config.exemptions)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const report = checkRepository()
    if (report.errors.length) {
      console.error("EN/PL ROUTE PARITY FAILED:")
      report.errors.forEach(error => console.error("- " + error))
      console.error("Add a Polish counterpart or an explicitly approved and documented exemption.")
      process.exitCode = 1
    } else {
      console.log("EN/PL route parity PASS: " + report.englishCount + " EN routes, " + report.approvedExceptions + " approved exceptions.")
      console.log("Route coverage does not establish editorial or functional parity.")
    }
  } catch (error) {
    console.error("EN/PL ROUTE PARITY ERROR: " + (error instanceof Error ? error.message : "unknown"))
    process.exitCode = 1
  }
}
