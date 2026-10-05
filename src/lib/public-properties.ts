export type PublicPropertyImage = {
  url: string
  alt: string
  width?: number
  height?: number
  category?: string
  isCover?: boolean
}

export type PublicPropertyFloorPlan = {
  url: string
  label?: string
}

export type PublicProperty = {
  schemaVersion: 1
  listingReference: string
  slug: string
  listingType: "SALE" | "RENT"
  title: string
  description: string
  community: string
  subcommunity?: string
  project?: string
  building?: string
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  sizeSqFt?: number
  plotSqFt?: number
  parkingSpaces?: number
  furnishedStatus?: string
  completionStatus?: string
  completion?: string
  view?: string
  askingPriceAed?: number
  originalPriceAed?: number
  pricePositionPct?: number
  amenities: string[]
  highlights: string[]
  images: PublicPropertyImage[]
  floorPlans: PublicPropertyFloorPlan[]
  regulatoryVerification: {
    /** Public Madmoun QR image only. The underlying Trakheesi/permit number is deliberately excluded. */
    qrImageUrl: string
  }
  advisor?: {
    name: string
    mobile?: string
    email?: string
  }
  publishedAt: string
  updatedAt: string
}

export type PublicPropertyFeed = {
  schemaVersion: 1
  generatedAt: string
  properties: PublicProperty[]
}

const EMPTY_FEED: PublicPropertyFeed = {
  schemaVersion: 1,
  generatedAt: new Date(0).toISOString(),
  properties: [],
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== "string") return false
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

function safeProperty(value: unknown): value is PublicProperty {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  const item = value as Partial<PublicProperty> & Record<string, unknown>

  // Privacy invariant: public website payloads must never carry direct unit/owner/permit identifiers.
  const forbiddenKeys = [
    "permitNumber",
    "trakheesiNumber",
    "unitNumber",
    "propertyNumber",
    "owner",
    "owners",
    "sellerMotivation",
    "accessInstructions",
    "viewingInstructions",
    "minimumPriceInternal",
  ]
  if (forbiddenKeys.some((key) => key in item)) return false

  if (
    item.schemaVersion !== 1 ||
    typeof item.listingReference !== "string" ||
    typeof item.slug !== "string" ||
    (item.listingType !== "SALE" && item.listingType !== "RENT") ||
    typeof item.title !== "string" ||
    typeof item.description !== "string" ||
    typeof item.community !== "string" ||
    !Array.isArray(item.images) ||
    !Array.isArray(item.amenities) ||
    !Array.isArray(item.highlights)
  ) {
    return false
  }

  const regulatory = item.regulatoryVerification
  if (!regulatory || typeof regulatory !== "object" || Array.isArray(regulatory)) return false
  if (!("qrImageUrl" in regulatory) || !isHttpsUrl((regulatory as { qrImageUrl?: unknown }).qrImageUrl)) return false

  return item.images.every((image) => Boolean(image && typeof image === "object" && isHttpsUrl((image as { url?: unknown }).url)))
}

export function validatePublicPropertyFeed(value: unknown): PublicPropertyFeed | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const feed = value as Partial<PublicPropertyFeed>
  if (feed.schemaVersion !== 1 || typeof feed.generatedAt !== "string" || !Array.isArray(feed.properties)) return null
  if (!feed.properties.every(safeProperty)) return null
  return feed as PublicPropertyFeed
}

export async function getPublicPropertyFeed(): Promise<PublicPropertyFeed> {
  const origin = process.env.PAMA_PUBLIC_SITE_ORIGIN?.trim() || "https://www.pamaestates.com"
  try {
    const response = await fetch(`${origin}/feeds/properties.json`, {
      next: { revalidate: 60 },
      headers: { accept: "application/json" },
    })
    if (!response.ok) return EMPTY_FEED
    return validatePublicPropertyFeed(await response.json()) ?? EMPTY_FEED
  } catch {
    return EMPTY_FEED
  }
}

export async function getPublishedProperties() {
  return (await getPublicPropertyFeed()).properties
}

export async function getPublishedPropertyBySlug(slug: string) {
  return (await getPublishedProperties()).find((property) => property.slug === slug)
}
