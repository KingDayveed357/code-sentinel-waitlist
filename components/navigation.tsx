"use client"

import { Moon, Sun, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NavigationProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#integrations", label: "Integrations" },
    { href: "#waitlist", label: "Secure Access" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-100/95 dark:bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo (light/dark auto switch) */}
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image
              src="/logo/logo.png"
              alt="CodeSentinel Logo"
              width={200}
              height={40}
              className={`object-contain transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                !darkMode 
                  ? "invert hue-rotate-180 brightness-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]" 
                  : "dark:drop-shadow-[0_0_20px_rgba(45,212,191,0.15)]"
              }`}
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-accent" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium hover:bg-accent/10 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
