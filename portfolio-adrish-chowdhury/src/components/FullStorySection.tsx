import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { fadeUp, stagger, inView, wrap, SectionTitle, Poster } from '../lib/shared'
import TerminalCard from './TerminalCard'

export default function FullStorySection() {
  return (
    <section id="story" className="relative py-20">
      <div className={`${wrap} grid gap-10 lg:grid-cols-2 lg:items-center`}>
        <motion.div variants={stagger} {...inView}>
          <motion.div variants={fadeUp}><SectionTitle kicker="The Biography">The Full Story</SectionTitle></motion.div>
          {profile.bio.map(t => <motion.p key={t} variants={fadeUp} className="mb-4 max-w-xl leading-relaxed text-ink2">{t}</motion.p>)}
          <motion.blockquote variants={fadeUp} className="my-6 max-w-xl border-l-2 border-red pl-4 text-lg italic">“{profile.mission}”</motion.blockquote>
          <motion.div variants={fadeUp} className="grid max-w-xl gap-6 sm:grid-cols-2">
            <div><p className="meta mb-2">Interests</p><ul className="space-y-1 text-sm text-ink2">{profile.interests.map(i => <li key={i}>{i}</li>)}</ul></div>
            <div><p className="meta mb-2">Career goal</p><p className="text-sm text-ink2">{profile.goals}</p></div>
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp} {...inView} className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded ring-1 ring-line">
            <Poster src={profile.aboutImage} alt={`${profile.name} at work`} title={profile.monogram} accent="#5b3a8c" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-tr from-bg/80 via-purple/20 to-transparent" />
            <p className="title absolute bottom-4 left-4 text-4xl">Chapter one: now</p>
          </div>
          <TerminalCard />
        </motion.div>
      </div>
    </section>
  )
}
