import { polishPages } from "@/lib/pl-content"

/** True for exact homepage only; nested pages highlight their own navigation item. */
export function isActiveNavigationPath(pathname: string, href: string): boolean {
  if (href === "/" || href === "/pl") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const POLISH_UNAVAILABLE_PATH = "/pl/language-unavailable"

/** Only internal English paths can be linked from the language-unavailable notice. */
export function safeEnglishSourcePath(value: string | null | undefined): string | null {
  if (!value || value.length > 512 || !value.startsWith("/") || value.startsWith("//")) return null
  if (value.startsWith("/pl/") || value === "/pl" || /[\\%\r\n\t?#]/.test(value)) return null
  return value
}

function isMappedEnglishPath(pathname: string): boolean {
  return pathname === "/" ||
    pathname === "/properties" || pathname.startsWith("/properties/") ||
    Boolean(polishPages[pathname.replace(/^\//, "")])
}

function isMappedPolishPath(pathname: string): boolean {
  if (pathname === "/pl") return true
  if (!pathname.startsWith("/pl/")) return false
  const key = pathname.slice(4)
  return key === "properties" || key.startsWith("properties/") || Boolean(polishPages[key])
}

/** Unmapped English routes receive an explanatory Polish page, not a silent homepage redirect. */
export function alternateLanguagePath(pathname: string): string {
  if (pathname === "/pl" || pathname === "/pl/") return "/"
  if (pathname === POLISH_UNAVAILABLE_PATH) return "/"
  if (pathname.startsWith("/pl/")) {
    return isMappedPolishPath(pathname) ? pathname.slice(3) : "/"
  }
  if (isMappedEnglishPath(pathname)) return pathname === "/" ? "/pl" : `/pl${pathname}`
  return POLISH_UNAVAILABLE_PATH
}

/** Preserve filters/anchors for actual counterparts; do not append them to unrelated pages. */
export function alternateLanguageUrl(pathname: string, search = "", hash = ""): string {
  if (pathname === POLISH_UNAVAILABLE_PATH) {
    const from = search.startsWith("?") && !/[\r\n]/.test(search)
      ? new URLSearchParams(search).get("from")
      : null
    return safeEnglishSourcePath(from) ?? "/"
  }
  const target = alternateLanguagePath(pathname)
  if (target === POLISH_UNAVAILABLE_PATH) {
    const source = safeEnglishSourcePath(pathname)
    return source ? `${target}?from=${encodeURIComponent(source)}` : target
  }
  const mapped = isMappedEnglishPath(pathname) || isMappedPolishPath(pathname)
  if (!mapped) return target

  const safeSearch = search.startsWith("?") && !/[\r\n]/.test(search) ? search : ""
  const safeHash = hash.startsWith("#") && !/[\r\n]/.test(hash) ? hash : ""
  if (pathname === "/" && safeHash === "#private-access") return "/pl#zapytanie"
  if ((pathname === "/pl" || pathname === "/pl/") && safeHash === "#zapytanie") return "/#private-access"
  return `${target}${safeSearch}${safeHash}`
}
