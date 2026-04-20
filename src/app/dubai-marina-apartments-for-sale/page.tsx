import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dubai Marina Apartments for Sale | Waterfront Dubai Property | PAMA Estates",
  description:
    "Explore Dubai Marina apartments for sale, including waterfront residences, high-rise luxury homes, and investment opportunities with PAMA Estates.",
}

export default function DubaiMarinaApartmentsForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Dubai Marina
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Dubai Marina Apartments for Sale
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Dubai Marina apartments for sale remain among the most searched and
              most actively traded residential assets in Dubai. The area
              combines waterfront skyline living, strong rental demand,
              international buyer interest, and a broad range of apartment
              options from entry-level investment units to luxury high-floor
              residences.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#private-access"
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Access
              </a>

              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Dubai%20Marina%20apartments%20for%20sale."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 transition hover:bg-white hover:text-black"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Waterfront</p>
              <p className="mt-2 text-sm text-gray-400">
                Marina skyline and sea view residences
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Liquidity</p>
              <p className="mt-2 text-sm text-gray-400">
                One of Dubai&apos;s most active residential markets
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Rental Demand</p>
              <p className="mt-2 text-sm text-gray-400">
                Strong tenant appeal across multiple price points
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Global Appeal</p>
              <p className="mt-2 text-sm text-gray-400">
                Highly visible to both local and overseas buyers
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why This Area Gets Searched
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Why Dubai Marina Apartments Continue to Attract Buyers
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Dubai Marina is one of Dubai&apos;s most dynamic residential
              districts, offering waterfront apartments, high-rise living,
              walkable lifestyle infrastructure, and one of the most active
              apartment markets in the city. Buyers searching for Dubai Marina
              apartments for sale are often looking for a combination of
              lifestyle, rental income potential, and long-term resale
              flexibility.
            </p>

            <p>
              The area appeals to investors, professionals, and international
              buyers due to its strong visibility, tenant demand, and broad
              inventory range across both premium and more accessible segments.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Apartment Categories
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Types of Apartments Available in Dubai Marina
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Dubai Marina apartments for sale typically compare
              building quality, view type, floor level, layout efficiency,
              service charges, and investment performance depending on whether
              the goal is lifestyle or yield.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Investment Apartments</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Units selected for rental demand, liquidity, and stronger
                investor logic rather than purely view-driven premium pricing.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Lifestyle Residences</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Apartments purchased for end use, convenience, marina views, and
                urban waterfront living.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Luxury High-Floor Units</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Premium residences with stronger positioning, better views, and
                higher appeal at the upper end of the market.
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
              Dubai Marina apartments remain highly relevant for investors due to
              strong tenant demand, market familiarity, and more active resale
              liquidity compared to lower-volume villa communities. For many
              buyers, this market offers a practical balance of rental income
              and resale flexibility.
            </p>

            <p>
              The strongest opportunities are often identified by filtering the
              right buildings, layouts, service charges, and positioning rather
              than simply choosing by headline price.
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
              Not All Dubai Marina Buildings Perform the Same
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              In Dubai Marina, the difference between average and strong
              performance often comes down to developer quality, building
              maintenance, view corridor, service charges, and layout
              usability. These factors influence both tenant interest and resale
              value.
            </p>

            <p>
              PAMA Estates helps buyers identify the right apartment options
              based on objective — whether that means lifestyle, yield,
              long-term hold, or a more selective opportunity within a crowded
              public market.
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
              Explore More Dubai Marina and Prime Dubai Property Insights
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/areas/dubai-marina"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Dubai Marina Area Guide</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Understand the broader Dubai Marina residential market,
                lifestyle, and investment profile.
              </p>
            </Link>

            <Link
              href="/areas"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Best Areas in Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Compare Dubai Marina with Palm Jumeirah, Emirates Living, and
                other top communities.
              </p>
            </Link>

            <Link
              href="/sell-with-us"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Sell Your Marina Property</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Strategic advisory for owners considering sale, leasing, or
                targeted buyer exposure.
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
            Looking for Dubai Marina Apartments for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for direct access to available apartments,
            selected opportunities, and strategic buying guidance in Dubai
            Marina.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Dubai%20Marina%20apartments%20for%20sale."
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