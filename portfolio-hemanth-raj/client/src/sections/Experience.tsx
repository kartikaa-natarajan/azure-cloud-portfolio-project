import Reveal from "@/components/Reveal";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";
import { useFetch } from "@/hooks/useFetch";
import { api } from "@/lib/api";
import type { ExperienceItem } from "@/types";

export default function Experience() {
  const { data, loading, error, retry } = useFetch<ExperienceItem[]>(
    () => api.get<ExperienceItem[]>("/experience"),
    []
  );

  return (
    <section id="experience" className="py-24 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="section-container">
        <Reveal>
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Development Journey
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Experience
          </h2>
        </Reveal>

        {loading && <LoadingState label="Loading journey..." />}
        {error && <ErrorState message="Unable to load experience. Try again." onRetry={retry} />}
        {!loading && !error && (data?.length ?? 0) === 0 && <EmptyState />}

        {!loading && !error && (data?.length ?? 0) > 0 && (
          <div className="mt-10 relative border-l-2 border-slate-200 dark:border-slate-800 ml-3">
            {data!.map((item, i) => (
              <Reveal key={item._id} delay={Math.min(i * 0.05, 0.3)}>
                <div className="relative pl-8 pb-10 last:pb-0">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-white dark:ring-slate-950" />
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 capitalize">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.organization} · {item.startDate}
                    {item.endDate ? ` – ${item.endDate}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  {item.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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
