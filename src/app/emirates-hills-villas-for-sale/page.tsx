import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Emirates Hills Villas for Sale | Ultra-Luxury Dubai Real Estate | PAMA Estates",
  description:
    "Explore Emirates Hills villas for sale, including custom-built mansions, golf-course homes, and ultra-prime Dubai properties with PAMA Estates.",
}

export default function EmiratesHillsVillasForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Emirates Hills
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Emirates Hills Villas for Sale
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Emirates Hills villas for sale represent the highest tier of
              villa ownership in Dubai. Known for custom-built mansions, golf
              course views, large plots, and exceptional privacy, the community
              remains one of the city&apos;s most prestigious residential
              addresses for ultra-high-net-worth buyers.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#private-access"
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Access
              </a>

              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Emirates%20Hills%20villas%20for%20sale."
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
              <p className="text-2xl font-semibold">Ultra-Prime</p>
              <p className="mt-2 text-sm text-gray-400">
                One of Dubai&apos;s most prestigious villa addresses
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Custom-Built</p>
              <p className="mt-2 text-sm text-gray-400">
                Bespoke mansions with unique architecture
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Large Plots</p>
              <p className="mt-2 text-sm text-gray-400">
                Expansive land and stronger long-term scarcity
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Golf Course</p>
              <p className="mt-2 text-sm text-gray-400">
                Premium positioning with landscaped views
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why This Market Matters
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Why Emirates Hills Villas Continue to Command Exceptional Demand
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Emirates Hills is often regarded as Dubai&apos;s most exclusive
              villa community, attracting buyers who prioritize privacy,
              prestige, architectural distinction, and long-term status value.
              Buyers searching for Emirates Hills villas for sale are usually
              looking for custom-built homes with larger plots and a much more
              private residential environment than most other communities offer.
            </p>

            <p>
              The combination of scarcity, golf course positioning, custom-built
              inventory, and strong brand recognition supports Emirates Hills as
              one of the most important ultra-prime villa markets in Dubai.
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
              Types of Villas Available in Emirates Hills
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Emirates Hills villas for sale typically compare
              custom-built mansions, fully renovated modern homes, and older
              villas with redevelopment or repositioning potential depending on
              their long-term objective.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Custom-Built Mansions</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Bespoke homes offering architectural individuality, larger built
                up areas, and stronger ultra-prime positioning.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Renovated Luxury Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Upgraded properties appealing to buyers seeking immediate
                occupancy with modernized finishes and improved layouts.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Redevelopment Plays</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Older homes and larger plots offering long-term potential
                through major renovation or full reconstruction.
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
              Emirates Hills villas are acquired primarily as lifestyle and
              long-term wealth preservation assets rather than yield-focused
              investments. The community&apos;s prestige, plot scarcity, and
              ultra-prime reputation support strong resilience over time.
            </p>

            <p>
              For many buyers, ownership in Emirates Hills is about securing one
              of Dubai&apos;s most important residential addresses — where land,
              privacy, and custom-built quality carry exceptional weight.
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
              In Emirates Hills, Plot Quality and Positioning Matter as Much as
              the Villa
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              In this market, value is shaped not only by built-up area and
              finish quality, but also by plot orientation, golf course
              exposure, privacy, street position, land size, and long-term
              redevelopment potential.
            </p>

            <p>
              PAMA Estates helps buyers assess Emirates Hills villas for sale
              with a more strategic lens — focusing on true value, property
              positioning, and select opportunities that may not be visible
              through public channels alone.
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
              Explore More Emirates Hills and Prime Dubai Property Insights
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/areas/emirates-living"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Emirates Living Area Guide</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore the wider Emirates Living villa ecosystem including
                Emirates Hills, Meadows, The Lakes, and The Springs.
              </p>
            </Link>

            <Link
              href="/areas"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Best Areas in Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Compare Emirates Hills with Palm Jumeirah, Jumeirah Islands, and
                other prime Dubai communities.
              </p>
            </Link>

            <Link
              href="/sell-with-us"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Sell Your Emirates Hills Villa</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Strategic advisory for owners considering premium exposure,
                discreet sale, or high-value buyer targeting.
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
            Looking for Emirates Hills Villas for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for direct access to available mansions,
            private opportunities, and strategic buying guidance in Emirates
            Hills.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Emirates%20Hills%20villas%20for%20sale."
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