import { createHash } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEED_PATHNAME = "bayut/feed.xml";
const BLOB_LIST_URL = "https://blob.vercel-storage.com";

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

export async function GET(request: Request) {
  const { token, storeId } = blobCredentials();
  if (!token || !storeId) {
    return new Response("Bayut feed is not configured.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const listUrl = new URL(BLOB_LIST_URL);
  listUrl.searchParams.set("prefix", FEED_PATHNAME);
  listUrl.searchParams.set("limit", "20");
  listUrl.searchParams.set("mode", "expanded");

  const listed = await fetch(listUrl, {
    headers: {
      authorization: `Bearer ${token}`,
      "x-vercel-blob-store-id": storeId,
      "x-api-version": "12",
    },
    cache: "no-store",
  });

  if (!listed.ok) {
    console.error("Bayut feed Blob lookup failed", listed.status, (await listed.text()).slice(0, 500));
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

  const upstream = await fetch(feedBlob.url, { cache: "no-store" });
  if (!upstream.ok) {
    console.error("Bayut feed Blob read failed", upstream.status);
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

  const etag = `\"${createHash("sha256").update(xml, "utf8").digest("hex")}\"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers: {
        etag,
        "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
        "x-content-type-options": "nosniff",
      },
    });
  }

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      etag,
      "cache-control": "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
      "x-content-type-options": "nosniff",
      "content-disposition": "inline; filename=bayut.xml",
    },
  });
}
