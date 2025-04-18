"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface CubeFace {
  content: ReactNode
  background?: string
}

interface RotatingCubeProps {
  faces: CubeFace[]
  size?: number
  autoRotate?: boolean
  rotationSpeed?: number
  className?: string
}

export default function RotatingCube({
  faces,
  size = 200,
  autoRotate = true,
  rotationSpeed = 5,
  className = "",
}: RotatingCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const cube = cubeRef.current
    if (!cube) return

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true
      lastPositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return

      const deltaX = e.clientX - lastPositionRef.current.x
      const deltaY = e.clientY - lastPositionRef.current.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.5,
        y: rotationRef.current.y + deltaX * 0.5,
      }

      updateCubeRotation()

      lastPositionRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
    }

    const updateCubeRotation = () => {
      if (cube) {
        cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`
      }
    }

    const autoRotateCube = () => {
      if (autoRotate && !isDraggingRef.current) {
        rotationRef.current.y += rotationSpeed / 10
        updateCubeRotation()
      }
      animationRef.current = requestAnimationFrame(autoRotateCube)
    }

    // Start auto-rotation
    if (autoRotate) {
      autoRotateCube()
    }

    // Add event listeners for dragging
    cube.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseUp)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      cube.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseUp)
    }
  }, [autoRotate, rotationSpeed])

  // Calculate face positions
  const halfSize = size / 2
  const faceStyles = [
    { transform: `rotateY(0deg) translateZ(${halfSize}px)` }, // front
    { transform: `rotateY(180deg) translateZ(${halfSize}px)` }, // back
    { transform: `rotateY(90deg) translateZ(${halfSize}px)` }, // right
    { transform: `rotateY(-90deg) translateZ(${halfSize}px)` }, // left
    { transform: `rotateX(90deg) translateZ(${halfSize}px)` }, // top
    { transform: `rotateX(-90deg) translateZ(${halfSize}px)` }, // bottom
  ]

  return (
    <div className={`perspective-${size * 2} ${className}`}>
      <div
        ref={cubeRef}
        className="relative transform-style-3d transition-transform duration-200"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `rotateX(0deg) rotateY(0deg)`,
        }}
      >
        {faces.slice(0, 6).map((face, index) => (
          <div
            key={index}
            className="absolute w-full h-full backface-hidden flex items-center justify-center"
            style={{
              ...faceStyles[index],
              background: face.background || "rgba(20, 20, 79, 0.8)",
            }}
          >
            {face.content}
          </div>
        ))}
      </div>
    </div>
  )
}
