'use client'

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { MouseEvent, TouchEvent } from "react"
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
const CONTROLS_HIDE_DELAY_MS = 2600

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
  const [controlsVisible, setControlsVisible] = useState(true)
  const [fullscreenActive, setFullscreenActive] = useState(false)
  const swipeStartRef = useRef<SwipeStart | null>(null)
  const lastSwipeAtRef = useRef(0)
  const lightboxThumbnailStripRef = useRef<HTMLDivElement | null>(null)
  const lightboxRef = useRef<HTMLDivElement | null>(null)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selected = images[selectedIndex]
  const hasMany = images.length > 1
  const positionBadge = pricePositionLabel ?? fallbackPositionLabel(pricePositionPct)

  const clearControlsTimer = useCallback(() => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
      controlsTimerRef.current = null
    }
  }, [])

  const scheduleControlsHide = useCallback(() => {
    clearControlsTimer()
    if (!lightboxOpen) return
    controlsTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY_MS)
  }, [clearControlsTimer, lightboxOpen])

  const showControls = useCallback(() => {
    setControlsVisible(true)
    scheduleControlsHide()
  }, [scheduleControlsHide])

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
    showControls()
    if (dx < 0) next()
    else previous()
  }, [hasMany, next, previous, showControls])

  const openLightbox = useCallback(() => {
    setControlsVisible(true)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(async () => {
    clearControlsTimer()
    if (document.fullscreenElement) {
      try { await document.exitFullscreen() } catch { /* Browser may already be exiting fullscreen. */ }
    }
    setLightboxOpen(false)
  }, [clearControlsTimer])

  const toggleFullscreen = useCallback(async () => {
    const root = lightboxRef.current
    if (!root || typeof root.requestFullscreen !== "function") return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await root.requestFullscreen({ navigationUI: "hide" })
      showControls()
    } catch {
      // Normal edge-to-edge viewer remains fully functional when Fullscreen API is denied/unsupported.
    }
  }, [showControls])

  const onLightboxStageClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (Date.now() - lastSwipeAtRef.current < 500) return
    if ((event.target as HTMLElement).closest("button")) return
    setControlsVisible((visible) => {
      const nextVisible = !visible
      if (nextVisible) scheduleControlsHide()
      else clearControlsTimer()
      return nextVisible
    })
  }, [clearControlsTimer, scheduleControlsHide])

  useEffect(() => {
    if (!lightboxOpen) return
    const previousOverflow = document.body.style.overflow
    const previousOverscroll = document.documentElement.style.overscrollBehavior
    document.body.style.overflow = "hidden"
    document.documentElement.style.overscrollBehavior = "none"
    showControls()

    const onKeyDown = (event: KeyboardEvent) => {
      showControls()
      if (event.key === "Escape") void closeLightbox()
      if (event.key === "ArrowLeft") previous()
      if (event.key === "ArrowRight") next()
    }
    const onFullscreenChange = () => setFullscreenActive(Boolean(document.fullscreenElement))

    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => {
      clearControlsTimer()
      document.body.style.overflow = previousOverflow
      document.documentElement.style.overscrollBehavior = previousOverscroll
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("fullscreenchange", onFullscreenChange)
    }
  }, [clearControlsTimer, closeLightbox, lightboxOpen, next, previous, showControls])

  useEffect(() => {
    if (!lightboxOpen) return
    const strip = lightboxThumbnailStripRef.current
    const current = strip?.querySelector<HTMLElement>(`[data-gallery-index="${selectedIndex}"]`)
    current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    scheduleControlsHide()
  }, [lightboxOpen, scheduleControlsHide, selectedIndex])

  if (!selected) return null

  const controlsClass = controlsVisible
    ? "opacity-100"
    : "pointer-events-none opacity-0"

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
              openLightbox()
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
              <button type="button" onClick={(event) => { event.stopPropagation(); previous() }} className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/45 text-3xl leading-none text-white backdrop-blur-sm transition hover:bg-black/70 md:left-6" aria-label="Previous photo">‹</button>
              <button type="button" onClick={(event) => { event.stopPropagation(); next() }} className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 bg-black/45 text-3xl leading-none text-white backdrop-blur-sm transition hover:bg-black/70 md:right-6" aria-label="Next photo">›</button>
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
            <button type="button" onClick={openLightbox} className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition hover:text-[#E1C259]">View full screen</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-color:#374151_transparent] [scrollbar-width:thin]">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                onDoubleClick={() => { setSelectedIndex(index); openLightbox() }}
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
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-hidden bg-black"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
          onClick={onLightboxStageClick}
          onPointerMove={showControls}
        >
          <div
            className="absolute inset-0 touch-none select-none"
            onTouchStart={(event) => { showControls(); onSwipeStart(event) }}
            onTouchEnd={onSwipeEnd}
          >
            <Image key={`lightbox-${selected.url}`} src={selected.url} alt={selected.alt || title} fill priority sizes="100vw" className="object-contain p-1 sm:p-2 md:p-4 landscape:p-0" />
          </div>

          <div className={`absolute inset-x-0 top-0 z-30 flex items-start justify-between bg-gradient-to-b from-black/65 via-black/20 to-transparent px-3 pb-10 pt-[max(0.5rem,env(safe-area-inset-top))] transition-opacity duration-300 sm:px-4 ${controlsClass}`}>
            <span className="rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-white/90 backdrop-blur-sm sm:text-xs">{selectedIndex + 1} / {images.length}</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); void toggleFullscreen() }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-[22px] text-white/90 backdrop-blur-sm transition hover:bg-white/20"
                aria-label={fullscreenActive ? "Exit browser fullscreen" : "Enter browser fullscreen"}
                title={fullscreenActive ? "Exit fullscreen" : "Fullscreen"}
              >
                {fullscreenActive ? "⛶" : "⛶"}
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); void closeLightbox() }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-[26px] font-light leading-none text-white/90 backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Close gallery"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {hasMany ? (
            <>
              <button type="button" onClick={(event) => { event.stopPropagation(); showControls(); previous() }} className={`absolute left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-4xl font-light text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:left-3 ${controlsClass}`} aria-label="Previous photo">‹</button>
              <button type="button" onClick={(event) => { event.stopPropagation(); showControls(); next() }} className={`absolute right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-4xl font-light text-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:right-3 ${controlsClass}`} aria-label="Next photo">›</button>

              <div className={`absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/80 via-black/35 to-transparent pb-[max(0.55rem,env(safe-area-inset-bottom))] pt-12 transition-opacity duration-300 landscape:pt-10 ${controlsClass}`}>
                <div
                  ref={lightboxThumbnailStripRef}
                  className="flex gap-2 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-4"
                  aria-label="Gallery thumbnails"
                  onClick={(event) => event.stopPropagation()}
                  onPointerDown={showControls}
                >
                  {images.map((image, index) => (
                    <button
                      key={`lightbox-thumb-${image.url}-${index}`}
                      data-gallery-index={index}
                      type="button"
                      onClick={() => { setSelectedIndex(index); showControls() }}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border bg-black/25 transition sm:h-20 sm:w-28 landscape:h-[60px] landscape:w-[88px] ${index === selectedIndex ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/80" : "border-white/20 opacity-70 hover:border-white/50 hover:opacity-100"}`}
                      aria-label={`Open photo ${index + 1}`}
                      aria-current={index === selectedIndex ? "true" : undefined}
                    >
                      <Image src={image.url} alt="" fill sizes="112px" className="object-cover" />
                      <span className="absolute bottom-0.5 right-1 rounded bg-black/55 px-1 text-[9px] text-white/80">{index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">{children}</span>
}
