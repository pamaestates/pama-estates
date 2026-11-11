export const POLISH_WHATSAPP_NUMBER = "971559003888"

/** Include the exact Polish page path and a human-readable lead source in every message. */
export function polishWhatsAppHref(pathname: string, subject?: string): string {
  const path = pathname === "/pl" || pathname.startsWith("/pl/")
    ? pathname.split("?")[0].split("#")[0]
    : "/pl"
  const message = [
    "Dzień dobry, kontaktuję się przez polską stronę PAMA Estates.",
    `Źródło: https://www.pamaestates.com${path}`,
    ...(subject ? [`Temat: ${subject}`] : []),
    "Proszę o kontakt.",
  ].join("\n")
  return `https://wa.me/${POLISH_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
