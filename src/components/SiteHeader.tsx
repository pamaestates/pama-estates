"use client"

import { useState } from "react"
import Link from "next/link"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0E15]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-4 text-left"
          onClick={closeMobileMenu}
        >
          <img
            src="/logo.png"
            alt="PAMA Estates"
            className="h-12 w-auto object-contain md:h-[68px]"
          />

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase md:text-lg">
              PAMA Estates
            </p>
            <p className="text-[9px] text-gray-400 tracking-[0.28em] uppercase md:text-[10px]">
              Family Founded. Legacy Focused.
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-gray-200 lg:flex">
          <Link href="/" className="hover:text-[#D4AF37] transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#D4AF37] transition">
            About
          </Link>
          <Link href="/areas" className="hover:text-[#D4AF37] transition">
            Areas
          </Link>
          <a
            href="/#private-access"
            className="hover:text-[#D4AF37] transition"
          >
            Private Access
          </a>
          <Link href="/contact" className="hover:text-[#D4AF37] transition">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition"
          >
            WhatsApp
          </a>

          <a
            href="/#private-access"
            className="inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
          >
            Request Access
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] lg:hidden"
        >
          <span className="sr-only">Open menu</span>
          <div className="flex flex-col gap-1.5">
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
            <span className="block h-[2px] w-5 bg-current" />
          </div>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0E15]/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-5 text-sm text-gray-200">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="hover:text-[#D4AF37] transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="hover:text-[#D4AF37] transition"
            >
              About
            </Link>
            <Link
              href="/areas"
              onClick={closeMobileMenu}
              className="hover:text-[#D4AF37] transition"
            >
              Areas
            </Link>
            <a
              href="/#private-access"
              onClick={closeMobileMenu}
              className="hover:text-[#D4AF37] transition"
            >
              Private Access
            </a>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="hover:text-[#D4AF37] transition"
            >
              Contact
            </Link>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-sm border border-white/15 bg-white/5 px-4 py-3 font-medium text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition"
              >
                WhatsApp
              </a>

              <a
                href="/#private-access"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-4 py-3 font-semibold text-black hover:opacity-90 transition"
              >
                Request Access
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}