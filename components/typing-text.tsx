"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetween?: number
}

export default function TypingText({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}: TypingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, delayBetween)
      return () => clearTimeout(timeout)
    }

    const text = texts[currentTextIndex]

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, deletingSpeed)
      }
    } else {
      if (currentText === text) {
        setIsPaused(true)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(text.slice(0, currentText.length + 1))
        }, typingSpeed)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, delayBetween])

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  )
}
