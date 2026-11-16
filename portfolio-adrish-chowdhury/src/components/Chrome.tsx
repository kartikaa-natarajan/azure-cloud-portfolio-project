import { useEffect, useState } from 'react'
import { Download, Mail, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'

const dots = [['home', 'Home'], ['journey', 'Journey'], ['skills', 'Skills'], ['projects', 'Projects'], ['story', 'Story'], ['experience', 'Credits'], ['contact', 'Contact']]

/** Right-edge chapter dots (desktop only). Reuses the same sections as the nav. */
export function SectionDots() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    dots.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav aria-label="Page sections" className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {dots.map(([id, label]) => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} aria-label={label} aria-current={active === id ? 'true' : undefined} className="group relative flex h-4 w-4 items-center justify-center">
          <span className={`block rounded-full transition-all duration-300 ${active === id ? 'h-3 w-3 bg-cyan shadow-[0_0_10px_#22d3ee]' : 'h-1.5 w-1.5 bg-white/30 group-hover:bg-white'}`} />
          <span className="meta pointer-events-none absolute right-6 whitespace-nowrap rounded bg-black/80 px-2 py-1 !text-[0.7rem] opacity-0 transition group-hover:opacity-100">{label}</span>
        </button>
      ))}
    </nav>
  )
}

/** Phone-only action bar: Resume / WhatsApp / Email, shown after the hero. Solid background (no blur) for smooth scrolling. */
export function MobileDock() {
  const [scrolled, setScrolled] = useState(false)
  const [atContact, setAtContact] = useState(false)
  const show = scrolled && !atContact
  useEffect(() => {
    let raf = 0
    const f = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setScrolled(window.scrollY > window.innerHeight * 0.8)) }
    f(); window.addEventListener('scroll', f, { passive: true })
    const el = document.getElementById('contact')
    const io = el ? new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.15 }) : null
    if (el && io) io.observe(el)
    return () => { window.removeEventListener('scroll', f); cancelAnimationFrame(raf); io?.disconnect() }
  }, [])
  const c = profile.contact
  const b = 'flex min-h-12 flex-1 items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-widest'
  return (
    <div aria-label="Quick contact" className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0b0914] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex divide-x divide-white/10">
        <a href={c.resume} download="Adrish-Chowdhury-Resume.pdf" tabIndex={show ? 0 : -1} className={b}><Download className="h-4 w-4 text-cyan" />Resume</a>
        <a href={c.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1} className={b}><MessageCircle className="h-4 w-4 text-green-400" />WhatsApp</a>
        <a href={`mailto:${c.email}`} tabIndex={show ? 0 : -1} className={b}><Mail className="h-4 w-4 text-red" />Email</a>
      </div>
    </div>
  )
}
