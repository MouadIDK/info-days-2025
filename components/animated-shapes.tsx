"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  type: "circle" | "square" | "triangle" | "hexagon"
  color: string
  opacity: number
  speed: number
}

export default function AnimatedShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapes = useRef<Shape[]>([])
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initShapes()
    }

    const initShapes = () => {
      shapes.current = []
      const shapeCount = 15

      for (let i = 0; i < shapeCount; i++) {
        shapes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 10,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          type: getRandomShapeType(),
          color: getRandomColor(),
          opacity: Math.random() * 0.2 + 0.05,
          speed: Math.random() * 0.2 + 0.1,
        })
      }
    }

    const getRandomShapeType = (): Shape["type"] => {
      const types: Shape["type"][] = ["circle", "square", "triangle", "hexagon"]
      return types[Math.floor(Math.random() * types.length)]
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(61, 33, 197, 1)", // primary-accent
        "rgba(255, 78, 61, 1)", // primary-cta
        "rgba(0, 209, 255, 1)", // primary-highlight
      ]
      return colors[Math.floor(Math.random() * colors.length)]
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
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.current.forEach((shape) => {
        // Update position (floating effect)
        shape.y -= shape.speed

        // Reset position when off screen
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size
          shape.x = Math.random() * canvas.width
        }

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
  }, []) // Empty dependency array to run only once

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-30"
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
