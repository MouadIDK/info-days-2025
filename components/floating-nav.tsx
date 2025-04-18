"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, Home, Info, Code, HelpCircle, Calendar, BarChart2, Building, Share2 } from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const navItems: NavItem[] = [
    { id: "hero", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <Info size={18} /> },
    { id: "scc", label: "SCC", icon: <Code size={18} /> },
    { id: "faq", label: "FAQ", icon: <HelpCircle size={18} /> },
    { id: "schedule", label: "Schedule", icon: <Calendar size={18} /> },
    { id: "numbers", label: "Stats", icon: <BarChart2 size={18} /> },
    { id: "sponsors", label: "Sponsors", icon: <Building size={18} /> },
    { id: "social", label: "Connect", icon: <Share2 size={18} /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navItems])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile floating menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary-accent text-white shadow-lg md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile navigation menu */}
      <nav
        className={`fixed bottom-20 left-6 z-40 bg-primary-section bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ul className="py-2 px-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full px-4 py-2 text-left rounded-md ${
                  activeSection === item.id
                    ? "bg-primary-accent bg-opacity-20 text-primary-highlight"
                    : "text-primary-subtext hover:bg-primary-accent hover:bg-opacity-10"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop navigation dots */}
      <nav className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary-highlight scale-125"
                    : "bg-primary-subtext hover:bg-primary-cta"
                }`}
                aria-label={`Navigate to ${item.label}`}
              ></button>
              <span className="absolute top-0 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-primary-section px-2 py-1 rounded text-sm">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
