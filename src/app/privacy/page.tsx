import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How PAMA Estates handles information submitted through pamaestates.com.",
  // The Polish privacy page is currently a notice, not an approved equivalent legal translation.
  alternates: { canonical: "https://www.pamaestates.com/privacy" },
  robots: { index: true, follow: true },
}

const sections = [
  {
    title: "Who we are and what we collect",
    body: "PAMA ESTATES L.L.C, Dubai, United Arab Emirates, handles personal data related to real estate enquiries and services. This may include your contact details, property requirements, correspondence, website enquiry context and relevant technical or campaign data. We may obtain information from you or from other lawful business sources.",
  },
  {
    title: "Purpose and lawful grounds",
    body: "We use information to respond to enquiries, provide or prepare services, manage business relationships and records, protect legal rights, and meet legal and regulatory obligations. As applicable under relevant law, processing may rely on your request or contract, a legal duty, legitimate interests, or consent where required. Direct marketing is carried out only where lawfully permitted; you may object.",
  },
  {
    title: "Service providers and transfers",
    body: "Where appropriate and lawful, information may be shared with hosting, CRM, communication and technical service providers, professional advisers, authorised authorities and relevant transaction participants. Data may be processed or transferred outside the UAE or European Economic Area subject to applicable legal safeguards.",
  },
  {
    title: "Forms and WhatsApp",
    body: "English website enquiry forms may send information to our internal CRM. Polish website forms prepare a WhatsApp message; preparing it does not send the message or automatically create a CRM record. WhatsApp and other external services also apply their own privacy terms.",
  },
  {
    title: "Retention and security",
    body: "We retain information as reasonably required for client service, business records, legal claims and applicable legal or regulatory duties. Periods depend on the nature of the enquiry and transaction. We use security measures appropriate to the risks. Please do not submit passwords, payment-card data or banking credentials through website forms.",
  },
  {
    title: "Your rights and contact",
    body: "Subject to applicable law and lawful exceptions, you may seek access to information about your data, correction, erasure or restriction, object to direct marketing or withdraw consent where processing relies on it. Where the GDPR applies, other rights and a right to complain to a competent data protection authority may also apply. Contact info@pamaestates.com.",
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
          <p className="mt-5 text-sm text-[#7A818C]">Last updated: 16 November 2026</p>
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
