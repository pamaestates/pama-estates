import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 25 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  "application/xml",
  "text/xml",
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
  if (!value.startsWith("bayut/")) return false;
  if (value.includes("..") || value.includes("\\") || value.includes("//")) return false;
  return /^bayut\/[A-Za-z0-9._/-]{1,900}$/.test(value);
}

export async function PUT(request: Request) {
  const configuredSecret = (
    process.env.PAMA_PUBLICATION_RELAY_SECRET ||
    process.env.PAMA_CORE_WEBSITE_INGEST_SECRET ||
    ""
  ).trim();
  const suppliedSecret = request.headers.get("x-pama-publication-secret")?.trim() ?? "";
  if (!configuredSecret || !suppliedSecret || !secureEqual(configuredSecret, suppliedSecret)) {
    return Response.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const storeId = process.env.BLOB_STORE_ID?.trim() ?? "";
  const oidcToken = process.env.VERCEL_OIDC_TOKEN?.trim() ?? "";
  if (!storeId || !oidcToken) {
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

  const isFeed = contentType === "application/xml" || contentType === "text/xml";
  const blobUrl = `https://vercel.com/api/blob/?pathname=${encodeURIComponent(pathname)}`;
  const upstream = await fetch(blobUrl, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${oidcToken}`,
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
  if (!upstream.ok) {
    console.error("Portal publication Blob upload failed", upstream.status, responseText.slice(0, 1000));
    return Response.json({ ok: false, error: "Publication storage upload failed." }, { status: 502 });
  }

  let blob: Record<string, unknown> = {};
  try {
    blob = JSON.parse(responseText) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Publication storage returned an invalid response." }, { status: 502 });
  }

  const publicUrl = typeof blob.url === "string" ? blob.url : null;
  if (!publicUrl?.startsWith("https://")) {
    return Response.json({ ok: false, error: "Publication storage did not return a durable HTTPS URL." }, { status: 502 });
  }

  return Response.json({
    ok: true,
    pathname,
    url: publicUrl,
    contentType: typeof blob.contentType === "string" ? blob.contentType : contentType,
    etag: typeof blob.etag === "string" ? blob.etag : null,
  });
}
