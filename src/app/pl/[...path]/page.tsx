import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { polishPages } from "@/lib/pl-content"

type Props = { params: Promise<{ path: string[] }> }

export function generateStaticParams() { return Object.keys(polishPages).map((path) => ({ path: path.split("/") })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = (await params).path.join("/")
  const page = polishPages[path]
  if (!page) return {}
  const en = `https://pamaestates.com/${path}`
  const pl = `https://pamaestates.com/pl/${path}`
  return { title: `${page.title} | PAMA Estates`, description: page.lead, robots: { index: false, follow: true }, alternates: { canonical: pl, languages: { en, pl } } }
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
      <div className="mt-12 grid gap-8 md:grid-cols-2">{page.sections.map((section) => <article key={section.heading} className="border-t border-[#D4AF37]/40 pt-6"><h2 className="text-2xl">{section.heading}</h2><p className="mt-4 leading-8 text-[#C9CDD4]">{section.body}</p></article>)}</div>
      {path === "privacy" && <p className="mt-8 text-sm text-[#C9CDD4]">Zapoznaj się z <Link href="/privacy" className="underline text-[#D4AF37]">obowiązującą polityką prywatności w języku angielskim</Link>.</p>}
      <div className="mt-12 flex flex-wrap gap-4"><Link href="/pl/properties" className="rounded border border-[#D4AF37]/60 px-6 py-3">Zobacz nieruchomości</Link><a className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]" href="https://wa.me/971559003888?text=Dzien%20dobry%2C%20kontaktuje%20sie%20przez%20strone%20PAMA%20Estates." target="_blank" rel="noopener noreferrer">Napisz na WhatsApp</a></div>
    </section>
  </main>
}
