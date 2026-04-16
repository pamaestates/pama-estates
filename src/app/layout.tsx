import "./globals.css"
import type { Metadata } from "next"
import SiteHeader from "@/components/SiteHeader"
import SiteFooter from "@/components/SiteFooter"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

export const metadata: Metadata = {
  title: "PAMA Estates",
  description: "Ultra-Prime & Off-Market Real Estate Advisory in Dubai",
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