export default function ContactPage() {
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
              Contact
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Let’s Start the Right Conversation
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Connect with PAMA Estates regarding private opportunities,
              strategic acquisitions, seller advisory, off-market sourcing,
              or collaboration. Every inquiry is handled with clarity,
              discretion, and a focused advisory approach.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Buyer Advisory</p>
              <p className="mt-2 text-sm text-gray-400">
                Private and on-market opportunities
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Owner Advisory</p>
              <p className="mt-2 text-sm text-gray-400">
                Strategic sale and leasing support
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Discreet</p>
              <p className="mt-2 text-sm text-gray-400">
                Confidential communication and positioning
              </p>
            </div>
            <div className="bg-[#0F131B] px-6 py-6">
              <p className="text-2xl font-semibold">Direct</p>
              <p className="mt-2 text-sm text-gray-400">
                WhatsApp-first contact for faster response
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Contact Options
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Choose the Most Relevant Route
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Whether you are a buyer, owner, investor, or collaborating
              broker, the right route helps us respond with more relevant
              guidance from the start.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                01
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Buyer / Investor
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                For clients seeking private access, off-market opportunities,
                investment-led acquisitions, or strategic guidance on buying in
                Dubai.
              </p>

              <div className="mt-8">
                <a
                  href="/#private-access"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
                >
                  Request Private Access
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                02
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Property Owner
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                For owners considering selling, renting, or discreetly testing
                the market for villas, apartments, penthouses, plots, and
                entire buildings.
              </p>

              <div className="mt-8">
                <a
                  href="/sell-with-us"
                  className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Sell or Rent With Us
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                03
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Direct WhatsApp
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                For immediate contact regarding opportunities, advisory,
                collaboration, or urgent discussions requiring a faster
                response.
              </p>

              <div className="mt-8">
                <a
                  href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20reached%20you%20via%20pamaestates.com%20(Contact%20Page%20Inquiry)%20and%20would%20like%20to%20connect."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECT CONTACT DETAILS */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Direct Contact
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Clear, Direct, and Confidential Communication
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              PAMA Estates values efficient and focused communication.
              WhatsApp is the fastest route for most inquiries, while email is
              suitable for introductions, documents, and more detailed
              communication.
            </p>

            <div className="mt-10 space-y-4 text-lg text-gray-300">
              <p>
                <span className="text-white font-semibold">WhatsApp:</span>{" "}
                +971 55 900 3888
              </p>
              <p>
                <span className="text-white font-semibold">Email:</span>{" "}
                info@pamaestates.com
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-10 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
            <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
              Response Approach
            </p>

            <h3 className="mt-4 text-2xl font-semibold">
              Focused Guidance, Not Generic Replies
            </h3>

            <p className="mt-6 text-sm leading-7 text-gray-400">
              The aim is not simply to respond quickly, but to respond
              meaningfully. The more context you share about your requirement,
              the more precisely the next steps can be tailored to your goals.
            </p>

            <div className="mt-8 space-y-3 text-sm text-gray-400">
              <p>• Buyer and investor guidance</p>
              <p>• Seller and landlord advisory</p>
              <p>• Off-market and discreet opportunities</p>
              <p>• Collaboration with aligned brokers</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Next Step
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Reach Out with the Right Context
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you are looking to buy, sell, rent, invest, or collaborate,
            PAMA Estates is positioned to respond with clarity, strategy, and a
            premium advisory mindset.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20reached%20you%20via%20pamaestates.com%20(Contact%20Page%20Inquiry)%20and%20would%20like%20to%20connect."
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