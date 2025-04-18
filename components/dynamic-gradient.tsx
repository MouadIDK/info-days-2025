"use client"

import { useEffect, useRef } from "react"

interface DynamicGradientProps {
  variant?: "default" | "accent" | "highlight" | "cta" | "dark" | "light"
  intensity?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  type?: "radial" | "linear" | "conic"
  className?: string
}

export default function DynamicGradient({
  variant = "default",
  intensity = "medium",
  speed = "medium",
  type = "radial",
  className = "",
}: DynamicGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }

    // Get color scheme based on variant
    const getColorScheme = () => {
      switch (variant) {
        case "accent":
          return [
            [61, 33, 197], // primary-accent
            [41, 23, 147], // darker accent
            [20, 20, 79], // primary-background
          ]
        case "highlight":
          return [
            [0, 209, 255], // primary-highlight
            [0, 169, 205], // darker highlight
            [20, 20, 79], // primary-background
          ]
        case "cta":
          return [
            [255, 78, 61], // primary-cta
            [205, 58, 41], // darker cta
            [20, 20, 79], // primary-background
          ]
        case "dark":
          return [
            [20, 20, 79], // primary-background
            [11, 11, 69], // darker background
            [30, 30, 89], // lighter background
          ]
        case "light":
          return [
            [255, 255, 255], // white
            [209, 209, 233], // light gray
            [180, 180, 220], // lighter gray
          ]
        default:
          return [
            [20, 20, 79], // primary-background
            [61, 33, 197], // primary-accent
            [0, 209, 255], // primary-highlight
          ]
      }
    }

    // Get opacity based on intensity
    const getOpacity = () => {
      switch (intensity) {
        case "low":
          return 0.15
        case "medium":
          return 0.25
        case "high":
          return 0.35
        default:
          return 0.25
      }
    }

    // Get animation speed
    const getAnimationSpeed = () => {
      switch (speed) {
        case "slow":
          return 0.0005
        case "medium":
          return 0.001
        case "fast":
          return 0.002
        default:
          return 0.001
      }
    }

    const drawRadialGradient = (time: number) => {
      const colors = getColorScheme()
      const opacity = getOpacity()
      const animSpeed = getAnimationSpeed()

      // Calculate center position with slight movement
      const centerX = canvas.width / 2 + Math.sin(time * animSpeed * 0.5) * (canvas.width * 0.1)
      const centerY = canvas.height / 2 + Math.cos(time * animSpeed * 0.5) * (canvas.height * 0.1)

      // Create gradient
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width * 0.8)

      // Add color stops with time-based offsets
      gradient.addColorStop(0, `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, ${opacity})`)
      gradient.addColorStop(
        0.5 + Math.sin(time * animSpeed) * 0.2,
        `rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, ${opacity * 0.8})`,
      )
      gradient.addColorStop(1, `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0)`)

      // Fill canvas
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawLinearGradient = (time: number) => {
      const colors = getColorScheme()
      const opacity = getOpacity()
      const animSpeed = getAnimationSpeed()

      // Calculate angle with time
      const angle = (time * animSpeed) % (Math.PI * 2)
      const startX = canvas.width / 2 + Math.cos(angle) * canvas.width
      const startY = canvas.height / 2 + Math.sin(angle) * canvas.height
      const endX = canvas.width / 2 + Math.cos(angle + Math.PI) * canvas.width
      const endY = canvas.height / 2 + Math.sin(angle + Math.PI) * canvas.height

      // Create gradient
      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)

      // Add color stops
      gradient.addColorStop(0, `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, ${opacity * 0.8})`)
      gradient.addColorStop(1, `rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, ${opacity * 0.6})`)

      // Fill canvas
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawConicGradient = (time: number) => {
      const colors = getColorScheme()
      const opacity = getOpacity()
      const animSpeed = getAnimationSpeed()

      // Calculate center with slight movement
      const centerX = canvas.width / 2 + Math.sin(time * animSpeed) * (canvas.width * 0.05)
      const centerY = canvas.height / 2 + Math.cos(time * animSpeed) * (canvas.height * 0.05)

      // We'll simulate a conic gradient since it's not directly available in all canvas implementations
      const angleStep = (Math.PI * 2) / 360 // 1 degree steps
      const radius = Math.max(canvas.width, canvas.height)

      // Rotate the gradient over time
      const startAngle = (time * animSpeed * 0.2) % (Math.PI * 2)

      for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
        const currentAngle = (angle + startAngle) % (Math.PI * 2)
        const normalizedAngle = currentAngle / (Math.PI * 2) // 0 to 1

        // Determine color based on angle
        let color
        if (normalizedAngle < 0.33) {
          const t = normalizedAngle / 0.33
          color = interpolateColor(colors[0], colors[1], t)
        } else if (normalizedAngle < 0.66) {
          const t = (normalizedAngle - 0.33) / 0.33
          color = interpolateColor(colors[1], colors[2], t)
        } else {
          const t = (normalizedAngle - 0.66) / 0.34
          color = interpolateColor(colors[2], colors[0], t)
        }

        // Draw a thin triangle for this angle
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(centerX + Math.cos(currentAngle) * radius, centerY + Math.sin(currentAngle) * radius)
        ctx.lineTo(
          centerX + Math.cos(currentAngle + angleStep) * radius,
          centerY + Math.sin(currentAngle + angleStep) * radius,
        )
        ctx.closePath()

        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
        ctx.fill()
      }
    }

    // Helper function to interpolate between two colors
    const interpolateColor = (color1: number[], color2: number[], t: number) => {
      return [
        Math.round(color1[0] + (color2[0] - color1[0]) * t),
        Math.round(color1[1] + (color2[1] - color1[1]) * t),
        Math.round(color1[2] + (color2[2] - color1[2]) * t),
      ]
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the appropriate gradient type
      switch (type) {
        case "radial":
          drawRadialGradient(timestamp)
          break
        case "linear":
          drawLinearGradient(timestamp)
          break
        case "conic":
          drawConicGradient(timestamp)
          break
        default:
          drawRadialGradient(timestamp)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Initial setup
    handleResize()
    window.addEventListener("resize", handleResize)

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [variant, intensity, speed, type])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
