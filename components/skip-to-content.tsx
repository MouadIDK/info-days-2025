"use client"

import type React from "react"

import { useState } from "react"

export default function SkipToContent() {
  const [focused, setFocused] = useState(false)

  const handleSkip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    const mainContent = document.getElementById("about")
    if (mainContent) {
      mainContent.tabIndex = -1
      mainContent.focus()
      setTimeout(() => {
        mainContent.removeAttribute("tabindex")
      }, 1000)
    }
  }

  return (
    <a
      href="#about"
      className={`fixed top-4 left-4 bg-primary-accent text-white px-4 py-2 rounded-md z-50 transition-transform duration-300 ${
        focused ? "transform-none" : "-translate-y-20"
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={handleSkip}
      onKeyDown={(e) => e.key === "Enter" && handleSkip(e)}
    >
      Skip to content
    </a>
  )
}
