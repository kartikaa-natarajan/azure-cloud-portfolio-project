import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Link2, GitBranch, Download, Phone, MessageCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { fadeUp, stagger, inView, wrap } from '../lib/shared'
import { SplitText, ScrambleText } from './bits/text'
import { Aurora, Particles } from './bits/fx'
import { Magnet } from './bits/interactive'

type Status = { kind: 'idle' } | { kind: 'ok' | 'err'; msg: string }

function ContactForm() {
  const [st, setSt] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') ?? '').trim(), email = String(f.get('email') ?? '').trim(), message = String(f.get('message') ?? '').trim()
    const er: Record<string, string> = {}
    if (name.length < 2) er.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = 'Please enter a valid email.'
    if (message.length < 10) er.message = 'Message should be at least 10 characters.'
    setErrors(er)
    if (Object.keys(er).length) return
    if (!profile.formEndpoint) {
      setSt({ kind: 'err', msg: 'Not sent: the form backend is not configured yet. Set formEndpoint in src/data/profile.ts (e.g. a Formspree URL), or email me directly.' })
      return
    }
    try {
      const r = await fetch(profile.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name, email, message }) })
      if (!r.ok) throw new Error()
      setSt({ kind: 'ok', msg: 'Message sent. Thank you!' }); form.reset()
    } catch { setSt({ kind: 'err', msg: 'Something went wrong sending your message. Please email me directly.' }) }
  }
  const field = 'mt-2 block w-full rounded-md border border-line bg-bg2 px-4 py-3.5 text-base text-white transition placeholder:text-ink3 focus:border-cyan/60 focus:bg-[#14101f]'
  return (
    <form onSubmit={submit} noValidate className="mx-auto mt-12 grid w-full max-w-2xl gap-5 text-left sm:grid-cols-2">
      {(["name", "email"] as const).map(k => (
        <label key={k} className="block"><span className="meta">{k}</span>
          <input name={k} placeholder={k === 'email' ? 'you@company.com' : 'Your name'} autoComplete={k} type={k === 'email' ? 'email' : 'text'} className={field} aria-invalid={!!errors[k]} aria-describedby={`${k}-e`} />
          <span id={`${k}-e`} className="text-xs text-red">{errors[k]}</span></label>
      ))}
      <label className="block sm:col-span-2"><span className="meta">message</span>
        <textarea name="message" placeholder="Tell me about the role or project…" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby="message-e" />
        <span id="message-e" className="text-xs text-red">{errors.message}</span></label>
      <button className="min-h-14 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest transition hover:border-white hover:bg-white hover:text-black sm:col-span-2">Send message</button>
      {st.kind !== 'idle' && <p role="status" className={`sm:col-span-2 text-sm ${st.kind === 'ok' ? 'text-green-400' : 'text-amber-300'}`}>{st.msg}</p>}
    </form>
  )
}

export default function ClosingScene() {
  const { email, phone, phoneLabel, whatsapp, linkedin, github, resume } = profile.contact
  const btn = 'flex min-h-12 items-center justify-center gap-2 rounded border border-white/25 px-4 py-2 text-xs uppercase tracking-widest transition hover:border-white hover:bg-white/10'
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-black px-4 py-28 text-center">
      <Aurora className="-z-10 opacity-70" colors={['#e50932', '#4c1d95', '#7f1d1d']} />
      <Particles className="-z-10" count={45} color="255,120,140" />
      <div aria-hidden className="grid-floor -z-10 opacity-60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,#24162F,transparent_60%)]" />
      <motion.div variants={stagger} {...inView} className={wrap}>
        <motion.p variants={fadeUp} className="meta"><ScrambleText text="The next chapter starts here" /></motion.p>
        <h2 className="display mt-3 text-[clamp(3rem,11vw,9rem)]" style={{ textShadow: '0 0 60px rgba(229,9,50,.35)' }}>
          <SplitText text="To be continued…" stagger={0.05} />
        </h2>
        <motion.p variants={fadeUp} className="title mt-4 text-3xl tracking-[.25em] text-ink2">{profile.name}</motion.p>
        <motion.p variants={fadeUp} className="mt-2 text-sm text-ink3">{profile.role} · {profile.availability}</motion.p>
        <motion.p variants={fadeUp} className="mt-3 flex flex-col items-center text-sm text-ink2 sm:flex-row sm:justify-center sm:gap-4">
          <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center px-2 hover:text-white">{email}</a>
          <a href={`tel:${phone}`} className="inline-flex min-h-11 items-center px-2 hover:text-white">{phoneLabel}</a>
        </motion.p>
        <motion.div variants={fadeUp} className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center">
          <Magnet className="col-span-2 max-sm:!block"><span className="beam glow block sm:inline-block"><a href={`mailto:${email}`} className="flex min-h-12 items-center justify-center gap-2 rounded-[3px] bg-red px-5 py-2 text-xs font-semibold uppercase tracking-widest"><Mail className="h-4 w-4" />Let's build</a></span></Magnet>
          <a href={`tel:${phone}`} className={btn}><Phone className="h-4 w-4" />Call</a>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={btn}><MessageCircle className="h-4 w-4" />WhatsApp</a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={btn}><Link2 className="h-4 w-4" />LinkedIn</a>
          {github && <a href={github} target="_blank" rel="noopener noreferrer" className={btn}><GitBranch className="h-4 w-4" />GitHub</a>}
          <a href={resume} download="Adrish-Chowdhury-Resume.pdf" className={btn}><Download className="h-4 w-4" />Resume</a>
        </motion.div>
        <motion.div variants={fadeUp}><ContactForm /></motion.div>
      </motion.div>
    </section>
  )
}
