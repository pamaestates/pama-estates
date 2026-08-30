import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#090C12] text-[#F5F2EA]">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E0C46B]">PAMA Estates · 404</p>
          <h1 className="mt-5 text-5xl leading-[0.98] md:text-7xl">This address is not part of the current collection.</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#9AA1AD] md:text-lg">
            The page may have moved, the link may be outdated, or the opportunity may no longer be available publicly. Private and off-market information is never exposed simply because a URL exists.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-7 py-3.5 font-semibold text-[#090C12] transition hover:bg-[#E0C46B]">
              Return Home
            </Link>
            <Link href="/opportunities" className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.035] px-7 py-3.5 font-medium transition hover:bg-white hover:text-black">
              Selected Opportunities
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
