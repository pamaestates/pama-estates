import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Luxury Villas Dubai | Prime & Ultra-Luxury Homes | PAMA Estates",
  description:
    "Explore luxury villas in Dubai, including Palm Jumeirah, Emirates Hills, Jumeirah Islands, and other prime communities with PAMA Estates.",
}

export default function LuxuryVillasDubaiPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Dubai Luxury Market
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Luxury Villas Dubai
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Luxury villas in Dubai continue to attract high-net-worth buyers
            seeking privacy, premium design, lifestyle quality, and long-term
            ownership in one of the world&apos;s most dynamic residential markets.
            From waterfront villas and golf-course mansions to family compounds
            and off-market homes, Dubai offers one of the broadest selections of
            prime residential stock in the region.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20luxury%20villas%20in%20Dubai."
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
                Beachfront villas in globally recognized locations
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Ultra-Prime</p>
              <p className="mt-2 text-sm text-gray-400">
                Mansions, private compounds, and trophy homes
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Family Living</p>
              <p className="mt-2 text-sm text-gray-400">
                Mature villa communities with long-term demand
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Off-Market</p>
              <p className="mt-2 text-sm text-gray-400">
                Private opportunities beyond public portals
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why Dubai
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Why Luxury Villas in Dubai Continue to Attract Global Buyers
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for luxury villas in Dubai are typically looking
              for more than just square footage. They are looking for privacy,
              location quality, architectural appeal, secure ownership, and
              strong global lifestyle positioning.
            </p>

            <p>
              Dubai offers all of this across several prime villa communities,
              each with its own identity — from beachfront trophy homes on Palm
              Jumeirah to golf course mansions in Emirates Hills and premium
              low-density villa neighborhoods across the city.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Prime Villa Locations
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Where Buyers Search for Luxury Villas in Dubai
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              The right location depends on the objective. Some buyers prioritize
              prestige and waterfront exposure, while others value larger plots,
              golf-course views, mature family living, or stronger off-market
              access.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/palm-jumeirah-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Palm Jumeirah</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Beachfront villas, branded luxury, and globally recognized
                waterfront prestige.
              </p>
            </Link>

            <Link
              href="/emirates-hills-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Emirates Hills</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Custom-built mansions, golf course views, and ultra-prime land
                value.
              </p>
            </Link>

            <Link
              href="/areas/jumeirah-islands"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Jumeirah Islands</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Premium villa lifestyle with larger plots, privacy, and lake
                views.
              </p>
            </Link>

            <Link
              href="/areas/jumeirah-park"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Jumeirah Park</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Family villas with strong demand, practical layouts, and
                renovation potential.
              </p>
            </Link>
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
              Luxury villas in Dubai are often acquired as long-term ownership
              assets rather than purely yield-driven investments. Buyers value
              land scarcity, location prestige, architectural distinction, and
              the city&apos;s growing profile as a global wealth destination.
            </p>

            <p>
              The strongest opportunities are often identified not only through
              public listings, but also through strategic sourcing, direct
              owner conversations, and understanding which communities align
              best with the buyer&apos;s objective.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Private Opportunities
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Many Luxury Villas in Dubai Are Quietly Traded
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Owners of premium villas often prefer controlled, discreet
              exposure instead of broad public advertising. This is especially
              true for higher-value properties and buyers who want more privacy
              in the negotiation process.
            </p>

            <p>
              PAMA Estates focuses on identifying luxury villas in Dubai through
              both public and off-market channels, helping clients access more
              relevant opportunities with less noise and stronger positioning.
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
              Explore More Dubai Luxury Property Opportunities
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/off-market-properties-dubai"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Off-Market Properties Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Access private listings, discreet opportunities, and selective
                high-value assets.
              </p>
            </Link>

            <Link
              href="/palm-jumeirah-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Palm Jumeirah Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore beachfront trophy homes and luxury waterfront villas.
              </p>
            </Link>

            <Link
              href="/emirates-hills-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Emirates Hills Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                View ultra-prime mansions and custom-built golf course homes.
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
            Looking for Luxury Villas in Dubai?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for private access to available villas,
            off-market opportunities, and strategic guidance across Dubai&apos;s
            prime villa communities.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20luxury%20villas%20in%20Dubai."
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