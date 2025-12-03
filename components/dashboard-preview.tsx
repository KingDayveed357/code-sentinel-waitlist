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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold">Intuitive Dashboard</h2>
          <p className="text-lg text-muted-foreground">
            Get instant visibility into your security posture with real-time monitoring.
          </p>
        </div>

        <div className="rounded-xl border border-border/50 overflow-hidden shadow-2xl bg-card hover:shadow-3xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-8">
            <div className="space-y-6 animate-slide-in-down">
              {/* Header bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Security Overview</h3>
                  <p className="text-sm text-muted-foreground mt-1">Last scanned: 2 minutes ago</p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 animate-bounce-in">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">All Clear</span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Repositories", value: displayStats.repos, color: "text-blue-600 dark:text-blue-400" },
                  { label: "Scans Today", value: displayStats.scans, color: "text-green-600 dark:text-green-400" },
                  {
                    label: "Vulnerabilities",
                    value: displayStats.vulnerabilities,
                    color: "text-yellow-600 dark:text-yellow-400",
                  },
                  { label: "Critical Issues", value: displayStats.critical, color: "text-red-600 dark:text-red-400" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-card border border-border/30 hover:border-accent/50 hover:shadow-lg transition-all hover:scale-105 duration-300 animate-count-up group cursor-default"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <p className="text-xs text-muted-foreground mb-1 group-hover:text-accent transition-colors">
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold transition-all group-hover:scale-110 ${stat.color}`}>
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
