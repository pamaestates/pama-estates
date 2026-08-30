"use client"

import { FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { captureWebsiteLead, newSubmissionId } from "@/lib/website-lead"

type ReviewState = {
  role: string
  intent: string
  propertyType: string
  community: string
  buildingOrProject: string
  unitOrVilla: string
  bedrooms: string
  occupancy: string
  condition: string
  expectedPrice: string
  currentRent: string
  timeline: string
  fullName: string
  whatsapp: string
  email: string
  notes: string
}

const initialState: ReviewState = {
  role: "",
  intent: "",
  propertyType: "",
  community: "",
  buildingOrProject: "",
  unitOrVilla: "",
  bedrooms: "",
  occupancy: "",
  condition: "",
  expectedPrice: "",
  currentRent: "",
  timeline: "",
  fullName: "",
  whatsapp: "",
  email: "",
  notes: "",
}

export default function PropertyReviewPage() {
  const [form, setForm] = useState<ReviewState>(initialState)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [submissionFingerprint, setSubmissionFingerprint] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const leadType = useMemo(() => {
    if (form.intent === "Sell") return "SELLER" as const
    if (form.intent === "Rent Out") return "LANDLORD" as const
    return "OTHER" as const
  }, [form.intent])

  const update = (key: keyof ReviewState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    if (!form.fullName.trim() || (!form.email.trim() && !form.whatsapp.trim())) {
      setSubmitError("Please provide your name and at least one contact method: WhatsApp or email.")
      return
    }

    if (!form.propertyType || !form.community.trim() || !form.intent) {
      setSubmitError("Please provide the property type, community/location and your current objective.")
      return
    }

    const message = `Hello PAMA Estates,\n\nI would like a confidential property review.\n\nOwner / Representative: ${form.role || "-"}\nObjective: ${form.intent || "-"}\nProperty Type: ${form.propertyType || "-"}\nCommunity / Location: ${form.community || "-"}\nBuilding / Project: ${form.buildingOrProject || "-"}\nUnit / Villa: ${form.unitOrVilla || "-"}\nBedrooms: ${form.bedrooms || "-"}\nOccupancy: ${form.occupancy || "-"}\nCondition: ${form.condition || "-"}\nExpected Price: ${form.expectedPrice || "-"}\nCurrent Annual Rent: ${form.currentRent || "-"}\nTimeline: ${form.timeline || "-"}\n\nName: ${form.fullName || "-"}\nWhatsApp: ${form.whatsapp || "-"}\nEmail: ${form.email || "-"}\n\nAdditional Context:\n${form.notes || "-"}`

    const fingerprint = JSON.stringify({
      ...form,
      email: form.email.trim().toLowerCase(),
      fullName: form.fullName.trim(),
      whatsapp: form.whatsapp.trim(),
    })

    const id =
      submissionId && submissionFingerprint === fingerprint
        ? submissionId
        : newSubmissionId("property-review")

    if (id !== submissionId) setSubmissionId(id)
    if (fingerprint !== submissionFingerprint) setSubmissionFingerprint(fingerprint)

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await captureWebsiteLead(
        {
          formName: "PROPERTY_REVIEW",
          leadType,
          fullName: form.fullName,
          email: form.email,
          mobile: form.whatsapp,
          message,
        },
        id,
      )

      window.location.assign(
        `https://wa.me/971559003888?text=${encodeURIComponent(message)}`,
      )
    } catch {
      setSubmitError(
        "We could not securely record your property review request. Please try again. If the issue continues, contact PAMA Estates directly using the WhatsApp link below.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      <section className="border-t border-white/10 bg-[#0F131B]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Owner Property Review</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-6xl">
              Understand Your Property&apos;s Position Before You Go to Market
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              Share the key facts about your Dubai property and your objective. PAMA Estates will review the asset, likely buyer or tenant positioning, relevant market context and the most appropriate route to market.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                "Confidential owner-first review",
                "Pricing and positioning context",
                "Public or discreet route-to-market options",
                "Direct follow-up from PAMA Estates",
              ].map((item) => (
                <div key={item} className="border-l border-[#D4AF37] pl-5 text-sm leading-7 text-gray-400">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 border border-white/10 bg-black/20 p-6 text-sm leading-7 text-gray-400">
              This is an advisory review, not an automated valuation or guaranteed sale/rental price. Final recommendations depend on verified property details and current market evidence.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]">Confidential Review Request</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Tell Us About the Property</h2>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Required: objective, property type, community/location, name and at least one contact method.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Your Role">
                <select value={form.role} onChange={(e) => update("role", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Property Owner</option>
                  <option>Owner Representative</option>
                </select>
              </Field>

              <Field label="Current Objective *">
                <select required value={form.intent} onChange={(e) => update("intent", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Sell</option>
                  <option>Rent Out</option>
                  <option>Exploring Options</option>
                </select>
              </Field>

              <Field label="Property Type *">
                <select required value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                  <option>Townhouse</option>
                  <option>Plot</option>
                  <option>Entire Floor</option>
                  <option>Building</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Community / Location *">
                <input required value={form.community} onChange={(e) => update("community", e.target.value)} placeholder="Palm Jumeirah, Emirates Hills..." className={controlClass} />
              </Field>

              <Field label="Building / Project">
                <input value={form.buildingOrProject} onChange={(e) => update("buildingOrProject", e.target.value)} placeholder="Building or project name" className={controlClass} />
              </Field>

              <Field label="Unit / Villa Number">
                <input value={form.unitOrVilla} onChange={(e) => update("unitOrVilla", e.target.value)} placeholder="Optional" className={controlClass} />
              </Field>

              <Field label="Bedrooms">
                <select value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Studio</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6+</option>
                  <option>N/A</option>
                </select>
              </Field>

              <Field label="Occupancy">
                <select value={form.occupancy} onChange={(e) => update("occupancy", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Vacant</option>
                  <option>Owner Occupied</option>
                  <option>Tenanted</option>
                  <option>Under Construction</option>
                </select>
              </Field>

              <Field label="Condition">
                <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Original</option>
                  <option>Well Maintained</option>
                  <option>Upgraded</option>
                  <option>Fully Renovated</option>
                  <option>New / Handover Condition</option>
                  <option>Under Construction</option>
                </select>
              </Field>

              <Field label="Expected Price">
                <input value={form.expectedPrice} onChange={(e) => update("expectedPrice", e.target.value)} placeholder="AED ..." className={controlClass} />
              </Field>

              <Field label="Current Annual Rent">
                <input value={form.currentRent} onChange={(e) => update("currentRent", e.target.value)} placeholder="AED ... / N/A" className={controlClass} />
              </Field>

              <Field label="Timeline">
                <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={controlClass}>
                  <option value="">Select</option>
                  <option>Immediately</option>
                  <option>Within 1–3 Months</option>
                  <option>Within 3–6 Months</option>
                  <option>Longer Term</option>
                  <option>Just Exploring</option>
                </select>
              </Field>

              <Field label="Full Name *">
                <input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your name" className={controlClass} />
              </Field>

              <Field label="WhatsApp">
                <input value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="+971 ..." className={controlClass} />
              </Field>

              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className={controlClass} />
              </Field>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-gray-300">Additional Context</label>
              <textarea rows={5} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Renovation details, view, plot position, tenancy, payment plan, reason for reviewing the property, or anything else relevant..." className={controlClass} />
            </div>

            {submitError ? (
              <div role="alert" className="mt-5 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
                <p>{submitError}</p>
                <a href="https://wa.me/971559003888?text=Hello%20PAMA%20Estates%2C%20I%20would%20like%20a%20confidential%20property%20review." target="_blank" rel="noreferrer" className="mt-2 inline-flex font-medium text-[#D4AF37] hover:text-white">
                  Contact PAMA Estates directly on WhatsApp →
                </a>
              </div>
            ) : null}

            <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-md bg-[#D4AF37] px-6 py-4 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Securely recording your review request..." : "Request Confidential Property Review"}
            </button>

            <p className="mt-4 text-xs leading-6 text-gray-500">
              Your submission is used to respond to this property review request. It is not an instruction to publish or market the property.
            </p>
          </form>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">Prefer a Broader Discussion?</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Strategic representation starts with context.</h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/sell-with-us" className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-7 py-3.5 font-medium transition hover:bg-white hover:text-black">
              Sell or Rent With Us
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md bg-[#D4AF37] px-7 py-3.5 font-semibold text-black transition hover:opacity-90">
              Contact PAMA Estates
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const controlClass =
  "w-full rounded-md border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-[#D4AF37]"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-300">{label}</label>
      {children}
    </div>
  )
}
