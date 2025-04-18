import type React from "react"
import "./globals.css"
import { Orbitron, Poppins, Montserrat } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata = {
  title: "Info Days 2025 - ENSA Agadir × Code212",
  description: "Join us for Info Days 2025 - A tech event by ENSA Agadir and Code212",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body
        className={`${orbitron.variable} ${poppins.variable} ${montserrat.variable} bg-primary-background text-primary-text min-h-full flex flex-col`}
      >
        {children}
      </body>
    </html>
  )
}
