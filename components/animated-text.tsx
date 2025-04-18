"use client"

import { useRef, useEffect } from "react"

interface AnimatedTextProps {
  text: string
  animation?: "wave" | "bounce" | "fade" | "typewriter" | "gradient"
  className?: string
  staggerDelay?: number
  duration?: number
  color?: string
  highlightColor?: string
}

export default function AnimatedText({
  text,
  animation = "wave",
  className = "",
  staggerDelay = 0.05,
  duration = 0.5,
  color = "text-white",
  highlightColor = "text-primary-highlight",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into individual characters
    const characters = text.split("")
    container.innerHTML = ""

    // Create spans for each character
    characters.forEach((char, index) => {
      const span = document.createElement("span")
      span.textContent = char

      // Apply base styles
      span.style.display = "inline-block"
      span.style.position = "relative"

      // Apply animation-specific styles
      if (animation === "wave") {
        span.style.animation = `textWave ${duration}s ease-in-out infinite`
        span.style.animationDelay = `${index * staggerDelay}s`
      } else if (animation === "bounce") {
        span.style.animation = `textBounce ${duration}s ease-in-out infinite`
        span.style.animationDelay = `${index * staggerDelay}s`
      } else if (animation === "fade") {
        span.style.animation = `textFade ${duration}s ease-in-out infinite`
        span.style.animationDelay = `${index * staggerDelay}s`
      } else if (animation === "typewriter") {
        span.style.opacity = "0"
        span.style.animation = `textTypewriter ${duration}s forwards`
        span.style.animationDelay = `${index * staggerDelay}s`
      } else if (animation === "gradient") {
        span.style.animation = `textGradient ${duration * 3}s ease-in-out infinite`
        span.style.animationDelay = `${index * staggerDelay}s`
        span.className =
          "text-transparent bg-clip-text bg-gradient-to-r from-primary-text via-primary-highlight to-primary-text bg-300% animate-gradient"
      }

      // Add space for whitespace characters
      if (char === " ") {
        span.innerHTML = "&nbsp;"
      }

      container.appendChild(span)
    })

    // Clean up animation styles on unmount
    return () => {
      if (container) {
        container.innerHTML = text
      }
    }
  }, [text, animation, staggerDelay, duration, color, highlightColor])

  return (
    <div ref={containerRef} className={className}>
      {text}
    </div>
  )
}
