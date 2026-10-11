import { publicBlobUrl } from "@/lib/public-blob-url";
import { createHash } from "node:crypto"
import { sanitizePublicPropertyFeed, validatePublicPropertyFeed } from "@/lib/public-properties"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const FEED_PATHNAME = "website/properties.json"
const MAX_ATTEMPTS = 3
const TRANSIENT_STATUSES = new Set([429, 500, 502, 503, 504])

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string | URL, init: RequestInit) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, init)
      if (response.ok || !TRANSIENT_STATUSES.has(response.status) || attempt === MAX_ATTEMPTS) return response
    } catch {
      if (attempt === MAX_ATTEMPTS) break
    }
    await wait(200 * 2 ** (attempt - 1))
  }
  return new Response("Property feed storage request failed.", { status: 503 })
}

export async function GET(request: Request) {
  let blobReadUrl: string
  try { blobReadUrl = publicBlobUrl(FEED_PATHNAME) } catch {
    return Response.json({ error: "Property feed is not configured." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  const upstream = await fetchWithRetry(blobReadUrl, { cache: "no-store" })
  if (upstream.status === 404) return Response.json({ schemaVersion: 1, generatedAt: new Date(0).toISOString(), properties: [] }, { headers: { "cache-control": "public, max-age=30, s-maxage=30", "x-content-type-options": "nosniff" } })
  if (!upstream.ok) return Response.json({ error: "Property feed is temporarily unavailable." }, { status: 503, headers: { "cache-control": "no-store" } })

  const body = await upstream.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return Response.json({ error: "Property feed failed JSON validation." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  const validatedFeed = validatePublicPropertyFeed(parsed)
  if (!validatedFeed) {
    return Response.json({ error: "Property feed failed publication-safety validation." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  // Defense in depth: sanitize precision at the public edge even if an older or regressed producer blob contains exact values.
  const feed = sanitizePublicPropertyFeed(validatedFeed)
  const publicBody = JSON.stringify(feed)
  const sha256 = createHash("sha256").update(publicBody, "utf8").digest("hex")
  const headers = {
    etag: `\"${sha256}\"`,
    "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-pama-properties-sha256": sha256,
    "x-pama-properties-count": String(feed.properties.length),
  }

  if (request.headers.get("if-none-match") === headers.etag) return new Response(null, { status: 304, headers })
  return new Response(publicBody, { status: 200, headers })
}
