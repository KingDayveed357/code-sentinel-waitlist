"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Share2, Check, Copy, Trophy, Users, Loader2, Mail, Twitter, Linkedin } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface WaitlistEntry {
  id: string
  email: string
  referral_code: string
  referral_count: number
  position: number
  created_at: string
}

export default function GamifiedWaitlist() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [referralCount, setReferralCount] = useState(0)
  const [referralCode, setReferralCode] = useState("")
  const [position, setPosition] = useState<number | null>(null)
  const [totalWaitlist, setTotalWaitlist] = useState(2847)
  const [error, setError] = useState("")
  const [referredBy, setReferredBy] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Get referral code from URL
    const params = new URLSearchParams(window.location.search)
    const refCode = params.get("ref")
    if (refCode) {
      setReferredBy(refCode)
    }

    // Fetch total waitlist count
    fetchTotalCount()
  }, [])

  const fetchTotalCount = async () => {
    try {
      const { count, error } = await supabase
        .from("waitlist_entries")
        .select("*", { count: "exact", head: true })

      if (error) throw error
      if (count !== null) {
        setTotalWaitlist(count)
      }
    } catch (err) {
      console.error("Error fetching count:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setSubmitting(true)
    setError("")

    try {
      // Check if email already exists
      const { data: existingEntry } = await supabase
        .from("waitlist_entries")
        .select("*")
        .eq("email", email)
        .single()

      if (existingEntry) {
        // Email already on waitlist, show their info
        setReferralCode(existingEntry.referral_code)
        setReferralCount(existingEntry.referral_count)
        setPosition(existingEntry.position)
        setSubmitted(true)
        setSubmitting(false)
        return
      }

      // If referred by someone, increment their count
      if (referredBy) {
        const { data: referrer } = await supabase
          .from("waitlist_entries")
          .select("referral_count")
          .eq("referral_code", referredBy)
          .single()

        if (referrer) {
          await supabase
            .from("waitlist_entries")
            .update({ referral_count: referrer.referral_count + 1 })
            .eq("referral_code", referredBy)
        }
      }

      // Insert new entry
      const { data, error: insertError } = await supabase
        .from("waitlist_entries")
        .insert([
          {
            email,
            referred_by: referredBy,
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      if (data) {
        setReferralCode(data.referral_code)
        setReferralCount(data.referral_count)
        setPosition(data.position)
        setSubmitted(true)
        setTotalWaitlist((prev) => prev + 1)

        // Update URL with referral code
        if (typeof window !== 'undefined') {
          const newUrl = new URL(window.location.href)
          newUrl.searchParams.delete("ref")
          window.history.replaceState({}, "", newUrl)
        }
      }
    } catch (err: any) {
      console.error("Error submitting:", err)
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const getReferralLink = () => {
    if (typeof window === 'undefined') return ''
    const baseUrl = window.location.origin + window.location.pathname
    return `${baseUrl}?ref=${referralCode}`
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getReferralLink())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: "twitter" | "linkedin" | "email") => {
    if (typeof window === 'undefined') return
    const link = getReferralLink()
    const text = "Join me on the CodeSentinel waitlist - automated security scanning for developers!"

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
      email: `mailto:?subject=${encodeURIComponent("Join CodeSentinel")}&body=${encodeURIComponent(
        `${text}\n\n${link}`
      )}`,
    }

    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  const referralTiers = [
    { count: 1, reward: "Skip 50 spots", unlocked: referralCount >= 1 },
    { count: 5, reward: "Early Beta Access", unlocked: referralCount >= 5 },
    { count: 10, reward: "1 Month Pro Free", unlocked: referralCount >= 10 },
  ]

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto">
         <div className="relative rounded-2xl p-8 md:p-12 shadow-2xl bg-gradient-to-br from-card to-card/50">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border border-accent/20" />
            <div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 85%, rgba(var(--accent-rgb, 120, 119, 198), 0.6) 90%, transparent 95%, transparent 100%)`,
                animation: 'rotateBorder 4s linear infinite',
              }}
            />
          </div>
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Join the CodeSentinel Waitlist</h2>
            <p className="text-lg text-muted-foreground">
              Be among the first developers to experience the future of secure software development.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                    className="flex-1 px-4 py-3 rounded-lg bg-input border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-lg font-semibold whitespace-nowrap transition-all active:scale-95 bg-accent text-accent-foreground hover:opacity-90 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </button>
                </div>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {referredBy && (
                  <p className="text-sm text-accent text-center">
                    🎉 You've been referred! You'll get priority access.
                  </p>
                )}
              </form>
            ) : (
              <div className="space-y-6 pt-4">
                <div className="p-6 rounded-xl bg-accent/10 border border-accent/30">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Check className="w-6 h-6 text-green-500" />
                    <h3 className="text-xl font-bold text-foreground">You're on the list!</h3>
                  </div>
                  {position && (
                    <p className="text-2xl font-bold text-accent mb-2">
                      Position #{position}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Check your email for confirmation. Share your link below to move up!
                  </p>
                </div>

                <div className="pt-4 space-y-6 border-t border-accent/10">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-4 flex items-center justify-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      Referral Rewards ({referralCount} referrals)
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {referralTiers.map((tier, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border transition-all ${
                            tier.unlocked
                              ? "border-accent/50 bg-accent/10 scale-105"
                              : "border-border/30 bg-muted/20 opacity-50"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Trophy className={`w-4 h-4 ${tier.unlocked ? "text-accent" : "text-muted-foreground"}`} />
                            <span className="text-xs font-bold text-accent">{tier.count}</span>
                          </div>
                          <p className="text-xs font-semibold text-foreground text-center">{tier.reward}</p>
                          {tier.unlocked && <Check className="w-4 h-4 text-green-500 mx-auto mt-2" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground font-semibold">Share your referral link:</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={getReferralLink()}
                        readOnly
                        className="flex-1 px-3 py-2 rounded-lg bg-input border border-input text-xs text-foreground select-all"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="p-2.5 hover:bg-accent/20 rounded-lg transition-colors"
                        title="Copy link"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-accent" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 flex-wrap pt-2 border-t border-accent/10 pt-6">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-3 rounded-lg border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-colors hover:scale-110 active:scale-95 duration-200"
                      title="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-3 rounded-lg border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-colors hover:scale-110 active:scale-95 duration-200"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare("email")}
                      className="p-3 rounded-lg border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-colors hover:scale-110 active:scale-95 duration-200"
                      title="Share via Email"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && navigator.share) {
                          navigator.share({
                            title: "Join CodeSentinel",
                            text: "Join me on the CodeSentinel waitlist!",
                            url: getReferralLink(),
                          })
                        }
                      }}
                      className="p-3 rounded-lg border border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-colors hover:scale-110 active:scale-95 duration-200"
                      title="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!submitted && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
                <Users className="w-4 h-4 text-accent" />
                <span>
                  <span className="font-semibold text-foreground">{totalWaitlist.toLocaleString()}</span> developers
                  already on the waitlist
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

