"use client"
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import type { Incident } from '@/lib/mockData'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

type Props = { incident: Incident }

export function MiniMap({ incident }: Props) {
  const hasToken = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!hasToken) return
    if (!incident.location) return
    if (!ref.current) return
    const map = new mapboxgl.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [incident.location.lon, incident.location.lat],
      zoom: 3,
      projection: { name: 'globe' }
    })
    mapRef.current = map

    map.dragRotate.enable()
    map.touchZoomRotate.enable()
    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')

    map.on('load', () => {
      new mapboxgl.Marker({ color: '#FD5D00' })
        .setLngLat([incident.location!.lon, incident.location!.lat])
        .addTo(map)
    })

    function handleResize() {
      map.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      map.remove()
      mapRef.current = null
    }
  }, [incident, hasToken])

  if (!hasToken) {
    return (
      <div className="h-64 w-full grid place-items-center text-center p-4 text-xs text-neutral-light/70">
        Map unavailable: missing Mapbox token.
      </div>
    )
  }

  return <div ref={ref} className="h-64 w-full" />
}
