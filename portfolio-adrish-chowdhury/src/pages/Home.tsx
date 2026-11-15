import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { journey } from '../data/journey'
import { profile } from '../data/profile'
import { usePersona, wrap, SectionTitle, Poster } from '../lib/shared'
import type { SectionId } from '../data/profiles'
import MainNavigation from '../components/MainNavigation'
import HeroBanner from '../components/HeroBanner'
import ContentRail from '../components/ContentRail'
import ProjectCard from '../components/ProjectCard'
import FullStorySection from '../components/FullStorySection'
import SkillUniverse from '../components/SkillUniverse'
import ExperienceTimeline from '../components/ExperienceTimeline'
import JourneySection from '../components/JourneySection'
import ClosingScene from '../components/ClosingScene'
import Footer from '../components/Footer'
import { Marquee, ScrollProgress, CursorGlow } from '../components/bits/fx'
import SnapshotStrip from '../components/SnapshotStrip'
import { SectionDots, MobileDock } from '../components/Chrome'

const labels: Record<SectionId, { t: string; d: string; c: string; img: string; pos?: string }> = {
  story: { t: 'The Full Story', d: 'Who I am', c: '#9b51e0', img: profile.portrait, pos: '50% 20%' },
  skills: { t: 'My Skill Universe', d: 'What I build with', c: '#2d9cdb', img: '/img/tiles/skills.svg' },
  projects: { t: 'Featured Projects', d: `${projects.length} titles`, c: '#e50932', img: '/img/tiles/projects.svg' },
  journey: { t: 'My Journey', d: `${journey.length} episodes`, c: '#f2a900', img: '/img/tiles/journey.svg' },
  experience: { t: 'The Credits', d: 'Education & experience', c: '#27ae60', img: '/img/tiles/experience.svg' },
}
const ticker = ['Cloud Engineering', 'Artificial Intelligence', 'AWS', 'Full-Stack AI', 'DevOps', 'Machine Learning', 'NLP', 'Automation']

function Projects() {
  return (
    <section id="projects" className="py-12">
      <div className={wrap}><SectionTitle kicker="Featured">Top 5 Projects</SectionTitle></div>
      <ContentRail title="All titles">{projects.map((p, i) => <ProjectCard key={p.id} p={p} rank={i + 1} />)}</ContentRail>
    </section>
  )
}

const sections: Record<SectionId, React.ReactNode> = {
  story: <FullStorySection />, skills: <SkillUniverse />, projects: <Projects />, journey: <JourneySection />, experience: <ExperienceTimeline />,
}

export default function Home() {
  const { persona } = usePersona()
  const order = persona?.order ?? ['story', 'skills', 'projects', 'journey', 'experience']
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 150)
    return () => clearTimeout(t)
  }, [hash])
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ScrollProgress />
      <CursorGlow />
      <SectionDots />
      <MobileDock />
      <MainNavigation onHome />
      <main>
        <HeroBanner />
        <div className="relative z-10 border-y border-line bg-bg2/70 py-3">
          <Marquee items={ticker} speed={40} itemClass="title text-2xl text-ink3" />
        </div>
        <SnapshotStrip />
        <div id="rails" className="relative z-10 bg-bg pt-6">
          <ContentRail title={persona ? `Continue exploring, ${persona.name} mode` : 'Continue exploring'}>
            {order.map((id, i) => (
              <motion.li key={id} className="shrink-0 snap-start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.4 }}>
                <button onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} aria-label={`Jump to ${labels[id].t}`}
                  className="hud group relative block aspect-video w-[70vw] max-w-[300px] overflow-hidden rounded text-left ring-1 ring-line transition duration-300 hover:z-10 hover:scale-105 hover:ring-white/60 sm:w-[280px]"
                  style={{ background: `linear-gradient(135deg, ${labels[id].c}aa, #12101c 75%)` }}>
                  <Poster src={labels[id].img} alt="" title={labels[id].t} accent={labels[id].c}
                    className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-110" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3"><span className="meta block !text-[0.7rem] !text-white/70">{labels[id].d}</span><span className="title text-[1.65rem]">{labels[id].t}</span></span>
                </button>
              </motion.li>
            ))}
          </ContentRail>
        </div>
        {order.map(id => <div key={id}>{sections[id]}</div>)}
        <ClosingScene />
      </main>
      <Footer />
    </motion.div>
  )
}
