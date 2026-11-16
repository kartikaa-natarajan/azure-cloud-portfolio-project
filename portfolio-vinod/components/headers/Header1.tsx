"use client";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import ThemeSwitcherButton from "./ThemeSwitcherButton";

export default function Header1() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop width (>= 1200px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header id="header" className="header d-flex align-items-center">
        {/* Desktop Navigation (Visible on Large Screen >= 1200px) */}
        <div className="header__navigation d-none d-xl-block">
          <nav id="menu" className="menu">
            <ul className="menu__list d-flex justify-content-start align-items-center gap-1 m-0 p-0 list-unstyled">
              <Nav />
            </ul>
          </nav>
        </div>

        {/* Controls: Theme Switcher & Hamburger Toggle */}
        <div className="header__controls d-flex align-items-center gap-2 ms-auto">
          <ThemeSwitcherButton />

          {/* Hamburger toggle button (< 1200px) */}
          <button
            className="mobile-menu-toggle d-xl-none btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <i className={mobileMenuOpen ? "ph-bold ph-x" : "ph-bold ph-list"} />
          </button>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary-subtle">
              <span className="fw-bold fs-5 nav-drawer-title">Navigation</span>
              <button
                className="btn btn-close-menu p-2"
                onClick={() => setMobileMenuOpen(false)}
                type="button"
                aria-label="Close menu"
              >
                <i className="ph-bold ph-x fs-4" />
              </button>
            </div>

            <ul className="mobile-menu-list list-unstyled d-flex flex-column gap-2 mb-0 p-0">
              <Nav onNavClick={() => setMobileMenuOpen(false)} isMobile={true} />
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
