import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { journey, journeyImage, type Chapter } from '../data/journey'
import ContentRail from './ContentRail'
import { Poster } from '../lib/shared'

function Modal({ c, onClose }: { c: Chapter; onClose: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ref.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div role="dialog" aria-modal="true" aria-label={c.title} onClick={e => e.stopPropagation()}
        initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30 }} className="max-h-[90dvh] w-full max-w-xl overflow-y-auto overflow-x-hidden rounded bg-card ring-1 ring-line">
        <div className="relative aspect-video">
          <Poster src={journeyImage(c)} alt={c.title} title={c.title} accent={c.accent} className="h-full w-full object-[50%_38%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <button ref={ref} onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full bg-black/70 p-2"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-6">
          <p className="meta" style={{ color: c.accent }}>{c.ep} · {c.date}</p>
          <h3 className="title mb-3 text-5xl">{c.title}</h3>
          <p className="leading-relaxed text-ink2">{c.story}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function JourneySection() {
  const [sel, setSel] = useState<Chapter | null>(null)
  return (
    <section id="journey" className="bg-bg2 py-16">
      <ContentRail title="My Journey: episodes of the story">
        {journey.map((c, i) => (
          <motion.li key={c.id} className="w-[62vw] max-w-[240px] shrink-0 snap-start sm:w-[220px]" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.06, zIndex: 10 }}>
            <button onClick={() => setSel(c)} aria-label={`${c.title}, ${c.date}. Open story`} className="group relative block aspect-[2/3] w-full overflow-hidden rounded ring-1 ring-line hover:ring-white/60">
              <Poster src={journeyImage(c)} alt="" title={c.title} accent={c.accent} className="h-full w-full brightness-75 transition group-hover:brightness-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <p className="meta !text-[0.7rem]" style={{ color: c.accent }}>{c.ep} · {c.date}</p>
                <h4 className="title text-[1.65rem]">{c.title}</h4>
                <p className="text-xs text-ink2">{c.blurb}</p>
              </div>
            </button>
          </motion.li>
        ))}
      </ContentRail>
      <AnimatePresence>{sel && <Modal c={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  )
}
