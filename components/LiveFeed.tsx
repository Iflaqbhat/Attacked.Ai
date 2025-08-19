"use client"
import Link from 'next/link'
import type { Incident } from '@/lib/mockData'
import { formatDistanceToNow } from 'date-fns'

type Props = { incidents: Incident[] }

export function LiveFeed({ incidents }: Props) {
  const sorted = [...incidents].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
  return (
    <div className="h-full flex flex-col">
      {/* Premium header */}
      <div className="px-6 py-5 sticky top-0 bg-black/60 backdrop-blur-xl z-10 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold text-white">Live Incident Feed</h2>
            </div>
            <p className="text-sm text-neutral-light/60">Real-time global threats</p>
          </div>
          <Link 
            href="/incidents" 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-medium transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              View all
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </Link>
        </div>
      </div>
      
      {/* Premium feed list */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-white/5">
          {sorted.map((i, index) => (
            <li key={i.id} className="group hover:bg-white/5 transition-all duration-300">
              <Link href={`/incident/${i.id}`} className="block px-6 py-5">
                <div className="flex items-start gap-4">
                  {/* Premium incident indicator */}
                  <div className="relative mt-1">
                    <span 
                      className="inline-block h-3 w-3 rounded-full ring-2 ring-white/20 animate-pulse" 
                      style={{ backgroundColor: typeToColor(i.type) }} 
                    />
                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-white/20 animate-ping" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    {/* Premium title */}
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 line-clamp-2 leading-tight mb-3">
                      {i.title}
                    </h3>
                    
                    {/* Premium metadata */}
                    <div className="flex items-center gap-3 text-xs text-neutral-light/60 mb-3">
                      <span className="px-2 py-1 rounded-full bg-white/10 font-medium uppercase tracking-wide border border-white/10">
                        {i.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full font-medium border ${
                        i.severity === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        i.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {i.severity}
                      </span>
                    </div>
                    
                    {/* Premium location and time */}
                    <div className="flex items-center justify-between text-xs text-neutral-light/50">
                      <span className="flex items-center gap-1">
                        📍 {i.location?.city || 'Unknown location'}
                      </span>
                      <span className="flex items-center gap-1">
                        🕒 {formatDistanceToNow(new Date(i.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium arrow indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-400 group-hover:translate-x-1">
                    →
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Premium empty state */}
        {sorted.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl mb-4">🛰️</div>
            <p className="text-neutral-light/60">No incidents reported</p>
            <p className="text-xs text-neutral-light/40 mt-1">Monitoring global threats...</p>
          </div>
        )}
      </div>
    </div>
  )
}

function typeToColor(type: Incident['type']): string {
  switch (type) {
    case 'Cyberattack':
      return '#2C84D8'
    case 'Earthquake':
      return '#FC6000'
    case 'Flood':
      return '#00BFA6'
    case 'Outage':
      return '#FD5D00'
    case 'Conflict':
      return '#E63946'
    case 'Breach':
      return '#9b87f5'
    case 'Outbreak':
      return '#eab308'
    default:
      return '#ffffff'
  }
}
