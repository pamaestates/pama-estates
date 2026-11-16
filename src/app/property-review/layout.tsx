import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dubai Property Review for Owners | PAMA Estates",
  description:
    "Request a confidential review of your Dubai property covering positioning, pricing context, likely buyer or tenant profile and route-to-market strategy.",
  alternates: { canonical: "https://www.pamaestates.com/property-review", languages: { en: "https://www.pamaestates.com/property-review", pl: "https://www.pamaestates.com/pl/property-review" } },
  openGraph: {
    title: "Dubai Property Review for Owners | PAMA Estates",
    description:
      "Confidential property review for Dubai owners considering a sale, rental or future strategy.",
    url: "https://www.pamaestates.com/property-review",
    type: "website",
  },
}

export default function PropertyReviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
