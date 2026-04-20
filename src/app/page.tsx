"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"


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
          element.scrollIntoView({ behavior: "smooth", block: "start" })
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

    const leadType =
      clientProfile === "Direct Buyer — Investor"
        ? "Investor Buyer Inquiry"
        : clientProfile === "Direct Buyer — End User"
          ? "End User Buyer Inquiry"
          : clientProfile === "Agent / Broker — Strategic Partner"
            ? "Broker Collaboration Inquiry"
            : "Website Inquiry"

    const message = `Hello PAMA Estates,

I reached you via pamaestates.com (${leadType})

Client Profile: ${clientProfile || "-"}
Full Name: ${fullName || "-"}
Email: ${email || "-"}
WhatsApp Number: ${whatsApp || "-"}
Preferred Area: ${preferredArea || "-"}
Budget Range: ${budgetRange || "-"}
Requirements: ${requirements || "-"}`

    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = "971559003888"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0B0E15] text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-[#0B0E15]" />
      </div>

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 border-t border-white/10 bg-[#0B0E15] scroll-mt-28"
      >
        <div className="mx-auto flex min-h-[calc(100vh-84px)] max-w-7xl items-center px-6 py-16 md:px-10">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Private / Off-Market Dubai Real Estate Advisory
            </p>

            <h1 className="text-5xl font-semibold leading-[1.03] md:max-w-5xl md:text-7xl">
              Private &amp; Off-Market Real Estate in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              Access villas, penthouses, and investment opportunities not publicly
              listed — guided with strategy, discretion, and precision. Focused
              on Palm Jumeirah, Palm Jebel Ali, Emirates Living, Jumeirah Islands, Jumeirah Park,
              and Dubai&apos;s prime residential communities like Dubai Marina.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("private-access")}
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition hover:opacity-90"
              >
                Request Private Access
              </button>

              <a
                href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20reached%20you%20via%20pamaestates.com%20(Home%20Page%20Inquiry)%20and%20would%20like%20to%20explore%20available%20opportunities."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 text-base font-medium transition hover:bg-white hover:text-black"
              >
                WhatsApp
              </a>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold">18+ Years</p>
                <p className="mt-2 text-sm text-gray-400">
                  of Local Market Exposure
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Ultra-Prime</p>
                <p className="mt-2 text-sm text-gray-400">
                  Advisory for High-Value Buyers &amp; Owners
                </p>
              </div>
              <div>
                <p className="text-2xl font-semibold">Off-Market</p>
                <p className="mt-2 text-sm text-gray-400">
                  Private Sourcing &amp; Direct Access
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY BLOCK */}
      <section className="relative z-10 border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                Why PAMA Estates
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Strategic Advisory, Not Just Listings
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-8 text-gray-300">
              <p>
                PAMA Estates operates as a boutique real estate advisory focused
                on high-value transactions, off-market opportunities, and direct
                client relationships across Dubai&apos;s prime residential market.
              </p>

              <p>
                With an engineering-driven perspective and deep local market
                exposure, the approach is structured, analytical, and focused on
                positioning, negotiation, and execution — not just property
                promotion.
              </p>

              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <p>• Prime and ultra-prime buyer advisory</p>
                <p>• Villa communities and family residential markets</p>
                <p>• Off-market and direct-owner opportunities</p>
                <p>• Strategic seller and landlord representation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="relative z-10 border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Who This Is For
            </p>

            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Tailored for Buyers, Owners, and Strategic Partners
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Buyer / Investor</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Access private opportunities, selected inventory, and strategic
                guidance for acquisitions across Dubai&apos;s prime market.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Property Owner</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Sell or lease your property with positioning, discretion, market
                logic, and a targeted approach to qualified buyers.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Broker / Partner</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Collaborate on qualified requirements, strategic referrals, and
                high-value transactions with aligned professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED AREAS */}
      <section
        id="featured-areas"
        className="relative z-10 border-t border-white/10 bg-[#0B0E15]"
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
              Different communities serve different objectives — from iconic
              waterfront prestige and future upside to family villa living,
              privacy, and rental liquidity.
            </p>

            <div className="mt-8">
              <Link
                href="/luxury-property-dubai"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
              >
               Explore Luxury Property Dubai →
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/areas/palm-jumeirah"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                Iconic Waterfront
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jumeirah</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Dubai&apos;s flagship waterfront destination known for beachfront
                villas, branded residences, penthouses, and global ultra-prime
                appeal.
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
                Future Waterfront
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jebel Ali</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A large-scale coastal destination offering strategic early-entry
                opportunities, waterfront scale, and long-term upside.
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
                Villa Communities
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Emirates Living</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Established Emaar villa communities including Emirates Hills,
                Meadows, The Lakes, and The Springs with long-term family demand.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>

            <Link
              href="/areas/jumeirah-islands"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                Privacy &amp; Large Plots
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Jumeirah Islands</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A premium villa community valued for privacy, low density, lake
                views, larger plots, and calm residential appeal.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>

            <Link
              href="/areas/jumeirah-park"
              className="group border border-white/10 bg-white/5 p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                Family Villas
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Jumeirah Park</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A strong villa market known for family living, practical layouts,
                renovation potential, and broad buyer demand.
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
                High-Rise Liquidity
              </p>
              <h3 className="mt-4 text-2xl font-semibold">Dubai Marina</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                A dynamic waterfront skyline market combining lifestyle appeal,
                strong rental demand, and investment-friendly liquidity.
              </p>
              <span className="mt-8 inline-block text-sm font-medium text-white transition group-hover:text-[#D4AF37]">
                Explore Area →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="relative z-10 border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                For Property Owners
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Thinking of Selling or Renting Your Property?
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                PAMA Estates partners with owners, investors, and landlords
                across Dubai, specializing in villas, apartments, penthouses,
                plots, and entire buildings. We position, market, and negotiate
                high-value properties with discretion, strategy, and direct
                access to qualified buyers.
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

              <p className="mt-6 text-sm text-gray-500">
                Initial consultation is confidential and obligation-free.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/sell-with-us"
                  className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition hover:opacity-90"
                >
                  Start Owner Consultation
                </Link>

                <a
                  href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates,%0A%0AI%20reached%20you%20via%20pamaestates.com%20(Owner%20Inquiry)%20and%20would%20like%20to%20discuss%20selling%20or%20renting%20my%20property."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 text-base font-medium transition hover:bg-white hover:text-black"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 p-10 text-center transition duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                Advisory Approach
              </p>

              <h3 className="mt-4 text-2xl font-semibold">
                Discreet. Strategic. Results-Driven.
              </h3>

              <p className="mt-6 text-sm leading-7 text-gray-400">
                Whether you are considering selling, renting, or simply
                evaluating your options, we provide clear guidance based on real
                market data, buyer demand, and positioning strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE ACCESS FORM */}
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
              Request Private &amp; Off-Market Opportunities
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
                <h3 className="text-lg font-semibold">
                  Investor-Focused Matching
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Requirements are filtered by location, asset type, budget, and
                  strategic fit to reduce noise and improve relevance.
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

          <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <p className="mb-4 text-xs text-gray-500">
              This service is reserved for serious buyers and qualified investors.
            </p>

            <h3 className="text-2xl font-semibold">
              Tell Us What You Are Looking For
            </h3>

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
                  className="w-full appearance-none rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#D4AF37]"
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
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
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
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
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
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
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
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
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
                  className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-[#D4AF37] px-6 py-4 font-semibold text-black transition hover:opacity-90"
              >
                Request Private Opportunities
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Next Step
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Serious About Dubai Real Estate?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you are looking to buy, invest, sell, or access off-market
            opportunities, PAMA Estates is positioned to guide the process with
            clarity, structure, and discretion.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("private-access")}
              className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90"
            >
              Request Private Access
            </button>

            <Link
              href="/sell-with-us"
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 font-medium transition hover:bg-white hover:text-black"
            >
              Sell or Rent With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}