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

/** Deterministic translation of structured public facts; unknown source values are preserved. */
export function polishFurnishing(value: string): string {
  const normalized = value.trim().toUpperCase().replace(/[\s_-]+/g, " ")
  return ({
    "FURNISHED": "Umeblowany",
    "UNFURNISHED": "Nieumeblowany",
    "SEMI FURNISHED": "Częściowo umeblowany",
    "PARTLY FURNISHED": "Częściowo umeblowany",
    "FULLY FURNISHED": "W pełni umeblowany",
  } as Record<string, string>)[normalized] ?? value
}

export function polishView(value: string): string {
  const normalized = value.trim().toUpperCase().replace(/[\s_-]+/g, " ")
  return ({
    "SEA VIEW": "Widok na morze",
    "SEA AND SWIMMING POOL VIEW": "Widok na morze i basen",
    "SEA AND POOL VIEW": "Widok na morze i basen",
    "SWIMMING POOL VIEW": "Widok na basen",
    "POOL VIEW": "Widok na basen",
    "MARINA VIEW": "Widok na marinę",
    "BURJ KHALIFA VIEW": "Widok na Burj Khalifa",
    "CITY VIEW": "Widok na miasto",
    "COMMUNITY VIEW": "Widok na osiedle",
    "GARDEN VIEW": "Widok na ogród",
    "PARK VIEW": "Widok na park",
    "CANAL VIEW": "Widok na kanał",
  } as Record<string, string>)[normalized] ?? value
}

/** Only an unambiguous calendar date is reformatted; original source is kept otherwise. */
export function polishCompletion(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return value
  const year = Number(match[1]), month = Number(match[2]), day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return value
  return new Intl.DateTimeFormat("pl-PL", { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" }).format(date)
}

export function polishCompletionStatus(value: string): string {
  const normalized = value.trim().toUpperCase().replace(/[\s_-]+/g, " ")
  return ({
    "OFF PLAN": "W budowie / na etapie projektu",
    "UNDER CONSTRUCTION": "W budowie",
    "READY": "Gotowa",
    "COMPLETED": "Ukończona",
    "READY TO MOVE": "Gotowa do zamieszkania",
  } as Record<string,string>)[normalized] ?? value
}

export function polishAmenity(value: string): string {
  const normalized = value.trim().toUpperCase().replace(/[\s_-]+/g, " ")
  return ({
    "SWIMMING POOL": "Basen",
    "POOL": "Basen",
    "GYM": "Siłownia",
    "GYMNASIUM": "Siłownia",
    "BALCONY": "Balkon",
    "PRIVATE POOL": "Prywatny basen",
    "SECURITY": "Ochrona",
    "COVERED PARKING": "Zadaszony parking",
    "PARKING": "Parking",
    "CENTRAL AIR CONDITIONING": "Centralna klimatyzacja",
    "BUILT IN WARDROBES": "Wbudowane szafy",
    "CHILDRENS PLAY AREA": "Plac zabaw dla dzieci",
    "CHILDREN'S PLAY AREA": "Plac zabaw dla dzieci",
    "CONCIERGE": "Usługi concierge",
    "MAIDS ROOM": "Pokój dla pomocy domowej",
    "STUDY": "Gabinet",
    "STUDY ROOM": "Gabinet",
  } as Record<string,string>)[normalized] ?? value.replaceAll("-", " ")
}
