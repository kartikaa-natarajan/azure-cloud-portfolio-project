import { useState, useMemo } from "react";
import { Code2, Server, Database, Cloud, Cpu, Bot, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { Skill, SkillCategory } from "@/types";

const CATEGORY_META: Record<SkillCategory, { icon: typeof Code2; color: string }> = {
  Frontend: { icon: Code2, color: "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30" },
  Backend: { icon: Server, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30" },
  Database: { icon: Database, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" },
  Cloud: { icon: Cloud, color: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30" },
  DevOps: { icon: Cpu, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30" },
  "AI/ML": { icon: Bot, color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30" },
  Tools: { icon: Wrench, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30" },
};

const ORDER: SkillCategory[] = ["Frontend", "Backend", "Database", "Cloud", "DevOps", "AI/ML", "Tools"];

export default function Skills() {
  const { data, loading, error, retry } = useFetch<Skill[]>(() => api.get<Skill[]>("/skills"), []);
  const [active, setActive] = useState<SkillCategory | "All">("All");

  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    (data || []).forEach((s) => {
      const list = map.get(s.category) || [];
      list.push(s);
      map.set(s.category, list);
    });
    return map;
  }, [data]);

  const categories = ORDER.filter((c) => grouped.has(c));
  const visibleCategories = active === "All" ? categories : categories.filter((c) => c === active);

  return (
    <section id="skills" className="py-24 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Skills
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Technologies I work with
          </h2>
        </Reveal>

        {loading && <LoadingState label="Loading skills..." />}
        {error && <ErrorState message="Unable to load skills. Try again." onRetry={retry} />}
        {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState label="No skills added yet." />}

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              <FilterChip label="All" active={active === "All"} onClick={() => setActive("All")} />
              {categories.map((c) => (
                <FilterChip key={c} label={c} active={active === c} onClick={() => setActive(c)} />
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {visibleCategories.map((cat) => {
                const Meta = CATEGORY_META[cat];
                return (
                  <Reveal key={cat} delay={0.05}>
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`p-2 rounded-lg ${Meta.color}`}>
                          <Meta.icon className="w-4 h-4" />
                        </span>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">{cat}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {grouped.get(cat)?.map((skill) => (
                          <span
                            key={skill._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300 transition-colors cursor-default"
                          >
                            {skill.name}
                            {skill.proficiency && (
                              <span className="text-[10px] opacity-75 font-normal px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                                {skill.proficiency}
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-brand-600 text-white"
          : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
