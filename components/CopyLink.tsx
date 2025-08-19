"use client"
import { useState } from 'react'

export function CopyLink() {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-500/30 hover:border-emerald-500/50 backdrop-blur-sm shadow-lg hover:shadow-xl group"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {}
      }}
    >
      <span className="flex items-center gap-2">
        {copied ? (
          <>
            <span className="text-green-400 text-lg">✓</span>
            Copied!
          </>
        ) : (
          <>
            <span className="group-hover:scale-110 transition-transform duration-200">📋</span>
            Copy link
          </>
        )}
      </span>
    </button>
  )
}

