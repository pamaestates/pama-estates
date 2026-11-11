import Link from "next/link"
import { approvedPolishCopyFor } from "@/lib/pl-approved-copy"
import type { Metadata } from "next"
import { getPublishedProperties } from "@/lib/public-properties"
import { polishMoney, polishFacts, polishListingType, publicationSafePolishCopy } from "@/lib/pl-property"

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Nieruchomości na sprzedaż i wynajem w Dubaju | PAMA Estates",
  description: "Wybrane apartamenty i wille w Dubaju. Poznaj ceny, powierzchnie i szczegóły nieruchomości z doradcą mówiącym po polsku.",
  alternates: { canonical: "https://pamaestates.com/pl/properties", languages: { en: "https://pamaestates.com/properties", pl: "https://pamaestates.com/pl/properties" } },
}

type Search = { searchParams: Promise<Record<string, string | string[] | undefined>> }
export default async function PolishProperties({ searchParams }: Search) {
  const [all, query] = await Promise.all([getPublishedProperties(), searchParams])
  const mode = typeof query.mode === "string" ? query.mode : ""
  const community = typeof query.community === "string" ? query.community : ""
  const type = typeof query.type === "string" ? query.type : ""
  const bedrooms = typeof query.bedrooms === "string" && query.bedrooms !== "" ? Number(query.bedrooms) : null
  const properties = all.filter(p => (!mode || p.listingType === mode) && (!community || p.community === community) && (!type || p.propertyType === type) && (bedrooms == null || !Number.isFinite(bedrooms) || p.bedrooms === bedrooms))
  const communities = [...new Set(all.map(p=>p.community))].sort()
  const types = [...new Set(all.map(p=>p.propertyType))].sort()
  return <main className="min-h-screen bg-[#090D14] text-white"><div className="mx-auto max-w-7xl px-6 py-20">
    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Kolekcja PAMA Estates</p>
    <h1 className="font-serif text-4xl md:text-6xl">Nieruchomości w Dubaju</h1>
    <p className="mt-5 max-w-3xl text-[#C9CDD4]">Wybrane nieruchomości na sprzedaż i wynajem w Dubaju. Poznaj dostępne oferty, ich ceny i najważniejsze parametry.</p>
    <form className="my-10 grid gap-3 rounded-lg border border-white/10 bg-white/5 p-5 sm:grid-cols-2 lg:grid-cols-5" action="/pl/properties">
      <label className="text-sm">Oferta<select name="mode" defaultValue={mode} className="mt-2 w-full rounded bg-[#17202D] p-3"><option value="">Wszystkie</option><option value="SALE">Sprzedaż</option><option value="RENT">Wynajem</option></select></label>
      <label className="text-sm">Lokalizacja<select name="community" defaultValue={community} className="mt-2 w-full rounded bg-[#17202D] p-3"><option value="">Wszystkie</option>{communities.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
      <label className="text-sm">Rodzaj<select name="type" defaultValue={type} className="mt-2 w-full rounded bg-[#17202D] p-3"><option value="">Wszystkie</option>{types.map(t=><option key={t} value={t}>{t}</option>)}</select></label>
      <label className="text-sm">Sypialnie<select name="bedrooms" defaultValue={bedrooms ?? ""} className="mt-2 w-full rounded bg-[#17202D] p-3"><option value="">Wszystkie</option>{[0,1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}</select></label>
      <button className="self-end rounded bg-[#D4AF37] p-3 font-semibold text-[#0B0E15]">Pokaż oferty</button>
    </form>
    <p className="mb-6 text-sm text-[#C9CDD4]">Liczba ofert: {properties.length}</p>
    {properties.length === 0 && <section className="my-10 border border-white/10 bg-white/[0.035] px-6 py-14 text-center md:px-12">
      <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Indywidualne wyszukiwanie</p>
      <h2 className="mt-4 font-serif text-3xl md:text-4xl">Brak nieruchomości spełniających wybrane kryteria.</h2>
      <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#C9CDD4]">Zmień filtry lub opowiedz nam, czego szukasz. Możemy pomóc porównać dostępne oferty oraz wybrane możliwości poza otwartym rynkiem.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/pl/properties" className="rounded border border-white/25 px-6 py-3">Wyczyść filtry</Link>
        <Link href="/pl#zapytanie" className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Zleć wyszukiwanie</Link>
      </div>
    </section>}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties.map(p=>{
      const copy = publicationSafePolishCopy(p, approvedPolishCopyFor(p))
      const cover = p.images.find(i=>i.isCover) ?? p.images[0]
      return <Link key={p.listingReference} href={`/pl/properties/${p.slug}`} className="overflow-hidden rounded-lg border border-white/10 bg-[#111925] transition hover:border-[#D4AF37]/60">
        {cover && <div className="aspect-[4/3] bg-cover bg-center" role="img" aria-label={cover.alt} style={{ backgroundImage: `url('${cover.url}')` }} />}
        <div className="p-5"><p className="text-sm text-[#D4AF37]">{polishListingType(p.listingType)} · {p.community}</p><h2 className="mt-3 text-xl">{copy.title}</h2><p className="mt-3 text-sm text-[#C9CDD4]">{polishFacts(p)}</p><p className="mt-4 font-semibold">{polishMoney(p.askingPriceAed)}</p><span className="mt-4 inline-block text-sm text-[#D4AF37]">Zobacz szczegóły →</span></div>
      </Link>
    })}</div>
    <section className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
      <div><p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Dla właścicieli</p><h2 className="mt-4 font-serif text-2xl md:text-3xl">Dobra strategia sprzedaży zaczyna się przed publikacją ogłoszenia.</h2></div>
      <Link href="/pl/property-review" className="rounded border border-[#D4AF37]/50 px-6 py-3 text-center">Poproś o ocenę nieruchomości</Link>
    </section>
  </div></main>
}
