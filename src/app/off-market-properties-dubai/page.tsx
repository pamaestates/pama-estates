import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Off-Market Properties Dubai | Private Luxury Listings | PAMA Estates",
  description:
    "Access off-market properties in Dubai including luxury villas, penthouses, and private listings not publicly advertised. Work with PAMA Estates.",
}

export default function OffMarketPropertiesDubaiPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      
      {/* HERO */}
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Private Market
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-semibold">
            Off-Market Properties Dubai
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-gray-300">
            Off-market properties in Dubai represent some of the most valuable and
            exclusive real estate opportunities in the market. These listings are
            not publicly advertised and are typically accessed through direct
            relationships, private networks, and trusted advisors.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/#private-access"
              className="bg-[#D4AF37] text-black px-8 py-4 rounded-md font-semibold hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20off-market%20properties%20in%20Dubai."
              target="_blank"
              className="border border-white/20 px-8 py-4 rounded-md hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WHY OFF MARKET */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:px-10 grid lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold">
              Why Off-Market Properties Matter
            </h2>
          </div>

          <div className="space-y-6 text-lg text-gray-300">
            <p>
              Many of the most desirable properties in Dubai never reach public
              portals. Owners of premium villas, penthouses, and large assets
              often prefer discretion and controlled exposure.
            </p>

            <p>
              Buyers searching for off-market properties in Dubai are typically
              looking for better positioning, less competition, and access to
              opportunities not visible to the general market.
            </p>
          </div>

        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:px-10 grid md:grid-cols-3 gap-6">

          <div className="border border-white/10 p-8">
            <h3 className="text-xl font-semibold">Less Competition</h3>
            <p className="text-gray-400 mt-3">
              Fewer buyers see the opportunity, allowing for stronger positioning.
            </p>
          </div>

          <div className="border border-white/10 p-8">
            <h3 className="text-xl font-semibold">Better Deals</h3>
            <p className="text-gray-400 mt-3">
              Some owners are more flexible when selling privately.
            </p>
          </div>

          <div className="border border-white/10 p-8">
            <h3 className="text-xl font-semibold">Privacy</h3>
            <p className="text-gray-400 mt-3">
              Transactions handled discreetly without public exposure.
            </p>
          </div>

        </div>
      </section>

      {/* TYPES */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="max-w-7xl mx-auto px-6 py-24 md:px-10">
          
          <h2 className="text-4xl md:text-5xl font-semibold mb-10">
            Types of Off-Market Properties in Dubai
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="border border-white/10 p-6">
              <h3 className="font-semibold">Luxury Villas</h3>
            </div>

            <div className="border border-white/10 p-6">
              <h3 className="font-semibold">Penthouses</h3>
            </div>

            <div className="border border-white/10 p-6">
              <h3 className="font-semibold">Plots</h3>
            </div>

            <div className="border border-white/10 p-6">
              <h3 className="font-semibold">Entire Buildings</h3>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#0F131B] text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">

          <h2 className="text-4xl md:text-5xl font-semibold">
            Access Off-Market Opportunities
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Contact PAMA Estates to access private listings and discreet
            opportunities not available on the open market.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#private-access"
              className="bg-[#D4AF37] text-black px-8 py-4 rounded-md font-semibold"
            >
              Request Access
            </a>

            <a
              href="https://wa.me/971559003888"
              target="_blank"
              className="border border-white/20 px-8 py-4 rounded-md"
            >
              WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">

          <Link href="/palm-jumeirah-villas-for-sale" className="border p-6 border-white/10 hover:border-[#D4AF37]">
            Palm Jumeirah Villas
          </Link>

          <Link href="/dubai-marina-apartments-for-sale" className="border p-6 border-white/10 hover:border-[#D4AF37]">
            Dubai Marina Apartments
          </Link>

          <Link href="/emirates-hills-villas-for-sale" className="border p-6 border-white/10 hover:border-[#D4AF37]">
            Emirates Hills Villas
          </Link>

        </div>
      </section>

    </main>
  )
}