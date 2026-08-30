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
  "/opportunities",
  "/palm-jumeirah-apartments-for-sale",
  "/palm-jumeirah-villas-for-sale",
  "/privacy",
  "/property-review",
  "/sell-with-us",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" || route === "/opportunities" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/areas" ||
            route === "/luxury-property-dubai" ||
            route === "/opportunities" ||
            route === "/property-review"
          ? 0.9
          : route === "/privacy"
            ? 0.4
            : 0.8,
  }))
}
