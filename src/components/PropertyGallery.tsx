'use client'

import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { PublicPropertyImage } from "@/lib/public-properties"

type PropertyGalleryProps = {
  images: PublicPropertyImage[]
  title: string
  completionStatus?: string
  pricePositionPct?: number
}

export function PropertyGallery({ images, title, completionStatus, pricePositionPct }: PropertyGalleryProps) {
  const coverIndex = useMemo(() => {
    const found = images.findIndex((image) => image.isCover)
    return found >= 0 ? found : 0
  }, [images])
  const [selectedIndex, setSelectedIndex] = useState(coverIndex)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const selected = images[selectedIndex]
  const hasMany = images.length > 1

  const previous = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((index) => (index - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((index) => (index + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false)
      if (event.key === "ArrowLeft") previous()
      if (event.key === "ArrowRight") next()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [lightboxOpen, next, previous])

  if (!selected) return null

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-0 md:px-6">
        <div className="group relative aspect-[16/10] max-h-[78vh] overflow-hidden bg-[#111722] md:aspect-[16/8]">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 z-10 cursor-zoom-in"
            aria-label={`Enlarge photo ${selectedIndex + 1} of ${images.length}`}
          >
            <span className="sr-only">Open full-screen gallery</span>
          </button>
          <Image
            key={selected.url}
            src={selected.url}
            alt={selected.alt || title}
            fill
            priority={selectedIndex === coverIndex}
            sizes="100vw"
            className="object-cover transition-opacity duration-300"
          />

          {hasMany ? (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); previous() }}
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 border border-white/30 bg-black/45 px-4 py-3 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-black/70 md:left-6"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 border border-white/30 bg-black/45 px-4 py-3 text-2xl leading-none text-white backdrop-blur-sm transition hover:bg-black/70 md:right-6"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/70 to-transparent p-5 pt-20 md:p-8">
            <div className="flex flex-wrap gap-2">
              {completionStatus ? <Badge>{completionStatus}</Badge> : null}
              {pricePositionPct != null && pricePositionPct < 0 ? <Badge>{Math.abs(pricePositionPct).toFixed(1)}% below original price</Badge> : null}
            </div>
            <div className="flex items-center gap-2">
              <span className="border border-white/25 bg-black/35 px-3 py-2 text-xs backdrop-blur-sm">{selectedIndex + 1} / {images.length}</span>
              <span className="hidden border border-white/25 bg-black/35 px-3 py-2 text-xs backdrop-blur-sm sm:inline">Click to enlarge</span>
            </div>
          </div>
        </div>
      </section>

      {images.length > 1 ? (
        <section className="mx-auto max-w-7xl px-6 py-6 md:px-10 md:py-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Gallery · all {images.length} photos</p>
            <button type="button" onClick={() => setLightboxOpen(true)} className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition hover:text-[#E1C259]">
              View full screen
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-color:#374151_transparent] [scrollbar-width:thin]">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                onDoubleClick={() => { setSelectedIndex(index); setLightboxOpen(true) }}
                className={`relative aspect-[4/3] w-[44vw] shrink-0 overflow-hidden border bg-[#111722] transition sm:w-[230px] md:w-[260px] ${index === selectedIndex ? "border-[#D4AF37]" : "border-white/10 hover:border-white/35"}`}
                aria-label={`Show photo ${index + 1} of ${images.length} in the main viewer`}
                aria-current={index === selectedIndex ? "true" : undefined}
              >
                <Image src={image.url} alt={image.alt || `${title} photo ${index + 1}`} fill sizes="(max-width: 640px) 44vw, 260px" className="object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-[10px] text-white">{index + 1}</span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-600">Select any thumbnail to show it above. Click the large image or “View full screen” to enlarge; use ←/→ or the arrow keys to move through every photo.</p>
        </section>
      ) : null}

      {lightboxOpen ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Property photo gallery">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-300">{selectedIndex + 1} / {images.length}</p>
            <button type="button" onClick={() => setLightboxOpen(false)} className="border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black" aria-label="Close gallery">
              Close ×
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <Image key={`lightbox-${selected.url}`} src={selected.url} alt={selected.alt || title} fill priority sizes="100vw" className="object-contain p-4 md:p-8" />
            {hasMany ? (
              <>
                <button type="button" onClick={previous} className="absolute left-3 top-1/2 -translate-y-1/2 border border-white/30 bg-black/55 px-4 py-3 text-3xl text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:left-6" aria-label="Previous photo">‹</button>
                <button type="button" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 border border-white/30 bg-black/55 px-4 py-3 text-3xl text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:right-6" aria-label="Next photo">›</button>
              </>
            ) : null}
          </div>

          {hasMany ? (
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-3 md:p-4">
              {images.map((image, index) => (
                <button key={`lightbox-thumb-${image.url}-${index}`} type="button" onClick={() => setSelectedIndex(index)} className={`relative h-16 w-24 shrink-0 overflow-hidden border md:h-20 md:w-28 ${index === selectedIndex ? "border-[#D4AF37]" : "border-white/15"}`} aria-label={`Open photo ${index + 1}`}>
                  <Image src={image.url} alt="" fill sizes="112px" className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">{children}</span>
}
