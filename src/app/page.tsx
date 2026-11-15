import type { Metadata } from "next"
import HomePageClient from "@/components/HomePageClient"

// Metadata belongs to the homepage only; never inherit the root canonical on nested routes.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.pamaestates.com/",
    languages: {
      en: "https://www.pamaestates.com/",
      pl: "https://www.pamaestates.com/pl",
      "x-default": "https://www.pamaestates.com/",
    },
  },
}

export default function HomePage() {
  return <HomePageClient />
}
