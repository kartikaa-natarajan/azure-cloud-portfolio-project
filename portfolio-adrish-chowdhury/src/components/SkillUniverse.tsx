import { motion } from 'framer-motion'
import { skillGroups, type SkillGroup } from '../data/skills'
import { fadeUp, stagger, inView, wrap, SectionTitle } from '../lib/shared'
import { SpotlightCard } from './bits/interactive'

function SkillCategory({ g }: { g: SkillGroup }) {
  return (
    <SpotlightCard variants={fadeUp} className="hud border-t border-line bg-card/50 p-5" color="rgba(45,156,219,.14)">
      <h3 className="meta mb-1 flex items-center gap-2 !text-ink"><span className={`h-2 w-2 ${g.learning ? 'bg-amber-400' : 'bg-red'}`} />{g.title}</h3>
      <p className="mb-4 text-sm text-ink2">{g.note}</p>
      <ul className="flex flex-wrap gap-2">
        {g.items.map(i => <li key={i} className="rounded-sm border border-line bg-bg2 px-2.5 py-1 font-mono text-[11px] tracking-wide text-ink transition duration-200 hover:-translate-y-0.5 hover:border-cyan/70">{i}</li>)}
      </ul>
    </SpotlightCard>
  )
}

export default function SkillUniverse() {
  return (
    <section id="skills" className="bg-gradient-to-b from-bg to-bg2 py-20">
      <div className={wrap}>
        <SectionTitle kicker="Technical Profile">My Skill Universe</SectionTitle>
        <motion.div variants={stagger} {...inView} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillGroups.map(g => <SkillCategory key={g.title} g={g} />)}
        </motion.div>
        <p className="meta mt-6">Sourced from my resume. Only tools I have actually used are listed.</p>
      </div>
    </section>
  )
}
