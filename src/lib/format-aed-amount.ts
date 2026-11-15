/** Format user-entered AED values for WhatsApp text only; never round or modify form state. */
export function formatAedAmount(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return "-"
  const numeric = trimmed.replace(/^AED\s*/i, "").replace(/,/g, "").trim()
  if (!/^\d+(?:\.\d+)?$/.test(numeric)) return trimmed
  const [whole, fraction] = numeric.split(".")
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return `AED ${grouped}${fraction === undefined ? "" : `.${fraction}`}`
}
