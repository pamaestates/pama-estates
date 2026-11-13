export type WebsiteAvailability = {
  englishEnabled: boolean
  polishEnabled: boolean
}

export type WebsiteMode = "BOTH" | "EN_ONLY" | "MAINTENANCE"

export const SAFE_FALLBACK: WebsiteAvailability = {
  englishEnabled: true,
  polishEnabled: false,
}

export function normalizeAvailability(value: unknown): WebsiteAvailability {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...SAFE_FALLBACK }
  }

  const candidate = value as Record<string, unknown>

  if (
    typeof candidate.englishEnabled !== "boolean" ||
    typeof candidate.polishEnabled !== "boolean"
  ) {
    return { ...SAFE_FALLBACK }
  }

  return {
    englishEnabled: candidate.englishEnabled,
    polishEnabled: candidate.englishEnabled && candidate.polishEnabled,
  }
}

export function websiteMode(value: unknown): WebsiteMode {
  const state = normalizeAvailability(value)
  if (!state.englishEnabled) return "MAINTENANCE"
  return state.polishEnabled ? "BOTH" : "EN_ONLY"
}

export function isPublicPageAllowed(
  pathname: string,
  value: unknown,
): boolean {
  const mode = websiteMode(value)

  if (mode === "MAINTENANCE") return false

  const isPolish = pathname === "/pl" || pathname.startsWith("/pl/")

  return !isPolish || mode === "BOTH"
}