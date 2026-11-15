import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  getPublishedOpportunities,
  getPublishedOpportunityBySlug,
} from "@/lib/public-opportunities"
import { polishMoney, polishPropertyType } from "@/lib/pl-property"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getPublishedOpportunities().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const opportunity = getPublishedOpportunityBySlug(slug)
  if (!opportunity) return { robots: { index: false, follow: false } }

  return {
    title: `${polishPropertyType(opportunity.propertyType)} — ${opportunity.community} | PAMA Estates`,
    description: `Wybrana okazja inwestycyjna w ${opportunity.community}. Informacje o cenie i nieruchomości.`,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://pamaestates.com/pl/opportunities/${slug}`,
    },
  }
}

function percentChange(original?: number, asking?: number) {
  if (original == null || asking == null || original <= 0) return null
  return ((asking - original) / original) * 100
}

function grossYield(rent?: number, asking?: number) {
  if (rent == null || asking == null || asking <= 0) return null
  return (rent / asking) * 100
}

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${new Intl.NumberFormat("pl-PL", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  }).format(value)}%`
}

export default async function PolishOpportunityDetail({ params }: Props) {
  const { slug } = await params
  const opportunity = getPublishedOpportunityBySlug(slug)
  if (!opportunity) notFound()

  const change = percentChange(
    opportunity.originalPriceAed,
    opportunity.askingPriceAed
  )
  const yieldValue = grossYield(
    opportunity.estimatedAnnualRentAed ?? opportunity.currentAnnualRentAed,
    opportunity.askingPriceAed
  )

  const facts: Array<[string, string]> = [
    ["Lokalizacja", opportunity.community],
    ["Typ nieruchomości", polishPropertyType(opportunity.propertyType)],
    ["Sypialnie", opportunity.bedrooms ?? "—"],
    ["Powierzchnia", opportunity.sizeSqFt == null
      ? "—"
      : `${new Intl.NumberFormat("pl-PL").format(opportunity.sizeSqFt)} ft²`],
    ["Aktualna cena ofertowa", opportunity.askingPriceAed == null
      ? "Cena na zapytanie"
      : polishMoney(opportunity.askingPriceAed)],
    ["Cena pierwotna / deweloperska", opportunity.originalPriceAed == null
      ? "—"
      : polishMoney(opportunity.originalPriceAed)],
    ["Cena nabycia przez właściciela", opportunity.ownerAcquisitionPriceAed == null
      ? "—"
      : polishMoney(opportunity.ownerAcquisitionPriceAed)],
    ["Aktualny roczny czynsz", opportunity.currentAnnualRentAed == null
      ? "—"
      : polishMoney(opportunity.currentAnnualRentAed)],
    ["Szacowany roczny czynsz", opportunity.estimatedAnnualRentAed == null
      ? "—"
      : polishMoney(opportunity.estimatedAnnualRentAed)],
    ["Opłata serwisowa za ft²", opportunity.serviceChargeAedPerSqFt == null
      ? "—"
      : `${new Intl.NumberFormat("pl-PL").format(opportunity.serviceChargeAedPerSqFt)} AED/ft²`],
    ["Termin ukończenia", opportunity.completion ?? "—"],
    ["Plan płatności", opportunity.paymentPlan ?? "—"],
  ]

  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Link href="/pl/opportunities" className="text-sm text-[#D4AF37]">
          ← Powrót do okazji inwestycyjnych
        </Link>

        <p className="mt-10 text-sm uppercase tracking-[0.2em] text-[#D4AF37]">
          PAMA Estates · Okazje inwestycyjne
        </p>
        <h1 className="mt-5 font-serif text-4xl md:text-6xl">
          {polishPropertyType(opportunity.propertyType)} — {opportunity.community}
        </h1>
        <p className="mt-6 max-w-3xl text-[#C9CDD4]">
          Prezentujemy dane z katalogu ofert zatwierdzonych do publikacji.
          Indywidualna analiza oraz szczegółowy opis w języku polskim
          wymagają osobnej weryfikacji.
        </p>

        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(([label, value]) => (
            <div key={label} className="border border-white/10 bg-white/[0.035] p-5">
              <dt className="text-sm text-[#C9CDD4]">{label}</dt>
              <dd className="mt-2 text-lg font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-12 border-t border-white/10 pt-9">
          <h2 className="font-serif text-3xl">Wskaźniki orientacyjne</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="border border-white/10 p-6">
              <p className="text-sm text-[#C9CDD4]">Cena ofertowa względem ceny pierwotnej</p>
              <p className="mt-3 text-2xl font-semibold">
                {change == null ? "Brak danych" : formatPercent(change)}
              </p>
            </div>
            <div className="border border-white/10 p-6">
              <p className="text-sm text-[#C9CDD4]">Orientacyjna roczna rentowność brutto</p>
              <p className="mt-3 text-2xl font-semibold">
                {yieldValue == null ? "Brak danych" : formatPercent(yieldValue)}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#C9CDD4]">
            Wyliczenia opierają się na dostępnej cenie ofertowej i podanych danych
            o czynszu. Nie uwzględniają wszystkich kosztów, okresów pustostanu
            ani podatków. Nie stanowią gwarancji zwrotu, wyceny rynkowej
            ani potwierdzenia ceny transakcyjnej.
          </p>
        </section>

        <section className="mt-12 border-t border-white/10 pt-9">
          <h2 className="font-serif text-3xl">Szczegółowa analiza</h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#C9CDD4]">
            Szczegółowy opis inwestycyjny w języku polskim nie został jeszcze
            zatwierdzony do publikacji. Skontaktuj się z nami, aby omówić
            dostępność, warunki oraz aktualność informacji.
          </p>
          <Link
            href="/pl/contact"
            className="mt-8 inline-flex bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]"
          >
            Zapytaj o szczegóły
          </Link>
        </section>
      </section>
    </main>
  )
}