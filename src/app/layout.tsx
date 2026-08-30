import "./globals.css"
import type { Metadata } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://pamaestates.com"),
  title: "PAMA Estates | Private Dubai Real Estate Advisory",
  description:
    "Private Dubai real estate advisory for prime, ultra-prime, off-market and investment opportunities, with discreet buyer and owner representation.",
  applicationName: "PAMA Estates",
  category: "real estate",
  alternates: { canonical: "https://pamaestates.com" },
  openGraph: {
    type: "website",
    url: "https://pamaestates.com",
    siteName: "PAMA Estates",
    title: "PAMA Estates | Private Dubai Real Estate Advisory",
    description:
      "Private Dubai real estate advisory for prime, ultra-prime and selected off-market opportunities.",
    images: [{ url: "/logo.png", alt: "PAMA Estates" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAMA Estates | Private Dubai Real Estate Advisory",
    description:
      "Prime, ultra-prime and selected off-market Dubai real estate advisory.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "PAMA Estates",
  url: "https://pamaestates.com",
  logo: "https://pamaestates.com/logo.png",
  telephone: "+971559003888",
  email: "info@pamaestates.com",
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
      <body className={`${bodyFont.variable} ${displayFont.variable} bg-[#090C12] text-[#F5F2EA] antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
