import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

const steps = ['BOOTING PORTFOLIO', 'LOADING CLOUD + AI MODULES', 'CONNECTING EXPERIENCE', 'READY']

/** Short boot sequence (about 2.2s). Skippable with the button, Esc or Enter. */
export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const ids = steps.map((_, i) => setTimeout(() => setStep(i), i * 520))
    const end = setTimeout(onDone, 2300)
    const k = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Enter') && onDone()
    window.addEventListener('keydown', k)
    return () => { ids.forEach(clearTimeout); clearTimeout(end); window.removeEventListener('keydown', k) }
  }, [onDone])
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black px-6" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,9,50,.18),transparent_60%)]" />
      <div className="relative w-full max-w-sm text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="display text-8xl text-red sm:text-9xl" style={{ textShadow: '0 0 40px rgba(229,9,50,.5)' }}>{profile.monogram}</motion.div>
        <motion.p initial={{ opacity: 0, letterSpacing: '0.1em' }} animate={{ opacity: 1, letterSpacing: '0.45em' }} transition={{ duration: 1.1, delay: 0.3 }}
          className="meta mt-3 !text-ink2">{profile.name}</motion.p>
        <div className="mx-auto mt-10 h-px w-full overflow-hidden bg-white/10" role="progressbar" aria-label="Loading">
          <motion.div className="h-full bg-gradient-to-r from-red to-cyan" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'easeInOut' }} />
        </div>
        <p className="meta mt-3 h-4 !text-cyan/80" aria-live="polite">{`> ${steps[step]}`}<span className="animate-pulse">_</span></p>
      </div>
      <button onClick={onDone} className="meta absolute bottom-[max(2rem,env(safe-area-inset-bottom))] right-6 min-h-11 rounded px-3 hover:text-ink">Skip ›</button>
    </motion.div>
  )
}
