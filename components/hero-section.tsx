"use client"

import { useState } from "react"
import { ChevronRight, ShieldCheck, Zap, GitBranch } from "lucide-react"
import AnimatedCode from "./animated-code"
import DemoModal from "./demo-modal"

export default function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat" />

          {/* Gradient orbs */}
          <div className="absolute top-10 right-[-200px] w-[500px] h-[500px] bg-accent/15 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-[-200px] w-[450px] h-[450px] bg-primary/10 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="space-y-7 animate-fade-up">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-xs font-semibold text-accent">Beta Access Coming Soon!</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight dark:text-white tracking-tight">
              Ship Secure.<br />
              <span className="text-accent">Scan Smarter.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              CodeSentinel continuously monitors your repositories, analyzes dependencies, 
              flags dangerous patterns, and suggests AI-powered fixes—all before vulnerabilities reach production.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#waitlist" 
              className="px-7 py-3 rounded-lg bg-accent text-center text-accent-foreground font-semibold shadow-lg hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
              Join the Waitlist
              </a>
            

              <button
                onClick={() => setIsDemoOpen(true)}
                className="px-7 py-3 rounded-lg border border-accent/40 text-accent font-semibold hover:bg-accent/10 
                transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                View Mock Demo
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 pt-10 text-sm text-muted-foreground">
              {[
                { icon: ShieldCheck, label: "Security by Default" },
                { icon: GitBranch, label: "GitHub-native Workflow" },
                { icon: Zap, label: "Blazing Fast Scans" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Code animation */}
          <div className="hidden md:block animate-fade-left">
            <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl p-4">
              <AnimatedCode />
            </div>
          </div>

        </div>
      </section>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
