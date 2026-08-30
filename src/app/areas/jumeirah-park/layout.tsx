import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jumeirah Park Real Estate Guide | Family Villas Dubai | PAMA Estates",
  description:
    "Explore Jumeirah Park villas, family living, renovation potential and buyer demand with strategic guidance from PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/jumeirah-park" },
  openGraph: {
    title: "Jumeirah Park Real Estate Guide | PAMA Estates",
    description: "Jumeirah Park villa guidance covering family living, renovation potential and market demand.",
    url: "https://pamaestates.com/areas/jumeirah-park",
    type: "website",
  },
}

export default function JumeirahParkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
