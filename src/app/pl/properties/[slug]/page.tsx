import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublishedPropertyBySlug } from "@/lib/public-properties"
import { polishFacts, polishMoney, publicationSafePolishCopy, polishListingType } from "@/lib/pl-property"

type Props = { params: Promise<{slug: string}> }
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const property = await getPublishedPropertyBySlug(slug)
  if (!property) return {}
  const copy = publicationSafePolishCopy(property)
  const en = `https://pamaestates.com/properties/${slug}`
  const pl = `https://pamaestates.com/pl/properties/${slug}`
  return { title: `${copy.title} | PAMA Estates`, description: copy.description, robots: copy.reviewed ? undefined : { index: false, follow: true }, alternates: { canonical: pl, languages: { en, pl } } }
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
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{p.images.slice(0,12).map((image,i)=><a href={image.url} target="_blank" rel="noopener noreferrer" key={`${image.url}-${i}`} className="block aspect-[4/3] overflow-hidden rounded bg-[#17202D]"><span className="sr-only">Zdjęcie {i+1} — otwórz w nowym oknie</span><span role="img" aria-label={image.alt} className="block h-full w-full bg-cover bg-center" style={{backgroundImage:`url('${image.url}')`}} /></a>)}</div>
    <div className="mt-12 max-w-3xl border-t border-white/10 pt-8"><h2 className="text-2xl">Opis nieruchomości</h2><p className="mt-5 leading-8 text-[#C9CDD4]">{copy.description}</p>
    {!copy.reviewed && <p className="mt-5 rounded border border-[#D4AF37]/40 p-4 text-sm text-[#D4AF37]">Opis marketingowy w języku polskim oczekuje na zatwierdzenie redakcyjne. Dane liczbowe i status oferty pochodzą z aktualnego katalogu publicznego.</p>}</div>
    <dl className="mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-sm text-[#C9CDD4]">Sypialnie</dt><dd className="mt-1 text-xl">{p.bedrooms ?? "—"}</dd></div><div><dt className="text-sm text-[#C9CDD4]">Łazienki</dt><dd className="mt-1 text-xl">{p.bathrooms ?? "—"}</dd></div><div><dt className="text-sm text-[#C9CDD4]">Powierzchnia</dt><dd className="mt-1 text-xl">{p.sizeSqFt ? `${p.sizeSqFt} ft²` : "—"}</dd></div><div><dt className="text-sm text-[#C9CDD4]">Numer oferty</dt><dd className="mt-1 text-xl">{p.listingReference}</dd></div></dl>
    {p.regulatoryVerification.qrImageUrl && <div className="mt-12 max-w-sm border-t border-white/10 pt-7"><h2 className="text-lg">Weryfikacja ogłoszenia — DLD</h2><p className="my-4 text-sm text-[#C9CDD4]">Zeskanuj oficjalny kod Madmoun, aby zweryfikować ogłoszenie.</p><span role="img" aria-label="Kod QR do weryfikacji ogłoszenia w Dubai Land Department" className="block h-52 w-52 bg-contain bg-no-repeat" style={{backgroundImage:`url('${p.regulatoryVerification.qrImageUrl}')`}} /></div>}
    <div className="mt-12"><a href={`https://wa.me/971559003888?text=${encodeURIComponent(`Dzień dobry, interesuje mnie nieruchomość ${p.listingReference}. Proszę o szczegóły po polsku.`)}`} target="_blank" rel="noopener noreferrer" className="inline-block rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Zapytaj o nieruchomość</a></div>
  </div></main>
}
