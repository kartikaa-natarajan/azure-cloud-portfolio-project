import React from "react";
import { Cloud, Code, Database, Brain, Sparkles, Server } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: Cloud,
      title: "Cloud Computing Student",
      description:
        "Pursuing Master of Computer Applications (MCA) with a specialized academic focus on Cloud Computing architectures and distributed systems.",
    },
    {
      icon: Code,
      title: "Software & Web Development",
      description:
        "Passionate about building responsive, functional, and modern web applications utilizing robust frontend and backend technologies.",
    },
    {
      icon: Server,
      title: "Cloud-Based Projects Focus",
      description:
        "Strong interest in engineering resilient cloud-based solutions, deploying reliable workloads, and utilizing cloud infrastructure effectively.",
    },
    {
      icon: Database,
      title: "Programming, Web & AWS",
      description:
        "Strong academic and practical foundation across programming languages (C++, Java), web development, database systems, and AWS services.",
    },
    {
      icon: Brain,
      title: "Analytical & Problem Solving",
      description:
        "Dedicated to algorithmic problem solving, structured data handling, and writing clean, maintainable, and reliable code.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/60 relative scroll-mt-16 border-y border-purple-200/60">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#eddffb] to-white border border-purple-200 text-xs font-mono text-purple-800 mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Professional Summary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            About Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            I am an MCA student specializing in Cloud Computing, dedicated to crafting scalable web applications and exploring modern cloud infrastructure.
          </p>
        </div>

        {/* Narrative & Core Grid (70% Lavender, 30% White) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#eddffb] via-[#f5edff] to-white border border-purple-200 shadow-xl shadow-purple-500/5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-200/50 rounded-full blur-2xl pointer-events-none" />
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
              <span className="w-2 h-6 bg-purple-600 rounded-full inline-block" />
              Academic & Technical Journey
            </h3>
            <p className="text-slate-750 text-sm sm:text-base leading-relaxed mb-4">
              As an MCA Cloud Computing student at JAIN (Deemed-to-be University) with a prior BCA degree from Manipal University Jaipur, my technical focus spans software development, web engineering, and cloud platforms.
            </p>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed mb-4">
              I have developed a strong foundation in core programming, relational databases, web frameworks, and Amazon Web Services (AWS). My enthusiasm lies in architecting cloud-based projects that solve practical problems efficiently.
            </p>
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              With a disciplined problem-solving approach and strong analytical abilities, I take pride in understanding system internals, data structures, and building software that is reliable and maintainable.
            </p>

            <div className="mt-6 pt-6 border-t border-purple-200/80 flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-white text-purple-800 border border-purple-200 font-semibold shadow-2xs">#CloudComputing</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-purple-800 border border-purple-200 font-semibold shadow-2xs">#WebDevelopment</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-purple-800 border border-purple-200 font-semibold shadow-2xs">#AWS</span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-purple-800 border border-purple-200 font-semibold shadow-2xs">#ProblemSolving</span>
            </div>
          </div>

          {/* Highlights Cards (70% Lavender with 30% White Accents) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl bg-gradient-to-br from-[#ede3fe] via-[#f7f0ff] to-white border border-purple-200/90 hover:border-purple-300 hover:shadow-md hover:shadow-purple-500/10 transition-all group ${
                    idx === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-white border border-purple-200 w-fit text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors mb-3 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-850 mb-1.5 group-hover:text-purple-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
