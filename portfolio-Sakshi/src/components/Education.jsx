import React from "react";
import { educationData } from "../data/portfolioData";
import { GraduationCap, Calendar, Building } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 relative scroll-mt-16 border-y border-purple-200/60">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Education
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Formal education in Cloud Computing and Computer Applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-purple-200 ml-4 sm:ml-32 space-y-12">
          {educationData.map((edu, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-purple-600 group-hover:bg-purple-600 group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(168,85,247,0.4)]" />

              {/* Year badge for desktop placement */}
              <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono text-purple-800 font-bold mb-2 sm:mb-0">
                <span className="inline-flex items-center gap-1.5 bg-white border border-purple-200 px-3 py-1 rounded-xl shadow-xs">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  {edu.period}
                </span>
              </div>

              {/* Card (70% Lavender & 30% White) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg hover:shadow-purple-500/15">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {edu.degree}
                  </h3>
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full border font-bold shadow-2xs ${
                      edu.status === "Current"
                        ? "bg-white border-purple-200 text-purple-800"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  >
                    {edu.status}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-xl bg-white/90 border border-purple-200 shadow-2xs">
                  <Building className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-slate-800">{edu.institution}</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
