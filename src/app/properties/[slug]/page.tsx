import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPublishedPropertyBySlug } from "@/lib/public-properties"

function money(value?: number) {
  if (!value) return "Price on request"
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value)
}

function number(value?: number) {
  if (value == null) return "—"
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const property = await getPublishedPropertyBySlug(slug)
  if (!property) return {}
  const cover = property.images.find((image) => image.isCover) ?? property.images[0]
  const title = `${property.title} | ${property.community} | PAMA Estates`
  const description = property.description.slice(0, 155)
  return {
    title,
    description,
    alternates: { canonical: `https://pamaestates.com/properties/${property.slug}` },
    openGraph: {
      title,
      description,
      url: `https://pamaestates.com/properties/${property.slug}`,
      type: "website",
      images: cover ? [{ url: cover.url, alt: cover.alt || property.title }] : undefined,
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPublishedPropertyBySlug(slug)
  if (!property) notFound()

  const images = property.images
  const hero = images.find((image) => image.isCover) ?? images[0]
  const gallery = images.filter((image) => image.url !== hero?.url).slice(0, 4)
  const whatsappText = encodeURIComponent(`Hello PAMA Estates, I would like to discuss ${property.title} (${property.listingReference}).`)
  const whatsappHref = `https://wa.me/971559003888?text=${whatsappText}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Offer",
    url: `https://pamaestates.com/properties/${property.slug}`,
    priceCurrency: "AED",
    ...(property.askingPriceAed ? { price: property.askingPriceAed } : {}),
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": property.propertyType.toUpperCase().includes("VILLA") ? "House" : "Apartment",
      name: property.title,
      description: property.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.community,
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      ...(property.bedrooms != null ? { numberOfBedrooms: property.bedrooms } : {}),
      ...(property.bathrooms != null ? { numberOfBathroomsTotal: property.bathrooms } : {}),
      ...(property.sizeSqFt ? { floorSize: { "@type": "QuantitativeValue", value: property.sizeSqFt, unitCode: "FTK" } } : {}),
      image: property.images.map((image) => image.url),
    },
  }

  return (
    <main className="min-h-screen bg-[#090D14] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="border-t border-white/10 bg-[#0D131D]">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-10 lg:pb-14 lg:pt-16">
          <Link href="/properties" className="text-xs uppercase tracking-[0.25em] text-gray-500 transition hover:text-white">← The PAMA Collection</Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">{property.community}{property.project ? ` · ${property.project}` : ""}</p>
              <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-6xl">{property.title}</h1>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
                <span>{number(property.bedrooms)} bedroom{property.bedrooms === 1 ? "" : "s"}</span>
                <span>{number(property.bathrooms)} bathroom{property.bathrooms === 1 ? "" : "s"}</span>
                {property.sizeSqFt ? <span>{Math.round(property.sizeSqFt).toLocaleString()} sq ft</span> : null}
                {property.completionStatus ? <span>{property.completionStatus}</span> : null}
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">{property.listingType === "SALE" ? "Asking price" : "Annual rent"}</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.02em]">{money(property.askingPriceAed)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-0 md:px-6">
        <div className="relative aspect-[16/10] max-h-[78vh] overflow-hidden bg-[#111722] md:aspect-[16/8]">
          {hero ? <Image src={hero.url} alt={hero.alt || property.title} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 to-transparent p-5 pt-20 md:p-8">
            <div className="flex flex-wrap gap-2">
              {property.completionStatus ? <Badge>{property.completionStatus}</Badge> : null}
              {property.pricePositionPct != null && property.pricePositionPct < 0 ? <Badge>{Math.abs(property.pricePositionPct).toFixed(1)}% below original price</Badge> : null}
            </div>
            <span className="border border-white/25 bg-black/30 px-3 py-2 text-xs backdrop-blur-sm">{images.length} photos</span>
          </div>
        </div>
      </section>

      {gallery.length ? (
        <section className="mx-auto max-w-7xl px-6 py-6 md:px-10 md:py-10">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {gallery.map((image) => (
              <div key={image.url} className="relative aspect-[4/3] overflow-hidden bg-[#111722]">
                <Image src={image.url} alt={image.alt || property.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 hover:scale-[1.02]" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">The residence</p>
            <div className="mt-5 whitespace-pre-line text-base leading-8 text-gray-300 md:text-lg">{property.description}</div>

            <div className="mt-14 border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Key facts</p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
                <Fact label="Property type" value={property.propertyType.replaceAll("_", " ")} />
                <Fact label="Bedrooms" value={number(property.bedrooms)} />
                <Fact label="Bathrooms" value={number(property.bathrooms)} />
                <Fact label="BUA" value={property.sizeSqFt ? `${Math.round(property.sizeSqFt).toLocaleString()} sq ft` : "—"} />
                {property.plotSqFt ? <Fact label="Plot" value={`${Math.round(property.plotSqFt).toLocaleString()} sq ft`} /> : null}
                <Fact label="Parking" value={number(property.parkingSpaces)} />
                {property.furnishedStatus ? <Fact label="Furnishing" value={property.furnishedStatus} /> : null}
                {property.view ? <Fact label="View" value={property.view} /> : null}
                {property.completion ? <Fact label="Completion" value={property.completion} /> : null}
              </div>
            </div>

            {property.amenities.length ? (
              <div className="mt-14 border-t border-white/10 pt-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Amenities & features</p>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 text-sm text-gray-300 sm:grid-cols-2">
                  {property.amenities.map((amenity) => <p key={amenity} className="border-b border-white/10 py-3">{amenity.replaceAll("-", " ")}</p>)}
                </div>
              </div>
            ) : null}

            {(property.originalPriceAed || property.highlights.length) ? (
              <div className="mt-14 border-t border-white/10 pt-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">PAMA perspective</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em]">Price position & asset context</h2>
                <div className="mt-7 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
                  <Metric label="Current asking" value={money(property.askingPriceAed)} />
                  <Metric label="Original price" value={money(property.originalPriceAed)} />
                  <Metric label="Position" value={property.pricePositionPct == null ? "—" : `${property.pricePositionPct > 0 ? "+" : ""}${property.pricePositionPct.toFixed(1)}%`} />
                </div>
                {property.highlights.length ? (
                  <div className="mt-8 space-y-3">
                    {property.highlights.map((highlight) => <p key={highlight} className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-300">{highlight}</p>)}
                  </div>
                ) : null}
                <p className="mt-5 text-xs leading-6 text-gray-600">Price-position figures describe current asking context only. They are not completed transaction values, valuations or guarantees of future performance.</p>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-white/10 bg-[#0D131D] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">Private advisory</p>
              <h2 className="mt-4 text-2xl font-semibold">Discuss this property</h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">Request a viewing, confirm current availability or discuss whether this property fits your requirement.</p>
              <Link href={`/contact?property=${encodeURIComponent(property.listingReference)}`} className="mt-7 flex w-full items-center justify-center bg-[#D4AF37] px-6 py-3.5 font-semibold text-black transition hover:bg-[#E1C259]">Request a viewing</Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-3 flex w-full items-center justify-center border border-white/20 px-6 py-3.5 font-medium transition hover:bg-white hover:text-black">WhatsApp</a>
              {property.advisor?.name ? <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-6 text-gray-500">Represented by {property.advisor.name}, PAMA Estates.</p> : null}
            </div>

            <div className="mt-5 border border-white/10 bg-white/[0.025] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">DLD advertisement verification</p>
              <h3 className="mt-3 text-xl font-semibold">Verify by QR</h3>
              <p className="mt-3 text-sm leading-7 text-gray-400">Scan the official Madmoun QR code to verify the advertisement with Dubai Land Department.</p>
              <div className="mt-6 inline-flex bg-white p-3">
                <Image src={property.regulatoryVerification.qrImageUrl} alt="Dubai Land Department Madmoun advertisement verification QR code" width={180} height={180} className="h-40 w-40 object-contain md:h-44 md:w-44" />
              </div>
              <p className="mt-4 text-[11px] leading-5 text-gray-600">For privacy and anti-bypass protection, PAMA Estates does not display the underlying Trakheesi permit number on the public website.</p>
            </div>
          </aside>
        </div>
      </section>

      {property.floorPlans.length ? (
        <section className="border-t border-white/10 bg-[#0D131D]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
            <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Floor plan</p>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {property.floorPlans.map((plan) => <a key={plan.url} href={plan.url} target="_blank" rel="noreferrer" className="border border-white/10 bg-white p-5 text-sm font-medium text-black">Open {plan.label || "floor plan"} ↗</a>)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-16 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Need a different fit?</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.025em] md:text-4xl">Tell us what matters. We will search beyond the obvious inventory.</h2>
          </div>
          <Link href="/#private-access" className="inline-flex items-center justify-center bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#E1C259]">Request private search</Link>
        </div>
      </section>
    </main>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">{children}</span>
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[10px] uppercase tracking-[0.22em] text-gray-600">{label}</p><p className="mt-2 text-sm font-medium text-gray-200">{value}</p></div>
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#0D131D] p-5"><p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">{label}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>
}
