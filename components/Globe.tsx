"use client"
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import type { Incident } from '@/lib/mockData'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? ''

type Props = { incidents: Incident[] }

export function Globe({ incidents }: Props) {
  const hasToken = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!hasToken) return
    if (!containerRef.current) return
    if (mapRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 1.2,
      projection: { name: 'globe' },
      antialias: true
    })
    mapRef.current = map

    // Enhanced interactivity
    map.dragRotate.enable()
    map.touchZoomRotate.enable()
    
    // Enhanced navigation controls
    const navControl = new mapboxgl.NavigationControl({ 
      visualizePitch: true,
      showCompass: true,
      showZoom: true
    })
    map.addControl(navControl, 'top-right')

    // Enhanced fog and atmosphere
    map.on('style.load', () => {
      map.setFog({
        'color': 'rgb(12, 12, 23)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      })
    })

    const geojson = {
      type: 'FeatureCollection',
      features: incidents
        .filter((i) => i.location)
        .map((i) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [i.location!.lon, i.location!.lat] },
          properties: { id: i.id, title: i.title, type: i.type, severity: i.severity }
        }))
    } as GeoJSON.FeatureCollection

    map.on('load', () => {
      setIsLoading(false)
      
      if (map.getSource('incidents')) return
      map.addSource('incidents', {
        type: 'geojson',
        data: geojson
      })

      // Enhanced heatmap layer
      map.addLayer({
        id: 'incidents-heat',
        type: 'heatmap',
        source: 'incidents',
        maxzoom: 5,
        paint: {
          'heatmap-weight': [
            'interpolate', ['linear'], ['get', 'severity'],
            'Low', 0.3,
            'Medium', 0.6,
            'High', 0.9,
            'Critical', 1.2
          ],
          'heatmap-intensity': 0.8,
          'heatmap-radius': 25,
          'heatmap-opacity': 0.3,
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(253, 93, 0, 0)',
            0.2, 'rgba(253, 93, 0, 0.2)',
            0.4, 'rgba(253, 93, 0, 0.4)',
            0.6, 'rgba(253, 93, 0, 0.6)',
            0.8, 'rgba(253, 93, 0, 0.8)',
            1, 'rgba(253, 93, 0, 1)'
          ]
        }
      })

      // Enhanced circle layer with pulsing effect
      map.addLayer({
        id: 'incidents-circle',
        type: 'circle',
        source: 'incidents',
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            0, 4,
            4, 8
          ],
          'circle-color': [
            'match', ['get', 'type'],
            'Cyberattack', '#2C84D8',
            'Earthquake', '#FC6000',
            'Flood', '#00BFA6',
            'Outage', '#FD5D00',
            'Conflict', '#E63946',
            'Breach', '#9b87f5',
            'Outbreak', '#eab308',
            '#ffffff'
          ],
          'circle-opacity': 0.9,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.8
        }
      })

      // Enhanced pulsing effect layer
      map.addLayer({
        id: 'incidents-pulse',
        type: 'circle',
        source: 'incidents',
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            0, 8,
            4, 16
          ],
          'circle-color': [
            'match', ['get', 'type'],
            'Cyberattack', '#2C84D8',
            'Earthquake', '#FC6000',
            'Flood', '#00BFA6',
            'Outage', '#FD5D00',
            'Conflict', '#E63946',
            'Breach', '#9b87f5',
            'Outbreak', '#eab308',
            '#ffffff'
          ],
          'circle-opacity': [
            'interpolate', ['linear'], ['zoom'],
            0, 0.3,
            4, 0.1
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.5
        }
      })

      // Enhanced click handling
      map.on('click', 'incidents-circle', (e) => {
        const feature = e.features?.[0]
        const id = feature?.properties?.id as string | undefined
        if (!id) return
        window.location.href = `/incident/${id}`
      })

      // Enhanced hover effects
      map.on('mouseenter', 'incidents-circle', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'incidents-circle', () => {
        map.getCanvas().style.cursor = ''
      })
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
  }, [incidents, hasToken])

  if (!hasToken) {
    return (
      <div className="h-full w-full min-h-[500px] grid place-items-center text-center p-6 bg-gradient-to-br from-black/40 to-black/20">
        <div className="max-w-md">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-bold text-white mb-2">Mapbox Token Required</h3>
          <p className="text-neutral-light/80 mb-4">Add your Mapbox token to enable the interactive globe visualization.</p>
          <div className="bg-black/40 p-4 rounded-lg border border-white/10 text-left">
            <p className="text-sm text-neutral-light/60 mb-2">Create a `.env.local` file with:</p>
            <code className="text-xs text-gold">NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here</code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full min-h-[500px]">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-white/80">Loading globe...</p>
          </div>
        </div>
      )}
      
      {/* Enhanced controls overlay */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <div className="text-xs text-neutral-light/60 mb-2">Controls</div>
          <div className="text-xs text-white/80 space-y-1">
            <div>🖱️ Drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>⌨️ Ctrl + drag to tilt</div>
          </div>
        </div>
      </div>
      
      {/* Incident count overlay */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
          <div className="text-sm text-white font-medium">
            {incidents.filter(i => i.location).length} active incidents
          </div>
        </div>
      </div>
      
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}
