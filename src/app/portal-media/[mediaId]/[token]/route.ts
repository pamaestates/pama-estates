import {
  bayutMediaGatewayConfigured,
  downloadPublicationMedia,
  readPublicationMedia,
  verifyBayutMediaToken,
} from "@/lib/publication-relay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_PUBLIC_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

function notFound() {
  return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
}

function mediaHeaders(media: { mime_type: string; content_sha256: string; file_size_bytes: number | null }) {
  const headers = new Headers({
    "Content-Type": media.mime_type,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
    ETag: `\"sha256-${media.content_sha256}\"`,
  });
  if (media.file_size_bytes && media.file_size_bytes > 0) {
    headers.set("Content-Length", String(media.file_size_bytes));
  }
  return headers;
}

async function resolveMedia(context: { params: Promise<{ mediaId: string; token: string }> }) {
  if (!bayutMediaGatewayConfigured()) return null;
  const { mediaId, token } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(mediaId) || !/^[a-f0-9]{64}$/i.test(token)) return null;
  const media = await readPublicationMedia(mediaId);
  if (!media || !media.active || !verifyBayutMediaToken(media, token)) return null;
  if (!ALLOWED_PUBLIC_MIME_TYPES.has(media.mime_type)) return null;
  return media;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ mediaId: string; token: string }> },
) {
  try {
    const media = await resolveMedia(context);
    if (!media) return notFound();

    const upstream = await downloadPublicationMedia(media);
    if (!upstream.ok || !upstream.body) {
      console.error("Bayut publication media object unavailable", media.id, upstream.status);
      return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
    }

    return new Response(upstream.body, { status: 200, headers: mediaHeaders(media) });
  } catch (error) {
    console.error("Bayut publication media gateway unavailable", error instanceof Error ? error.message : "unknown error");
    return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export async function HEAD(
  _request: Request,
  context: { params: Promise<{ mediaId: string; token: string }> },
) {
  try {
    const media = await resolveMedia(context);
    if (!media) return notFound();
    return new Response(null, { status: 200, headers: mediaHeaders(media) });
  } catch (error) {
    console.error("Bayut publication media HEAD unavailable", error instanceof Error ? error.message : "unknown error");
    return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
