export type TopStory = {
  id: string
  title: string
  dek: string
  tag: string
  imageUrl: string
  incidentId?: string
}

export const TOP_STORIES: TopStory[] = [
  {
    id: 'story-istanbul',
    title: 'Shallow earthquake near Istanbul',
    dek: 'A magnitude 5.6 quake struck near Istanbul with light structural damage reported.',
    tag: 'Earthquake',
    imageUrl: 'https://images.unsplash.com/photo-1461783436728-0a9217714694?q=80&w=1200&auto=format&fit=crop',
    incidentId: 'eq-istanbul'
  },
  {
    id: 'story-ddos',
    title: 'DDoS on financial services provider',
    dek: 'Large-scale DDoS caused intermittent latency spikes across API endpoints.',
    tag: 'Cyberattack',
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    incidentId: 'cyb-finserv'
  },
  {
    id: 'story-outage',
    title: 'Cloud provider regional outage (eu-central-1)',
    dek: 'Power event impacted a subset of instances; recovery continues.',
    tag: 'Outage',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    incidentId: 'out-aws-eu'
  },
  {
    id: 'story-border',
    title: 'Cross-border artillery exchange',
    dek: 'Renewed shelling as evacuations proceed in the disputed zone.',
    tag: 'Conflict',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    incidentId: 'conf-border'
  }
]

export function getTopStories(): TopStory[] {
  return TOP_STORIES
}
