import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft, Download, Mail, MessageCircle, Link2, GitBranch, Layers, Folder, Wrench } from 'lucide-react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

type Item = { id: string; group: string; label: string; hint?: string; keys: string; icon: typeof Search; run: () => void }
export const openPalette = () => window.dispatchEvent(new Event('open-palette'))

/** Streaming-style search: Ctrl/Cmd+K (or "/") from anywhere. Jump to sections, projects, skills or contact actions. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const nav = useNavigate()
  const { pathname } = useLocation()
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const close = () => { setOpen(false); setQ(''); setSel(0) }
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      const typing = t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA'
      if ((e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) { e.preventDefault(); setOpen(o => !o) }
      else if (e.key === 'Escape') close()
    }
    const o = () => setOpen(true)
    window.addEventListener('keydown', k); window.addEventListener('open-palette', o)
    return () => { window.removeEventListener('keydown', k); window.removeEventListener('open-palette', o) }
  }, [])
  useEffect(() => {
    if (!open) return
    input.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => () => { close(); pathname === '/' ? document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) : nav(`/#${id}`) }
    const ext = (url: string) => () => { close(); window.open(url, '_blank', 'noopener,noreferrer') }
    const c = profile.contact
    const sections: [string, string, string][] = [['home', 'Home', 'hero top'], ['journey', 'My Journey', 'timeline episodes story'], ['skills', 'My Skill Universe', 'skills tech stack'], ['projects', 'Featured Projects', 'work portfolio'], ['story', 'The Full Story', 'about bio me'], ['experience', 'The Credits', 'experience education certifications internships'], ['contact', 'Contact', 'hire email phone']]
    return [
      ...sections.map(([id, label, keys]): Item => ({ id: 's-' + id, group: 'Sections', label, keys, icon: Layers, run: go(id) })),
      ...projects.map((p): Item => ({ id: 'p-' + p.id, group: 'Projects', label: p.title, hint: p.category, keys: `${p.tagline} ${p.stack.join(' ')} ${p.category}`, icon: Folder, run: () => { close(); nav(`/project/${p.id}`) } })),
      ...skillGroups.flatMap(g => g.items.map((s): Item => ({ id: `k-${g.title}-${s}`, group: 'Skills', label: s, hint: g.title, keys: g.title, icon: Wrench, run: go('skills') }))),
      { id: 'a-resume', group: 'Actions', label: 'Download resume', keys: 'cv pdf', icon: Download, run: () => { close(); const a = document.createElement('a'); a.href = c.resume; a.download = 'Adrish-Chowdhury-Resume.pdf'; a.click() } },
      { id: 'a-wa', group: 'Actions', label: 'Message on WhatsApp', keys: 'chat contact', icon: MessageCircle, run: ext(c.whatsapp) },
      { id: 'a-mail', group: 'Actions', label: 'Send an email', hint: c.email, keys: 'mail contact', icon: Mail, run: () => { close(); window.location.href = `mailto:${c.email}` } },
      { id: 'a-in', group: 'Actions', label: 'Open LinkedIn', keys: 'linkedin social', icon: Link2, run: ext(c.linkedin) },
      ...(c.github ? [{ id: 'a-gh', group: 'Actions', label: 'Open GitHub', keys: 'github code', icon: GitBranch, run: ext(c.github) } as Item] : []),
    ]
  }, [pathname, nav])

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return items.filter(i => i.group !== 'Skills').slice(0, 14)
    return items.filter(i => `${i.label} ${i.hint ?? ''} ${i.keys} ${i.group}`.toLowerCase().includes(t)).slice(0, 14)
  }, [items, q])
  useEffect(() => setSel(0), [q])
  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }) }, [sel])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(s + 1, shown.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(s => Math.max(s - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); shown[sel]?.run() }
  }

  let last = ''
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/80 px-3 pt-[12vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} onClick={close}>
          <motion.div role="dialog" aria-modal="true" aria-label="Search portfolio" onClick={e => e.stopPropagation()}
            initial={{ y: -12, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8 }} transition={{ duration: 0.18 }}
            className="w-full max-w-xl overflow-hidden rounded-lg border border-cyan/30 bg-[#0d0a18] shadow-[0_0_60px_-10px_rgba(34,211,238,.35)]">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-cyan" />
              <input ref={input} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey} placeholder="Search projects, skills, sections…" aria-label="Search"
                role="combobox" aria-expanded="true" aria-controls="palette-list" aria-activedescendant={shown[sel] ? `pal-${shown[sel].id}` : undefined}
                className="h-14 w-full bg-transparent font-mono text-white outline-none focus-visible:!outline-none placeholder:text-ink3" />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink3 sm:block">ESC</kbd>
            </div>
            <ul id="palette-list" ref={list} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {shown.length === 0 && <li className="px-3 py-8 text-center text-sm text-ink3">No results for “{q}”</li>}
              {shown.map((it, i) => {
                const head = it.group !== last; last = it.group
                const Icon = it.icon
                return (
                  <li key={it.id} role="presentation">
                    {head && <p className="meta px-3 pb-1 pt-3 !text-[0.7rem]">{it.group}</p>}
                    <button id={`pal-${it.id}`} role="option" aria-selected={i === sel} onMouseMove={() => setSel(i)} onClick={it.run}
                      className={`flex min-h-11 w-full items-center gap-3 rounded px-3 text-left text-sm ${i === sel ? 'bg-cyan/10 text-white' : 'text-ink2'}`}>
                      <Icon className={`h-4 w-4 shrink-0 ${i === sel ? 'text-cyan' : 'text-ink3'}`} />
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.hint && <span className="meta !text-[0.7rem] max-sm:hidden">{it.hint}</span>}
                      {i === sel && <CornerDownLeft className="h-3.5 w-3.5 text-cyan" />}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-ink3 max-sm:hidden">
              <span>↑↓ navigate · ↵ open</span><span>Ctrl/⌘ + K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
