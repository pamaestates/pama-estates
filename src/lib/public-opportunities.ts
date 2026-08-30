export type PublicOpportunity = {
  slug: string
  title: string
  community: string
  propertyType: string
  bedrooms?: string
  sizeSqFt?: number
  askingPriceAed?: number
  originalPriceAed?: number
  ownerAcquisitionPriceAed?: number
  currentAnnualRentAed?: number
  estimatedAnnualRentAed?: number
  serviceChargeAedPerSqFt?: number
  completion?: string
  paymentPlan?: string
  thesis: string
  highlights: string[]
  verificationNote: string
  publicationStatus: "DRAFT" | "PUBLISHED"
}

/**
 * Public opportunity records must be publication-safe and explicitly approved.
 * Do not populate this array from private CRM/off-market data automatically.
 * Asking prices are not achieved transaction prices and must be labelled accordingly.
 */
const opportunities: PublicOpportunity[] = []

export function getPublishedOpportunities() {
  return opportunities.filter((opportunity) => opportunity.publicationStatus === "PUBLISHED")
}

export function getPublishedOpportunityBySlug(slug: string) {
  return getPublishedOpportunities().find((opportunity) => opportunity.slug === slug)
}
