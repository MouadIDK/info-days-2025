"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  perspective?: number
  tiltMaxAngle?: number
  scale?: number
  transitionSpeed?: number
  glareOpacity?: number
  glareColor?: string
  disabled?: boolean
}

export default function TiltCard({
  children,
  className = "",
  perspective = 1000,
  tiltMaxAngle = 10,
  scale = 1.05,
  transitionSpeed = 400,
  glareOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.8)",
  disabled = false,
}: TiltCardProps) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    glarePosition: { x: "50%", y: "50%" },
    glareOpacity: 0,
  })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateY = (tiltMaxAngle * mouseX) / (rect.width / 2)
    const rotateX = (-tiltMaxAngle * mouseY) / (rect.height / 2)

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      glarePosition: { x: `${glareX}%`, y: `${glareY}%` },
      glareOpacity: glareOpacity,
    })
  }

  const handleMouseLeave = () => {
    if (disabled) return

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      glarePosition: { x: "50%", y: "50%" },
      glareOpacity: 0,
    })
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltStyle.transform,
        transition: `transform ${transitionSpeed}ms ease-out`,
        willChange: "transform",
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${tiltStyle.glarePosition.x} ${tiltStyle.glarePosition.y}, ${glareColor}, transparent)`,
          opacity: tiltStyle.glareOpacity,
          transition: `opacity ${transitionSpeed}ms ease-out`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  )
}
