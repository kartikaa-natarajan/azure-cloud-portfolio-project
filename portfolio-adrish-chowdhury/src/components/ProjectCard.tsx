import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { projectImage, type Project } from '../data/projects'
import { Poster } from '../lib/shared'
import { TiltCard } from './bits/interactive'

export default function ProjectCard({ p, rank }: { p: Project; rank?: number }) {
  return (
    <motion.li className="relative w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[320px]"
      whileHover={{ scale: 1.06, zIndex: 10 }} whileFocus={{ scale: 1.06, zIndex: 10 }}
      transition={{ duration: 0.3 }} style={{ transformPerspective: 900 }}>
      <TiltCard>
        <Link to={`/project/${p.id}`} aria-label={`${p.title}: ${p.tagline} View details`}
          className="hud group block overflow-hidden rounded bg-card ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,.9),0_0_30px_-5px_var(--a)]"
          style={{ ['--a' as string]: p.accent + '88' }}>
          <div className="relative aspect-video overflow-hidden">
            <Poster src={projectImage(p)} alt={`${p.title} artwork`} title={p.title} accent={p.accent}
              className="h-full w-full brightness-90 transition duration-500 group-hover:scale-105 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            {rank !== undefined && <span aria-hidden className="rank display pointer-events-none absolute left-3 top-1 text-7xl leading-none sm:text-8xl">{rank}</span>}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="meta !text-[0.7rem]" style={{ color: p.accent }}>{p.category}</p>
              <h4 className="title text-[1.65rem]">{p.title}</h4>
            </div>
          </div>
          <div className="space-y-2 p-3">
            <p className="text-sm text-ink2">{p.tagline}</p>
            <div className="meta flex items-center justify-between !text-[0.7rem]">
              <span>{[p.year, p.status].filter(Boolean).join(' · ')}</span>
              <span className="flex items-center gap-1 text-white opacity-100 transition [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"><Play className="h-3 w-3 fill-white" />Explore</span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.li>
  )
}
