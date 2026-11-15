import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Research', href: '#research' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="navbar">

      <a
        href="#home"
        className="nav-logo"
      >
        DB<span>.</span>
      </a>


      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>

        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}

      </nav>


      <div className="nav-right">

        <a
          href="#resume"
          className="nav-resume"
        >
          Resume
          <ArrowUpRight size={14} />
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>

    </header>
  );
}

export default Navbar;