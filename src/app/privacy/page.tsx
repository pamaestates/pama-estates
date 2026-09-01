import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How PAMA Estates handles information submitted through pamaestates.com.",
  alternates: { canonical: "https://pamaestates.com/privacy" },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "Who is responsible",
    body: "PAMA ESTATES L.L.C is responsible for the handling of personal information submitted through pamaestates.com for its real estate advisory and brokerage activities. Privacy questions can be sent to info@pamaestates.com.",
  },
  {
    title: "Information you choose to provide",
    body: "When you submit an enquiry, private-access request or property review, we may receive your name, email address, mobile or WhatsApp number, property or search requirements and any additional information you include in the form.",
  },
  {
    title: "Website enquiry context",
    body: "To keep the conversation connected to the enquiry, the website may also record the page from which the form was submitted and campaign attribution parameters such as UTM source, medium, campaign, content and term when they are present in the page URL.",
  },
  {
    title: "How enquiry information is used",
    body: "Enquiry information is used to respond to your request, understand your property or search requirement, maintain the relevant business relationship and record the interaction in PAMA Estates' internal CRM. Website forms do not automatically publish your information or private property details.",
  },
  {
    title: "WhatsApp and external services",
    body: "Some forms continue the conversation through WhatsApp only after the website has successfully recorded the enquiry in PAMA Estates' internal CRM. WhatsApp is a separate service and its own terms and privacy practices apply when you choose to use it. Links to other external services are governed by the privacy practices of those services.",
  },
  {
    title: "Data quality and security",
    body: "PAMA Estates uses access controls and server-side systems intended to limit unnecessary exposure of enquiry information. Please do not submit passwords, payment-card information, bank credentials or other secrets through public website forms.",
  },
  {
    title: "Retention",
    body: "Business enquiry records may be retained where reasonably required for client service, transaction history, legal or regulatory obligations and legitimate business administration. Retention may therefore differ depending on the nature of the enquiry and any subsequent transaction or compliance requirement.",
  },
  {
    title: "Your choices and data rights",
    body: "Subject to applicable UAE law and any lawful retention obligations, you may contact PAMA Estates to ask about personal information you submitted, request correction of inaccurate information, or request restriction, cessation or deletion where the relevant right applies. We may need to verify identity before acting on a request.",
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#090C12] text-[#F5F2EA]">
      <section className="border-t border-white/[0.08] bg-[#0F131B]">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E0C46B]">Privacy</p>
          <h1 className="mt-5 text-5xl leading-[0.98] md:text-7xl">Clear handling of private enquiries.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-[#B5BAC3] md:text-lg">
            PAMA Estates handles website enquiries as private business communications. This notice explains the information the current website collects through its enquiry flows, why it is used and how to contact us about it.
          </p>
          <p className="mt-5 text-sm text-[#7A818C]">Last updated: 31 August 2026</p>
        </div>
      </section>

      <section className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 lg:py-20">
          <div className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="bg-[#0C1017] p-7 md:p-9">
                <h2 className="text-2xl leading-tight">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#9AA1AD]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-md border border-[#D4AF37]/20 bg-[#D4AF37]/[0.045] p-7 md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E0C46B]">Privacy contact</p>
            <h2 className="mt-4 text-3xl">Speak directly with PAMA Estates.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#9AA1AD]">
              For a privacy question or request concerning information submitted through this website, contact PAMA Estates using the details below.
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#C9CDD4] sm:flex-row sm:gap-6">
              <a href="mailto:info@pamaestates.com" className="transition hover:text-[#E0C46B]">info@pamaestates.com</a>
              <a href="tel:+971559003888" className="transition hover:text-[#E0C46B]">+971 55 900 3888</a>
            </div>
          </div>

          <p className="mt-8 text-xs leading-6 text-[#7A818C]">
            This notice describes the current public website enquiry flows. It does not replace any additional privacy or regulatory notices that may apply to a specific brokerage transaction or legal obligation.
          </p>

          <Link href="/" className="mt-10 inline-flex text-sm font-medium text-[#E0C46B] transition hover:text-white">
            Return to PAMA Estates →
          </Link>
        </div>
      </section>
    </main>
  )
}
