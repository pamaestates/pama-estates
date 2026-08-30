import type { MetadataRoute } from "next"

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
  "/palm-jumeirah-apartments-for-sale",
  "/palm-jumeirah-villas-for-sale",
  "/property-review",
  "/sell-with-us",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/areas" || route === "/luxury-property-dubai" || route === "/property-review"
          ? 0.9
          : 0.8,
  }))
}
