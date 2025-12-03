"use client"

import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20">
      {/* Stronger Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border-t border-white/10" />

      {/* Soft Accent Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12 flex flex-col items-center gap-6">
        {/* Logo */}
         <div className="flex items-center gap-3">
          {/* Light mode logo */}
          <Image
            src="/logo-dark.png"
            alt="CodeSentinel Logo"
            width={240}
            height={10}
            className="block dark:hidden object-contain"
            priority
          />
          {/* Dark mode logo */}
          <Image
            src="/logo-light.png"
            alt="CodeSentinel Logo"
            width={240}
            height={10}
            className="hidden dark:block object-contain"
            priority
          />
        </div>
     

        {/* Short Text */}
        <p className="text-center text-sm text-muted-foreground max-w-md">
          Building the future of secure development. Join the waitlist to get early access.
        </p>

        {/* Socials Only — Minimal Authentic UI */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Github className="w-4 h-4 text-accent" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <Twitter className="w-4 h-4 text-accent" />
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
.
        </p>
      </div>
    </footer>
  )
}
