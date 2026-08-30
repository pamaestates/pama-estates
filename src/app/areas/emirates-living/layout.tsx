import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Emirates Living Real Estate Guide | Villas in Dubai | PAMA Estates",
  description:
    "Explore Emirates Living, including Emirates Hills, Meadows, The Lakes and The Springs, with strategic villa-market guidance from PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/emirates-living" },
  openGraph: {
    title: "Emirates Living Real Estate Guide | PAMA Estates",
    description:
      "Strategic guidance across Emirates Hills, Meadows, The Lakes and The Springs villa communities in Dubai.",
    url: "https://pamaestates.com/areas/emirates-living",
    type: "website",
  },
}

export default function EmiratesLivingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
