"use client"

import { useRef, useEffect } from "react"
import SectionParticles from "./section-particles"

interface ScheduleItem {
  time: string
  title: string
  description: string
  highlight?: boolean
}

interface DaySchedule {
  date: string
  items: ScheduleItem[]
}

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const schedule: DaySchedule[] = [
    {
      date: "Info Days 2025",
      items: [
        {
          time: "09:30",
          title: "Open talk on data fields",
          description: "With Achraf OUJJIR (Data engineer at Deloitte, Morocco) and Yassin EL JAKANI (Data scientist, Morocco)",
        },
        {
          time: "11:00",
          title: "Professional Journeys: From Morocco to Google",
          description: "With Hamza BOURBOUH (Senior software engineer at Google Deepmind, Switzerland) and Ahmed KACHKACH (Senior staff software engineer at Google, Switzerland)",
        },
        {
          time: "15:00",
          title: "Push, pull & people: Navigating the Human Side of Dev Life",
          description: "With Oumaima MAKHLOUK (Software engineer at IBM, Morocco)",
        },
        {
          time: "16:00",
          title: "Prepare for faang interviews",
          description: "With Ali ISSAOUI (Software development engineer at Amazon Web Services, USA)",
        },
      ],
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

    const animatedElements = sectionRef.current?.querySelectorAll(".schedule-item")
    if (animatedElements) {
      animatedElements.forEach((el, index) => {
        // Add staggered delay
        setTimeout(() => {
          observer.observe(el)
        }, index * 100)
      })
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  return (
    <section id="schedule" className="section bg-primary-background relative overflow-hidden" ref={sectionRef}>
      {/* Add section particles */}
      <SectionParticles variant="light" density="medium" speed="medium" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-highlight opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-cta opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">Event Schedule</h2>
        <div className="title-underline slide-up"></div>
        <div className="max-w-4xl mx-auto mt-8">
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-16 slide-up">
              <h3 className="text-2xl font-bold mb-6 text-primary-highlight text-center">{day.date}</h3>

              <div className="relative md:px-4">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-primary-accent"></div>

                {/* Schedule items */}
                <div className="space-y-8">
                  {day.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`schedule-item relative flex flex-col md:flex-row ${
                        itemIndex % 2 === 0 ? "md:flex-row-reverse" : ""
                      } md:mb-12 transition-all duration-500`}
                      style={{ opacity: 0.5, transform: "translateY(10px)" }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[-8px] md:left-1/2 transform md:translate-x-[-50%] top-6 w-4 h-4 rounded-full bg-primary-cta border-4 border-primary-background z-10 group-hover:scale-125 transition-transform duration-300"></div>

                      {/* Content */}
                      <div
                        className={`md:w-1/2 pl-6 ${
                          itemIndex % 2 === 0
                            ? "md:pl-8 md:pr-16" // Right side (flex-row-reverse)
                            : "md:pr-8 md:pl-16" // Left side (flex-row)
                        }`}
                      >
                        <div
                          className={`p-4 rounded-lg shadow-md group hover:shadow-lg transition-all duration-300 ${
                            item.highlight
                              ? "bg-primary-accent bg-opacity-20 border border-primary-accent hover:bg-opacity-30"
                              : "bg-primary-section hover:bg-opacity-90"
                          }`}
                        >
                          <div className="font-mono text-sm text-primary-highlight mb-2 group-hover:text-primary-cta transition-colors duration-300">
                            {item.time}
                          </div>
                          <h4 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">
                            {item.title}
                          </h4>
                          <p className="text-primary-subtext group-hover:text-primary-text transition-colors duration-300">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Spacer for alternate layout */}
                      <div className="hidden md:block md:w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
