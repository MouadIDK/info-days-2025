"use client"

import { useRef, useEffect } from "react"
import { Calendar, MapPin, Users } from "lucide-react"
import SectionParticles from "./section-particles"
import DynamicGradient from "./dynamic-gradient"
import FloatingShapes from "./floating-shapes"

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.classList.add("appear")
            element.style.opacity = "1"
            element.style.transform = "translateY(0)"
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = sectionRef.current?.querySelectorAll(".about-item")
    if (animatedElements) {
      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  return (
    <section id="about" className="section bg-primary-section relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced background effects */}
      <DynamicGradient variant="light" intensity="low" type="linear" className="z-0" />
      <SectionParticles variant="light" density="low" speed="slow" glow={true} className="z-0" />
      <FloatingShapes variant="light" density="low" speed="slow" className="z-0" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-cta opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-highlight opacity-5 rounded-full -translate-x-1/4 translate-y-1/4"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">About the Event</h2>
        <div className="title-underline slide-up"></div>

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            className="about-item bg-gradient-to-br from-primary-background to-primary-background/70 p-6 rounded-xl shadow-lg transition-all duration-500 backdrop-blur-sm"
            style={{ opacity: 0.5, transform: "translateY(10px)" }}
          >
            <div className="flex justify-center mb-4">
              <Calendar className="text-primary-cta" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-primary-highlight">When</h3>
            <p className="text-center text-primary-subtext">April 19-20, 2025</p>
            <p className="text-center text-primary-subtext">Starting at 9:00 AM</p>
          </div>

          <div
            className="about-item bg-gradient-to-br from-primary-background to-primary-background/70 p-6 rounded-xl shadow-lg transition-all duration-500 backdrop-blur-sm"
            style={{ opacity: 0.5, transform: "translateY(10px)" }}
          >
            <div className="flex justify-center mb-4">
              <MapPin className="text-primary-cta" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-primary-highlight">Where</h3>
            <p className="text-center text-primary-subtext">Day 1: ENSA Agadir, Amphi 3</p>
            <p className="text-center text-primary-subtext">Day 2: Code 212</p>
          </div>

          <div
            className="about-item bg-gradient-to-br from-primary-background to-primary-background/70 p-6 rounded-xl shadow-lg transition-all duration-500 backdrop-blur-sm"
            style={{ opacity: 0.5, transform: "translateY(10px)" }}
          >
            <div className="flex justify-center mb-4">
              <Users className="text-primary-cta" size={36} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center text-primary-highlight">Who</h3>
            <p className="text-center text-primary-subtext">Students, professionals, and tech enthusiasts</p>
            <p className="text-center text-primary-subtext">SCC: Teams of 3 from Ibn Zohr University</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div
            className="about-item transition-all duration-500"
            style={{ opacity: 0.5, transform: "translateY(10px)" }}
          >
            <p className="text-lg mb-6">
              Info Days is an annual tech event organized by AppsClub, bringing together students, professionals, and
              tech enthusiasts for two days of learning, networking, and competition.
            </p>
            <p className="text-lg mb-6">
              Our mission is to connect students with the latest trends in technology through engaging talks, workshops,
              and competitions, fostering a community of innovation and collaboration.
            </p>
            <p className="text-lg">
              Whether you're a coding expert or just curious about technology, Info Days 2025 offers something for
              everyone with a passion for tech and innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
