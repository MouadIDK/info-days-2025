"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export default function EnhancedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)
  const animationFrameId = useRef<number>()
  const dimensionsRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      isMouseMoving.current = true

      // Add particles on mouse move
      if (Math.random() > 0.8) {
        addParticlesAtPosition(mousePosition.current.x, mousePosition.current.y, 1)
      }

      // Reset mouse moving flag after a delay
      setTimeout(() => {
        isMouseMoving.current = false
      }, 100)
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 70)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push(createParticle())
      }
    }

    const createParticle = (x?: number, y?: number): Particle => {
      const maxLife = Math.random() * 100 + 100
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: getRandomColor(),
        opacity: Math.random() * 0.3 + 0.05,
        life: 0,
        maxLife: x && y ? maxLife / 2 : maxLife, // Shorter life for mouse-generated particles
      }
    }

    const addParticlesAtPosition = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        particles.current.push(createParticle(x, y))
      }
    }

    const getRandomColor = () => {
      const colors = [
        "rgba(61, 33, 197, 0.8)", // primary-accent
        "rgba(255, 78, 61, 0.8)", // primary-cta
        "rgba(0, 209, 255, 0.8)", // primary-highlight
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    const connectParticles = (p1: Particle, p2: Particle) => {
      const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
      const maxDistance = 150

      if (distance < maxDistance) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(61, 33, 197, ${0.2 * (1 - distance / maxDistance) * p1.opacity * p2.opacity})`
        ctx.lineWidth = 0.5
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current = particles.current.filter((particle) => {
        // Update life
        particle.life++
        if (particle.life > particle.maxLife) {
          return false // Remove dead particles
        }

        // Calculate opacity based on life
        if (particle.life < 20) {
          particle.opacity = (particle.life / 20) * 0.5
        } else if (particle.life > particle.maxLife - 20) {
          particle.opacity = ((particle.maxLife - particle.life) / 20) * 0.5
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Mouse interaction
        if (isMouseMoving.current) {
          const dx = mousePosition.current.x - particle.x
          const dy = mousePosition.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Repel particles from mouse
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 500
            particle.speedX -= Math.cos(angle) * force
            particle.speedY -= Math.sin(angle) * force

            // Limit speed
            const maxSpeed = 2
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("1)", `${particle.opacity})`)
        ctx.fill()

        return true
      })

      // Connect particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          connectParticles(particles.current[i], particles.current[j])
        }
      }

      // Add new particles if needed
      if (particles.current.length < 80) {
        particles.current.push(createParticle())
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Initial setup
    handleResize()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, []) // Empty dependency array to run only once

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
