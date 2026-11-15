import { useEffect, useRef, useState, type ElementType } from 'react'
import { motion, animate, useInView, type Variants } from 'framer-motion'
import { useLite, motionReduced } from '../../lib/device'

// React Bits-style text effects, implemented with Framer Motion (no extra dependencies).
// On phones the blur filter is skipped (opacity + movement only) because animated filters are costly on mobile GPUs.
const ease = [0.22, 1, 0.36, 1] as const
const view = { once: true, amount: 'some' } as const

const wordV = (lite: boolean): Variants => ({
  hidden: { opacity: 0, y: 16, ...(lite ? {} : { filter: 'blur(12px)' }) },
  show: { opacity: 1, y: 0, ...(lite ? {} : { filter: 'blur(0px)' }), transition: { duration: 0.6, ease } },
})
const letterV = (lite: boolean): Variants => ({
  hidden: { opacity: 0, y: lite ? 22 : 40, ...(lite ? {} : { filter: 'blur(8px)' }) },
  show: { opacity: 1, y: 0, ...(lite ? {} : { filter: 'blur(0px)' }), transition: { duration: 0.6, ease } },
})
const container = (stagger: number, delay = 0): Variants => ({ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } })

/** Words blur into focus one by one. */
export function BlurText({ text, className = '', stagger = 0.08, as: Tag = 'span' }: { text: string; className?: string; stagger?: number; as?: ElementType }) {
  const lite = useLite()
  const v = wordV(lite)
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      <motion.span aria-hidden className="inline" variants={container(stagger)} initial="hidden" whileInView="show" viewport={view}>
        {words.map((w, i) => (
          <motion.span key={i} variants={v} className="inline-block whitespace-pre">{w}{i < words.length - 1 ? ' ' : ''}</motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** Letters rise in with a stagger. `onMount` plays immediately, otherwise on scroll into view. */
export function SplitText({ text, className = '', stagger = 0.035, delay = 0, onMount = false }: { text: string; className?: string; stagger?: number; delay?: number; onMount?: boolean }) {
  const lite = useLite()
  const v = letterV(lite)
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: view }
  return (
    <span className={className} aria-label={text}>
      <motion.span aria-hidden className="inline" variants={container(stagger, delay)} initial="hidden" {...trigger}>
        {text.split(' ').map((word, wi, arr) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((ch, ci) => <motion.span key={ci} variants={v} className="inline-block">{ch}</motion.span>)}
            {wi < arr.length - 1 ? ' ' : ''}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/** A light sweep passes across the text. */
export function ShinyText({ text, base = '#A6A1B2', className = '' }: { text: string; base?: string; className?: string }) {
  return <span className={`shiny ${className}`} style={{ ['--shiny-base' as string]: base }}>{text}</span>
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/'
/** "Decrypt" effect: random glyphs resolve left to right into the real text. */
export function ScrambleText({ text, className = '', duration = 900 }: { text: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 'some' })
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!inView || motionReduced()) return
    const start = performance.now()
    const id = setInterval(() => {
      const p = (performance.now() - start) / duration
      if (p >= 1) { setOut(text); clearInterval(id); return }
      setOut(text.split('').map((c, i) => (c === ' ' || i < p * text.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(''))
    }, 45)
    return () => clearInterval(id)
  }, [inView, text, duration])
  return <span ref={ref} className={className} aria-label={text}>{out}</span>
}

/** Counts up once when scrolled into view. */
export function CountUp({ to, decimals = 0, suffix = '', className = '' }: { to: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref} className={className}>{v.toFixed(decimals)}{suffix}</span>
}
