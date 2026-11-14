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


const ENGLISH_DEFAULT_WHATSAPP_MESSAGE =
  "Hello PAMA Estates,\n\nI came across your website (pamaestates.com) and would like to explore available opportunities.\n\nCould you please assist?"

/** Preserve generic enquiries outside property detail pages and include the exact property URL on listing pages. */
export function englishWhatsAppHref(pathname: string, subject?: string): string {
  const cleanPath = pathname.split("?")[0].split("#")[0]
  const propertyPath = /^\/properties\/[^/]+\/?$/.test(cleanPath)
  const message = propertyPath
    ? [
        "Hello PAMA Estates, I am interested in this property.",
        ...(subject ? [subject] : []),
        `Property link: https://www.pamaestates.com${cleanPath}`,
        "Could you please confirm its availability and provide further details?",
      ].join("\n")
    : ENGLISH_DEFAULT_WHATSAPP_MESSAGE
  return `https://wa.me/971559003888?text=${encodeURIComponent(message)}`
}
