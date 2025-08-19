import Link from 'next/link'
import Image from 'next/image'
import { Globe } from '@/components/Globe'
import { LiveFeed } from '@/components/LiveFeed'
import { TopStories } from '@/components/TopStories'
import { getIncidents } from '@/lib/mockData'

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

export default function HomePage() {
  const incidents = getIncidents()

  return (
    <main className="min-h-dvh bg-gradient-to-br from-neutral-dark via-neutral-dark to-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-500/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-500/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Fixed header with enhanced styling */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 shadow-2xl">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group" aria-label="Attacked.AI Home">
            <Image
              src="https://attacked.ai/_next/image?url=%2Fimages%2Flogo_with_name_dark.png&w=384&q=75"
              alt="Attacked.AI"
              width={160}
              height={32}
              priority
              className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-lg"
            />
          </Link>
          
          {/* Enhanced navigation with premium styling */}
          <nav className="flex items-center gap-3">
            <Link 
              href="#latest" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl"
            >
              Latest
            </Link>
            <Link 
              href="#map" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl"
            >
              Map
            </Link>
            <Link 
              href="#stories" 
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-xl shadow-lg hover:shadow-xl"
            >
              Stories
            </Link>
          </nav>
        </div>
      </header>

      {/* Add top padding to account for fixed header */}
      <div className="pt-20">
        {/* Hero section with premium design */}
        <section id="map" className="border-b border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 text-sm font-bold mb-8 animate-pulse">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                🚨 LIVE THREAT MONITORING ACTIVE
              </div>
              <h1 className="text-7xl font-bold text-white mb-8">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Global Threat Intelligence
                </span>
              </h1>
              <p className="text-2xl text-neutral-light/70 max-w-4xl mx-auto leading-relaxed mb-10">
                Real-time monitoring of cyberattacks, natural disasters, and global incidents as they unfold worldwide.
              </p>
              
              {/* Enhanced stats with better styling */}
              <div className="flex items-center justify-center gap-12 text-base">
                <div className="flex items-center gap-3 text-neutral-light/70 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">{incidents.length} Active Incidents</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-light/70 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Real-time Updates</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-light/70 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Global Coverage</span>
                </div>
              </div>
            </div>
            
            {/* Enhanced map section with premium styling */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 rounded-3xl overflow-hidden ring-2 ring-white/20 bg-black/40 backdrop-blur-xl shadow-2xl border border-white/10">
                <Globe incidents={incidents} />
              </div>
              <aside className="rounded-3xl ring-2 ring-white/20 bg-black/40 backdrop-blur-xl max-h-[600px] overflow-y-auto shadow-2xl border border-white/10">
                <LiveFeed incidents={incidents} />
              </aside>
            </div>
          </div>
        </section>

        {/* Enhanced stories section with reduced spacing */}
        <section id="stories" className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <TopStories incidents={incidents} />
          </div>
        </section>

        {/* Latest section */}
        <section id="latest" className="py-16 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-3">Latest Incidents</h2>
              <p className="text-lg text-neutral-light/60">Most recent global threats and incidents</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {incidents.slice(0, 6).map((incident) => (
                <Link 
                  key={incident.id} 
                  href={`/incident/${incident.id}`} 
                  className="group block bg-black/60 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-lg border border-white/20">
                          {tagIcon(incident.type)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white/90 uppercase tracking-wide">
                            {incident.type}
                          </div>
                          <div className="text-xs text-neutral-light/60">
                            {new Date(incident.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        incident.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        incident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-xl text-white group-hover:text-white/80 transition-colors line-clamp-2 mb-3 leading-tight">
                      {incident.title}
                    </h3>
                    <p className="text-sm text-neutral-light/70 line-clamp-3 leading-relaxed mb-4">
                      {incident.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-neutral-light/50">
                      <span className="flex items-center gap-1">
                        📍 {incident.location?.city || 'Unknown location'}
                      </span>
                      <span className="flex items-center gap-1">
                        🕒 {new Date(incident.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/incidents" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
              >
                <span>View All Incidents</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium footer */}
        <footer className="py-20 text-center border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-center gap-8 mb-10">
              <Link href="/" className="text-sm text-neutral-light/60 hover:text-white transition-colors duration-300 font-medium">
                About
              </Link>
              <Link href="/" className="text-sm text-neutral-light/60 hover:text-white transition-colors duration-300 font-medium">
                Privacy
              </Link>
              <Link href="/" className="text-sm text-neutral-light/60 hover:text-white transition-colors duration-300 font-medium">
                Terms
              </Link>
            </div>
            <p className="text-sm text-neutral-light/40">
              © {new Date().getFullYear()} Attacked.AI – Advanced Threat Intelligence Platform
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
