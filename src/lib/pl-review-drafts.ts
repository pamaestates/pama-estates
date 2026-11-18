import type { PublicProperty } from "@/lib/public-properties"
import type { PolishEditorialRecord } from "@/lib/pl-property"
import { buildPolishPropertySyncReport, type PolishSyncReason } from "@/lib/pl-property-sync"
import { sourceFingerprint } from "@/lib/pl-property"

/**
 * Produces editorial DRAFT candidates from already-public structured facts.
 * No translation API, external transport, persistence, publication, or approvals.
 * Deliberately does NOT translate English descriptions or assert availability.
 */
export type PolishReviewDraft = {
  reference: string
  reason: PolishSyncReason
  status: "DRAFT"
  englishFingerprint: string
  title: string
  description: string
}

const types: Record<string, string> = {
  APARTMENT: "Apartament",
  VILLA: "Willa",
  TOWNHOUSE: "Dom szeregowy",
  PENTHOUSE: "Penthouse",
  PLOT: "Działka",
}

function draftFor(property: PublicProperty, reason: PolishSyncReason): PolishReviewDraft {
  const category = types[property.propertyType?.toUpperCase()] ?? "Nieruchomość"
  const community = property.community.trim()
  const title = `${category} — ${community}`
  const facts = [
    `${category} w lokalizacji ${community} w Dubaju.`,
    property.bedrooms != null && Number.isInteger(property.bedrooms) && property.bedrooms >= 0
      ? `Liczba sypialni: ${property.bedrooms}.` : null,
    property.sizeSqFt != null && Number.isInteger(property.sizeSqFt) && property.sizeSqFt > 0
      ? `Powierzchnia: ${property.sizeSqFt} ft².` : null,
    "W celu potwierdzenia szczegółów oferty skontaktuj się z PAMA Estates.",
  ]
  return {
    reference: property.listingReference,
    reason,
    status: "DRAFT",
    englishFingerprint: sourceFingerprint(property),
    title,
    description: facts.filter(Boolean).join(" "),
  }
}

/**
 * Excludes CURRENT and CONFLICT. A DRAFT cannot enter the read-only
 * approved-copy store or become indexable without a separate reviewed change.
 * Caller must use a validated PUBLIC feed; no private Core data.
 */
export function buildPolishReviewDrafts(
  properties: readonly PublicProperty[],
  records: readonly PolishEditorialRecord[],
): PolishReviewDraft[] {
  const report = buildPolishPropertySyncReport(properties, records, sourceFingerprint)
  const byReference = new Map(properties.map(property => [property.listingReference, property]))
  return report.filter(item => item.status === "MISSING" || item.status === "STALE").map(item => {
    const property = byReference.get(item.reference)
    if (!property || !property.community?.trim()) {
      throw new Error("Public property missing required review data")
    }
    return draftFor(property, item.reason)
  })
}
