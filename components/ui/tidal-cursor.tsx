'use client'

import { useEffect, useRef } from "react"

export function TidalCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ripples = useRef<
    { x: number; y: number; radius: number; alpha: number }[]
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.8 })
    }

    const handleMove = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY)
    }

    window.addEventListener("mousemove", handleMove)

    let hue = 0

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hue += 2
      if (hue >= 360) hue = 0

      ripples.current.forEach((r) => {
        r.radius += 0.7
        r.alpha -= 0.02

        if (r.alpha > 0) {
          ctx.beginPath()
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${r.alpha})`
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      ripples.current = ripples.current.filter((r) => r.alpha > 0)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10000 }}
    />
  )
}
