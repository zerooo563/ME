'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const navItems = [
  { id: "hero", label: "الرءيسيه" },
  { id: "about-me-section", label: "من أنا" },
  { id: "certificates-section", label: "الشهادات" },
  { id: "projects-section", label: "المشاريع" },
]

export function Header() {
  const [active, setActive] = useState("hero")

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const cleanup = () => observers.forEach((o) => o.disconnect())

    for (const item of navItems) {
      const el = document.getElementById(item.id)
      if (!el) continue
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(item.id)
            }
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return cleanup
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-start pt-4 px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-3">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-6 py-3 text-base font-medium transition-colors duration-300 rounded-full"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/40"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="tubelight"
                  transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                  className="absolute left-1/2 top-[-10px] h-1 w-8 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.45)]"
                />
              )}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
