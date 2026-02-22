"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface StickyCtaBannerProps {
  onClose: () => void
  onClickCTA: () => void
}

export default function StickyCtaBanner({ onClose, onClickCTA }: StickyCtaBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 max-w-lg ml-auto md:mr-6 animate-slide-in-right">
      <div className="relative bg-accent text-accent-foreground rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-accent/30 backdrop-blur-xl group">
        
        {/* Close button - Top right on mobile/tablet, aligned on desktop */}
        <button
          onClick={() => {
            setVisible(false)
            onClose()
          }}
          className="hidden top-0 right-3 sm:relative sm:top-3 sm:right-3 p-1.5 hover:bg-black/10 rounded-md transition-colors order-last sm:order-none"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 pr-8 sm:pr-0">
            <p className="font-bold text-base sm:text-sm tracking-tight leading-tight">Ready to ship secure?</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-foreground" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-mono">
                Status: Private Beta Waves
              </p>
            </div>
          </div>

          <button
            onClick={onClickCTA}
            className="w-full sm:w-auto px-6 py-3 bg-accent-foreground text-accent rounded-lg font-black text-xs uppercase tracking-tighter hover:opacity-90 active:scale-95 transition-all whitespace-nowrap shadow-lg shadow-black/20"
          >
            Secure Access
          </button>

           <button
          onClick={() => {
            setVisible(false)
            onClose()
          }}
          className="absolute top-0 right-3 sm:relative sm:top-0 sm:right-0 p-1.5 hover:bg-black/10 rounded-md transition-colors order-last sm:order-none"
        >
          <X className="w-4 h-4" />
        </button>
        </div>
      </div>
    </div>
  )
}
