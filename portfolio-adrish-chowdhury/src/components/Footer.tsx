import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black px-4 pt-6 text-center footer-pad">
      <p className="meta leading-relaxed">© {new Date().getFullYear()} {profile.name}</p>
      <p className="meta mt-1 leading-relaxed !text-[0.7rem]">Built with React, Tailwind &amp; Framer Motion</p>
    </footer>
  )
}
