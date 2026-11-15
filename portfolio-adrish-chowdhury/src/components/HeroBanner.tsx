import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Play, Info, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { fadeUp, stagger, Poster, usePersona } from '../lib/shared'
import { useLite } from '../lib/device'
import { SplitText, ShinyText, ScrambleText } from './bits/text'
import { Aurora, Particles } from './bits/fx'
import { Magnet } from './bits/interactive'

export default function HeroBanner() {
  const lite = useLite()
  const { persona } = usePersona()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 50])
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section id="home" className="hero-h relative isolate flex items-end overflow-hidden bg-[#0d0a18] pb-16 pt-[52vh] md:items-center md:pb-0 md:pt-28">
      <Aurora className="-z-10" colors={['#6d28d9', '#e50932', '#1b3a8a']} />
      {/* Portrait: top of the screen on phones (fades downward), right half on desktop (fades leftward). */}
      <motion.div style={lite ? undefined : { y }} className="absolute right-0 top-0 -z-10 h-[56vh] w-full md:h-full md:w-[55%]">
        <Poster src={profile.portrait} alt={`Portrait of ${profile.name}`} title={profile.monogram} accent="#5b3a8c"
          className="h-full w-full object-top opacity-90 md:object-center md:[mask-image:linear-gradient(to_left,black_30%,transparent_95%)]" />
      </motion.div>
      <Particles className="-z-10" count={55} color="120,220,255" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/40 to-black/30 md:via-transparent md:to-black/40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-bg/80 via-bg/20 to-transparent max-md:hidden" />
      <div aria-hidden className="grid-floor -z-10" />
      <div aria-hidden className="scan -z-10 max-md:hidden" />

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-14">
        <motion.p variants={fadeUp} className="meta mb-4 flex items-center gap-2 !text-red"><span className="h-px w-8 bg-red" /><ScrambleText text={profile.eyebrow} /></motion.p>
        <h1 className="display max-w-[11ch] text-[clamp(3.5rem,11vw,10rem)] drop-shadow-2xl">
          <SplitText text={profile.name} onMount delay={0.35} stagger={0.04} />
        </h1>
        <motion.p variants={fadeUp} className="meta mt-5"><ShinyText text={profile.subtitle.join(' • ')} /></motion.p>
        <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-ink2 sm:text-lg">{profile.intro}</motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnet>
            <span className="beam glow">
              <button onClick={() => go('rails')} className="flex min-h-12 items-center gap-2 rounded-[3px] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-white/90">
                <Play className="h-4 w-4 fill-black" />Continue exploring</button>
            </span>
          </Magnet>
          <Magnet>
            {persona?.id === 'recruiter' ? (
              <a href={profile.contact.resume} download="Adrish-Chowdhury-Resume.pdf" className="flex min-h-12 items-center gap-2 rounded border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider transition hover:border-cyan/60 hover:bg-white/20"><Download className="h-4 w-4" />Download resume</a>
            ) : (
            <button onClick={() => go('projects')} className="flex min-h-12 items-center gap-2 rounded border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider backdrop-blur transition hover:border-cyan/60 hover:bg-white/20">
              <Info className="h-4 w-4" />View projects</button>
            )}
          </Magnet>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-6 flex items-center gap-2 text-xs text-ink2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />{profile.availability}</motion.p>
        {persona && <motion.p variants={fadeUp} className="meta mt-3 !text-cyan/80">// {persona.hero}</motion.p>}
        <motion.ul variants={fadeUp} className="meta mt-4 flex flex-wrap gap-x-6 gap-y-1 !text-cyan/80 max-sm:hidden">
          {profile.hud.map(h => <li key={h}>{h}</li>)}
        </motion.ul>
      </motion.div>
      <ChevronDown aria-hidden className="absolute bottom-6 left-1/2 h-6 w-6 animate-bounce text-ink3 motion-reduce:animate-none max-md:hidden" />
    </section>
  )
}
