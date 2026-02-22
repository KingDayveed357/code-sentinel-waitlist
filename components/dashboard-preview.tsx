"use client"

import { useState, useEffect } from "react"

export default function DashboardPreview() {
  const [displayStats, setDisplayStats] = useState({
    repos: 0,
    scans: 0,
    vulnerabilities: 0,
    critical: 0,
  })

  const finalStats = {
    repos: 24,
    scans: 156,
    vulnerabilities: 3,
    critical: 0,
  }

  useEffect(() => {
    const animationDuration = 1000 // 1 second
    const startTime = Date.now()

    const animateCounter = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)

      setDisplayStats({
        repos: Math.floor(finalStats.repos * progress),
        scans: Math.floor(finalStats.scans * progress),
        vulnerabilities: Math.floor(finalStats.vulnerabilities * progress),
        critical: Math.floor(finalStats.critical * progress),
      })

      if (progress < 1) {
        requestAnimationFrame(animateCounter)
      }
    }

    const frameId = requestAnimationFrame(animateCounter)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/5 dark:bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight italic text-accent">Zero Noise. Absolute Control.</h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Get instant visibility into your security posture with our Zero-Noise Filter — showing only what matters for your velocity.
          </p>
        </div>

        <div className="rounded-2xl border border-border/50 overflow-hidden shadow-2xl bg-card transition-all duration-500 hover:border-accent/30">
          <div className="p-10">
            <div className="space-y-8 animate-slide-in-down">
              {/* Header bar */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight font-mono uppercase">Sentinel Overview</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Scanning Active: 2ms ago</p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Sentinel Active</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Repositories Guarded", value: displayStats.repos, color: "text-accent" },
                  { label: "Scans (Last 24h)", value: displayStats.scans, color: "text-foreground" },
                  {
                    label: "Kill-Chain Threats Blocked",
                    value: displayStats.vulnerabilities,
                    color: "text-red-500",
                  },
                  { label: "Secure PRs Generated", value: 12, color: "text-green-500" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:border-accent/50 hover:bg-muted/50 transition-all duration-300 group cursor-default"
                  >
                    <p className="text-[10px] font-bold text-muted-foreground mb-2 group-hover:text-accent transition-colors uppercase tracking-widest">
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-black tracking-tighter ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart placeholder with enhanced visualization */}
              <div className="p-6 rounded-lg bg-card border border-border/30 h-48 flex items-center justify-center hover:border-accent/50 transition-colors">
                <div className="text-center space-y-3">
                  <div className="flex justify-center gap-2 items-end h-24">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="rounded-t-sm group hover:brightness-125 transition-all cursor-default"
                        style={{
                          width: "12px",
                          height: `${20 + i * 15}px`,
                          backgroundColor: "hsl(200, 100%, 50%)",
                          animation: `pulse 2s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Vulnerability Trends</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
