import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PropertyGallery } from "@/components/PropertyGallery"
import { getPublishedPropertyBySlug } from "@/lib/public-properties"
import { polishWhatsAppHref } from "@/lib/pl-whatsapp"
import { polishFacts, polishMoney, polishPropertyType, publicationSafePolishCopy, polishListingType } from "@/lib/pl-property"

type Props = { params: Promise<{slug: string}> }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const property = await getPublishedPropertyBySlug(slug)
  if (!property) return {}
  const copy = publicationSafePolishCopy(property)
  const en = `https://pamaestates.com/properties/${slug}`
  const pl = `https://pamaestates.com/pl/properties/${slug}`
  // Editorial review alone does not authorize search-engine publication.
  return { title: `${copy.title} | PAMA Estates`, description: copy.description, robots: { index: false, follow: true }, alternates: { canonical: pl, languages: { en, pl } } }
}

export default async function PolishProperty({params}: Props) {
  const {slug} = await params
  const p = await getPublishedPropertyBySlug(slug)
  if (!p) notFound()
  const copy = publicationSafePolishCopy(p)
  return <main className="min-h-screen bg-[#090D14] text-white"><div className="mx-auto max-w-6xl px-6 py-16">
    <Link href="/pl/properties" className="text-sm text-[#D4AF37]">← Powrót do nieruchomości</Link>
    <p className="mt-10 text-[#D4AF37]">{polishListingType(p.listingType)} · {p.community}</p>
    <h1 className="mt-3 font-serif text-4xl md:text-6xl">{copy.title}</h1>
    <p className="mt-4 text-[#C9CDD4]">{polishFacts(p)}</p><p className="mt-6 text-3xl">{polishMoney(p.askingPriceAed)}</p>
    <PropertyGallery images={p.images} title={copy.title} completionStatus={p.completionStatus} pricePositionPct={p.pricePositionPct} locale="pl" />
    <div className="mt-12 max-w-3xl border-t border-white/10 pt-8"><h2 className="text-2xl">Opis nieruchomości</h2><p className="mt-5 leading-8 text-[#C9CDD4]">{copy.description}</p>
    {!copy.reviewed && <p className="mt-5 rounded border border-[#D4AF37]/40 p-4 text-sm text-[#D4AF37]">Opis marketingowy w języku polskim oczekuje na zatwierdzenie redakcyjne. Dane liczbowe i status oferty pochodzą z aktualnego katalogu publicznego.</p>}</div>
    <dl className="mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {([
        ["Typ nieruchomości", polishPropertyType(p.propertyType)],
        ["Sypialnie", p.bedrooms ?? "—"],
        ["Łazienki", p.bathrooms ?? "—"],
        ["Powierzchnia użytkowa", p.sizeSqFt != null ? `${new Intl.NumberFormat("pl-PL").format(p.sizeSqFt)} ft²` : "—"],
        ...(p.plotSqFt != null ? [["Powierzchnia działki", `${new Intl.NumberFormat("pl-PL").format(p.plotSqFt)} ft²`]] : []),
        ["Miejsca parkingowe", p.parkingSpaces ?? "—"],
        ...(p.furnishedStatus ? [["Umeblowanie", p.furnishedStatus]] : []),
        ...(p.view ? [["Widok", p.view]] : []),
        ...(p.completion ? [["Termin ukończenia", p.completion]] : []),
        ["Numer oferty", p.listingReference],
      ] as Array<[string, string | number]>).map(([label, value]) => <div key={label}><dt className="text-sm text-[#C9CDD4]">{label}</dt><dd className="mt-1 text-xl">{value}</dd></div>)}
    </dl>
    {p.amenities.length > 0 && <section className="mt-12 border-t border-white/10 pt-8"><h2 className="text-2xl">Udogodnienia i wyposażenie</h2><p className="mt-3 text-sm text-[#C9CDD4]">Nazwy udogodnień pochodzą z oryginalnej oferty.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{p.amenities.map((amenity) => <li key={amenity} className="border-b border-white/10 pb-3 text-[#C9CDD4]">{amenity.replaceAll("-", " ")}</li>)}</ul></section>}
    {p.floorPlans.length > 0 && <section className="mt-12 border-t border-white/10 pt-8"><h2 className="text-2xl">Plany pięter i lokalu</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{p.floorPlans.map((plan, index) => <a key={plan.url} href={plan.url} target="_blank" rel="noopener noreferrer" className="rounded border border-white/20 p-4 text-[#D4AF37]">Otwórz plan {plan.label || index + 1} ↗</a>)}</div></section>}
    {p.regulatoryVerification.qrImageUrl && <div className="mt-12 max-w-sm border-t border-white/10 pt-7"><h2 className="text-lg">Weryfikacja ogłoszenia — DLD</h2><p className="my-4 text-sm text-[#C9CDD4]">Zeskanuj oficjalny kod Madmoun, aby zweryfikować ogłoszenie.</p><span role="img" aria-label="Kod QR do weryfikacji ogłoszenia w Dubai Land Department" className="block h-52 w-52 bg-contain bg-no-repeat" style={{backgroundImage:`url('${p.regulatoryVerification.qrImageUrl}')`}} /></div>}
    <div className="mt-12"><a href={polishWhatsAppHref(`/pl/properties/${slug}`, `Oferta ${p.listingReference}`)} target="_blank" rel="noopener noreferrer" className="inline-block rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Zapytaj o nieruchomość</a></div>
  </div></main>
}
