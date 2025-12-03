"use client"
import React from "react"


export default function MarketRealitySection() {
  const quotes = [
    {
      text: "We spent 6 hours debugging a vulnerability that should have been caught in CI. We need better scanning.",
      source: "GitHub Issue #4521 - Security Best Practices",
      category: "Security",
    },
    {
      text: "Our CI/CD pipeline fails 40% of the time due to slow security scans. This is killing our deployment velocity.",
      source: "Reddit r/devops - CI/CD Pipeline Issues",
      category: "Performance",
    },
    {
      text: "Enforcing security policies across 50+ repositories is a nightmare. We need automation.",
      source: "Dev Blog Post - Scaling Security",
      category: "Compliance",
    },
    {
      text: "We discovered a critical API key exposed in production. Detection took 3 weeks. Way too long.",
      source: "Security Conference Talk - Real Incidents",
      category: "Vulnerability",
    },
    {
      text: "Every developer interprets security policies differently. We need a unified solution.",
      source: "Hacker News - DevOps Discussion",
      category: "Policy",
    },
    {
      text: "Our security team can't keep up with code changes. Manual reviews are becoming impossible.",
      source: "Tech Forum - Security Automation",
      category: "Scalability",
    },
  ]

  const categoryColors: Record<string, string> = {
    Security: "bg-red-500/10 text-red-600 border-red-500/20",
    Performance: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    Compliance: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Vulnerability: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    Policy: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    Scalability: "bg-green-500/10 text-green-600 border-green-500/20",
  }

 const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const [direction, setDirection] = React.useState(0)
  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)

  const minSwipeDistance = 50

  const nextSlide = React.useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % quotes.length)
  }, [quotes.length])

  const prevSlide = React.useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }, [quotes.length])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  React.useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const getVisibleSlides = () => {
    const slides = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + quotes.length) % quotes.length
      slides.push({ ...quotes[index], position: i, index })
    }
    return slides
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:mb-16 mb-0  space-y-4 animate-fade-in">
          <h2 className="text-4xl dark:text-white md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            It's simple,<br />responsive and fast.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Real challenges from development teams across the industry—problems CodeSentinel solves.
          </p>
        </div>

        <div className="relative h-[500px] md:h-[450px] flex items-center justify-center"
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}>
          
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center touch-pan-y">
            {getVisibleSlides().map((slide) => {
              const isCenter = slide.position === 0
              const isLeft = slide.position === -1
              const isRight = slide.position === 1
              
              return (
                <div
                  key={slide.index}
                  className={`absolute transition-all duration-700 ease-out ${
                    isCenter 
                      ? 'z-20 scale-100 opacity-100 translate-x-0' 
                      : isLeft
                      ? 'z-10 scale-75 opacity-40 -translate-x-[60%] md:-translate-x-[70%] blur-sm'
                      : 'z-10 scale-75 opacity-40 translate-x-[60%] md:translate-x-[70%] blur-sm'
                  }`}
                  style={{
                    width: isCenter ? '90%' : '80%',
                    maxWidth: isCenter ? '600px' : '500px',
                  }}
                >
                  <div className={`group p-8 md:p-12 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 ${
                    isCenter 
                      ? `${categoryColors[slide.category].replace('/10', '/20')} border-current shadow-2xl` 
                      : 'bg-card/50 border-border/30'
                  }`}>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 border-2 transition-all duration-300 ${
                      isCenter ? categoryColors[slide.category] : 'bg-muted/50 text-muted-foreground border-border/50'
                    }`}>
                      {slide.category}
                    </div>
                    
                    <p className={`text-lg md:text-2xl leading-relaxed mb-6 font-medium transition-all duration-300 ${
                      isCenter ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      "{slide.text}"
                    </p>
                    
                    <p className={`text-sm md:text-base font-medium transition-all duration-300 ${
                      isCenter ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}>
                      {slide.source}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-2 md:left-8 z-30 p-3 md:p-4 rounded-full bg-card/80 backdrop-blur-md border border-border/50 hover:bg-accent hover:scale-110 transition-all duration-300 shadow-lg group items-center justify-center"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-2 md:right-8 z-30 p-3 md:p-4 rounded-full bg-card/80 backdrop-blur-md border border-border/50 hover:bg-accent hover:scale-110 transition-all duration-300 shadow-lg group items-center justify-center"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 md:mt-8 mt-0">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 bg-accent' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}