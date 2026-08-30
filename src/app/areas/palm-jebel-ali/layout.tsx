import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Palm Jebel Ali Real Estate Guide | Waterfront Villas Dubai | PAMA Estates",
  description:
    "Explore Palm Jebel Ali real estate, waterfront villas, long-term positioning and private opportunities with PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/palm-jebel-ali" },
  openGraph: {
    title: "Palm Jebel Ali Real Estate Guide | PAMA Estates",
    description: "Palm Jebel Ali property guidance covering waterfront villas, future positioning and private opportunities.",
    url: "https://pamaestates.com/areas/palm-jebel-ali",
    type: "website",
  },
}

export default function PalmJebelAliLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
