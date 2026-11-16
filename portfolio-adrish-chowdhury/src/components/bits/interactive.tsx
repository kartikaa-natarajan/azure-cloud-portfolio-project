import type { PointerEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion'

type Base = { children: ReactNode; className?: string }

/** Soft light follows the cursor across the card. */
export function SpotlightCard({ children, className = '', color = 'rgba(229,9,50,.16)', ...rest }: Base & { color?: string } & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>) {
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <motion.div {...rest} onPointerMove={move} className={`group/spot relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--x,50%) var(--y,50%), ${color}, transparent 70%)` }} />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

/** 3D tilt toward the cursor (mouse only, so touch scrolling is unaffected). */
export function TiltCard({ children, className = '', max = 7 }: Base & { max?: number }) {
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 220, damping: 22 }), sy = useSpring(ry, { stiffness: 220, damping: 22 })
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return <motion.div onPointerMove={move} onPointerLeave={leave} style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }} className={className}>{children}</motion.div>
}

/** Element drifts toward the cursor. */
export function Magnet({ children, strength = 0.25, className = '' }: Base & { strength?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return <motion.div onPointerMove={move} onPointerLeave={leave} style={{ x: sx, y: sy }} className={`inline-block ${className}`}>{children}</motion.div>
}
