import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// @ts-ignore - vanta has no types
import FOG from 'vanta/dist/vanta.fog.min'

export default function BackgroundVanta() {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const effectRef = useRef<any>(null)

  useEffect(() => {
    if (!vantaRef.current) return
    if (effectRef.current) return // prevent double init in StrictMode

    effectRef.current = FOG({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      // Light palette for white background
      highlightColor: 0x666464,
      midtoneColor: 0x0,
      lowlightColor: 0xffffff,
      baseColor: 0x0,
      zoom: 1.0,
      blurFactor: 0.6,
    })

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy?.()
        effectRef.current = null
      }
    }
  }, [])

  return <div ref={vantaRef} className="absolute inset-0 -z-10" aria-hidden="true" />
}
