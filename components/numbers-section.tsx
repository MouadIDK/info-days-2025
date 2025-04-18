"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Users, Calendar, Building, Award } from "lucide-react"
import SectionParticles from "./section-particles"
import DynamicGradient from "./dynamic-gradient"
import FloatingShapes from "./floating-shapes"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
  title: string
  icon: React.ReactNode
  delay: number
}

function Counter({ end, duration, suffix = "", title, icon, delay }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay before starting animation
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [end, duration, isVisible])

  return (
    <div
      ref={countRef}
      className={`card-gradient p-8 text-center glow rounded-xl shadow-lg transform transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex justify-center mb-4 text-primary-highlight">{icon}</div>
      <div className="text-5xl md:text-6xl font-bold text-primary-highlight mb-4">
        {count}
        {suffix}
      </div>
      <div className="text-primary-subtext text-lg">{title}</div>
    </div>
  )
}

export default function NumbersSection() {
  const stats = [
    { end: 200, suffix: "+", title: "Participants", icon: <Users size={40} />, duration: 2000, delay: 0 },
    { end: 4, suffix: "+", title: "Conferences", icon: <Calendar size={40} />, duration: 1500, delay: 200 },
    { end: 3, suffix: "+", title: "Sponsors & Partners", icon: <Building size={40} />, duration: 2500, delay: 400 },
    { end: 10, suffix: "+", title: "Trophies", icon: <Award size={40} />, duration: 1000, delay: 600 },
  ]

  return (
    <section id="numbers" className="section bg-primary-background relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background to-primary-section/50 z-0"></div>
      <DynamicGradient variant="default" intensity="medium" type="radial" className="z-0" />
      <SectionParticles variant="default" density="high" speed="medium" glow={true} className="z-0" />
      <div className="absolute inset-0 bg-noise z-0"></div>
      <div className="absolute inset-0 bg-grid z-0"></div>
      <FloatingShapes variant="default" density="low" speed="slow" className="z-0" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary-accent opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-highlight opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">Info Days 2025 in Numbers</h2>
        <div className="title-underline slide-up"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
          {stats.map((stat, index) => (
            <Counter
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              title={stat.title}
              icon={stat.icon}
              duration={stat.duration}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
