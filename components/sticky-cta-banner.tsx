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
    <div className="fixed bottom-6 left-4 right-4 z-40 max-w-md ml-auto mr-4 md:mr-6 animate-slide-in-right">
      <div className="bg-accent text-accent-foreground rounded-lg p-4 shadow-2xl flex items-center justify-between gap-4 border border-accent/50">
        <div className="flex-1">
          <p className="font-semibold text-sm">Ready to secure your code?</p>
          <p className="text-xs opacity-90">Join 2,847+ developers on the waitlist</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClickCTA}
            className="px-4 py-2 bg-accent-foreground text-accent rounded font-semibold text-sm 
            hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
          >
            Join Now
          </button>

          <button
            onClick={() => {
              setVisible(false)
              onClose()
            }}
            className="p-1 hover:bg-accent-foreground/20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
