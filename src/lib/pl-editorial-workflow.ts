import type { PublicProperty } from "@/lib/public-properties"
import { sourceFingerprint, type PolishEditorialRecord } from "@/lib/pl-property"

/**
 * Pure functions for a future approved translation service / editorial CMS.
 * This module performs no network requests, persistence, publication or AI billing.
 * Public property facts remain sourced exclusively from the public English feed.
 */
export type PolishTranslationDraft = PolishEditorialRecord & {
  kind: "PROPERTY"
  generatedBy: "EDITOR" | "APPROVED_TRANSLATION_ADAPTER"
}

export function createPendingDraft(property: PublicProperty): PolishTranslationDraft {
  return {
    kind: "PROPERTY",
    reference: property.listingReference,
    englishFingerprint: sourceFingerprint(property),
    title: "",
    description: "",
    status: "DRAFT",
    generatedBy: "EDITOR",
  }
}

export function isCurrentApprovedTranslation(property: PublicProperty, record: PolishEditorialRecord) {
  return record.status === "APPROVED" && record.reference === property.listingReference && record.englishFingerprint === sourceFingerprint(property) && Boolean(record.approvedAt)
}

export function markStaleOnSourceChange(property: PublicProperty, record: PolishEditorialRecord): PolishEditorialRecord {
  if (record.englishFingerprint === sourceFingerprint(property)) return record
  return { ...record, status: "STALE" }
}

export function validateEditorialApproval(record: PolishEditorialRecord) {
  if (!record.reference.trim() || !record.englishFingerprint || !record.title.trim() || !record.description.trim()) {
    throw new Error("Cannot approve incomplete Polish copy")
  }
  if (!record.approvedAt || Number.isNaN(Date.parse(record.approvedAt))) {
    throw new Error("Approval timestamp is required")
  }
  return { ...record, status: "APPROVED" as const }
}
