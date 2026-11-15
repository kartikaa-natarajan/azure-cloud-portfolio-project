import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useLite, motionReduced } from '../../lib/device'

/** Floating particle field on a canvas. Pauses off-screen and when the tab is hidden; fewer on phones. */
export function Particles({ count = 60, color = '255,255,255', className = '' }: { count?: number; color?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const lite = useLite()
  useEffect(() => {
    const cv = ref.current; const ctx = cv?.getContext('2d')
    if (!cv || !ctx || motionReduced()) return
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2)
    let w = 0, h = 0, raf = 0, visible = true
    const resize = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize()
    const n = lite ? Math.min(18, count) : count
    const ps = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4, vx: (Math.random() - 0.5) * 0.15, vy: -(Math.random() * 0.25 + 0.05), a: Math.random() * 0.5 + 0.15 }))
    const tick = () => {
      if (visible && !document.hidden) {
        ctx.clearRect(0, 0, w, h)
        for (const p of ps) {
          p.x += p.vx; p.y += p.vy
          if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
          if (p.x < -5) p.x = w + 5
          if (p.x > w + 5) p.x = -5
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(${color},${p.a})`; ctx.fill()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(cv)
    const ro = new ResizeObserver(resize); ro.observe(cv)
    tick()
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect() }
  }, [count, color, lite])
  if (lite) return null
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}

/** Drifting colour glows. Desktop: blurred animated blobs. Phones: static gradients (no blur filter, no animation). */
export function Aurora({ colors = ['#e50932', '#5b2a9c', '#1b3a8a'], className = '' }: { colors?: string[]; className?: string }) {
  const lite = useLite()
  if (lite) {
    const at = [[15, 15], [85, 30], [50, 95]]
    return <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ background: colors.map((c, i) => `radial-gradient(60% 45% at ${at[i % 3][0]}% ${at[i % 3][1]}%, ${c}38, transparent 70%)`).join(',') }} />
  }
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {colors.map((c, i) => <span key={i} className="aurora-blob" style={{ background: c, animationDelay: `${i * -7}s`, left: `${i * 30 - 10}%`, top: `${(i % 2) * 30 - 10}%` }} />)}
    </div>
  )
}

/** Endless scrolling strip. Pauses on hover. */
export function Marquee({ items, className = '', speed = 30, itemClass = '' }: { items: string[]; className?: string; speed?: number; itemClass?: string }) {
  const list = [...items, ...items]
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={{ animationDuration: `${speed}s` }}>
        {list.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined} className={`flex items-center pr-8 ${itemClass}`}>
            {t}<span className="ml-8 h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Thin reading-progress bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-red to-cyan" />
}

/** Soft cyan light that follows the mouse (desktop only). */
export function CursorGlow() {
  const lite = useLite()
  const x = useMotionValue(-600), y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 140, damping: 22 }), sy = useSpring(y, { stiffness: 140, damping: 22 })
  useEffect(() => {
    if (lite) return
    const m = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('pointermove', m, { passive: true })
    return () => window.removeEventListener('pointermove', m)
  }, [lite, x, y])
  if (lite) return null
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-30 -ml-48 -mt-48 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,.09),transparent_65%)]" />
}
