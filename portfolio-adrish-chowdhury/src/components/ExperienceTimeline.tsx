import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { entries, highlights, orgs, type Entry, type Kind } from '../data/experience'
import { wrap, SectionTitle, Poster } from '../lib/shared'
import { SpotlightCard } from './bits/interactive'
import { CountUp } from './bits/text'
import { Marquee } from './bits/fx'

const tabs: { label: string; kind?: Kind }[] = [
  { label: 'All' }, { label: 'Experience', kind: 'Professional' }, { label: 'Internships', kind: 'Internship' },
  { label: 'Education', kind: 'Education' }, { label: 'Certifications', kind: 'Certification' },
]
const kindColor: Record<Kind, string> = { Professional: '#e50932', Internship: '#2d9cdb', Education: '#27ae60', Certification: '#f2a900' }
// Newest first. Array.sort is stable, so ties keep the order written in the data file.
const sorted = [...entries].sort((a, b) => b.sort - a.sort)
const stats = [
  { to: entries.filter(e => e.kind === 'Internship').length, suffix: '', label: 'Internships completed' },
  { to: entries.filter(e => e.kind === 'Certification').length, suffix: '', label: 'Certifications earned' },
  ...highlights,
]

function Item({ e, open, toggle }: { e: Entry; open: boolean; toggle: () => void }) {
  const expandable = !!(e.summary || e.points.length || e.tags.length)
  const c = kindColor[e.kind]
  const head = (
    <span className="block text-left">
      <span className="meta" style={{ color: c }}>{e.kind} · {e.period}</span>
      <span className="mt-1 block text-lg font-medium">{e.title}</span>
      <span className="block text-sm text-ink2">{e.org}</span>
    </span>
  )
  return (
    <SpotlightCard className="hud rounded border border-line bg-card/40 p-4 transition-colors hover:border-white/25" color={`${c}29`}>
      {expandable ? (
        <button onClick={toggle} aria-expanded={open} className="flex w-full items-start justify-between gap-4">
          {head}<ChevronDown className={`mt-2 h-5 w-5 shrink-0 text-ink3 transition ${open ? 'rotate-180' : ''}`} />
        </button>
      ) : head}
      {open && expandable && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden text-sm text-ink2">
          <div className="pt-3">
            {e.summary && <p>{e.summary}</p>}
            {e.points.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5">{e.points.map(p => <li key={p}>{p}</li>)}</ul>}
            {e.tags.length > 0 && <p className="meta mt-3">{e.tags.join(' · ')}</p>}
          </div>
        </motion.div>
      )}
    </SpotlightCard>
  )
}

function SidePanel() {
  const now = sorted[0]
  return (
    <aside className="order-first min-w-0 space-y-4 lg:sticky lg:top-20 lg:order-last lg:self-start">
      <div className="relative overflow-hidden rounded border border-line">
        <Poster src="/img/tiles/experience.svg" alt="" title="" accent="#27ae60" className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="relative p-6 pt-24">
          <p className="meta flex items-center gap-2 !text-green-400"><span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />Currently</p>
          <h3 className="title mt-2 text-5xl">{now.title}</h3>
          <p className="mt-1 text-sm text-ink2">{now.org}</p>
          <p className="meta mt-3">{now.period}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(s => (
          <SpotlightCard key={s.label} className="hud rounded border border-line bg-card/50 p-4" color="rgba(34,211,238,.14)">
            <p className="display text-5xl text-white"><CountUp to={s.to} suffix={s.suffix} /></p>
            <p className="mt-1 text-xs leading-snug text-ink2">{s.label}</p>
          </SpotlightCard>
        ))}
      </div>
      <div className="rounded border border-line bg-card/30 py-4">
        <p className="meta mb-3 px-4">Worked and learned with</p>
        <Marquee items={orgs} speed={28} itemClass="title text-2xl text-ink2" />
      </div>
    </aside>
  )
}

export default function ExperienceTimeline() {
  const [open, setOpen] = useState<string | null>('gogig')
  const [tab, setTab] = useState(0)
  const shown = sorted.filter(e => !tabs[tab].kind || e.kind === tabs[tab].kind)
  let lastYear = ''
  return (
    <section id="experience" className="py-20">
      <div className={wrap}>
        <SectionTitle kicker="Experience & Education">The Credits</SectionTitle>
        <p className="meta -mt-3 mb-6">Newest first</p>
        <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div>
            <div role="tablist" aria-label="Filter credits" className="mb-8 flex flex-wrap gap-2">
              {tabs.map((t, i) => (
                <button key={t.label} role="tab" aria-selected={tab === i} onClick={() => setTab(i)}
                  className={`flex min-h-11 items-center rounded-full border px-4 text-xs uppercase tracking-widest transition ${tab === i ? 'border-white bg-white text-black' : 'border-line text-ink2 hover:border-white/60 hover:text-white'}`}>{t.label}</button>
              ))}
            </div>
            <motion.ol key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative ml-2 border-l border-line">
              {shown.map(e => {
                const year = String(Math.floor(e.sort / 100))
                const head = year !== lastYear
                lastYear = year
                return (
                  <li key={e.id} className="relative pl-6">
                    {head && <p className="title pb-3 pt-4 text-3xl text-ink3">{year}</p>}
                    <span className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full" style={{ background: kindColor[e.kind], top: head ? '4.4rem' : '1.75rem' }} />
                    <motion.div className="pb-4" initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }}>
                      <Item e={e} open={open === e.id} toggle={() => setOpen(open === e.id ? null : e.id)} />
                    </motion.div>
                  </li>
                )
              })}
            </motion.ol>
          </div>
          <SidePanel />
        </div>
      </div>
    </section>
  )
}
