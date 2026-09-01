import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Selected Dubai Property Opportunities | PAMA Estates",
  description:
    "Explore a curated, publication-safe selection of Dubai property opportunities presented with verified context rather than listing volume.",
  alternates: { canonical: "https://pamaestates.com/opportunities" },
  openGraph: {
    title: "Selected Dubai Property Opportunities | PAMA Estates",
    description:
      "Curated Dubai real estate opportunities presented with verified public context and disciplined advisory framing.",
    url: "https://pamaestates.com/opportunities",
    type: "website",
  },
}

export default function OpportunitiesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
