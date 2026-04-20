import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Palm Jumeirah Villas for Sale | Luxury Dubai Real Estate | PAMA Estates",
  description:
    "Explore Palm Jumeirah villas for sale, including luxury beachfront homes and off-market opportunities. Expert guidance from PAMA Estates.",
}

export default function PalmJumeirahVillasForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/75" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Palm Jumeirah
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Palm Jumeirah Villas for Sale
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Palm Jumeirah villas for sale represent some of the most desirable
              residential real estate in Dubai. From beachfront villas and
              signature homes to custom-built ultra-prime residences, the island
              continues to attract buyers seeking privacy, prestige, lifestyle,
              and long-term asset value.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#private-access"
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Access
              </a>

              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Palm%20Jumeirah%20villas%20for%20sale."
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
              <p className="text-2xl font-semibold">Beachfront</p>
              <p className="mt-2 text-sm text-gray-400">
                Trophy villas with direct sea access
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Ultra-Prime</p>
              <p className="mt-2 text-sm text-gray-400">
                One of Dubai&apos;s top luxury villa markets
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Global Demand</p>
              <p className="mt-2 text-sm text-gray-400">
                Sought after by international buyers
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Off-Market</p>
              <p className="mt-2 text-sm text-gray-400">
                Some of the best opportunities are not public
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
              Why Palm Jumeirah Villas Continue to Command Premium Demand
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Palm Jumeirah is one of the most prestigious waterfront
              destinations in Dubai, offering luxury villas, beachfront homes,
              and ultra-prime residences. Buyers searching for Palm Jumeirah
              villas for sale are typically looking for exclusivity, privacy,
              exceptional views, and long-term lifestyle value.
            </p>

            <p>
              The island combines rare waterfront supply with global brand
              recognition. That combination supports strong buyer demand and
              keeps Palm Jumeirah among the most important villa markets in the
              city.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Villa Categories
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Types of Villas Available on Palm Jumeirah
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Palm Jumeirah villas for sale usually compare
              original-condition homes, renovated villas, and custom-built
              luxury residences depending on their lifestyle goals, budget, and
              time horizon.
            </p>
            <div className="mt-8">
  <Link
    href="/luxury-property-dubai"
    className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
  >
    Explore Luxury Property Dubai →
  </Link>
</div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Signature Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Established beachfront villas with strong demand, private beach
                access, and renovation or upgrade potential.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Renovated Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Turnkey homes appealing to buyers who want immediate luxury
                occupancy without construction timelines.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Custom-Built Mansions</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Ultra-prime homes with premium finishes, larger built-up areas,
                and stronger positioning on the luxury end of the market.
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
              Palm Jumeirah villas are not only lifestyle assets. They are also
              viewed as long-term wealth preservation opportunities due to
              limited beachfront land, international demand, and strong status
              value within Dubai&apos;s prime residential sector.
            </p>

            <p>
              For many buyers, entering this market is about both prestige and
              strategic ownership. The best opportunities are often identified
              through timing, direct relationships, and access beyond public
              listings.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Off-Market Advantage
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Some of the Best Palm Jumeirah Villas Are Never Publicly Listed
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Many of the most compelling Palm Jumeirah villas for sale are not
              broadly marketed. Owners of premium beachfront assets often prefer
              discreet exposure, especially for higher-value homes and private
              negotiations.
            </p>

            <p>
              PAMA Estates focuses on strategic sourcing, direct owner access,
              and selective buyer matching for clients seeking stronger
              opportunities than those typically visible on public portals.
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
              Explore More Palm Jumeirah and Dubai Luxury Property Insights
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/areas/palm-jumeirah"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Palm Jumeirah Area Guide</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore the broader Palm Jumeirah market, residential profile,
                and investment positioning.
              </p>
            </Link>

            <Link
              href="/areas"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Best Areas in Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Compare Palm Jumeirah with Dubai Marina, Emirates Living, and
                other key prime communities.
              </p>
            </Link>

            <Link
              href="/sell-with-us"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Sell Your Palm Property</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Advisory for owners considering sale, discreet exposure, or
                premium buyer targeting.
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
            Looking for Palm Jumeirah Villas for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for direct access to available villas,
            private opportunities, and strategic guidance on buying on Palm
            Jumeirah.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Palm%20Jumeirah%20villas%20for%20sale."
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