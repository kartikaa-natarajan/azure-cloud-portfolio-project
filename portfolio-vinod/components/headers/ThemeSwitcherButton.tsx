"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcherButton({
  parentClass = "color-switcher header__switcher btn",
}) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setShowSwitcher(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("color-scheme") as "light" | "dark";
      if (saved) {
        setColorScheme(saved);
        document.documentElement.setAttribute("color-scheme", saved);
      } else {
        document.documentElement.setAttribute("color-scheme", "dark");
      }
    }
  }, []);

  const handleColorSwitch = () => {
    const nextScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(nextScheme);
    document.documentElement.setAttribute("color-scheme", nextScheme);
    localStorage.setItem("color-scheme", nextScheme);
  };

  if (!showSwitcher) return null;

  return (
    <button
      id="color-switcher"
      className={parentClass}
      type="button"
      role="switch"
      aria-label="Toggle light/dark mode"
      aria-checked={colorScheme === "dark"}
      onClick={handleColorSwitch}
      title={`Switch to ${colorScheme === "dark" ? "light" : "dark"} mode`}
    >
      <i
        className={
          colorScheme === "dark"
            ? "ph-bold ph-sun"
            : "ph-bold ph-moon-stars"
        }
      />
    </button>
  );
}
