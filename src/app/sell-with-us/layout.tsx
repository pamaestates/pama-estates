import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell or Rent Luxury Property in Dubai",
  description:
    "Strategic representation for Dubai property owners seeking to sell or rent villas, apartments, penthouses, plots and high-value assets with discretion.",
  alternates: { canonical: "https://pamaestates.com/sell-with-us" },
  openGraph: {
    title: "Sell or Rent Luxury Property in Dubai | PAMA Estates",
    description: "Discreet, strategic representation for owners selling or renting high-value Dubai property.",
    url: "https://pamaestates.com/sell-with-us",
    type: "website",
  },
}

export default function SellWithUsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
