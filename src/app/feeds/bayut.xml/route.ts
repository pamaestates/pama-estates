import { NextResponse } from "next/server";
import { publicationRelayConfigured, readActiveBayutSnapshot } from "@/lib/publication-relay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
  "X-Content-Type-Options": "nosniff",
} as const;

export async function GET(request: Request) {
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
    if (request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers: { ...XML_HEADERS, ETag: etag } });
    }

    return new Response(snapshot.xml, {
      status: 200,
      headers: {
        ...XML_HEADERS,
        ETag: etag,
        "Last-Modified": new Date(snapshot.approved_at || snapshot.generated_at).toUTCString(),
        "X-PAMA-Publication-Revision": snapshot.source_revision,
      },
    });
  } catch (error) {
    console.error("Bayut publication feed unavailable", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "Publication feed is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
