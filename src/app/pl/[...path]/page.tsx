import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { polishSeoRobots } from "@/lib/pl-seo-release"
import { polishPages } from "@/lib/pl-content"
import { polishEditorialDepth } from "@/lib/pl-editorial-depth"
import PolishInquiryForm from "@/components/PolishInquiryForm"
import PolishAreasDirectory from "@/components/PolishAreasDirectory"
import PolishOpportunities from "@/components/PolishOpportunities"
import { polishWhatsAppHref } from "@/lib/pl-whatsapp"

type Props = { params: Promise<{ path: string[] }> }

/** Intent-focused metadata for Polish search queries; editorial content remains the source of page facts. */
const polishSearchMetadata: Record<string, { title: string; description: string }> = {
  "areas/palm-jumeirah": {
    title: "Nieruchomości Palm Jumeirah — wille i apartamenty w Dubaju",
    description: "Palm Jumeirah: wille przy plaży, apartamenty i penthouse’y. Poznaj lokalizację, standard nieruchomości i kluczowe kwestie przed zakupem w Dubaju.",
  },
  "areas/dubai-marina": {
    title: "Apartamenty Dubai Marina — nieruchomości w Dubaju",
    description: "Apartamenty w Dubai Marina: porównaj budynki, widoki, opłaty i możliwości najmu. Doradztwo w zakupie nieruchomości po polsku.",
  },
  "areas/emirates-living": {
    title: "Emirates Living — wille w The Springs, Meadows i Lakes",
    description: "Wille Emirates Living: The Springs, The Meadows, The Lakes i Emirates Hills. Poznaj różnice między osiedlami i kryteria wyboru domu w Dubaju.",
  },
  "luxury-villas-dubai": {
    title: "Luksusowe wille w Dubaju — zakup i doradztwo",
    description: "Luksusowe wille w Dubaju: porównaj działkę, lokalizację, prywatność, standard i warunki zakupu. Indywidualne doradztwo po polsku.",
  },
  "off-market-properties-dubai": {
    title: "Nieruchomości off-market w Dubaju — dyskretne oferty",
    description: "Dyskretne możliwości zakupu nieruchomości w Dubaju. Dostęp do informacji zależy od zgód właścicieli; oferty oceniamy indywidualnie.",
  },
  "property-review": {
    title: "Sprzedaż nieruchomości w Dubaju — analiza i strategia",
    description: "Planujesz sprzedaż lub wynajem nieruchomości w Dubaju? Porównaj pozycję rynkową, standard i strategię z polskojęzycznym doradcą.",
  },
  "palm-jumeirah-villas-for-sale": {
    title: "Wille na sprzedaż Palm Jumeirah — Dubaj",
    description: "Wille na Palm Jumeirah: lokalizacja, dostęp do plaży, standard, działka i możliwości modernizacji. Omów kryteria zakupu po polsku.",
  },
}

export function generateStaticParams() { return Object.keys(polishPages).map((path) => ({ path: path.split("/") })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).path.join("/")
  const page = polishPages[path]
  if (!page) return {}
  const en = `https://www.pamaestates.com/${path}`
  const pl = `https://www.pamaestates.com/pl/${path}`
  // PL privacy is a notice referring to the English policy, not an equivalent legal translation.
  const alternates: Metadata["alternates"] = path === "privacy"
    ? { canonical: pl }
    : { canonical: pl, languages: { en, pl } }
  const search = polishSearchMetadata[path]
  return { title: `${search?.title ?? page.title} | PAMA Estates`, description: search?.description ?? page.lead, robots: polishSeoRobots({ legalApproved: path !== "privacy" }), alternates }
}

export default async function PolishEditorialPage({ params }: Props) {
  const path = (await params).path.join("/")
  const page = polishPages[path]
  if (!page) notFound()
  return <main className="min-h-screen bg-[#090D14] text-[#F5F2EA]">
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">PAMA Estates · Doradztwo po polsku</p>
      <h1 className="max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{page.title}</h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C9CDD4]">{page.lead}</p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">{[...page.sections, ...(polishEditorialDepth[path] ?? [])].map((section) => <article key={section.heading} className="border-t border-[#D4AF37]/40 pt-6"><h2 className="text-2xl">{section.heading}</h2><p className="mt-4 leading-8 text-[#C9CDD4]">{section.body}</p></article>)}</div>
      {path === "areas" && <PolishAreasDirectory />}
      {path === "opportunities" && <PolishOpportunities />}
      {(path === "property-review" || path === "sell-with-us") && <div className="mt-14 border-t border-white/10 pt-12"><PolishInquiryForm kind="owner" /></div>}
      {path === "privacy" && <p className="mt-8 text-sm text-[#C9CDD4]">Zobacz także <Link href="/privacy" className="underline text-[#D4AF37]">angielską wersję polityki prywatności</Link>.</p>}
      <div className="mt-12 flex flex-wrap gap-4">
        {(path === "contact" || path === "about") && <Link href="/pl#zapytanie" className="rounded border border-white/25 px-6 py-3">Szukam nieruchomości</Link>}
        {(path === "contact" || path === "about") && <Link href="/pl/property-review" className="rounded border border-white/25 px-6 py-3">Chcę sprzedać lub wynająć</Link>}
        <Link href="/pl/properties" className="rounded border border-[#D4AF37]/60 px-6 py-3">Zobacz nieruchomości</Link><a className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]" href={polishWhatsAppHref(`/pl/${path}`, page.title)} target="_blank" rel="noopener noreferrer">Napisz na WhatsApp</a></div>
    </section>
  </main>
}
