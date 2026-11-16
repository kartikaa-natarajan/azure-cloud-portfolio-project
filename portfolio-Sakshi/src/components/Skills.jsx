import React from "react";
import { skillsData } from "../data/portfolioData";
import {
  Code,
  Layers,
  Database,
  GitBranch,
  Wrench,
  CheckCircle2,
} from "lucide-react";

export default function Skills() {
  const categoryIcons = {
    "Programming Languages": Code,
    Development: Layers,
    Database: Database,
    "Version Control": GitBranch,
    Tools: Wrench,
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Core technical proficiencies across programming languages, web engineering, databases, version control, and development tools.
          </p>
        </div>

        {/* Categories Grid (70% Lavender Cards with 30% White Inner Elements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills]) => {
            const Icon = categoryIcons[category] || Code;
            return (
              <div
                key={category}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 hover:border-purple-300 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-purple-500/15 group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-4 mb-5 border-b border-purple-200/80">
                    <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-850 group-hover:text-purple-700 transition-colors">
                      {category}
                    </h3>
                  </div>

                  {/* Skills Badges List (30% White Badges) */}
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-semibold text-slate-800 shadow-xs hover:border-purple-300 hover:text-purple-900 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 text-[11px] font-mono text-purple-900/70 flex items-center justify-between border-t border-purple-200/70">
                  <span>{skills.length} competencies</span>
                  <span className="text-purple-700 uppercase tracking-wider font-bold">{category.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
