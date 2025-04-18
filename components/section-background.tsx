"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  type: "circle" | "square" | "triangle" | "hexagon" | "star" | "dot"
  color: string
  opacity: number
  speed: number
  direction: { x: number; y: number }
}

interface SectionBackgroundProps {
  variant?: "light" | "dark" | "accent" | "highlight" | "cta"
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  className?: string
}

export default function SectionBackground({
  variant = "light",
  density = "medium",
  speed = "medium",
  className = "",
}: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapes = useRef<Shape[]>([])
  const animationFrameId = useRef<number>()
  const isInitializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get color scheme based on variant
    const getColorScheme = () => {
      switch (variant) {
        case "light":
          return ["rgba(255, 255, 255, 1)", "rgba(209, 209, 233, 1)"]
        case "dark":
          return ["rgba(20, 20, 79, 1)", "rgba(11, 11, 69, 1)"]
        case "accent":
          return ["rgba(61, 33, 197, 1)", "rgba(41, 23, 147, 1)"]
        case "highlight":
          return ["rgba(0, 209, 255, 1)", "rgba(0, 169, 205, 1)"]
        case "cta":
          return ["rgba(255, 78, 61, 1)", "rgba(205, 58, 41, 1)"]
        default:
          return ["rgba(255, 255, 255, 1)", "rgba(209, 209, 233, 1)"]
      }
    }

    // Get shape count based on density
    const getShapeCount = () => {
      const baseCount = Math.min(Math.floor(window.innerWidth / 100), 10)
      switch (density) {
        case "low":
          return baseCount
        case "medium":
          return baseCount * 2
        case "high":
          return baseCount * 3
        default:
          return baseCount * 2
      }
    }

    // Get speed multiplier based on speed
    const getSpeedMultiplier = () => {
      switch (speed) {
        case "slow":
          return 0.5
        case "medium":
          return 1
        case "fast":
          return 2
        default:
          return 1
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Only initialize shapes if not already initialized
      if (!isInitializedRef.current) {
        initShapes()
        isInitializedRef.current = true
      }
    }

    const initShapes = () => {
      shapes.current = []
      const shapeCount = getShapeCount()
      const colorScheme = getColorScheme()

      for (let i = 0; i < shapeCount; i++) {
        shapes.current.push(createRandomShape(colorScheme))
      }
    }

    const createRandomShape = (colorScheme: string[]): Shape => {
      const speedMultiplier = getSpeedMultiplier()
      const angle = Math.random() * Math.PI * 2

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        type: getRandomShapeType(),
        color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
        opacity: Math.random() * 0.1 + 0.05,
        speed: Math.random() * 0.3 + 0.1 * speedMultiplier,
        direction: {
          x: Math.cos(angle) * speedMultiplier * 0.2,
          y: Math.sin(angle) * speedMultiplier * 0.2,
        },
      }
    }

    const getRandomShapeType = (): Shape["type"] => {
      const types: Shape["type"][] = ["circle", "square", "triangle", "hexagon", "star", "dot"]
      return types[Math.floor(Math.random() * types.length)]
    }

    const drawShape = (shape: Shape) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate((shape.rotation * Math.PI) / 180)
      ctx.fillStyle = shape.color.replace("1)", `${shape.opacity})`)

      switch (shape.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
          ctx.fill()
          break

        case "square":
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break

        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.fill()
          break

        case "hexagon":
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = shape.size * Math.cos(angle)
            const y = shape.size * Math.sin(angle)
            if (i === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.fill()
          break

        case "star":
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const outerAngle = ((Math.PI * 2) / 5) * i - Math.PI / 2
            const innerAngle = outerAngle + Math.PI / 5

            const outerX = Math.cos(outerAngle) * shape.size
            const outerY = Math.sin(outerAngle) * shape.size

            const innerX = Math.cos(innerAngle) * (shape.size / 2)
            const innerY = Math.sin(innerAngle) * (shape.size / 2)

            if (i === 0) {
              ctx.moveTo(outerX, outerY)
            } else {
              ctx.lineTo(outerX, outerY)
            }

            ctx.lineTo(innerX, innerY)
          }
          ctx.closePath()
          ctx.fill()
          break

        case "dot":
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 3, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.current.forEach((shape) => {
        // Update position
        shape.x += shape.direction.x
        shape.y += shape.direction.y

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size

        // Update rotation
        shape.rotation += shape.rotationSpeed

        // Draw shape
        drawShape(shape)
      })

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
  }, [variant, density, speed]) // Re-run if these props change

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
