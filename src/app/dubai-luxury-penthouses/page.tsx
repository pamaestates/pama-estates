import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dubai Luxury Penthouses | Ultra-Prime Penthouses for Sale | PAMA Estates",
  description:
    "Explore Dubai luxury penthouses for sale, including ultra-prime waterfront and skyline residences in Palm Jumeirah, Dubai Marina, and beyond.",
}

export default function DubaiLuxuryPenthousesPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Ultra-Prime Dubai
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Dubai Luxury Penthouses
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Dubai luxury penthouses represent some of the most exclusive homes
            in the city, offering large-format living, panoramic views,
            exceptional privacy, and top-tier design. From waterfront residences
            to skyline-facing trophy assets, penthouses in Dubai attract buyers
            seeking prestige, space, and rare residential inventory.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Dubai%20luxury%20penthouses."
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
              <p className="text-2xl font-semibold">Large Format</p>
              <p className="mt-2 text-sm text-gray-400">
                More space, privacy, and statement living
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Iconic Views</p>
              <p className="mt-2 text-sm text-gray-400">
                Skyline, sea, marina, and Palm-facing outlooks
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Ultra-Prime</p>
              <p className="mt-2 text-sm text-gray-400">
                One of Dubai&apos;s most exclusive residential segments
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Rare Stock</p>
              <p className="mt-2 text-sm text-gray-400">
                Limited availability compared with standard apartments
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
              Why Dubai Luxury Penthouses Continue to Command Exceptional Demand
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for Dubai luxury penthouses are typically looking
              for more than premium finishes. They are searching for statement
              properties with scale, privacy, top-floor positioning, and
              architectural quality that cannot be replicated through standard
              apartment stock.
            </p>

            <p>
              Dubai&apos;s global profile, combined with branded developments,
              waterfront locations, and a strong pipeline of luxury
              residential towers, continues to support demand for penthouses
              across the city&apos;s prime districts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Prime Penthouse Locations
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Where Buyers Look for Luxury Penthouses in Dubai
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              The most desirable penthouses in Dubai are usually concentrated in
              waterfront, skyline, and branded residential locations where view,
              service level, and prestige all combine to create stronger
              long-term appeal.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/palm-jumeirah-apartments-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Palm Jumeirah</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Waterfront penthouses with branded luxury, sea views, and
                exceptional address value.
              </p>
            </Link>

            <Link
              href="/dubai-marina-apartments-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-2xl font-semibold">Dubai Marina</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                High-floor penthouses with skyline, marina, and sea outlooks in
                one of Dubai&apos;s most dynamic districts.
              </p>
            </Link>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Branded Towers</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Premium service-driven penthouse stock with stronger luxury
                branding and exclusivity.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Select Off-Market</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Some of the strongest penthouse opportunities are discussed
                privately rather than publicly listed.
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
              Dubai luxury penthouses are usually acquired as prestige and
              lifestyle assets first, but scarcity, uniqueness, and premium
              address value can also support strong long-term ownership logic.
              Unlike more standard units, penthouses often trade in a much more
              selective market driven by quality rather than volume.
            </p>

            <p>
              The best opportunities are typically identified by view quality,
              building positioning, terrace value, privacy, layout efficiency,
              and the rarity of the asset within its tower and district.
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
              In Penthouses, Uniqueness Matters More Than Broad Market Averages
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Penthouse values are less about generic price per square foot and
              more about individual asset quality. View line, privacy, building
              reputation, internal layout, outdoor space, and service standards
              all shape how the market values a property.
            </p>

            <p>
              PAMA Estates helps buyers evaluate Dubai luxury penthouses with a
              more selective and strategic lens — focusing on what truly makes a
              penthouse rare, desirable, and defensible over time.
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
              Explore More Dubai Ultra-Prime Property Opportunities
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/off-market-properties-dubai"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Off-Market Properties Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Access discreet opportunities and selective private listings
                beyond public portals.
              </p>
            </Link>

            <Link
              href="/palm-jumeirah-apartments-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Palm Jumeirah Apartments</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore waterfront branded residences and premium Palm
                apartments.
              </p>
            </Link>

            <Link
              href="/dubai-marina-apartments-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Dubai Marina Apartments</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Compare penthouse opportunities with high-floor Marina
                residences and skyline living.
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
            Looking for Dubai Luxury Penthouses?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for access to available penthouses,
            off-market opportunities, and strategic buying guidance across
            Dubai&apos;s prime luxury districts.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Dubai%20luxury%20penthouses."
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