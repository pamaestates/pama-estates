import type { Metadata } from "next"

/**
 * Explicit, OFF-by-default Polish SEO release gate.
 * A deployment or a reviewed translation alone does not authorize indexing.
 * Preview / development deployments never become indexable.
 */
export function polishSeoReleaseEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.VERCEL_ENV === "production" && env.PAMA_PL_SEO_RELEASE_APPROVED === "true"
}

export function polishSeoRobots(
  options: { reviewed?: boolean; legalApproved?: boolean } = {},
  env: NodeJS.ProcessEnv = process.env,
): NonNullable<Metadata["robots"]> {
  const index = polishSeoReleaseEnabled(env) &&
    (options.reviewed !== false) &&
    (options.legalApproved !== false)
  return { index, follow: true }
}
