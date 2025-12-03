"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import DashboardPreview from "@/components/dashboard-preview"
import Footer from "@/components/footer"
import StickyCtaBanner from "@/components/sticky-cta-banner"
import MarketRealitySection from "@/components/market-reality-section"
import GamifiedWaitlist from "@/components/gamified-waitlist"
import IntegrationsSection from "@/components/integrations-section"

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [showStickyBanner, setShowStickyBanner] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const waitlistRef = useRef<HTMLDivElement | null>(null)

  const isSectionInView = useCallback((element: HTMLElement | null) => {
    if (!element || typeof window === 'undefined') return false
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDark = document.documentElement.classList.contains("dark")
    setDarkMode(isDark)

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 1.2
      const inWaitlist = isSectionInView(waitlistRef.current)

      if (bannerDismissed) {
        setShowStickyBanner(false)
        return
      }

      if (inWaitlist) {
        setShowStickyBanner(false)
        return
      }

      setShowStickyBanner(window.scrollY > heroHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [bannerDismissed, isSectionInView])

  const toggleDarkMode = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const html = document.documentElement
    html.classList.toggle("dark")
    setDarkMode(html.classList.contains("dark"))
  }

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {showStickyBanner && (
        <StickyCtaBanner 
          onClose={() => setBannerDismissed(true)} 
          onClickCTA={scrollToWaitlist}
        />
      )}

      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <IntegrationsSection />
        <MarketRealitySection />

        <div ref={waitlistRef} id="waitlist">
          <GamifiedWaitlist />
        </div>
      </main>

      <Footer />
    </div>
  )
}
