import type { PublicProperty } from "@/lib/public-properties"
import type { PolishEditorialRecord } from "@/lib/pl-property"

/** Read-only comparison of public EN property data against Polish editorial records.
 * This module never translates, approves, persists, or publishes content.
 * Pass the existing sourceFingerprint function as fingerprintSource to avoid
 * creating a second, potentially divergent definition of source changes.
 */
export type PolishSyncStatus = "CURRENT" | "MISSING" | "STALE" | "CONFLICT"

export type PolishSyncReason =
  | "APPROVED_AND_CURRENT"
  | "NO_RECORD"
  | "PENDING_APPROVAL"
  | "SOURCE_CHANGED"
  | "MARKED_STALE"
  | "DUPLICATE_PROPERTY"
  | "DUPLICATE_EDITORIAL_RECORD"
  | "INVALID_REFERENCE"
  | "INVALID_EDITORIAL_RECORD"
  | "SOURCE_FINGERPRINT_FAILED"

export interface PolishSyncEntry {
  reference: string
  status: PolishSyncStatus
  reason: PolishSyncReason
}

export function buildPolishPropertySyncReport(
  properties: readonly PublicProperty[],
  records: readonly PolishEditorialRecord[],
  fingerprintSource: (property: PublicProperty) => string,
): PolishSyncEntry[] {
  const propertyCounts = new Map<string, number>()
  const recordsByReference = new Map<string, PolishEditorialRecord[]>()
  let invalidRecordWithoutReference = false

  for (const property of properties) {
    const reference = property?.listingReference
    if (typeof reference === "string" && reference.trim()) {
      propertyCounts.set(reference, (propertyCounts.get(reference) ?? 0) + 1)
    }
  }

  for (const record of records) {
    const reference = record?.reference
    if (typeof reference === "string" && reference.trim()) {
      const group = recordsByReference.get(reference) ?? []
      group.push(record)
      recordsByReference.set(reference, group)
    } else {
      invalidRecordWithoutReference = true
    }
  }

  const result: PolishSyncEntry[] = properties.map(property => {
    const reference = property?.listingReference
    if (typeof reference !== "string" || !reference.trim()) {
      return { reference: "", status: "CONFLICT", reason: "INVALID_REFERENCE" }
    }
    if (invalidRecordWithoutReference) {
      return { reference, status: "CONFLICT", reason: "INVALID_EDITORIAL_RECORD" }
    }
    if ((propertyCounts.get(reference) ?? 0) !== 1) {
      return { reference, status: "CONFLICT", reason: "DUPLICATE_PROPERTY" }
    }

    const matches = recordsByReference.get(reference) ?? []
    if (matches.length > 1) {
      return { reference, status: "CONFLICT", reason: "DUPLICATE_EDITORIAL_RECORD" }
    }
    if (matches.length === 0) {
      return { reference, status: "MISSING", reason: "NO_RECORD" }
    }

    const record = matches[0]
    if (!record || (record.status !== "APPROVED" && record.status !== "DRAFT" && record.status !== "STALE")) {
      return { reference, status: "CONFLICT", reason: "INVALID_EDITORIAL_RECORD" }
    }
    if (record.status === "DRAFT") {
      return { reference, status: "MISSING", reason: "PENDING_APPROVAL" }
    }
    if (record.status === "STALE") {
      return { reference, status: "STALE", reason: "MARKED_STALE" }
    }
    if (
      typeof record.englishFingerprint !== "string" ||
      typeof record.title !== "string" || !record.title.trim() ||
      typeof record.description !== "string" || !record.description.trim() ||
      typeof record.approvedAt !== "string" ||
      !record.approvedAt.trim() || Number.isNaN(Date.parse(record.approvedAt))
    ) {
      return { reference, status: "CONFLICT", reason: "INVALID_EDITORIAL_RECORD" }
    }

    let currentFingerprint: string
    try {
      currentFingerprint = fingerprintSource(property)
    } catch {
      return { reference, status: "CONFLICT", reason: "SOURCE_FINGERPRINT_FAILED" }
    }
    if (typeof currentFingerprint !== "string") {
      return { reference, status: "CONFLICT", reason: "SOURCE_FINGERPRINT_FAILED" }
    }
    return record.englishFingerprint === currentFingerprint
      ? { reference, status: "CURRENT", reason: "APPROVED_AND_CURRENT" }
      : { reference, status: "STALE", reason: "SOURCE_CHANGED" }
  })

  // Sorting makes report output stable even when the public feed changes order.
  return result.sort((a, b) => a.reference < b.reference ? -1 : a.reference > b.reference ? 1 : 0)
}
