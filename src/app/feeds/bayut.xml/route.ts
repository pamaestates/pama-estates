import { createHash } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEED_PATHNAME = "bayut/feed.xml";
const BLOB_LIST_URL = "https://blob.vercel-storage.com";
const MAX_BLOB_ATTEMPTS = 3;
const TRANSIENT_BLOB_STATUSES = new Set([429, 500, 502, 503, 504]);

function normalizeBlobStoreId(value: string) {
  return value.startsWith("store_") ? value.slice("store_".length) : value;
}

function storeIdFromReadWriteToken(token: string) {
  const parts = token.split("_");
  if (parts.length < 5 || parts[0] !== "vercel" || parts[1] !== "blob" || parts[2] !== "rw") return "";
  return parts[3] ?? "";
}

function blobCredentials() {
  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() ?? "";
  const configuredStoreId = normalizeBlobStoreId(process.env.BLOB_STORE_ID?.trim() ?? "");
  const token = readWriteToken || oidcToken;
  const storeId = readWriteToken ? storeIdFromReadWriteToken(readWriteToken) : configuredStoreId;
  return { token, storeId };
}

function isSafeBlobUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function looksLikeBayutFeed(xml: string) {
  const value = xml.trim();
  return /^<\?xml\b[^>]*>\s*<Properties(?:\s|>)/i.test(value) && /<\/Properties>\s*$/i.test(value);
}

function listingCount(xml: string) {
  return (xml.match(/<Property>/g) ?? []).length;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTransientRetry(url: string | URL, init: RequestInit, operation: string) {
  let lastStatus = 503;
  let lastText = "";

  for (let attempt = 1; attempt <= MAX_BLOB_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;

      lastStatus = response.status;
      lastText = await response.text();
      const shouldRetry = attempt < MAX_BLOB_ATTEMPTS && TRANSIENT_BLOB_STATUSES.has(response.status);
      console.error(`Bayut feed ${operation} failed`, { status: response.status, attempt, willRetry: shouldRetry }, lastText.slice(0, 500));
      if (!shouldRetry) break;
    } catch (error) {
      lastText = error instanceof Error ? error.message : String(error);
      console.error(`Bayut feed ${operation} network failure`, { attempt, willRetry: attempt < MAX_BLOB_ATTEMPTS }, lastText.slice(0, 500));
      if (attempt >= MAX_BLOB_ATTEMPTS) break;
    }

    await wait(200 * 2 ** (attempt - 1));
  }

  return new Response(lastText || "Bayut feed storage request failed.", { status: lastStatus });
}

function successHeaders(sha256: string, count: number) {
  return {
    etag: `\"${sha256}\"`,
    "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
    "x-content-type-options": "nosniff",
    "x-pama-feed-sha256": sha256,
    "x-pama-feed-listings": String(count),
  };
}

export async function GET(request: Request) {
  const { token, storeId } = blobCredentials();
  if (!token || !storeId) {
    return new Response("Bayut feed is not configured.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const requestUrl = new URL(request.url);
  const candidateSha = requestUrl.searchParams.get("candidate")?.trim() ?? "";

  const listUrl = new URL(BLOB_LIST_URL);
  listUrl.searchParams.set("prefix", FEED_PATHNAME);
  listUrl.searchParams.set("limit", "20");
  listUrl.searchParams.set("mode", "expanded");

  const listed = await fetchWithTransientRetry(listUrl, {
    headers: {
      authorization: `Bearer ${token}`,
      "x-vercel-blob-store-id": storeId,
      "x-api-version": "12",
    },
    cache: "no-store",
  }, "Blob lookup");

  if (!listed.ok) {
    return new Response("Bayut feed is temporarily unavailable.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const payload = await listed.json().catch(() => null) as {
    blobs?: Array<{ pathname?: unknown; url?: unknown; uploadedAt?: unknown }>;
  } | null;
  const candidates = (payload?.blobs ?? [])
    .filter((blob) => blob.pathname === FEED_PATHNAME && isSafeBlobUrl(blob.url))
    .sort((a, b) => String(b.uploadedAt ?? "").localeCompare(String(a.uploadedAt ?? "")));
  const feedBlob = candidates[0];

  if (!feedBlob || !isSafeBlobUrl(feedBlob.url)) {
    return new Response("Bayut feed has not been activated yet.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  // Public Blob URLs can serve a cached pre-overwrite body for up to ~60 seconds.
  // During controlled PAMA read-back, the expected candidate SHA is the strongest
  // cache-busting revision because it is unique to the exact XML just uploaded.
  // Fall back to Blob metadata only for ordinary public reads without a candidate.
  const blobReadUrl = new URL(feedBlob.url);
  const uploadedRevision = typeof feedBlob.uploadedAt === "string" ? feedBlob.uploadedAt.trim() : "";
  const candidateRevision = /^[a-f0-9]{64}$/i.test(candidateSha) ? candidateSha : "";
  const revision = candidateRevision || uploadedRevision;
  if (revision) blobReadUrl.searchParams.set("pama_rev", revision);

  const upstream = await fetchWithTransientRetry(blobReadUrl, { cache: "no-store" }, "Blob read");
  if (!upstream.ok) {
    return new Response("Bayut feed is temporarily unavailable.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const xml = await upstream.text();
  if (!looksLikeBayutFeed(xml)) {
    console.error("Bayut feed Blob failed XML envelope validation");
    return new Response("Bayut feed is temporarily unavailable.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const sha256 = createHash("sha256").update(xml, "utf8").digest("hex");
  const count = listingCount(xml);
  const headers = successHeaders(sha256, count);
  if (request.headers.get("if-none-match") === headers.etag) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(xml, {
    status: 200,
    headers: {
      ...headers,
      "content-type": "application/xml; charset=utf-8",
      "content-disposition": "inline; filename=bayut.xml",
    },
  });
}
