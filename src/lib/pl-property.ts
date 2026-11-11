import type { PublicProperty } from "@/lib/public-properties"

export function polishMoney(value?: number) {
  return value == null ? "Cena na zapytanie" : `${new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(value)} AED`
}

export function polishPropertyType(value: string) {
  return ({ APARTMENT: "Apartament", VILLA: "Willa", TOWNHOUSE: "Dom szeregowy", PENTHOUSE: "Penthouse", PLOT: "Działka" } as Record<string,string>)[value.toUpperCase()] ?? value
}

export function polishListingType(value: string) { return value === "RENT" ? "Wynajem" : "Sprzedaż" }

/** Public facts only. This deterministic summary is never represented as a reviewed translation. */
export function polishFacts(property: PublicProperty) {
  const facts = [polishPropertyType(property.propertyType), property.community, property.building || property.project, property.bedrooms == null ? null : `${property.bedrooms} pok. sypialne`, property.sizeSqFt == null ? null : `${new Intl.NumberFormat("pl-PL").format(property.sizeSqFt)} ft²`]
  return facts.filter(Boolean).join(" · ")
}

/** Separate approved Polish descriptions are intentionally not stored in the public feed. */
export type PolishEditorialRecord = {
  reference: string
  englishFingerprint: string
  title: string
  description: string
  status: "APPROVED" | "DRAFT" | "STALE"
  approvedAt?: string
}

export function publicationSafePolishCopy(property: PublicProperty, approved?: PolishEditorialRecord) {
  if (approved?.status === "APPROVED" && approved.reference === property.listingReference && approved.englishFingerprint === sourceFingerprint(property) && Boolean(approved.approvedAt) && !Number.isNaN(Date.parse(approved.approvedAt))) {
    return { title: approved.title, description: approved.description, reviewed: true }
  }
  return { title: `${polishPropertyType(property.propertyType)} — ${property.community}`, description: "Szczegółowy opis w języku polskim jest przygotowywany. Skontaktuj się z nami, aby otrzymać aktualne informacje i omówić tę nieruchomość po polsku.", reviewed: false }
}

/** Deterministic, non-cryptographic change marker; not a security integrity mechanism. */
export function sourceFingerprint(property: PublicProperty) {
  return JSON.stringify([property.title, property.description, property.amenities, property.highlights])
}
