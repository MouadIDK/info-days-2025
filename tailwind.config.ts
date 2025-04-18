import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          background: "#0B0B45",
          section: "#14144F",
          accent: "#3D21C5",
          cta: "#FF4E3D",
          highlight: "#00D1FF",
          text: "#FFFFFF",
          subtext: "#D1D1E9",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)"],
        poppins: ["var(--font-poppins)"],
        montserrat: ["var(--font-montserrat)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 209, 255, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 209, 255, 0.8)" },
        },
        "rotate-3d": {
          "0%": { transform: "rotateX(0) rotateY(0)" },
          "25%": { transform: "rotateX(10deg) rotateY(10deg)" },
          "50%": { transform: "rotateX(0) rotateY(20deg)" },
          "75%": { transform: "rotateX(-10deg) rotateY(10deg)" },
          "100%": { transform: "rotateX(0) rotateY(0)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "pulse-quick": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.3" },
        },
        flash: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "text-gradient": "text-gradient 3s ease infinite",
        blink: "blink 1s step-end infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "spin-reverse": "spin-reverse 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "rotate-3d": "rotate-3d 10s ease-in-out infinite",
        ripple: "ripple 0.6s ease-out forwards",
        "pulse-quick": "pulse-quick 0.4s ease-in-out forwards",
        flash: "flash 0.3s ease-in-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
