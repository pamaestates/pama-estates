import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Palm Jumeirah Real Estate Guide | Villas & Penthouses | PAMA Estates",
  description:
    "Explore Palm Jumeirah villas, penthouses, branded residences and private opportunities with PAMA Estates.",
  alternates: { canonical: "https://pamaestates.com/areas/palm-jumeirah" },
  openGraph: {
    title: "Palm Jumeirah Real Estate Guide | PAMA Estates",
    description: "Palm Jumeirah guidance covering villas, penthouses, branded residences and private opportunities.",
    url: "https://pamaestates.com/areas/palm-jumeirah",
    type: "website",
  },
}

export default function PalmJumeirahLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
