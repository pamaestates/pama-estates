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
      <div className="mt-9 flex flex-wrap gap-4"><Link className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]" href="/pl/properties">Zobacz nieruchomości</Link><Link className="rounded border border-[#D4AF37]/60 px-6 py-3" href="/pl#zapytanie">Szukam nieruchomości</Link><Link className="rounded border border-white/25 px-6 py-3" href="/pl/property-review">Chcę sprzedać lub wynająć</Link></div>
    </section>
    <section className="border-t border-white/10 bg-[#0F1520] py-20"><div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
      <article><h2 className="text-xl text-[#D4AF37]">Lokalne doświadczenie</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Właściciel PAMA Estates mieszka w Dubaju od 2008 roku i zna rynek z perspektywy wielu cykli inwestycyjnych.</p></article>
      <article><h2 className="text-xl text-[#D4AF37]">Inżynierskie spojrzenie</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Oceniamy nie tylko lokalizację i cenę, lecz także jakość, układ oraz potencjał nieruchomości.</p></article>
      <article><h2 className="text-xl text-[#D4AF37]">Indywidualne doradztwo</h2><p className="mt-3 leading-7 text-[#C9CDD4]">Mniej przypadkowych ofert. Więcej rozmowy o Twoich celach, budżecie i ryzyku.</p></article>
    </div></section>
    <section className="border-t border-white/10 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Perspektywa PAMA Estates</p>
        <div className="mt-5 grid gap-9 lg:grid-cols-2 lg:items-end">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">W nieruchomościach liczy się więcej niż cena ofertowa.</h2>
          <p className="text-lg leading-8 text-[#C9CDD4]">Analizujemy położenie, jakość budynku lub willi, koszty utrzymania, warunki zakupu oraz możliwości późniejszej sprzedaży lub wynajmu. Rekomendacje dopasowujemy do celu, nie do liczby dostępnych ogłoszeń.</p>
        </div>
        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Cena i pozycja rynkowa", "Porównujemy cenę z dostępnymi, odpowiednimi ofertami i realiami danej lokalizacji."],
            ["02", "Jakość nieruchomości", "Analizujemy układ, stan techniczny, standard i cechy, które mogą wpływać na wartość."],
            ["03", "Dopasowanie do celu", "Inne kryteria liczą się przy zakupie domu, a inne przy inwestycji na wynajem."],
            ["04", "Negocjacje i transakcja", "Pomagamy zrozumieć warunki zakupu, ryzyka i kolejne etapy procesu."],
          ].map(([number, title, body]) => <article key={number} className="rounded border border-white/10 bg-white/[0.03] p-6"><p className="text-sm text-[#D4AF37]">{number}</p><h3 className="mt-5 font-serif text-2xl">{title}</h3><p className="mt-4 text-sm leading-7 text-[#C9CDD4]">{body}</p></article>)}
        </div>
      </div>
    </section>
    <section className="border-t border-white/10 bg-[#101622] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">W czym możemy pomóc?</p>
        <h2 className="mt-5 font-serif text-4xl md:text-5xl">Inne cele. Indywidualna strategia.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="border-t border-[#D4AF37]/50 pt-6"><h3 className="font-serif text-2xl">Kupno nieruchomości</h3><p className="mt-4 leading-7 text-[#C9CDD4]">Od rodzinnego apartamentu po rezydencję premium. Zaczynamy od Twoich potrzeb, lokalizacji i budżetu.</p><Link href="/pl#zapytanie" className="mt-5 inline-block text-[#D4AF37]">Opisz, czego szukasz →</Link></article>
          <article className="border-t border-[#D4AF37]/50 pt-6"><h3 className="font-serif text-2xl">Sprzedaż i wynajem</h3><p className="mt-4 leading-7 text-[#C9CDD4]">Oceniamy pozycję nieruchomości, sposób prezentacji i docelową grupę kupujących lub najemców.</p><Link href="/pl/property-review" className="mt-5 inline-block text-[#D4AF37]">Porozmawiajmy o Twojej nieruchomości →</Link></article>
          <article className="border-t border-[#D4AF37]/50 pt-6"><h3 className="font-serif text-2xl">Dyskretne możliwości</h3><p className="mt-4 leading-7 text-[#C9CDD4]">W wybranych przypadkach szukamy nieruchomości także poza otwartym rynkiem, z poszanowaniem poufności.</p><Link href="/pl/off-market-properties-dubai" className="mt-5 inline-block text-[#D4AF37]">Dowiedz się więcej →</Link></article>
        </div>
      </div>
    </section>
    <section className="border-t border-white/10 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Lokalizacje</p><h2 className="mt-4 font-serif text-4xl md:text-5xl">Poznaj dzielnice Dubaju.</h2></div>
          <Link href="/pl/areas" className="text-[#D4AF37]">Wszystkie lokalizacje →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Palm Jumeirah", "/pl/areas/palm-jumeirah", "Wille nad morzem, rezydencje i apartamenty premium."],
            ["Emirates Living", "/pl/areas/emirates-living", "Dojrzałe osiedla willowe, przestrzeń i rodzinny styl życia."],
            ["Dubai Marina", "/pl/areas/dubai-marina", "Apartamenty, marina i dynamiczny rynek miejski."],
            ["Jumeirah Islands", "/pl/areas/jumeirah-islands", "Wille, zieleń i prywatność."],
            ["Jumeirah Park", "/pl/areas/jumeirah-park", "Domy rodzinne i potencjał modernizacji."],
            ["Palm Jebel Ali", "/pl/areas/palm-jebel-ali", "Nadmorski projekt o długoterminowym horyzoncie."],
          ].map(([title, href, body]) => <Link href={href} key={href} className="rounded border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#D4AF37]/60"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-[#C9CDD4]">{body}</p><span className="mt-5 inline-block text-sm text-[#D4AF37]">Poznaj lokalizację →</span></Link>)}
        </div>
      </div>
    </section>
    <section className="border-t border-white/10 bg-[#101622] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Dla właścicieli</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">Zanim wystawisz nieruchomość na sprzedaż, poznaj jej pozycję na rynku.</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#C9CDD4]">Właściwe przygotowanie oferty zaczyna się od analizy nieruchomości, porównywalnych ofert i strategii dostosowanej do Twoich oczekiwań.</p>
        <Link href="/pl/property-review" className="mt-7 inline-block rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Poproś o ocenę nieruchomości</Link>
      </div>
    </section>
    <section id="zapytanie" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-20"><PolishInquiryForm kind="buyer" /></section>
  </main>
}
