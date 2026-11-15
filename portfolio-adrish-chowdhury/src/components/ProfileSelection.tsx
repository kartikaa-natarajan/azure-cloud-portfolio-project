import { motion } from 'framer-motion'
import { Briefcase, Code2, Palette, Compass } from 'lucide-react'
import { personas, type Persona } from '../data/profiles'
import { fadeUp, stagger } from '../lib/shared'

const icons = { briefcase: Briefcase, code: Code2, palette: Palette, compass: Compass }

function ProfileCard({ p, onPick }: { p: Persona; onPick: (p: Persona) => void }) {
  const Icon = icons[p.icon]
  return (
    <motion.li variants={fadeUp}>
      <button onClick={() => onPick(p)} aria-label={`Continue as ${p.name}. ${p.blurb}`}
        className="group flex w-32 flex-col items-center gap-3 sm:w-40 lg:w-48">
        <span className="grid aspect-square w-full place-items-center rounded-md border-2 border-transparent transition duration-300 group-hover:scale-105 group-hover:border-white/80 group-focus-visible:scale-105"
          style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`, boxShadow: '0 0 0 0 transparent' }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 40px ${p.color}88`)}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 transparent')}>
          <Icon className="h-1/2 w-1/2 text-white/90" strokeWidth={1.5} />
        </span>
        <span className="text-lg text-ink2 transition group-hover:text-white">{p.name}</span>
        <span className="meta hidden max-w-[11rem] !normal-case !tracking-normal opacity-0 transition group-hover:opacity-100 sm:block">{p.blurb}</span>
      </button>
    </motion.li>
  )
}

export default function ProfileSelection({ onPick }: { onPick: (p: Persona) => void }) {
  return (
    <motion.main className="grid min-h-screen place-items-center bg-[radial-gradient(ellipse_at_center,#16101f,#08070D_70%)] px-4 py-16"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4 }}>
      <div className="text-center">
        <h1 className="display mb-10 text-5xl sm:text-6xl md:text-7xl">Who's watching?</h1>
        <motion.ul variants={stagger} initial="hidden" animate="show" className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {personas.map(p => <ProfileCard key={p.id} p={p} onPick={onPick} />)}
        </motion.ul>
        <p className="meta mt-14">Each profile reorders the portfolio for you. Same story, different first chapter.</p>
      </div>
    </motion.main>
  )
}
