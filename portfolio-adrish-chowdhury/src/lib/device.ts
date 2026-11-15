import { useEffect, useState } from 'react'

// "Lite" = touch phones/tablets and narrow screens. Heavy effects (blur filters, big animated glows,
// many particles) are swapped for cheap versions so iOS Safari and mid-range Android stay smooth.
const Q = '(hover: none), (pointer: coarse), (max-width: 767px)'
export const isLite = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(Q).matches

export function useLite() {
  const [lite, setLite] = useState(isLite)
  useEffect(() => {
    const m = window.matchMedia(Q)
    const f = () => setLite(m.matches)
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return lite
}

// ---- Motion preference ----
// Default follows the phone's "Reduce motion" setting. Visitors can force full animation from the profile menu.
import { useSyncExternalStore } from 'react'
const MKEY = 'portfolio.motion'
const subs = new Set<() => void>()
export type MotionPref = 'auto' | 'full'
export const getMotionPref = (): MotionPref => { try { return localStorage.getItem(MKEY) === 'full' ? 'full' : 'auto' } catch { return 'auto' } }
const apply = () => { if (typeof document !== 'undefined') document.documentElement.dataset.motion = getMotionPref() }
export const setMotionPref = (v: MotionPref) => {
  try { v === 'full' ? localStorage.setItem(MKEY, 'full') : localStorage.removeItem(MKEY) } catch { /* storage unavailable */ }
  apply(); subs.forEach(f => f())
}
export const motionReduced = () => getMotionPref() !== 'full' && typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const useMotionPref = () => useSyncExternalStore(cb => { subs.add(cb); return () => { subs.delete(cb) } }, getMotionPref, () => 'auto' as MotionPref)
apply()
