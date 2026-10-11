import { publicBlobUrl } from "@/lib/public-blob-url";
import { createHash } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FEED_PATHNAME = "bayut/feed.xml";
const CANDIDATE_PREFIX = "bayut/candidates";
const MAX_BLOB_ATTEMPTS = 3;
const TRANSIENT_BLOB_STATUSES = new Set([429, 500, 502, 503, 504]);

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

function successHeaders(sha256: string, count: number, candidateMode: boolean) {
  return {
    etag: `\"${sha256}\"`,
    "cache-control": candidateMode ? "public, max-age=31536000, s-maxage=31536000, immutable" : "public, max-age=60, s-maxage=60, stale-while-revalidate=60",
    "x-content-type-options": "nosniff",
    "x-pama-feed-sha256": sha256,
    "x-pama-feed-listings": String(count),
  };
}

export async function GET(request: Request) {
  let blobReadUrl: string;
  try { blobReadUrl = publicBlobUrl(FEED_PATHNAME); } catch {
    return new Response("Bayut feed is not configured.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const requestUrl = new URL(request.url);
  const candidateParam = requestUrl.searchParams.get("candidate")?.trim() ?? "";
  if (candidateParam && !/^[a-f0-9]{64}$/i.test(candidateParam)) {
    return new Response("Invalid Bayut feed candidate.", {
      status: 400,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const candidateSha = candidateParam.toLowerCase();
  const candidateMode = Boolean(candidateSha);
  const requestedPathname = candidateMode ? `${CANDIDATE_PREFIX}/${candidateSha}.xml` : FEED_PATHNAME;

  blobReadUrl = publicBlobUrl(requestedPathname);

  const upstream = await fetchWithTransientRetry(blobReadUrl, { cache: "no-store" }, candidateMode ? "candidate Blob read" : "Blob read");
  if (!upstream.ok) {
    return new Response("Bayut feed is temporarily unavailable.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const xml = await upstream.text();
  if (!looksLikeBayutFeed(xml)) {
    console.error("Bayut feed Blob failed XML envelope validation", { candidateMode, requestedPathname });
    return new Response("Bayut feed is temporarily unavailable.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const sha256 = createHash("sha256").update(xml, "utf8").digest("hex");
  if (candidateMode && sha256 !== candidateSha) {
    console.error("Bayut immutable candidate SHA verification failed", {
      expected: candidateSha,
      received: sha256,
      requestedPathname,
    });
    return new Response("Bayut feed candidate integrity verification failed.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-content-type-options": "nosniff" },
    });
  }

  const count = listingCount(xml);
  const headers = successHeaders(sha256, count, candidateMode);
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
