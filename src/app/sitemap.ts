import type { MetadataRoute } from "next"
import { getPublishedProperties } from "@/lib/public-properties"

const baseUrl = "https://pamaestates.com"

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

  return [...staticEntries, ...propertyEntries]
}
