"use client";
import menuItems from "@/data/menu.json";
import { useEffect, useState } from "react";

interface NavProps {
  onNavClick?: () => void;
  isMobile?: boolean;
}

export default function Nav({ onNavClick, isMobile = false }: NavProps) {
  const [activeSection, setActiveSection] = useState(
    menuItems[0].href.replace("#", "")
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = menuItems.length - 1; i >= 0; i--) {
        const item = menuItems[i];
        const sectionId = item.href.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const sectionId = id.replace("#", "");
    setActiveSection(sectionId);

    const targetElement = document.querySelector<HTMLElement>(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (onNavClick) {
      onNavClick();
    }
  };

  return (
    <>
      {menuItems.map((item, idx) => {
        const itemId = item.href.replace("#", "");
        const isActive = activeSection === itemId;

        if (isMobile) {
          return (
            <li className="mobile-menu-item" key={idx}>
              <a
                className={`mobile-menu-link d-flex align-items-center gap-3 p-3 rounded-3 ${
                  isActive ? "active" : ""
                }`}
                onClick={(e) => handleClick(e, item.href)}
                href={item.href}
              >
                <i className={`${item.icon} fs-4`} />
                <span className="fw-semibold fs-6">{item.caption}</span>
              </a>
            </li>
          );
        }

        return (
          <li className="menu__item" key={idx}>
            <a
              className={`menu__link btn ${isActive ? "active" : ""}`}
              onClick={(e) => handleClick(e, item.href)}
              href={item.href}
              title={item.caption}
            >
              <span className="menu__caption">{item.caption}</span>
              <i className={item.icon} />
            </a>
          </li>
        );
      })}
    </>
  );
}
