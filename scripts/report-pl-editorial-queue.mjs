#!/usr/bin/env node
/**
 * Read-only, offline PL editorial work queue derived from an already-public
 * website feed snapshot and the committed PL approvals. Never translates,
 * approves, publishes, accesses CRM, or changes records.
 *
 * Usage (PowerShell): Get-Content -Raw .\public-properties.json | node scripts/report-pl-editorial-queue.mjs
 * Outputs public listing references and workflow states, never property descriptions.
 */
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const sourceFingerprint = (property) =>
  JSON.stringify([property.title, property.description, property.amenities, property.highlights])

function assertValidFeed(feed) {
  if (feed?.schemaVersion !== 1 || !Array.isArray(feed.properties) || typeof feed.generatedAt !== "string") {
    throw Error("Invalid public property feed; no queue was generated")
  }
  const references = new Set()
  for (const property of feed.properties) {
    if (!property || typeof property !== "object" || typeof property.listingReference !== "string" ||
        !property.listingReference.trim() || typeof property.title !== "string" ||
        typeof property.description !== "string" || !Array.isArray(property.amenities) ||
        !Array.isArray(property.highlights) || references.has(property.listingReference)) {
      throw Error("Invalid or duplicate public listing; no queue was generated")
    }
    references.add(property.listingReference)
  }
}

export function reportPolishEditorialQueue(feed, approvalRegistry) {
  assertValidFeed(feed)
  if (approvalRegistry?.version !== 1 || !Array.isArray(approvalRegistry.records)) {
    throw Error("Invalid PL approval registry; no queue was generated")
  }

  const approvals = new Map()
  for (const record of approvalRegistry.records) {
    if (!record || typeof record.reference !== "string" || !record.reference.trim() ||
        approvals.has(record.reference)) {
      throw Error("Invalid or duplicate PL approval reference; no queue was generated")
    }
    approvals.set(record.reference, record)
  }

  const entries = feed.properties.map((property) => {
    const record = approvals.get(property.listingReference)
    let status
    if (!record) status = "NEEDS_TRANSLATION"
    else if (record.status !== "APPROVED") status = "NEEDS_APPROVAL"
    else if (record.englishFingerprint !== sourceFingerprint(property)) status = "SOURCE_CHANGED"
    else if (typeof record.title !== "string" || !record.title.trim() ||
             typeof record.description !== "string" || !record.description.trim() ||
             typeof record.approvedAt !== "string" ||
             Number.isNaN(Date.parse(record.approvedAt))) status = "NEEDS_APPROVAL"
    else status = "APPROVED_CURRENT"
    return { reference: property.listingReference, status }
  }).sort((a, b) => a.reference.localeCompare(b.reference, "en"))

  // Missing-from-feed approvals are only candidates for human review.
  // No archival or withdrawal is inferred from a potentially stale snapshot.
  const publishedReferences = new Set(feed.properties.map(p => p.listingReference))
  const notInSnapshot = [...approvals.keys()].filter(ref => !publishedReferences.has(ref)).sort()
  return {
    generatedAt: feed.generatedAt,
    totalPublished: entries.length,
    needsAttention: entries.filter(e => e.status !== "APPROVED_CURRENT").length,
    entries,
    approvedReferencesAbsentFromSnapshot: notInSnapshot,
  }
}

async function main() {
  if (process.stdin.isTTY) throw Error("Pipe an existing PUBLIC property feed JSON snapshot via stdin")
  let text = ""
  for await (const chunk of process.stdin) {
    text += chunk
    if (text.length > 10_000_000) throw Error("Public feed snapshot exceeds 10 MB limit")
  }
  if (!text.trim()) throw Error("Missing public feed snapshot on stdin")
  const feed = JSON.parse(text)
  const approvals = JSON.parse(readFileSync(resolve(root, "src/content/pl-approved-properties.json"), "utf8"))
  const report = reportPolishEditorialQueue(feed, approvals)
  process.stdout.write(JSON.stringify(report, null, 2) + "\n")
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => {
    console.error("PL EDITORIAL QUEUE STOP: " + (error instanceof Error ? error.message : "Unknown error"))
    process.exitCode = 1
  })
}
