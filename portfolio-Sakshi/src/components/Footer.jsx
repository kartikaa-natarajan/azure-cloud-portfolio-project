import React from "react";
import { Cloud, ArrowUp } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-purple-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm block">
              {personalInfo.name}
            </span>
            <span className="text-xs text-purple-700/80 font-mono font-medium">
              MCA Student &bull; Cloud Computing &bull; Web & Software Development
            </span>
          </div>
        </div>

        {/* Technical stack & note */}
        <div className="text-xs text-slate-500 text-center font-mono">
          <span>Strictly built from verified credentials &bull; React, Vite & Tailwind CSS</span>
        </div>

        {/* Back to top button */}
        <div>
          <button
            onClick={scrollToTop}
            title="Back to top"
            className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 hover:border-purple-300 transition-all shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-purple-100 text-center text-xs text-slate-400 font-mono">
        &copy; {new Date().getFullYear()} Sakshi Raj. All rights reserved.
      </div>
    </footer>
  );
}
