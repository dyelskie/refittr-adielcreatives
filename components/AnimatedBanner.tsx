'use client'

import {useRef, useState} from 'react'

export function AnimatedBanner({src, alt}: {src: string; alt: string}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [interacting, setInteracting] = useState(false)
  const [origin, setOrigin] = useState({x: 50, y: 50})

  const updateOriginFromPoint = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setOrigin({x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y))})
  }

  const stopInteracting = () => {
    setInteracting(false)
    setOrigin({x: 50, y: 50})
  }

  return (
    <div
      ref={containerRef}
      className="aspect-[4/3] bg-[var(--surface-2)] rounded-lg overflow-hidden mt-2 touch-none select-none cursor-zoom-in"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={stopInteracting}
      onMouseMove={(event) => updateOriginFromPoint(event.clientX, event.clientY)}
      onTouchStart={(event) => {
        setInteracting(true)
        const touch = event.touches[0]
        updateOriginFromPoint(touch.clientX, touch.clientY)
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0]
        updateOriginFromPoint(touch.clientX, touch.clientY)
      }}
      onTouchEnd={stopInteracting}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
          interacting ? '' : 'banner-animate'
        }`}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: interacting ? 'scale(1.6)' : undefined,
        }}
      />
    </div>
  )
}
