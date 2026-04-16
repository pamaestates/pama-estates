"use client";

import { ChangeEvent, useState } from "react";

import { Shield, Target, Users, Handshake, Star, Crown, Lock, Network } from "lucide-react";

type OwnerFormState = {
  role: string;
  purpose: string;
  propertyType: string;
  location: string;
  timeline: string;
  price: string;
  name: string;
  whatsapp: string;
  email: string;
  contactMethod: string;
  marketing: string;
  notes: string;
};

export default function SellWithUs() {
  const [form, setForm] = useState<OwnerFormState>({
    role: "",
    purpose: "",
    propertyType: "",
    location: "",
    timeline: "",
    price: "",
    name: "",
    whatsapp: "",
    email: "",
    contactMethod: "",
    marketing: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = () => {
  const inquiryType =
    form.purpose === "Sell"
      ? "Owner Selling Inquiry"
      : form.purpose === "Rent Out"
      ? "Owner Rental Inquiry"
      : "Owner Inquiry";

  const timingNote =
    form.timeline === "Ready Immediately"
      ? "This owner appears ready to proceed immediately."
      : form.timeline === "Near Future"
      ? "This owner appears to be planning for the near future."
      : form.timeline === "Just Exploring"
      ? "This owner appears to be exploring options."
      : "-";

  const message = `Hello PAMA Estates,

I reached you via pamaestates.com (${inquiryType})

Role: ${form.role || "-"}
Purpose: ${form.purpose || "-"}
Property Type: ${form.propertyType || "-"}
Location: ${form.location || "-"}
Timeline: ${form.timeline || "-"}
Expected Price: ${form.price || "-"}

Name: ${form.name || "-"}
WhatsApp: ${form.whatsapp || "-"}
Email: ${form.email || "-"}

Preferred Contact: ${form.contactMethod || "-"}
Marketing Preference: ${form.marketing || "-"}

Additional Information:
${form.notes || "-"}

Internal Lead Context:
${timingNote}`;

  const url = `https://wa.me/971559003888?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

  return (
    <main className="min-h-screen bg-[#0B0E15] text-white">
      {/* 1. WHY OWNERS CHOOSE */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0F131B]">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-10"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070&auto=format&fit=crop')",
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-28 fade-up">
          <div className="max-w-3xl fade-up">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              Why Owners Choose PAMA Estates
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Strategic Representation for High-Value Properties
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Owners choose PAMA Estates for discretion, market intelligence,
              and a tailored approach to positioning high-value real estate.
              From villas and penthouses to plots and entire buildings, every
              asset is handled with strategic focus and direct engagement with
              qualified buyers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <Shield className="h-6 w-6 text-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                01
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Discreet Positioning
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Sensitive listings can be handled with a selective, off-market
                approach to protect privacy while reaching the right audience.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <Target className="h-6 w-6 text-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                02
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Strategic Pricing
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Pricing is guided by market context, competition, positioning,
                and buyer psychology — not guesswork.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <Users className="h-6 w-6 text-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                03
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Qualified Buyer Reach
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                Exposure is focused on serious buyers, investors, and targeted
                networks rather than low-quality mass inquiries.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]">
              <Handshake className="h-6 w-6 text-[#D4AF37]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#D4AF37]">
                04
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Negotiation & Execution
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-400">
                From initial positioning through negotiation and closing, owners
                benefit from structured guidance and detail-focused execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELL / RENT INTRO */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-10 lg:py-24">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Sell With Us
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Sell or Rent Your Property with Strategy
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            PAMA Estates advises property owners, investors, and landlords
            across Dubai on the strategic sale and leasing of villas,
            apartments, penthouses, plots, and entire buildings — with
            discretion, market intelligence, and direct access to qualified
            buyers.
          </p>
        </div>

        {/* Compact trust strip */}
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-10 fade-up-delay-1">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-4">
            <div className="bg-[#0F131B] px-6 py-6 transition duration-300 hover:bg-white/[0.04] flex items-start gap-4">
  <Star className="h-5 w-5 text-[#D4AF37]" />

              <div>
                <p className="text-lg font-semibold">18+ Years</p>
                <p className="mt-1 text-sm text-gray-400">
                  of local Dubai experience
                </p>
              </div>
            </div>

            <div className="bg-[#0F131B] px-6 py-6 transition duration-300 hover:bg-white/[0.04] flex items-start gap-4">
  <Crown className="h-5 w-5 text-[#D4AF37]" />

              <div>
                <p className="text-lg font-semibold">Ultra-Prime</p>
                <p className="mt-1 text-sm text-gray-400">
                  Advisory mindset for high-value assets
                </p>
              </div>
            </div>

            <div className="bg-[#0F131B] px-6 py-6 transition duration-300 hover:bg-white/[0.04] flex items-start gap-4">
  <Lock className="h-5 w-5 text-[#D4AF37]" />

              <div>
                <p className="text-lg font-semibold">Discreet</p>
                <p className="mt-1 text-sm text-gray-400">
                  Off-market and selective positioning available
                </p>
              </div>
            </div>

            <div className="bg-[#0F131B] px-6 py-6 transition duration-300 hover:bg-white/[0.04] flex items-start gap-4">
  <Network className="h-5 w-5 text-[#D4AF37]" />

              <div>
                <p className="text-lg font-semibold">Direct</p>
                <p className="mt-1 text-sm text-gray-400">
                  Access to qualified buyers and investor networks
                </p>
              </div>
            </div>

           
          </div>
        </div>
      </section>

      {/* 3. FORM */}
      <section className="border-t border-white/10 bg-[#0B0E15]">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-10 lg:py-28 fade-up-delay-2">
          <div className="border border-white/10 bg-white/5 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:border-[#D4AF37]/30 md:p-12">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
                Owner Inquiry
              </p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Tell Us About Your Property
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
                Share your details for a discreet consultation and tailored
                strategy. The more context you provide, the more precisely we
                can assess positioning, pricing, and the right route to market.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-300">Your Role</label>
                <select
                  name="role"
                  onChange={handleChange}
                  value={form.role}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>Property Owner</option>
                  <option>Owner Representative</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">Purpose</label>
                <select
                  name="purpose"
                  onChange={handleChange}
                  value={form.purpose}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>Sell</option>
                  <option>Rent Out</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">Property Type</label>
                <select
                  name="propertyType"
                  onChange={handleChange}
                  value={form.propertyType}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                  <option>Entire Floor</option>
                  <option>Plot</option>
                  <option>Building</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Property Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Palm Jumeirah, Emirates Hills, Dubai Marina..."
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Timeline</label>
                <select
                  name="timeline"
                  onChange={handleChange}
                  value={form.timeline}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>Just Exploring</option>
                  <option>Ready Immediately</option>
                  <option>Near Future</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Expected Price
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="AED ..."
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">WhatsApp</label>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="+971..."
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Preferred Contact
                </label>
                <select
                  name="contactMethod"
                  onChange={handleChange}
                  value={form.contactMethod}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>WhatsApp</option>
                  <option>Call</option>
                  <option>Email</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300">
                  Marketing Preference
                </label>
                <select
                  name="marketing"
                  onChange={handleChange}
                  value={form.marketing}
                  className="mt-2 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                >
                  <option value="">Select</option>
                  <option>Public Listing</option>
                  <option>Off-Market Only</option>
                  <option>Need Advice</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-300">
                  Additional Information
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="mt-2 h-32 w-full border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition duration-300 focus:border-[#D4AF37] focus:bg-black/40"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full rounded-sm bg-[#D4AF37] py-4 font-medium text-black transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
                >
                  Submit & Connect via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}