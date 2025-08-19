"use client"
import { useEffect } from 'react'

export function WireStoriesArrows() {
  useEffect(() => {
    const track = document.getElementById('stories-track')
    const prev = document.getElementById('stories-prev')
    const next = document.getElementById('stories-next')
    if (!track || !prev || !next) return

    const cardWidth = () => {
      const firstCard = track.querySelector<HTMLElement>('a.group')
      const width = firstCard ? firstCard.getBoundingClientRect().width : 280
      return Math.ceil(width + 16) // width + gap
    }
    const onPrev = () => track.scrollBy({ left: -cardWidth(), behavior: 'smooth' })
    const onNext = () => track.scrollBy({ left: cardWidth(), behavior: 'smooth' })
    prev.addEventListener('click', onPrev)
    next.addEventListener('click', onNext)
    return () => {
      prev.removeEventListener('click', onPrev)
      next.removeEventListener('click', onNext)
    }
  }, [])
  return null
}

