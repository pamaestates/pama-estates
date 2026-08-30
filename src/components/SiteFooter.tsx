import Link from "next/link"

const whatsappHref =
  "https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#070A0F]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#E0C46B]">PAMA Estates</p>
            <h2 className="mt-4 text-3xl leading-tight text-[#F5F2EA] md:text-4xl">
              Private Dubai real estate advisory, built around context and discretion.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#9AA1AD]">
              Prime and ultra-prime buyer, investor and owner advisory across Dubai, including selected privately sourced opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:justify-self-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#686F7A]">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-[#C9CDD4]">
                <Link href="/opportunities" className="transition hover:text-[#E0C46B]">Opportunities</Link>
                <Link href="/areas" className="transition hover:text-[#E0C46B]">Prime Areas</Link>
                <Link href="/about" className="transition hover:text-[#E0C46B]">About</Link>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#686F7A]">Advisory</p>
              <div className="mt-4 flex flex-col gap-3 text-[#C9CDD4]">
                <Link href="/property-review" className="transition hover:text-[#E0C46B]">Owner Review</Link>
                <Link href="/sell-with-us" className="transition hover:text-[#E0C46B]">Sell or Rent</Link>
                <Link href="/contact" className="transition hover:text-[#E0C46B]">Contact</Link>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#686F7A]">Direct</p>
              <div className="mt-4 flex flex-col gap-3 text-[#C9CDD4]">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#E0C46B]">WhatsApp</a>
                <a href="mailto:info@pamaestates.com" className="transition hover:text-[#E0C46B]">Email</a>
                <Link href="/privacy" className="transition hover:text-[#E0C46B]">Privacy</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs leading-6 text-[#686F7A] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PAMA Estates L.L.C. All rights reserved.</p>
          <p>Dubai, United Arab Emirates · Family Founded. Legacy Focused.</p>
        </div>
      </div>
    </footer>
  )
}
