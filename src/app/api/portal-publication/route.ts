import { createHash, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 25 * 1024 * 1024;
const MAX_UPLOAD_ATTEMPTS = 3;
const BAYUT_FEED_PATHNAME = "bayut/feed.xml";
const BAYUT_CANDIDATE_PREFIX = "bayut/candidates";
const TRANSIENT_BLOB_STATUSES = new Set([429, 500, 502, 503, 504]);
const ALLOWED_CONTENT_TYPES = new Set([
  "application/xml",
  "text/xml",
  "application/json",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function secureEqual(left: string, right: string) {
  const a = Buffer.from(left, "utf8");
  const b = Buffer.from(right, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function validPathname(value: string) {
  const namespace = value.startsWith("bayut/") ? "bayut" : value.startsWith("website/") ? "website" : null;
  if (!namespace) return false;
  if (value.includes("..") || value.includes("\\") || value.includes("//")) return false;
  return new RegExp(`^${namespace}\\/[A-Za-z0-9._/-]{1,900}$`).test(value);
}

function normalizeBlobStoreId(value: string) {
  return value.startsWith("store_") ? value.slice("store_".length) : value;
}

function storeIdFromReadWriteToken(token: string) {
  const parts = token.split("_");
  if (parts.length < 5 || parts[0] !== "vercel" || parts[1] !== "blob" || parts[2] !== "rw") {
    return "";
  }
  return parts[3] ?? "";
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function uploadBlob({
  blobToken,
  storeId,
  pathname,
  contentType,
  isFeed,
  body,
}: {
  blobToken: string;
  storeId: string;
  pathname: string;
  contentType: string;
  isFeed: boolean;
  body: ArrayBuffer;
}) {
  let lastStatus = 502;
  let lastText = "";
  const blobUrl = `https://vercel.com/api/blob/?pathname=${encodeURIComponent(pathname)}`;

  for (let attempt = 1; attempt <= MAX_UPLOAD_ATTEMPTS; attempt += 1) {
    const upstream = await fetch(blobUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${blobToken}`,
        "x-vercel-blob-store-id": storeId,
        "x-api-version": "12",
        "x-vercel-blob-access": "public",
        "x-add-random-suffix": "0",
        "x-allow-overwrite": "1",
        "x-content-type": contentType,
        "x-cache-control-max-age": isFeed ? "60" : "31536000",
      },
      body,
    });

    const responseText = await upstream.text();
    lastStatus = upstream.status;
    lastText = responseText;
    if (upstream.ok) return { ok: true as const, status: upstream.status, responseText };

    const shouldRetry = attempt < MAX_UPLOAD_ATTEMPTS && TRANSIENT_BLOB_STATUSES.has(upstream.status);
    console.error(
      "Portal publication Blob upload failed",
      { status: upstream.status, attempt, pathname, willRetry: shouldRetry },
      responseText.slice(0, 1000),
    );
    if (!shouldRetry) break;
    await wait(250 * 2 ** (attempt - 1));
  }

  return { ok: false as const, status: lastStatus, responseText: lastText };
}

function parseBlobResponse(responseText: string) {
  try {
    const blob = JSON.parse(responseText) as Record<string, unknown>;
    const url = typeof blob.url === "string" && blob.url.startsWith("https://") ? blob.url : null;
    return {
      blob,
      url,
      contentType: typeof blob.contentType === "string" ? blob.contentType : null,
      etag: typeof blob.etag === "string" ? blob.etag : null,
    };
  } catch {
    return null;
  }
}

export async function PUT(request: Request) {
  const configuredSecret = (process.env.PAMA_PUBLICATION_RELAY_SECRET ?? "").trim();
  const suppliedSecret = request.headers.get("x-pama-publication-secret")?.trim() ?? "";
  if (!configuredSecret || !suppliedSecret || !secureEqual(configuredSecret, suppliedSecret)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const readWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() ?? "";
  const configuredStoreId = normalizeBlobStoreId(process.env.BLOB_STORE_ID?.trim() ?? "");
  const blobToken = readWriteToken || oidcToken;
  const storeId = readWriteToken ? storeIdFromReadWriteToken(readWriteToken) : configuredStoreId;

  if (!blobToken || !storeId) {
    return Response.json(
      { ok: false, error: "Publication Blob storage is not connected to this Vercel project." },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  const pathname = url.searchParams.get("pathname")?.trim() ?? "";
  if (!validPathname(pathname)) {
    return Response.json({ ok: false, error: "Invalid publication pathname." }, { status: 400 });
  }

  const contentType = (request.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    return Response.json({ ok: false, error: "Unsupported publication content type." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Publication object exceeds 25 MB." }, { status: 413 });
  }

  const body = await request.arrayBuffer();
  if (!body.byteLength || body.byteLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: body.byteLength ? "Publication object exceeds 25 MB." : "Empty publication object." }, { status: body.byteLength ? 413 : 400 });
  }

  const isFeed = contentType === "application/xml" || contentType === "text/xml" || contentType === "application/json";
  const upstream = await uploadBlob({ blobToken, storeId, pathname, contentType, isFeed, body });

  if (!upstream.ok) {
    return Response.json({ ok: false, error: "Publication storage upload failed after retry." }, { status: 502 });
  }

  const parsed = parseBlobResponse(upstream.responseText);
  if (!parsed) {
    return Response.json({ ok: false, error: "Publication storage returned an invalid response." }, { status: 502 });
  }
  if (!parsed.url) {
    return Response.json({ ok: false, error: "Publication storage did not return a durable HTTPS URL." }, { status: 502 });
  }

  // The stable Bayut feed is intentionally overwritten because Bayut consumes one fixed URL.
  // Exact post-upload validation must not read that same CDN object immediately: a public Blob
  // overwrite can still serve the previous cached body for a short period. Persist the exact
  // XML body under a content-addressed immutable pathname as well. PAMA Core already supplies
  // this SHA as ?candidate=... when it performs controlled read-back verification.
  let candidateUrl: string | null = null;
  let sha256: string | null = null;
  if (pathname === BAYUT_FEED_PATHNAME && (contentType === "application/xml" || contentType === "text/xml")) {
    sha256 = createHash("sha256").update(Buffer.from(body)).digest("hex");
    const candidatePathname = `${BAYUT_CANDIDATE_PREFIX}/${sha256}.xml`;
    const candidateUpload = await uploadBlob({
      blobToken,
      storeId,
      pathname: candidatePathname,
      contentType,
      isFeed: true,
      body,
    });
    if (!candidateUpload.ok) {
      return Response.json(
        { ok: false, error: "Stable feed uploaded, but immutable verification candidate storage failed after retry." },
        { status: 502 },
      );
    }
    const candidateParsed = parseBlobResponse(candidateUpload.responseText);
    if (!candidateParsed?.url) {
      return Response.json(
        { ok: false, error: "Stable feed uploaded, but immutable verification candidate did not return a durable HTTPS URL." },
        { status: 502 },
      );
    }
    candidateUrl = candidateParsed.url;
  }

  return Response.json({
    ok: true,
    pathname,
    url: parsed.url,
    contentType: parsed.contentType ?? contentType,
    etag: parsed.etag,
    sha256,
    candidateUrl,
  });
}
