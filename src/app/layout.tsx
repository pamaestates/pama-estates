import "./globals.css"
import type { Metadata } from "next"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export const metadata = {
  title: "Luxury Real Estate Dubai | Palm Jumeirah Villas & Off-Market Properties | PAMA Estates",
  description:
    "PAMA Estates specializes in luxury real estate in Dubai, including Palm Jumeirah villas, off-market properties, penthouses, and prime investment opportunities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0B0E15] text-white antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}