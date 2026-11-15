import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { personas, type Persona } from '../data/profiles'
import { BlurText, ScrambleText } from '../components/bits/text'

export const ease = [0.22, 1, 0.36, 1] as const
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}
export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.1, margin: '0px 0px -5% 0px' } } as const

// ---- Persona (browsing mode) ----
interface Ctx { persona: Persona | null; setPersona: (p: Persona | null) => void }
const PersonaCtx = createContext<Ctx>({ persona: null, setPersona: () => {} })
export const usePersona = () => useContext(PersonaCtx)

const KEY = 'portfolio.persona'
function load(): Persona | null {
  try { return personas.find(p => p.id === localStorage.getItem(KEY)) ?? null } catch { return null }
}
export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, set] = useState<Persona | null>(load)
  const setPersona = (p: Persona | null) => {
    set(p)
    try { p ? localStorage.setItem(KEY, p.id) : localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
  }
  return <PersonaCtx.Provider value={{ persona, setPersona }}>{children}</PersonaCtx.Provider>
}

// ---- Image with graceful fallback ----
export function Poster({ src, alt, title, accent, className = '' }: { src?: string; alt: string; title: string; accent: string; className?: string }) {
  const [bad, setBad] = useState(!src)
  if (bad)
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center ${className}`}
        style={{ background: `radial-gradient(120% 120% at 20% 10%, ${accent}66, #12101c 60%)` }}
        data-title={title} />
    )
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} className={`object-cover ${className}`} />
}

export function SectionTitle({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      {kicker && <p className="meta mb-2 flex items-center gap-2 !text-cyan/80"><span className="h-px w-8 bg-cyan" /><ScrambleText text={kicker} /></p>}
      <h2 className="display text-4xl sm:text-5xl md:text-6xl">{typeof children === 'string' ? <BlurText text={children} /> : children}</h2>
    </div>
  )
}

export const wrap = 'mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14'
