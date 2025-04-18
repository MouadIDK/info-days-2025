"use client"

import { useEffect } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SCCSection from "@/components/scc-section"
import FAQSection from "@/components/faq-section"
import ScheduleSection from "@/components/schedule-section"
import NumbersSection from "@/components/numbers-section"
import SponsorsSection from "@/components/sponsors-section"
import SocialMediaSection from "@/components/social-media-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import Preloader from "@/components/preloader"
import ScrollProgress from "@/components/scroll-progress"
import SkipToContent from "@/components/skip-to-content"
import FloatingNav from "@/components/floating-nav"
import PageTransition from "@/components/page-transition"

export default function Home() {
  useEffect(() => {
    // Add a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.classList.add("appear")

            // Also set inline styles for elements that might need it
            if (element.style) {
              element.style.opacity = "1"
              element.style.transform = "translateY(0)"
            }

            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      const animatedElements = document.querySelectorAll(
        ".fade-in, .slide-up, .about-item, .faq-item, .sponsor-item, .partner-item, .social-item, .message-box, .schedule-item",
      )
      animatedElements.forEach((el) => observer.observe(el))

      return () => {
        animatedElements.forEach((el) => observer.unobserve(el))
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")
        if (targetId) {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  return (
    <main className="flex-1 relative">
      <PageTransition />
      <Preloader />
      <ScrollProgress />
      <SkipToContent />
      <FloatingNav />
      <HeroSection />
      <AboutSection />
      <SCCSection />
      <FAQSection />
      <ScheduleSection />
      <NumbersSection />
      <SponsorsSection />
      <SocialMediaSection />
      <BackToTop />
      <Footer />
    </main>
  )
}
