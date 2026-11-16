import { Code2, Cloud, Database, Brain } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { GithubStats, Profile } from "@/types";

const POINTS = [
  { icon: Code2, label: "Full Stack Development", desc: "React, Node.js, Express & REST APIs" },
  { icon: Cloud, label: "AWS Cloud", desc: "EC2, S3, IAM, Elastic Beanstalk & more" },
  { icon: Database, label: "Database Development", desc: "MongoDB, MySQL & schema design" },
  { icon: Brain, label: "Problem Solving & DSA", desc: "Continuous learning & practice" },
];

export default function About() {
  const { data: stats } = useFetch<GithubStats>(() => api.get<GithubStats>("/github/stats"), []);
  const { data: profile } = useFetch<Profile>(() => api.get<Profile>("/profile"), []);

  const aboutText = profile?.aboutDescription || profile?.bio ||
    "Hemanth Raj is a passionate Full Stack Developer who enjoys turning ideas into working products — from responsive frontends to secure, scalable backends. His work spans full stack development, REST APIs, AWS cloud infrastructure, and database design, with a steady focus on writing clean, maintainable code.";

  return (
    <section id="about" className="py-24">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            About Me
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            A developer who enjoys building real-world applications
          </h2>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-5 gap-10 items-start">
          <Reveal className="lg:col-span-3" delay={0.05}>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
            {profile?.bio && profile.bio !== aboutText && (
              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                {profile.bio}
              </p>
            )}


            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {POINTS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400">
                    <p.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {p.label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                GitHub Snapshot
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Public Repos" value={stats?.publicRepos} />
                <Stat label="Followers" value={stats?.followers} />
                <Stat label="Total Stars" value={stats?.totalStars} />
                <Stat label="Total Forks" value={stats?.totalForks} />
              </div>
              {stats?.topLanguages && stats.topLanguages.length > 0 && (
                <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Top languages</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.topLanguages.map((l) => (
                      <span
                        key={l.language}
                        className="px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {l.language}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-4 text-[11px] text-slate-400">
                Live data pulled from the GitHub API.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value?: number }) {
  return (
    <div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">
        {value !== undefined ? value : "—"}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}
