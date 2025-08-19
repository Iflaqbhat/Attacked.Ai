import Link from 'next/link'
import Image from 'next/image'
import { getIncidents } from '@/lib/mockData'
import { formatDistanceToNow } from 'date-fns'

export default function IncidentsPage() {
  const incidents = getIncidents()
  const sorted = [...incidents].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp))
  
  return (
    <main className="min-h-dvh bg-neutral-dark">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group" aria-label="Attacked.AI Home">
            <Image
              src="https://attacked.ai/_next/image?url=%2Fimages%2Flogo_with_name_dark.png&w=384&q=75"
              alt="Attacked.AI"
              width={160}
              height={32}
              priority
              className="transition-transform group-hover:scale-105"
            />
          </Link>
          <nav className="flex items-center gap-2">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              Home
            </Link>
            <Link 
              href="/incidents" 
              className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium border border-white/20 backdrop-blur-sm"
            >
              All Incidents
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">All Incidents</h1>
          <p className="text-xl text-neutral-light/60 max-w-2xl mx-auto">
            Complete overview of all reported incidents, threats, and global events
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-light/40">
            <span>📊 {sorted.length} total incidents</span>
            <span>•</span>
            <span>🕒 Updated in real-time</span>
          </div>
        </div>

        {/* Incidents grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sorted.map((i) => (
            <Link 
              key={i.id} 
              href={`/incident/${i.id}`} 
              className="group block bg-black/30 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* Header with type and severity */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                      {tagIcon(i.type)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/90 uppercase tracking-wide">
                        {i.type}
                      </div>
                      <div className="text-xs text-neutral-light/60">
                        {formatDistanceToNow(new Date(i.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Severity badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    i.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    i.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    i.severity === 'Critical' ? 'bg-red-600/20 text-red-300 border border-red-600/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {i.severity}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-2 leading-tight text-lg">
                  {i.title}
                </h3>
              </div>
              
              {/* Description */}
              <div className="p-6">
                <p className="text-sm text-neutral-light/70 line-clamp-3 leading-relaxed mb-4">
                  {i.description}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-neutral-light/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      📍 {i.location?.city || 'Unknown location'}
                    </span>
                    {i.location?.country && (
                      <span className="flex items-center gap-1">
                        🌍 {i.location.country}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    🕒 {new Date(i.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                
                {/* Source/Target info if available */}
                {(i.source || i.target) && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-xs text-neutral-light/50">
                      {i.source && (
                        <span className="flex items-center gap-1">
                          🎯 Source: {i.source}
                        </span>
                      )}
                      {i.target && (
                        <span className="flex items-center gap-1">
                          🎯 Target: {i.target}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hover indicator */}
              <div className="px-6 py-3 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">View full details</span>
                  <span className="text-white/60 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🛰️</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Incidents Reported</h3>
            <p className="text-neutral-light/60 mb-6">Currently monitoring for global threats and incidents.</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Back to Home
            </Link>
          </div>
        )}

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

function tagIcon(tag: string): string {
  switch (tag) {
    case 'Cyberattack':
      return '🛡️'
    case 'Earthquake':
      return '🌎'
    case 'Outage':
      return '⚡'
    case 'Conflict':
      return '🔥'
    case 'Flood':
      return '🌊'
    case 'Breach':
      return '🔓'
    case 'Outbreak':
      return '🧪'
    default:
      return '🛰️'
  }
}

