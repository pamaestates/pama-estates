import { polishPages } from "@/lib/pl-content"

/** True for exact homepage only; nested pages highlight their own navigation item. */
export function isActiveNavigationPath(pathname: string, href: string): boolean {
  if (href === "/" || href === "/pl") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** Routes without a reviewed Polish equivalent deliberately fall back to /pl. */
export function alternateLanguagePath(pathname: string): string {
  if (pathname === "/pl" || pathname === "/pl/") return "/"
  if (pathname.startsWith("/pl/")) return pathname.slice(3)

  if (pathname === "/") return "/pl"
  if (pathname === "/properties" || pathname.startsWith("/properties/")) return `/pl${pathname}`
  if (polishPages[pathname.replace(/^\//, "")]) return `/pl${pathname}`
  return "/pl"
}

/** Preserve catalogue filters and relevant section anchors across language switching. */
export function alternateLanguageUrl(pathname: string, search = "", hash = ""): string {
  const target = alternateLanguagePath(pathname)
  const mapped = pathname === "/" || pathname === "/pl" || pathname === "/pl/" ||
    pathname === "/properties" || pathname.startsWith("/properties/") ||
    pathname === "/pl/properties" || pathname.startsWith("/pl/properties/") ||
    Boolean(polishPages[pathname.replace(/^\//, "")]) || pathname.startsWith("/pl/")
  if (!mapped) return target

  const safeSearch = search.startsWith("?") && !/[\r\n]/.test(search) ? search : ""
  const safeHash = hash.startsWith("#") && !/[\r\n]/.test(hash) ? hash : ""
  if (pathname === "/" && safeHash === "#private-access") return "/pl#zapytanie"
  if ((pathname === "/pl" || pathname === "/pl/") && safeHash === "#zapytanie") return "/#private-access"
  return `${target}${safeSearch}${safeHash}`
}
