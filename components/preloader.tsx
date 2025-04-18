"use client"

import { useState, useEffect } from "react"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time or wait for resources
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-background transition-opacity duration-500">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-primary-cta border-b-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute top-4 left-4 w-16 h-16 border-4 border-primary-highlight border-l-transparent rounded-full animate-spin-reverse"></div>
        </div>
        <h2 className="text-xl font-orbitron text-primary-highlight">Loading Info Days 2025</h2>
      </div>
    </div>
  )
}
