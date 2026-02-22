"use client"

import { motion } from "framer-motion"
import { Shield, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function SentinelAlert() {
  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm overflow-hidden rounded-xl border border-border/50 bg-card ">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sentinel Alert #8241</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-red-500 uppercase">Critical</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2 relative overflow-hidden pb-4">
          {/* Scan Animation Line */}
           <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-scan-line z-20" />
          <div className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <h4 className="font-bold">Hardcoded Secret Detected</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A potential AWS Secret Access Key was found in <code className="text-accent">lib/aws-client.ts</code>. 
            Risk: Service breach and lateral movement.
          </p>
        </div>

        <div className="rounded-lg bg-muted/30 dark:bg-black/40 border border-border/50 p-4 overflow-x-auto">
          <div className="flex gap-4 mb-2 opacity-50 text-[10px] uppercase font-bold tracking-tighter">
            <span>Diff - lib/aws-client.ts</span>
          </div>
          <pre className="text-[12px] leading-6">
            <div className="flex gap-4 bg-red-500/10 -mx-4 px-4">
              <span className="text-red-500 opacity-50">-</span>
              <span className="text-red-300">const KEY = "AKIAIOSFODNN7EXAMPLE";</span>
            </div>
            <div className="flex gap-4 bg-green-500/10 -mx-4 px-4 border-l-2 border-green-500/50">
              <span className="text-green-500 opacity-50">+</span>
              <span className="text-green-300">const KEY = process.env.AWS_SECRET_KEY;</span>
            </div>
          </pre>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-lg bg-accent/5 border border-accent/20 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tight">AI-Engine Solution</span>
            </div>
            <span className="text-[10px] bg-accent/10 px-2 py-0.5 rounded text-accent font-bold uppercase">Safe to Merge</span>
          </div>
          <p className="text-xs text-foreground/80">
            "Automated fix: Secret moved to environment variables. Added to <code className="text-accent">.gitignore</code>."
          </p>
          <button className="w-full py-2 bg-accent text-accent-foreground rounded-md text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
            Apply Fix via Secure PR
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <div className="border-t border-border/30 bg-muted/20 px-4 py-2 flex justify-between items-center italic text-[10px] text-muted-foreground">
        <span>Scanned in 1.2s</span>
        <span>Zero-Noise Filter: Active</span>
      </div>
    </div>
  )
}
