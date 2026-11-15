import Image from "next/image"
import Link from "next/link"
import { getPublishedProperties } from "@/lib/public-properties"
import { approvedPolishCopyFor } from "@/lib/pl-approved-copy"
import { polishFacts, polishListingType, polishMoney, publicationSafePolishCopy } from "@/lib/pl-property"

/**
 * Renders strictly existing, validated PUBLIC listings. Empty feeds fail closed:
 * no artificial property, invented price or private source fallback.
 */
export default async function PolishFeaturedProperties() {
  const publiclyListed = await getPublishedProperties()
  const selected = publiclyListed.filter(property =>
    property.images.some(image => Boolean(image.url))
  ).slice(0, 3)

  return <section aria-labelledby="pl-featured-heading" className="border-t border-white/10 bg-[#0E141E] py-20 md:py-24">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Aktualna kolekcja PAMA Estates</p>
          <h2 id="pl-featured-heading" className="mt-4 font-serif text-4xl md:text-5xl">Poznaj dostępne nieruchomości.</h2>
          <p className="mt-5 max-w-2xl leading-8 text-[#C9CDD4]">Wybrane oferty z naszego aktualnego katalogu publicznego. Szczegóły każdej nieruchomości możesz omówić z doradcą po polsku.</p>
        </div>
        <Link href="/pl/properties" className="text-[#D4AF37] underline-offset-4 hover:underline">Zobacz wszystkie oferty →</Link>
      </div>
      {selected.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selected.map(property => {
            const image = property.images.find(item => item.isCover) ?? property.images[0]
            const copy = publicationSafePolishCopy(property, approvedPolishCopyFor(property))
            return <article key={property.listingReference} className="group overflow-hidden rounded border border-white/10 bg-[#111925] transition hover:border-[#D4AF37]/60">
              <Link href={`/pl/properties/${property.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#17202C]">
                  <Image src={image.url} alt={image.alt || copy.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4 rounded bg-[#090D14]/90 px-3 py-2 text-xs text-[#F5F2EA]">{polishListingType(property.listingType)}</span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#D4AF37]">{property.community}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug">{copy.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#C9CDD4]">{polishFacts(property)}</p>
                  <p className="mt-5 text-xl font-semibold">{polishMoney(property.askingPriceAed)}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-[#D4AF37]">Zobacz szczegóły nieruchomości →</span>
                </div>
              </Link>
            </article>
          })}
        </div>
      ) : (
        <div className="mt-10 border border-white/10 bg-white/[0.025] px-6 py-10 md:px-10">
          <h3 className="font-serif text-2xl">Szukasz konkretnej nieruchomości?</h3>
          <p className="mt-4 max-w-2xl leading-7 text-[#C9CDD4]">Jeżeli w tej chwili nie prezentujemy odpowiedniej oferty, opowiedz nam o swojej lokalizacji, budżecie i oczekiwaniach.</p>
          <Link href="/pl#zapytanie" className="mt-6 inline-block rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Poproś o indywidualne wyszukiwanie</Link>
        </div>
      )}
    </div>
  </section>
}
