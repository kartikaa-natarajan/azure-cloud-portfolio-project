import React, { useState, useEffect } from "react";
import { Cloud, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm shadow-purple-500/5"
          : "bg-transparent border-b border-purple-100/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 text-slate-800 hover:text-purple-700 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 group-hover:border-purple-300 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all">
              <Cloud className="w-5 h-5 text-purple-600 transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
                Sakshi Raj
              </span>
              <span className="text-[11px] text-purple-600/80 tracking-wider font-mono uppercase font-semibold">
                MCA &bull; Cloud Computing
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/80 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-sm hover:shadow-purple-500/25"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2.5 rounded-lg text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6 text-purple-700" /> : <Menu className="w-6 h-6 text-purple-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-purple-100 px-4 pt-2 pb-6 space-y-2 shadow-lg shadow-purple-500/10 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all shadow-md shadow-purple-500/20"
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
