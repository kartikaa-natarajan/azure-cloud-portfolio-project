import React, { useState } from "react";
import { featuredProject } from "../data/portfolioData";
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Server,
  Layers,
  Info,
} from "lucide-react";
import { GithubIcon } from "./Icons";

export default function Projects() {
  const [modalInfo, setModalInfo] = useState(null);

  const handlePlaceholderClick = (e, type, url) => {
    e.preventDefault();
    setModalInfo({
      type,
      url,
      message: `The ${type} link is currently set to a template placeholder (${url}). You can easily update it with your actual live link in src/data/portfolioData.js.`,
    });
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 relative scroll-mt-16 border-y border-purple-200/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Featured Case Study</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Projects & Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Detailed case study showcasing full-stack application development, structured data handling, and backend transaction processing.
          </p>
        </div>

        {/* Featured Project Showcase Card (70% Lavender & 30% White) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 shadow-xl shadow-purple-500/10 overflow-hidden">
          {/* Card Header Bar */}
          <div className="px-6 py-4 bg-gradient-to-r from-[#e3d1fc] to-[#f0e6fe] border-b border-purple-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              <span className="ml-2 text-xs font-mono text-purple-950 font-bold">
                banking-system-app &bull; production release
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-purple-200 text-purple-800 text-xs font-mono font-bold shadow-xs">
              <Server className="w-3.5 h-3.5 text-purple-600" />
              <span>{featuredProject.badge}</span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Project Overview (70% Lavender section) */}
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                  {featuredProject.title}
                </h3>

                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Tech Stack Badges (30% White badges) */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-purple-900/80 mb-3 flex items-center gap-2 font-bold">
                    <Layers className="w-3.5 h-3.5 text-purple-600" />
                    <span>Technology Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-white text-purple-800 text-xs font-mono font-bold border border-purple-200 shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={(e) =>
                      handlePlaceholderClick(
                        e,
                        "GitHub Repository",
                        featuredProject.githubUrl
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-white hover:bg-purple-50 border border-purple-200 hover:border-purple-300 transition-all shadow-xs group"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-600" />
                    <span>View GitHub Repo</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 ml-1 font-bold">
                      Placeholder
                    </span>
                  </button>

                  <button
                    onClick={(e) =>
                      handlePlaceholderClick(
                        e,
                        "Live Demo",
                        featuredProject.liveDemoUrl
                      )
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-md shadow-purple-500/25 group"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Live Demo</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-800 text-purple-100 font-semibold ml-1">
                      Placeholder
                    </span>
                  </button>
                </div>

                {/* Developer Replacement Notice */}
                <p className="mt-4 text-xs text-purple-900/70 flex items-center gap-1.5 font-medium">
                  <Info className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>
                    URLs are configured with placeholders in accordance with your resume specifications.
                  </span>
                </p>
              </div>

              {/* Right Column: Implemented Features Checklist (30% White Inner Card) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white/95 border border-purple-200 shadow-sm">
                <h4 className="text-sm font-mono uppercase tracking-wider text-slate-900 font-extrabold mb-4 pb-2 border-b border-purple-100 flex items-center justify-between">
                  <span>Core Implemented Features</span>
                  <span className="text-xs text-purple-700 font-bold font-mono">11 Features</span>
                </h4>

                <ul className="space-y-2.5">
                  {featuredProject.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-750 leading-snug font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Placeholder Link Notification */}
      {modalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-b from-[#f3eaff] to-white border border-purple-200 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-lg font-bold text-slate-900">
                {modalInfo.type} Placeholder
              </h4>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              {modalInfo.message}
            </p>
            <div className="p-3 bg-white rounded-xl border border-purple-200 mb-6 font-mono text-xs text-purple-900 break-all font-semibold">
              <span className="text-slate-500">Config: </span>src/data/portfolioData.js &rarr; {modalInfo.url}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setModalInfo(null)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
