"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import SectionParticles from "./section-particles"
import DynamicGradient from "./dynamic-gradient"
import FloatingShapes from "./floating-shapes"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const faqItems: FAQItem[] = [
    {
      question: "Who can attend Info Days 2025?",
      answer:
        "Info Days is open to all students, professionals, and tech enthusiasts. The event is particularly aimed at university students and those interested in technology and innovation.",
    },
    {
      question: "How do I register for the event?",
      answer:
        "Registration is now open! The main event is free to attend. For the South Coding Cup competition, a separate registration form must be filled out, which may include a small registration fee to confirm attendance. The registration deadline is Friday at 11:59 PM.",
    },
    {
      question: "What should I bring to the event?",
      answer:
        "You don't need to bring laptops or any special equipment. Just bring your student ID (if applicable) and your enthusiasm for tech!",
    },
    {
      question: "Is the event free to attend?",
      answer:
        "Yes, Info Days 2025 is completely free to attend, including all conferences, workshops, and networking sessions. The South Coding Cup competition may have a small registration fee to confirm attendance.",
    },
    {
      question: "Where is the event located?",
      answer:
        "Day 1 (April 19) will take place at ENSA Agadir, Amphi 3. Day 2 (April 20) will be held at Code 212. Detailed directions will be sent to registered participants closer to the event date.",
    },
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

    const animatedElements = faqRef.current?.querySelectorAll(".faq-item")
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

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section bg-primary-background relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-background to-primary-section/50 z-0"></div>
      <DynamicGradient variant="default" intensity="medium" type="radial" className="z-0" />
      <SectionParticles variant="default" density="high" speed="medium" glow={true} className="z-0" />
      <div className="absolute inset-0 bg-noise z-0"></div>
      <div className="absolute inset-0 bg-grid z-0"></div>
      <FloatingShapes variant="default" density="low" speed="slow" className="z-0" />

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">Frequently Asked Questions</h2>
        <div className="title-underline slide-up"></div>
        <div className="max-w-3xl mx-auto slide-up mt-8" ref={faqRef}>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="mb-6 card overflow-hidden faq-item transition-all duration-500"
              style={{ opacity: 0.5, transform: "translateY(10px)" }}
            >
              <button
                className={`w-full text-left p-5 flex justify-between items-center transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary-accent bg-opacity-20"
                    : "bg-primary-section hover:bg-primary-accent hover:bg-opacity-10"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                <span className="transform transition-transform duration-300 text-primary-highlight">
                  {activeIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 bg-primary-background bg-opacity-50 backdrop-blur-sm ${
                  activeIndex === index ? "max-h-96 p-5" : "max-h-0"
                }`}
              >
                <p className="text-primary-subtext">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
