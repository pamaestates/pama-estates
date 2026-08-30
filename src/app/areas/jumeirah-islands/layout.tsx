import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jumeirah Islands Real Estate Guide | Villas in Dubai | PAMA Estates",
  description:
    "Explore Jumeirah Islands villas, lake views, large plots, privacy and investment positioning with PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/jumeirah-islands" },
  openGraph: {
    title: "Jumeirah Islands Real Estate Guide | PAMA Estates",
    description: "Jumeirah Islands villa guidance covering privacy, lake views, plots and market positioning.",
    url: "https://pamaestates.com/areas/jumeirah-islands",
    type: "website",
  },
}

export default function JumeirahIslandsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
