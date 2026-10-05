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
  /** Public whole-square-foot area, always rounded down. */
  sizeSqFt?: number
  /** Public whole-square-foot plot area, always rounded down. */
  plotSqFt?: number
  parkingSpaces?: number
  furnishedStatus?: string
  completionStatus?: string
  completion?: string
  view?: string
  askingPriceAed?: number
  /** Privacy-safe approximation only; exact original contract price remains private in PAMA Core. */
  originalPriceAed?: number
  /** Approximate whole-percent public price position. */
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

const PUBLIC_ORIGINAL_PRICE_STEP_AED = 10_000

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

function floorPublicArea(value?: number) {
  if (value == null || !Number.isFinite(value) || value <= 0) return undefined
  return Math.floor(value)
}

function floorPublicOriginalPrice(value?: number) {
  if (value == null || !Number.isFinite(value) || value <= 0) return undefined
  return Math.floor(value / PUBLIC_ORIGINAL_PRICE_STEP_AED) * PUBLIC_ORIGINAL_PRICE_STEP_AED
}

function approximatePricePosition(askingPriceAed?: number, publicOriginalPriceAed?: number) {
  if (!askingPriceAed || !publicOriginalPriceAed) return undefined
  return Math.round(((askingPriceAed - publicOriginalPriceAed) / publicOriginalPriceAed) * 100)
}

function sanitizeHighlights(highlights: string[], pricePositionPct?: number) {
  const retained = highlights.filter((highlight) => !/^Current asking is .*below the recorded original price\.$/i.test(highlight.trim()))
  if (pricePositionPct != null && pricePositionPct < 0) {
    retained.unshift(`Current asking is approximately ${Math.abs(pricePositionPct)}% below the recorded original price.`)
  }
  return retained.slice(0, 4)
}

export function sanitizePublicPropertyFeed(feed: PublicPropertyFeed): PublicPropertyFeed {
  return {
    ...feed,
    properties: feed.properties.map((property) => {
      const originalPriceAed = floorPublicOriginalPrice(property.originalPriceAed)
      const pricePositionPct = approximatePricePosition(property.askingPriceAed, originalPriceAed)
      return {
        ...property,
        sizeSqFt: floorPublicArea(property.sizeSqFt),
        plotSqFt: floorPublicArea(property.plotSqFt),
        originalPriceAed,
        pricePositionPct,
        highlights: sanitizeHighlights(property.highlights, pricePositionPct),
      }
    }),
  }
}

export async function getPublicPropertyFeed(): Promise<PublicPropertyFeed> {
  const origin = process.env.PAMA_PUBLIC_SITE_ORIGIN?.trim() || "https://www.pamaestates.com"
  try {
    const response = await fetch(`${origin}/feeds/properties.json`, {
      next: { revalidate: 60 },
      headers: { accept: "application/json" },
    })
    if (!response.ok) return EMPTY_FEED
    const feed = validatePublicPropertyFeed(await response.json())
    return feed ? sanitizePublicPropertyFeed(feed) : EMPTY_FEED
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
