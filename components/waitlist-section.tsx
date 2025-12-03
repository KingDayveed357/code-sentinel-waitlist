"use client"

import { useState } from "react"
import { Share2, Check, Copy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setSubmitted(true)

    // simulate API
    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
    }, 2500)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://codesent.com/join")
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-border/50 bg-card p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">Join the CodeSentinel Waitlist</h2>
            <p className="text-lg text-muted-foreground">
              Be among the first to experience the future of secure software development.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-input border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all hover:border-accent/30"
                />

                <button
                  type="submit"
                  disabled={submitted}
                  className={`px-8 py-3 rounded-lg font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    submitted
                      ? "bg-green-500 text-white"
                      : "bg-accent text-accent-foreground hover:opacity-90 hover:shadow-lg"
                  }`}
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Joined!
                    </span>
                  ) : (
                    "Join Waitlist"
                  )}
                </button>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Success message */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400"
                >
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">You've been added to our waitlist!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Share section */}
            <div className="pt-8 space-y-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">Or share with your team:</p>

              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button className="p-3 rounded-lg border border-border/50 hover:bg-muted transition-colors hover:scale-110 active:scale-95 duration-200">
                  <Share2 className="w-5 h-5" />
                </button>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    value="https://codesent.com/join"
                    readOnly
                    className="px-3 py-2 rounded-lg bg-input border border-input text-xs text-muted-foreground text-center pr-10"
                  />

                  <button
                    onClick={handleCopyLink}
                    className="absolute right-2 p-1.5 hover:bg-accent/20 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground hover:text-accent" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
