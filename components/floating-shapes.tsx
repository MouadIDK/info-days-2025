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
  pulse: number
  pulseSpeed: number
}

interface FloatingShapesProps {
  variant?: "default" | "accent" | "highlight" | "cta" | "light"
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  className?: string
}

export default function FloatingShapes({
  variant = "default",
  density = "medium",
  speed = "medium",
  className = "",
}: FloatingShapesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapes = useRef<Shape[]>([])
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

      // Reinitialize shapes when resizing
      if (shapes.current.length === 0) {
        initShapes()
      }
    }

    // Get color scheme based on variant
    const getColorScheme = () => {
      switch (variant) {
        case "accent":
          return ["rgba(61, 33, 197, 1)", "rgba(81, 53, 217, 1)", "rgba(41, 23, 147, 1)"]
        case "highlight":
          return ["rgba(0, 209, 255, 1)", "rgba(20, 229, 255, 1)", "rgba(0, 169, 205, 1)"]
        case "cta":
          return ["rgba(255, 78, 61, 1)", "rgba(255, 98, 81, 1)", "rgba(205, 58, 41, 1)"]
        case "light":
          return ["rgba(255, 255, 255, 1)", "rgba(230, 230, 250, 1)", "rgba(209, 209, 233, 1)"]
        default:
          return [
            "rgba(61, 33, 197, 1)", // primary-accent
            "rgba(0, 209, 255, 1)", // primary-highlight
            "rgba(255, 78, 61, 1)", // primary-cta
          ]
      }
    }

    // Get shape count based on density
    const getShapeCount = () => {
      const baseCount = Math.min(Math.floor(canvas.width / 200), 8)
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
          return 0.3
        case "medium":
          return 0.6
        case "fast":
          return 1
        default:
          return 0.6
      }
    }

    const initShapes = () => {
      shapes.current = []
      const shapeCount = getShapeCount()
      const colorScheme = getColorScheme()
      const speedMultiplier = getSpeedMultiplier()

      for (let i = 0; i < shapeCount; i++) {
        shapes.current.push(createRandomShape(colorScheme, speedMultiplier))
      }
    }

    const createRandomShape = (colorScheme: string[], speedMultiplier: number): Shape => {
      const angle = Math.random() * Math.PI * 2
      const pulseSpeed = Math.random() * 0.03 + 0.01

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 15,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        type: getRandomShapeType(),
        color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.3 + 0.1 * speedMultiplier,
        direction: {
          x: Math.cos(angle) * speedMultiplier * 0.2,
          y: Math.sin(angle) * speedMultiplier * 0.2,
        },
        pulse: 0,
        pulseSpeed,
      }
    }

    const getRandomShapeType = (): Shape["type"] => {
      const types: Shape["type"][] = ["circle", "square", "triangle", "hexagon", "star", "dot"]
      return types[Math.floor(Math.random() * types.length)]
    }

    const drawShape = (shape: Shape, time: number) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate((shape.rotation * Math.PI) / 180)

      // Apply pulsing effect
      shape.pulse += shape.pulseSpeed
      const pulseFactor = 1 + Math.sin(shape.pulse) * 0.2
      const currentSize = shape.size * pulseFactor

      // Set fill style with opacity
      ctx.fillStyle = shape.color.replace("1)", `${shape.opacity})`)

      // Draw shape based on type
      switch (shape.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, currentSize, 0, Math.PI * 2)
          ctx.fill()
          break

        case "square":
          ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize)
          break

        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -currentSize / 2)
          ctx.lineTo(currentSize / 2, currentSize / 2)
          ctx.lineTo(-currentSize / 2, currentSize / 2)
          ctx.closePath()
          ctx.fill()
          break

        case "hexagon":
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const x = currentSize * Math.cos(angle)
            const y = currentSize * Math.sin(angle)
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

            const outerX = Math.cos(outerAngle) * currentSize
            const outerY = Math.sin(outerAngle) * currentSize

            const innerX = Math.cos(innerAngle) * (currentSize / 2)
            const innerY = Math.sin(innerAngle) * (currentSize / 2)

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
          ctx.arc(0, 0, currentSize / 3, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.restore()
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.current.forEach((shape) => {
        // Update position
        shape.x += shape.direction.x
        shape.y += shape.direction.y

        // Update rotation
        shape.rotation += shape.rotationSpeed

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size

        // Draw shape
        drawShape(shape, timestamp)
      })

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
  }, [variant, density, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
