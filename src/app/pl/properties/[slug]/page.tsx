import Link from "next/link"
import { approvedPolishCopyFor } from "@/lib/pl-approved-copy"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PropertyGallery } from "@/components/PropertyGallery"
import { getPublishedPropertyBySlug } from "@/lib/public-properties"
import { polishWhatsAppHref } from "@/lib/pl-whatsapp"
import { polishMoney, polishPropertyType, publicationSafePolishCopy, polishFurnishing, polishView, polishCompletion, polishCompletionStatus, polishAmenity } from "@/lib/pl-property"

type Props = { params: Promise<{slug: string}> }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const property = await getPublishedPropertyBySlug(slug)
  if (!property) return {}
  const copy = publicationSafePolishCopy(property, approvedPolishCopyFor(property))
  const en = `https://pamaestates.com/properties/${slug}`
  const pl = `https://pamaestates.com/pl/properties/${slug}`
  // Editorial review alone does not authorize search-engine publication.
  return { title: `${copy.title} | PAMA Estates`, description: copy.description, robots: { index: false, follow: true }, alternates: { canonical: pl, languages: { en, pl } } }
}

export default async function PolishProperty({params}: Props) {
  const {slug} = await params
  const p = await getPublishedPropertyBySlug(slug)
  if (!p) notFound()
  const copy = publicationSafePolishCopy(p, approvedPolishCopyFor(p))
  return <main className="min-h-screen bg-[#090D14] text-white"><section className="border-t border-white/10 bg-[#0D131D]"><div className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-10 lg:pb-14 lg:pt-16">
    <Link href="/pl/properties" className="text-sm text-[#D4AF37]">← Powrót do nieruchomości</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">{p.community}{p.project ? ` · ${p.project}` : ""}</p>
    <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-6xl">{copy.title}</h1>
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300"><span>{p.bedrooms == null ? "—" : `${p.bedrooms} ${p.bedrooms === 1 ? "sypialnia" : p.bedrooms >= 2 && p.bedrooms <= 4 ? "sypialnie" : "sypialni"}`}</span>
<span>{p.bathrooms == null ? "—" : `${p.bathrooms} ${p.bathrooms === 1 ? "łazienka" : p.bathrooms >= 2 && p.bathrooms <= 4 ? "łazienki" : "łazienek"}`}</span>
{p.sizeSqFt != null && <span>{Math.floor(p.sizeSqFt).toLocaleString("pl-PL")} ft²</span>}
{p.completionStatus && <span>{polishCompletionStatus(p.completionStatus)}</span>}</div></div><div className="lg:text-right"><p className="text-xs uppercase tracking-[0.22em] text-gray-500">Cena ofertowa</p><p className="mt-2 text-3xl font-semibold tracking-[-0.02em]">{polishMoney(p.askingPriceAed)}</p></div></div></div></section>
    <PropertyGallery images={p.images} title={copy.title} completionStatus={p.completionStatus ? polishCompletionStatus(p.completionStatus) : undefined} pricePositionPct={p.pricePositionPct} locale="pl" />
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-24"><div className="max-w-3xl border-t border-white/10 pt-8"><h2 className="text-2xl">Opis nieruchomości</h2><div className="mt-5 whitespace-pre-line text-base leading-8 text-gray-300 md:text-lg">{copy.description}</div>
    {!copy.reviewed && <p className="mt-5 rounded border border-[#D4AF37]/40 p-4 text-sm text-[#D4AF37]">Opis marketingowy w języku polskim oczekuje na zatwierdzenie redakcyjne. Dane liczbowe i status oferty pochodzą z aktualnego katalogu publicznego.</p>}</div>
    <dl className="mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {([
        ["Typ nieruchomości", polishPropertyType(p.propertyType)],
        ["Sypialnie", p.bedrooms ?? "—"],
        ["Łazienki", p.bathrooms ?? "—"],
        ["Powierzchnia użytkowa", p.sizeSqFt != null ? `${new Intl.NumberFormat("pl-PL").format(p.sizeSqFt)} ft²` : "—"],
        ...(p.plotSqFt != null ? [["Powierzchnia działki", `${new Intl.NumberFormat("pl-PL").format(p.plotSqFt)} ft²`]] : []),
        ["Miejsca parkingowe", p.parkingSpaces ?? "—"],
        ...(p.furnishedStatus ? [["Umeblowanie", polishFurnishing(p.furnishedStatus)]] : []),
        ...(p.view ? [["Widok", polishView(p.view)]] : []),
        ...(p.completion ? [["Termin ukończenia", polishCompletion(p.completion)]] : []),
        ["Numer oferty", p.listingReference],
      ] as Array<[string, string | number]>).map(([label, value]) => <div key={label}><dt className="text-sm text-[#C9CDD4]">{label}</dt><dd className="mt-1 text-xl">{value}</dd></div>)}
    </dl>
    {p.amenities.length > 0 && <section className="mt-12 border-t border-white/10 pt-8"><h2 className="text-2xl">Udogodnienia i wyposażenie</h2><p className="mt-3 text-sm text-[#C9CDD4]">Nazwy udogodnień pochodzą z oryginalnej oferty.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{p.amenities.map((amenity) => <li key={amenity} className="border-b border-white/10 pb-3 text-[#C9CDD4]">{polishAmenity(amenity)}</li>)}</ul></section>}
    {(p.originalPriceAed != null || p.pricePositionPct != null) && (
      <section className="mt-14 border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">
          PERSPEKTYWA PAMA
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em]">
          Pozycja cenowa i kontekst nieruchomości
        </h2>

        <div className="mt-7 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          <div className="bg-[#0D131D] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Cena ofertowa
            </p>
            <p className="mt-2 text-lg font-semibold">
              {polishMoney(p.askingPriceAed)}
            </p>
          </div>

          <div className="bg-[#0D131D] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Przybliżona cena pierwotna
            </p>
            <p className="mt-2 text-lg font-semibold">
              {p.originalPriceAed != null
                ? polishMoney(p.originalPriceAed)
                : "Brak danych"}
            </p>
          </div>

          <div className="bg-[#0D131D] p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
              Różnica względem ceny pierwotnej
            </p>
            <p className="mt-2 text-lg font-semibold">
              {p.originalPriceAed != null && p.pricePositionPct != null
                ? `${Math.abs(p.pricePositionPct).toLocaleString("pl-PL", {maximumFractionDigits: 1})}% ${
                    p.pricePositionPct < 0
                      ? "poniżej"
                      : p.pricePositionPct > 0
                        ? "powyżej"
                        : "— bez różnicy"
                  }`
                : "Brak danych"}
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs leading-6 text-gray-400">
          Porównanie z ceną pierwotną nieruchomości.
          Nie stanowi niezależnej wyceny wartości rynkowej.
        </p>
      </section>
    )}
    {p.floorPlans.length > 0 && <section className="mt-12 border-t border-white/10 pt-8"><h2 className="text-2xl">Plany pięter i lokalu</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{p.floorPlans.map((plan, index) => <a key={plan.url} href={plan.url} target="_blank" rel="noopener noreferrer" className="rounded border border-white/20 p-4 text-[#D4AF37]">Otwórz plan {plan.label || index + 1} ↗</a>)}</div></section>}
    {p.regulatoryVerification.qrImageUrl && <div className="mt-12 max-w-sm border-t border-white/10 pt-7"><h2 className="text-lg">Weryfikacja ogłoszenia — DLD</h2><p className="my-4 text-sm text-[#C9CDD4]">Zeskanuj oficjalny kod Madmoun, aby zweryfikować ogłoszenie.</p><span role="img" aria-label="Kod QR do weryfikacji ogłoszenia w Dubai Land Department" className="block h-52 w-52 bg-contain bg-no-repeat" style={{backgroundImage:`url('${p.regulatoryVerification.qrImageUrl}')`}} /></div>}
    <div className="mt-12"><a href={polishWhatsAppHref(`/pl/properties/${slug}`, `Oferta ${p.listingReference}`)} target="_blank" rel="noopener noreferrer" className="inline-block rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Zapytaj o nieruchomość</a></div>
  </div></main>
}
