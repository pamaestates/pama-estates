import { NextResponse } from "next/server";
import { publicationRelayConfigured, readActiveBayutSnapshot } from "@/lib/publication-relay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  // Do not serve stale compliance/listing state. A short shared-cache window reduces
  // repeated origin work but every expired response must be revalidated.
  "Cache-Control": "public, max-age=0, s-maxage=60, must-revalidate",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
} as const;

async function activeFeedResponse(request: Request, headOnly: boolean) {
  if (!publicationRelayConfigured()) {
    return NextResponse.json(
      { error: "Publication feed is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const snapshot = await readActiveBayutSnapshot();
    if (!snapshot?.xml?.trim()) {
      return NextResponse.json(
        { error: "No approved Bayut publication snapshot is active." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    const etag = `\"sha256-${snapshot.xml_sha256}\"`;
    const headers = {
      ...XML_HEADERS,
      ETag: etag,
      "Last-Modified": new Date(snapshot.approved_at || snapshot.generated_at).toUTCString(),
      "X-PAMA-Publication-Revision": snapshot.source_revision,
    };

    if (request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers });
    }

    return new Response(headOnly ? null : snapshot.xml, { status: 200, headers });
  } catch (error) {
    console.error("Bayut publication feed unavailable", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "Publication feed is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function GET(request: Request) {
  return activeFeedResponse(request, false);
}

export async function HEAD(request: Request) {
  return activeFeedResponse(request, true);
}
