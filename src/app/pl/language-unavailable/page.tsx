import Link from "next/link"
import type { Metadata } from "next"
import { safeEnglishSourcePath } from "@/lib/pl-routing"

export const metadata: Metadata = {
  title: "Tłumaczenie tej podstrony jest w przygotowaniu | PAMA Estates",
  description: "Ta podstrona nie jest jeszcze dostępna w języku polskim.",
  robots: { index: false, follow: true },
}

type Props = { searchParams: Promise<{ from?: string | string[] }> }

export default async function LanguageUnavailablePage({ searchParams }: Props) {
  const params = await searchParams
  const from = typeof params.from === "string" ? params.from : null
  const source = safeEnglishSourcePath(from)
  return <main className="min-h-screen bg-[#090D14] text-white">
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">PAMA Estates · Polski</p>
      <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">Ta podstrona nie jest jeszcze dostępna po polsku</h1>
      <p className="mt-6 text-lg leading-8 text-[#C9CDD4]">
        Nie przekierowujemy Cię na stronę główną bez wyjaśnienia. Możesz otworzyć angielską wersję tej podstrony lub przejść do polskiej oferty nieruchomości.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        {source && <Link href={source} className="rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#0B0E15]">Otwórz stronę po angielsku</Link>}
        <Link href="/pl/properties" className="rounded border border-white/30 px-6 py-3">Zobacz nieruchomości po polsku</Link>
        <Link href="/pl" className="rounded border border-white/30 px-6 py-3">Polska strona główna</Link>
      </div>
    </section>
  </main>
}
