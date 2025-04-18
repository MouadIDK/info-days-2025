"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface ParallaxElementProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function ParallaxElement({
  children,
  speed = 0.2,
  direction = "up",
  className = "",
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const initialPositionRef = useRef<{ top: number; left: number } | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Store the initial position
    const rect = element.getBoundingClientRect()
    initialPositionRef.current = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    }

    const handleScroll = () => {
      if (!initialPositionRef.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const elementTop = initialPositionRef.current.top

      // Check if element is in viewport (with some buffer)
      if (
        scrollPosition + windowHeight > elementTop - 300 &&
        scrollPosition < elementTop + element.offsetHeight + 300
      ) {
        // Calculate parallax offset
        const offset = (scrollPosition - (elementTop - windowHeight)) * speed

        let transform = ""
        switch (direction) {
          case "up":
            transform = `translateY(-${offset}px)`
            break
          case "down":
            transform = `translateY(${offset}px)`
            break
          case "left":
            transform = `translateX(-${offset}px)`
            break
          case "right":
            transform = `translateX(${offset}px)`
            break
        }

        element.style.transform = transform
        element.style.willChange = "transform"
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed, direction])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
