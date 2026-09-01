"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Areas", "/areas"],
  ["Opportunities", "/opportunities"],
  ["Owner Review", "/property-review"],
  ["Contact", "/contact"],
] as const

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const closeMobileMenu = () => setMobileMenuOpen(false)

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090C12]/88 shadow-[0_14px_44px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-left" onClick={closeMobileMenu} aria-label="PAMA Estates home">
          <Image
            src="/logo.png"
            alt="PAMA Estates"
            width={224}
            height={112}
            priority
            className="h-12 w-auto shrink-0 object-contain md:h-14"
          />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.22em] text-[#F5F2EA] md:text-sm">
              PAMA Estates
            </p>
            <p className="mt-1 truncate text-[8px] uppercase tracking-[0.28em] text-[#9AA1AD] md:text-[9px]">
              Family Founded. Legacy Focused.
            </p>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-[13px] text-[#C9CDD4] xl:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`relative py-3 transition hover:text-[#E0C46B] ${isActive(href) ? "text-white" : ""}`}
            >
              {label}
              {isActive(href) ? <span className="absolute inset-x-0 bottom-1 h-px bg-[#D4AF37]" /> : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-white/12 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37]/45 hover:bg-white/[0.06] hover:text-[#E0C46B]"
          >
            WhatsApp
          </a>
          <Link
            href="/#private-access"
            className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#090C12] shadow-[0_8px_30px_rgba(212,175,55,0.14)] transition hover:-translate-y-0.5 hover:bg-[#E0C46B]"
          >
            Request Access
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-white transition hover:border-[#D4AF37]/40 hover:text-[#E0C46B] xl:hidden"
        >
          <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex flex-col gap-1.5" aria-hidden="true">
            <span className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-current transition ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {mobileMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-white/[0.08] bg-[#090C12]/98 px-6 py-6 shadow-2xl backdrop-blur-2xl xl:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1 text-sm text-[#C9CDD4]">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={closeMobileMenu}
                aria-current={isActive(href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 transition hover:bg-white/[0.04] hover:text-[#E0C46B] ${isActive(href) ? "bg-white/[0.04] text-white" : ""}`}
              >
                {label}
              </Link>
            ))}
            <Link href="/#private-access" onClick={closeMobileMenu} className="rounded-md px-3 py-3 transition hover:bg-white/[0.04] hover:text-[#E0C46B]">
              Private Access
            </Link>

            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-2">
              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/12 bg-white/[0.035] px-4 py-3 font-medium text-white transition hover:border-[#D4AF37]/45 hover:text-[#E0C46B]"
              >
                WhatsApp
              </a>
              <Link href="/#private-access" onClick={closeMobileMenu} className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-[#090C12] transition hover:bg-[#E0C46B]">
                Request Access
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
