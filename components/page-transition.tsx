"use client"

import { useEffect, useState } from "react"

export default function PageTransition() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-primary-background flex items-center justify-center transition-opacity duration-500 pointer-events-none ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-primary-cta border-b-transparent rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-4 border-4 border-primary-highlight border-l-transparent rounded-full animate-spin-slow"></div>
      </div>
    </div>
  )
}
