import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLite, motionReduced } from '../lib/device'

const lines: [string, string][] = [
  ['whoami', 'adrish-chowdhury'],
  ['role', 'Cloud & AI Engineer'],
  ['now', 'Software Developer @ gOGig'],
  ['studying', 'MCA, Storage & Cloud (Jain Univ.)'],
  ['stack', 'AWS · Python · React · watsonx.ai'],
  ['status', 'building things that ship'],
]

/** Types itself out when it scrolls into view. On phones / reduced motion it renders instantly (no timers, no re-renders). */
export default function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const lite = useLite()
  const instant = lite || motionReduced()
  const total = lines.reduce((n, [k, v]) => n + k.length + v.length + 4, 0)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen || instant) return
    const id = setInterval(() => setN(v => { if (v >= total) { clearInterval(id); return v } return v + 2 }), 28)
    return () => clearInterval(id)
  }, [seen, instant, total])

  let left = instant ? Infinity : n
  return (
    <div ref={ref} className="hud overflow-hidden rounded border border-cyan/30 bg-black/60 font-mono text-[12px] leading-relaxed sm:text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
        <span className="ml-2 text-[10px] uppercase tracking-widest text-ink3">adrish@portfolio ~ </span>
      </div>
      <div className="min-h-[11.5rem] space-y-1 p-4" aria-label="About summary">
        {lines.map(([k, v]) => {
          const full = k.length + v.length + 4, take = Math.max(0, Math.min(full, left)); left -= full
          const text = `${k}: ${v}`.slice(0, Math.max(0, take - 2))
          return take > 0 ? (
            <p key={k} className="text-ink2"><span className="text-cyan">❯</span> <span className="text-white">{text}</span></p>
          ) : <p key={k} aria-hidden className="opacity-0">.</p>
        })}
        <p className="text-cyan"><span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-cyan" /></p>
      </div>
    </div>
  )
}
