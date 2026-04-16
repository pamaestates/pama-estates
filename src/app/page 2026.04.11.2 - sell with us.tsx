"use client"

import Link from "next/link"
import { FormEvent, useState, useEffect } from "react"
import SiteHeader from "@/components/SiteHeader"

export default function Home() {
  const [clientProfile, setClientProfile] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [whatsApp, setWhatsApp] = useState<string>("")
  const [preferredArea, setPreferredArea] = useState<string>("")
  const [budgetRange, setBudgetRange] = useState<string>("")
  const [requirements, setRequirements] = useState<string>("")
useEffect(() => {
  if (window.location.hash === "#private-access") {
    setTimeout(() => {
      const element = document.getElementById("private-access")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }
}, [])
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleWhatsAppSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const message = `Hello PAMA Estates,

I would like to request private / off-market opportunities.

Client Profile: ${clientProfile.trim() || "-"}
Full Name: ${fullName.trim() || "-"}
Email: ${email.trim() || "-"}
WhatsApp Number: ${whatsApp.trim() || "-"}
Preferred Area: ${preferredArea.trim() || "-"}
Budget Range: ${budgetRange.trim() || "-"}
Requirements: ${requirements.trim() || "-"}`

    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = "971559003888"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <main className="relative min-h-screen bg-[#0B0E15] text-white overflow-x-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#0B0E15]" />
      </div>

          <section
  id="home"
  className="relative z-10 border-t border-white/10 bg-[#0B0E15] scroll-mt-28"
>
      
        <div className="mx-auto flex min-h-[calc(100vh-84px)] max-w-7xl items-center px-6 py-16 md:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Prime / Ultra-Prime & Off-Market Advisory
            </p>

            <h1 className="text-5xl font-semibold leading-[1.03] md:text-7xl md:max-w-5xl">
              Access Dubai&apos;s Most Exclusive Properties With Confidence
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
              Boutique real estate advisory for investors, villa owners, and
              high-net-worth clients seeking exceptional opportunities across
              Palm Jumeirah, Emirates Living, Jebel Ali Palm, and Dubai Marina.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20came%20across%20your%20website%20(pamaestates.com)%20and%20would%20like%20to%20explore%20available%20opportunities.%0A%0ACould%20you%20please%20assist%3F"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black hover:opacity-90 transition"
              >
                WhatsApp Now
              </a>

              <button
                type="button"
                onClick={() => scrollToSection("private-access")}
                className="inline-flex items-center justify-center rounded-sm border border-white/20 bg-white/5 px-8 py-4 text-base font-medium hover:bg-white hover:text-black transition"
              >
                Request Private Opportunities
              </button>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold">18+</p>
                <p className="mt-2 text-sm text-gray-400">
                  Years of Local Experience
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Ultra-Prime</p>
                <p className="mt-2 text-sm text-gray-400">
                  Buyer & seller advisory
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Off-Market</p>
                <p className="mt-2 text-sm text-gray-400">
                  Private sourcing approach
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-pama"
        className="relative z-10 border-t border-white/10 bg-[#0B0E15]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why PAMA Estates
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Trusted Advice for Complex, High-Value Real Estate Decisions
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              PAMA Estates combines engineering precision, local market
              intelligence, and boutique-level service to help clients navigate
              Dubai&apos;s luxury and investment property landscape with clarity,
              discretion, and confidence.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                01
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Engineering Mindset
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A technical background brings deeper understanding of build
                quality, layout logic, value drivers, and long-term asset
                potential.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                02
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                18+ Years of Local Experience
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Led by over 18 years of experience in Dubai, providing deep
                market insight, local relationships, and strategic guidance
                across prime residential areas.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                03
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Off-Market Access
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Discreet sourcing and relationship-driven outreach help uncover
                private opportunities beyond standard public inventory.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                04
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                Strategic Negotiation
              </h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                High-value transactions require more than listings — they demand
                positioning, timing, structure, and disciplined negotiation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="featured-areas"
        className="relative z-10 border-t border-white/10 bg-[#0F131B]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Featured Areas
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Prime Communities We Focus On
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              From iconic waterfront addresses to established family
              communities, PAMA Estates advises across some of Dubai&apos;s most
              sought-after residential markets.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/areas/palm-jumeirah"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                01
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jumeirah</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Dubai&apos;s flagship waterfront destination, known for branded
                residences, ultra-prime villas, private beach access, and
                trophy assets.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>

            <Link
              href="/areas/palm-jebel-ali"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                02
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jebel Ali</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A future-defining waterfront opportunity with large-format
                villas, long-term upside, and strong appeal for early-positioned
                investors.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>

            <Link
              href="/areas/emirates-living"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                03
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Emirates Living</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Established villa communities including Emirates Hills, Meadows,
                The Lakes, and The Springs, offering family lifestyle and
                enduring demand.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>

            <Link
              href="/areas/dubai-marina"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                04
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Dubai Marina</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A dynamic waterfront district combining lifestyle, investment
                activity, and a broad range of premium apartments with global
                buyer appeal.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>
          </div>
        </div>
      </section>

<section className="relative z-10 border-t border-white/10 bg-[#0F131B]">
  <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
      
      {/* LEFT CONTENT */}
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
          For Property Owners
        </p>

        <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
          Thinking of Selling or Renting Your Property?
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-300">
          PAMA Estates partners with owners, investors, and landlords across Dubai,
  specializing in villas, apartments, penthouses, plots, and entire buildings.
  We position, market, and negotiate high-value properties with discretion,
  strategy, and direct access to qualified buyers.
        </p>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-400">
            • Off-market exposure to qualified buyers  
          </p>
          <p className="text-sm text-gray-400">
            • Strategic pricing and positioning advice  
          </p>
          <p className="text-sm text-gray-400">
            • Direct access to high-net-worth clients  
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/#private-access"
            className="inline-flex items-center justify-center rounded-sm bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black hover:opacity-90 transition"
          >
            Sell or Rent With Us
          </a>

          <a
            href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20am%20a%20property%20owner%20interested%20in%20selling%20or%20renting%20my%20property.%0A%0ACould%20you%20please%20assist%3F"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-white/20 bg-white/5 px-8 py-4 text-base font-medium hover:bg-white hover:text-black transition"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* RIGHT SIDE (VISUAL BLOCK) */}
      <div className="border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
          Advisory Approach
        </p>

        <h3 className="mt-4 text-2xl font-semibold">
          Discreet. Strategic. Results-Driven.
        </h3>

        <p className="mt-6 text-sm leading-7 text-gray-400">
          Whether you are considering selling, renting, or simply evaluating
          your options, we provide clear guidance based on real market data,
          buyer demand, and positioning strategy.
        </p>
      </div>

    </div>
  </div>
</section>
      <section
        id="private-access"
        className="relative z-10 border-t border-white/10 bg-[#0B0E15] scroll-mt-28"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Private Access
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Request Private & Off-Market Opportunities
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Some of the most compelling opportunities are never broadly
              marketed. Share your requirements and PAMA Estates will identify
              relevant on-market and privately sourced options aligned with your
              goals.
            </p>

            <div className="mt-10 space-y-5">
              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Discreet Sourcing</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  A tailored search approach for buyers seeking privacy,
                  exclusivity, and better-positioned opportunities.
                </p>
              </div>

              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Investor-Focused Matching</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Requirements are filtered by location, asset type, budget,
                  and strategic fit to reduce noise and improve relevance.
                </p>
              </div>

              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Direct Communication</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Serious inquiries receive a focused, high-touch response with
                  speed, clarity, and discretion.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
            <p className="mb-4 text-xs text-gray-500">
              This service is reserved for serious buyers and qualified investors.
            </p>

            <h3 className="text-2xl font-semibold">Tell Us What You Are Looking For</h3>

            <p className="mt-3 text-sm leading-7 text-gray-400">
              Complete the form below and submit your requirements to access
              privately sourced opportunities not publicly listed. We will
              respond with relevant opportunities and next steps.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleWhatsAppSubmit}>
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Client Profile
                </label>

                <select
                  required
                  value={clientProfile ?? ""}
                  onChange={(e) => setClientProfile(e.target.value)}
                  className="w-full appearance-none border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Select your profile</option>
                  <option value="Direct Buyer — Investor">
                    Direct Buyer — Investor
                  </option>
                  <option value="Direct Buyer — End User">
                    Direct Buyer — End User
                  </option>
                  <option value="Agent / Broker — Strategic Partner">
                    Agent / Broker — Strategic Partner
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={fullName ?? ""}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="+971 ..."
                  value={whatsApp ?? ""}
                  onChange={(e) => setWhatsApp(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Preferred Area
                </label>
                <input
                  type="text"
                  placeholder="Palm Jumeirah, Emirates Hills, Dubai Marina..."
                  value={preferredArea ?? ""}
                  onChange={(e) => setPreferredArea(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Budget Range
                </label>
                <input
                  type="text"
                  placeholder="AED 10M - 30M+"
                  value={budgetRange ?? ""}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Requirements
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what you are looking for..."
                  value={requirements ?? ""}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-sm bg-[#D4AF37] px-6 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Opportunities
              </button>
            </form>
          </div>
        </div>
      </section>

    </main>
  )
}