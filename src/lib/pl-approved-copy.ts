import rawCopy from "@/content/pl-approved-properties.json"
import type { PublicProperty } from "@/lib/public-properties"
import type { PolishEditorialRecord } from "@/lib/pl-property"

/**
 * Isolated, version-controlled and READ-ONLY editorial approval store.
 * Records may be added only by a separately approved, reviewed repository change.
 * No CRM write, runtime editorial mutation, external service, or AI translation.
 */
export function approvedPolishCopyFor(property: PublicProperty): PolishEditorialRecord | undefined {
  const data: unknown = rawCopy
  if (!data || typeof data !== "object") return undefined
  const document = data as { version?: unknown; records?: unknown }
  if (document.version !== 1 || !Array.isArray(document.records)) return undefined

  const records = document.records.filter((value): value is PolishEditorialRecord => {
    if (!value || typeof value !== "object") return false
    const record = value as Record<string, unknown>
    return record.status === "APPROVED" &&
      typeof record.reference === "string" &&
      typeof record.englishFingerprint === "string" &&
      typeof record.title === "string" && record.title.trim().length > 0 &&
      typeof record.description === "string" && record.description.trim().length > 0 &&
      typeof record.approvedAt === "string" &&
      !Number.isNaN(Date.parse(record.approvedAt))
  })
  const matches = records.filter(record => record.reference === property.listingReference)
  // Fail closed if the publication record is ambiguous or approval predates source changes.
  return matches.length === 1 ? matches[0] : undefined
}
