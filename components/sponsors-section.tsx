"use client"

import { useRef, useEffect } from "react"
import SectionParticles from "./section-particles"
import Image from "next/image"

interface Sponsor {
  name: string
  logo: string
}

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const sponsors: Sponsor[] = [
    { name: "Norsys Afrique", logo: "/norsys.jpeg" }
  ]

  const partners: Sponsor[] = [
    { name: "Alfeheriya", logo: "/alfehria.jpeg" },
    { name: "MACS", logo: "/macs-logo-2.png" },
    { name: "Code212", logo: "/images/code212-logo.jpeg" }
  ]

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

    const animatedElements = sectionRef.current?.querySelectorAll(".sponsor-item, .partner-item")
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
    <section id="sponsors" className="section bg-primary-background relative overflow-hidden" ref={sectionRef}>
      {/* Add section particles */}
      <SectionParticles variant="default" density="low" speed="slow" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-primary-highlight opacity-5 rounded-full -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary-accent opacity-5 rounded-full translate-x-1/2"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">Sponsors & Partners</h2>
        <div className="title-underline slide-up"></div>

        {/* Sponsors Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-primary-highlight text-center mb-8">Our Sponsors</h3>
          <div className="grid grid-cols-1 gap-8 max-w-xs mx-auto">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="sponsor-item opacity-0 transform translate-y-4 transition-all duration-500 bg-primary-section p-6 rounded-xl hover:shadow-lg"
              >
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-center text-lg font-semibold text-primary-highlight">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-primary-highlight text-center mb-8">Our Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-item opacity-0 transform translate-y-4 transition-all duration-500 bg-primary-section p-6 rounded-xl hover:shadow-lg"
              >
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-center text-lg font-semibold text-primary-highlight">{partner.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
