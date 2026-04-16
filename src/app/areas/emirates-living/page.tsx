export default function EmiratesLivingPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Emirates Living
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Dubai’s Most Established Family Villa Communities
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Emirates Living is one of Dubai’s most established and desirable
              residential districts, known for villa communities, greenery,
              mature infrastructure, and enduring appeal among families,
              investors, and long-term residents.
            </p>
          </div>
        </div>
      </section>

      {/* MARKET POSITION */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Market Positioning
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Emirates Living holds a unique place in Dubai’s market as a mature
              villa destination with proven demand, strong community identity,
              and consistent owner and tenant appeal. It combines lifestyle
              stability with attractive long-term real estate fundamentals.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Core Communities
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Established Villa Addresses Within Emirates Living
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Emirates Hills</h3>
              <p className="mt-4 text-sm text-gray-400">
                Dubai’s premier villa enclave, known for custom-built mansions,
                golf-course positioning, and ultra-prime owner profiles.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Meadows</h3>
              <p className="mt-4 text-sm text-gray-400">
                Large family villas in a mature, landscaped setting with strong
                end-user appeal and stable long-term demand.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">The Lakes</h3>
              <p className="mt-4 text-sm text-gray-400">
                Premium family community offering privacy, greenery, and a calm
                low-density lifestyle environment.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">The Springs</h3>
              <p className="mt-4 text-sm text-gray-400">
                Highly popular villa and townhouse community with broad appeal
                to families, investors, and owner-occupiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Lifestyle Appeal
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Family Living, Green Space, and Long-Term Stability
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Emirates Living appeals strongly to buyers and tenants seeking a
              more balanced residential lifestyle — with mature landscaping,
              parks, schools, lakes, internal roads, and a sense of community
              that newer areas often take years to establish.
            </p>

            <p>
              This is one of the main reasons the area continues to attract
              long-term owner-occupiers and families who value both lifestyle
              quality and location practicality.
            </p>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Property Profile
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Emirates Living is primarily defined by villas and townhouses,
              ranging from original-condition homes with renovation potential to
              upgraded family residences and custom-built properties in
              ultra-prime pockets.
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT ANGLE */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Investment Perspective
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              For investors, Emirates Living offers one of the clearest
              combinations of tenant demand, resale confidence, and long-term
              location credibility. For end users, it offers something equally
              valuable: certainty of lifestyle and community quality.
            </p>
          </div>
        </div>
      </section>

      {/* YOUR EDGE */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Advisory Approach
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Community Knowledge Matters in Emirates Living
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Emirates Living is not just about square footage or price per foot.
              Community feel, internal street positioning, renovation potential,
              plot orientation, privacy, and proximity to parks or lakes all
              affect value and buyer interest.
            </p>

            <p>
              PAMA Estates helps buyers and owners assess these differences with
              a more precise, community-specific perspective — especially when
              comparing upgraded homes, original-condition stock, and long-term
              value opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <h2 className="text-4xl font-semibold md:text-5xl">
            Explore Emirates Living Opportunities
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for villas, family homes, investment-led
            opportunities, and selected off-market options across Emirates
            Hills, Meadows, The Lakes, and The Springs.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Emirates%20Living%20opportunities."
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