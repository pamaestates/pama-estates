import { polishPages } from "@/lib/pl-content"

/** Only expose language-switch targets that have a real localised route. */
export function alternateLanguagePath(pathname: string): string {
  if (pathname === "/pl" || pathname === "/pl/") return "/"
  if (pathname.startsWith("/pl/")) return pathname.slice(3)

  if (pathname === "/") return "/pl"
  if (pathname === "/properties" || pathname.startsWith("/properties/")) return `/pl${pathname}`
  if (polishPages[pathname.replace(/^\//, "")]) return `/pl${pathname}`
  return "/pl"
}
