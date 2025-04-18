"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import ScrollReveal from "./scroll-reveal"
import TiltCard from "./tilt-card"
import SectionParticles from "./section-particles"
import DynamicGradient from "./dynamic-gradient"
import FloatingShapes from "./floating-shapes"

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("April 19, 2025 09:00:00").getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 py-16 overflow-hidden bg-primary-background"
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background to-primary-section/50 z-0"></div>
      <DynamicGradient variant="default" intensity="medium" type="radial" className="z-0" />
      <SectionParticles variant="default" density="high" speed="medium" glow={true} className="z-0" />
      <div className="absolute inset-0 bg-noise z-0"></div>
      <div className="absolute inset-0 bg-grid z-0"></div>
      <FloatingShapes variant="default" density="low" speed="slow" className="z-0" />

      <div className="container mx-auto flex flex-col items-center justify-center z-10 text-center">
        <ScrollReveal animation="zoom-in" duration={1000}>
          <div className="mb-8 animate-float">
            <TiltCard
              perspective={1000}
              tiltMaxAngle={15}
              glareOpacity={0.3}
              className="inline-block rounded-full overflow-hidden"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZAuHjc8XjoPMBme0KxIhzejiMsp85Q.png"
                alt="Info Days 2025 Logo"
                className="w-[250px] h-[250px] object-contain hover:scale-105 transition-transform duration-500"
              />
            </TiltCard>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={300} duration={1000}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-subtext">
            Info Days 2025
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={600} duration={800}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-primary-subtext">April 19 & 20</h2>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={800} duration={800}>
          <p className="text-xl md:text-2xl mb-12 text-primary-highlight">ENSA Agadir × Code212 × AppsClub</p>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={1000} duration={800}>
          <TiltCard className="inline-block">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdTsTWaRaPqcCLLI7j3X-zieYMj9IKgcdmyodeKL995qvo_fQ/viewform?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mb-4 hover:shadow-glow transition-all duration-300 block"
            >
              Register for South Coding Cup
            </a>
          </TiltCard>
        </ScrollReveal>

        <ScrollReveal animation="fade-in" delay={1200} duration={800}>
          <p className="text-primary-cta font-semibold mb-16 animate-pulse">
            Registration Deadline: Friday at 11:59 PM
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-4 gap-4 max-w-lg w-full">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <ScrollReveal key={unit} animation="zoom-in" delay={1400 + index * 200} duration={800}>
              <TiltCard className="h-full">
                <div className="bg-primary-section bg-opacity-80 backdrop-blur-sm p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="text-3xl md:text-4xl font-bold text-primary-highlight mb-2">{value}</div>
                  <div className="text-sm text-primary-subtext capitalize">{unit}</div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 animate-bounce text-primary-subtext hover:text-primary-highlight transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}
