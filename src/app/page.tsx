"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { captureWebsiteLead, newSubmissionId } from "@/lib/website-lead"

const authoritySignals = [
  {
    value: "18+ Years",
    label: "Dubai market exposure",
    detail: "Long-term local perspective across multiple property cycles.",
  },
  {
    value: "Engineering",
    label: "Technical perspective",
    detail: "A more analytical view of quality, layouts, value and execution.",
  },
  {
    value: "Investor Mindset",
    label: "Commercial discipline",
    detail: "Property assessed through positioning, downside and long-term logic.",
  },
  {
    value: "Private Access",
    label: "Relationship-led sourcing",
    detail: "Selected opportunities beyond standard public listing channels.",
  },
]

const advisoryLens = [
  {
    number: "01",
    title: "Entry Position",
    text: "Understand the asking position, comparable context and the quality of the entry before committing capital.",
  },
  {
    number: "02",
    title: "Asset Quality",
    text: "Assess layout, condition, building or villa quality, plot characteristics and factors that affect long-term desirability.",
  },
  {
    number: "03",
    title: "Market Fit",
    text: "Match the asset to the real objective — lifestyle, wealth preservation, rental income, liquidity or capital appreciation.",
  },
  {
    number: "04",
    title: "Execution",
    text: "Structure negotiation and transaction steps with clarity, discipline and attention to the details that protect the outcome.",
  },
]

export default function Home() {
  const [clientProfile, setClientProfile] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [whatsApp, setWhatsApp] = useState<string>("")
  const [preferredArea, setPreferredArea] = useState<string>("")
  const [budgetRange, setBudgetRange] = useState<string>("")
  const [requirements, setRequirements] = useState<string>("")
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [submissionFingerprint, setSubmissionFingerprint] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const handleWhatsAppSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    const inquiryLabel =
      clientProfile === "Direct Buyer — Investor"
        ? "Investor Buyer Inquiry"
        : clientProfile === "Direct Buyer — End User"
          ? "End User Buyer Inquiry"
          : clientProfile === "Agent / Broker — Strategic Partner"
            ? "Broker Collaboration Inquiry"
            : "Website Inquiry"

    const formName =
      clientProfile === "Direct Buyer — Investor"
        ? "PRIVATE_ACCESS_INVESTOR"
        : clientProfile === "Direct Buyer — End User"
          ? "PRIVATE_ACCESS_END_USER"
          : clientProfile === "Agent / Broker — Strategic Partner"
            ? "BROKER_COLLABORATION"
            : "PRIVATE_ACCESS"

    const leadType =
      clientProfile === "Agent / Broker — Strategic Partner" ? "BROKER" : clientProfile ? "BUYER" : "OTHER"

    const message = `Hello PAMA Estates,

I reached you via pamaestates.com (${inquiryLabel})

Client Profile: ${clientProfile || "-"}
Full Name: ${fullName || "-"}
Email: ${email || "-"}
WhatsApp Number: ${whatsApp || "-"}
Preferred Area: ${preferredArea || "-"}
Budget Range: ${budgetRange || "-"}
Requirements: ${requirements || "-"}`

    if (!fullName.trim() || (!email.trim() && !whatsApp.trim())) {
      setSubmitError("Please provide your name and at least one contact method: WhatsApp or email.")
      return
    }

    const fingerprint = JSON.stringify({
      clientProfile: clientProfile.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      whatsApp: whatsApp.trim(),
      preferredArea: preferredArea.trim(),
      budgetRange: budgetRange.trim(),
      requirements: requirements.trim(),
    })

    const id =
      submissionId && submissionFingerprint === fingerprint
        ? submissionId
        : newSubmissionId("private-access")

    if (id !== submissionId) setSubmissionId(id)
    if (fingerprint !== submissionFingerprint) setSubmissionFingerprint(fingerprint)

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await captureWebsiteLead(
        {
          formName,
          leadType,
          fullName,
          email,
          mobile: whatsApp,
          message,
        },
        id,
      )

      const phoneNumber = "971559003888"
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.location.assign(whatsappUrl)
    } catch {
      setSubmitError(
        "We could not securely record your enquiry. Please try again. If the issue continues, you can contact PAMA Estates directly using the WhatsApp link below.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0B0E15] text-white">
      {/* HERO */}
      <section id="home" className="relative isolate min-h-[calc(100vh-84px)] overflow-hidden border-t border-white/10 scroll-mt-28">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070A10]/95 via-[#070A10]/80 to-[#070A10]/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-[#0B0E15]" />

        <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#D4AF37] md:text-sm">
              Private Dubai Real Estate Advisory
            </p>

            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-7xl lg:text-[5.25rem]">
              Private Access.
              <span className="block text-gray-300">Strategic Advice.</span>
              <span className="block">Dubai Real Estate.</span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              Boutique advisory for buyers, investors and property owners seeking
              prime, ultra-prime and privately sourced opportunities — approached
              with discretion, market logic and an engineering-led perspective.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("private-access")}
                className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 text-base font-semibold text-black transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Request Private Access
              </button>

              <Link
                href="/sell-with-us"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 text-base font-medium backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                Sell or Rent With Us
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-7 text-sm text-gray-300">
              <span>Prime &amp; Ultra-Prime</span>
              <span className="text-[#D4AF37]">•</span>
              <span>Off-Market Sourcing</span>
              <span className="text-[#D4AF37]">•</span>
              <span>Buyer &amp; Owner Advisory</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="border border-white/15 bg-black/35 p-8 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-[#D4AF37]">
                PAMA Approach
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug">
                Selection over volume. Analysis over promotion.
              </h2>
              <p className="mt-5 text-sm leading-7 text-gray-300">
                The objective is not to present the most properties. It is to
                identify the opportunities that make sense for the client&apos;s
                position, timing and long-term objective.
              </p>

              <div className="mt-8 space-y-5 border-t border-white/10 pt-7">
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm text-gray-400">Focus</span>
                  <span className="text-right text-sm font-medium">Dubai Prime Residential</span>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm text-gray-400">Access</span>
                  <span className="text-right text-sm font-medium">Public + Private Market</span>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <span className="text-sm text-gray-400">Method</span>
                  <span className="text-right text-sm font-medium">Evidence + Negotiation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY PROOF */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                Experience Behind the Advice
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
                A Different Perspective on Property
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                PAMA Estates combines long-term Dubai exposure with technical
                understanding, investor thinking and transaction discipline.
                That changes how an opportunity is assessed before it is ever
                presented to a client.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center text-sm font-medium text-[#D4AF37] transition hover:text-white"
              >
                Discover the PAMA approach →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {authoritySignals.map((signal) => (
                <div key={signal.value} className="bg-[#0F131B] p-7 md:p-8">
                  <p className="text-2xl font-semibold">{signal.value}</p>
                  <p className="mt-2 text-sm font-medium text-[#D4AF37]">{signal.label}</p>
                  <p className="mt-4 text-sm leading-7 text-gray-400">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADVISORY INTELLIGENCE */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                PAMA Intelligence
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
                Look Beyond the Asking Price
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-gray-300 lg:justify-self-end">
              A property should be understood in context. PAMA&apos;s advisory lens
              considers the entry position, the underlying asset, the surrounding
              market and the execution path — not only the marketing headline.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advisoryLens.map((item) => (
              <div
                key={item.number}
                className="group border border-white/10 bg-black/15 p-7 transition hover:-translate-y-1 hover:border-[#D4AF37]/35 hover:bg-white/[0.035]"
              >
                <p className="text-xs font-medium tracking-[0.3em] text-[#D4AF37]">{item.number}</p>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-l-2 border-[#D4AF37] bg-white/[0.025] px-6 py-5 text-sm leading-7 text-gray-400">
            Public PAMA Intelligence will be expanded progressively using verified,
            publication-safe property data. Private client, owner and off-market
            information remains confidential.
          </div>
        </div>
      </section>

      {/* ACCESS BY OBJECTIVE */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Selected Opportunities
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Relevant Opportunities, Not Listing Volume
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Search and sourcing are shaped around the client&apos;s objective. The
              emphasis is on relevance, positioning and access rather than sending
              large quantities of undifferentiated inventory.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Private Market</p>
              <h3 className="mt-4 text-2xl font-semibold">Off-Market &amp; Direct</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Relationship-led sourcing for opportunities that may not be broadly advertised.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Secondary Market</p>
              <h3 className="mt-4 text-2xl font-semibold">Strategic Resale</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Selected resale assets where pricing, condition, scarcity or negotiation create a compelling position.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Primary Market</p>
              <h3 className="mt-4 text-2xl font-semibold">Developer Opportunities</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                New-launch and developer inventory considered through location, payment structure and investment logic.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("private-access")}
            className="mt-10 inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Share Your Requirement
          </button>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Who We Advise
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Buyers, Owners and Strategic Partners
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Buyer / Investor</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Private sourcing and strategic guidance for prime residences,
                investment acquisitions and long-term wealth positioning.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Property Owner</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Pricing, positioning, selective exposure and negotiation for owners
                considering a sale or lease.
              </p>
            </div>
            <div className="border border-white/10 bg-white/5 p-8">
              <h3 className="text-xl font-semibold">Broker / Partner</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Structured collaboration on qualified requirements, referrals and
                high-value transactions with aligned professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED AREAS */}
      <section id="featured-areas" className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Prime Areas</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Communities We Know and Focus On
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-2xl text-lg leading-8 text-gray-300">
                Different communities serve different objectives — waterfront prestige,
                family living, privacy, liquidity or long-term scarcity.
              </p>
              <Link
                href="/luxury-property-dubai"
                className="mt-5 inline-flex text-sm font-medium text-[#D4AF37] transition hover:text-white"
              >
                Explore Luxury Property Dubai →
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Link href="/areas/palm-jumeirah" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Iconic Waterfront</p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jumeirah</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">Beachfront villas, branded residences, penthouses and global ultra-prime appeal.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>

            <Link href="/areas/palm-jebel-ali" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Future Waterfront</p>
              <h3 className="mt-4 text-2xl font-semibold">Palm Jebel Ali</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">Future-facing coastal scale, villa-led waterfront living and long-term positioning.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>

            <Link href="/areas/emirates-living" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Established Villas</p>
              <h3 className="mt-4 text-2xl font-semibold">Emirates Living</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">Emirates Hills, Meadows, The Lakes and The Springs with mature family demand.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>

            <Link href="/areas/jumeirah-islands" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Privacy &amp; Plots</p>
              <h3 className="mt-4 text-2xl font-semibold">Jumeirah Islands</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">Low-density villa living, larger plots, lake views and strong end-user appeal.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>

            <Link href="/areas/jumeirah-park" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Family Villas</p>
              <h3 className="mt-4 text-2xl font-semibold">Jumeirah Park</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">Practical villa layouts, renovation potential and broad family buyer demand.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>

            <Link href="/areas/dubai-marina" className="group border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">Waterfront Liquidity</p>
              <h3 className="mt-4 text-2xl font-semibold">Dubai Marina</h3>
              <p className="mt-4 text-sm leading-7 text-gray-400">High-rise waterfront living with strong rental demand and active resale liquidity.</p>
              <span className="mt-8 inline-block text-sm font-medium transition group-hover:text-[#D4AF37]">Explore Area →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">For Property Owners</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Position the Property Before You Promote It
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                PAMA Estates works with owners and landlords on pricing, route to
                market, selective exposure and negotiation. The objective is to
                protect the property&apos;s position while reaching the right audience.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-400">Strategic pricing and comparable context</div>
                <div className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-400">Public or discreet off-market positioning</div>
                <div className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-400">Qualified buyer and investor targeting</div>
                <div className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-400">Negotiation and transaction execution</div>
              </div>

              <Link href="/sell-with-us" className="mt-10 inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90">
                Start Owner Consultation
              </Link>
            </div>

            <div className="border border-white/10 bg-black/20 p-9 md:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Owner Review</p>
              <h3 className="mt-4 text-2xl font-semibold">Understand your market position first.</h3>
              <p className="mt-5 text-sm leading-7 text-gray-400">
                A strong sale or rental strategy starts with understanding the property,
                competing supply, likely buyer profile and the implications of the asking price.
              </p>
              <p className="mt-6 border-t border-white/10 pt-6 text-xs leading-6 text-gray-500">
                Initial consultation is confidential and obligation-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE ACCESS FORM */}
      <section id="private-access" className="border-t border-white/10 bg-[#0B0E15] scroll-mt-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:px-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Private Access</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Tell Us What You Are Looking For
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Share the objective, preferred location and budget. PAMA Estates will
              focus the search around relevant on-market and privately sourced options.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Discreet Sourcing</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">A tailored search for clients who value privacy, access and relevance.</p>
              </div>
              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Objective-Led Matching</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">Location, asset type, budget and strategic fit are considered together.</p>
              </div>
              <div className="border-l border-[#D4AF37] pl-5">
                <h3 className="text-lg font-semibold">Direct Advisory</h3>
                <p className="mt-2 text-sm leading-7 text-gray-400">Serious enquiries receive focused communication and clear next steps.</p>
              </div>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-10">
            <p className="mb-4 text-xs text-gray-500">Private consultation for serious buyers, investors and strategic partners.</p>
            <h3 className="text-2xl font-semibold">Request Private Opportunities</h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Complete the form and continue the conversation directly with PAMA Estates.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleWhatsAppSubmit}>
              <div>
                <label htmlFor="private-client-profile" className="mb-2 block text-sm text-gray-300">Client Profile</label>
                <select id="private-client-profile" name="clientProfile" required value={clientProfile ?? ""} onChange={(e) => setClientProfile(e.target.value)} className="w-full appearance-none rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#D4AF37]">
                  <option value="">Select your profile</option>
                  <option value="Direct Buyer — Investor">Direct Buyer — Investor</option>
                  <option value="Direct Buyer — End User">Direct Buyer — End User</option>
                  <option value="Agent / Broker — Strategic Partner">Agent / Broker — Strategic Partner</option>
                </select>
              </div>

              <div>
                <label htmlFor="private-full-name" className="mb-2 block text-sm text-gray-300">Full Name</label>
                <input id="private-full-name" name="fullName" type="text" autoComplete="name" required placeholder="Your name" value={fullName ?? ""} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              <div>
                <label htmlFor="private-email" className="mb-2 block text-sm text-gray-300">Email</label>
                <input id="private-email" name="email" type="email" autoComplete="email" aria-describedby="private-contact-help" placeholder="Your email" value={email ?? ""} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              <div>
                <label htmlFor="private-whatsapp" className="mb-2 block text-sm text-gray-300">WhatsApp Number</label>
                <input id="private-whatsapp" name="whatsApp" type="tel" inputMode="tel" autoComplete="tel" aria-describedby="private-contact-help" placeholder="+971 ..." value={whatsApp ?? ""} onChange={(e) => setWhatsApp(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              <p id="private-contact-help" className="-mt-2 text-xs leading-5 text-gray-500">Provide at least one contact method: email or WhatsApp.</p>

              <div>
                <label htmlFor="private-preferred-area" className="mb-2 block text-sm text-gray-300">Preferred Area</label>
                <input id="private-preferred-area" name="preferredArea" type="text" placeholder="Palm Jumeirah, Emirates Hills, Dubai Marina..." value={preferredArea ?? ""} onChange={(e) => setPreferredArea(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              <div>
                <label htmlFor="private-budget-range" className="mb-2 block text-sm text-gray-300">Budget Range</label>
                <input id="private-budget-range" name="budgetRange" type="text" placeholder="AED 10M - 30M+" value={budgetRange ?? ""} onChange={(e) => setBudgetRange(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              <div>
                <label htmlFor="private-requirements" className="mb-2 block text-sm text-gray-300">Requirements</label>
                <textarea id="private-requirements" name="requirements" rows={5} placeholder="Tell us what you are looking for..." value={requirements ?? ""} onChange={(e) => setRequirements(e.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]" />
              </div>

              {submitError ? (
                <div role="alert" className="rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
                  <p>{submitError}</p>
                  <a
                    href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates%2C%20I%20am%20trying%20to%20submit%20a%20website%20enquiry%20and%20need%20assistance."
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex font-medium text-[#D4AF37] hover:text-white"
                  >
                    Contact PAMA Estates directly on WhatsApp →
                  </a>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#D4AF37] px-6 py-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Securely recording your enquiry..." : "Request Private Opportunities"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Private Advisory</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Make the Property Decision with Better Context
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you are buying, investing, selling or exploring a private opportunity,
            PAMA Estates provides a focused route from market context to execution.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button type="button" onClick={() => scrollToSection("private-access")} className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:opacity-90">
              Request Private Access
            </button>
            <Link href="/about" className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 py-4 font-medium transition hover:bg-white hover:text-black">
              About PAMA Estates
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
