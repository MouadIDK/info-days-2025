"use client"

import { useRef, useEffect } from "react"
import { Instagram, Linkedin, Youtube } from "lucide-react"
import SectionParticles from "./section-particles"

export default function SocialMediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={32} />,
      url: "https://www.linkedin.com/company/appsclub-ensaa/posts/?feedView=all",
      color: "#0077B5",
    },
    {
      name: "Instagram",
      icon: <Instagram size={32} />,
      url: "https://www.instagram.com/appsclub.ensaa/",
      color: "#E1306C",
    },
    {
      name: "YouTube",
      icon: <Youtube size={32} />,
      url: "https://www.youtube.com/@AppsClubENSAA",
      color: "#FF0000",
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

    const animatedElements = sectionRef.current?.querySelectorAll(".social-item, .message-box")
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
    <section id="social" className="section bg-primary-section relative overflow-hidden" ref={sectionRef}>
      {/* Add section particles */}
      <SectionParticles variant="accent" density="medium" speed="medium" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 w-72 h-72 bg-primary-accent opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-highlight opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto relative z-10">
        <h2 className="section-title slide-up">Connect With Us</h2>
        <div className="title-underline slide-up"></div>

        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item opacity-0 transform translate-y-4 transition-all duration-500"
              >
                <div
                  className="bg-primary-background p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ borderTop: `4px solid ${social.color}` }}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-primary-highlight">{social.icon}</div>
                    <h3 className="text-xl font-semibold text-primary-highlight">{social.name}</h3>
                    <p className="text-primary-subtext text-sm">Follow us on {social.name}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 text-center message-box opacity-0 transform translate-y-4">
            <p className="text-xl text-primary-subtext">
              Stay updated with the latest news and announcements about Info Days 2025!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
