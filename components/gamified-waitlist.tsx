"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Share2,
  Check,
  Copy,
  Trophy,
  Loader2,
  Mail,
  Linkedin,
  ShieldCheck,
  Zap,
} from "lucide-react";


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

export default function GamifiedWaitlist() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);



  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setReferredBy(refCode);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          referral_code: referredBy || undefined,
          honeypot: honeypot || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setReferralCode(data.user.referral_code);
      setReferralCount(data.user.referral_count);
      setPosition(data.user.position);
      setSubmitted(true);

      if (typeof window !== "undefined") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("ref");
        window.history.replaceState({}, "", newUrl);
      }
    } catch (err: any) {
      console.error("Error submitting:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getReferralLink = () => {
    if (typeof window === "undefined") return "";
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?ref=${referralCode}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: "x" | "linkedin" | "email") => {
    if (typeof window === "undefined") return;
    const link = getReferralLink();
    const text =
      "Securing my repos with CodeSentinel - Absolute CI Security for high-velocity teams.";

    const urls = {
      x: `https://x.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(link)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        link
      )}`,
      email: `mailto:?subject=${encodeURIComponent(
        "Join the Sentinel"
      )}&body=${encodeURIComponent(`${text}\n\n${link}`)}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const referralTiers = [
    { count: 1, reward: "Priority Beta Wave", unlocked: referralCount >= 1 },
    { count: 5, reward: "Founder's Lifetime 50%", unlocked: referralCount >= 5 },
    { count: 10, reward: "Sentinel Verified Badge", unlocked: referralCount >= 10 },
  ];

  return (
    <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-black/5 dark:bg-white/[0.02] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl p-6 md:p-16 border border-border/50 bg-card shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
           {/* Animated Sentinel Ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 rounded-2xl border border-accent/20" />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 85%, rgba(var(--accent-rgb, 120, 119, 198), 0.6) 90%, transparent 95%, transparent 100%)`,
                
              }}
            />
          </div>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-balance">
                Secure Your Slot.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
                We are admitting teams in private waves to ensure zero-noise delivery. Join the list to secure priority access.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                {/* Honeypot field - Visually hidden */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="full_name_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="founder@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={submitting}
                    className="flex-1 px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:opacity-50 text-lg font-medium"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-4 rounded-xl font-bold whitespace-nowrap transition-all active:scale-95 bg-accent text-accent-foreground hover:opacity-90 shadow-xl shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Join the Sentinel"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-sm font-bold text-red-500 animate-shake">{error}</p>
                )}
                <div className="flex items-center justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 pt-2 font-mono">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Secure PRs</div>
                  <div className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Zero Noise</div>
                </div>
              </form>
            ) : (
              <div className="space-y-10 animate-fade-up">
                <div className="p-6 md:p-10 rounded-2xl bg-accent/5 border border-accent/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldCheck className="w-24 h-24 text-accent" />
                  </div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="p-2 rounded-full bg-green-500/10 text-green-500">
                        <Check className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-foreground">
                        Initialization Complete.
                      </h3>
                    </div>
                    {position && (
                      <div className="space-y-1">
                        <p className="text-5xl font-extrabold text-accent tracking-tighter">
                          #{position.toLocaleString()}
                        </p>
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest font-mono">
                          Sentinel Queue Position
                        </p>
                      </div>
                    )}
                    <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                      An authentication link has been sent to your inbox. Verification is required to secure your slot.
                    </p>
                  </div>
                </div>

                <div className="pt-4 space-y-8">
                  <div className="space-y-6">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] font-mono flex items-center justify-center gap-3">
                       Referral Rewards
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {referralTiers.map((tier, idx) => (
                        <div
                          key={idx}
                          className={`p-6 rounded-2xl border transition-all duration-500 ${
                            tier.unlocked
                              ? "border-accent bg-accent/10 scale-105 shadow-lg shadow-accent/5"
                              : "border-border/50 bg-muted/50 opacity-40"
                          }`}
                        >
                          <div className="flex items-center justify-center mb-3">
                            <Trophy
                              className={`w-5 h-5 ${
                                tier.unlocked
                                  ? "text-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>
                          <p className={`text-xs font-extrabold text-center uppercase tracking-tight ${tier.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {tier.reward}
                          </p>
                          <p className="text-[10px] font-bold text-accent text-center mt-2 font-mono">
                            {tier.count} REF
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 max-w-md mx-auto">
                    <p className="text-sm font-bold text-foreground">
                      Invite other Founders:
                    </p>
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-background border border-border group focus-within:border-accent/50 transition-colors">
                      <input
                        type="text"
                        value={getReferralLink()}
                        readOnly
                        className="flex-1 px-3 py-2 bg-transparent text-xs font-mono text-foreground focus:outline-none"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="p-3 bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground rounded-lg transition-all"
                        title="Copy link"
                      >
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/50">
                    <button
                      onClick={() => handleShare("x")}
                      className="p-4 rounded-full border border-border hover:bg-accent/10 hover:border-accent/50 transition-all hover:scale-110 active:scale-95 group"
                    >
                      <XIcon className="w-5 h-5 group-hover:text-accent transition-colors" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-4 rounded-full border border-border hover:bg-accent/10 hover:border-accent/50 transition-all hover:scale-110 active:scale-95 group"
                    >
                      <Linkedin className="w-5 h-5 group-hover:text-accent transition-colors" />
                    </button>
                    <button
                      onClick={() => handleShare("email")}
                      className="p-4 rounded-full border border-border hover:bg-accent/10 hover:border-accent/50 transition-all hover:scale-110 active:scale-95 group"
                    >
                      <Mail className="w-5 h-5 group-hover:text-accent transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!submitted && (
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground font-mono">
                <span>Private Beta Waves • Limited Slots</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
