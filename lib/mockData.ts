export type IncidentType = 'Cyberattack' | 'Earthquake' | 'Flood' | 'Outage' | 'Conflict' | 'Breach' | 'Outbreak'

export type Incident = {
  id: string
  title: string
  description: string
  type: IncidentType
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  timestamp: string
  location?: {
    lat: number
    lon: number
    city?: string
    country?: string
  }
  source?: string
  target?: string
}

const INCIDENTS: Incident[] = [
  {
    id: 'eq-istanbul',
    title: 'Shallow earthquake near Istanbul',
    description: 'A magnitude 5.6 earthquake struck near Istanbul with reports of light structural damage and temporary power outages.',
    type: 'Earthquake',
    severity: 'High',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    location: { lat: 41.0082, lon: 28.9784, city: 'Istanbul', country: 'Turkey' }
  },
  {
    id: 'cyb-finserv',
    title: 'DDoS on financial services provider',
    description: 'A large-scale DDoS attack targeted a European fintech API, causing intermittent latency spikes and degraded service.',
    type: 'Cyberattack',
    severity: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    location: { lat: 52.5200, lon: 13.4050, city: 'Berlin', country: 'Germany' },
    source: 'Unknown botnet',
    target: 'Fintech API'
  },
  {
    id: 'out-aws-eu',
    title: 'Cloud provider regional outage (eu-central-1)',
    description: 'A subset of instances in eu-central-1 experienced a power event. Some services remain degraded while recovery proceeds.',
    type: 'Outage',
    severity: 'High',
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    location: { lat: 50.1109, lon: 8.6821, city: 'Frankfurt', country: 'Germany' }
  },
  {
    id: 'conf-border',
    title: 'Cross-border artillery exchange',
    description: 'Renewed shelling reported across the disputed border zone, with civilian evacuations underway.',
    type: 'Conflict',
    severity: 'Critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    location: { lat: 49.9935, lon: 36.2304, city: 'Kharkiv', country: 'Ukraine' },
    source: 'Armed group',
    target: 'Border infrastructure'
  },
  {
    id: 'flood-mumbai',
    title: 'Monsoon flooding in Mumbai',
    description: 'Heavy rains led to flash floods disrupting transport and power distribution in several districts.',
    type: 'Flood',
    severity: 'High',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    location: { lat: 19.0760, lon: 72.8777, city: 'Mumbai', country: 'India' }
  },
  {
    id: 'breach-hospital',
    title: 'Hospital data breach disclosed',
    description: 'Personal records of approximately 80,000 patients were exposed following a spear-phishing incident.',
    type: 'Breach',
    severity: 'Medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    location: { lat: 34.0522, lon: -118.2437, city: 'Los Angeles', country: 'USA' },
    source: 'Credential theft',
    target: 'Hospital EMR'
  },
  {
    id: 'outbreak-seoul',
    title: 'Localized respiratory outbreak in Seoul',
    description: 'Authorities report a cluster of respiratory illness cases linked to a community event; monitoring is ongoing.',
    type: 'Outbreak',
    severity: 'Low',
    timestamp: new Date(Date.now() - 1000 * 60 * 260).toISOString(),
    location: { lat: 37.5665, lon: 126.9780, city: 'Seoul', country: 'South Korea' }
  }
]

export function getIncidents(): Incident[] {
  return INCIDENTS
}

export function getIncidentById(id: string): Incident | undefined {
  return INCIDENTS.find((i) => i.id === id)
}
