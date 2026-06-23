'use client'

import { useEffect, useRef } from 'react'

export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let running = true
    let paused = false
    let hideTimer: ReturnType<typeof setTimeout> | null = null

    const togglePause = () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyP', key: 'p' }))
    }

    const pause = () => {
      if (paused) return
      togglePause()
      paused = true
    }

    const resume = () => {
      if (!paused) return
      togglePause()
      paused = false
    }

    const clearCanvas = () => {
      if (!canvas) return
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (gl) {
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
      }
    }

    const hide = () => {
      if (!canvas) return
      canvas.style.opacity = '0'
      clearCanvas()
      pause()
    }

    const show = () => {
      if (!canvas) return
      resume()
      canvas.style.opacity = '0.35'
      if (hideTimer) clearTimeout(hideTimer)
      hideTimer = setTimeout(hide, 20)
    }

    import('webgl-fluid').then((mod) => {
      if (!running) return

      mod.default(canvas, {
        BLOOM: false,
        SUNRAYS: false,
        SHADING: false,
        DENSITY_DISSIPATION: 0.02,
        VELOCITY_DISSIPATION: 0.02,
        COLORFUL: true,
        TRANSPARENT: true,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRIGGER: 'hover',
        SPLAT_COUNT: 0,
        SPLAT_RADIUS: 0.05,
        SPLAT_FORCE: 800,
        PRESSURE_ITERATIONS: 8,
      })

      const forward = (e: MouseEvent) => {
        if (!canvas) return
        show()
        const rect = canvas.getBoundingClientRect()
        const offsetX = e.clientX - rect.left
        const offsetY = e.clientY - rect.top
        const ev = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
        })
        Object.defineProperty(ev, 'offsetX', { value: offsetX })
        Object.defineProperty(ev, 'offsetY', { value: offsetY })
        canvas.dispatchEvent(ev)
      }
      document.addEventListener('mousemove', forward)

      return () => {
        document.removeEventListener('mousemove', forward)
      }
    })

    return () => { running = false }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0, zIndex: 9999 }}
    />
  )
}
