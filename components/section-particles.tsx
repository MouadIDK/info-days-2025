"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  baseSize: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
  pulse: number
  pulseSpeed: number
  depth: number
  glow: boolean
}

interface SectionParticlesProps {
  variant?: "default" | "accent" | "highlight" | "cta" | "light"
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  interactive?: boolean
  glow?: boolean
  depth?: boolean
  pulse?: boolean
  className?: string
}

export default function SectionParticles({
  variant = "default",
  density = "medium",
  speed = "medium",
  interactive = true,
  glow = true,
  depth = true,
  pulse = true,
  className = "",
}: SectionParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)
  const animationFrameId = useRef<number>()
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Find the parent section element
    sectionRef.current = canvas.closest("section") || canvas.parentElement

    const handleResize = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      }
      canvas.width = rect.width
      canvas.height = rect.height
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      // Only track mouse if it's within the section
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
        isMouseMoving.current = true

        // Add particles on mouse move
        if (Math.random() > 0.7) {
          addParticlesAtPosition(mousePosition.current.x, mousePosition.current.y, 2)
        }

        // Reset mouse moving flag after a delay
        setTimeout(() => {
          isMouseMoving.current = false
        }, 100)
      }
    }

    const getParticleCount = () => {
      const baseCount = Math.min(Math.floor(dimensionsRef.current.width / 15), 60)
      switch (density) {
        case "low":
          return Math.floor(baseCount * 0.5)
        case "medium":
          return baseCount
        case "high":
          return baseCount * 1.5
        default:
          return baseCount
      }
    }

    const getSpeedMultiplier = () => {
      switch (speed) {
        case "slow":
          return 0.5
        case "medium":
          return 1
        case "fast":
          return 1.8
        default:
          return 1
      }
    }

    const getColorScheme = () => {
      switch (variant) {
        case "accent":
          return [
            "rgba(61, 33, 197, 0.8)", // primary-accent
            "rgba(81, 53, 217, 0.8)", // lighter accent
            "rgba(41, 23, 147, 0.8)", // darker accent
          ]
        case "highlight":
          return [
            "rgba(0, 209, 255, 0.8)", // primary-highlight
            "rgba(20, 229, 255, 0.8)", // lighter highlight
            "rgba(0, 169, 205, 0.8)", // darker highlight
          ]
        case "cta":
          return [
            "rgba(255, 78, 61, 0.8)", // primary-cta
            "rgba(255, 98, 81, 0.8)", // lighter cta
            "rgba(205, 58, 41, 0.8)", // darker cta
          ]
        case "light":
          return [
            "rgba(255, 255, 255, 0.5)", // white
            "rgba(230, 230, 250, 0.5)", // lavender
            "rgba(209, 209, 233, 0.5)", // light gray
          ]
        default:
          return [
            "rgba(61, 33, 197, 0.8)", // primary-accent
            "rgba(0, 209, 255, 0.8)", // primary-highlight
            "rgba(255, 78, 61, 0.8)", // primary-cta
          ]
      }
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = getParticleCount()
      const speedMultiplier = getSpeedMultiplier()
      const colorScheme = getColorScheme()

      for (let i = 0; i < particleCount; i++) {
        particles.current.push(
          createParticle(
            Math.random() * dimensionsRef.current.width,
            Math.random() * dimensionsRef.current.height,
            speedMultiplier,
            colorScheme,
          ),
        )
      }
    }

    const createParticle = (x: number, y: number, speedMultiplier: number, colorScheme: string[]): Particle => {
      const baseSize = Math.random() * 3 + 0.8
      const maxLife = Math.random() * 150 + 100
      const particleDepth = depth ? Math.random() * 0.5 + 0.5 : 1 // 0.5 to 1 if depth enabled, else 1

      return {
        x,
        y,
        size: baseSize * particleDepth,
        baseSize,
        speedX: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        speedY: (Math.random() - 0.5) * 0.5 * speedMultiplier,
        color: colorScheme[Math.floor(Math.random() * colorScheme.length)],
        opacity: Math.random() * 0.4 + 0.1,
        life: 0,
        maxLife,
        pulse: 0,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        depth: particleDepth,
        glow: glow && Math.random() > 0.7, // 30% chance of glow if enabled
      }
    }

    const addParticlesAtPosition = (x: number, y: number, count: number) => {
      const speedMultiplier = getSpeedMultiplier()
      const colorScheme = getColorScheme()
      for (let i = 0; i < count; i++) {
        const particle = createParticle(
          x + (Math.random() - 0.5) * 20, // Add slight randomness to position
          y + (Math.random() - 0.5) * 20,
          speedMultiplier,
          colorScheme,
        )
        // Make mouse-generated particles more dynamic
        particle.speedX = particle.speedX * 2
        particle.speedY = particle.speedY * 2
        particle.maxLife = particle.maxLife * 0.6
        particle.glow = glow
        particles.current.push(particle)
      }
    }

    const connectParticles = (p1: Particle, p2: Particle) => {
      const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
      const maxDistance = 150 * Math.min(p1.depth, p2.depth) // Shorter connections for particles in background

      if (distance < maxDistance) {
        // Get connection color based on variant
        let connectionColor
        switch (variant) {
          case "accent":
            connectionColor = "rgba(61, 33, 197,"
            break
          case "highlight":
            connectionColor = "rgba(0, 209, 255,"
            break
          case "cta":
            connectionColor = "rgba(255, 78, 61,"
            break
          case "light":
            connectionColor = "rgba(255, 255, 255,"
            break
          default:
            connectionColor = "rgba(61, 33, 197,"
        }

        const opacity = 0.15 * (1 - distance / maxDistance) * p1.opacity * p2.opacity
        ctx.beginPath()
        ctx.strokeStyle = `${connectionColor} ${opacity})`
        ctx.lineWidth = 0.5 * Math.min(p1.depth, p2.depth)
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    const drawParticle = (particle: Particle) => {
      // Apply pulsing effect if enabled
      let currentSize = particle.size
      if (pulse) {
        particle.pulse += particle.pulseSpeed
        currentSize = particle.size * (1 + Math.sin(particle.pulse) * 0.2)
      }

      // Draw glow effect if enabled for this particle
      if (particle.glow) {
        const glowSize = currentSize * 3
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, glowSize)
        const glowColor = particle.color.replace("0.8)", "0.1)")
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "rgba(0,0,0,0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw the particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
      ctx.fillStyle = particle.color.replace("0.8)", `${particle.opacity})`)
      ctx.fill()
    }

    const animate = (timestamp: number) => {
      timeRef.current = timestamp
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
        particle.x += particle.speedX * particle.depth // Deeper particles move slower
        particle.y += particle.speedY * particle.depth

        // Bounce off edges with slight randomization
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX * (0.9 + Math.random() * 0.2)
          if (particle.x < 0) particle.x = 0
          if (particle.x > canvas.width) particle.x = canvas.width
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY * (0.9 + Math.random() * 0.2)
          if (particle.y < 0) particle.y = 0
          if (particle.y > canvas.height) particle.y = canvas.height
        }

        // Mouse interaction
        if (interactive && isMouseMoving.current) {
          const dx = mousePosition.current.x - particle.x
          const dy = mousePosition.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            // Repel particles from mouse
            const angle = Math.atan2(dy, dx)
            const force = (120 - distance) / 500
            particle.speedX -= Math.cos(angle) * force * particle.depth
            particle.speedY -= Math.sin(angle) * force * particle.depth

            // Limit speed
            const maxSpeed = 2.5
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Draw particle
        drawParticle(particle)

        return true
      })

      // Connect particles with depth consideration
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          // Only connect particles with similar depth
          if (Math.abs(particles.current[i].depth - particles.current[j].depth) < 0.3) {
            connectParticles(particles.current[i], particles.current[j])
          }
        }
      }

      // Add new particles if needed
      if (particles.current.length < getParticleCount() * 0.8) {
        const speedMultiplier = getSpeedMultiplier()
        const colorScheme = getColorScheme()
        particles.current.push(
          createParticle(
            Math.random() * dimensionsRef.current.width,
            Math.random() * dimensionsRef.current.height,
            speedMultiplier,
            colorScheme,
          ),
        )
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Initial setup
    handleResize()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    // Start animation
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [variant, density, speed, interactive, glow, depth, pulse]) // Re-run if these props change

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    />
  )
}
