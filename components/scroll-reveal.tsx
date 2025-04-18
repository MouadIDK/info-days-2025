"use client"

import { useRef, useEffect, type ReactNode } from "react"

type AnimationType =
  | "fade-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-x"
  | "flip-y"
  | "rotate"

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  animation = "fade-in",
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Initial state based on animation type
    let initialStyles: Record<string, string> = {}
    let animatedStyles: Record<string, string> = {}

    switch (animation) {
      case "fade-in":
        initialStyles = { opacity: "0" }
        animatedStyles = { opacity: "1" }
        break
      case "slide-up":
        initialStyles = { opacity: "0", transform: "translateY(50px)" }
        animatedStyles = { opacity: "1", transform: "translateY(0)" }
        break
      case "slide-down":
        initialStyles = { opacity: "0", transform: "translateY(-50px)" }
        animatedStyles = { opacity: "1", transform: "translateY(0)" }
        break
      case "slide-left":
        initialStyles = { opacity: "0", transform: "translateX(50px)" }
        animatedStyles = { opacity: "1", transform: "translateX(0)" }
        break
      case "slide-right":
        initialStyles = { opacity: "0", transform: "translateX(-50px)" }
        animatedStyles = { opacity: "1", transform: "translateX(0)" }
        break
      case "zoom-in":
        initialStyles = { opacity: "0", transform: "scale(0.8)" }
        animatedStyles = { opacity: "1", transform: "scale(1)" }
        break
      case "zoom-out":
        initialStyles = { opacity: "0", transform: "scale(1.2)" }
        animatedStyles = { opacity: "1", transform: "scale(1)" }
        break
      case "flip-x":
        initialStyles = { opacity: "0", transform: "rotateX(90deg)" }
        animatedStyles = { opacity: "1", transform: "rotateX(0)" }
        break
      case "flip-y":
        initialStyles = { opacity: "0", transform: "rotateY(90deg)" }
        animatedStyles = { opacity: "1", transform: "rotateY(0)" }
        break
      case "rotate":
        initialStyles = { opacity: "0", transform: "rotate(90deg)" }
        animatedStyles = { opacity: "1", transform: "rotate(0)" }
        break
    }

    // Apply initial styles
    Object.entries(initialStyles).forEach(([property, value]) => {
      element.style[property as any] = value
    })

    // Set transition
    element.style.transition = `all ${duration}ms ease-out ${delay}ms`
    element.style.willChange = "opacity, transform"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If we only want to animate once and it's already animated, skip
            if (once && hasAnimated.current) return

            // Set timeout to apply animated styles (allows for delay)
            setTimeout(() => {
              Object.entries(animatedStyles).forEach(([property, value]) => {
                element.style[property as any] = value
              })
              hasAnimated.current = true
            }, 50) // Small delay to ensure transition works

            // If we only want to animate once, unobserve
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once && hasAnimated.current) {
            // If we want to animate on every scroll in/out and it's already animated
            Object.entries(initialStyles).forEach(([property, value]) => {
              element.style[property as any] = value
            })
            hasAnimated.current = false
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [animation, delay, duration, threshold, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
