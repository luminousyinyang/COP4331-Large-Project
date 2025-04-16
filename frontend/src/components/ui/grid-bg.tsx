"use client"
import type React from "react"
import { useState, useEffect } from "react"

export default function GridBackground({ children }: { children?: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsHovering(true)
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="relative w-full h-full min-h-screen bg-[var(--bg-navy)] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(147 197 253 / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(147 197 253 / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          backgroundImage: `
            linear-gradient(to right, rgb(170 197 253 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(170 197 253 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          mask: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}