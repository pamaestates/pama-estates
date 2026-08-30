import Link from "next/link"
import { getPublishedOpportunities } from "@/lib/public-opportunities"

function formatAed(value?: number) {
  if (!value) return null
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value)
}

export default function OpportunitiesPage() {
  const opportunities = getPublishedOpportunities()

  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Selected Opportunities</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-6xl">
            Curated Dubai Property Opportunities with Better Context
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            PAMA Estates publishes only selected opportunities where the available information is suitable for public presentation. The objective is relevance and context — not listing volume.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-white/10 bg-black/20 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">01</p>
              <h2 className="mt-3 text-xl font-semibold">Verified Facts First</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">Only information cleared for public use is displayed.</p>
            </div>
            <div className="border border-white/10 bg-black/20 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">02</p>
              <h2 className="mt-3 text-xl font-semibold">Asking ≠ Achieved</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">Current asking prices are never presented as completed transaction values.</p>
            </div>
            <div className="border border-white/10 bg-black/20 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">03</p>
              <h2 className="mt-3 text-xl font-semibold">Private Data Stays Private</h2>
              <p className="mt-3 text-sm leading-7 text-gray-400">Off-market and client information is not exposed automatically from PAMA Core.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          {opportunities.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {opportunities.map((opportunity) => (
                <article key={opportunity.slug} className="border border-white/10 bg-white/5 p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#D4AF37]">
                    <span>{opportunity.community}</span>
                    <span className="text-gray-600">•</span>
                    <span>{opportunity.propertyType}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{opportunity.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-gray-400">{opportunity.thesis}</p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
                    {opportunity.bedrooms ? <Metric label="Bedrooms" value={opportunity.bedrooms} /> : null}
                    {opportunity.sizeSqFt ? <Metric label="Size" value={`${opportunity.sizeSqFt.toLocaleString()} sq ft`} /> : null}
                    {opportunity.askingPriceAed ? <Metric label="Current Asking" value={formatAed(opportunity.askingPriceAed) ?? "-"} /> : null}
                    {opportunity.completion ? <Metric label="Completion" value={opportunity.completion} /> : null}
                  </div>

                  <ul className="mt-6 space-y-2 text-sm leading-7 text-gray-300">
                    {opportunity.highlights.map((highlight) => (
                      <li key={highlight}>— {highlight}</li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-gray-500">
                    {opportunity.verificationNote}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-white/10 bg-white/[0.035] px-6 py-14 text-center md:px-12 md:py-20">
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Private Selection in Progress</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold md:text-4xl">
                We are not publishing placeholder inventory just to fill the page.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-gray-400">
                Public opportunities will appear here only after the property information, publication permission and relevant figures have been verified. In the meantime, qualified buyers can request a private search based on their actual requirement.
              </p>
              <Link href="/#private-access" className="mt-8 inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:opacity-90">
                Request Private Opportunities
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">For Owners</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Have a property that should be reviewed for positioning?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-400">
              Start with a confidential property review before deciding whether the right route is public marketing, selective exposure or an off-market approach.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link href="/property-review" className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-7 py-3.5 font-medium transition hover:bg-white hover:text-black">
              Request Owner Property Review
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  )
}
