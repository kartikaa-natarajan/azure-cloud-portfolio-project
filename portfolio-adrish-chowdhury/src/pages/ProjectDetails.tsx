import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, GitBranch, ExternalLink } from 'lucide-react'
import { projects, projectImage } from '../data/projects'
import MainNavigation from '../components/MainNavigation'
import ContentRail from '../components/ContentRail'
import ProjectCard from '../components/ProjectCard'
import Footer from '../components/Footer'
import { Poster, wrap } from '../lib/shared'

const Block = ({ h, children }: { h: string; children: React.ReactNode }) => (
  <section className="border-t border-line py-6"><h2 className="meta mb-3 !text-ink">{h}</h2><div className="text-ink2">{children}</div></section>
)

export default function ProjectDetails() {
  const { id } = useParams()
  const nav = useNavigate()
  const p = projects.find(x => x.id === id)
  useEffect(() => { window.scrollTo(0, 0) }, [id])
  if (!p)
    return (<><MainNavigation onHome={false} /><main className="grid min-h-screen place-items-center text-center"><div><h1 className="display text-6xl">Not found</h1><Link to="/" className="mt-4 inline-block underline">Back home</Link></div></main></>)
  const next = projects[(projects.findIndex(x => x.id === p.id) + 1) % projects.length]
  const related = projects.filter(x => x.id !== p.id).slice(0, 4)
  return (
    <>
      <MainNavigation onHome={false} />
      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
          <Poster src={projectImage(p)} alt={`${p.title} cover`} title={p.title} accent={p.accent} className="h-full w-full opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-black/50" />
          <div className={`${wrap} absolute inset-x-0 bottom-0 pb-8`}>
            <p className="meta" style={{ color: p.accent }}>{p.category} · {p.date} · {p.status}</p>
            <h1 className="display text-6xl sm:text-8xl">{p.title}</h1>
          </div>
        </div>
        <div className={`${wrap} max-w-4xl py-6`}>
          <button onClick={() => (window.history.length > 1 ? nav(-1) : nav('/'))} className="mb-6 flex items-center gap-2 rounded bg-white/10 px-4 py-2 text-sm hover:bg-white/20"><ArrowLeft className="h-4 w-4" />Back</button>
          <p className="mb-6 text-xl leading-relaxed">{p.overview}</p>
          <div className="mb-4 flex flex-wrap gap-3">
            {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded border border-line px-4 py-2 text-sm hover:border-white"><GitBranch className="h-4 w-4" />Repository</a>}
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded border border-line px-4 py-2 text-sm hover:border-white"><ExternalLink className="h-4 w-4" />Live demo</a>}
            {!p.repo && !p.demo && <p className="meta">Repository and demo links: to be added in src/data/projects.ts</p>}
          </div>
          <Block h="Problem"><p>{p.problem}</p></Block>
          <Block h="Goals"><ul className="list-disc space-y-1 pl-5">{p.goals.map(g => <li key={g}>{g}</li>)}</ul></Block>
          <Block h="Technology stack"><ul className="flex flex-wrap gap-2">{p.stack.map(s => <li key={s} className="rounded-sm border border-line bg-bg2 px-2.5 py-1 text-xs text-ink">{s}</li>)}</ul></Block>
          <Block h="Key features"><ul className="list-disc space-y-1 pl-5">{p.features.map(g => <li key={g}>{g}</li>)}</ul></Block>
          <Block h="Implementation"><p>{p.implementation}</p></Block>
          <Block h="Results"><p>{p.results}</p></Block>
          <Block h="Lessons learned"><p>{p.lessons}</p></Block>
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 pb-6 sm:px-8 lg:px-14">
          <p className="meta mb-3 !text-cyan/80">// Up next</p>
          <Link to={`/project/${next.id}`} className="hud group relative block overflow-hidden rounded ring-1 ring-line">
            <Poster src={projectImage(next)} alt="" title={next.title} accent={next.accent} className="aspect-[21/9] w-full brightness-75 transition duration-500 group-hover:scale-105 group-hover:brightness-100" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            <span className="absolute inset-y-0 left-0 flex flex-col justify-center p-5"><span className="meta" style={{ color: next.accent }}>{next.category}</span><span className="display text-3xl sm:text-5xl">{next.title}</span><span className="meta mt-2 flex items-center gap-1 !text-white">Play next ›</span></span>
          </Link>
        </div>
        <ContentRail title="Related projects">{related.map(r => <ProjectCard key={r.id} p={r} />)}</ContentRail>
      </motion.main>
      <Footer />
    </>
  )
}
