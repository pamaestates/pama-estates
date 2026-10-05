import { createHash } from "node:crypto"
import { validatePublicPropertyFeed } from "@/lib/public-properties"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const FEED_PATHNAME = "website/properties.json"
const BLOB_LIST_URL = "https://blob.vercel-storage.com"
const MAX_ATTEMPTS = 3
const TRANSIENT_STATUSES = new Set([429, 500, 502, 503, 504])

function normalizeBlobStoreId(value: string) {
  return value.startsWith("store_") ? value.slice("store_".length) : value
}

function storeIdFromReadWriteToken(token: string) {
  const parts = token.split("_")
  if (parts.length < 5 || parts[0] !== "vercel" || parts[1] !== "blob" || parts[2] !== "rw") return ""
  return parts[3] ?? ""
}

function blobCredentials() {
  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? ""
  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() ?? ""
  const configuredStoreId = normalizeBlobStoreId(process.env.BLOB_STORE_ID?.trim() ?? "")
  const token = readWriteToken || oidcToken
  const storeId = readWriteToken ? storeIdFromReadWriteToken(readWriteToken) : configuredStoreId
  return { token, storeId }
}

function isSafeBlobUrl(value: unknown): value is string {
  if (typeof value !== "string") return false
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname.endsWith(".blob.vercel-storage.com")
  } catch {
    return false
  }
}

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
  const { token, storeId } = blobCredentials()
  if (!token || !storeId) {
    return Response.json({ error: "Property feed is not configured." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  const listUrl = new URL(BLOB_LIST_URL)
  listUrl.searchParams.set("prefix", FEED_PATHNAME)
  listUrl.searchParams.set("limit", "20")
  listUrl.searchParams.set("mode", "expanded")

  const listed = await fetchWithRetry(listUrl, {
    headers: {
      authorization: `Bearer ${token}`,
      "x-vercel-blob-store-id": storeId,
      "x-api-version": "12",
    },
    cache: "no-store",
  })
  if (!listed.ok) return Response.json({ error: "Property feed is temporarily unavailable." }, { status: 503, headers: { "cache-control": "no-store" } })

  const payload = await listed.json().catch(() => null) as {
    blobs?: Array<{ pathname?: unknown; url?: unknown; uploadedAt?: unknown }>
  } | null
  const candidates = (payload?.blobs ?? [])
    .filter((blob) => blob.pathname === FEED_PATHNAME && isSafeBlobUrl(blob.url))
    .sort((a, b) => String(b.uploadedAt ?? "").localeCompare(String(a.uploadedAt ?? "")))
  const feedBlob = candidates[0]

  if (!feedBlob || !isSafeBlobUrl(feedBlob.url)) {
    return Response.json({ schemaVersion: 1, generatedAt: new Date(0).toISOString(), properties: [] }, {
      status: 200,
      headers: { "cache-control": "public, max-age=30, s-maxage=30", "x-content-type-options": "nosniff" },
    })
  }

  const blobReadUrl = new URL(feedBlob.url)
  if (typeof feedBlob.uploadedAt === "string" && feedBlob.uploadedAt.trim()) {
    blobReadUrl.searchParams.set("pama_rev", feedBlob.uploadedAt.trim())
  }

  const upstream = await fetchWithRetry(blobReadUrl, { cache: "no-store" })
  if (!upstream.ok) return Response.json({ error: "Property feed is temporarily unavailable." }, { status: 503, headers: { "cache-control": "no-store" } })

  const body = await upstream.text()
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return Response.json({ error: "Property feed failed JSON validation." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  const feed = validatePublicPropertyFeed(parsed)
  if (!feed) {
    return Response.json({ error: "Property feed failed publication-safety validation." }, { status: 503, headers: { "cache-control": "no-store" } })
  }

  const sha256 = createHash("sha256").update(body, "utf8").digest("hex")
  const headers = {
    etag: `\"${sha256}\"`,
    "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
    "content-type": "application/json; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-pama-properties-sha256": sha256,
    "x-pama-properties-count": String(feed.properties.length),
  }

  if (request.headers.get("if-none-match") === headers.etag) return new Response(null, { status: 304, headers })
  return new Response(body, { status: 200, headers })
}
