"use client"

import Link from "next/link"

type SiteHeaderProps = {
  onPrivateAccessClick?: () => void
}

export default function SiteHeader({ onPrivateAccessClick }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0B0E15]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="flex items-center gap-4 text-left">
          <img
            src="/logo.png"
            alt="PAMA Estates"
            className="h-14 md:h-[72px] w-auto object-contain"
          />

          <div>
            <p className="text-base font-semibold tracking-[0.18em] uppercase md:text-lg">
              PAMA Estates
            </p>
            <p className="text-[10px] text-gray-400 tracking-[0.28em] uppercase">
              Family Founded. Legacy Focused.
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-200">
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

        <a
          href="https://wa.me/971559003888"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-black hover:opacity-90 transition"
        >
          WhatsApp
        </a>
      </div>
    </header>
  )
}