import { useState } from "react"
import { ChevronRight, Shield, Zap, GitPullRequest, Search } from "lucide-react"
import SentinelAlert from "./sentinel-alert"
import DemoModal from "./demo-modal"

export default function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />
          <div className="absolute top-10 right-[-200px] w-[500px] h-[500px] bg-accent/15 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-[-200px] w-[450px] h-[450px] bg-primary/10 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="space-y-8 animate-fade-up">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-mono">Status: Private Beta Waves</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] dark:text-white tracking-tight">
              The Security Engineer<br />
              <span className="text-accent italic">You Can't Afford.</span>
            </h1>

            {/* Subtitle - Identity Pain & Velocity */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
              Stop drowning in security noise. CodeSentinel delivers zero-noise CI security and AI-powered fixes for founders and teams that ship at the speed of thought.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#waitlist" 
              className="px-8 py-4 rounded-lg bg-accent text-center text-accent-foreground font-bold shadow-2xl hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
              Secure My Repos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            

              <button
                onClick={() => setIsDemoOpen(true)}
                className="px-8 py-4 rounded-lg border border-border text-foreground font-bold hover:bg-muted/50 
                transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Sentinel Overview
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Feature highlights - Result Driven */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground/80">
              {[
                { icon: Shield, label: "Zero-Noise Scan" },
                { icon: GitPullRequest, label: "Secure PR Fixes" },
                { icon: Zap, label: "<120s Resolution" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Sentinel Alert Visual */}
          <div className="animate-fade-left">
            <div className="relative">
              <SentinelAlert />
            </div>
          </div>

        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
