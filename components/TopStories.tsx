"use client"
import Link from 'next/link'
import { useState } from 'react'
import type { Incident } from '@/lib/mockData'

type Props = { incidents: Incident[] }

export function TopStories({ incidents }: Props) {
  const sorted = [...incidents].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
  const [startIdx, setStartIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const features = sorted.slice(startIdx, startIdx + 4)

  const shift = (direction: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    
    const newStartIdx = startIdx + direction * 4
    if (newStartIdx >= 0 && newStartIdx < sorted.length) {
      setStartIdx(newStartIdx)
    } else if (newStartIdx < 0) {
      setStartIdx(sorted.length - 4)
    } else {
      setStartIdx(0)
    }
    
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-3">Top Stories</h2>
        <p className="text-lg text-neutral-light/60">Latest global incidents and threats</p>
      </div>
      
      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => shift(-1)}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-lg bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl grid place-items-center transition-all duration-200 border border-white/20"
        >
          ‹
        </button>

        {/* Cards Grid - Centered */}
        <div className="px-16 flex justify-center">
          <div
            className={`grid gap-6 transition-all duration-300 ${
              isAnimating ? 'opacity-50' : 'opacity-100'
            }`}
            style={{
              gridTemplateColumns: features.length === 3 ? 'repeat(3, 320px)' : 
                                 features.length === 2 ? 'repeat(2, 320px)' : 
                                 features.length === 1 ? 'repeat(1, 320px)' : 
                                 'repeat(4, 1fr)',
              maxWidth: features.length < 4 ? `${features.length * 320 + (features.length - 1) * 24}px` : '100%'
            }}
          >
            {features.map((s, index) => (
              <Link 
                key={s.id} 
                href={`/incident/${s.id}`} 
                className="group block bg-black/60 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 w-full"
              >
                {/* Card Header */}
                <div className="aspect-video relative bg-black/80 overflow-hidden">
                  <div className="absolute inset-0 flex items-center gap-4 px-6">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/20">
                      {tagIcon(s.type)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white/90 uppercase tracking-wider">{s.type}</div>
                      <div className="h-2 w-32 bg-white/20 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-white/40 rounded-full animate-pulse" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Severity Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      s.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      s.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {s.severity}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white line-clamp-2 mb-4 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-neutral-light/70 line-clamp-3 leading-relaxed mb-4">
                    {s.description}
                  </p>
                  
                  {/* Metadata */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-neutral-light/50">
                      <span className="flex items-center gap-1">
                        📍 {s.location?.city || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1">
                        🕒 {new Date(s.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => shift(1)}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-lg bg-black/60 hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xl grid place-items-center transition-all duration-200 border border-white/20"
        >
          ›
        </button>
      </div>

      {/* Progress Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(sorted.length / 4) }, (_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isAnimating) {
                setStartIdx(i * 4)
              }
            }}
            className={`h-2 rounded-full transition-all duration-200 ${
              Math.floor(startIdx / 4) === i 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function tagIcon(type: string) {
  switch (type) {
    case 'Cyberattack': return '🛡️'
    case 'Earthquake': return '🌍'
    case 'Flood': return '🌊'
    case 'Outage': return '⚡'
    case 'Conflict': return '🔥'
    case 'Breach': return '🔓'
    case 'Outbreak': return '🧪'
    default: return '📰'
  }
}
