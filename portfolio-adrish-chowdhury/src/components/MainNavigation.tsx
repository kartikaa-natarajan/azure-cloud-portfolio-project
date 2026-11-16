import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import { openPalette } from './CommandPalette'
import { profile } from '../data/profile'
import { personas } from '../data/profiles'
import { usePersona } from '../lib/shared'
import { useMotionPref, setMotionPref } from '../lib/device'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'My Journey' },
  { id: 'skills', label: 'My Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'story', label: 'About Me' },
  { id: 'contact', label: 'Contact' },
]

export default function MainNavigation({ onHome }: { onHome: boolean }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('home')
  const nav = useNavigate()
  const { persona, setPersona } = usePersona()
  const motionPref = useMotionPref()

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => {
    if (!onHome) return
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(l => { const el = document.getElementById(l.id); el && io.observe(el) })
    return () => io.disconnect()
  }, [onHome])

  const go = (id: string) => {
    setOpen(false)
    if (onHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else nav(`/#${id}`)
  }

  return (
    <header className={`safe-t safe-x fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid || open ? 'bg-bg/95 backdrop-blur-md' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4 sm:px-8 lg:px-14">
        <Link to="/" onClick={() => onHome && window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Home" className="display flex h-11 items-center text-3xl text-red">{profile.monogram}</Link>
        <ul className="hidden gap-5 md:flex">
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} aria-current={active === l.id && onHome ? 'true' : undefined}
                className={`py-3.5 font-mono text-[11px] uppercase tracking-[.14em] transition-colors duration-200 hover:text-white ${active === l.id && onHome ? 'font-medium text-white' : 'text-ink2'}`}>{l.label}</button>
            </li>
          ))}
        </ul>
        <button onClick={openPalette} aria-label="Search portfolio" className="ml-auto flex h-11 items-center gap-2 rounded px-2 text-ink2 transition hover:text-white"><Search className="h-4 w-4" /><kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] lg:block">Ctrl K</kbd></button>
        <div className="relative">
          <button onClick={() => setMenu(m => !m)} aria-expanded={menu} aria-haspopup="menu" aria-label="Profile menu" className="flex h-11 items-center gap-1">
            <span className="grid h-8 w-8 place-items-center rounded text-xs font-semibold" style={{ background: persona?.color ?? '#e50932' }}>{(persona?.name ?? 'AC').slice(0, 1)}</span>
            <ChevronDown className="h-4 w-4 text-ink2" />
          </button>
          {menu && (
            <ul role="menu" className="absolute right-0 top-11 w-44 rounded border border-line bg-bg2/95 p-1 text-sm shadow-xl">
              {personas.map(p => (
                <li key={p.id}><button role="menuitem" onClick={() => { setPersona(p); setMenu(false); nav('/') }}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-ink2 hover:bg-white/5 hover:text-white">
                  <span className="h-3 w-3 rounded-sm" style={{ background: p.color }} />{p.name}{persona?.id === p.id && ' ✓'}</button></li>
              ))}
              <li className="mt-1 border-t border-line pt-1"><button role="menuitem" onClick={() => setMotionPref(motionPref === 'full' ? 'auto' : 'full')} className="w-full rounded px-3 py-2 text-left text-ink2 hover:bg-white/5 hover:text-white">Animations: {motionPref === 'full' ? 'Full' : 'Auto'}</button></li>
              <li className="mt-1 border-t border-line pt-1"><button role="menuitem" onClick={() => { setPersona(null); setMenu(false); nav('/') }}
                className="w-full rounded px-3 py-2 text-left text-ink2 hover:bg-white/5 hover:text-white">Switch profile…</button></li>
            </ul>
          )}
        </div>
        <button className="grid h-11 w-11 place-items-center md:hidden" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-line px-4 pb-4 md:hidden">
          {links.map(l => <li key={l.id}><button onClick={() => go(l.id)} className="min-h-12 w-full py-3 text-left text-base text-ink2 active:text-white">{l.label}</button></li>)}
        </ul>
      )}
    </header>
  )
}
