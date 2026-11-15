/** Format user-entered numeric AED values for display without rounding. */
export function formatAedInput(value: string): string {
  const trimmed = value.trim()
  const numeric = trimmed.replace(/^AED\s*/i, "").replace(/,/g, "").trim()
  if (!/^\d+(?:\.\d*)?$/.test(numeric)) return value
  const [whole, fraction] = numeric.split(".")
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return `${grouped}${fraction === undefined ? "" : `.${fraction}`}`
}

/** Format an optional AED value for WhatsApp text, retaining free-text values such as N/A. */
export function formatAedAmount(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return "-"
  const numeric = trimmed.replace(/^AED\s*/i, "").replace(/,/g, "").trim()
  if (!/^\d+(?:\.\d+)?$/.test(numeric)) return trimmed
  return `AED ${formatAedInput(numeric)}`
}
