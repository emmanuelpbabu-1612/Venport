"use client"

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"

const bandCount = 18

export function FooterBands() {
  const bandsRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    pointerRef.current = { x: event.clientX, y: event.clientY }

    if (frameRef.current !== null) {
      return
    }

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null

      const container = bandsRef.current
      if (!container) return

      const bounds = container.getBoundingClientRect()
      if (bounds.width === 0 || bounds.height === 0) return

      const x = Math.min(1, Math.max(0, (pointerRef.current.x - bounds.left) / bounds.width))
      const pointerX = `${x * 100}%`
      const angle = 102 + (x - 0.5) * 18

      Array.from(container.children).forEach((element) => {
        if (!(element instanceof HTMLElement)) return

        const bandBounds = element.getBoundingClientRect()
        const distance = Math.abs(pointerRef.current.y - (bandBounds.top + bandBounds.height / 2))
        const strength = Math.max(0, 1 - distance / 54)
        const easedStrength = Math.pow(strength, 1.35)

        element.style.setProperty("--pointer-x", pointerX)
        element.style.setProperty("--pointer-strength", easedStrength.toFixed(2))
        element.style.setProperty("--pointer-angle", `${angle}deg`)
        element.style.setProperty("--pointer-brightness", `${1 + easedStrength * 0.08}`)
      })
    })
  }

  function handlePointerLeave() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    bandsRef.current?.querySelectorAll("i").forEach((band) => {
      band.style.setProperty("--pointer-strength", "0")
      band.style.setProperty("--pointer-brightness", "1")
    })
  }

  return (
    <div
      ref={bandsRef}
      className="stripes"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {Array.from({ length: bandCount }, (_, index) => (
        <i
          key={index}
          style={{ "--band-delay": `${index * -0.34}s` } as CSSProperties}
        />
      ))}
    </div>
  )
}
