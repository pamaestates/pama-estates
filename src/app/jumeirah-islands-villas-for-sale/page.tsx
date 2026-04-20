import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Jumeirah Islands Villas for Sale | Luxury Dubai Villas | PAMA Estates",
  description:
    "Explore Jumeirah Islands villas for sale, including premium homes with large plots, lake views, and strong end-user appeal in Dubai.",
}

export default function JumeirahIslandsVillasForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Jumeirah Islands
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Jumeirah Islands Villas for Sale
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Jumeirah Islands villas for sale attract buyers seeking privacy,
            larger plots, lake views, and a more premium low-density villa
            lifestyle in Dubai. The community remains one of the most desirable
            established villa addresses for end users and long-term buyers who
            value space, calm surroundings, and stronger residential quality.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Jumeirah%20Islands%20villas%20for%20sale."
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
              <p className="text-2xl font-semibold">Large Plots</p>
              <p className="mt-2 text-sm text-gray-400">
                More land, privacy, and residential presence
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Lake Views</p>
              <p className="mt-2 text-sm text-gray-400">
                Premium outlooks in a calm low-density environment
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Established</p>
              <p className="mt-2 text-sm text-gray-400">
                Mature villa community with proven long-term appeal
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">End-User Demand</p>
              <p className="mt-2 text-sm text-gray-400">
                Strong appeal for buyers prioritizing lifestyle quality
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
              Why Jumeirah Islands Villas Continue to Appeal to Premium Buyers
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for Jumeirah Islands villas for sale are usually
              looking for a balance of privacy, larger plot sizes, premium
              community feel, and a location that remains close to Dubai&apos;s
              main lifestyle and business zones.
            </p>

            <p>
              Compared to more compact villa communities, Jumeirah Islands
              offers a stronger sense of space and a more calm residential
              environment. That makes it especially attractive to long-term end
              users and buyers who value plot quality as much as the villa
              itself.
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
              Types of Villas Available in Jumeirah Islands
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Jumeirah Islands villas for sale often compare
              original-condition homes, renovated villas, and properties with
              stronger lake exposure, privacy, or transformation potential.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Original Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Homes appealing to buyers who want stronger entry value and the
                flexibility to upgrade or renovate over time.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Renovated Homes</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Updated villas with more immediate lifestyle appeal for buyers
                seeking turnkey occupancy.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Lake-Facing Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Premium homes with stronger outlook, privacy, and residential
                positioning within the community.
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
              Jumeirah Islands villas are often acquired for lifestyle first,
              but they also hold strong long-term value due to limited low-density
              supply, larger plots, and continued buyer preference for premium
              villa communities in established locations.
            </p>

            <p>
              The best opportunities are often found by identifying stronger
              plot positions, renovation upside, and homes that offer a better
              balance of land value, privacy, and pricing.
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
              In Jumeirah Islands, Plot and Position Matter as Much as the Villa
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              In this market, true value is shaped by more than built-up area.
              Plot size, exact cluster position, lake view, privacy, and
              renovation quality all influence both buyer appeal and long-term
              performance.
            </p>

            <p>
              PAMA Estates helps clients assess Jumeirah Islands villas for sale
              with a more strategic lens — filtering for stronger opportunities
              rather than simply comparing headline prices.
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
              Explore More Premium Dubai Villa Opportunities
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              href="/luxury-villas-dubai"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Luxury Villas Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Explore broader villa opportunities across Dubai&apos;s prime
                residential communities.
              </p>
            </Link>

            <Link
              href="/off-market-properties-dubai"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Off-Market Properties Dubai</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Access discreet opportunities and private villa listings beyond
                public portals.
              </p>
            </Link>

            <Link
              href="/areas/jumeirah-islands"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Jumeirah Islands Area Guide</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Learn more about the community, residential profile, and market
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
            Looking for Jumeirah Islands Villas for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for access to available villas, selected
            premium opportunities, and strategic guidance within Jumeirah
            Islands.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Jumeirah%20Islands%20villas%20for%20sale."
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