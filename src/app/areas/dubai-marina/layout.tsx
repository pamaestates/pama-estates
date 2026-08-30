import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dubai Marina Real Estate Guide | Apartments & Investment | PAMA Estates",
  description:
    "Explore Dubai Marina real estate, apartments, penthouses, rental demand, liquidity and investment positioning with PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/dubai-marina" },
  openGraph: {
    title: "Dubai Marina Real Estate Guide | PAMA Estates",
    description:
      "Dubai Marina property guidance covering apartments, penthouses, rental demand, liquidity and investment positioning.",
    url: "https://pamaestates.com/areas/dubai-marina",
    type: "website",
  },
}

export default function DubaiMarinaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
