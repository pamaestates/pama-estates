import Link from "next/link"

export default function PolishNotFound() {
  return <main className="min-h-[70vh] bg-[#090C12] text-[#F5F2EA]">
    <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-6 py-20 md:px-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E0C46B]">PAMA Estates · 404</p>
        <h1 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">Nie znaleziono strony</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[#9AA1AD] md:text-lg">
          Ten adres może być nieaktualny albo strona została przeniesiona. Oferty prywatne i poza rynkiem publicznym nie są ujawniane na podstawie samego adresu strony.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/pl" className="rounded-md bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#090C12]">Strona główna</Link>
          <Link href="/pl/properties" className="rounded-md border border-white/15 px-7 py-3.5 font-medium">Przeglądaj nieruchomości</Link>
        </div>
      </div>
    </section>
  </main>
}
