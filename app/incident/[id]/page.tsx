import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getIncidents, getIncidentById } from '@/lib/mockData'
import { MiniMap } from '@/components/MiniMap'
import { CopyLink } from '@/components/CopyLink'

type Params = { params: { id: string } }

export function generateStaticParams() {
  return getIncidents().map((i) => ({ id: i.id }))
}

export default function IncidentPage({ params }: Params) {
  const incident = getIncidentById(params.id)
  if (!incident) return notFound()

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
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              All Incidents
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-light/60 hidden sm:block">
              {new Date(incident.timestamp).toLocaleString()}
            </div>
            <CopyLink />
          </div>
        </div>

        <header className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent p-8 mb-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
          />
          <div className="relative z-10 flex flex-wrap items-center gap-3 text-sm mb-4">
            <span className={`px-3 py-1.5 rounded-lg ring-1 ring-white/10 font-medium ${typeBadgeClasses(incident.type)}`}>
              {incident.type}
            </span>
            <span className={`px-3 py-1.5 rounded-lg ring-1 ring-white/10 font-medium ${severityBadgeClasses(incident.severity)}`}>
              Severity {incident.severity}
            </span>
            {incident.location && (
              <span className="px-3 py-1.5 rounded-lg bg-black/40 ring-1 ring-white/10 text-neutral-light/80 font-medium">
                📍 {incident.location.city}, {incident.location.country}
              </span>
            )}
            <span className="px-3 py-1.5 rounded-lg bg-black/30 ring-1 ring-white/10 text-neutral-light/70 font-medium">
              🕒 {new Date(incident.timestamp).toLocaleString()}
            </span>
          </div>
          <h1 className="relative z-10 text-4xl font-bold tracking-tight text-white mb-4">{incident.title}</h1>
          <p className="relative z-10 text-lg text-neutral-light/80 leading-7 max-w-4xl">{incident.description}</p>
        </header>

        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-2xl p-8 ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Narrative</h2>
              <div className="max-w-none text-neutral-light/90 space-y-6 leading-7 text-lg">
                <p>Background context and previous events in the region. Potential impact on infrastructure or services. Attribution hypotheses and open questions. This section is mocked to demonstrate long-form content styling.</p>
                <p>Authorities and responders are monitoring for secondary effects and service degradation. Readers should treat details as preliminary until verified by official sources.</p>
              </div>
            </section>
            <section className="rounded-2xl p-8 ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Key Facts</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                <div>
                  <dt className="text-neutral-light/60 font-medium mb-2">Type</dt>
                  <dd className="text-white font-semibold">{incident.type}</dd>
                </div>
                <div>
                  <dt className="text-neutral-light/60 font-medium mb-2">Severity</dt>
                  <dd className="text-white font-semibold">{incident.severity}</dd>
                </div>
                {incident.location && (
                  <div className="sm:col-span-2">
                    <dt className="text-neutral-light/60 font-medium mb-2">Location</dt>
                    <dd className="text-white font-semibold">
                      {incident.location.city}, {incident.location.country} ({incident.location.lat.toFixed(2)}, {incident.location.lon.toFixed(2)})
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
              <MiniMap incident={incident} />
            </div>
            <div className="rounded-2xl p-6 ring-1 ring-white/10 bg-black/20 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Entities</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-neutral-light/60 font-medium mb-1">Source</dt>
                  <dd className="text-white font-semibold">{incident.source ?? 'Unknown'}</dd>
                </div>
                <div>
                  <dt className="text-neutral-light/60 font-medium mb-1">Target</dt>
                  <dd className="text-white font-semibold">{incident.target ?? 'Unknown'}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </article>
      </div>
    </main>
  )
}

function typeBadgeClasses(type: string): string {
  switch (type) {
    case 'Cyberattack':
      return 'bg-threatBlue/20 text-threatBlue'
    case 'Earthquake':
      return 'bg-alertAmber/20 text-alertAmber'
    case 'Flood':
      return 'bg-secureTeal/20 text-secureTeal'
    case 'Outage':
      return 'bg-gold/20 text-gold'
    case 'Conflict':
      return 'bg-adversaryRed/20 text-adversaryRed'
    case 'Breach':
      return 'bg-white/10 text-neutral-light'
    case 'Outbreak':
      return 'bg-white/10 text-neutral-light'
    default:
      return 'bg-white/10 text-neutral-light'
  }
}

function severityBadgeClasses(level: 'Low' | 'Medium' | 'High' | 'Critical'): string {
  switch (level) {
    case 'Low':
      return 'bg-secureTeal/20 text-secureTeal'
    case 'Medium':
      return 'bg-gold/20 text-gold'
    case 'High':
      return 'bg-alertAmber/20 text-alertAmber'
    case 'Critical':
      return 'bg-adversaryRed/20 text-adversaryRed'
    default:
      return 'bg-white/10 text-neutral-light'
  }
}
