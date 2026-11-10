import { NextRequest, NextResponse } from "next/server"

/** Locale hint only. No rewrite, redirect, publication or data mutation. */
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pama-locale", request.nextUrl.pathname === "/pl" || request.nextUrl.pathname.startsWith("/pl/") ? "pl" : "en")
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = { matcher: ["/((?!api/|_next/|favicon.ico|.*\\..*).*)"] }
