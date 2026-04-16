import Link from "next/link"

const areas = [
  {
    title: "Palm Jumeirah",
    href: "/areas/palm-jumeirah",
    label: "Iconic Waterfront",
    description:
      "Dubai’s most established waterfront trophy address, known for beachfront villas, branded residences, penthouses, and global ultra-prime appeal.",
  },
  {
    title: "Palm Jebel Ali",
    href: "/areas/palm-jebel-ali",
    label: "Future Waterfront",
    description:
      "A large-scale future-facing coastal destination offering strategic early-entry opportunities, waterfront scale, and long-term upside.",
  },
  {
    title: "Emirates Living",
    href: "/areas/emirates-living",
    label: "Established Villa Communities",
    description:
      "A mature collection of Emaar villa communities including Emirates Hills, Meadows, The Lakes, and The Springs, known for family living and long-term demand.",
  },
  {
    title: "Dubai Marina",
    href: "/areas/dubai-marina",
    label: "High-Rise Lifestyle & Liquidity",
    description:
      "One of Dubai’s most active residential markets, combining waterfront skyline living, strong rental demand, and investment-friendly liquidity.",
  },
  {
    title: "Jumeirah Islands",
    href: "/areas/jumeirah-islands",
    label: "Privacy & Large Plots",
    description:
      "A premium villa community valued for privacy, lake views, larger plots, and a calm low-density environment with strong end-user appeal.",
  },
  {
    title: "Jumeirah Park",
    href: "/areas/jumeirah-park",
    label: "Family Villas & Renovation Potential",
    description:
      "A highly desirable villa community known for practical family layouts, solid demand, and opportunities for long-term value through renovation and repositioning.",
  },
]

export default function AreasPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Areas
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Explore Dubai’s Prime Residential Communities
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Different communities serve different objectives. Some are defined
              by prestige, others by family living, investment liquidity,
              privacy, or future upside. PAMA Estates helps clients navigate
              these distinctions with a more strategic perspective.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Area Selection Matters
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              The Right Community Depends on the Objective
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Buying in Dubai is not simply about choosing a location on the
              map. It is about matching the right community to the right goal —
              whether that means family living, lifestyle prestige, rental
              yield, privacy, large plots, or long-term capital appreciation.
            </p>

            <p>
              The communities below represent some of the strongest areas PAMA
              Estates focuses on across Dubai’s prime and villa-led residential
              market.
            </p>
          </div>
        </div>
      </section>

      {/* AREA GRID */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
              >
                <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                  {area.label}
                </p>

                <h2 className="mt-4 text-2xl font-semibold">{area.title}</h2>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {area.description}
                </p>

                <span className="mt-8 inline-flex items-center text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                  Explore Area →
                </span>
              </Link>
            ))}
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
            Need Help Choosing the Right Area?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            PAMA Estates can guide you toward the communities that best match
            your goals — whether you are focused on lifestyle, privacy,
            investment performance, or strategic long-term positioning.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20would%20like%20guidance%20on%20the%20right%20Dubai%20area%20for%20my%20requirements."
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