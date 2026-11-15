import React from "react";
import { personalInfo } from "../data/portfolioData";
import { ArrowRight, Mail, FolderGit2, ShieldCheck, Terminal, Cpu, Cloud } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden"
    >
      {/* Subtle ambient background glow and grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[580px] h-96 sm:h-[580px] bg-purple-200/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 shadow-sm mb-8 text-xs font-mono text-purple-800">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
          </span>
          <span className="font-semibold">MCA Cloud Computing Student &bull; Software & Web Development</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-violet-600 to-purple-600">
            {personalInfo.name}
          </span>
        </h1>

        {/* Headline */}
        <p className="mt-4 text-lg sm:text-2xl font-semibold text-slate-700 tracking-normal max-w-2xl mx-auto">
          {personalInfo.headline}
        </p>

        {/* Professional Summary Intro */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {personalInfo.summary}
        </p>

        {/* Two CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 group"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-purple-800 bg-gradient-to-r from-[#eddffb] to-white hover:from-[#e7d5fb] hover:to-[#fcfaff] border border-purple-200 transition-all shadow-sm"
          >
            <Mail className="w-4 h-4 text-purple-600" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Quick Highlights Bar (70% Lavender, 30% White) */}
        <div className="mt-16 pt-8 border-t border-purple-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#eddffb] via-[#f4ecfd] to-white border border-purple-200/90 shadow-sm hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2 text-purple-700 mb-1.5">
              <div className="p-1 rounded-md bg-white border border-purple-200">
                <Cloud className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/70">Specialization</span>
            </div>
            <span className="text-sm font-bold text-slate-850">Cloud Computing</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#eddffb] via-[#f4ecfd] to-white border border-purple-200/90 shadow-sm hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2 text-purple-700 mb-1.5">
              <div className="p-1 rounded-md bg-white border border-purple-200">
                <Terminal className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/70">Development</span>
            </div>
            <span className="text-sm font-bold text-slate-850">Software & Web</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#eddffb] via-[#f4ecfd] to-white border border-purple-200/90 shadow-sm hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2 text-purple-700 mb-1.5">
              <div className="p-1 rounded-md bg-white border border-purple-200">
                <Cpu className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/70">Core Stack</span>
            </div>
            <span className="text-sm font-bold text-slate-850">C++, Java, React, Node</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#eddffb] via-[#f4ecfd] to-white border border-purple-200/90 shadow-sm hover:shadow-md hover:shadow-purple-500/10 hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2 text-purple-700 mb-1.5">
              <div className="p-1 rounded-md bg-white border border-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900/70">Cloud Platform</span>
            </div>
            <span className="text-sm font-bold text-slate-850">AWS Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
