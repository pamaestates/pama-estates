import Link from "next/link"
import type { Metadata } from "next"
import PolishInquiryForm from "@/components/PolishInquiryForm"

export const metadata: Metadata = {
  robots: { index: false, follow: true }, // Hold indexing until full Polish editorial approval.
  title: "Nieruchomości w Dubaju | PAMA Estates — Doradztwo po polsku",
  description: "Kupno, sprzedaż i inwestowanie w nieruchomości w Dubaju. Polski doradca, lokalne doświadczenie od 2008 roku i indywidualne podejście.",
  alternates: { canonical: "https://pamaestates.com/pl", languages: { en: "https://pamaestates.com", pl: "https://pamaestates.com/pl" } },
}

export default function PolishHome() {
  return <main className="min-h-screen bg-[#090D14] text-[#F5F2EA]">
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-36">
      <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#D4AF37]">PAMA Estates · Dubaj</p>
      <h1 className="max-w-4xl font-serif text-5xl leading-tight md:text-7xl">Nieruchomości w Dubaju.<br/><span className="text-[#D4AF37]">Sprawdzone możliwości. Świadome decyzje.</span></h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-[#C9CDD4]">Szukasz mieszkania, willi albo inwestycji w Dubaju? Pomagamy zrozumieć rynek, porównać oferty i wybrać nieruchomość, która rzeczywiście odpowiada Twoim potrzebom.</p>
      <div className="mt-9 flex flex-wrap gap-4"><Link className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]" href="/pl/properties">Zobacz nieruchomości</Link><Link className="rounded border border-[#D4AF37]/60 px-6 py-3" href="/pl/contact">Porozmawiajmy</Link></div>
    </section>
    <section className="border-t border-white/10 bg-[#0F1520] py-20"><div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
      <article><h2 className="text-xl text-[#D4AF37]">Lokalne doświadczenie</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Właściciel PAMA Estates mieszka w Dubaju od 2008 roku i zna rynek z perspektywy wielu cykli inwestycyjnych.</p></article>
      <article><h2 className="text-xl text-[#D4AF37]">Inżynierskie spojrzenie</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Oceniamy nie tylko lokalizację i cenę, lecz także jakość, układ oraz potencjał nieruchomości.</p></article>
      <article><h2 className="text-xl text-[#D4AF37]">Indywidualne doradztwo</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Mniej przypadkowych ofert. Więcej rozmowy o Twoich celach, budżecie i ryzyku.</p></article>
    </div></section>
    <section id="zapytanie" className="mx-auto max-w-6xl px-6 py-20"><PolishInquiryForm kind="buyer" /></section>
  </main>
}
