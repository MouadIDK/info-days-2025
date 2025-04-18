"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: "glow" | "lift" | "scale" | "border" | "none"
  clickEffect?: "ripple" | "pulse" | "flash" | "none"
  glowColor?: string
  borderColor?: string
}

export default function InteractiveCard({
  children,
  className = "",
  hoverEffect = "glow",
  clickEffect = "ripple",
  glowColor = "rgba(0, 209, 255, 0.5)",
  borderColor = "rgba(61, 33, 197, 0.8)",
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [rippleStyle, setRippleStyle] = useState({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickEffect === "none") return

    setIsClicked(true)

    if (clickEffect === "ripple" && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setRippleStyle({
        left: `${x}px`,
        top: `${y}px`,
      })
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsClicked(false)
    }, 600)
  }

  // Generate hover effect styles
  const getHoverStyles = () => {
    if (!isHovered) return {}

    switch (hoverEffect) {
      case "glow":
        return {
          boxShadow: `0 0 20px ${glowColor}`,
        }
      case "lift":
        return {
          transform: "translateY(-8px)",
        }
      case "scale":
        return {
          transform: "scale(1.03)",
        }
      case "border":
        return {
          boxShadow: `inset 0 0 0 2px ${borderColor}`,
        }
      default:
        return {}
    }
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        ...getHoverStyles(),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}

      {/* Ripple effect */}
      {isClicked && clickEffect === "ripple" && (
        <div
          className="absolute rounded-full bg-white opacity-30 animate-ripple pointer-events-none"
          style={{
            ...rippleStyle,
            width: "300px",
            height: "300px",
            marginLeft: "-150px",
            marginTop: "-150px",
          }}
        />
      )}

      {/* Pulse effect */}
      {isClicked && clickEffect === "pulse" && (
        <div className="absolute inset-0 bg-white opacity-30 animate-pulse-quick pointer-events-none" />
      )}

      {/* Flash effect */}
      {isClicked && clickEffect === "flash" && (
        <div className="absolute inset-0 bg-white opacity-30 animate-flash pointer-events-none" />
      )}
    </div>
  )
}
