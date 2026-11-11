#!/usr/bin/env node
// Offline source-change tripwire: no network, translation services, database, or publication writes.
import { createHash } from "node:crypto"
import { readFileSync, existsSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
export function gitBlobSha(bytes) {
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)
  return createHash("sha1")
    .update(`blob ${buffer.byteLength}\0`)
    .update(buffer)
    .digest("hex")
}

export function validateEnglishSourceManifest(manifest, readSource) {
  if (manifest?.version !== 1 || !Array.isArray(manifest.entries)) throw new Error("PL source manifest version or entries invalid")
  const issues = []
  const seen = new Set()
  for (const entry of manifest.entries) {
    if (!entry || typeof entry.english !== "string" || typeof entry.polish !== "string" ||
        !/^[a-f0-9]{40}$/.test(entry.englishBlobSha) || seen.has(entry.english)) {
      issues.push("Invalid or duplicate parity manifest entry")
      continue
    }
    seen.add(entry.english)
    // Paths are fixed repository-relative paths, never user-provided URLs.
    if (!/^src\/(app|components)\/[\w./\[\]-]+\.tsx$/.test(entry.english) ||
        !/^src\/(app|components|lib)\/[\w./\[\]-]+\.tsx?$/.test(entry.polish) ||
        entry.english.includes("..") || entry.polish.includes("..")) {
      issues.push(`Unsafe or unexpected source path: ${entry.english}`)
      continue
    }
    let english
    try { english = readSource(entry.english) }
    catch { issues.push(`Missing English source: ${entry.english}`); continue }
    try { readSource(entry.polish) }
    catch { issues.push(`Missing Polish counterpart: ${entry.polish}`) }
    if (gitBlobSha(english) !== entry.englishBlobSha) {
      issues.push(`EN changed; review PL counterpart before release: ${entry.english} -> ${entry.polish}`)
    }
  }
  if (seen.size === 0) issues.push("Empty parity manifest")
  return issues
}

const invoked = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (invoked) {
  const file = resolve(root, "docs/pl-source-parity.json")
  if (!existsSync(file)) { console.error("PL parity manifest missing"); process.exitCode = 1 }
  else {
    const manifest = JSON.parse(readFileSync(file, "utf8"))
    const issues = validateEnglishSourceManifest(manifest, rel => readFileSync(resolve(root, rel)))
    if (issues.length) {
      console.error("PL SOURCE DRIFT CHECK FAILED:")
      issues.forEach(issue => console.error("- " + issue))
      console.error("Update Polish counterpart, review parity, then refresh the baseline SHA for approved English changes.")
      process.exitCode = 1
    } else {
      console.log(`PL source drift guard PASS: ${manifest.entries.length} English source files unchanged against recorded baseline.`)
      console.log("Note: PASS does not establish full EN/PL functional or editorial parity.")
    }
  }
}
