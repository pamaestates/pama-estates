import type { MetadataRoute } from "next"
import { getPublishedProperties } from "@/lib/public-properties"
import { approvedPolishCopyFor } from "@/lib/pl-approved-copy"
import { publicationSafePolishCopy } from "@/lib/pl-property"
import { polishSeoReleaseEnabled } from "@/lib/pl-seo-release"
import { pamaWebsiteEnEnabled, pamaWebsitePlEnabled } from "@/flags"
import { normalizeAvailability } from "@/lib/website-availability"

const baseUrl = "https://www.pamaestates.com"

const routes = [
  "",
  "/about",
  "/contact",
  "/areas",
  "/areas/dubai-marina",
  "/areas/emirates-living",
  "/areas/jumeirah-islands",
  "/areas/jumeirah-park",
  "/areas/palm-jebel-ali",
  "/areas/palm-jumeirah",
  "/billionaires-row-palm-jumeirah",
  "/dubai-luxury-penthouses",
  "/dubai-marina-apartments-for-sale",
  "/emirates-hills-villas-for-sale",
  "/jumeirah-islands-villas-for-sale",
  "/jumeirah-park-villas-for-sale",
  "/luxury-property-dubai",
  "/luxury-villas-dubai",
  "/off-market-properties-dubai",
  "/opportunities",
  "/properties",
  "/palm-jumeirah-apartments-for-sale",
  "/palm-jumeirah-villas-for-sale",
  "/privacy",
  "/property-review",
  "/sell-with-us",
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getPublishedProperties()
  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" || route === "/properties" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/areas" || route === "/luxury-property-dubai" || route === "/properties" || route === "/property-review"
          ? 0.9
          : route === "/privacy"
            ? 0.4
            : 0.8,
  }))

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: property.updatedAt,
    changeFrequency: "daily",
    priority: 0.85,
    images: property.images.map((image) => image.url),
  }))

  // The release gate and live PL availability must both be explicitly true.
  // Flag evaluation failures leave the existing English-only sitemap untouched.
  if (!polishSeoReleaseEnabled()) return [...staticEntries, ...propertyEntries]

  let polishAvailable = false
  try {
    const [englishEnabled, polishEnabled] = await Promise.all([
      pamaWebsiteEnEnabled(),
      pamaWebsitePlEnabled(),
    ])
    polishAvailable = normalizeAvailability({ englishEnabled, polishEnabled }).polishEnabled
  } catch {
    return [...staticEntries, ...propertyEntries]
  }
  if (!polishAvailable) return [...staticEntries, ...propertyEntries]

  const translatedRoutes = routes.filter((route) => route !== "/privacy")
  const translatedRouteSet = new Set<string>(translatedRoutes)

  const staticPolishEntries: MetadataRoute.Sitemap = translatedRoutes.map((route) => ({
    url: `${baseUrl}/pl${route}`,
    changeFrequency: route === "" || route === "/properties" ? "weekly" : "monthly",
    priority: route === "" ? 0.9 : 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}${route || "/"}`,
        pl: `${baseUrl}/pl${route}`,
      },
    },
  }))

  const staticEnglishEntries = staticEntries.map((entry, index) => {
    const route = routes[index]
    if (!translatedRouteSet.has(route)) return entry
    return {
      ...entry,
      alternates: {
        languages: { en: entry.url, pl: `${baseUrl}/pl${route}` },
      },
    }
  })

  const eligibleProperties = properties.filter((property) =>
    publicationSafePolishCopy(property, approvedPolishCopyFor(property)).reviewed
  )
  const eligibleSlugs = new Set(eligibleProperties.map((property) => property.slug))

  const englishPropertyEntries = propertyEntries.map((entry, index) => {
    if (!eligibleSlugs.has(properties[index].slug)) return entry
    return {
      ...entry,
      alternates: {
        languages: { en: entry.url, pl: `${baseUrl}/pl/properties/${properties[index].slug}` },
      },
    }
  })
  const polishPropertyEntries: MetadataRoute.Sitemap = eligibleProperties.map((property) => ({
    url: `${baseUrl}/pl/properties/${property.slug}`,
    lastModified: property.updatedAt,
    changeFrequency: "daily",
    priority: 0.75,
    alternates: {
      languages: {
        en: `${baseUrl}/properties/${property.slug}`,
        pl: `${baseUrl}/pl/properties/${property.slug}`,
      },
    },
  }))

  // The PL legal privacy notice remains noindex and absent from this sitemap.
  return [...staticEnglishEntries, ...englishPropertyEntries, ...staticPolishEntries, ...polishPropertyEntries]
}
