export default function PalmJumeirahPage() {
  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 md:px-10">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Palm Jumeirah
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Dubai’s Most Iconic Waterfront Address
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Palm Jumeirah represents the highest tier of Dubai’s residential
              real estate — combining beachfront living, ultra-prime villas,
              branded residences, and strong global demand from high-net-worth
              buyers.
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
              Palm Jumeirah is widely regarded as one of the most desirable
              waterfront destinations in the world. Limited supply, strong
              international demand, and continuous upgrades in luxury inventory
              support long-term value and liquidity.
            </p>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Property Types
            </p>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Diverse Ultra-Prime Inventory
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Signature Villas</h3>
              <p className="mt-4 text-sm text-gray-400">
                Beachfront villas with private access, large plots, and strong
                renovation potential.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Custom-Built Mansions</h3>
              <p className="mt-4 text-sm text-gray-400">
                Ultra-luxury homes on Billionaires Row with premium finishes and
                unique architectural design.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Branded Residences</h3>
              <p className="mt-4 text-sm text-gray-400">
                High-end apartments managed by global luxury brands with
                full-service amenities.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Penthouses</h3>
              <p className="mt-4 text-sm text-gray-400">
                Large-format residences offering panoramic sea views and
                exclusive lifestyle positioning.
              </p>
            </div>
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
              Palm Jumeirah continues to attract both end users and investors
              seeking capital preservation, lifestyle value, and long-term
              appreciation. Limited beachfront supply combined with strong
              international demand supports pricing resilience across market
              cycles.
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
              Access Beyond Public Listings
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              Many of the most compelling opportunities on Palm Jumeirah are not
              broadly marketed. PAMA Estates focuses on direct relationships,
              off-market sourcing, and targeted negotiation strategies.
            </p>

            <p>
              Buyers gain access to selected inventory, while owners benefit
              from a discreet, well-positioned approach tailored to their asset
              and timing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <h2 className="text-4xl font-semibold md:text-5xl">
            Explore Opportunities on Palm Jumeirah
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Connect with PAMA Estates for private access to available villas,
            penthouses, and off-market opportunities tailored to your
            requirements.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black hover:opacity-90"
            >
              Request Private Access
            </a>

            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20interested%20in%20Palm%20Jumeirah%20opportunities."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}