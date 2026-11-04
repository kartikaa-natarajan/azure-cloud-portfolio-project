import { GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { EducationItem } from "@/types";

export default function Education() {
  const { data, loading, error, retry } = useFetch<EducationItem[]>(
    () => api.get<EducationItem[]>("/education"),
    []
  );

  return (
    <section id="education" className="py-24">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Education
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Academic Background
          </h2>
        </Reveal>

        {loading && <LoadingState label="Loading education..." />}
        {error && <ErrorState message="Unable to load education. Try again." onRetry={retry} />}
        {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState />}

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {data!.map((item, i) => (
              <Reveal key={item._id} delay={Math.min(i * 0.08, 0.3)}>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 h-full">
                  <div className="p-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/30 w-fit text-brand-600 dark:text-brand-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-800 dark:text-slate-100">
                    {item.degree}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {item.institution}
                    {item.location ? ` · ${item.location}` : ""}
                  </p>
                  {((item.startYear && item.startYear.trim()) || (item.endYear && item.endYear.trim())) && (
                    <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mt-1">
                      {item.startYear && item.startYear.trim()}
                      {item.startYear && item.startYear.trim() && item.endYear && item.endYear.trim() ? " – " : ""}
                      {item.endYear && item.endYear.trim()}
                    </p>
                  )}
                  {item.grade && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                      Grade: {item.grade}
                    </span>
                  )}
                  {item.description && (
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
