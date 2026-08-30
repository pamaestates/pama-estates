import "./globals.css"
import type { Metadata } from "next"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export const metadata: Metadata = {
  metadataBase: new URL("https://pamaestates.com"),
  title: "Luxury Real Estate Dubai | Palm Jumeirah Villas & Off-Market Properties | PAMA Estates",
  description:
    "PAMA Estates specializes in luxury real estate in Dubai, including Palm Jumeirah villas, off-market properties, penthouses, and prime investment opportunities.",
  openGraph: {
    type: "website",
    url: "https://pamaestates.com",
    siteName: "PAMA Estates",
    title: "Luxury Real Estate Dubai | PAMA Estates",
    description:
      "Private Dubai real estate advisory for prime, ultra-prime and selected off-market opportunities.",
  },
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "PAMA Estates",
  url: "https://pamaestates.com",
  logo: "https://pamaestates.com/logo.png",
  telephone: "+971559003888",
  description:
    "Private Dubai real estate advisory focused on prime, ultra-prime and selected off-market opportunities.",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0B0E15] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
