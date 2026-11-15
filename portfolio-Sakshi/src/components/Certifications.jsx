import React from "react";
import { certificationsData } from "../data/portfolioData";
import { Award, CheckCircle, ShieldCheck, Cloud, BookOpen, FileCode } from "lucide-react";

export default function Certifications() {
  const getIcon = (title) => {
    if (title.includes("AWS")) return Cloud;
    if (title.includes("Coursera") || title.includes("Structure")) return BookOpen;
    return FileCode;
  };

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Certifications
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Verified qualifications in cloud developing, data structures, and core software programming.
          </p>
        </div>

        {/* Certifications Cards Grid (70% Lavender & 30% White) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert, idx) => {
            const Icon = getIcon(cert.title);
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#ece0fe] via-[#f5edff] to-white border border-purple-200 hover:border-purple-300 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-purple-500/15 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white border border-purple-200 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-full font-bold shadow-2xs">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-850 group-hover:text-purple-700 transition-colors leading-snug mb-2">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-mono text-purple-950/70 mb-4 font-medium">
                    Issuer: <span className="text-slate-900 font-bold">{cert.issuer}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-200/80 flex items-center justify-between text-xs text-purple-800 font-mono font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 shadow-2xs">{cert.category}</span>
                  <div className="p-1 rounded-md bg-white border border-purple-200 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
