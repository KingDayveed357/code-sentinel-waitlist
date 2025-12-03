"use client"

import { useState } from "react"
import { X, Check, AlertCircle, Lock, Github, Loader2, Twitter, Linkedin, Mail, Copy, Share2 } from "lucide-react"

type DemoStep = "signin" | "import" | "scan" | "suggestions" | "dashboard" | "cta"

interface Vulnerability {
  critical: number
  warning: number
  info: number
}

export default function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState<DemoStep>("signin")
  const [importedRepos, setImportedRepos] = useState<string[]>([])
  const [scannedRepos, setScannedRepos] = useState<string[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const exampleRepos = [
    { name: "react-app", type: "Frontend" },
    { name: "node-backend", type: "Backend" },
    { name: "internal-api", type: "API" },
  ]

  const vulnerabilities: Record<string, Vulnerability> = {
    "react-app": { critical: 0, warning: 2, info: 1 },
    "node-backend": { critical: 0, warning: 1, info: 2 },
    "internal-api": { critical: 1, warning: 0, info: 0 },
  }

  const handleImportRepo = (repoName: string) => {
    if (!importedRepos.includes(repoName)) {
      setIsScanning(true)
      setTimeout(() => {
        setImportedRepos([...importedRepos, repoName])
        setScannedRepos([...scannedRepos, repoName])
        setIsScanning(false)
      }, 2000)
    }
  }

  const handleNextStep = () => {
    const steps: DemoStep[] = ["signin", "import", "scan", "suggestions", "dashboard", "cta"]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const getDemoUrl = () => {
    if (typeof window === 'undefined') return ''
    return window.location.origin + "?demo=true"
  }

  const handleShare = (platform: "twitter" | "linkedin" | "email" | "copy") => {
    const url = getDemoUrl()
    const text = "Check out CodeSentinel's interactive demo - automated security scanning for developers!"

    if (platform === "copy") {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return
    }

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent("CodeSentinel Demo")}&body=${encodeURIComponent(
        `${text}\n\n${url}`
      )}`,
    }

    if (typeof window !== 'undefined') {
      window.open(urls[platform], "_blank", "width=600,height=400")
    }
    setShowShareMenu(false)
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "CodeSentinel Demo",
          text: "Check out this interactive demo!",
          url: getDemoUrl(),
        })
        setShowShareMenu(false)
      } catch (err) {
        console.error("Error sharing:", err)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in border border-accent/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-accent/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        <div className="flex gap-1 bg-background/50 p-4 border-b border-accent/10">
          {["signin", "import", "scan", "suggestions", "dashboard", "cta"].map((step, idx) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                ["signin", "import", "scan", "suggestions", "dashboard", "cta"].indexOf(currentStep) >= idx
                  ? "bg-accent"
                  : "bg-accent/20"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Step 1: GitHub Sign-in */}
          {currentStep === "signin" && (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Github className="w-8 h-8 text-accent" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Connect Your GitHub</h2>
                <p className="text-muted-foreground">Sign in with your GitHub account to get started</p>
              </div>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Sign in with GitHub
              </button>
            </div>
          )}

          {/* Step 2: Import Repos */}
          {currentStep === "import" && (
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Import Repositories</h2>
                <p className="text-muted-foreground">Select repositories to scan for vulnerabilities</p>
              </div>
              <div className="space-y-3">
                {exampleRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="flex items-center justify-between p-4 border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center text-sm font-mono text-accent">
                        {repo.type[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{repo.name}</p>
                        <p className="text-xs text-muted-foreground">{repo.type}</p>
                      </div>
                    </div>
                    {importedRepos.includes(repo.name) ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <button
                        onClick={() => handleImportRepo(repo.name)}
                        disabled={isScanning}
                        className="px-4 py-2 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors text-sm font-semibold disabled:opacity-50"
                      >
                        {isScanning ? "Scanning..." : "Import"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleNextStep}
                disabled={importedRepos.length === 0}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Continue to Scan
              </button>
            </div>
          )}

          {/* Step 3: Scan Results */}
          {currentStep === "scan" && (
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Scan Results</h2>
                <p className="text-muted-foreground">Here's what CodeSentinel found</p>
              </div>
              <div className="space-y-3">
                {scannedRepos.map((repo) => {
                  const vuln = vulnerabilities[repo]
                  const hasCritical = vuln.critical > 0
                  return (
                    <div
                      key={repo}
                      className={`p-4 border rounded-lg transition-all hover:scale-105 cursor-pointer ${
                        hasCritical ? "border-red-500/50 bg-red-500/5" : "border-yellow-500/50 bg-yellow-500/5"
                      }`}
                      onClick={() => setCurrentStep("suggestions")}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold flex items-center gap-2">
                            {hasCritical ? (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <Lock className="w-5 h-5 text-yellow-500" />
                            )}
                            {repo}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {vuln.critical > 0 && `${vuln.critical} critical • `}
                            {vuln.warning > 0 && `${vuln.warning} warnings • `}
                            {vuln.info > 0 && `${vuln.info} info`}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            hasCritical ? "bg-red-500/20 text-red-600" : "bg-yellow-500/20 text-yellow-600"
                          }`}
                        >
                          {hasCritical ? "Critical" : "Minor"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button
                onClick={handleNextStep}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                View AI Suggestions
              </button>
            </div>
          )}

          {/* Step 4: AI Suggestions */}
          {currentStep === "suggestions" && (
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">AI-Powered Suggestions</h2>
                <p className="text-muted-foreground">Smart fixes for detected vulnerabilities</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-600">Critical: Exposed API Key</p>
                      <p className="text-sm text-muted-foreground mt-1">Found hardcoded API key in internal-api/.env</p>
                    </div>
                  </div>
                  <div className="bg-background/50 p-3 rounded font-mono text-xs border border-accent/10">
                    <span className="text-red-600">- API_KEY="sk_live_51234..."</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Suggestion:</p>
                  <p className="text-sm text-muted-foreground">
                    Move API keys to environment variables immediately. Rotate all exposed keys in your provider
                    dashboard.
                  </p>
                </div>

                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-600">Warning: Outdated Dependency</p>
                      <p className="text-sm text-muted-foreground mt-1">lodash@4.17.15 has known vulnerabilities</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Suggestion:</p>
                  <p className="text-sm text-muted-foreground">
                    Update lodash to version 4.17.23 or later to patch security issues.
                  </p>
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                See Full Dashboard
              </button>
            </div>
          )}

          {/* Step 5: Dashboard */}
          {currentStep === "dashboard" && (
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">CodeSentinel Dashboard</h2>
                <p className="text-muted-foreground">Complete overview and management</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5">
                  <p className="text-sm text-muted-foreground mb-1">Total Repos</p>
                  <p className="text-3xl font-bold">{importedRepos.length}</p>
                </div>
                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5">
                  <p className="text-sm text-muted-foreground mb-1">Issues Found</p>
                  <p className="text-3xl font-bold">
                    {importedRepos.reduce((acc, repo) => acc + (vulnerabilities[repo]?.critical || 0), 0)}
                  </p>
                </div>
                <div className="p-4 border border-accent/20 rounded-lg bg-accent/5">
                  <p className="text-sm text-muted-foreground mb-1">AI Fixes</p>
                  <p className="text-3xl font-bold">{importedRepos.length * 2}</p>
                </div>
              </div>
              <div className="border border-accent/20 rounded-lg p-4 bg-accent/5 h-40 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-accent" />
                  <p>Security Vulnerability Chart</p>
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Ready to Get Started?
              </button>
            </div>
          )}

          {/* Step 6: CTA */}
          {currentStep === "cta" && (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 space-y-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Excited to Get Started?</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Join the waitlist and be among the first to try CodeSentinel and automate your security scanning.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                <a
                  href="#waitlist"
                  onClick={onClose}
                  className="px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  Join the Waitlist
                </a>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full px-6 py-3 border border-accent/30 rounded-lg hover:bg-accent/5 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Demo with Team
                  </button>

                  {showShareMenu && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-card border border-accent/20 rounded-lg shadow-xl backdrop-blur-sm z-10">
                      <div className="space-y-2">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors text-sm"
                        >
                          <Twitter className="w-4 h-4 text-accent" />
                          <span>Share on Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors text-sm"
                        >
                          <Linkedin className="w-4 h-4 text-accent" />
                          <span>Share on LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare("email")}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors text-sm"
                        >
                          <Mail className="w-4 h-4 text-accent" />
                          <span>Share via Email</span>
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors text-sm"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" />
                              <span>Link Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-accent" />
                              <span>Copy Link</span>
                            </>
                          )}
                        </button>
                              {typeof navigator.share === "function" && (
        <button
          onClick={handleNativeShare}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent/10 rounded-lg transition-colors text-sm border-t border-accent/10 pt-2 mt-2"
        >
          <Share2 className="w-4 h-4 text-accent" />
          <span>More Options...</span>
        </button>
      )}

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}