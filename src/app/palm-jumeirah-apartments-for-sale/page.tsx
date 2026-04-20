import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Palm Jumeirah Apartments for Sale | Luxury Dubai Waterfront Homes | PAMA Estates",
  description:
    "Explore Palm Jumeirah apartments for sale, including luxury waterfront residences, branded homes, and high-end investment opportunities with PAMA Estates.",
}

export default function PalmJumeirahApartmentsForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Palm Jumeirah
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Palm Jumeirah Apartments for Sale
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Palm Jumeirah apartments for sale remain among the most desirable
            luxury residences in Dubai, offering waterfront living, iconic
            skyline and sea views, premium amenities, and strong long-term
            lifestyle appeal. From branded residences to large-format seafront
            apartments and penthouses, the island continues to attract buyers
            looking for prestige, privacy, and world-class coastal living.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Palm%20Jumeirah%20apartments%20for%20sale."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 transition hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Waterfront</p>
              <p className="mt-2 text-sm text-gray-400">
                Direct access to one of Dubai&apos;s top coastal addresses
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Branded</p>
              <p className="mt-2 text-sm text-gray-400">
                Premium residences with elevated service and design
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Luxury Living</p>
              <p className="mt-2 text-sm text-gray-400">
                Lifestyle-led homes with strong prestige value
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Global Demand</p>
              <p className="mt-2 text-sm text-gray-400">
                Highly sought after by local and international buyers
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why Buyers Search Here
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Why Palm Jumeirah Apartments Continue to Attract Premium Demand
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for Palm Jumeirah apartments for sale are often
              looking for a rare mix of waterfront prestige, privacy, world-class
              amenities, and stronger lifestyle positioning than typical urban
              apartment markets. Palm Jumeirah is not just a location — it is one
              of the most recognizable luxury residential destinations in Dubai.
            </p>

            <p>
              This makes it attractive both for end users seeking premium coastal
              living and for investors who want to hold assets in one of the
              city&apos;s most prestigious and globally visible addresses.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Property Categories
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Types of Apartments Available on Palm Jumeirah
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Palm Jumeirah apartments for sale typically compare
              branded residences, larger seafront apartments, penthouses, and
              design-led luxury developments depending on their objective,
              lifestyle preferences, and investment strategy.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Branded Residences</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Homes offering premium hospitality-style services, elevated
                branding, and stronger luxury appeal.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Luxury Apartments</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                High-end residences with sea views, quality finishes, and
                strong owner-occupier appeal.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Penthouses</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Larger-format homes for buyers seeking exclusivity, private
                terraces, and ultra-premium positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">
              Investment Perspective
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Palm Jumeirah apartments are often acquired as long-term lifestyle
              assets, but they also benefit from strong prestige value, limited
              premium waterfront supply, and continued international buyer
              interest. The best-performing opportunities are usually selected
              based on building quality, view, layout efficiency, and long-term
              relevance within the island&apos;s luxury market.
            </p>

            <p>
              For investors and end users alike, Palm Jumeirah remains one of
              the clearest examples of where location identity itself adds
              material value to residential real estate.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Advisory Advantage
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Not All Palm Jumeirah Apartments Offer the Same Value
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              In this market, value is heavily influenced by project quality,
              exact position on the island, service standards, view corridor,
              layout efficiency, and branding. Two apartments with similar sizes
              can perform very differently depending on those factors.
            </p>

            <p>
              PAMA Estates helps buyers assess Palm Jumeirah apartments for sale
              with more precision — identifying residences that offer stronger
              lifestyle quality, better investment logic, or more exclusive
              buying opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Related Pages
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Explore More Palm Jumeirah and Dubai Luxury Property Opportunities
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/palm-jumeirah-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Palm Jumeirah Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore beachfront trophy homes and high-value villa
                opportunities on the island.
              </p>
            </Link>

            <Link
              href="/off-market-properties-dubai"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Off-Market Properties Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Access discreet opportunities and private listings beyond public
                portals.
              </p>
            </Link>

            <Link
              href="/areas/palm-jumeirah"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Palm Jumeirah Area Guide</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Learn more about the island, lifestyle profile, and market
                positioning.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Next Step
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Looking for Palm Jumeirah Apartments for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for access to available apartments,
            branded residences, penthouses, and strategic buying guidance on
            Palm Jumeirah.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Palm%20Jumeirah%20apartments%20for%20sale."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 transition hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}