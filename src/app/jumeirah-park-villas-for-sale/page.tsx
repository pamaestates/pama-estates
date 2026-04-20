import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Jumeirah Park Villas for Sale | Family Villas Dubai | PAMA Estates",
  description:
    "Explore Jumeirah Park villas for sale, including family homes, upgraded villas, and investment opportunities in one of Dubai's most desirable villa communities.",
}

export default function JumeirahParkVillasForSalePage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="relative border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Jumeirah Park
          </p>

          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
            Jumeirah Park Villas for Sale
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Jumeirah Park villas for sale continue to attract buyers looking for
            spacious family homes, practical villa layouts, strong community
            appeal, and long-term residential value in Dubai. The area is one of
            the city&apos;s most established villa communities, with broad appeal
            among end users, investors, and buyers seeking renovation or upgrade
            potential.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Jumeirah%20Park%20villas%20for%20sale."
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
              <p className="text-2xl font-semibold">Family Living</p>
              <p className="mt-2 text-sm text-gray-400">
                Practical villas suited for long-term residential use
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Established</p>
              <p className="mt-2 text-sm text-gray-400">
                Mature infrastructure and proven buyer demand
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Renovation Potential</p>
              <p className="mt-2 text-sm text-gray-400">
                Opportunities to add value through upgrades and repositioning
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Liquidity</p>
              <p className="mt-2 text-sm text-gray-400">
                Strong market activity across family villa segments
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
              Why Jumeirah Park Villas Continue to Attract End Users and Investors
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for Jumeirah Park villas for sale are often
              looking for a balance of location, family suitability, plot size,
              and value relative to more expensive villa communities. The area
              offers a more practical villa product while still benefiting from
              strong community appeal and established infrastructure.
            </p>

            <p>
              This combination makes Jumeirah Park especially attractive to
              families, owner-occupiers, and investors who want stable villa
              demand in a recognizable and well-performing location.
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
              Types of Villas Available in Jumeirah Park
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Buyers exploring Jumeirah Park villas for sale typically compare
              original-condition villas, upgraded homes, and properties with
              stronger layout usability or renovation upside depending on their
              strategy.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Original Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Suitable for buyers focused on entry positioning and future
                improvement potential.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Upgraded Homes</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Villas improved for modern family living and more immediate
                occupancy.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Renovation Opportunities</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Properties offering stronger value-add potential through design,
                extension, or repositioning.
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
              Jumeirah Park villas remain attractive for investors due to
              consistent family demand, practical layout appeal, and the
              opportunity to create stronger value through upgrades and better
              positioning. The community benefits from both end-user demand and
              broader recognition in Dubai&apos;s villa market.
            </p>

            <p>
              For many buyers, this is a community where residential usability
              and long-term demand matter more than pure prestige — which can
              create strong medium- and long-term ownership logic.
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
              In Jumeirah Park, Layout, Condition, and Position Drive True Value
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              In this market, value is shaped not only by price per square foot,
              but also by villa layout, natural light, privacy, condition,
              renovation scope, and exact position within the community.
            </p>

            <p>
              PAMA Estates helps buyers evaluate Jumeirah Park villas for sale
              with more precision — identifying stronger opportunities for
              family living, rental potential, or future repositioning.
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
              Explore More Dubai Villa Opportunities
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
              href="/jumeirah-islands-villas-for-sale"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Jumeirah Islands Villas</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Compare Jumeirah Park with a more premium low-density villa
                environment.
              </p>
            </Link>

            <Link
              href="/areas/jumeirah-park"
              className="border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">Jumeirah Park Area Guide</h3>
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
            Looking for Jumeirah Park Villas for Sale?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for access to available villas, selected
            family homes, and strategic buying guidance within Jumeirah Park.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20looking%20for%20Jumeirah%20Park%20villas%20for%20sale."
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