export default function AboutPage() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              About
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Boutique Advisory. Local Experience. Strategic Execution.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              PAMA Estates is a boutique real estate advisory focused on
              ultra-prime, off-market, and investment-led opportunities across
              Dubai. Led by deep local experience and an engineering-driven
              perspective, the firm advises buyers, investors, and owners with
              clarity, discretion, and precision.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">18+</p>
              <p className="mt-2 text-sm text-gray-400">
                Years of Dubai market exposure
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Engineering</p>
              <p className="mt-2 text-sm text-gray-400">
                Technical and value-driven perspective
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Ultra-Prime</p>
              <p className="mt-2 text-sm text-gray-400">
                Advisory for high-value and off-market assets
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Discreet</p>
              <p className="mt-2 text-sm text-gray-400">
                Clear, confidential, relationship-led approach
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY / BACKGROUND */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Background
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Built on Local Knowledge, Technical Understanding, and Market
              Discipline
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-300">
            <p>
              PAMA Estates was built to serve clients who value more than
              standard brokerage. The firm combines boutique-level attention
              with strategic advisory tailored to Dubai’s prime and ultra-prime
              residential market.
            </p>

            <p>
              An engineering-driven background brings a sharper understanding of
              build quality, layouts, renovation potential, and long-term asset
              value. This perspective supports more informed decision-making for
              both buyers and owners.
            </p>

            <p>
              With strong local market exposure, investor understanding, and a
              focus on quality over volume, PAMA Estates approaches each
              opportunity with discretion, structure, and clear commercial
              logic.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CLIENTS CHOOSE PAMA */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why Clients Choose PAMA Estates
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Advisory Built Around Trust, Access, and Execution
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                01
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Discretion</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Sensitive buyer and owner conversations are handled with
                confidentiality, clarity, and a selective approach.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                02
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Market Intelligence</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Advice is shaped by pricing context, competition, timing, and
                asset-specific positioning rather than generic sales language.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                03
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Off-Market Access</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Relationship-led sourcing helps uncover selected opportunities
                and potential buyers beyond standard public channels.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                04
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Execution</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                From search and positioning to negotiation and closing, the
                process is handled with discipline, structure, and attention to
                detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Who We Work With
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Tailored Advisory for Buyers, Investors, and Property Owners
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              PAMA Estates works with clients seeking more than standard
              brokerage — including private buyers, investors, villa owners,
              landlords, and clients exploring discreet opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Buyers</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Advisory for clients seeking prime residences, lifestyle assets,
                and strategic acquisitions.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Investors</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Opportunity-led sourcing focused on positioning, upside,
                location quality, and market timing.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Property Owners</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Strategic guidance for owners considering sale, leasing, or
                discreet market testing.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Collaborating Partners</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Selective work with brokers and referral partners where strong
                alignment and serious clients are involved.
              </p>
            </div>
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
            Start the Conversation
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you are buying, investing, selling, or exploring discreet
            opportunities, PAMA Estates offers a focused advisory approach
            shaped by trust, strategy, and market understanding.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20reached%20you%20via%20pamaestates.com%20(About%20Page%20Inquiry)%20and%20would%20like%20to%20start%20a%20conversation."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition hover:opacity-90"
            >
              WhatsApp
            </a>

            <a
              href="/#private-access"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 text-base font-medium transition hover:bg-white hover:text-black"
            >
              Request Private Access
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}