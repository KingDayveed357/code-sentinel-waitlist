"use client"

export default function AnimatedCode() {
  return (
    <div className="relative h-96 bg-card rounded-lg border border-border/50 overflow-hidden shadow-2xl animate-glow-pulse">
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-scan-line z-20" />

      {/* Terminal content */}
      <div className="p-6 font-mono text-sm h-full flex flex-col">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/30">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground ml-auto">codescan.log</span>
        </div>

        <div className="space-y-3 text-xs overflow-hidden">
          <div className="text-muted-foreground">
            $ <span className="text-accent">codescan</span> scan ./repo
          </div>
          <div className="text-muted-foreground">scanning repository...</div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-foreground">dependencies.json</span>
              <span className="text-green-500 text-xs">safe</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⚠</span>
              <span className="text-foreground">config.yaml</span>
              <span className="text-yellow-500 text-xs">policy warning</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">✕</span>
              <span className="text-foreground">secrets.env</span>
              <span className="text-red-500 text-xs">exposed</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border/30 text-muted-foreground">
            <div>scan completed in 847ms</div>
            <div className="text-accent">2 warnings • 1 critical issue</div>
          </div>
        </div>
      </div>

      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-50 pointer-events-none" />
    </div>
  )
}
