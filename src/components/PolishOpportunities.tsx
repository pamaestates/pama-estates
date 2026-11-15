import Link from "next/link"
import { getPublishedOpportunities } from "@/lib/public-opportunities"
import { polishMoney, polishPropertyType } from "@/lib/pl-property"

/**
 * Shared, explicitly PUBLISHED records only. Marketing thesis, title and highlights
 * are not reproduced without reviewed Polish copy. Never read CRM/private data.
 */
export default function PolishOpportunities() {
  const opportunities = getPublishedOpportunities()

  return <section aria-labelledby="pl-opportunities-title" className="mt-14 border-t border-white/10 pt-12">
    <h2 id="pl-opportunities-title" className="font-serif text-3xl md:text-4xl">Wybrane możliwości inwestycyjne</h2>
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      <article className="border border-white/10 bg-white/[0.035] p-6">
        <span className="text-xs tracking-[0.25em] text-[#D4AF37]">01</span>
        <h3 className="mt-3 font-serif text-2xl">Zweryfikowane informacje</h3>
        <p className="mt-3 text-sm leading-7 text-[#C9CDD4]">Pokazujemy wyłącznie dane zatwierdzone do publikacji.</p>
      </article>
      <article className="border border-white/10 bg-white/[0.035] p-6">
        <span className="text-xs tracking-[0.25em] text-[#D4AF37]">02</span>
        <h3 className="mt-3 font-serif text-2xl">Cena ofertowa a transakcyjna</h3>
        <p className="mt-3 text-sm leading-7 text-[#C9CDD4]">Cena wywoławcza nie jest dowodem ceny uzyskanej w transakcji.</p>
      </article>
      <article className="border border-white/10 bg-white/[0.035] p-6">
        <span className="text-xs tracking-[0.25em] text-[#D4AF37]">03</span>
        <h3 className="mt-3 font-serif text-2xl">Poufność</h3>
        <p className="mt-3 text-sm leading-7 text-[#C9CDD4]">Dane prywatne i oferty off-market nie trafiają na stronę automatycznie.</p>
      </article>
    </div>

    {opportunities.length > 0
      ? <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {opportunities.map(opportunity => <article key={opportunity.slug} className="border border-white/10 bg-white/[0.035] p-7">
            <p className="text-sm uppercase tracking-[0.15em] text-[#D4AF37]">{opportunity.community}</p>
            <h3 className="mt-4 font-serif text-2xl">{polishPropertyType(opportunity.propertyType)} — {opportunity.community}</h3>
            <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
              {opportunity.bedrooms && <div><dt className="text-xs text-[#A4ADBB]">Sypialnie</dt><dd className="mt-1">{opportunity.bedrooms}</dd></div>}
              {opportunity.sizeSqFt != null && <div><dt className="text-xs text-[#A4ADBB]">Powierzchnia</dt><dd className="mt-1">{new Intl.NumberFormat("pl-PL").format(opportunity.sizeSqFt)} ft²</dd></div>}
              {opportunity.askingPriceAed != null && <div><dt className="text-xs text-[#A4ADBB]">Aktualna cena ofertowa</dt><dd className="mt-1">{polishMoney(opportunity.askingPriceAed)}</dd></div>}
            </dl>
            <p className="mt-6 text-sm leading-7 text-[#C9CDD4]">Pełny opis tej możliwości udostępniamy po sprawdzeniu aktualności informacji i zatwierdzeniu polskiej wersji treści.</p>
          </article>)}
        </div>
      : <div className="mt-10 border border-white/10 bg-white/[0.035] px-6 py-12 text-center md:px-12">
          <h3 className="font-serif text-3xl">Oferty przygotowujemy do publikacji</h3>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#C9CDD4]">Nie publikujemy fikcyjnych ogłoszeń. Nowe propozycje pojawią się tutaj po potwierdzeniu informacji i zgody na publikację. Możesz też zlecić indywidualne wyszukiwanie.</p>
          <Link href="/pl#zapytanie" className="mt-7 inline-flex rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Zleć wyszukiwanie nieruchomości</Link>
        </div>
    }
    <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-serif text-2xl">Jesteś właścicielem nieruchomości?</h3>
        <p className="mt-3 leading-7 text-[#C9CDD4]">Porozmawiajmy o strategii sprzedaży, wynajmu lub dyskretnym przedstawieniu oferty wybranym klientom.</p>
      </div>
      <Link href="/pl/property-review" className="rounded border border-[#D4AF37]/50 px-6 py-3 text-center">Poproś o ocenę nieruchomości</Link>
    </div>
  </section>
}
