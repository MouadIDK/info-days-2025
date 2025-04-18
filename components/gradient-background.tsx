"use client"

import { useEffect, useRef } from "react"

interface GradientBackgroundProps {
  colors?: string[]
  speed?: number
  className?: string
}

export default function GradientBackground({
  colors = ["#0B0B45", "#14144F", "#3D21C5", "#0B0B45"],
  speed = 15,
  className = "",
}: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let gradient: CanvasGradient
    let colorStops: { offset: number; color: string }[] = []
    let animationOffset = 0

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      createGradient()
    }

    const createGradient = () => {
      // Create a diagonal gradient
      gradient = ctx.createLinearGradient(0, 0, width, height)

      // Initialize color stops
      colorStops = colors.map((color, index) => ({
        offset: index / (colors.length - 1),
        color,
      }))
    }

    const updateGradient = () => {
      // Clear existing gradient
      gradient = ctx.createLinearGradient(0, 0, width, height)

      // Update color stops with animation offset
      colorStops.forEach((stop) => {
        const offset = (stop.offset + animationOffset) % 1
        gradient.addColorStop(offset, stop.color)
      })
    }

    const animate = () => {
      // Update animation offset
      animationOffset = (animationOffset + 0.001 * (speed / 10)) % 1

      // Update gradient
      updateGradient()

      // Draw gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Initial setup
    resizeCanvas()

    // Add event listeners
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [colors, speed]) // Only re-run if colors or speed changes

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
