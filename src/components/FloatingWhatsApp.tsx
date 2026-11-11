"use client"

import { usePathname } from "next/navigation"
import { polishWhatsAppHref } from "@/lib/pl-whatsapp"

export default function FloatingWhatsApp() {
  const pathname = usePathname()
  const polish = pathname === "/pl" || pathname.startsWith("/pl/")
  return (
    <a
      href={polish ? polishWhatsAppHref(pathname) : "https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"}
      target="_blank"
      rel="noreferrer"
      aria-label={polish ? "Napisz na WhatsApp" : "Chat on WhatsApp"}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37] px-5 py-3 font-semibold text-black shadow-[0_10px_40px_rgba(212,175,55,0.25)] transition hover:scale-[1.02] hover:opacity-95"
    >
      <span className="text-sm">WhatsApp</span>
    </a>
  )
}
