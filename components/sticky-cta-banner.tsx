"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

interface StickyCtaBannerProps {
  onClose: () => void
  onClickCTA: () => void
}

export default function StickyCtaBanner({ onClose, onClickCTA }: StickyCtaBannerProps) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 max-w-md ml-auto mr-4 md:mr-6 animate-slide-in-right">
      <div className="bg-accent text-accent-foreground rounded-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between gap-6 border border-accent/30 backdrop-blur-xl">
        <div className="flex-1 space-y-1">
          <p className="font-bold text-sm tracking-tight">Ready to ship secure?</p>
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

        <div className="flex items-center gap-3">
          <button
            onClick={onClickCTA}
            className="px-5 py-2.5 bg-accent-foreground text-accent rounded-lg font-black text-xs uppercase tracking-tighter hover:opacity-90 active:scale-95 transition-all whitespace-nowrap shadow-lg shadow-black/20"
          >
            Secure Access
          </button>

          <button
            onClick={() => {
              setVisible(false)
              onClose()
            }}
            className="p-1.5 hover:bg-black/10 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
