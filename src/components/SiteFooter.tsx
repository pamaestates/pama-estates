import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0A0D13]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-10">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em] uppercase">
            PAMA Estates
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Ultra-prime &amp; off-market real estate advisory in Dubai.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-400">
            <Link href="/opportunities" className="transition hover:text-[#D4AF37]">
              Selected Opportunities
            </Link>
            <Link href="/property-review" className="transition hover:text-[#D4AF37]">
              Owner Property Review
            </Link>
            <Link href="/areas" className="transition hover:text-[#D4AF37]">
              Prime Areas
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-300 md:items-end">
          <a
            href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#D4AF37] transition"
          >
            WhatsApp: +971 55 900 3888
          </a>
          <Link
            href="/contact"
            className="text-left hover:text-[#D4AF37] transition md:text-right"
          >
            Contact page
          </Link>
        </div>
      </div>
    </footer>
  )
}
