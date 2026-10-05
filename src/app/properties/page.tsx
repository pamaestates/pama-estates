import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { getPublishedProperties } from "@/lib/public-properties"

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Dubai | PAMA Estates",
  description: "Explore a curated collection of Dubai properties represented by PAMA Estates, with verified facts, considered presentation and direct advisory access.",
  alternates: { canonical: "https://pamaestates.com/properties" },
}

function money(value?: number) {
  if (!value) return "Price on request"
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(value)
}

function number(value?: number) {
  if (value == null) return "—"
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function unique(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())))].sort((a, b) => a.localeCompare(b))
}

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [properties, query] = await Promise.all([getPublishedProperties(), searchParams])
  const mode = typeof query.mode === "string" ? query.mode.toUpperCase() : ""
  const community = typeof query.community === "string" ? query.community : ""
  const type = typeof query.type === "string" ? query.type : ""
  const bedrooms = typeof query.bedrooms === "string" ? Number(query.bedrooms) : null

  const filtered = properties.filter((property) => {
    if (mode === "SALE" || mode === "RENT") if (property.listingType !== mode) return false
    if (community && property.community !== community) return false
    if (type && property.propertyType !== type) return false
    if (bedrooms != null && Number.isFinite(bedrooms) && property.bedrooms !== bedrooms) return false
    return true
  })

  const communities = unique(properties.map((property) => property.community))
  const propertyTypes = unique(properties.map((property) => property.propertyType))

  return (
    <main className="min-h-screen bg-[#090D14] text-white">
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0D131D]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(212,175,55,0.08),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.42em] text-[#D4AF37]">The PAMA Collection</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.03] tracking-[-0.035em] md:text-6xl lg:text-7xl">
            Exceptional Dubai property. Selected with purpose.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-gray-300 md:text-lg">
            A curated collection of residences and investment opportunities represented by PAMA Estates — presented with verified facts, considered context and direct advisory access.
          </p>

          <form className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[0.8fr_1.25fr_1fr_0.8fr_auto]" action="/properties">
            <FilterSelect name="mode" label="Intent" defaultValue={mode} options={["SALE", "RENT"]} />
            <FilterSelect name="community" label="Community" defaultValue={community} options={communities} />
            <FilterSelect name="type" label="Property type" defaultValue={type} options={propertyTypes} />
            <FilterSelect name="bedrooms" label="Bedrooms" defaultValue={bedrooms == null ? "" : String(bedrooms)} options={["1", "2", "3", "4", "5", "6"]} />
            <button className="min-h-20 bg-[#D4AF37] px-7 text-sm font-semibold text-black transition hover:bg-[#E1C259]">Explore properties</button>
          </form>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">Selected properties</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Current collection</h2>
            </div>
            <p className="text-sm text-gray-500">{filtered.length} {filtered.length === 1 ? "property" : "properties"}</p>
          </div>

          {filtered.length ? (
            <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-14 lg:grid-cols-2">
              {filtered.map((property) => {
                const cover = property.images.find((image) => image.isCover) ?? property.images[0]
                return (
                  <article key={property.listingReference} className="group">
                    <Link href={`/properties/${property.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#111722]">
                        {cover ? (
                          <Image
                            src={cover.url}
                            alt={cover.alt || property.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                          />
                        ) : null}
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                          <span className="border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                            {property.listingType === "SALE" ? "For Sale" : "For Rent"}
                          </span>
                          {property.completionStatus ? <span className="border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">{property.completionStatus}</span> : null}
                        </div>
                      </div>

                      <div className="pt-6">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{property.community}{property.project ? ` · ${property.project}` : ""}</p>
                        <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">{property.title}</h3>
                        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-5">
                          <p className="text-xl font-medium">{money(property.askingPriceAed)}</p>
                          <p className="text-sm text-gray-400">{number(property.bedrooms)} bed · {number(property.bathrooms)} bath{property.sizeSqFt ? ` · ${Math.round(property.sizeSqFt).toLocaleString()} sq ft` : ""}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                          <span className="text-gray-400">
                            {property.pricePositionPct != null && property.pricePositionPct < 0 ? `${Math.abs(property.pricePositionPct).toFixed(1)}% below original price` : property.view || "View property details"}
                          </span>
                          <span className="font-medium text-white transition group-hover:text-[#D4AF37]">View residence →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="mt-10 border border-white/10 bg-white/[0.025] px-7 py-16 text-center md:px-12 md:py-20">
              <p className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">Curated, not crowded</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">No public property matches this selection right now.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">Tell us what you are looking for and we can search both public inventory and suitable private opportunities.</p>
              <Link href="/#private-access" className="mt-8 inline-flex bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:bg-[#E1C259]">Request private search</Link>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0D131D]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:py-20">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">For owners</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.02em] md:text-4xl">A property deserves the right positioning before it deserves more exposure.</h2>
          </div>
          <Link href="/property-review" className="inline-flex items-center justify-center border border-white/20 px-7 py-3.5 font-medium transition hover:bg-white hover:text-black">Request property review</Link>
        </div>
      </section>
    </main>
  )
}

function FilterSelect({ name, label, defaultValue, options }: { name: string; label: string; defaultValue: string; options: string[] }) {
  return (
    <label className="bg-[#0D131D] px-5 py-4">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-gray-500">{label}</span>
      <select name={name} defaultValue={defaultValue} className="mt-2 w-full bg-transparent text-sm text-white outline-none">
        <option value="" className="bg-[#0D131D]">Any</option>
        {options.map((option) => <option key={option} value={option} className="bg-[#0D131D]">{option.replaceAll("_", " ")}</option>)}
      </select>
    </label>
  )
}
