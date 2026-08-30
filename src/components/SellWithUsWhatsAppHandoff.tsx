"use client"

import { useEffect } from "react"

export default function SellWithUsWhatsAppHandoff({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const originalOpen = window.open

    window.open = ((url?: string | URL, target?: string, features?: string) => {
      const href = typeof url === "string" ? url : url?.toString()

      if (href?.startsWith("https://wa.me/")) {
        window.location.assign(href)
        return null
      }

      return originalOpen.call(window, url, target, features)
    }) as typeof window.open

    return () => {
      window.open = originalOpen
    }
  }, [])

  return children
}
