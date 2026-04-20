import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Luxury Property Dubai | Villas, Apartments & Off-Market Opportunities | PAMA Estates",
  description:
    "Explore luxury property in Dubai including villas, apartments, penthouses, and off-market opportunities across Palm Jumeirah, Dubai Marina, Emirates Hills, and more.",
}

const landingPages = [
  {
    title: "Palm Jumeirah Villas for Sale",
    href: "/palm-jumeirah-villas-for-sale",
    label: "Waterfront Villas",
    description:
      "Beachfront homes, signature villas, and ultra-prime opportunities on one of Dubai's most iconic addresses.",
  },
  {
    title: "Palm Jumeirah Apartments for Sale",
    href: "/palm-jumeirah-apartments-for-sale",
    label: "Waterfront Apartments",
    description:
      "Luxury apartments, branded residences, and premium seafront living on Palm Jumeirah.",
  },
  {
    title: "Dubai Marina Apartments for Sale",
    href: "/dubai-marina-apartments-for-sale",
    label: "High-Rise Waterfront",
    description:
      "Skyline living, strong rental demand, and waterfront apartment opportunities in Dubai Marina.",
  },
  {
    title: "Emirates Hills Villas for Sale",
    href: "/emirates-hills-villas-for-sale",
    label: "Ultra-Prime Villas",
    description:
      "Custom-built mansions, golf-course homes, and one of Dubai's most prestigious villa communities.",
  },
  {
    title: "Jumeirah Islands Villas for Sale",
    href: "/jumeirah-islands-villas-for-sale",
    label: "Premium Villa Community",
    description:
      "Large plots, lake views, and strong end-user appeal in a low-density premium residential environment.",
  },
  {
    title: "Jumeirah Park Villas for Sale",
    href: "/jumeirah-park-villas-for-sale",
    label: "Family Villas",
    description:
      "Established villa community with practical layouts, renovation potential, and strong long-term demand.",
  },
  {
    title: "Luxury Villas Dubai",
    href: "/luxury-villas-dubai",
    label: "Prime Villa Search",
    description:
      "A broader view of Dubai's luxury villa market across prime and ultra-prime communities.",
  },
  {
    title: "Dubai Luxury Penthouses",
    href: "/dubai-luxury-penthouses",
    label: "Ultra-Prime Apartments",
    description:
      "Large-format top-floor residences, panoramic views, and rare penthouse opportunities across Dubai.",
  },
  {
    title: "Off-Market Properties Dubai",
    href: "/off-market-properties-dubai",
    label: "Private Listings",
    description:
      "Discreet access to high-value homes, villas, and opportunities not publicly advertised.",
  },
  {
    title: "Billionaires Row Palm Jumeirah",
    href: "/billionaires-row-palm-jumeirah",
    label: "Trophy Assets",
    description:
      "A focused look at one of Palm Jumeirah's most exclusive ultra-prime villa micro-markets.",
  },
]

export default function LuxuryPropertyDubaiPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Dubai Prime Market
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Luxury Property Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Explore luxury property in Dubai across villas, apartments,
              penthouses, and off-market opportunities. This page connects the
              key premium search routes across Palm Jumeirah, Emirates Hills,
              Dubai Marina, Jumeirah Islands, Jumeirah Park, and other high-value
              segments of Dubai&apos;s prime residential market.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/#private-access"
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Access
              </a>

              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20luxury%20property%20in%20Dubai."
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

      {/* INTRO */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              How to Use This Page
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Different Property Types, Different Buying Objectives
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buyers searching for luxury property in Dubai are often looking
              for very different outcomes. Some prioritize beachfront prestige,
              others focus on family villa communities, penthouses, or private
              off-market opportunities. This hub page is designed to connect
              those high-intent searches through a clearer premium structure.
            </p>

            <p>
              Use the sections below to explore the most important luxury
              property categories and prime locations PAMA Estates focuses on.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK SEGMENTS */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0B0E15] px-6 py-6">
              <p className="text-2xl font-semibold">Villas</p>
              <p className="mt-2 text-sm text-gray-400">
                Waterfront, golf-course, family, and ultra-prime homes
              </p>
            </div>
            <div className="bg-[#0B0E15] px-6 py-6">
              <p className="text-2xl font-semibold">Apartments</p>
              <p className="mt-2 text-sm text-gray-400">
                Branded residences, waterfront units, and skyline homes
              </p>
            </div>
            <div className="bg-[#0B0E15] px-6 py-6">
              <p className="text-2xl font-semibold">Penthouses</p>
              <p className="mt-2 text-sm text-gray-400">
                Rare top-floor residences with large-format luxury living
              </p>
            </div>
            <div className="bg-[#0B0E15] px-6 py-6">
              <p className="text-2xl font-semibold">Off-Market</p>
              <p className="mt-2 text-sm text-gray-400">
                Private opportunities beyond public portals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LANDING PAGE GRID */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Explore Key Search Routes
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Browse Dubai&apos;s Core Luxury Property Categories
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              The pages below are structured around the highest-value buyer
              searches across Dubai&apos;s prime residential market.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {landingPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
              >
                <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                  {page.label}
                </p>

                <h3 className="mt-4 text-2xl font-semibold">{page.title}</h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {page.description}
                </p>

                <span className="mt-8 inline-flex items-center text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                  Explore Page →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Strategic Perspective
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Why This Luxury Property Hub Strengthens Both Search and Buyer Flow
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Luxury property searches in Dubai rarely begin and end on the same
              keyword. A buyer looking at Palm Jumeirah villas may also compare
              Emirates Hills, off-market opportunities, penthouses, or broader
              luxury villa options across the city.
            </p>

            <p>
              This hub page helps connect those journeys in a cleaner way —
              making it easier for serious buyers to move between the right
              topics while strengthening the internal SEO structure of the site.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Next Step
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Looking for Luxury Property in Dubai?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for private access to villas, apartments,
            penthouses, and off-market opportunities across Dubai&apos;s prime
            residential communities.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20luxury%20property%20in%20Dubai."
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