import { motion } from 'framer-motion'
import { Download, Mail, MapPin, MessageCircle } from 'lucide-react'
import { entries } from '../data/experience'
import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { fadeUp, stagger, inView, wrap } from '../lib/shared'
import { CountUp } from './bits/text'

// "Recruiter at a glance": every number is derived from the data files, so it can never drift from the resume.
const stats = [
  { to: entries.filter(e => e.kind === 'Internship').length, label: 'Internships', note: 'AI, cloud, data, web' },
  { to: entries.filter(e => e.kind === 'Certification').length, label: 'Certifications', note: 'IBM, AWS, Microsoft' },
  { to: projects.length, label: 'AI projects', note: 'NLP, ML, enterprise' },
  { to: 8.3, decimals: 1, label: 'MCA GPA', note: 'Jain University' },
]

export default function SnapshotStrip() {
  return (
    <section aria-label="Recruiter snapshot" className="relative z-10 bg-bg pb-4 pt-10">
      <motion.div variants={stagger} {...inView} className={wrap}>
        <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="meta !text-cyan/80">// 30-second snapshot</p>
            <h2 className="title mt-1 text-4xl sm:text-5xl">{profile.role}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink2"><MapPin className="h-3.5 w-3.5" />Bengaluru · {profile.availability.split(' · ')[0]}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={profile.contact.resume} download="Adrish-Chowdhury-Resume.pdf" className="flex min-h-11 items-center gap-2 rounded bg-white px-4 text-xs font-semibold uppercase tracking-widest text-black transition active:scale-95"><Download className="h-4 w-4" />Resume</a>
            <a href={`mailto:${profile.contact.email}`} className="flex min-h-11 items-center gap-2 rounded border border-white/25 px-4 text-xs uppercase tracking-widest transition active:scale-95"><Mail className="h-4 w-4" />Email me</a>
            <a href={profile.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded border border-white/25 px-4 text-xs uppercase tracking-widest transition active:scale-95"><MessageCircle className="h-4 w-4" />WhatsApp</a>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(s => (
            <motion.div key={s.label} variants={fadeUp} className="hud rounded border border-line bg-card/50 p-4">
              <p className="display text-5xl text-white sm:text-6xl"><CountUp to={s.to} decimals={s.decimals} /></p>
              <p className="mt-1 text-sm font-medium">{s.label}</p>
              <p className="meta !text-[0.7rem]">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
