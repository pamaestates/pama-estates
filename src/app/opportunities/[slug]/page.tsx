import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getPublishedOpportunities,
  getPublishedOpportunityBySlug,
} from "@/lib/public-opportunities"

export const dynamicParams = false

export function generateStaticParams() {
  return getPublishedOpportunities().map((opportunity) => ({ slug: opportunity.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const opportunity = getPublishedOpportunityBySlug(slug)
  if (!opportunity) return {}

  return {
    title: `${opportunity.title} | PAMA Estates`,
    description: opportunity.thesis,
    alternates: { canonical: `https://pamaestates.com/opportunities/${opportunity.slug}` },
    openGraph: {
      title: `${opportunity.title} | PAMA Estates`,
      description: opportunity.thesis,
      url: `https://pamaestates.com/opportunities/${opportunity.slug}`,
      type: "website",
    },
  }
}

export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const opportunity = getPublishedOpportunityBySlug(slug)
  if (!opportunity) notFound()

  const askingVsOriginal = percentageChange(opportunity.originalPriceAed, opportunity.askingPriceAed)
  const askingVsAcquisition = percentageChange(opportunity.ownerAcquisitionPriceAed, opportunity.askingPriceAed)
  const rentalYield = grossYield(opportunity.estimatedAnnualRentAed ?? opportunity.currentAnnualRentAed, opportunity.askingPriceAed)

  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#D4AF37]">
            <span>{opportunity.community}</span>
            <span className="text-gray-600">•</span>
            <span>{opportunity.propertyType}</span>
          </div>

          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-6xl">
            {opportunity.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">{opportunity.thesis}</p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <Metric label="Current Asking" value={formatAed(opportunity.askingPriceAed)} note="Asking, not achieved price" />
            <Metric label="Bedrooms" value={opportunity.bedrooms ?? "—"} />
            <Metric label="Size" value={opportunity.sizeSqFt ? `${opportunity.sizeSqFt.toLocaleString()} sq ft` : "—"} />
            <Metric label="Completion" value={opportunity.completion ?? "—"} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-20 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">PAMA Intelligence</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Price Position & Asset Context</h2>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <IntelligenceCard label="Original / Developer Price" value={formatAed(opportunity.originalPriceAed)} />
              <IntelligenceCard label="Owner Acquisition Price" value={formatAed(opportunity.ownerAcquisitionPriceAed)} />
              <IntelligenceCard label="Current Asking" value={formatAed(opportunity.askingPriceAed)} />
              <IntelligenceCard label="Indicative Gross Yield" value={rentalYield == null ? "—" : `${rentalYield.toFixed(2)}%`} />
            </div>

            {(askingVsOriginal != null || askingVsAcquisition != null) ? (
              <div className="mt-5 border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-gray-300">
                {askingVsOriginal != null ? (
                  <p>Current asking vs original/developer price: <strong className="text-white">{formatPercent(askingVsOriginal)}</strong>.</p>
                ) : null}
                {askingVsAcquisition != null ? (
                  <p className={askingVsOriginal != null ? "mt-2" : ""}>Current asking vs owner acquisition price: <strong className="text-white">{formatPercent(askingVsAcquisition)}</strong>.</p>
                ) : null}
                <p className="mt-3 text-xs text-gray-500">These comparisons describe asking-price positioning only. They do not represent a completed resale or guaranteed value.</p>
              </div>
            ) : null}

            <div className="mt-10">
              <h3 className="text-2xl font-semibold">Why This Opportunity Is Selected</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-gray-300">
                {opportunity.highlights.map((highlight) => (
                  <li key={highlight} className="border-l border-[#D4AF37] pl-5">{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="border border-white/10 bg-[#0F131B] p-7 md:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Property Context</p>
            <div className="mt-6 space-y-5 text-sm">
              <Row label="Current Annual Rent" value={formatAed(opportunity.currentAnnualRentAed)} />
              <Row label="Estimated Annual Rent" value={formatAed(opportunity.estimatedAnnualRentAed)} />
              <Row label="Service Charge" value={opportunity.serviceChargeAedPerSqFt ? `AED ${opportunity.serviceChargeAedPerSqFt.toLocaleString()} / sq ft` : "—"} />
              <Row label="Payment Plan" value={opportunity.paymentPlan ?? "—"} />
            </div>

            <p className="mt-7 border-t border-white/10 pt-6 text-xs leading-6 text-gray-500">
              {opportunity.verificationNote}
            </p>

            <Link href="/#private-access" className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-[#D4AF37] px-6 py-3.5 font-semibold text-black transition hover:opacity-90">
              Request Details / Private Access
            </Link>
          </aside>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="bg-[#0B0E15] p-5 md:p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
      {note ? <p className="mt-2 text-xs text-gray-600">{note}</p> : null}
    </div>
  )
}

function IntelligenceCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-gray-200">{value}</span>
    </div>
  )
}

function formatAed(value?: number) {
  if (!value) return "—"
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value)
}

function percentageChange(from?: number, to?: number) {
  if (!from || !to || from <= 0) return null
  return ((to - from) / from) * 100
}

function grossYield(rent?: number, asking?: number) {
  if (!rent || !asking || asking <= 0) return null
  return (rent / asking) * 100
}

function formatPercent(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}
