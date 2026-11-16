import { useRef, useState, useEffect, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { wrap } from '../lib/shared'

// Horizontal rail: wheel/trackpad/touch scrolling natively, arrow buttons, vertical padding so hovered cards never clip.
export default function ContentRail({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const [can, setCan] = useState({ l: false, r: true })
  const update = () => {
    const el = ref.current; if (!el) return
    setCan({ l: el.scrollLeft > 8, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 })
  }
  useEffect(update, [])
  const move = (d: number) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <section id={id} aria-label={title} className="relative py-4">
      <div className={wrap}><h3 className="text-lg font-semibold sm:text-xl">{title}</h3></div>
      <div className="group/rail relative">
        {can.l && <button aria-label={`Scroll ${title} left`} onClick={() => move(-1)} className="absolute left-0 top-0 z-20 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-bg to-transparent md:flex"><ChevronLeft /></button>}
        <ul ref={ref} onScroll={update} className="noscroll rail flex snap-x scroll-px-4 sm:scroll-px-8 lg:scroll-px-14 gap-3 overflow-x-auto scroll-smooth px-4 py-8 sm:px-8 lg:px-14">
          {children}
        </ul>
        {can.r && <button aria-label={`Scroll ${title} right`} onClick={() => move(1)} className="absolute right-0 top-0 z-20 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-bg to-transparent md:flex"><ChevronRight /></button>}
      </div>
    </section>
  )
}
