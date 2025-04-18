"use client"

import { useState, useEffect, useRef } from "react"

interface ScrollCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
  easing?: "linear" | "easeOut" | "easeInOut"
  threshold?: number
}

export default function ScrollCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
  easing = "easeOut",
  threshold = 0.1,
}: ScrollCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameId = useRef<number>()

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeInOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [threshold])

  useEffect(() => {
    if (!isVisible) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easingFunctions[easing](progress)
      const currentCount = easedProgress * end

      setCount(currentCount)

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate)
      }
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isVisible, end, duration, easing])

  const formattedCount = count.toFixed(decimals)

  return (
    <div ref={counterRef} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </div>
  )
}
