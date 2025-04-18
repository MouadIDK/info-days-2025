"use client"

import { useRef, useEffect } from "react"
import { Code, Users, Trophy, BookOpen } from "lucide-react"
import SectionParticles from "./section-particles"
import DynamicGradient from "./dynamic-gradient"
import FloatingShapes from "./floating-shapes"

export default function SCCSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const animatedElements = sectionRef.current?.querySelectorAll(".animate-item")
    animatedElements?.forEach((el) => observer.observe(el))

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="scc" className="section bg-primary-background" ref={sectionRef}>
      {/* Enhanced background effects */}
      <DynamicGradient variant="accent" intensity="medium" type="conic" className="z-0" />
      <SectionParticles variant="accent" density="medium" speed="medium" glow={true} className="z-0" />
      <FloatingShapes variant="accent" density="low" speed="slow" className="z-0" />

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">What is SCC?</h2>
        <div className="title-underline slide-up"></div>
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-br from-primary-section to-primary-section/70 rounded-2xl p-8 shadow-lg slide-up backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 text-primary-highlight">South Coding Cup</h3>
            <p className="text-lg mb-6">
              The South Coding Cup (SCC) is a prestigious competitive programming contest that challenges participants
              to solve complex algorithmic problems within a limited timeframe.
            </p>

            <div className="bg-primary-accent bg-opacity-20 p-4 rounded-lg mb-8 border border-primary-accent animate-item transform transition-all duration-500 hover:shadow-lg hover:border-primary-highlight animated-border">
              <p className="text-center font-semibold">Registration Deadline: Friday at 11:59 PM</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-primary-background bg-opacity-50 p-6 rounded-xl animate-item transform transition-all duration-500 hover:shadow-lg hover:bg-opacity-70 delay-100 hover:glow-accent">
                <div className="flex items-center mb-3">
                  <Users className="text-primary-cta mr-3" size={24} />
                  <h4 className="text-xl font-bold text-primary-cta">Who can participate?</h4>
                </div>
                <p>
                  Students from University of Ibn Zohr. Teams must consist of exactly 3 members to be eligible for
                  participation.
                </p>
              </div>

              <div className="bg-primary-background bg-opacity-50 p-6 rounded-xl animate-item transform transition-all duration-500 hover:shadow-lg hover:bg-opacity-70 delay-200 hover:glow-accent">
                <div className="flex items-center mb-3">
                  <Code className="text-primary-cta mr-3" size={24} />
                  <h4 className="text-xl font-bold text-primary-cta">Why join?</h4>
                </div>
                <p>
                  Challenge yourself, enhance your problem-solving skills, network with like-minded individuals, and win
                  exciting prizes!
                </p>
              </div>

              <div className="bg-primary-background bg-opacity-50 p-6 rounded-xl animate-item transform transition-all duration-500 hover:shadow-lg hover:bg-opacity-70 delay-300 hover:glow-accent">
                <div className="flex items-center mb-3">
                  <Trophy className="text-primary-cta mr-3" size={24} />
                  <h4 className="text-xl font-bold text-primary-cta">What's at stake?</h4>
                </div>
                <p>Cash prizes, tech gadgets, and recognition from top tech companies in Morocco and beyond.</p>
              </div>

              <div className="bg-primary-background bg-opacity-50 p-6 rounded-xl animate-item transform transition-all duration-500 hover:shadow-lg hover:bg-opacity-70 delay-400 hover:glow-accent">
                <div className="flex items-center mb-3">
                  <BookOpen className="text-primary-cta mr-3" size={24} />
                  <h4 className="text-xl font-bold text-primary-cta">How to prepare?</h4>
                </div>
                <p>
                  Prepare by participating in the biweekly contests on AppsClub YouTube channel. Practice algorithmic
                  problem-solving and strengthen your team collaboration before the big day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
