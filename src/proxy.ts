import { NextRequest, NextResponse } from "next/server"
import {
  pamaWebsiteEnEnabled,
  pamaWebsitePlEnabled,
} from "@/flags"
import {
  normalizeAvailability,
  isPublicPageAllowed,
  websiteMode,
} from "@/lib/website-availability"

function unavailableResponse(polishOnly: boolean): NextResponse {
  const status = polishOnly ? 404 : 503
  const heading = polishOnly
    ? "Polska wersja jest chwilowo niedostępna"
    : "Website Under Maintenance"
  const message = polishOnly
    ? "Zapraszamy do angielskiej wersji naszej strony."
    : "We are currently improving our website."
  const link = polishOnly ? "/" : "mailto:info@pamaestates.com"
  const label = polishOnly ? "English Website" : "Contact PAMA Estates"

  const html = `<!doctype html>
<html lang="${polishOnly ? "pl" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${heading} | PAMA Estates</title>
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;background:#090c12;color:#f5f2ea;
font-family:Arial,sans-serif;display:grid;place-items:center;padding:24px}
main{max-width:650px;text-align:center}
small{color:#d4af37;letter-spacing:.2em}
h1{font-size:clamp(30px,5vw,54px);font-weight:400;margin:28px 0}
p{color:#c9cdd4;font-size:18px;line-height:1.7}
a{display:inline-block;margin-top:24px;padding:15px 25px;
background:#d4af37;color:#090c12;border-radius:5px;
text-decoration:none;font-weight:700}
</style>
</head>
<body><main>
<small>PAMA ESTATES</small>
<h1>${heading}</h1>
<p>${message}</p>
<a href="${link}">${label}</a>
</main></body></html>`

  return new NextResponse(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
      ...(polishOnly ? {} : { "Retry-After": "300" }),
    },
  })
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Never gate operational API requests through website visibility flags.
  if (pathname === "/api" || pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  let configuration: unknown = null

  try {
    const [englishEnabled, polishEnabled] = await Promise.all([
      pamaWebsiteEnEnabled(),
      pamaWebsitePlEnabled(),
    ])
    configuration = { englishEnabled, polishEnabled }
  } catch {
    // EN remains available; PL remains closed on flag evaluation failure.
  }

  const availability = normalizeAvailability(configuration)
  const isPolish = pathname === "/pl" || pathname.startsWith("/pl/")

  if (!isPublicPageAllowed(pathname, availability)) {
    return unavailableResponse(websiteMode(availability) !== "MAINTENANCE")
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pama-locale", isPolish ? "pl" : "en")
  requestHeaders.set(
    "x-pama-pl-enabled",
    String(availability.polishEnabled),
  )

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    "/((?!api/|_next/|favicon.ico|.*\\..*).*)",
    "/robots.txt",
    "/sitemap.xml",
  ],
}