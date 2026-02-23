"use client"

import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"


const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Stronger Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border-t border-white/10" />

      {/* Soft Accent Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12 flex flex-col items-center ">
        {/* Logo */}
         <div className="flex items-center">
          {/* Light mode logo */}
          {/* <img src="/logo.svg" alt="CodeSentinel Logo" className="w-80" /> */}
          <Image
            src="/logo/logo.png"
            alt="CodeSentinel Logo"
            width={260}
            height={52}
            className="object-contain invert hue-rotate-180 brightness-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:invert-0 dark:hue-rotate-0 dark:drop-shadow-[0_0_25px_rgba(45,212,191,0.2)] transition-all duration-500 hover:scale-[1.03] active:scale-[0.97]"
            priority
          />
        </div>
     

        {/* Short Text */}
        <p className="text-center text-sm text-muted-foreground max-w-md italic font-medium mb-3">
          The Security Engineer You Can't Afford. Delivering Zero-Noise CI protection for world-class engineering teams.
        </p>

        {/* Socials Only — Minimal Authentic UI */}
        <div className="flex items-center gap-4 mb-4">
          <a
            href="https://github.com"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Github className="w-4 h-4 text-accent" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <XIcon className="w-4 h-4 text-accent" />

          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Linkedin className="w-4 h-4 text-accent" />
          </a>
          <a
            href="mailto:hello@codesentinel.dev"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Mail className="w-4 h-4 text-accent" />
          </a>
        </div>

        {/* Bottom Text */}
        <p className="text-xs text-muted-foreground">
          © {currentYear} CodeSentinel. Built for developers, by developers.
        </p>
      </div>
    </footer>
  )
}
