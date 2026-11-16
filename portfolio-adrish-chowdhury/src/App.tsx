import { useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { PersonaProvider, usePersona } from './lib/shared'
import { useMotionPref } from './lib/device'
import IntroAnimation from './components/IntroAnimation'
import ProfileSelection from './components/ProfileSelection'
import CommandPalette from './components/CommandPalette'
import Home from './pages/Home'
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))

const seen = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return false } }

function Gate() {
  const { persona, setPersona } = usePersona()
  const [intro, setIntro] = useState(!seen())
  const done = () => { try { sessionStorage.setItem('intro', '1') } catch { /* ignore */ } setIntro(false) }
  return (
    <AnimatePresence mode="wait">
      {intro ? <IntroAnimation key="i" onDone={done} />
        : !persona ? <ProfileSelection key="p" onPick={p => { setPersona(p); window.scrollTo(0, 0) }} />
        : <Home key="h" />}
    </AnimatePresence>
  )
}

export default function App() {
  const loc = useLocation()
  const pref = useMotionPref()
  return (
    <MotionConfig reducedMotion={pref === 'full' ? 'never' : 'user'}>
      <PersonaProvider>
        <CommandPalette />
        <Routes location={loc}>
          <Route path="/" element={<Gate />} />
          <Route path="/project/:id" element={<Suspense fallback={<div className="min-h-screen bg-bg" />}><ProjectDetails /></Suspense>} />
          <Route path="*" element={<Gate />} />
        </Routes>
      </PersonaProvider>
    </MotionConfig>
  )
}
