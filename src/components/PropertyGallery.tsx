'use client'

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { TouchEvent } from "react"
import type { PublicPropertyImage } from "@/lib/public-properties"

type PropertyGalleryProps = {
  images: PublicPropertyImage[]
  title: string
  completionStatus?: string
  pricePositionPct?: number
  pricePositionLabel?: string
}

type SwipeStart = {
  x: number
  y: number
  at: number
}

const SWIPE_DISTANCE_PX = 44
const SWIPE_DOMINANCE = 1.15
const SWIPE_MAX_DURATION_MS = 900

function fallbackPositionLabel(value?: number) {
  if (value == null) return undefined
  if (value < 0) return `${Math.abs(value).toFixed(1)}% below OP`
  if (value > 0) return `${value.toFixed(1)}% above OP`
  return "Approx. at OP"
}

export function PropertyGallery({ images, title, completionStatus, pricePositionPct, pricePositionLabel }: PropertyGalleryProps) {
  const coverIndex = useMemo(() => {
    const found = images.findIndex((image) => image.isCover)
    return found >= 0 ? found : 0
  }, [images])
  const [selectedIndex, setSelectedIndex] = useState(coverIndex)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const swipeStartRef = useRef<SwipeStart | null>(null)
  const lastSwipeAtRef = useRef(0)
  const lightboxThumbnailStripRef = useRef<HTMLDivElement | null>(null)

  const selected = images[selectedIndex]
  const hasMany = images.length > 1
  const positionBadge = pricePositionLabel ?? fallbackPositionLabel(pricePositionPct)

  const previous = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((index) => (index - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    if (!images.length) return
    setSelectedIndex((index) => (index + 1) % images.length)
  }, [images.length])

  const onSwipeStart = useCallback((event: TouchEvent<HTMLElement>) => {
    if (!hasMany) return
    const touch = event.touches[0]
    if (!touch) return
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY, at: Date.now() }
  }, [hasMany])

  const onSwipeEnd = useCallback((event: TouchEvent<HTMLElement>) => {
    const start = swipeStartRef.current
    swipeStartRef.current = null
    if (!hasMany || !start) return

    const touch = event.changedTouches[0]
    if (!touch) return
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    const duration = Date.now() - start.at
    const horizontalEnough = Math.abs(dx) >= SWIPE_DISTANCE_PX && Math.abs(dx) > Math.abs(dy) * SWIPE_DOMINANCE

    if (!horizontalEnough || duration > SWIPE_MAX_DURATION_MS) return
    lastSwipeAtRef.current = Date.now()
    if (dx < 0) next()
    else previous()
  }, [hasMany, next, previous])

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

  useEffect(() => {
    if (!lightboxOpen) return
    const strip = lightboxThumbnailStripRef.current
    const current = strip?.querySelector<HTMLElement>(`[data-gallery-index="${selectedIndex}"]`)
    current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [lightboxOpen, selectedIndex])

  if (!selected) return null

  return (
    <>
      <section className="mx-auto max-w-[1600px] px-0 md:px-6">
        <div
          className="group relative aspect-[16/10] max-h-[78vh] touch-pan-y overflow-hidden bg-[#111722] md:aspect-[16/8]"
          onTouchStart={onSwipeStart}
          onTouchEnd={onSwipeEnd}
        >
          <button
            type="button"
            onClick={() => {
              if (Date.now() - lastSwipeAtRef.current < 500) return
              setLightboxOpen(true)
            }}
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
              {positionBadge ? <Badge>{positionBadge}</Badge> : null}
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
          <p className="mt-2 text-[11px] text-gray-600">Select any thumbnail to show it above. On a phone, swipe left or right on the main photo to move through the gallery. Click the large image or “View full screen” to enlarge; desktop users can also use ←/→.</p>
        </section>
      ) : null}

      {lightboxOpen ? (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Property photo gallery">
          <div className="z-30 flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm md:px-6 landscape:absolute landscape:inset-x-0 landscape:top-0 landscape:border-b-0 landscape:bg-gradient-to-b landscape:from-black/70 landscape:via-black/30 landscape:to-transparent landscape:pb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-300">{selectedIndex + 1} / {images.length}</p>
            <button type="button" onClick={() => setLightboxOpen(false)} className="border border-white/25 bg-black/25 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white hover:text-black" aria-label="Close gallery">
              Close ×
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-none select-none landscape:absolute landscape:inset-0"
            onTouchStart={onSwipeStart}
            onTouchEnd={onSwipeEnd}
          >
            <Image key={`lightbox-${selected.url}`} src={selected.url} alt={selected.alt || title} fill priority sizes="100vw" className="object-contain p-2 sm:p-4 md:p-8 landscape:p-0" />
            {hasMany ? (
              <>
                <button type="button" onClick={previous} className="absolute left-3 top-1/2 z-20 -translate-y-1/2 border border-white/30 bg-black/45 px-4 py-3 text-3xl text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:left-6" aria-label="Previous photo">‹</button>
                <button type="button" onClick={next} className="absolute right-3 top-1/2 z-20 -translate-y-1/2 border border-white/30 bg-black/45 px-4 py-3 text-3xl text-white backdrop-blur-sm transition hover:bg-white hover:text-black md:right-6" aria-label="Next photo">›</button>
                <span className="pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-sm landscape:bottom-16">
                  Swipe left / right
                </span>
              </>
            ) : null}
          </div>

          {hasMany ? (
            <div
              ref={lightboxThumbnailStripRef}
              className="z-30 flex gap-2 overflow-x-auto border-t border-white/10 bg-black/25 p-3 backdrop-blur-sm [scrollbar-color:#4b5563_transparent] [scrollbar-width:thin] landscape:absolute landscape:inset-x-0 landscape:bottom-0 landscape:border-t-0 landscape:bg-gradient-to-t landscape:from-black/75 landscape:via-black/35 landscape:to-transparent landscape:px-3 landscape:pb-3 landscape:pt-7"
              aria-label="Gallery thumbnails"
            >
              {images.map((image, index) => (
                <button
                  key={`lightbox-thumb-${image.url}-${index}`}
                  data-gallery-index={index}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className={`relative h-16 w-24 shrink-0 overflow-hidden border bg-black/25 transition md:h-20 md:w-28 landscape:h-12 landscape:w-20 ${index === selectedIndex ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/70" : "border-white/20 opacity-75 hover:border-white/50 hover:opacity-100"}`}
                  aria-label={`Open photo ${index + 1}`}
                  aria-current={index === selectedIndex ? "true" : undefined}
                >
                  <Image src={image.url} alt="" fill sizes="112px" className="object-cover" />
                  <span className="absolute bottom-0.5 right-1 bg-black/55 px-1 text-[9px] text-white/80">{index + 1}</span>
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
